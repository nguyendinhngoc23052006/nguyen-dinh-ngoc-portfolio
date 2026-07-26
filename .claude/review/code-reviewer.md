# Code Review — projects[0] replaced with shipped regex-tester

**Date:** 2026-07-26
**Verdict:** PASS.

Two-file surgical edit. `src/data/portfolio.ts:198` — introduced a `Project` interface with optional `status`/`url`/`source`, replaced `projects[0]` placeholder with the shipped regex-tester entry. `src/pages/index.astro:388` — projects `.map()` now derives a `Tag` variable (`"a"` when `url` is set, `"div"` otherwise) and swaps hardcoded "In progress" for `status === "shipped" ? "Live" : "In progress"`, with the accent color and a `↗` glyph applied only to the linked card.

No duplicated logic (the conditional element pattern replaces one hardcoded tag, not extracted-then-inlined). No file over ~200 lines (index.astro grew from ~464 to ~475). No component doing data access (this is a data/presentation change; no Supabase touched). No new services, so no test-change requirement triggered. Existing loading/empty/error states in unrelated sections untouched. Self-review — 25-line diff, no scope for a reviewer subagent.
