import Stripe from "https://esm.sh/stripe@14.25.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  apiVersion: "2024-06-20",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

Deno.serve(async (request) => {
  const signature = request.headers.get("stripe-signature");
  const body = await request.text();

  if (!signature) {
    return new Response("Missing Stripe signature", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? "",
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(`Webhook error: ${message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;

    if (userId && session.customer) {
      await supabase
        .from("profiles")
        .update({ stripe_customer_id: String(session.customer) })
        .eq("id", userId);
    }
  }

  if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = String(subscription.customer);

    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("stripe_customer_id", customerId)
      .single();

    const priceId = subscription.items.data[0]?.price.id;
    const amountMonthlyPence = subscription.items.data[0]?.price.unit_amount ?? 499;
    const currency = subscription.items.data[0]?.price.currency ?? "gbp";

    if (profile && priceId) {
      await supabase.from("subscriptions").upsert({
        user_id: profile.id,
        stripe_subscription_id: subscription.id,
        stripe_price_id: priceId,
        status: subscription.status,
        amount_monthly_pence: amountMonthlyPence,
        currency,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
        canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
      }, { onConflict: "stripe_subscription_id" });
    }
  }

  if (event.type === "invoice.paid") {
    const invoice = event.data.object as Stripe.Invoice;
    const customerId = String(invoice.customer);
    const subscriptionId = invoice.subscription ? String(invoice.subscription) : null;

    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("stripe_customer_id", customerId)
      .single();

    const { data: subscription } = subscriptionId
      ? await supabase
          .from("subscriptions")
          .select("id,total_paid_pence")
          .eq("stripe_subscription_id", subscriptionId)
          .single()
      : { data: null };

    if (profile) {
      await supabase.from("payments").upsert({
        user_id: profile.id,
        subscription_id: subscription?.id ?? null,
        stripe_invoice_id: invoice.id,
        invoice_number: invoice.number,
        stripe_payment_intent_id: invoice.payment_intent ? String(invoice.payment_intent) : null,
        amount_pence: invoice.amount_paid ?? 0,
        currency: invoice.currency ?? "gbp",
        status: "paid",
        hosted_invoice_url: invoice.hosted_invoice_url,
        invoice_pdf_url: invoice.invoice_pdf,
        billing_reason: invoice.billing_reason,
        paid_at: invoice.status_transitions.paid_at
          ? new Date(invoice.status_transitions.paid_at * 1000).toISOString()
          : new Date().toISOString(),
      }, { onConflict: "stripe_invoice_id" });

      if (subscription?.id) {
        await supabase
          .from("subscriptions")
          .update({
            total_paid_pence: Number(subscription.total_paid_pence ?? 0) + Number(invoice.amount_paid ?? 0),
          })
          .eq("id", subscription.id);
      }
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    await supabase
      .from("subscriptions")
      .update({ status: "canceled" })
      .eq("stripe_subscription_id", subscription.id);
  }

  return Response.json({ received: true });
});
