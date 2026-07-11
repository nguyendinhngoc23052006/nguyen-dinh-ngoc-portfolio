import { afterEach, describe, expect, it, vi } from 'vitest';
import { createSupabaseClient } from './supabase.js';

vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(() => ({ auth: {} })),
}));

const mockCookies = { getAll: () => [], set: vi.fn() } as any;

describe('createSupabaseClient', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('builds a client from PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_PUBLISHABLE_KEY', () => {
    vi.stubEnv('PUBLIC_SUPABASE_URL', 'https://test.supabase.co');
    vi.stubEnv('PUBLIC_SUPABASE_PUBLISHABLE_KEY', 'sb_publishable_test');
    expect(() => createSupabaseClient(mockCookies)).not.toThrow();
  });

  it('throws a readable error when PUBLIC_SUPABASE_URL is absent', () => {
    vi.stubEnv('PUBLIC_SUPABASE_URL', '');
    vi.stubEnv('PUBLIC_SUPABASE_PUBLISHABLE_KEY', 'sb_publishable_test');
    expect(() => createSupabaseClient(mockCookies)).toThrow('PUBLIC_SUPABASE_URL');
  });

  it('throws a readable error when PUBLIC_SUPABASE_PUBLISHABLE_KEY is absent', () => {
    vi.stubEnv('PUBLIC_SUPABASE_URL', 'https://test.supabase.co');
    vi.stubEnv('PUBLIC_SUPABASE_PUBLISHABLE_KEY', '');
    expect(() => createSupabaseClient(mockCookies)).toThrow('PUBLIC_SUPABASE_PUBLISHABLE_KEY');
  });
});
