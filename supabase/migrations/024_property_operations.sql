create table if not exists public.recurring_expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  category text not null,
  amount numeric(12, 2) not null check (amount > 0),
  due_day integer not null default 1 check (due_day between 1 and 31),
  notes text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.compliance_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  item_type text not null,
  expiry_date date,
  status text not null default 'review' check (status in ('valid', 'review', 'expired', 'not_required')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.arrears_cases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  transaction_id uuid not null references public.property_transactions(id) on delete cascade,
  status text not null default 'open' check (status in ('open', 'contacted', 'payment_plan', 'resolved')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (transaction_id)
);

alter table public.recurring_expenses enable row level security;
alter table public.recurring_expenses force row level security;
alter table public.compliance_items enable row level security;
alter table public.compliance_items force row level security;
alter table public.arrears_cases enable row level security;
alter table public.arrears_cases force row level security;

create policy "Users can manage own pro recurring expenses"
on public.recurring_expenses for all
using (auth.uid() = user_id and public.has_pro_access_for_user(auth.uid()))
with check (auth.uid() = user_id and public.has_pro_access_for_user(auth.uid()));

create policy "Users can manage own pro compliance items"
on public.compliance_items for all
using (auth.uid() = user_id and public.has_pro_access_for_user(auth.uid()))
with check (auth.uid() = user_id and public.has_pro_access_for_user(auth.uid()));

create policy "Users can manage own pro arrears cases"
on public.arrears_cases for all
using (auth.uid() = user_id and public.has_pro_access_for_user(auth.uid()))
with check (auth.uid() = user_id and public.has_pro_access_for_user(auth.uid()));

grant select, insert, update, delete on public.recurring_expenses to authenticated;
grant select, insert, update, delete on public.compliance_items to authenticated;
grant select, insert, update, delete on public.arrears_cases to authenticated;

create trigger recurring_expenses_updated_at before update on public.recurring_expenses
for each row execute function public.set_updated_at();
create trigger compliance_items_updated_at before update on public.compliance_items
for each row execute function public.set_updated_at();
create trigger arrears_cases_updated_at before update on public.arrears_cases
for each row execute function public.set_updated_at();

create index recurring_expenses_user_id_idx on public.recurring_expenses(user_id);
create index recurring_expenses_property_id_idx on public.recurring_expenses(property_id);
create index compliance_items_user_id_idx on public.compliance_items(user_id);
create index compliance_items_property_id_idx on public.compliance_items(property_id);
create index arrears_cases_user_id_idx on public.arrears_cases(user_id);
create index arrears_cases_property_id_idx on public.arrears_cases(property_id);
