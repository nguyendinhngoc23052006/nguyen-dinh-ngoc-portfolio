# MEMORY.md — whole-scene facts

- No `staging` branch or ruleset — this is a solo project on the free Supabase tier with no Supabase Branching, so the extra integration-branch layer (built for team-size review gating) was dropped deliberately. `claude/…` branches PR straight into `main`. Preview deploys still happen on every PR (`deploy-preview.yml`, wrangler env `preview`, shared production Supabase project) — only the second-hop `staging`→`main` promotion and the `require-staging-source` gate are gone.
- Supabase `.upsert()` + RLS: `INSERT ... ON CONFLICT DO NOTHING` requires SELECT access under Postgres RLS; use `.insert()` + catch error code `23505` (unique_violation) instead.
- Astro 7 `astro dev` daemonizes by default — Playwright's `webServer.command` must chain `npx astro dev; npx astro dev logs --follow` so the process stays alive.
- React islands in Astro SSR: `data-hydrated` must be set via `useEffect` (not as a static prop) — SSR renders the full HTML, so a static attribute exists before hydration.
- Security headers set in `src/middleware.ts` — CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy. CSP uses `'unsafe-inline'` for scripts (required by Astro island hydration); tightening to nonce-based is a follow-up.
- Contact API anti-abuse: honeypot field (`website`), origin check, content-type enforcement, split error handling (validation errors surfaced, DB errors generic). Cloudflare Turnstile + rate limiting are recommended next steps.
- Skills trimmed from 45 to 18 for credibility — only technologies demonstrably used or closely related to the portfolio stack.
- All CI workflows use `npm ci` (not `npm install`) for lockfile-integrity reproducible builds.
- CodeQL v4 added on schedule (weekly Monday 06:00 UTC) + push/PR triggers.
