import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import webpush from "npm:web-push@3.6.7";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

const APP_BASE_URL = Deno.env.get("APP_BASE_URL") ?? "https://propertypanel.co.uk";
const REMINDER_FROM_EMAIL =
  Deno.env.get("REMINDER_FROM_EMAIL") ?? "PropertyPanel Reminder <reminder@propertypanel.co.uk>";
const SPONSOR_ADMIN_EMAIL = Deno.env.get("SPONSOR_ADMIN_EMAIL") ?? "contact@propertypanel.co.uk";
const VAPID_PUBLIC_KEY = Deno.env.get("VAPID_PUBLIC_KEY") ?? "";
const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY") ?? "";
const VAPID_SUBJECT = Deno.env.get("VAPID_SUBJECT") ?? "mailto:contact@propertypanel.co.uk";
const EXPIRY_LEAD_DAYS = [90, 30, 7];
const RENT_LEAD_DAYS = [7, 1, 0];

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

type Profile = {
  id: string;
  email: string;
  mobile_phone?: string | null;
  sms_reminders_enabled?: boolean;
  weekly_digest_sent_for_week?: string | null;
};

type ReminderCandidate = {
  user_id: string;
  property_id?: string | null;
  document_id?: string | null;
  reminder_type: "rent_due" | "mortgage_expiry" | "document_expiry" | "tenancy_expiry";
  title: string;
  due_date: string;
  email_enabled: boolean;
  sms_enabled: boolean;
  reminder_key: string;
  source_kind: "generated";
  event_date: string;
  lead_days: number;
};

function dateValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(dateString: string, amount: number) {
  const date = new Date(`${dateString}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + amount);
  return dateValue(date);
}

function nextRentEventDates(dayOfMonth: number) {
  const today = new Date();
  const dates: string[] = [];
  for (let monthOffset = 0; monthOffset <= 1; monthOffset += 1) {
    const year = today.getUTCFullYear();
    const month = today.getUTCMonth() + monthOffset;
    const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    const event = new Date(Date.UTC(year, month, Math.min(Math.max(dayOfMonth || 1, 1), lastDay), 12));
    if (event >= new Date(`${dateValue(today)}T00:00:00Z`)) dates.push(dateValue(event));
  }
  return dates;
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function leadLabel(leadDays: number) {
  if (leadDays === 90) return "in 3 months";
  if (leadDays === 30) return "in 1 month";
  if (leadDays === 7) return "in 1 week";
  if (leadDays === 1) return "tomorrow";
  return "today";
}

function emailHtml(reminder: Record<string, unknown>) {
  const title = escapeHtml(reminder.title);
  const eventDate = escapeHtml(reminder.event_date);
  const lead = leadLabel(Number(reminder.lead_days || 0));
  return `
    <!doctype html>
    <html>
      <body style="margin:0;background:#f7f8fa;color:#1f2933;font-family:Arial,sans-serif">
        <div style="max-width:620px;margin:0 auto;padding:32px 20px">
          <div style="background:#ffffff;border:1px solid #d8dee6;border-radius:8px;padding:24px">
            <div style="color:#0f766e;font-size:14px;font-weight:700">PropertyPanel Reminder</div>
            <h1 style="margin:16px 0 8px;font-size:24px;line-height:1.25">${title}</h1>
            <p style="margin:0 0 18px;color:#475569;line-height:1.6">
              This item is due ${escapeHtml(lead)}. The recorded due date is <strong>${eventDate}</strong>.
            </p>
            <a href="${escapeHtml(APP_BASE_URL)}" style="display:inline-block;padding:12px 16px;border-radius:6px;background:#0f766e;color:#ffffff;text-decoration:none;font-weight:700">
              Open PropertyPanel
            </a>
            <p style="margin:24px 0 0;color:#64748b;font-size:12px;line-height:1.5">
              This is an organisational reminder. Please verify important dates and compliance obligations independently.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function smsText(reminder: Record<string, unknown>) {
  return `PropertyPanel Reminder: ${String(reminder.title)} is due ${leadLabel(Number(reminder.lead_days || 0))} (${String(reminder.event_date)}).`;
}

function pushPayload(reminder: Record<string, unknown>) {
  return JSON.stringify({
    title: `PropertyPanel: ${String(reminder.title)}`,
    body: `Due ${leadLabel(Number(reminder.lead_days || 0))} (${String(reminder.event_date)}).`,
    url: APP_BASE_URL,
  });
}

function digestEmailHtml(reminders: Record<string, unknown>[]) {
  const rows = reminders.map((reminder) => `
    <li style="margin:0 0 14px">
      <strong>${escapeHtml(reminder.title)}</strong><br />
      <span style="color:#64748b;font-size:14px">${escapeHtml(reminder.event_date)}</span>
    </li>
  `).join("");
  return `
    <!doctype html>
    <html>
      <body style="margin:0;background:#f7f8fa;color:#1f2933;font-family:Arial,sans-serif">
        <div style="max-width:620px;margin:0 auto;padding:32px 20px">
          <div style="background:#ffffff;border:1px solid #d8dee6;border-radius:8px;padding:24px">
            <div style="color:#0f766e;font-size:14px;font-weight:700">PropertyPanel Weekly Digest</div>
            <h1 style="margin:16px 0 8px;font-size:24px;line-height:1.25">Your upcoming property actions</h1>
            <p style="margin:0 0 18px;color:#475569;line-height:1.6">
              Review the dates below and update your portfolio records when anything changes.
            </p>
            <ul style="margin:0 0 20px;padding-left:20px">${rows}</ul>
            <a href="${escapeHtml(APP_BASE_URL)}" style="display:inline-block;padding:12px 16px;border-radius:6px;background:#0f766e;color:#ffffff;text-decoration:none;font-weight:700">
              Open PropertyPanel
            </a>
          </div>
        </div>
      </body>
    </html>
  `;
}

function candidate(
  profile: Profile,
  source: {
    type: ReminderCandidate["reminder_type"];
    sourceId: string;
    propertyId?: string | null;
    documentId?: string | null;
    title: string;
    eventDate: string;
  },
  leadDays: number,
): ReminderCandidate {
  return {
    user_id: profile.id,
    property_id: source.propertyId || null,
    document_id: source.documentId || null,
    reminder_type: source.type,
    title: source.title,
    due_date: addDays(source.eventDate, -leadDays),
    email_enabled: true,
    sms_enabled: profile.sms_reminders_enabled === true && Boolean(profile.mobile_phone),
    reminder_key: `${source.type}:${source.sourceId}:${source.eventDate}:${leadDays}`,
    source_kind: "generated",
    event_date: source.eventDate,
    lead_days: leadDays,
  };
}

async function syncGeneratedReminders() {
  const { data: subscriptionRows, error: subscriptionError } = await supabase
    .from("subscriptions")
    .select("user_id,plan_code,amount_monthly_pence,current_period_end")
    .in("status", ["active", "trialing"])
    .or(`current_period_end.is.null,current_period_end.gt.${new Date().toISOString()}`);
  if (subscriptionError) throw subscriptionError;

  const proUserIds = [...new Set(
    (subscriptionRows ?? [])
      .filter((subscription) => subscription.plan_code === "pro" || Number(subscription.amount_monthly_pence || 0) >= 999)
      .map((subscription) => subscription.user_id),
  )];
  if (!proUserIds.length) return { proUsers: 0, generated: 0 };

  const [{ data: profiles, error: profileError }, { data: properties, error: propertyError }] = await Promise.all([
    supabase.from("profiles").select("id,email,mobile_phone,sms_reminders_enabled,weekly_digest_sent_for_week").in("id", proUserIds),
    supabase
      .from("properties")
      .select("id,user_id,name,mortgage_expiry_date,rent_due_day,rent_reminder_enabled")
      .in("user_id", proUserIds),
  ]);
  if (profileError) throw profileError;
  if (propertyError) throw propertyError;

  const propertyIds = (properties ?? []).map((property) => property.id);
  const [{ data: documents, error: documentError }, { data: tenancies, error: tenancyError }] = propertyIds.length
    ? await Promise.all([
      supabase
        .from("documents")
        .select("id,user_id,property_id,label,document_type,expiry_date,reminder_enabled")
        .in("property_id", propertyIds)
        .eq("reminder_enabled", true),
      supabase
        .from("tenancy_periods")
        .select("id,user_id,property_id,tenant_name,tenancy_end_date")
        .in("property_id", propertyIds),
    ])
    : [{ data: [], error: null }, { data: [], error: null }];
  if (documentError) throw documentError;
  if (tenancyError) throw tenancyError;

  const profileById = new Map((profiles ?? []).map((profile) => [profile.id, profile as Profile]));
  const candidates: ReminderCandidate[] = [];
  for (const property of properties ?? []) {
    const profile = profileById.get(property.user_id);
    if (!profile) continue;
    if (property.mortgage_expiry_date) {
      EXPIRY_LEAD_DAYS.forEach((leadDays) =>
        candidates.push(candidate(profile, {
          type: "mortgage_expiry",
          sourceId: property.id,
          propertyId: property.id,
          title: `${property.name} mortgage product expiry`,
          eventDate: property.mortgage_expiry_date,
        }, leadDays))
      );
    }
    if (property.rent_reminder_enabled) {
      nextRentEventDates(Number(property.rent_due_day || 1)).forEach((eventDate) =>
        RENT_LEAD_DAYS.forEach((leadDays) =>
          candidates.push(candidate(profile, {
            type: "rent_due",
            sourceId: property.id,
            propertyId: property.id,
            title: `${property.name} rent payment`,
            eventDate,
          }, leadDays))
        )
      );
    }
  }

  for (const document of documents ?? []) {
    if (!document.expiry_date) continue;
    const profile = profileById.get(document.user_id);
    if (!profile) continue;
    EXPIRY_LEAD_DAYS.forEach((leadDays) =>
      candidates.push(candidate(profile, {
        type: "document_expiry",
        sourceId: document.id,
        propertyId: document.property_id,
        documentId: document.id,
        title: `${document.label || document.document_type} expiry`,
        eventDate: document.expiry_date,
      }, leadDays))
    );
  }

  for (const tenancy of tenancies ?? []) {
    if (!tenancy.tenancy_end_date) continue;
    const profile = profileById.get(tenancy.user_id);
    if (!profile) continue;
    EXPIRY_LEAD_DAYS.forEach((leadDays) =>
      candidates.push(candidate(profile, {
        type: "tenancy_expiry",
        sourceId: tenancy.id,
        propertyId: tenancy.property_id,
        title: `Tenancy ending${tenancy.tenant_name ? `: ${tenancy.tenant_name}` : ""}`,
        eventDate: tenancy.tenancy_end_date,
      }, leadDays))
    );
  }

  const { error: deleteError } = await supabase
    .from("reminders")
    .delete()
    .in("user_id", proUserIds)
    .eq("source_kind", "generated")
    .is("sent_at", null)
    .is("sms_sent_at", null)
    .is("push_sent_at", null);
  if (deleteError) throw deleteError;

  if (candidates.length) {
    const { error: upsertError } = await supabase
      .from("reminders")
      .upsert(candidates, { onConflict: "reminder_key", ignoreDuplicates: true });
    if (upsertError) throw upsertError;
  }
  return { proUsers: proUserIds.length, generated: candidates.length };
}

function marketingRenewalAdminHtml(card: Record<string, unknown>) {
  const name = escapeHtml(card.name);
  const kind = escapeHtml(card.kind);
  const paidUntil = escapeHtml(card.paid_until);
  const billingEmail = escapeHtml(card.billing_email || "-");
  const amount = Number(card.amount_pence || 0) / 100;
  const renewalAmount = Number(card.renewal_amount_pence || 0) / 100;
  const renewalLink = String(card.renewal_payment_link_url || "");
  return `
    <!doctype html>
    <html>
      <body style="margin:0;background:#f7f8fa;color:#1f2933;font-family:Arial,sans-serif">
        <div style="max-width:640px;margin:0 auto;padding:32px 20px">
          <div style="background:#ffffff;border:1px solid #d8dee6;border-radius:8px;padding:24px">
            <div style="color:#0f766e;font-size:14px;font-weight:700">PropertyPanel Admin Reminder</div>
            <h1 style="margin:16px 0 8px;font-size:24px;line-height:1.25">${name} ends in 8 days</h1>
            <p style="color:#475569;line-height:1.6">Prepare a renewal offer or new Stripe payment link before the customer reminder goes out tomorrow.</p>
            <ul style="line-height:1.8;color:#1f2933">
              <li><strong>Type:</strong> ${kind}</li>
              <li><strong>Ends:</strong> ${paidUntil}</li>
              <li><strong>Billing email:</strong> ${billingEmail}</li>
              <li><strong>Current amount:</strong> £${amount.toFixed(2)}</li>
              <li><strong>Renewal amount:</strong> £${renewalAmount.toFixed(2)}</li>
              <li><strong>Renewal link:</strong> ${renewalLink ? `<a href="${escapeHtml(renewalLink)}">${escapeHtml(renewalLink)}</a>` : "not set"}</li>
            </ul>
            <a href="${escapeHtml(APP_BASE_URL)}" style="display:inline-block;padding:12px 16px;border-radius:6px;background:#0f766e;color:#ffffff;text-decoration:none;font-weight:700">Open admin</a>
          </div>
        </div>
      </body>
    </html>
  `;
}

function marketingRenewalCustomerHtml(card: Record<string, unknown>) {
  const name = escapeHtml(card.name);
  const paidUntil = escapeHtml(card.paid_until);
  const renewalLink = String(card.renewal_payment_link_url || "");
  const renewalAmount = Number(card.renewal_amount_pence || 0) / 100;
  return `
    <!doctype html>
    <html>
      <body style="margin:0;background:#f7f8fa;color:#1f2933;font-family:Arial,sans-serif">
        <div style="max-width:640px;margin:0 auto;padding:32px 20px">
          <div style="background:#ffffff;border:1px solid #d8dee6;border-radius:8px;padding:24px">
            <div style="color:#0f766e;font-size:14px;font-weight:700">PropertyPanel Partners</div>
            <h1 style="margin:16px 0 8px;font-size:24px;line-height:1.25">Your PropertyPanel placement ends soon</h1>
            <p style="color:#475569;line-height:1.6">
              ${name} is currently listed with PropertyPanel until <strong>${paidUntil}</strong>.
              ${renewalAmount ? `The renewal amount is <strong>£${renewalAmount.toFixed(2)}</strong>.` : ""}
            </p>
            ${renewalLink ? `<a href="${escapeHtml(renewalLink)}" style="display:inline-block;padding:12px 16px;border-radius:6px;background:#0f766e;color:#ffffff;text-decoration:none;font-weight:700">Renew placement</a>` : `<p style="color:#475569">Reply to this email if you would like to renew or change the placement.</p>`}
            <p style="margin:24px 0 0;color:#64748b;font-size:12px;line-height:1.5">Thank you for supporting PropertyPanel.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

async function sendMarketingEmail(to: string, subject: string, html: string) {
  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (!resendKey) throw new Error("RESEND_API_KEY is not configured.");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: REMINDER_FROM_EMAIL,
      to,
      subject,
      html,
    }),
  });
  if (!response.ok) throw new Error(`Resend ${response.status}: ${await response.text()}`);
}

async function sendMarketingRenewalReminders(today: string) {
  let adminSent = 0;
  let customerSent = 0;
  let failed = 0;

  const adminReminderDate = addDays(today, 8);
  const { data: adminCards, error: adminError } = await supabase
    .from("marketing_cards")
    .select("*")
    .eq("active", true)
    .eq("paid_until", adminReminderDate)
    .is("admin_reminder_sent_at", null);
  if (adminError) throw adminError;

  for (const card of adminCards ?? []) {
    try {
      await sendMarketingEmail(
        SPONSOR_ADMIN_EMAIL,
        `PropertyPanel: ${card.name} placement ends in 8 days`,
        marketingRenewalAdminHtml(card),
      );
      await supabase.from("marketing_cards").update({ admin_reminder_sent_at: new Date().toISOString() }).eq("id", card.id);
      adminSent += 1;
    } catch (error) {
      console.error("Marketing admin reminder failed", card.id, error);
      failed += 1;
    }
  }

  const customerReminderDate = addDays(today, 7);
  const { data: customerCards, error: customerError } = await supabase
    .from("marketing_cards")
    .select("*")
    .eq("active", true)
    .eq("renewal_reminder_enabled", true)
    .eq("paid_until", customerReminderDate)
    .not("billing_email", "is", null)
    .is("renewal_reminder_sent_at", null);
  if (customerError) throw customerError;

  for (const card of customerCards ?? []) {
    try {
      await sendMarketingEmail(
        String(card.billing_email),
        "Your PropertyPanel placement ends soon",
        marketingRenewalCustomerHtml(card),
      );
      await supabase.from("marketing_cards").update({ renewal_reminder_sent_at: new Date().toISOString() }).eq("id", card.id);
      customerSent += 1;
    } catch (error) {
      console.error("Marketing customer reminder failed", card.id, error);
      failed += 1;
    }
  }

  return { marketingAdminSent: adminSent, marketingCustomerSent: customerSent, marketingFailed: failed };
}

async function sendEmail(reminder: Record<string, unknown>, email: string) {
  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (!resendKey) throw new Error("RESEND_API_KEY is not configured.");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: REMINDER_FROM_EMAIL,
      to: email,
      subject: `PropertyPanel Reminder: ${String(reminder.title)}`,
      html: emailHtml(reminder),
    }),
  });
  if (!response.ok) throw new Error(`Resend ${response.status}: ${await response.text()}`);
}

async function sendDigestEmail(reminders: Record<string, unknown>[], email: string) {
  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (!resendKey) throw new Error("RESEND_API_KEY is not configured.");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: REMINDER_FROM_EMAIL,
      to: email,
      subject: "PropertyPanel Weekly Digest: upcoming actions",
      html: digestEmailHtml(reminders),
    }),
  });
  if (!response.ok) throw new Error(`Resend ${response.status}: ${await response.text()}`);
}

async function sendWeeklyDigests(today: string) {
  if (new Date(`${today}T12:00:00Z`).getUTCDay() !== 1) return 0;
  const digestEnd = addDays(today, 90);
  const { data: reminders, error } = await supabase
    .from("reminders")
    .select("user_id,title,event_date,profiles(email,weekly_digest_sent_for_week)")
    .eq("source_kind", "generated")
    .gte("event_date", today)
    .lte("event_date", digestEnd);
  if (error) throw error;

  const remindersByUser = new Map<string, Record<string, unknown>[]>();
  for (const reminder of reminders ?? []) {
    const profile = reminder.profiles as { email?: string; weekly_digest_sent_for_week?: string | null } | null;
    if (!profile?.email || profile.weekly_digest_sent_for_week === today) continue;
    const current = remindersByUser.get(reminder.user_id) ?? [];
    if (!current.some((item) => item.title === reminder.title && item.event_date === reminder.event_date)) {
      current.push(reminder);
    }
    remindersByUser.set(reminder.user_id, current);
  }

  let sent = 0;
  for (const [userId, userReminders] of remindersByUser.entries()) {
    const profile = userReminders[0]?.profiles as { email?: string } | null;
    if (!profile?.email || !userReminders.length) continue;
    await sendDigestEmail(userReminders, profile.email);
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ weekly_digest_sent_for_week: today })
      .eq("id", userId);
    if (updateError) throw updateError;
    sent += 1;
  }
  return sent;
}

async function sendSms(reminder: Record<string, unknown>, mobilePhone: string) {
  const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
  const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
  const fromNumber = Deno.env.get("TWILIO_FROM_NUMBER");
  const messagingServiceSid = Deno.env.get("TWILIO_MESSAGING_SERVICE_SID");
  if (!accountSid || !authToken || (!fromNumber && !messagingServiceSid)) return false;

  const form = new URLSearchParams({ To: mobilePhone, Body: smsText(reminder) });
  if (messagingServiceSid) form.set("MessagingServiceSid", messagingServiceSid);
  else form.set("From", fromNumber ?? "");
  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form,
  });
  if (!response.ok) throw new Error(`Twilio ${response.status}: ${await response.text()}`);
  return true;
}

async function sendPush(reminder: Record<string, unknown>, userId: string) {
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) return { sent: 0, attempted: false, error: "VAPID keys are not configured." };

  const { data: subscriptions, error } = await supabase
    .from("push_subscriptions")
    .select("id,endpoint,p256dh,auth")
    .eq("user_id", userId)
    .eq("enabled", true);
  if (error) throw error;

  if (!subscriptions?.length) return { sent: 0, attempted: true, error: null };

  let sent = 0;
  let lastError = "";
  for (const subscription of subscriptions) {
    try {
      await webpush.sendNotification({
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.p256dh,
          auth: subscription.auth,
        },
      }, pushPayload(reminder));
      await supabase.from("push_subscriptions").update({
        last_success_at: new Date().toISOString(),
        last_failure_at: null,
        last_error: null,
      }).eq("id", subscription.id);
      sent += 1;
    } catch (error) {
      const statusCode = Number((error as { statusCode?: number })?.statusCode || 0);
      const message = error instanceof Error ? error.message : String(error);
      lastError = message;
      await supabase.from("push_subscriptions").update({
        enabled: statusCode === 404 || statusCode === 410 ? false : true,
        last_failure_at: new Date().toISOString(),
        last_error: message,
      }).eq("id", subscription.id);
    }
  }

  return { sent, attempted: true, error: sent ? null : lastError || "No push subscription delivered." };
}

Deno.serve(async (request) => {
  if (request.method !== "POST") return Response.json({ error: "Method not allowed" }, { status: 405 });
  const cronSecret = Deno.env.get("REMINDER_CRON_SECRET");
  const suppliedSecret = (request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
  if (!cronSecret || suppliedSecret !== cronSecret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sync = await syncGeneratedReminders();
    const today = dateValue(new Date());
    const { data: reminders, error } = await supabase
      .from("reminders")
      .select("id,user_id,title,event_date,lead_days,email_enabled,sms_enabled,push_enabled,sent_at,sms_sent_at,push_sent_at,profiles(email,mobile_phone,sms_reminders_enabled)")
      .lte("due_date", today)
      .is("completed_at", null)
      .or("sent_at.is.null,sms_sent_at.is.null,push_sent_at.is.null");
    if (error) throw error;

    let emailsSent = 0;
    let smsSent = 0;
    let pushSent = 0;
    let failed = 0;
    for (const reminder of reminders ?? []) {
      const profile = reminder.profiles as { email?: string; mobile_phone?: string; sms_reminders_enabled?: boolean } | null;
      if (reminder.email_enabled && !reminder.sent_at && profile?.email) {
        try {
          await sendEmail(reminder, profile.email);
          await supabase.from("reminders").update({
            sent_at: new Date().toISOString(),
            email_attempted_at: new Date().toISOString(),
            last_email_error: null,
          }).eq("id", reminder.id);
          emailsSent += 1;
        } catch (sendError) {
          await supabase.from("reminders").update({
            email_attempted_at: new Date().toISOString(),
            last_email_error: sendError instanceof Error ? sendError.message : String(sendError),
          }).eq("id", reminder.id);
          failed += 1;
        }
      }

      if (reminder.sms_enabled && !reminder.sms_sent_at && profile?.sms_reminders_enabled && profile.mobile_phone) {
        try {
          const delivered = await sendSms(reminder, profile.mobile_phone);
          if (delivered) {
            await supabase.from("reminders").update({
              sms_sent_at: new Date().toISOString(),
              sms_attempted_at: new Date().toISOString(),
              last_sms_error: null,
            }).eq("id", reminder.id);
            smsSent += 1;
          }
        } catch (sendError) {
          await supabase.from("reminders").update({
            sms_attempted_at: new Date().toISOString(),
            last_sms_error: sendError instanceof Error ? sendError.message : String(sendError),
          }).eq("id", reminder.id);
          failed += 1;
        }
      }

      if (reminder.push_enabled && !reminder.push_sent_at) {
        try {
          const delivered = await sendPush(reminder, String(reminder.user_id));
          if (delivered.attempted) {
            await supabase.from("reminders").update({
              push_sent_at: new Date().toISOString(),
              push_attempted_at: new Date().toISOString(),
              last_push_error: delivered.error,
            }).eq("id", reminder.id);
          }
          pushSent += delivered.sent;
        } catch (sendError) {
          await supabase.from("reminders").update({
            push_attempted_at: new Date().toISOString(),
            last_push_error: sendError instanceof Error ? sendError.message : String(sendError),
          }).eq("id", reminder.id);
          failed += 1;
        }
      }
    }
    const digestsSent = await sendWeeklyDigests(today);
    const marketing = await sendMarketingRenewalReminders(today);
    return Response.json({
      ok: true,
      ...sync,
      ...marketing,
      due: reminders?.length ?? 0,
      emailsSent,
      digestsSent,
      smsSent,
      pushSent,
      failed: failed + marketing.marketingFailed,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
});
