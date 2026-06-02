import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

type CalendarEvent = {
  id: string;
  date: string;
  title: string;
  detail: string;
};

function calendarDate(value: string) {
  return String(value || "").replaceAll("-", "");
}

function addDays(value: string, amount: number) {
  const date = new Date(`${value}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + amount);
  return date.toISOString().slice(0, 10);
}

function calendarText(value: unknown) {
  return String(value ?? "")
    .replaceAll("\\", "\\\\")
    .replaceAll("\n", "\\n")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;");
}

function calendarContents(events: CalendarEvent[]) {
  const timestamp = new Date().toISOString().replaceAll(/[-:]/g, "").replace(".000", "");
  const rows = events
    .sort((left, right) => left.date.localeCompare(right.date) || left.title.localeCompare(right.title))
    .flatMap((event) => [
      "BEGIN:VEVENT",
      `UID:${calendarText(`${event.id}@propertypanel.co.uk`)}`,
      `DTSTAMP:${timestamp}`,
      `DTSTART;VALUE=DATE:${calendarDate(event.date)}`,
      `DTEND;VALUE=DATE:${calendarDate(addDays(event.date, 1))}`,
      `SUMMARY:${calendarText(`PropertyPanel: ${event.title}`)}`,
      `DESCRIPTION:${calendarText(event.detail)}`,
      "END:VEVENT",
    ]);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PropertyPanel//Portfolio Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:PropertyPanel",
    ...rows,
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}

function errorResponse(message: string, status: number) {
  return new Response(message, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}

Deno.serve(async (request) => {
  if (request.method !== "GET") return errorResponse("Method not allowed", 405);
  const token = new URL(request.url).searchParams.get("token") || "";
  if (!/^[0-9a-f-]{36}$/i.test(token)) return errorResponse("Calendar link is invalid", 404);

  const { data: feedToken, error: tokenError } = await supabase
    .from("calendar_feed_tokens")
    .select("user_id")
    .eq("token", token)
    .maybeSingle();
  if (tokenError || !feedToken?.user_id) return errorResponse("Calendar link is invalid", 404);

  const userId = feedToken.user_id;
  const { data: activePlan } = await supabase
    .from("subscriptions")
    .select("id")
    .eq("user_id", userId)
    .in("status", ["active", "trialing"])
    .or("plan_code.eq.pro,amount_monthly_pence.gte.999")
    .or(`current_period_end.is.null,current_period_end.gt.${new Date().toISOString()}`)
    .limit(1)
    .maybeSingle();
  if (!activePlan) return errorResponse("Calendar subscription requires an active PropertyPanel Pro plan", 403);

  const [
    { data: properties },
    { data: tenancies },
    { data: documents },
    { data: complianceItems },
    { data: rentReviews },
    { data: transactions },
  ] = await Promise.all([
    supabase.from("properties").select("id,name,mortgage_expiry_date,mortgage_product_type,mortgage_rate").eq("user_id", userId),
    supabase.from("tenancy_periods").select("id,property_id,tenant_name,tenancy_end_date").eq("user_id", userId),
    supabase.from("documents").select("id,property_id,label,document_type,expiry_date").eq("user_id", userId).eq("reminder_enabled", true),
    supabase.from("compliance_items").select("id,property_id,item_type,expiry_date,status").eq("user_id", userId).neq("status", "not_required"),
    supabase.from("rent_reviews").select("id,property_id,review_date,current_rent,proposed_rent,status").eq("user_id", userId).neq("status", "completed"),
    supabase.from("property_transactions").select("id,property_id,transaction_date,amount,category,status,notes").eq("user_id", userId).eq("transaction_type", "income").neq("status", "approved"),
  ]);

  const propertyNames = new Map((properties ?? []).map((property) => [property.id, property.name]));
  const propertyName = (propertyId: string | null) => propertyNames.get(propertyId || "") || "Property";
  const events: CalendarEvent[] = [];

  for (const property of properties ?? []) {
    if (!property.mortgage_expiry_date) continue;
    events.push({
      id: `mortgage-${property.id}-${property.mortgage_expiry_date}`,
      date: property.mortgage_expiry_date,
      title: `${property.name}: mortgage expiry`,
      detail: `${property.mortgage_product_type || "Mortgage"} · ${Number(property.mortgage_rate || 0).toFixed(2)}%`,
    });
  }
  for (const tenancy of tenancies ?? []) {
    if (!tenancy.tenancy_end_date) continue;
    events.push({
      id: `tenancy-${tenancy.id}`,
      date: tenancy.tenancy_end_date,
      title: `${propertyName(tenancy.property_id)}: tenancy ending`,
      detail: tenancy.tenant_name || "Review renewal or move-out steps",
    });
  }
  for (const document of documents ?? []) {
    if (!document.expiry_date) continue;
    events.push({
      id: `document-${document.id}`,
      date: document.expiry_date,
      title: `${propertyName(document.property_id)}: certificate / document expiry`,
      detail: document.label || document.document_type,
    });
  }
  for (const item of complianceItems ?? []) {
    if (!item.expiry_date) continue;
    events.push({
      id: `compliance-${item.id}`,
      date: item.expiry_date,
      title: `${propertyName(item.property_id)}: compliance review`,
      detail: item.item_type,
    });
  }
  for (const review of rentReviews ?? []) {
    if (!review.review_date) continue;
    events.push({
      id: `review-${review.id}`,
      date: review.review_date,
      title: `${propertyName(review.property_id)}: rent review`,
      detail: `£${Number(review.current_rent || 0).toFixed(2)} to £${Number(review.proposed_rent || 0).toFixed(2)}`,
    });
  }
  for (const transaction of transactions ?? []) {
    if (!String(transaction.notes || "").includes("[tenancy:")) continue;
    events.push({
      id: `rent-${transaction.id}`,
      date: transaction.transaction_date,
      title: `${propertyName(transaction.property_id)}: rent due`,
      detail: `£${Number(transaction.amount || 0).toFixed(2)} · ${transaction.category || "Rent"}`,
    });
  }

  return new Response(calendarContents(events), {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": "inline; filename=propertypanel-calendar.ics",
      "Cache-Control": "private, max-age=300",
    },
  });
});
