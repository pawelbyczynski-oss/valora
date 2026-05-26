create table if not exists public.property_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid references public.properties(id) on delete set null,
  transaction_date date not null,
  amount numeric(12, 2) not null default 0,
  transaction_type text not null check (transaction_type in ('income', 'expense')),
  category text not null default 'Uncategorised',
  tax_treatment text not null default 'review' check (tax_treatment in ('revenue', 'capital', 'review')),
  source text not null default 'manual' check (source in ('manual', 'ai', 'pdf')),
  status text not null default 'approved' check (status in ('draft', 'approved', 'review')),
  notes text,
  document_id uuid references public.documents(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.property_transactions enable row level security;

drop policy if exists "Users can manage own property transactions" on public.property_transactions;
create policy "Users can manage own property transactions"
on public.property_transactions for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop trigger if exists property_transactions_updated_at on public.property_transactions;
create trigger property_transactions_updated_at
before update on public.property_transactions
for each row execute function public.set_updated_at();

create index if not exists property_transactions_user_date_idx on public.property_transactions(user_id, transaction_date desc);
create index if not exists property_transactions_property_id_idx on public.property_transactions(property_id);
