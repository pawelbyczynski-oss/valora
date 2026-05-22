create extension if not exists "pgcrypto";

create type public.subscription_status as enum ('trialing', 'active', 'past_due', 'canceled', 'incomplete', 'incomplete_expired', 'paused', 'unpaid');
create type public.let_type as enum ('long_term', 'short_term');
create type public.property_region as enum ('england', 'scotland');
create type public.reminder_type as enum ('rent_due', 'mortgage_expiry', 'document_expiry');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  stripe_customer_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  stripe_subscription_id text unique not null,
  stripe_price_id text not null,
  status public.subscription_status not null,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  address_line_1 text,
  address_line_2 text,
  city text,
  postcode text,
  region public.property_region not null default 'england',
  let_type public.let_type not null default 'long_term',
  purchase_date date,
  purchase_price numeric(12, 2) not null default 0,
  current_value numeric(12, 2) not null default 0,
  deposit_paid numeric(12, 2) not null default 0,
  mortgage_balance numeric(12, 2) not null default 0,
  mortgage_lender text,
  mortgage_product_type text,
  mortgage_rate numeric(6, 3) not null default 0,
  mortgage_expiry_date date,
  monthly_rent numeric(12, 2) not null default 0,
  operating_expenses numeric(12, 2) not null default 0,
  rent_due_day integer check (rent_due_day between 1 and 31),
  rent_reminder_enabled boolean not null default false,
  tenant_name text,
  tenant_email text,
  tenant_phone text,
  tenancy_start_date date,
  tenancy_end_date date,
  landlord_registration_number text,
  deposit_scheme text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  label text not null,
  document_type text not null,
  storage_path text not null,
  expiry_date date,
  reminder_enabled boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid references public.properties(id) on delete cascade,
  document_id uuid references public.documents(id) on delete cascade,
  reminder_type public.reminder_type not null,
  title text not null,
  due_date date not null,
  email_enabled boolean not null default true,
  sent_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger subscriptions_updated_at
before update on public.subscriptions
for each row execute function public.set_updated_at();

create trigger properties_updated_at
before update on public.properties
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.properties enable row level security;
alter table public.documents enable row level security;
alter table public.reminders enable row level security;

create policy "Users can view own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Users can view own subscriptions"
on public.subscriptions for select
using (auth.uid() = user_id);

create policy "Users can manage own properties"
on public.properties for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can manage own documents"
on public.documents for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can manage own reminders"
on public.reminders for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create index properties_user_id_idx on public.properties(user_id);
create index documents_property_id_idx on public.documents(property_id);
create index reminders_due_date_idx on public.reminders(due_date) where completed_at is null;
create index reminders_user_id_idx on public.reminders(user_id);
