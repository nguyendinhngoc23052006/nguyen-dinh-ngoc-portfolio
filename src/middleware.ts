import { defineMiddleware } from "astro:middleware";
import { createSupabaseClient } from "./lib/supabase";

export const onRequest = defineMiddleware(async (context, next) => {
  try {
    const supabase = createSupabaseClient(context);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    context.locals.supabase = supabase;
    context.locals.session = session;
  } catch (e) {
    context.locals.startupError = e instanceof Error ? e.message : String(e);
  }
  return next();
});
