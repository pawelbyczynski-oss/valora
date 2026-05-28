const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve((request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  return Response.json(
    {
      error: "Smart document scanning is disabled.",
      message: "PropertyPanel currently stores documents without AI extraction.",
    },
    { status: 410, headers: corsHeaders },
  );
});
