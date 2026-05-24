import Stripe from "https://esm.sh/stripe@14.25.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
const stripe = new Stripe(stripeSecretKey ?? "", {
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

  if (error || !user) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!stripeSecretKey) {
    return new Response("Missing STRIPE_SECRET_KEY", { status: 500 });
  }

  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!serviceRoleKey) {
    return new Response("Missing SUPABASE_SERVICE_ROLE_KEY", { status: 500 });
  }

  const adminSupabase = createClient(Deno.env.get("SUPABASE_URL") ?? "", serviceRoleKey);
  const { data: profile } = await adminSupabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  if (!profile?.stripe_customer_id) {
    return new Response("No Stripe customer found for this user", { status: 404 });
  }

  const appBaseUrl = Deno.env.get("APP_BASE_URL") ?? "https://valora-property-os.vercel.app";
  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${appBaseUrl}/?billing=return`,
  });

  return Response.json({ url: session.url });
});
