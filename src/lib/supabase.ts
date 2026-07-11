import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { APIContext } from "astro";

export function createSupabaseClient({
  request,
  cookies,
}: Pick<APIContext, "request" | "cookies">) {
  const url = process.env.PUBLIC_SUPABASE_URL;
  const key = process.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url) throw new Error("PUBLIC_SUPABASE_URL is not set");
  if (!key) throw new Error("PUBLIC_SUPABASE_PUBLISHABLE_KEY is not set");

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get("Cookie") ?? "").filter(
          (cookie): cookie is { name: string; value: string } =>
            cookie.value !== undefined,
        );
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          cookies.set(name, value, options ?? {});
        }
      },
    },
  });
}
