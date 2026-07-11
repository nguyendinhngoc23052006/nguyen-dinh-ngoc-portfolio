import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  if (!locals.supabase) {
    return new Response(locals.startupError ?? 'supabase not initialised', { status: 503 });
  }
  try {
    await locals.supabase.auth.getSession();
    return new Response('ok', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch {
    return new Response('error', { status: 503 });
  }
};
