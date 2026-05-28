alter table public.profiles force row level security;
alter table public.subscriptions force row level security;
alter table public.properties force row level security;
alter table public.documents force row level security;
alter table public.reminders force row level security;
alter table public.payments force row level security;
alter table public.admin_users force row level security;
alter table public.promo_codes force row level security;
alter table public.promo_redemptions force row level security;
alter table public.analytics_events force row level security;
alter table public.tenancy_periods force row level security;
alter table public.remortgage_events force row level security;
alter table public.property_transactions force row level security;

drop policy if exists "Users can delete own properties for privacy" on public.properties;
create policy "Users can delete own properties for privacy"
on public.properties for delete
using (auth.uid() = user_id);

drop policy if exists "Users can delete own documents for privacy" on public.documents;
create policy "Users can delete own documents for privacy"
on public.documents for delete
using (auth.uid() = user_id);

drop policy if exists "Users can delete own reminders for privacy" on public.reminders;
create policy "Users can delete own reminders for privacy"
on public.reminders for delete
using (auth.uid() = user_id);

drop policy if exists "Users can delete own tenancy periods for privacy" on public.tenancy_periods;
create policy "Users can delete own tenancy periods for privacy"
on public.tenancy_periods for delete
using (auth.uid() = user_id);

drop policy if exists "Users can delete own remortgage events for privacy" on public.remortgage_events;
create policy "Users can delete own remortgage events for privacy"
on public.remortgage_events for delete
using (auth.uid() = user_id);

drop policy if exists "Users can delete own property transactions for privacy" on public.property_transactions;
create policy "Users can delete own property transactions for privacy"
on public.property_transactions for delete
using (auth.uid() = user_id);

drop policy if exists "Users can update own property documents" on storage.objects;
create policy "Users can update own property documents"
on storage.objects for update
using (
  bucket_id = 'property-documents'
  and auth.uid()::text = (storage.foldername(name))[1]
  and public.has_premium_access()
)
with check (
  bucket_id = 'property-documents'
  and auth.uid()::text = (storage.foldername(name))[1]
  and public.has_premium_access()
);

drop policy if exists "Users can delete own property documents" on storage.objects;
create policy "Users can delete own property documents"
on storage.objects for delete
using (
  bucket_id = 'property-documents'
  and auth.uid()::text = (storage.foldername(name))[1]
);

revoke all on function public.current_user_is_admin() from public, anon;
revoke all on function public.get_admin_overview() from public, anon;
revoke all on function public.create_admin_promo_code(text, integer, timestamptz, integer, boolean) from public, anon;
revoke all on function public.redeem_promo_code(text) from public, anon;
revoke all on function public.deactivate_admin_promo_code(text) from public, anon;
revoke all on function public.has_premium_access() from public, anon;
revoke all on function public.has_pro_access_for_user(uuid) from public, anon;
revoke all on function public.set_updated_at() from public, anon;
revoke all on function public.handle_new_user() from public, anon;

grant execute on function public.current_user_is_admin() to authenticated, service_role;
grant execute on function public.get_admin_overview() to authenticated, service_role;
grant execute on function public.create_admin_promo_code(text, integer, timestamptz, integer, boolean) to authenticated, service_role;
grant execute on function public.redeem_promo_code(text) to authenticated, service_role;
grant execute on function public.deactivate_admin_promo_code(text) to authenticated, service_role;
grant execute on function public.has_premium_access() to authenticated, service_role;
grant execute on function public.has_pro_access_for_user(uuid) to authenticated, service_role;
grant execute on function public.set_updated_at() to authenticated, service_role;
grant execute on function public.handle_new_user() to authenticated, service_role;
