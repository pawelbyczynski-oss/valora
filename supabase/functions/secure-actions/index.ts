import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

function corsHeadersFor(request: Request) {
  const origin = request.headers.get("Origin") || "";
  const allowedOrigins = (Deno.env.get("APP_ALLOWED_ORIGINS") || Deno.env.get("APP_BASE_URL") || "https://valora-property-os.vercel.app")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const allowOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

function jsonResponse(body: unknown, status: number, headers: HeadersInit) {
  return Response.json(body, { status, headers });
}

function monthLabel(value?: string | null) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function eventLabel(value?: string | null) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

function textValue(value: unknown, maxLength = 500) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function nullableText(value: unknown, maxLength = 500) {
  const text = textValue(value, maxLength);
  return text || null;
}

function dateOnly(value: unknown) {
  const text = textValue(value, 20);
  if (!text) return null;
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : null;
}

function safePlacements(value: unknown, kind: string) {
  const allowed = kind === "sponsor"
    ? new Set(["calculator", "premium", "dashboard", "reports", "documents"])
    : new Set(["calculator"]);
  const placements = Array.isArray(value)
    ? value.map((item) => textValue(item, 30)).filter((item) => allowed.has(item))
    : [];
  return [...new Set(placements)];
}

Deno.serve(async (request) => {
  const corsHeaders = corsHeadersFor(request);
  const reply = (body: unknown, status = 200) => jsonResponse(body, status, corsHeaders);

  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return reply({ error: "Method not allowed" }, 405);

  const authHeader = request.headers.get("Authorization");
  if (!authHeader) return reply({ error: "Missing Authorization header" }, 401);

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  if (!supabaseUrl || !anonKey || !serviceRoleKey) return reply({ error: "Supabase secrets are not configured" }, 500);

  const supabaseUser = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } });
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
  const {
    data: { user },
    error: userError,
  } = await supabaseUser.auth.getUser();
  if (userError || !user?.email) return reply({ error: "Unauthorized" }, 401);

  const body = await request.json().catch(() => ({}));
  const action = typeof body?.action === "string" ? body.action : "";

  const { data: adminRecord } = await supabaseAdmin
    .from("admin_users")
    .select("id")
    .eq("active", true)
    .ilike("email", user.email)
    .maybeSingle();
  const isAdmin = Boolean(adminRecord);

  try {
    if (action === "redeem-promo") {
      const normalizedCode = String(body?.code || "").trim().toUpperCase();
      if (!normalizedCode) return reply({ accepted: false, message: "Enter a promo code." }, 400);

      const { data: promo, error: promoError } = await supabaseAdmin
        .from("promo_codes")
        .select("*")
        .eq("code", normalizedCode)
        .eq("active", true)
        .maybeSingle();
      if (promoError) throw promoError;
      if (!promo) return reply({ accepted: false, message: "Promo not recognised" });
      if (promo.expires_at && new Date(promo.expires_at) < new Date()) {
        return reply({ accepted: false, message: "Promo code has expired" });
      }

      const { data: existingRedemption, error: redemptionCheckError } = await supabaseAdmin
        .from("promo_redemptions")
        .select("id")
        .eq("promo_code_id", promo.id)
        .eq("user_id", user.id)
        .maybeSingle();
      if (redemptionCheckError) throw redemptionCheckError;
      if (!existingRedemption && promo.max_redemptions !== null && promo.redeemed_count >= promo.max_redemptions) {
        return reply({ accepted: false, message: "Promo code has reached its usage limit" });
      }

      if (!existingRedemption) {
        const { error: insertError } = await supabaseAdmin
          .from("promo_redemptions")
          .insert({ promo_code_id: promo.id, user_id: user.id });
        if (insertError) throw insertError;
        const { error: updateError } = await supabaseAdmin
          .from("promo_codes")
          .update({ redeemed_count: (promo.redeemed_count || 0) + 1 })
          .eq("id", promo.id);
        if (updateError) throw updateError;
      }

      return reply({
        accepted: true,
        lifetime_access: promo.lifetime_access,
        free_months: promo.free_months,
        message: "Promo accepted",
      });
    }

    if (!isAdmin) return reply({ error: "Not authorized" }, 403);

    if (action === "admin-overview") {
      const [{ count: users }, { count: activeSubscriptions }, { count: properties }, { count: promoRedemptions }] =
        await Promise.all([
          supabaseAdmin.from("profiles").select("id", { count: "exact", head: true }),
          supabaseAdmin.from("subscriptions").select("id", { count: "exact", head: true }).in("status", ["trialing", "active"]),
          supabaseAdmin.from("properties").select("id", { count: "exact", head: true }),
          supabaseAdmin.from("promo_redemptions").select("id", { count: "exact", head: true }),
        ]);

      const { data: activeSubscriptionRows } = await supabaseAdmin
        .from("subscriptions")
        .select("amount_monthly_pence")
        .in("status", ["trialing", "active"]);
      const mrrPence = (activeSubscriptionRows || []).reduce((sum, row) => sum + Number(row.amount_monthly_pence || 0), 0);
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const eventCounts = await Promise.all(
        ["page_view", "premium_viewed", "pdf_exported"].map((eventType) =>
          supabaseAdmin
            .from("analytics_events")
            .select("id", { count: "exact", head: true })
            .eq("event_type", eventType)
            .gte("created_at", thirtyDaysAgo),
        ),
      );

      const { data: promoCodes } = await supabaseAdmin
        .from("promo_codes")
        .select("code, free_months, lifetime_access, max_redemptions, redeemed_count, expires_at, active, created_at")
        .order("created_at", { ascending: false })
        .limit(10);
      const { data: marketingCards } = await supabaseAdmin
        .from("marketing_cards")
        .select("*")
        .order("priority", { ascending: true })
        .order("created_at", { ascending: false })
        .limit(50);
      const { data: recentProfiles } = await supabaseAdmin
        .from("profiles")
        .select("id, email, created_at")
        .order("created_at", { ascending: false })
        .limit(8);
      const recentUserIds = (recentProfiles || []).map((profile) => profile.id);
      const { data: recentSubscriptions } = recentUserIds.length
        ? await supabaseAdmin
            .from("subscriptions")
            .select("user_id, status, total_paid_pence, created_at")
            .in("user_id", recentUserIds)
            .order("created_at", { ascending: false })
        : { data: [] };
      const { data: recentEvents } = await supabaseAdmin
        .from("analytics_events")
        .select("event_type, created_at, user_id")
        .order("created_at", { ascending: false })
        .limit(10);
      const eventUserIds = [...new Set((recentEvents || []).map((event) => event.user_id).filter(Boolean))];
      const { data: eventProfiles } = eventUserIds.length
        ? await supabaseAdmin.from("profiles").select("id, email").in("id", eventUserIds)
        : { data: [] };

      const subscriptionByUser = new Map((recentSubscriptions || []).map((subscription) => [subscription.user_id, subscription]));
      const emailByUser = new Map((eventProfiles || []).map((profile) => [profile.id, profile.email]));

      return reply({
        totals: {
          users: users || 0,
          active_subscriptions: activeSubscriptions || 0,
          mrr_pence: mrrPence,
          properties: properties || 0,
          promo_redemptions: promoRedemptions || 0,
        },
        events: {
          page_view: eventCounts[0].count || 0,
          premium_viewed: eventCounts[1].count || 0,
          pdf_exported: eventCounts[2].count || 0,
        },
        promo_codes: promoCodes || [],
        marketing_cards: marketingCards || [],
        recent_users: (recentProfiles || []).map((profile) => {
          const subscription = subscriptionByUser.get(profile.id);
          return {
            email: profile.email,
            status: subscription?.status || "no subscription",
            joined: monthLabel(profile.created_at),
            paid: `£${(Number(subscription?.total_paid_pence || 0) / 100).toFixed(2)}`,
          };
        }),
        recent_events: (recentEvents || []).map((event) => ({
          event_type: event.event_type,
          created: eventLabel(event.created_at),
          email: event.user_id ? emailByUser.get(event.user_id) || "anonymous" : "anonymous",
        })),
      });
    }

    if (action === "get-marketing-card") {
      const id = textValue(body?.id, 80);
      if (!id) return reply({ success: false, message: "Record id is required" }, 400);
      const { data, error } = await supabaseAdmin
        .from("marketing_cards")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      if (!data) return reply({ success: false, message: "Record not found" }, 404);
      return reply({ success: true, card: data });
    }

    if (action === "upsert-marketing-card") {
      const card = body?.card || {};
      const kind = textValue(card.kind, 20);
      if (!["partner", "sponsor"].includes(kind)) return reply({ success: false, message: "Choose partner or sponsor" }, 400);
      const name = textValue(card.name, 80);
      if (!name) return reply({ success: false, message: "Name is required" }, 400);
      const placements = safePlacements(card.placements, kind);
      if (!placements.length) return reply({ success: false, message: "Choose at least one placement" }, 400);
      const billingType = ["paid", "free"].includes(textValue(card.billing_type, 20)) ? textValue(card.billing_type, 20) : "free";
      const paymentStatus = ["free", "unpaid", "payment_link_sent", "paid", "overdue", "cancelled"].includes(textValue(card.payment_status, 30))
        ? textValue(card.payment_status, 30)
        : billingType === "free" ? "free" : "unpaid";
      const id = textValue(card.id, 80);
      const row = {
        kind,
        name,
        category: nullableText(card.category, 80),
        headline: nullableText(card.headline, 80),
        description: nullableText(card.description, 220),
        logo_url: nullableText(card.logo_url, 500),
        asset_url: nullableText(card.asset_url, 500),
        cta_text: nullableText(card.cta_text, 40),
        cta_url: nullableText(card.cta_url, 500),
        placements,
        billing_type: billingType,
        billing_email: nullableText(card.billing_email, 160),
        billing_contact_name: nullableText(card.billing_contact_name, 120),
        company_name: nullableText(card.company_name, 160),
        billing_address: nullableText(card.billing_address, 500),
        amount_pence: Math.max(Number(card.amount_pence || 0), 0),
        payment_link_url: nullableText(card.payment_link_url, 500),
        payment_status: paymentStatus,
        starts_at: dateOnly(card.starts_at),
        paid_until: dateOnly(card.paid_until),
        renewal_amount_pence: Math.max(Number(card.renewal_amount_pence || 0), 0),
        renewal_payment_link_url: nullableText(card.renewal_payment_link_url, 500),
        internal_memo: nullableText(card.internal_memo, 1000),
        priority: Number(card.priority || 10),
        active: card.active !== false,
        renewal_reminder_enabled: card.renewal_reminder_enabled !== false,
        updated_at: new Date().toISOString(),
      };

      const query = id
        ? supabaseAdmin.from("marketing_cards").update(row).eq("id", id).select("*").single()
        : supabaseAdmin.from("marketing_cards").insert(row).select("*").single();
      const { data, error } = await query;
      if (error) throw error;
      return reply({ success: true, card: data });
    }

    if (action === "deactivate-marketing-card") {
      const id = textValue(body?.id, 80);
      if (!id) return reply({ success: false, message: "Record id is required" }, 400);
      const { error } = await supabaseAdmin
        .from("marketing_cards")
        .update({ active: false, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
      return reply({ success: true, id });
    }

    if (action === "create-admin-promo") {
      const normalizedCode = String(body?.code || "").trim().toUpperCase();
      const maxRedemptions = body?.max_redemptions === null ? null : Number(body?.max_redemptions || 0);
      const freeMonths = Number(body?.free_months || 0);
      const lifetimeAccess = Boolean(body?.lifetime_access);
      const expiresAt = body?.expires_at || null;
      if (!normalizedCode) return reply({ success: false, message: "Code name is required" }, 400);
      if (maxRedemptions !== null && maxRedemptions < 1) {
        return reply({ success: false, message: "Usage limit must be at least 1" }, 400);
      }
      if (!lifetimeAccess && ![3, 6].includes(freeMonths)) {
        return reply({ success: false, message: "Choose 3 months, 6 months or infinity" }, 400);
      }

      const { error } = await supabaseAdmin.from("promo_codes").upsert(
        {
          code: normalizedCode,
          description: lifetimeAccess ? "Admin-created lifetime access code" : `Admin-created ${freeMonths} month access code`,
          free_months: lifetimeAccess ? 0 : freeMonths,
          lifetime_access: lifetimeAccess,
          max_redemptions: maxRedemptions,
          active: true,
          expires_at: expiresAt,
        },
        { onConflict: "code" },
      );
      if (error) throw error;
      return reply({ success: true, code: normalizedCode });
    }

    if (action === "deactivate-admin-promo") {
      const normalizedCode = String(body?.code || "").trim().toUpperCase();
      if (!normalizedCode) return reply({ success: false, message: "Code is required" }, 400);
      const { error } = await supabaseAdmin.from("promo_codes").update({ active: false }).eq("code", normalizedCode);
      if (error) throw error;
      return reply({ success: true, code: normalizedCode });
    }

    return reply({ error: "Unknown secure action" }, 400);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown secure action error";
    console.error("Secure action failed", action, message);
    return reply({ error: message }, 500);
  }
});
