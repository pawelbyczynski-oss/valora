create table if not exists public.calendar_feed_tokens (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  token uuid not null unique default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.calendar_feed_tokens enable row level security;
alter table public.calendar_feed_tokens force row level security;

create policy "Users can manage own pro calendar feed token"
on public.calendar_feed_tokens for all
using (auth.uid() = user_id and public.has_pro_access_for_user(auth.uid()))
with check (auth.uid() = user_id and public.has_pro_access_for_user(auth.uid()));

grant select, insert, update, delete on public.calendar_feed_tokens to authenticated;

create trigger calendar_feed_tokens_updated_at
before update on public.calendar_feed_tokens
for each row execute function public.set_updated_at();
