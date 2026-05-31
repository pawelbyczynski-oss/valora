create or replace function public.can_add_property()
returns boolean
language sql
security invoker
set search_path = public
stable
as $$
  select
    public.has_premium_access()
    and (
      public.has_pro_access_for_user(auth.uid())
      or (
        select count(*)
        from public.properties p
        where p.user_id = auth.uid()
      ) < 5
    );
$$;

revoke all on function public.can_add_property() from public;
grant execute on function public.can_add_property() to authenticated;

drop policy if exists "Users can manage own premium properties" on public.properties;
drop policy if exists "Users can view own premium properties" on public.properties;
drop policy if exists "Users can add own plan properties" on public.properties;
drop policy if exists "Users can update own plan properties" on public.properties;

create policy "Users can view own premium properties"
on public.properties for select
using (auth.uid() = user_id and public.has_premium_access());

create policy "Users can add own plan properties"
on public.properties for insert
with check (
  auth.uid() = user_id
  and public.can_add_property()
  and (ownership_model = 'Owned' or public.has_pro_access_for_user(auth.uid()))
  and (not rent_reminder_enabled or public.has_pro_access_for_user(auth.uid()))
);

create policy "Users can update own plan properties"
on public.properties for update
using (auth.uid() = user_id and public.has_premium_access())
with check (
  auth.uid() = user_id
  and public.has_premium_access()
  and (ownership_model = 'Owned' or public.has_pro_access_for_user(auth.uid()))
  and (not rent_reminder_enabled or public.has_pro_access_for_user(auth.uid()))
);

drop policy if exists "Users can manage own premium documents" on public.documents;
drop policy if exists "Users can view own premium documents" on public.documents;
drop policy if exists "Users can add own premium documents" on public.documents;
drop policy if exists "Users can update own plan documents" on public.documents;

create policy "Users can view own premium documents"
on public.documents for select
using (auth.uid() = user_id and public.has_premium_access());

create policy "Users can add own premium documents"
on public.documents for insert
with check (
  auth.uid() = user_id
  and public.has_premium_access()
  and (not reminder_enabled or public.has_pro_access_for_user(auth.uid()))
);

create policy "Users can update own plan documents"
on public.documents for update
using (auth.uid() = user_id and public.has_premium_access())
with check (
  auth.uid() = user_id
  and public.has_premium_access()
  and (not reminder_enabled or public.has_pro_access_for_user(auth.uid()))
);

drop policy if exists "Users can manage own premium reminders" on public.reminders;
drop policy if exists "Users can manage own pro reminders" on public.reminders;

create policy "Users can manage own pro reminders"
on public.reminders for all
using (auth.uid() = user_id and public.has_pro_access_for_user(auth.uid()))
with check (auth.uid() = user_id and public.has_pro_access_for_user(auth.uid()));
