create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  user_agent text,
  enabled boolean not null default true,
  last_success_at timestamptz,
  last_failure_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger push_subscriptions_updated_at
before update on public.push_subscriptions
for each row execute function public.set_updated_at();

alter table public.push_subscriptions enable row level security;
alter table public.push_subscriptions force row level security;

drop policy if exists "Users can manage own push subscriptions" on public.push_subscriptions;
create policy "Users can manage own push subscriptions"
on public.push_subscriptions for all
using (auth.uid() = user_id and public.has_pro_access_for_user(auth.uid()))
with check (auth.uid() = user_id and public.has_pro_access_for_user(auth.uid()));

create index if not exists push_subscriptions_user_enabled_idx
on public.push_subscriptions(user_id)
where enabled = true;

alter table public.reminders
add column if not exists push_enabled boolean not null default true,
add column if not exists push_sent_at timestamptz,
add column if not exists push_attempted_at timestamptz,
add column if not exists last_push_error text;

create index if not exists reminders_pending_push_idx
on public.reminders(due_date)
where completed_at is null and push_enabled = true and push_sent_at is null;
