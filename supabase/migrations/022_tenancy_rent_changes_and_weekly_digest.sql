create table if not exists public.tenancy_rent_changes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  tenancy_id uuid not null references public.tenancy_periods(id) on delete cascade,
  effective_date date not null,
  monthly_rent numeric(12, 2) not null check (monthly_rent >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenancy_id, effective_date)
);

alter table public.tenancy_rent_changes enable row level security;
alter table public.tenancy_rent_changes force row level security;

drop policy if exists "Users can manage own premium tenancy rent changes" on public.tenancy_rent_changes;
create policy "Users can manage own premium tenancy rent changes"
on public.tenancy_rent_changes for all
using (auth.uid() = user_id and public.has_premium_access())
with check (auth.uid() = user_id and public.has_premium_access());

grant select, insert, update, delete on public.tenancy_rent_changes to authenticated;

drop trigger if exists tenancy_rent_changes_updated_at on public.tenancy_rent_changes;
create trigger tenancy_rent_changes_updated_at
before update on public.tenancy_rent_changes
for each row execute function public.set_updated_at();

create index if not exists tenancy_rent_changes_property_id_idx
on public.tenancy_rent_changes(property_id);

create index if not exists tenancy_rent_changes_tenancy_date_idx
on public.tenancy_rent_changes(tenancy_id, effective_date);

alter table public.profiles
add column if not exists weekly_digest_sent_for_week date;
