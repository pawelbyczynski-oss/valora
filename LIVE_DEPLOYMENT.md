# PropertyPanel Live SaaS Checklist

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
2. Apply `supabase/migrations/021_pro_reminder_delivery.sql` to schedule it daily at `07:00 UTC`.
3. Add `RESEND_API_KEY`, `REMINDER_FROM_EMAIL` and `REMINDER_CRON_SECRET` as Edge Function secrets.
4. Copy the generated Vault value named `propertypanel_reminder_cron_secret` into `REMINDER_CRON_SECRET`.

To read the generated cron secret once in the Supabase SQL editor:

```sql
select decrypted_secret
from vault.decrypted_secrets
where name = 'propertypanel_reminder_cron_secret';
```

Use this sender:

`PropertyPanel Reminder <reminder@propertypanel.co.uk>`

Reminder types supported by the schema:

- rent due reminders
- mortgage expiry reminders
- document expiry reminders
- tenancy expiry reminders

Pro expiry reminders are generated 3 months, 1 month and 1 week before the saved date.
Rent reminders are generated 1 week, 1 day and on the due date.

Optional Twilio SMS delivery is prepared but disabled by default. To launch it later:

1. Add `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN`.
2. Add either `TWILIO_MESSAGING_SERVICE_SID` or `TWILIO_FROM_NUMBER`.
3. Add an explicit user opt-in UI for `profiles.sms_reminders_enabled` and save an E.164 phone number in `profiles.mobile_phone`.

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

- PropertyPanel is not financial advice.
- PropertyPanel is not tax advice.
- PropertyPanel is not legal advice.
- Tax and mortgage calculations are estimates.
- Users should confirm figures with a qualified adviser, accountant, solicitor or broker.

For the Scottish tenancy agreement flow, keep the official mygov.scot generator as the final source of truth.
