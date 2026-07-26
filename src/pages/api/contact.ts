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

type LimiterState =
  | { kind: "ok"; limiter: RateLimiter }
  | { kind: "dev" } // no Workers env — local `astro dev`; skip rate limiting
  | { kind: "misconfigured" }; // Workers env exists but binding missing — fail closed

async function getRateLimiter(): Promise<LimiterState> {
  let mod: { env?: { RATE_LIMITER?: RateLimiter } };
  try {
    mod = (await import("cloudflare:workers")) as {
      env?: { RATE_LIMITER?: RateLimiter };
    };
  } catch {
    return { kind: "dev" };
  }
  if (!mod.env) return { kind: "dev" };
  if (!mod.env.RATE_LIMITER) return { kind: "misconfigured" };
  return { kind: "ok", limiter: mod.env.RATE_LIMITER };
}

export const POST: APIRoute = async (context) => {
  const ip = context.request.headers.get("CF-Connecting-IP") ?? "unknown";
  const rl = await getRateLimiter();
  if (rl.kind === "misconfigured") {
    // Deployed to Workers but the RATE_LIMITER binding is missing —
    // refuse rather than accept unbounded submissions.
    console.error("[contact] RATE_LIMITER binding missing in Workers env");
    return new Response(JSON.stringify({ error: "Service unavailable" }), {
      status: 503,
      headers: JSON_HEADERS,
    });
  }
  if (rl.kind === "ok") {
    const { success } = await rl.limiter.limit({ key: ip });
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

  const contentType = context.request.headers.get("content-type") ?? "";
  const mimeType = contentType.split(";")[0].trim().toLowerCase();
  if (mimeType !== "application/json") {
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

  // Honeypot: a hidden field named `hp_url_field` — not `website`, which
  // password managers and some browsers autofill and would cause silent
  // drops of legitimate submissions. If the field is present and truthy,
  // pretend success without storing, and log server-side so we can see
  // false positives against real traffic.
  if (
    body &&
    typeof body === "object" &&
    "hp_url_field" in body &&
    (body as Record<string, unknown>).hp_url_field
  ) {
    console.warn("[contact] honeypot triggered", {
      ip,
      ua: context.request.headers.get("user-agent") ?? "",
    });
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
