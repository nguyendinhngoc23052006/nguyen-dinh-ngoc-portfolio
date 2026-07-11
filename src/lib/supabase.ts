import { createServerClient } from '@supabase/ssr';
import type { AstroCookies } from 'astro';

export function createSupabaseClient(cookies: AstroCookies) {
  const url = process.env.PUBLIC_SUPABASE_URL;
  const key = process.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url) throw new Error('PUBLIC_SUPABASE_URL is not set');
  if (!key) throw new Error('PUBLIC_SUPABASE_PUBLISHABLE_KEY is not set');

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          cookies.set(name, value, options ?? {});
        }
      },
    },
  });
}
