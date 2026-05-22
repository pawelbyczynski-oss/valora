alter table public.payments
add column if not exists invoice_number text,
add column if not exists hosted_invoice_url text,
add column if not exists invoice_pdf_url text,
add column if not exists billing_reason text;

create index if not exists payments_user_paid_at_idx
on public.payments(user_id, paid_at desc);
