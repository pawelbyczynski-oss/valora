drop policy if exists "Users can manage own pro property transactions" on public.property_transactions;
drop policy if exists "Users can manage own premium property transactions" on public.property_transactions;

create policy "Users can manage own premium property transactions"
on public.property_transactions for all
using (auth.uid() = user_id and public.has_premium_access())
with check (auth.uid() = user_id and public.has_premium_access());
