# Code Review — Content-dense portfolio upgrade

**Date:** 2026-07-18
**Verdict:** PASS — after fixing nav-link duplication.

## Findings

1. **Nav-link duplication fixed** — extracted `navLinks` array to `src/data/portfolio.ts`, shared by both desktop nav (`index.astro`) and `MobileNav.tsx`. Adding/removing a nav link now requires one change, not two.
2. **index.astro at ~250 lines** — still above the ~200-line guideline but improved from 276; data arrays extracted to `src/data/portfolio.ts`, desktop nav links deduplicated. Pre-existing structural issue; further extraction would require Astro component splitting (a separate refactor PR).
3. **Button class duplication** — outline-button style string repeated at `index.astro:88` and `:221`. Pre-existing pattern; the `ui/button.tsx` component exists but Astro templates use raw `<a>` tags. Not introduced by this diff.
4. **No missing states** — all new content is static build-time data; loading/empty/error states don't apply.
