/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    supabase?: import("@supabase/supabase-js").SupabaseClient;
    session?: import("@supabase/supabase-js").Session | null;
    startupError?: string;
  }
}

declare module "cloudflare:workers" {
  export const env: {
    RATE_LIMITER?: {
      limit(options: { key: string }): Promise<{ success: boolean }>;
    };
    [key: string]: unknown;
  };
}
