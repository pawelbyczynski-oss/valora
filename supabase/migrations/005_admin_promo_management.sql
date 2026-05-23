create or replace function public.create_admin_promo_code(
  input_code text,
  input_max_redemptions integer,
  input_expires_at timestamptz,
  input_free_months integer,
  input_lifetime_access boolean
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  normalized_code text := upper(trim(input_code));
  saved_promo public.promo_codes%rowtype;
begin
  if not public.current_user_is_admin() then
    raise exception 'Not authorized';
  end if;

  if normalized_code = '' then
    return jsonb_build_object('success', false, 'message', 'Code name is required');
  end if;

  if input_max_redemptions is not null and input_max_redemptions < 1 then
    return jsonb_build_object('success', false, 'message', 'Usage limit must be at least 1');
  end if;

  if not input_lifetime_access and coalesce(input_free_months, 0) not in (3, 6) then
    return jsonb_build_object('success', false, 'message', 'Choose 3 months, 6 months or infinity');
  end if;

  insert into public.promo_codes (
    code,
    description,
    free_months,
    lifetime_access,
    max_redemptions,
    active,
    expires_at
  )
  values (
    normalized_code,
    case
      when input_lifetime_access then 'Admin-created lifetime access code'
      else 'Admin-created ' || input_free_months || ' month access code'
    end,
    case when input_lifetime_access then 0 else input_free_months end,
    input_lifetime_access,
    input_max_redemptions,
    true,
    input_expires_at
  )
  on conflict (code) do update
  set description = excluded.description,
      free_months = excluded.free_months,
      lifetime_access = excluded.lifetime_access,
      max_redemptions = excluded.max_redemptions,
      active = true,
      expires_at = excluded.expires_at
  returning * into saved_promo;

  return jsonb_build_object('success', true, 'code', saved_promo.code);
end;
$$;

create or replace function public.redeem_promo_code(input_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  normalized_code text := upper(trim(input_code));
  promo public.promo_codes%rowtype;
  inserted_count integer := 0;
  already_redeemed boolean := false;
begin
  if auth.uid() is null then
    return jsonb_build_object('accepted', false, 'message', 'Sign in before applying a promo code');
  end if;

  select *
  into promo
  from public.promo_codes
  where code = normalized_code
    and active = true
  limit 1
  for update;

  if promo.id is null then
    return jsonb_build_object('accepted', false, 'message', 'Promo not recognised');
  end if;

  if promo.expires_at is not null and promo.expires_at < now() then
    return jsonb_build_object('accepted', false, 'message', 'Promo code has expired');
  end if;

  select exists (
    select 1
    from public.promo_redemptions
    where promo_code_id = promo.id
      and user_id = auth.uid()
  )
  into already_redeemed;

  if not already_redeemed and promo.max_redemptions is not null and promo.redeemed_count >= promo.max_redemptions then
    return jsonb_build_object('accepted', false, 'message', 'Promo code has reached its usage limit');
  end if;

  insert into public.promo_redemptions (promo_code_id, user_id)
  values (promo.id, auth.uid())
  on conflict (promo_code_id, user_id) do nothing;

  get diagnostics inserted_count = row_count;

  if inserted_count = 1 then
    update public.promo_codes
    set redeemed_count = redeemed_count + 1
    where id = promo.id;
  end if;

  return jsonb_build_object(
    'accepted', true,
    'lifetime_access', promo.lifetime_access,
    'free_months', promo.free_months,
    'message', 'Promo accepted'
  );
end;
$$;

create or replace function public.get_admin_overview()
returns jsonb
language plpgsql
security definer
set search_path = public
stable
as $$
declare
  overview jsonb;
begin
  if not public.current_user_is_admin() then
    raise exception 'Not authorized';
  end if;

  select jsonb_build_object(
    'totals', jsonb_build_object(
      'users', (select count(*) from public.profiles),
      'active_subscriptions', (
        select count(*)
        from public.subscriptions
        where status in ('trialing', 'active')
      ),
      'mrr_pence', (
        select coalesce(sum(amount_monthly_pence), 0)
        from public.subscriptions
        where status in ('trialing', 'active')
      ),
      'properties', (select count(*) from public.properties),
      'promo_redemptions', (select count(*) from public.promo_redemptions)
    ),
    'events', jsonb_build_object(
      'page_view', (
        select count(*)
        from public.analytics_events
        where event_type = 'page_view'
          and created_at >= now() - interval '30 days'
      ),
      'premium_viewed', (
        select count(*)
        from public.analytics_events
        where event_type = 'premium_viewed'
          and created_at >= now() - interval '30 days'
      ),
      'pdf_exported', (
        select count(*)
        from public.analytics_events
        where event_type = 'pdf_exported'
          and created_at >= now() - interval '30 days'
      )
    ),
    'promo_codes', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'code', pc.code,
          'free_months', pc.free_months,
          'lifetime_access', pc.lifetime_access,
          'max_redemptions', pc.max_redemptions,
          'redeemed_count', pc.redeemed_count,
          'expires_at', pc.expires_at,
          'active', pc.active
        )
        order by pc.created_at desc
      )
      from (
        select *
        from public.promo_codes
        order by created_at desc
        limit 10
      ) pc
    ), '[]'::jsonb),
    'recent_users', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'email', p.email,
          'status', coalesce(s.status::text, 'no subscription'),
          'joined', to_char(p.created_at, 'DD Mon YYYY'),
          'paid', '£' || to_char(coalesce(s.total_paid_pence, 0) / 100.0, 'FM999999990.00')
        )
        order by p.created_at desc
      )
      from (
        select *
        from public.profiles
        order by created_at desc
        limit 8
      ) p
      left join lateral (
        select *
        from public.subscriptions s
        where s.user_id = p.id
        order by s.created_at desc
        limit 1
      ) s on true
    ), '[]'::jsonb),
    'recent_events', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'event_type', e.event_type::text,
          'created', to_char(e.created_at, 'DD Mon HH24:MI'),
          'email', coalesce(p.email, 'anonymous')
        )
        order by e.created_at desc
      )
      from (
        select *
        from public.analytics_events
        order by created_at desc
        limit 10
      ) e
      left join public.profiles p on p.id = e.user_id
    ), '[]'::jsonb)
  )
  into overview;

  return overview;
end;
$$;

grant execute on function public.create_admin_promo_code(text, integer, timestamptz, integer, boolean) to authenticated;
grant execute on function public.redeem_promo_code(text) to authenticated;
grant execute on function public.get_admin_overview() to authenticated;
