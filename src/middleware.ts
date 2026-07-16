import { defineMiddleware } from "astro:middleware";
import { createSupabaseClient } from "./lib/supabase";

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' https://avatars.githubusercontent.com data:; connect-src 'self' https://*.supabase.co; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
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

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  return response;
});
