import Stripe from "https://esm.sh/stripe@14.25.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
const stripe = new Stripe(stripeSecretKey ?? "", {
  apiVersion: "2024-06-20",
});

function corsHeadersFor(request: Request) {
  const origin = request.headers.get("Origin") || "";
  const allowedOrigins = (Deno.env.get("APP_ALLOWED_ORIGINS") || Deno.env.get("APP_BASE_URL") || "https://propertypanel.co.uk")
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

async function upsertSubscription(
  supabaseAdmin: ReturnType<typeof createClient>,
  userId: string,
  subscription: Stripe.Subscription,
) {
  const item = subscription.items.data[0];
  const priceId = item?.price.id;
  if (!priceId) return null;

  const amountMonthlyPence = item.price.unit_amount ?? 499;
  const currency = item.price.currency ?? "gbp";
  const planCode = subscription.metadata?.plan === "pro" || amountMonthlyPence >= 999 ? "pro" : "premium";

  const { error } = await supabaseAdmin.from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_subscription_id: subscription.id,
      stripe_price_id: priceId,
      status: subscription.status,
      plan_code: planCode,
      plan_name: planCode === "pro" ? "PropertyPanel Pro" : "PropertyPanel Premium",
      amount_monthly_pence: amountMonthlyPence,
      currency,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
      canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
    },
    { onConflict: "stripe_subscription_id" },
  );

  if (error) throw error;
  return subscription.status;
}

Deno.serve(async (request) => {
  const corsHeaders = corsHeadersFor(request);
  const response = (body: unknown, status = 200) => Response.json(body, { status, headers: corsHeaders });
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return response({ error: "Method not allowed" }, 405);
  }

  if (!stripeSecretKey) {
    return response({ error: "Missing STRIPE_SECRET_KEY" }, 500);
  }

  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return response({ error: "Missing Authorization header" }, 401);
  }

  const supabaseUser = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: authHeader } } },
  );
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  const {
    data: { user },
    error: userError,
  } = await supabaseUser.auth.getUser();

  if (userError || !user?.email) {
    return response({ error: "Unauthorized" }, 401);
  }

  const body = await request.json().catch(() => ({}));
  const checkoutSessionId = typeof body?.session_id === "string" ? body.session_id : "";

  try {
    let customerId = "";
    let subscriptionId = "";

    if (checkoutSessionId.startsWith("cs_")) {
      const session = await stripe.checkout.sessions.retrieve(checkoutSessionId);
      const sessionUserId = session.metadata?.user_id;
      if (sessionUserId && sessionUserId !== user.id) {
        return response({ error: "Checkout session belongs to another user." }, 403);
      }
      if (session.customer) customerId = String(session.customer);
      if (session.subscription) subscriptionId = String(session.subscription);
    }

    if (!customerId) {
      const customers = await stripe.customers.list({ email: user.email, limit: 10 });
      customerId = customers.data[0]?.id ?? "";
    }

    if (!customerId) {
      return response({ synced: false, message: "No Stripe customer found for this account." }, 404);
    }

    await supabaseAdmin.from("profiles").update({ stripe_customer_id: customerId }).eq("id", user.id);

    let subscription: Stripe.Subscription | null = null;
    if (subscriptionId) {
      subscription = await stripe.subscriptions.retrieve(subscriptionId);
    } else {
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: "all",
        limit: 10,
      });
      subscription =
        subscriptions.data.find((item) => ["active", "trialing", "past_due", "unpaid", "incomplete"].includes(item.status)) ??
        subscriptions.data[0] ??
        null;
    }

    if (!subscription) {
      return response({ synced: false, message: "No Stripe subscription found for this customer." }, 404);
    }

    const status = await upsertSubscription(supabaseAdmin, user.id, subscription);
    return response({ synced: true, status });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown sync error";
    console.error("Subscription sync failed", message);
    return response({ error: message }, 500);
  }
});
