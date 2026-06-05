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

Deno.serve(async (request) => {
  const corsHeaders = corsHeadersFor(request);
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return new Response("Missing Authorization header", { status: 401, headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: authHeader } } },
  );
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const supabaseAdmin = serviceRoleKey
    ? createClient(Deno.env.get("SUPABASE_URL") ?? "", serviceRoleKey)
    : null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.email) {
    return new Response("Unauthorized", { status: 401, headers: corsHeaders });
  }

  const body = await request.json().catch(() => ({}));
  const selectedPlan = body?.plan === "pro" ? "pro" : "premium";
  const appBaseUrl = Deno.env.get("APP_BASE_URL") ?? "https://propertypanel.co.uk";
  if (!stripeSecretKey) {
    return new Response("Missing STRIPE_SECRET_KEY", { status: 500, headers: corsHeaders });
  }

  const { data: planSettings } = supabaseAdmin
    ? await supabaseAdmin
      .from("app_settings")
      .select("setting_value")
      .eq("setting_key", "plans")
      .maybeSingle()
    : { data: null };
  const configuredPriceId = planSettings?.setting_value?.[selectedPlan]?.stripe_price_id;
  const configuredAmount = planSettings?.setting_value?.[selectedPlan]?.price_monthly_pence;
  const priceSecretName =
    selectedPlan === "pro" ? "STRIPE_PRICE_ID_PRO_MONTHLY" : "STRIPE_PRICE_ID_PREMIUM_MONTHLY";
  const fallbackPriceId = Deno.env.get("STRIPE_PRICE_ID_MONTHLY");
  const priceId = configuredPriceId || Deno.env.get(priceSecretName) || fallbackPriceId;
  if (!priceId) {
    return new Response(`Missing ${priceSecretName} and STRIPE_PRICE_ID_MONTHLY fallback`, {
      status: 500,
      headers: corsHeaders,
    });
  }

  if (!priceId.startsWith("price_")) {
    return new Response(`${priceSecretName} must start with price_, not prod_.`, {
      status: 500,
      headers: corsHeaders,
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: user.email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appBaseUrl}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appBaseUrl}/?checkout=cancelled`,
      metadata: { user_id: user.id, plan: selectedPlan, configured_amount_pence: configuredAmount ? String(configuredAmount) : "" },
      subscription_data: {
        metadata: { user_id: user.id, plan: selectedPlan, configured_amount_pence: configuredAmount ? String(configuredAmount) : "" },
      },
    });

    return Response.json({ url: session.url }, { headers: corsHeaders });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Stripe checkout error";
    console.error("Stripe checkout failed", message);
    return new Response(`Stripe checkout failed: ${message}`, { status: 500, headers: corsHeaders });
  }
});
