## Portfolio 2.0 — SEO, pricing, deep customization

Substantial upgrade making the site substantive, SEO-strong, and attention-grabbing without leaving the Jade brand identity. Adds structured pricing, a transparent process, and rich schema.org data targeting *custom software*, *bespoke*, *transparent pricing*, and *deep customization* keywords.

### Changes
- **Attention-grabbing visuals**: animated grid background in hero, gradient section labels, infinite-scroll tech marquee below the hero, scroll-reveal animations on every section (Intersection Observer, no library, respects `prefers-reduced-motion`)
- **Stats strip**: three honest metrics — 24h response · 1:1 collaboration · 100% code ownership
- **Services expanded 3 → 6**: Custom Web Apps, Automation, Cloud Infra, API Integrations, Migrations & Refactors, Development Consulting — each with individual CTA
- **New Pricing section**: 3 tiers (Starter $2k+, Growth $8k+ *recommended*, Enterprise custom) with feature checklists and per-tier CTAs
- **New Process section**: 4-step visual (Discovery → Design → Build → Ship) — horizontal timeline on desktop, vertical on mobile
- **New FAQ section**: 6 Q&As using native `<details>` (no JS), styled with reveal animation and rotate-on-open chevron
- **SEO — meta**: keyword-rich title & description, `meta name="keywords"`, canonical URL, expanded OG/Twitter tags, `meta name="theme-color"`
- **SEO — structured data**: JSON-LD expanded from bare `Person` to a `@graph` with `Person + Service + Offers + FAQPage` — pricing tiers become schema.org Offers, FAQ becomes schema.org FAQPage (rich-result eligible)
- **SEO — infrastructure**: new `public/sitemap.xml`, `public/robots.txt` now links it
- **Data extraction**: all new content in `src/data/portfolio.ts` with typed exports; nav links driven by data
- **Nav**: added Pricing, Process, FAQ links (desktop and mobile via shared `navLinks`)
- **E2e test**: title assertion updated

## Self-check
- [x] base = main; exactly one PR
- [~] ≤ 1 migration — no migration in this PR
- [x] tests/lint/typecheck green; happy AND unhappy paths exercised; e2e title/security/API tests updated (4 pre-existing sandbox 503 failures — no Supabase in sandbox — unrelated to this diff)
- [x] scripts named exactly `lint`, `typecheck`, `test`; and `e2e`
- [x] key read from `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_PUBLISHABLE_KEY` in middleware and passed to islands from server props; nothing hardcoded; no secret in code
- [~] irreversible actions — none in this PR
- [x] no avoidable debt; memory updated and pruned (Debt I'm leaving: `index.astro` at ~490 lines vs ~200 guideline — component split is a follow-up refactor PR, per rules)
- [~] migrations explained — no migration in this PR
- [x] reviewers ran — `.claude/review/*` verdicts refreshed this PR
- [x] every subagent dispatched on a model below the orchestrator's — never inherited (2× haiku researchers for content/CSS drafts, 3× sonnet reviewers for gate)

## For you
**What changed:** Rebuilt the portfolio to look substantial and rank for real search terms — new Pricing, Process, and FAQ sections with rich schema.org data, an animated grid + marquee + scroll-reveal, expanded services from 3 to 6, stats strip, sitemap, and a keyword-tuned meta stack. Pricing is `$2k / $8k / custom` — adjust in `src/data/portfolio.ts` if you want different numbers.
**What you do next:** Review the preview, then merge. Update `SITE_URL` in `src/data/portfolio.ts` (and matching URLs in `public/sitemap.xml` + `public/robots.txt`) if you add a custom domain later. Optionally submit the sitemap to Google Search Console once merged.
**How to roll it back:** Revert the single commit on main.
