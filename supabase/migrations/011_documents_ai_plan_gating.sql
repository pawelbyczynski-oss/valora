alter table public.subscriptions
add column if not exists plan_code text not null default 'premium'
check (plan_code in ('premium', 'pro'));

alter table public.documents
add column if not exists file_name text,
add column if not exists file_size bigint,
add column if not exists mime_type text,
add column if not exists page_count integer not null default 1 check (page_count between 1 and 5),
add column if not exists ai_status text not null default 'not_requested'
  check (ai_status in ('not_requested', 'queued', 'processing', 'review', 'processed', 'failed')),
add column if not exists ai_result jsonb,
add column if not exists ai_error text,
add column if not exists ai_scanned_at timestamptz;

create index if not exists documents_user_created_idx
on public.documents(user_id, created_at desc);

create index if not exists documents_user_ai_scanned_idx
on public.documents(user_id, ai_scanned_at desc)
where ai_scanned_at is not null;

insert into storage.buckets (id, name, public)
values ('property-documents', 'property-documents', false)
on conflict (id) do nothing;

drop policy if exists "Users can upload own property documents" on storage.objects;
create policy "Users can upload own property documents"
on storage.objects for insert
with check (
  bucket_id = 'property-documents'
  and auth.uid()::text = (storage.foldername(name))[1]
  and public.has_premium_access()
);

drop policy if exists "Users can view own property documents" on storage.objects;
create policy "Users can view own property documents"
on storage.objects for select
using (
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
  and public.has_premium_access()
);

create or replace function public.has_pro_access_for_user(input_user_id uuid)
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
      where s.user_id = input_user_id
        and s.status in ('active', 'trialing')
        and (s.current_period_end is null or s.current_period_end > now())
        and (s.plan_code = 'pro' or s.amount_monthly_pence >= 999)
    );
$$;

grant execute on function public.has_pro_access_for_user(uuid) to authenticated;
