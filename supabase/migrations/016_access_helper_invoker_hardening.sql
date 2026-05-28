create or replace function public.current_user_is_admin()
returns boolean
language sql
security invoker
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

create or replace function public.has_premium_access()
returns boolean
language sql
security invoker
set search_path = public
stable
as $$
  select
    public.current_user_is_admin()
    or exists (
      select 1
      from public.subscriptions s
      where s.user_id = auth.uid()
        and s.status in ('active', 'trialing')
        and (s.current_period_end is null or s.current_period_end > now())
    )
    or exists (
      select 1
      from public.promo_redemptions pr
      join public.promo_codes pc on pc.id = pr.promo_code_id
      where pr.user_id = auth.uid()
        and pc.active = true
        and pc.lifetime_access = true
    );
$$;

create or replace function public.has_pro_access_for_user(input_user_id uuid)
returns boolean
language sql
security invoker
set search_path = public
stable
as $$
  select
    public.current_user_is_admin()
    or exists (
      select 1
      from public.subscriptions s
      where s.user_id = input_user_id
        and s.status in ('active', 'trialing')
        and (s.current_period_end is null or s.current_period_end > now())
        and (s.plan_code = 'pro' or s.amount_monthly_pence >= 999)
    );
$$;

grant execute on function public.current_user_is_admin() to authenticated, service_role;
grant execute on function public.has_premium_access() to authenticated, service_role;
grant execute on function public.has_pro_access_for_user(uuid) to authenticated, service_role;
