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

Deno.serve((request) => {
  const corsHeaders = corsHeadersFor(request);
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  return Response.json(
    {
      error: "Smart document scanning is disabled.",
      message: "PropertyPanel currently stores documents without AI extraction.",
    },
    { status: 410, headers: corsHeaders },
  );
});
