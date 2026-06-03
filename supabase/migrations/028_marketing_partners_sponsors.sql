create table if not exists public.marketing_cards (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('partner', 'sponsor')),
  name text not null,
  category text,
  headline text,
  description text,
  logo_url text,
  asset_url text,
  cta_text text,
  cta_url text,
  placements text[] not null default array[]::text[],
  billing_type text not null default 'free' check (billing_type in ('paid', 'free')),
  billing_email text,
  billing_contact_name text,
  company_name text,
  billing_address text,
  amount_pence integer not null default 0 check (amount_pence >= 0),
  payment_link_url text,
  payment_status text not null default 'free' check (payment_status in ('free', 'unpaid', 'payment_link_sent', 'paid', 'overdue', 'cancelled')),
  starts_at date,
  paid_until date,
  renewal_amount_pence integer not null default 0 check (renewal_amount_pence >= 0),
  renewal_payment_link_url text,
  renewal_reminder_enabled boolean not null default true,
  admin_reminder_sent_at timestamptz,
  renewal_reminder_sent_at timestamptz,
  internal_memo text,
  priority integer not null default 10,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.marketing_cards enable row level security;
alter table public.marketing_cards force row level security;

create index if not exists marketing_cards_public_idx
on public.marketing_cards(kind, active, priority, created_at desc);

create index if not exists marketing_cards_paid_until_idx
on public.marketing_cards(paid_until)
where active = true and paid_until is not null;

drop policy if exists "Public can view active marketing cards" on public.marketing_cards;
create policy "Public can view active marketing cards"
on public.marketing_cards for select
to anon, authenticated
using (
  active = true
  and (starts_at is null or starts_at <= current_date)
  and (paid_until is null or paid_until >= current_date)
  and (
    billing_type = 'free'
    or payment_status in ('paid', 'free')
  )
);

drop policy if exists "Admins can manage marketing cards" on public.marketing_cards;
create policy "Admins can manage marketing cards"
on public.marketing_cards for all
to authenticated
using (public.current_user_is_admin())
with check (public.current_user_is_admin());
