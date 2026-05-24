create table if not exists public.tenancy_periods (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  tenant_name text,
  tenant_contact text,
  tenancy_start_date date,
  tenancy_end_date date,
  monthly_rent numeric(12, 2) not null default 0,
  document_names text[] not null default '{}',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.remortgage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  product_type text not null default 'Fixed',
  lender text,
  rate numeric(6, 3) not null default 0,
  mortgage_balance numeric(12, 2) not null default 0,
  term_months integer,
  start_date date,
  expiry_date date,
  equity_released numeric(12, 2) not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.tenancy_periods enable row level security;
alter table public.remortgage_events enable row level security;

drop policy if exists "Users can manage own tenancy periods" on public.tenancy_periods;
create policy "Users can manage own tenancy periods"
on public.tenancy_periods for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can manage own remortgage events" on public.remortgage_events;
create policy "Users can manage own remortgage events"
on public.remortgage_events for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop trigger if exists tenancy_periods_updated_at on public.tenancy_periods;
create trigger tenancy_periods_updated_at
before update on public.tenancy_periods
for each row execute function public.set_updated_at();

drop trigger if exists remortgage_events_updated_at on public.remortgage_events;
create trigger remortgage_events_updated_at
before update on public.remortgage_events
for each row execute function public.set_updated_at();

create index if not exists tenancy_periods_property_id_idx on public.tenancy_periods(property_id);
create index if not exists tenancy_periods_user_id_idx on public.tenancy_periods(user_id);
create index if not exists remortgage_events_property_id_idx on public.remortgage_events(property_id);
create index if not exists remortgage_events_user_id_idx on public.remortgage_events(user_id);
