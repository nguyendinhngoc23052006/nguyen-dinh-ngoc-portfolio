import type { APIRoute } from "astro";

// Public health probe used by the deploy workflow. Deliberately returns
// an opaque "unhealthy" instead of the underlying error message — startup
// errors leak env-var names, URLs, and stack fragments; keep them in logs.
export const GET: APIRoute = async ({ locals }) => {
  if (!locals.supabase) {
    console.error("[health] supabase not initialised", locals.startupError);
    return new Response("unhealthy", {
      status: 503,
      headers: { "Content-Type": "text/plain" },
    });
  }
  try {
    await locals.supabase.auth.getSession();
    return new Response("ok", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (e) {
    console.error("[health] getSession failed", e);
    return new Response("unhealthy", {
      status: 503,
      headers: { "Content-Type": "text/plain" },
    });
  }
};
