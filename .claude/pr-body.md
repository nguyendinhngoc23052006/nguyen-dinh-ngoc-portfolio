## Jade branding + logo favicon

Adds "Jade" as a professional alias alongside "Nguyen Dinh Ngoc" and replaces the placeholder favicon with a custom J logo matching the user's brand identity.

### Changes
- **Favicon**: replaced placeholder blue "N" square with custom J logo SVG (green-to-blue gradient, dark background, diamond accent)
- **Nav**: "NDN" → "Jade"
- **Hero**: "Jade" label above the full name; gradient on "Ngoc" changed from blue-violet to emerald-blue to match logo
- **Hero glow effects**: updated to emerald/blue to match brand colors
- **Meta tags**: title, OG, Twitter Card all updated to include "Jade"
- **JSON-LD**: added `alternateName: "Jade"` for SEO
- **Footer**: copyright updated to "Jade · Nguyen Dinh Ngoc"
- **E2e test**: title assertion updated to match new page title

## Self-check
- [x] base = main; exactly one PR
- [~] ≤ 1 migration — no migration in this PR
- [x] tests/lint/typecheck green; happy AND unhappy paths exercised; e2e updated with new title
- [x] scripts named exactly `lint`, `typecheck`, `test`; and `e2e` if installed
- [x] key read from `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_PUBLISHABLE_KEY` in middleware and passed to islands from server props; nothing hardcoded; no secret in code
- [~] irreversible actions — none in this PR
- [x] no avoidable debt; memory updated and pruned
- [~] migrations explained — no migration in this PR
- [x] reviewers ran — `.claude/review/*` verdicts refreshed this PR
- [x] every subagent dispatched on a model below the orchestrator's — never inherited

## For you
**What changed:** Added "Jade" as your professional alias across the site (nav, hero, meta tags, JSON-LD, footer) and replaced the favicon with a custom J logo SVG matching your brand colors (green-to-blue gradient).
**What you do next:** Review the preview deploy, then merge. If the favicon SVG doesn't match your actual logo closely enough, commit your real logo file to `public/favicon.svg` on this branch before merging.
**How to roll it back:** Revert this single commit on main.
