create table if not exists public.maintenance_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  title text not null,
  status text not null default 'open' check (status in ('open', 'booked', 'completed')),
  responsibility text not null default 'operator' check (responsibility in ('operator', 'landlord', 'tenant')),
  contractor_name text,
  cost numeric(12, 2) not null default 0 check (cost >= 0),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contractors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid references public.properties(id) on delete cascade,
  name text not null,
  trade text,
  phone text,
  email text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.rent_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  review_date date not null,
  current_rent numeric(12, 2) not null default 0 check (current_rent >= 0),
  proposed_rent numeric(12, 2) not null default 0 check (proposed_rent >= 0),
  status text not null default 'planned' check (status in ('planned', 'agreed', 'completed')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.void_periods (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  start_date date not null,
  end_date date,
  estimated_monthly_rent numeric(12, 2) not null default 0 check (estimated_monthly_rent >= 0),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.maintenance_logs enable row level security;
alter table public.maintenance_logs force row level security;
alter table public.contractors enable row level security;
alter table public.contractors force row level security;
alter table public.rent_reviews enable row level security;
alter table public.rent_reviews force row level security;
alter table public.void_periods enable row level security;
alter table public.void_periods force row level security;

create policy "Users can manage own pro maintenance logs" on public.maintenance_logs for all
using (auth.uid() = user_id and public.has_pro_access_for_user(auth.uid()))
with check (auth.uid() = user_id and public.has_pro_access_for_user(auth.uid()));
create policy "Users can manage own pro contractors" on public.contractors for all
using (auth.uid() = user_id and public.has_pro_access_for_user(auth.uid()))
with check (auth.uid() = user_id and public.has_pro_access_for_user(auth.uid()));
create policy "Users can manage own pro rent reviews" on public.rent_reviews for all
using (auth.uid() = user_id and public.has_pro_access_for_user(auth.uid()))
with check (auth.uid() = user_id and public.has_pro_access_for_user(auth.uid()));
create policy "Users can manage own pro void periods" on public.void_periods for all
using (auth.uid() = user_id and public.has_pro_access_for_user(auth.uid()))
with check (auth.uid() = user_id and public.has_pro_access_for_user(auth.uid()));

grant select, insert, update, delete on public.maintenance_logs, public.contractors, public.rent_reviews, public.void_periods to authenticated;

create trigger maintenance_logs_updated_at before update on public.maintenance_logs for each row execute function public.set_updated_at();
create trigger contractors_updated_at before update on public.contractors for each row execute function public.set_updated_at();
create trigger rent_reviews_updated_at before update on public.rent_reviews for each row execute function public.set_updated_at();
create trigger void_periods_updated_at before update on public.void_periods for each row execute function public.set_updated_at();

create index maintenance_logs_user_property_idx on public.maintenance_logs(user_id, property_id);
create index contractors_user_property_idx on public.contractors(user_id, property_id);
create index rent_reviews_user_property_idx on public.rent_reviews(user_id, property_id);
create index void_periods_user_property_idx on public.void_periods(user_id, property_id);
