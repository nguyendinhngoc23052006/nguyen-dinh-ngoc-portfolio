import type { APIContext } from "astro";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createSupabaseClient } from "./supabase.js";

vi.mock("@supabase/ssr", () => ({
  createServerClient: vi.fn(() => ({ auth: {} })),
  parseCookieHeader: () => [],
}));

const mockContext = {
  request: { headers: { get: () => null } },
  cookies: { set: vi.fn() },
} as unknown as Pick<APIContext, "request" | "cookies">;

describe("createSupabaseClient", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("builds a client from PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_PUBLISHABLE_KEY", () => {
    vi.stubEnv("PUBLIC_SUPABASE_URL", "https://test.supabase.co");
    vi.stubEnv("PUBLIC_SUPABASE_PUBLISHABLE_KEY", "sb_publishable_test");
    expect(() => createSupabaseClient(mockContext)).not.toThrow();
  });

  it("throws a readable error when PUBLIC_SUPABASE_URL is absent", () => {
    vi.stubEnv("PUBLIC_SUPABASE_URL", "");
    vi.stubEnv("PUBLIC_SUPABASE_PUBLISHABLE_KEY", "sb_publishable_test");
    expect(() => createSupabaseClient(mockContext)).toThrow(
      "PUBLIC_SUPABASE_URL",
    );
  });

  it("throws a readable error when PUBLIC_SUPABASE_PUBLISHABLE_KEY is absent", () => {
    vi.stubEnv("PUBLIC_SUPABASE_URL", "https://test.supabase.co");
    vi.stubEnv("PUBLIC_SUPABASE_PUBLISHABLE_KEY", "");
    expect(() => createSupabaseClient(mockContext)).toThrow(
      "PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    );
  });
});
