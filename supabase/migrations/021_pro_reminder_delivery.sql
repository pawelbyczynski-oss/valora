create extension if not exists pg_net with schema extensions;
create extension if not exists pg_cron with schema pg_catalog;

grant usage on schema cron to postgres;
grant all privileges on all tables in schema cron to postgres;

alter type public.reminder_type add value if not exists 'tenancy_expiry';

alter table public.profiles
add column if not exists mobile_phone text,
add column if not exists sms_reminders_enabled boolean not null default false;

alter table public.reminders
add column if not exists reminder_key text,
add column if not exists source_kind text not null default 'manual',
add column if not exists event_date date,
add column if not exists lead_days integer,
add column if not exists last_email_error text,
add column if not exists email_attempted_at timestamptz,
add column if not exists sms_enabled boolean not null default false,
add column if not exists sms_sent_at timestamptz,
add column if not exists last_sms_error text,
add column if not exists sms_attempted_at timestamptz;

create unique index if not exists reminders_generated_key_idx
on public.reminders(reminder_key)
where reminder_key is not null;

create index if not exists reminders_pending_email_idx
on public.reminders(due_date)
where email_enabled = true and sent_at is null and completed_at is null;

create index if not exists reminders_pending_sms_idx
on public.reminders(due_date)
where sms_enabled = true and sms_sent_at is null and completed_at is null;

do $$
begin
  if not exists (select 1 from vault.decrypted_secrets where name = 'propertypanel_project_url') then
    perform vault.create_secret('https://ghcwjuckcgqdnmjwmjcj.supabase.co', 'propertypanel_project_url');
  end if;

  if not exists (select 1 from vault.decrypted_secrets where name = 'propertypanel_reminder_cron_secret') then
    perform vault.create_secret(encode(extensions.gen_random_bytes(32), 'hex'), 'propertypanel_reminder_cron_secret');
  end if;
end;
$$;

select cron.schedule(
  'propertypanel-send-reminders-daily',
  '0 7 * * *',
  $$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name = 'propertypanel_project_url') || '/functions/v1/send-reminders',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'propertypanel_reminder_cron_secret')
    ),
    body := jsonb_build_object('trigger', 'daily-cron', 'requested_at', now()),
    timeout_milliseconds := 10000
  ) as request_id;
  $$
);
