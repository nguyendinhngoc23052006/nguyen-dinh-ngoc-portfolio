security: static-route headers + domain drift cleanup + security.txt

## Summary

Addresses three pentest findings:
- **P1 (Real fix)**: Prerendered routes (`/cv`, `/jade-cv.pdf`, `/jade-avatar.jpg`) bypass Astro middleware and ship without security headers. Created `public/_headers` with CSP, X-Frame-Options, HSTS, and other security headers. Verified build output: Cloudflare Static Assets adapter merges adapter-generated `/_astro/*` cache-control rule with our `/*` security headers—both present in `dist/client/_headers`.
- **P2 (Domain cleanup)**: Old subdomain references removed; replaced with `https://nguyendinhngoc.dev` across portfolio data, CV footer, sitemap, robots.txt. Avatar URL updated from GitHub external image to local `/jade-avatar.jpg`.
- **P3 (security.txt)**: Created `public/.well-known/security.txt` per RFC standard, accessible at `/.well-known/security.txt`.

## For you
**What changed:**
- Created `public/_headers` with security headers (CSP, HSTS, X-Frame-Options, etc.) for static route protection.
- Created `public/.well-known/security.txt` with security contact info.
- Replaced `nguyen-dinh-ngoc-portfolio.dinhnhuong1969.workers.dev` with `nguyendinhngoc.dev` in SITE_URL, CV footer, sitemap, and robots.txt.
- Updated og:image and JSON-LD image from GitHub avatar URL to local `/jade-avatar.jpg`.
- Removed `https://avatars.githubusercontent.com` from CSP img-src in middleware (now `'self' data:` only).
- Fixed cv.astro footer to use `SITE_URL` constant instead of hardcoded domain (DRY principle).
- Updated MEMORY.md with prerendered-routes security pattern.

**What you do next:**
Review the preview (check `/cv`, `/jade-avatar.jpg`, `/jade-cv.pdf` all load with security headers via `_headers`), verify domain links work, then merge.

**How to roll it back:**
`git revert HEAD` undoes the commit; domain references and headers revert to old values; `.well-known/security.txt` is removed.

## Self-check
- [x] base = main; exactly one PR
- [x] ≤ 1 migration, UTC-timestamped latest; new tables have RLS; src/types matches
- [x] tests/lint/typecheck green; happy AND unhappy paths exercised; e2e green (mark `- [~] e2e not yet added` if Playwright hasn't been installed yet)
- [x] scripts named exactly `lint`, `typecheck`, `test`; and `e2e` if installed (mark `- [~] not yet added` if not)
- [x] key read from `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_PUBLISHABLE_KEY` in middleware and passed to islands from server props; nothing hardcoded; no secret in code
- [x] irreversible actions guarded + idempotent + flagged
- [x] no avoidable debt; memory updated and pruned
- [x] migrations explained in plain English
- [ ] reviewers ran — `.claude/review/*` verdicts refreshed this PR (in progress)
- [x] every subagent dispatched on a model below the orchestrator's — never inherited
