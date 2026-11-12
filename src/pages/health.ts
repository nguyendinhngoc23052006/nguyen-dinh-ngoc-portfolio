import type { APIRoute } from "astro";

// Public health probe used by the deploy workflow and the uptime check.
// The site is static content with no backing services, so serving this
// route at all means the Worker is up.
export const GET: APIRoute = () =>
  new Response("ok", {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
