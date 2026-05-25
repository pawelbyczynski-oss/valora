import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

Deno.serve(async () => {
  const today = new Date().toISOString().slice(0, 10);
  const { data: reminders, error } = await supabase
    .from("reminders")
    .select("id,title,due_date,profiles(email)")
    .lte("due_date", today)
    .is("sent_at", null)
    .eq("email_enabled", true);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const resendKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("REMINDER_FROM_EMAIL") ?? "PropertyPanel <reminders@example.com>";

  for (const reminder of reminders ?? []) {
    const email = reminder.profiles?.email;
    if (!email || !resendKey) continue;

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: email,
        subject: reminder.title,
        text: `${reminder.title}\n\nDue date: ${reminder.due_date}`,
      }),
    });

    await supabase
      .from("reminders")
      .update({ sent_at: new Date().toISOString() })
      .eq("id", reminder.id);
  }

  return Response.json({ sent: reminders?.length ?? 0 });
});
