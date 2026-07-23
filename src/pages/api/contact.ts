import type { APIRoute } from "astro";
import {
  submitDemoRequest,
  validateDemoRequest,
} from "../../services/contact.js";
import type { DemoRequestInput } from "../../types/index.js";

const JSON_HEADERS = { "Content-Type": "application/json" };

type RateLimiter = {
  limit(o: { key: string }): Promise<{ success: boolean }>;
};

async function getRateLimiter(): Promise<RateLimiter | null> {
  try {
    const mod = (await import("cloudflare:workers")) as {
      env?: { RATE_LIMITER?: RateLimiter };
    };
    return mod.env?.RATE_LIMITER ?? null;
  } catch {
    return null;
  }
}

export const POST: APIRoute = async (context) => {
  const ip = context.request.headers.get("CF-Connecting-IP") ?? "unknown";
  const rateLimiter = await getRateLimiter();
  if (rateLimiter) {
    const { success } = await rateLimiter.limit({ key: ip });
    if (!success) {
      return new Response(JSON.stringify({ error: "Too many requests" }), {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "60",
        },
      });
    }
  }

  if (
    !context.request.headers.get("content-type")?.includes("application/json")
  ) {
    return new Response(JSON.stringify({ error: "Bad request" }), {
      status: 415,
      headers: JSON_HEADERS,
    });
  }

  const { supabase } = context.locals;
  if (!supabase) {
    return new Response(JSON.stringify({ error: "Service unavailable" }), {
      status: 503,
      headers: JSON_HEADERS,
    });
  }

  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: JSON_HEADERS,
    });
  }

  if (
    body &&
    typeof body === "object" &&
    "website" in body &&
    (body as Record<string, unknown>).website
  ) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: JSON_HEADERS,
    });
  }

  let input: DemoRequestInput;
  try {
    input = validateDemoRequest(body);
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Invalid input",
      }),
      { status: 400, headers: JSON_HEADERS },
    );
  }

  try {
    await submitDemoRequest(supabase, input);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: JSON_HEADERS,
    });
  } catch {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: JSON_HEADERS,
    });
  }
};
