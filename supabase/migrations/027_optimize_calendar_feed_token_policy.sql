drop policy if exists "Users can manage own pro calendar feed token"
on public.calendar_feed_tokens;

create policy "Users can manage own pro calendar feed token"
on public.calendar_feed_tokens for all
using (
  (select auth.uid()) = user_id
  and (select public.has_pro_access_for_user((select auth.uid())))
)
with check (
  (select auth.uid()) = user_id
  and (select public.has_pro_access_for_user((select auth.uid())))
);
