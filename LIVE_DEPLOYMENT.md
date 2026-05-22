# Valora Live SaaS Checklist

This prototype is currently a static product demo. These files add the production foundation for Supabase, Stripe and email reminders.

## 1. Accounts to create

- Supabase project
- Stripe account with a monthly recurring price for `£4.99`
- Resend account for email reminders
- Vercel project or another static/frontend host

## 2. Supabase setup

1. Create a Supabase project.
2. Run `supabase/migrations/001_initial_schema.sql` in the SQL editor or via Supabase CLI.
3. Enable auth providers:
   - Google
   - Apple
   - Email magic link
4. Create a private storage bucket for property documents, for example `property-documents`.
5. Add the environment variables from `.env.example`.

## 3. Stripe setup

1. Create a recurring price: `£4.99/month`.
2. Copy the price id into `STRIPE_PRICE_ID_MONTHLY`.
3. Deploy `supabase/functions/create-checkout-session`.
4. Deploy `supabase/functions/stripe-webhook`.
5. Add a Stripe webhook endpoint pointing to the deployed `stripe-webhook` function.
6. Listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

## 4. Reminder emails

1. Deploy `supabase/functions/send-reminders`.
2. Schedule it daily.
3. Add `RESEND_API_KEY` and `REMINDER_FROM_EMAIL`.

Reminder types supported by the schema:

- rent due reminders
- mortgage expiry reminders
- document expiry reminders

## 5. Frontend work still needed

The UI is ready as a prototype, and `app.js` now persists demo properties in `localStorage`. To go live, replace that local persistence with Supabase:

- sign in with Supabase Auth
- load properties where `user_id = auth.uid()`
- insert/update/delete `properties`
- upload documents to Supabase Storage and insert `documents`
- create reminders in the `reminders` table
- call `create-checkout-session` when the user starts premium
- gate premium dashboard access by subscription status

## 6. Legal and product notes

Add clear disclaimers before launch:

- Valora is not financial advice.
- Valora is not tax advice.
- Valora is not legal advice.
- Tax and mortgage calculations are estimates.
- Users should confirm figures with a qualified adviser, accountant, solicitor or broker.

For the Scottish tenancy agreement flow, keep the official mygov.scot generator as the final source of truth.
