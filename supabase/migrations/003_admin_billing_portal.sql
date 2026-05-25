alter table public.subscriptions
add column if not exists plan_name text not null default 'PropertyPanel Premium',
add column if not exists amount_monthly_pence integer not null default 499,
add column if not exists currency text not null default 'gbp',
add column if not exists current_period_start timestamptz,
add column if not exists cancel_at_period_end boolean not null default false,
add column if not exists canceled_at timestamptz,
add column if not exists total_paid_pence integer not null default 0,
add column if not exists stripe_checkout_session_id text;

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  subscription_id uuid references public.subscriptions(id) on delete set null,
  stripe_invoice_id text unique,
  stripe_payment_intent_id text,
  amount_pence integer not null default 0,
  currency text not null default 'gbp',
  status text not null default 'paid',
  paid_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.payments enable row level security;

drop policy if exists "Users can view own payments" on public.payments;
create policy "Users can view own payments"
on public.payments for select
using (auth.uid() = user_id);

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

drop policy if exists "Admins can view admin users" on public.admin_users;
create policy "Admins can view admin users"
on public.admin_users for select
using (lower(email) = lower(auth.jwt()->>'email') and active = true);

insert into public.admin_users (email)
values ('pawelbyczynski@gmail.com')
on conflict (email) do update set active = true;

update public.promo_codes
set active = false
where code = 'FRIENDS100';

create or replace function public.current_user_is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.admin_users au
    where lower(au.email) = lower(auth.jwt()->>'email')
      and au.active = true
  );
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

grant execute on function public.current_user_is_admin() to authenticated;
grant execute on function public.get_admin_overview() to authenticated;
