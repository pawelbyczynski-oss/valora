do $$
begin
  create type public.analytics_event_type as enum (
    'page_view',
    'calculator_update',
    'tax_modal_opened',
    'premium_viewed',
    'login_started',
    'property_added',
    'pdf_exported',
    'promo_redeemed'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists public.promo_codes (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  description text,
  free_months integer not null default 0,
  lifetime_access boolean not null default false,
  max_redemptions integer,
  redeemed_count integer not null default 0,
  active boolean not null default true,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.promo_redemptions (
  id uuid primary key default gen_random_uuid(),
  promo_code_id uuid not null references public.promo_codes(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  redeemed_at timestamptz not null default now(),
  unique (promo_code_id, user_id)
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  event_type public.analytics_event_type not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.promo_codes enable row level security;
alter table public.promo_redemptions enable row level security;
alter table public.analytics_events enable row level security;

drop policy if exists "Users can view active promo codes" on public.promo_codes;
create policy "Users can view active promo codes"
on public.promo_codes for select
using (active = true);

drop policy if exists "Users can view own promo redemptions" on public.promo_redemptions;
create policy "Users can view own promo redemptions"
on public.promo_redemptions for select
using (auth.uid() = user_id);

drop policy if exists "Users can create own promo redemptions" on public.promo_redemptions;
create policy "Users can create own promo redemptions"
on public.promo_redemptions for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can create analytics events" on public.analytics_events;
create policy "Users can create analytics events"
on public.analytics_events for insert
with check (auth.uid() = user_id or user_id is null);

create index if not exists analytics_events_type_created_at_idx
on public.analytics_events(event_type, created_at desc);

insert into public.promo_codes (code, description, lifetime_access, max_redemptions)
values ('FRIENDS100', 'Free lifetime access for friends and early testers', true, 100)
on conflict (code) do nothing;
