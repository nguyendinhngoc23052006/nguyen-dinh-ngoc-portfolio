# Code Review — PR: static-route headers + domain cleanup + security.txt

**Date:** 2026-07-24  
**Verdict:** PASS — critical fix applied; residual duplication documented.

## Findings

### Critical fix applied
- **cv.astro hardcoded domain (WAS: issue):** `src/pages/cv.astro:161` was hardcoding `https://nguyendinhngoc.dev` instead of importing `SITE_URL` constant. **FIXED**: Updated cv.astro import block to include SITE_URL from src/data/portfolio.ts, and footer link now uses `<a href={SITE_URL}>{SITE_URL.replace("https://", "")}</a>`. Aligns with index.astro pattern (which uses template literals for absolute URLs).

### Duplication (existing, documented)
1. **CSP drift risk (existing):** `src/middleware.ts:11` and `public/_headers:7` both contain the full CSP string, hand-copied with no shared source. Currently byte-identical (both correctly drop `avatars.githubusercontent.com`), but unprotected against future desync. Already documented in MEMORY.md:18 as "drift risk — grep both if you change either." No enforcement mechanism (no build-time validation or test). This PR maintains consistency; future maintainers should note the dependency.

2. **Oversized files (not regression):**
   - `src/pages/index.astro` (464 lines) — over ~200 guideline; consolidates 11 page sections. Not addressed in this PR (unrelated to security fix).
   - `src/data/portfolio.ts` (239 lines) — over ~200 guideline; single responsibility (static data). Not addressed in this PR; worth splitting if it keeps growing.

### No new issues
- Template literals `${SITE_URL}/jade-avatar.jpg` in index.astro produce valid absolute URLs.
- robots.txt and sitemap.xml syntax valid.
- public/ → dist/client/ copy verified (build artifact confirmed).
- Astro imports all correct; no circular dependencies or unused symbols.

## Verdict
Critical duplication fix applied (cv.astro SITE_URL import). Residual duplication (CSP drift risk, oversized components) is pre-existing and documented; not introduced by this PR.
