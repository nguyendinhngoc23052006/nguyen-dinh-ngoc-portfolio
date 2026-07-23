# Code Review — Portfolio 2.0 (SEO + pricing + FAQ)

**Date:** 2026-07-19
**Verdict:** PASS (with one deliberate debt).

## Findings

1. **`index.astro` file size — deliberate debt** — file is now ~490 lines vs the ~200-line guideline. Splitting into `src/components/{Hero,Stats,Marquee,Services,Pricing,Process,Skills,Projects,FAQ}.astro` is a follow-up behavior-preserving refactor PR (per CLAUDE.md tech-debt rules: refactors stand alone, never inside a feature PR). Documented in the PR body's "Debt I'm leaving" line.

2. **Nav duplication — FIXED** — desktop nav now renders from `navLinks` (`src/pages/index.astro:118-122`), same source as `MobileNav.tsx`. Single source of truth.

3. **Section anchor coverage — FIXED** — `#skills` and `#projects` added to `navLinks` (`src/data/portfolio.ts:4-13`). All 10 sections are now reachable from both desktop and mobile navigation.

4. **Eyebrow-label duplication — FIXED** — extracted 8 repeated gradient-text class strings into `.section-label` in `src/styles/globals.css:64-77`. Single class, one place to change.

5. **Nav breakpoint — FIXED** — with 8 nav items, desktop nav needs more width. Moved from `md:flex` to `lg:flex`; `MobileNav` moved from `sm:hidden` to `lg:hidden` in lockstep — no gap where neither shows.

6. **Missing UI states** — N/A. All new sections render from static arrays; no runtime data fetches.

7. **Component data access** — clean. No new services/DB access in components.

8. **Accessibility** — clean. `nav[aria-label]`, `aria-hidden` on decorative elements, native `<details>/<summary>` for FAQ, `prefers-reduced-motion` fallbacks in place.
