## Content-dense portfolio upgrade

Adds three structural upgrades to the portfolio — a Services section, card-grid Skills, and numbered "Coming Soon" project showcases — giving the site substance and CTAs while projects are still in development.

### Changes
- **Services section**: new "What I build" section (Web Apps, Automation, Cloud Infra) between About and Skills, each with a "Let's talk →" CTA linking to contact
- **Skills → card grid**: upgraded from flat pill groups to a responsive 3-column card grid with hover effects
- **Projects → numbered showcase**: replaced 2 generic placeholder cards with 3 numbered (01/02/03) "Coming Soon" cards showing project type, description, and tech tags, plus a "Follow on GitHub →" CTA
- **Data extraction**: moved skills/services/projects arrays to `src/data/portfolio.ts` to keep `index.astro` under control
- **Nav**: added "Services" link to both desktop and mobile navigation

## Self-check
- [x] base = main; exactly one PR
- [~] ≤ 1 migration — no migration in this PR
- [x] tests/lint/typecheck green; happy AND unhappy paths exercised; e2e updated (title unchanged, page tests pass; API failures are pre-existing sandbox issues)
- [x] scripts named exactly `lint`, `typecheck`, `test`; and `e2e` if installed
- [x] key read from `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_PUBLISHABLE_KEY` in middleware and passed to islands from server props; nothing hardcoded; no secret in code
- [~] irreversible actions — none in this PR
- [x] no avoidable debt; memory updated and pruned
- [~] migrations explained — no migration in this PR
- [x] reviewers ran — `.claude/review/*` verdicts refreshed this PR
- [x] every subagent dispatched on a model below the orchestrator's — never inherited

## For you
**What changed:** Added a "What I build" services section with contact CTAs, upgraded skills to a card grid layout, and replaced generic project placeholders with 3 numbered "Coming Soon" showcase cards pointing to your GitHub — all using your existing Jade brand colors.
**What you do next:** Review the preview deploy, then merge. As you ship real projects, update the `projects` array in `src/data/portfolio.ts` — swap the `num`/`title`/`desc`/`tags` and add an `href` field to link each card.
**How to roll it back:** Revert this single commit on main.
