import { defineMiddleware } from "astro:middleware";
import { createSupabaseClient } from "./lib/supabase";

// Production CSP: script-src omits 'unsafe-inline'. The only inline
// script we ship is /theme-init.js loaded via <script src>, and Astro's
// island hydration scripts are all external modules from /_astro/.
// JSON-LD (<script type="application/ld+json">) is not executed as
// script and is exempt from script-src in practice.
const PROD_CSP =
  "default-src 'self'; script-src 'self' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://*.supabase.co https://cloudflareinsights.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'";

// Dev CSP: adds 'unsafe-inline' to script-src (Astro's dev toolbar
// emits an inline <script>window.__astro_dev_toolbar__ = ...</script>
// bootstrap that hydration cascades off of; blocking it breaks island
// mounting in dev) and 'ws:' / 'localhost:*' to connect-src for Vite HMR.
const DEV_CSP =
  "default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' ws: http://localhost:* https://*.supabase.co https://cloudflareinsights.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'";

const SECURITY_HEADERS_BASE: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

export const onRequest = defineMiddleware(async (context, next) => {
  try {
    const supabase = createSupabaseClient(context);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    context.locals.supabase = supabase;
    context.locals.session = session;
  } catch (e) {
    context.locals.startupError = e instanceof Error ? e.message : String(e);
  }

  const response = await next();

  for (const [key, value] of Object.entries(SECURITY_HEADERS_BASE)) {
    response.headers.set(key, value);
  }
  response.headers.set(
    "Content-Security-Policy",
    import.meta.env.DEV ? DEV_CSP : PROD_CSP,
  );

  return response;
});
