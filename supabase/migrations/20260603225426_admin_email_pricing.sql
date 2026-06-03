create table if not exists public.email_templates (
  id uuid primary key default gen_random_uuid(),
  template_key text not null unique,
  name text not null,
  description text,
  from_name text not null default 'PropertyPanel',
  from_email text not null default 'noreply@propertypanel.co.uk',
  subject text not null,
  body_html text not null,
  body_text text,
  variables text[] not null default array[]::text[],
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.email_send_logs (
  id uuid primary key default gen_random_uuid(),
  template_id uuid references public.email_templates(id) on delete set null,
  template_key text,
  recipient_email text not null,
  recipient_scope text not null default 'single',
  subject text not null,
  status text not null default 'queued' check (status in ('queued', 'sent', 'failed')),
  error_message text,
  sent_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.app_settings (
  setting_key text primary key,
  setting_value jsonb not null default '{}'::jsonb,
  description text,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

alter table public.email_templates enable row level security;
alter table public.email_templates force row level security;
alter table public.email_send_logs enable row level security;
alter table public.email_send_logs force row level security;
alter table public.app_settings enable row level security;
alter table public.app_settings force row level security;

drop policy if exists "Admins can manage email templates" on public.email_templates;
create policy "Admins can manage email templates"
on public.email_templates for all
to authenticated
using (public.current_user_is_admin())
with check (public.current_user_is_admin());

drop policy if exists "Admins can view email send logs" on public.email_send_logs;
create policy "Admins can view email send logs"
on public.email_send_logs for select
to authenticated
using (public.current_user_is_admin());

drop policy if exists "Service role can insert email send logs" on public.email_send_logs;
create policy "Service role can insert email send logs"
on public.email_send_logs for insert
to service_role
with check (true);

drop policy if exists "Admins can manage app settings" on public.app_settings;
create policy "Admins can manage app settings"
on public.app_settings for all
to authenticated
using (public.current_user_is_admin())
with check (public.current_user_is_admin());

drop policy if exists "Public can view plan settings" on public.app_settings;
create policy "Public can view plan settings"
on public.app_settings for select
to anon, authenticated
using (setting_key = 'plans');

grant select on public.app_settings to anon, authenticated;
grant select on public.marketing_cards to anon, authenticated;

insert into public.app_settings (setting_key, setting_value, description)
values (
  'plans',
  '{
    "premium": {
      "name": "Premium",
      "display_price": "£4.99",
      "price_monthly_pence": 499,
      "stripe_price_id": "",
      "checkout_enabled": true
    },
    "pro": {
      "name": "Pro",
      "display_price": "£9.99",
      "price_monthly_pence": 999,
      "stripe_price_id": "",
      "checkout_enabled": true
    }
  }'::jsonb,
  'Admin-managed display prices and optional Stripe price IDs. Stripe price IDs must start with price_.'
)
on conflict (setting_key) do nothing;

insert into public.email_templates (template_key, name, description, from_name, from_email, subject, body_html, body_text, variables)
values
(
  'welcome',
  'Welcome email',
  'Sent after account creation or manually from admin.',
  'PropertyPanel',
  'noreply@propertypanel.co.uk',
  'Welcome to PropertyPanel',
  '<p>Dear {{first_name}},</p><p>Thank you for joining PropertyPanel. Your property, organised.</p><p>You can now save property records, track rent and keep important dates in one clear panel.</p>',
  'Dear {{first_name}}, Thank you for joining PropertyPanel. Your property, organised.',
  array['first_name','email','plan_name']
),
(
  'rent_due',
  'Rent due reminder',
  'Reminder that rent is due for a property.',
  'PropertyPanel Reminder',
  'reminder@propertypanel.co.uk',
  'Rent due for {{property_reference}}',
  '<p>Dear {{first_name}},</p><p>This is a reminder that rent for <strong>{{property_reference}}</strong> is due now.</p><p>Amount due: <strong>{{rent_amount}}</strong><br />Due date: <strong>{{due_date}}</strong></p>',
  'Dear {{first_name}}, this is a reminder that rent for {{property_reference}} is due now. Amount: {{rent_amount}}. Due date: {{due_date}}.',
  array['first_name','property_reference','rent_amount','due_date']
),
(
  'mortgage_expiry',
  'Mortgage expiry reminder',
  'Reminder that a mortgage product is expiring.',
  'PropertyPanel Reminder',
  'reminder@propertypanel.co.uk',
  'Mortgage product expiring for {{property_reference}}',
  '<p>Dear {{first_name}},</p><p>Your mortgage product for <strong>{{property_reference}}</strong> is due to expire on <strong>{{due_date}}</strong>.</p>',
  'Dear {{first_name}}, your mortgage product for {{property_reference}} is due to expire on {{due_date}}.',
  array['first_name','property_reference','due_date']
),
(
  'document_expiry',
  'Document expiry reminder',
  'Reminder that a certificate/document is expiring.',
  'PropertyPanel Reminder',
  'reminder@propertypanel.co.uk',
  '{{document_name}} expires soon',
  '<p>Dear {{first_name}},</p><p><strong>{{document_name}}</strong> for <strong>{{property_reference}}</strong> expires on <strong>{{due_date}}</strong>.</p>',
  'Dear {{first_name}}, {{document_name}} for {{property_reference}} expires on {{due_date}}.',
  array['first_name','document_name','property_reference','due_date']
),
(
  'tenancy_expiry',
  'Tenancy ending reminder',
  'Reminder that a tenancy is ending.',
  'PropertyPanel Reminder',
  'reminder@propertypanel.co.uk',
  'Tenancy ending for {{property_reference}}',
  '<p>Dear {{first_name}},</p><p>The tenancy for <strong>{{property_reference}}</strong> is due to end on <strong>{{due_date}}</strong>.</p>',
  'Dear {{first_name}}, the tenancy for {{property_reference}} is due to end on {{due_date}}.',
  array['first_name','property_reference','tenant_name','due_date']
),
(
  'weekly_digest',
  'Weekly digest',
  'Weekly summary of upcoming property actions.',
  'PropertyPanel Reminder',
  'reminder@propertypanel.co.uk',
  'Your upcoming PropertyPanel actions',
  '<p>Dear {{first_name}},</p><p>Here are your upcoming property actions:</p><p>{{digest_items}}</p>',
  'Dear {{first_name}}, here are your upcoming property actions: {{digest_items}}.',
  array['first_name','digest_items']
),
(
  'sponsor_renewal_admin',
  'Sponsor renewal admin reminder',
  'Internal email 8 days before a sponsor/partner placement ends.',
  'PropertyPanel Reminder',
  'reminder@propertypanel.co.uk',
  '{{company_name}} placement ends in 8 days',
  '<p>{{company_name}} ends on {{paid_until}}.</p><p>Prepare a renewal offer. Billing email: {{billing_email}}. Renewal link: {{renewal_payment_link}}</p>',
  '{{company_name}} ends on {{paid_until}}. Prepare a renewal offer. Billing email: {{billing_email}}.',
  array['company_name','paid_until','billing_email','renewal_amount','renewal_payment_link']
),
(
  'sponsor_renewal_customer',
  'Sponsor renewal customer reminder',
  'Customer email 7 days before a sponsor/partner placement ends.',
  'PropertyPanel Partners',
  'noreply@propertypanel.co.uk',
  'Your PropertyPanel placement ends soon',
  '<p>Dear {{contact_name}},</p><p>Your PropertyPanel placement for <strong>{{company_name}}</strong> ends on <strong>{{paid_until}}</strong>.</p><p>{{renewal_message}}</p>',
  'Dear {{contact_name}}, your PropertyPanel placement for {{company_name}} ends on {{paid_until}}. {{renewal_message}}',
  array['contact_name','company_name','paid_until','renewal_amount','renewal_payment_link','renewal_message']
)
on conflict (template_key) do nothing;
