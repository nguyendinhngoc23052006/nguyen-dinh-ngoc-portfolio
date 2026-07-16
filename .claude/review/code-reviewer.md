# Code Review — professional overhaul + security hardening

**Date:** 2026-07-16
**Verdict:** PASS — one bug found and fixed; no blocking issues remaining.

## Findings

1. **MobileNav listener leak (FIXED)** — `useEffect` cleanup used a different function reference than `addEventListener`, so `removeEventListener` was a no-op. Fixed by using the same named handler for both.
2. **Nav link duplication** — desktop nav links in `index.astro` and `MobileNav.tsx` `links` array are hand-duplicated. Minor; acceptable for a two-location static list.
3. **index.astro at 274 lines** — over the ~200-line guideline. Acceptable for a single-page landing page; next addition should split content data or extract sections.
4. **API response helper** — `new Response(JSON.stringify(...), { status, headers })` repeated 8 times in `api/contact.ts`. Minor; `JSON_HEADERS` constant already reduces duplication.
5. **No component data access violations** — components use `fetch()` only, data access stays in `src/services/`.
6. **No missing states** — idle/sending/success/error all rendered; startup error shows visible text.
7. **No stale tests** — `src/services/contact.ts` unchanged, existing tests cover 16 paths.
