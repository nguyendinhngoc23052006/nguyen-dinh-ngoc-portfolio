import type { SupabaseClient } from "@supabase/supabase-js";
import type { DemoRequestInput } from "../types/index.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function validateDemoRequest(input: unknown): DemoRequestInput {
  if (!input || typeof input !== "object")
    throw new Error("Invalid request body");
  const { request_key, name, email, company, message } = input as Record<
    string,
    unknown
  >;
  if (typeof request_key !== "string" || !UUID_RE.test(request_key))
    throw new Error("Invalid request key");
  if (typeof name !== "string" || name.trim().length < 1)
    throw new Error("Name is required");
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim()))
    throw new Error("Valid email is required");
  if (typeof message !== "string" || message.trim().length < 1)
    throw new Error("Message is required");
  return {
    request_key,
    name: name.trim().slice(0, 200),
    email: email.trim().slice(0, 200),
    company:
      typeof company === "string" && company.trim()
        ? company.trim().slice(0, 200)
        : undefined,
    message: message.trim().slice(0, 2000),
  };
}

export async function submitDemoRequest(
  supabase: SupabaseClient,
  input: DemoRequestInput,
): Promise<void> {
  const { error } = await supabase
    .from("demo_requests")
    .upsert(input, { onConflict: "request_key", ignoreDuplicates: true });
  if (error) throw new Error(error.message);
}
