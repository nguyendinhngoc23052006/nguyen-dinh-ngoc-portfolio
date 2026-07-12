Redesign portfolio page with Tailwind CSS v4 + shadcn/ui components, replacing ~400 lines of hand-written CSS with a modern design system. The contact form is now a React island with proper shadcn form components.

## Self-check
- [x] base = main; exactly one PR
- [~] ≤ 1 migration — no migration in this PR (UI-only change)
- [x] tests/lint/typecheck green; happy AND unhappy paths exercised; e2e green (contact-form-submit test passes on CI — blocked in sandbox by proxy allowlist only)
- [x] scripts named exactly `lint`, `typecheck`, `test`; and `e2e` if installed
- [x] key read from `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_PUBLISHABLE_KEY` in middleware and passed to islands from server props; nothing hardcoded; no secret in code
- [~] irreversible actions guarded + idempotent + flagged — no irreversible actions
- [x] no avoidable debt; memory updated and pruned
- [~] migrations explained in plain English — no migration
- [x] reviewers ran — `.claude/review/*` verdicts refreshed this PR
- [x] every subagent dispatched on a model below the orchestrator's — never inherited

## For you
**What changed:** Replaced the hand-written CSS portfolio page with Tailwind CSS v4 + shadcn/ui design system; the contact form is now a React island with proper hydration handling; Playwright config updated for Astro 7's daemon dev server and pre-installed Chromium.
**What you do next:** Review the preview deploy, then merge.
**How to roll it back:** Revert this PR — the old `index.astro` with inline `<style>` and `<script>` tags is restored, and the new dependencies (react, tailwindcss, shadcn utils) become unused but harmless until removed.
