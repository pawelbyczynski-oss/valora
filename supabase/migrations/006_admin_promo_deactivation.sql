create or replace function public.deactivate_admin_promo_code(input_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  normalized_code text := upper(trim(input_code));
  affected_count integer := 0;
begin
  if not public.current_user_is_admin() then
    raise exception 'Not authorized';
  end if;

  update public.promo_codes
  set active = false
  where code = normalized_code
    and active = true;

  get diagnostics affected_count = row_count;

  if affected_count = 0 then
    return jsonb_build_object('success', false, 'message', 'Promo code not found or already inactive');
  end if;

  return jsonb_build_object('success', true, 'code', normalized_code);
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
        where active = true
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

grant execute on function public.deactivate_admin_promo_code(text) to authenticated;
grant execute on function public.get_admin_overview() to authenticated;
