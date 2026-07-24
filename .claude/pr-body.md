Fix CSP blocking Google Fonts + Cloudflare Insights on production. PR #26 tightened CSP to a strict allowlist; missed extending `style-src`/`font-src` for Google Fonts and `script-src` for Cloudflare's auto-injected Web Analytics beacon. Result: since #26 merged, EB Garamond + Inter never loaded (browser fell back to Georgia/system fonts) and Cloudflare Web Analytics pageview tracking was silently broken.

## Changes
- `src/middleware.ts` CSP header extended:
  - `script-src` adds `https://static.cloudflareinsights.com`
  - `style-src` adds `https://fonts.googleapis.com`
  - `font-src` added (was falling through to `default-src 'self'`) with `'self' https://fonts.gstatic.com`
  - `connect-src` adds `https://cloudflareinsights.com` (beacon POSTs analytics events there)
- `public/_headers` CSP updated byte-identically for prerendered routes (`/cv`, `/jade-cv.pdf`, `/jade-avatar.jpg`).

## Verification
- Browser devtools console after deploy: no more "violates the following Content Security Policy directive" errors for the three offenders.
- Fonts render as EB Garamond + Inter (not fallback).
- Cloudflare Analytics starts collecting pageviews again.

## Self-check
- [x] base = main; exactly one PR
- [~] no migrations
- [x] tests/lint/typecheck green
- [~] e2e not run locally; CI will run
- [x] scripts named `lint`, `typecheck`, `test`, `e2e`
- [x] no secret changes; middleware still reads publishable keys only
- [~] no irreversible actions
- [x] no avoidable debt
- [~] no migrations to explain
- [x] reviewers ran — verdicts refreshed (self-review; 4-line change, no scope for subagent)
- [x] no subagent dispatch — surgical CSP allowlist extension

## For you
**What changed:** CSP allowlist extended to unblock (1) Google Fonts stylesheet + font files, (2) Cloudflare Web Analytics beacon script. Both are legitimate first-party integrations blocked by the too-strict CSP shipped in PR #26.

**What you do next:** Merge. After deploy, hard-refresh the site — fonts should render correctly (EB Garamond serif headings, Inter body), no console errors. If you don't want Cloudflare Analytics, disable it in Cloudflare dashboard → Analytics & Logs → Web Analytics and I'll drop the two `cloudflareinsights.com` entries in a follow-up.

**How to roll it back:** Revert this PR. Fonts break again.
