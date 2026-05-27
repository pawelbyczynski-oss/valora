import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function response(body: unknown, status = 200) {
  return Response.json(body, { status, headers: corsHeaders });
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

function outputTextFromResponse(payload: any) {
  if (typeof payload?.output_text === "string") return payload.output_text;
  return (payload?.output || [])
    .flatMap((item: any) => item?.content || [])
    .map((content: any) => content?.text || "")
    .join("\n")
    .trim();
}

function parseJsonObject(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? JSON.parse(match[0]) : null;
  }
}

function normaliseDrafts(parsed: any, fallbackType: string) {
  const rawTransactions = Array.isArray(parsed?.transactions)
    ? parsed.transactions
    : Array.isArray(parsed?.items)
      ? parsed.items
      : parsed?.amount
        ? [parsed]
        : [];

  return rawTransactions
    .map((item: any) => {
      const amount = Number(item.amount || item.total || item.value || 0);
      if (!amount || amount <= 0) return null;

      const transactionType = item.transaction_type === "income" ? "income" : "expense";
      const taxTreatment = ["revenue", "capital", "review"].includes(item.tax_treatment)
        ? item.tax_treatment
        : "review";

      return {
        transaction_date: item.transaction_date || item.date || parsed.transaction_date || new Date().toISOString().slice(0, 10),
        amount,
        transaction_type: transactionType,
        category: item.category || parsed.category || fallbackType || "Document draft",
        tax_treatment: taxTreatment,
        supplier: item.supplier || parsed.supplier || "",
        summary: item.summary || item.description || parsed.summary || "",
        confidence: item.confidence || parsed.confidence || "review",
      };
    })
    .filter(Boolean);
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return response({ error: "Method not allowed" }, 405);

  const authHeader = request.headers.get("Authorization");
  if (!authHeader) return response({ error: "Missing Authorization header" }, 401);

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
  if (userError || !user) return response({ error: "Unauthorized" }, 401);

  const openAiKey = Deno.env.get("OPENAI_API_KEY");
  if (!openAiKey) return response({ error: "OPENAI_API_KEY is not configured in Supabase secrets." }, 500);

  const { document_id: documentId } = await request.json().catch(() => ({}));
  if (!documentId) return response({ error: "Missing document_id" }, 400);

  const { data: hasPro } = await supabaseAdmin.rpc("has_pro_access_for_user", { input_user_id: user.id });
  if (!hasPro) return response({ error: "Smart document scans require PropertyPanel Pro." }, 403);

  const monthStart = new Date();
  monthStart.setUTCDate(1);
  monthStart.setUTCHours(0, 0, 0, 0);
  const { count } = await supabaseAdmin
    .from("documents")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("ai_scanned_at", monthStart.toISOString());

  if ((count || 0) >= 25) {
    return response({ error: "Monthly smart document scan limit reached: 25/month." }, 429);
  }

  const { data: document, error: documentError } = await supabaseAdmin
    .from("documents")
    .select("id,user_id,property_id,label,document_type,storage_path,file_name,mime_type,page_count")
    .eq("id", documentId)
    .eq("user_id", user.id)
    .single();

  if (documentError || !document) return response({ error: "Document not found." }, 404);
  if (Number(document.page_count || 1) > 5) {
    return response({ error: "Smart document scans are limited to 5 pages per document." }, 400);
  }

  await supabaseAdmin
    .from("documents")
    .update({ ai_status: "processing", ai_error: null })
    .eq("id", document.id);

  try {
    const { data: fileData, error: downloadError } = await supabaseAdmin.storage
      .from("property-documents")
      .download(document.storage_path);
    if (downloadError || !fileData) throw new Error(downloadError?.message || "Could not download document.");

    const bytes = new Uint8Array(await fileData.arrayBuffer());
    const mimeType = document.mime_type || fileData.type || "application/pdf";
    const base64 = bytesToBase64(bytes);

    const prompt =
      "Extract UK landlord bookkeeping draft transactions from this property document. Split separate charge lines into separate transactions where useful, for example repairs, cleaning, management fees, insurance, service charge, ground rent, utilities or rent income. Assign all transactions to the uploaded property. Return only JSON with keys: document_summary and transactions. transactions must be an array of objects with transaction_date, amount, transaction_type, category, tax_treatment, supplier, summary, confidence. transaction_type must be income or expense. tax_treatment must be revenue, capital, or review. Use review if unsure.";

    const openAiController = new AbortController();
    const openAiTimeout = setTimeout(() => openAiController.abort(), 70000);
    let aiResponse: Response;
    try {
      aiResponse = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openAiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: Deno.env.get("OPENAI_DOCUMENT_MODEL") || "gpt-5-mini",
          input: [
            {
              role: "user",
              content: [
                {
                  type: "input_file",
                  filename: document.file_name || `${document.label}.pdf`,
                  file_data: `data:${mimeType};base64,${base64}`,
                },
                { type: "input_text", text: prompt },
              ],
            },
          ],
        }),
        signal: openAiController.signal,
      });
    } finally {
      clearTimeout(openAiTimeout);
    }

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      throw new Error(errorText || "OpenAI document extraction failed.");
    }

    const payload = await aiResponse.json();
    const parsed = parseJsonObject(outputTextFromResponse(payload));
    if (!parsed) throw new Error("AI did not return a JSON draft.");

    const drafts = normaliseDrafts(parsed, document.document_type);
    if (!drafts.length) throw new Error("AI did not find any transaction lines to draft.");

    const draftTransactionIds = [];
    for (const draft of drafts) {
      const { data: transaction } = await supabaseAdmin
        .from("property_transactions")
        .insert({
          user_id: user.id,
          property_id: document.property_id,
          document_id: document.id,
          transaction_date: draft.transaction_date,
          amount: draft.amount,
          transaction_type: draft.transaction_type,
          category: draft.category,
          tax_treatment: draft.tax_treatment,
          source: "ai",
          status: "draft",
          notes: [draft.supplier, draft.summary, `AI confidence: ${draft.confidence}`].filter(Boolean).join(" - ") || null,
        })
        .select("id")
        .single();
      if (transaction?.id) draftTransactionIds.push(transaction.id);
    }

    const result = { ...parsed, transactions: drafts };

    await supabaseAdmin
      .from("documents")
      .update({
        ai_status: "review",
        ai_result: result,
        ai_error: null,
        ai_scanned_at: new Date().toISOString(),
      })
      .eq("id", document.id);

    return response({ result, draft_transaction_ids: draftTransactionIds });
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "OpenAI document extraction timed out after 70 seconds."
        : error instanceof Error
          ? error.message
          : "Unknown AI extraction error";
    await supabaseAdmin
      .from("documents")
      .update({ ai_status: "failed", ai_error: message, ai_scanned_at: new Date().toISOString() })
      .eq("id", document.id);
    return response({ error: message }, 500);
  }
});
