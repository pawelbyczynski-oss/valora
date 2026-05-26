create or replace function public.has_premium_access()
returns boolean
language sql
security definer
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

grant execute on function public.has_premium_access() to authenticated;

drop policy if exists "Users can manage own properties" on public.properties;
create policy "Users can manage own premium properties"
on public.properties for all
using (auth.uid() = user_id and public.has_premium_access())
with check (auth.uid() = user_id and public.has_premium_access());

drop policy if exists "Users can manage own documents" on public.documents;
create policy "Users can manage own premium documents"
on public.documents for all
using (auth.uid() = user_id and public.has_premium_access())
with check (auth.uid() = user_id and public.has_premium_access());

drop policy if exists "Users can manage own reminders" on public.reminders;
create policy "Users can manage own premium reminders"
on public.reminders for all
using (auth.uid() = user_id and public.has_premium_access())
with check (auth.uid() = user_id and public.has_premium_access());

drop policy if exists "Users can manage own tenancy periods" on public.tenancy_periods;
create policy "Users can manage own premium tenancy periods"
on public.tenancy_periods for all
using (auth.uid() = user_id and public.has_premium_access())
with check (auth.uid() = user_id and public.has_premium_access());

drop policy if exists "Users can manage own remortgage events" on public.remortgage_events;
create policy "Users can manage own premium remortgage events"
on public.remortgage_events for all
using (auth.uid() = user_id and public.has_premium_access())
with check (auth.uid() = user_id and public.has_premium_access());

drop policy if exists "Users can manage own property transactions" on public.property_transactions;
create policy "Users can manage own premium property transactions"
on public.property_transactions for all
using (auth.uid() = user_id and public.has_premium_access())
with check (auth.uid() = user_id and public.has_premium_access());
