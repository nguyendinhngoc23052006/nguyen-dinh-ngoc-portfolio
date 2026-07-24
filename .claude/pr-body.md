Fix CVE-2026-33327 / 33328 / 35590 / 35591 (High, CVSS 7.0) — `sharp` transitive dep was pulling `libvips` versions with 4 vulnerabilities. GitHub Dependabot flagged it 19h ago but got stuck (transitive-dep automation doesn't handle overrides). Manual bump via npm `overrides`.

## Changes
- `package.json` — added `"overrides": { "sharp": ">=0.35.0" }`
- `package-lock.json` — regenerated. `sharp` bumped `0.34.5 → 0.35.3` transitively via both `astro` and `miniflare` (both dedupe to the overridden version). `npm audit` now reports 0 vulnerabilities.

## Self-check
- [x] base = main; exactly one PR
- [~] no migrations
- [x] tests/lint/typecheck green (17/17 unit tests, lint clean, typecheck clean)
- [~] e2e not run locally; CI will run
- [x] scripts named `lint`, `typecheck`, `test`, `e2e`
- [x] no key/secret changes
- [~] no irreversible actions
- [x] no avoidable debt; MEMORY updated
- [~] no migrations to explain
- [x] reviewers ran — verdicts refreshed
- [x] no subagent dispatch — surgical 3-line override, self-reviewed against reviewer checklists

## For you
**What changed:** Added npm `overrides` block forcing `sharp >= 0.35.0` — resolves 4 High-severity libvips CVEs. Both dependency chains (astro, miniflare via @astrojs/cloudflare) dedupe to the safe version.

**What you do next:** Review the preview, then merge. The Dependabot alert should auto-close once the merge commit lands on main (or dismiss it manually — it's now fixed by override rather than a Dependabot PR).

**How to roll it back:** Revert this PR — reintroduces the CVEs.
