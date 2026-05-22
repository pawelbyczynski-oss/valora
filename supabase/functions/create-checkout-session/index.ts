import Stripe from "https://esm.sh/stripe@14.25.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  apiVersion: "2024-06-20",
});

Deno.serve(async (request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return new Response("Missing Authorization header", { status: 401 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: authHeader } } },
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const appBaseUrl = Deno.env.get("APP_BASE_URL") ?? "http://localhost:3000";
  const priceId = Deno.env.get("STRIPE_PRICE_ID_MONTHLY");
  if (!priceId) {
    return new Response("Missing STRIPE_PRICE_ID_MONTHLY", { status: 500 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appBaseUrl}/premium?checkout=success`,
    cancel_url: `${appBaseUrl}/premium?checkout=cancelled`,
    metadata: { user_id: user.id },
  });

  return Response.json({ url: session.url });
});
