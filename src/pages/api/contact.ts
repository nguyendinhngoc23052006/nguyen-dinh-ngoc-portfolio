import type { APIRoute } from "astro";
import {
  submitDemoRequest,
  validateDemoRequest,
} from "../../services/contact.js";

export const POST: APIRoute = async (context) => {
  const { supabase } = context.locals;
  if (!supabase) {
    return new Response(JSON.stringify({ error: "Service unavailable" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const body = await context.request.json();
    const input = validateDemoRequest(body);
    await submitDemoRequest(supabase, input);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Unknown error",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }
};
