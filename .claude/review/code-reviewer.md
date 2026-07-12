# Code Review — shadcn/Tailwind redesign

**Date:** 2026-07-12
**Verdict:** PASS (after fix).

## Findings addressed

1. **Unused components removed** — `Card` and `Badge` had zero call sites; the about/project/skills sections are static Astro HTML that doesn't need React hydration. Removed both per the simplicity principle ("no abstraction until the SECOND real use exists").
2. **File size** — `index.astro` is ~290 lines, slightly over the ~200-line guideline. Acceptable: it is the complete single-page portfolio template; the data arrays (skills/projects) and six sections are a cohesive unit. Splitting would add files without reducing complexity.

## Checks (clear)

- **Components doing data access** — `ContactForm.tsx` fetches `/api/contact`, not Supabase directly. UI components are pure presentational.
- **Missing states** — form handles idle, sending (disabled + spinner), success, and error. Startup error renders visible text, never a blank screen.
- **Service test pairing** — `src/services/contact.ts` unchanged; `contact.test.ts` covers 16 happy/unhappy paths.
