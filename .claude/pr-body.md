Feature the shipped **regex tester** as the first entry in the projects section, and let cards declare themselves as `shipped` with a live URL so real work no longer renders under the placeholder "In progress" label.

## Changes
- `src/data/portfolio.ts` — new `Project` interface with optional `status` (`"shipped"`), `url`, and `source` fields. `projects[0]` replaced with the regex-tester entry (title, one-sentence pitch, `Vanilla JS · URL state · Cloudflare Pages` tags, live URL, GitHub source). The `Full-Stack Web App` placeholder is dropped; positions 02 and 03 keep their existing placeholder copy.
- `src/pages/index.astro` — projects `.map()` now:
  - Derives a `Tag` variable — `"a"` when `url` is set, `"div"` otherwise — so shipped projects render as a real anchor (with `target="_blank"` + `rel="noopener noreferrer"`), unshipped ones stay as inert cards. No wrapper duplication.
  - Swaps hardcoded `In progress` for `status === "shipped" ? "Live" : "In progress"`, plus an accent color on the shipped label.
  - Adds a `↗` glyph beside the title on linked cards; the whole card gains a `hover:border-accent` transition.

## Verification
- `npm run lint` — clean (pre-existing biome schema version info unchanged).
- `npm run typecheck` — clean.
- `npm run test` — 17 unit tests pass.
- `npm run e2e` — 4 passed / 5 pre-existing failures unchanged from `main` (all in `/health` + contact-API paths that need live Supabase and a Cloudflare Rate Limiting binding this sandbox doesn't have; my diff touches neither).
- Manually launched `astro dev` with placeholder env, screenshot-verified the projects section, and DOM-scraped the three cards to confirm the regex-tester card is a real `<a href="https://regex-tester-6dz.pages.dev" target="_blank" rel="noopener noreferrer">` with the `Live` label, while the other two remain `<div>` with `In progress`.

## Self-check
- [x] base = main; exactly one PR
- [~] no migrations
- [x] tests/lint/typecheck green; happy AND unhappy paths exercised (linked vs unlinked card branches verified in the DOM scrape)
- [~] e2e: 5 pre-existing failures on `main` too — all in `/health` + contact-API paths that need Supabase + CF Rate Limiting; diff does not touch those paths
- [x] scripts named `lint`, `typecheck`, `test`, `e2e`
- [~] no Supabase env change; middleware unaffected; no secret in code
- [~] no irreversible actions
- [x] no avoidable debt
- [~] no migrations to explain
- [x] reviewers ran — verdicts refreshed (self-review; 25-line surgical diff, no scope for a subagent)
- [x] no subagent dispatch — data + template change kept in-orchestrator

## For you
**What changed:** the projects section now leads with the shipped regex-tester as a live, clickable card (accent "Live" label, `↗` arrow, opens in a new tab), and future shipped projects get the same treatment by setting `status: "shipped"` + `url` in `src/data/portfolio.ts`.

**What you do next:** review the preview URL, then merge. No env, secret, or dashboard change required.

**How to roll it back:** revert this PR. `projects[0]` returns to the "Full-Stack Web App" placeholder; all three cards render as inert divs with "In progress" again.
