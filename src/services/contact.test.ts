import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it, vi } from "vitest";
import { submitDemoRequest, validateDemoRequest } from "./contact.js";

const VALID_KEY = "550e8400-e29b-41d4-a716-446655440000";

describe("validateDemoRequest", () => {
  it("accepts a valid full input", () => {
    const result = validateDemoRequest({
      request_key: VALID_KEY,
      name: "Alice",
      email: "alice@example.com",
      company: "Acme",
      message: "I want a demo",
    });
    expect(result).toEqual({
      request_key: VALID_KEY,
      name: "Alice",
      email: "alice@example.com",
      company: "Acme",
      message: "I want a demo",
    });
  });

  it("accepts input without company", () => {
    const result = validateDemoRequest({
      request_key: VALID_KEY,
      name: "Bob",
      email: "bob@example.com",
      message: "Tell me more",
    });
    expect(result.company).toBeUndefined();
  });

  it("trims whitespace-only company to undefined", () => {
    const result = validateDemoRequest({
      request_key: VALID_KEY,
      name: "Bob",
      email: "bob@example.com",
      company: "   ",
      message: "Tell me more",
    });
    expect(result.company).toBeUndefined();
  });

  it("rejects invalid request_key", () => {
    expect(() =>
      validateDemoRequest({
        request_key: "not-a-uuid",
        name: "A",
        email: "a@b.com",
        message: "Hi",
      }),
    ).toThrow("Invalid request key");
  });

  it("rejects missing name", () => {
    expect(() =>
      validateDemoRequest({
        request_key: VALID_KEY,
        email: "a@b.com",
        message: "Hi",
      }),
    ).toThrow("Name is required");
  });

  it("rejects blank name", () => {
    expect(() =>
      validateDemoRequest({
        request_key: VALID_KEY,
        name: "  ",
        email: "a@b.com",
        message: "Hi",
      }),
    ).toThrow("Name is required");
  });

  it("rejects invalid email", () => {
    expect(() =>
      validateDemoRequest({
        request_key: VALID_KEY,
        name: "A",
        email: "notanemail",
        message: "Hi",
      }),
    ).toThrow("Valid email");
  });

  it("rejects missing message", () => {
    expect(() =>
      validateDemoRequest({
        request_key: VALID_KEY,
        name: "A",
        email: "a@b.com",
      }),
    ).toThrow("Message is required");
  });

  it("truncates fields to their max lengths", () => {
    const long = "x".repeat(300);
    const result = validateDemoRequest({
      request_key: VALID_KEY,
      name: long,
      email: `${"a".repeat(190)}@b.com`,
      message: "x".repeat(3000),
    });
    expect(result.name.length).toBe(200);
    expect(result.message.length).toBe(2000);
  });

  it("rejects a non-object body", () => {
    expect(() => validateDemoRequest("bad")).toThrow("Invalid request body");
  });
});

describe("submitDemoRequest", () => {
  const input = {
    request_key: VALID_KEY,
    name: "Alice",
    email: "alice@example.com",
    message: "Demo please",
  };

  it("resolves on success", async () => {
    const supabase = {
      from: () => ({
        insert: vi.fn().mockResolvedValue({ error: null }),
      }),
    } as unknown as SupabaseClient;
    await expect(submitDemoRequest(supabase, input)).resolves.toBeUndefined();
  });

  it("resolves on duplicate (unique_violation)", async () => {
    const supabase = {
      from: () => ({
        insert: vi.fn().mockResolvedValue({
          error: { code: "23505", message: "duplicate" },
        }),
      }),
    } as unknown as SupabaseClient;
    await expect(submitDemoRequest(supabase, input)).resolves.toBeUndefined();
  });

  it("throws on Supabase error", async () => {
    const supabase = {
      from: () => ({
        insert: vi
          .fn()
          .mockResolvedValue({ error: { code: "42501", message: "DB error" } }),
      }),
    } as unknown as SupabaseClient;
    await expect(submitDemoRequest(supabase, input)).rejects.toThrow(
      "DB error",
    );
  });
});

vi.mock("cloudflare:workers", () => ({
  env: {
    RATE_LIMITER: {
      limit: vi.fn().mockResolvedValue({ success: false }),
    },
  },
}));

describe("contact handler rate limiting", () => {
  it("returns 429 when RATE_LIMITER.limit returns success: false", async () => {
    const { POST } = await import("../pages/api/contact.js");
    const context = {
      request: new Request("http://example.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
      locals: {},
    };
    const response = await POST(context as never);
    expect(response.status).toBe(429);
    const json = (await response.json()) as { error: string };
    expect(json.error).toBe("Too many requests");
  });
});
