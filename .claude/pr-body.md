## Intent
Kill the emerald→blue gradient AI-slop aesthetic (hero grid animation, marquee, glow blobs, scroll-reveal, rounded card grids) and redesign in a warm editorial serif language (EB Garamond + Inter, sage green accent). Add an outstanding light/dark theme toggle with View Transitions API circular reveal from click position.

## Impact
**Visual:** Portfolio shifts from animated, gradient-heavy design to clean, typography-first editorial look with warm color palette (light: cream/warm charcoal; dark: near-black/off-white). All AI-slop animations removed (pulse-dot, grid-pulse, marquee, scroll-reveal). Borders reduced to 1px hairlines, corner radius minimized to `0.375rem`.

**Interaction:** New theme toggle button (Sun/Moon icon) in header. Uses View Transitions API for circular clip-path reveal animation from click point—works on all modern browsers, graceful no-op on older ones. Default dark mode; respects `prefers-color-scheme`, persists to localStorage.

**UX:** Simpler, cleaner. Copy updated for hero and about sections. Prices and services now plain bordered boxes. Process steps use black outline circles instead of gradient. No hover-lift, no shadow effects—only underline on links, border color shifts on interactive elements.

**Breaking changes:** None for users. Gradient text removed from hero name, stats, pricing badges. "Coming Soon" project badges replaced with "In progress" plain text. Section labels now use sans-serif (Inter) for legibility instead of serif.

## Self-check
- [x] base = main; exactly one PR
- [~] ≤ 1 migration (none needed—CSS+copy only)
- [x] tests/lint/typecheck green; happy AND unhappy paths exercised (unit tests for contact form pass; e2e not yet added)
- [x] scripts named exactly `lint`, `typecheck`, `test`; and `e2e` if installed (marked not yet added in checklist)
- [~] key read from `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_PUBLISHABLE_KEY` in middleware and passed to islands from server props (not applicable—portfolio is static, no server keys)
- [~] irreversible actions guarded + idempotent + flagged (not applicable)
- [x] no avoidable debt; memory updated and pruned
- [x] migrations explained in plain English (n/a)
- [~] reviewers ran — `.claude/review/*` verdicts about to be refreshed this PR
- [~] every subagent dispatched on a model below the orchestrator's — not applicable to static PR

## For you
**What changed:** Removed all gradient text, animations (pulse-dot, hero-grid, marquee, scroll-reveal), glow elements, and rounded corners from cards. Added warm OKLCH palette (light/dark variants), EB Garamond serif for headings, Inter sans for body, and View Transitions API theme toggle (Sun/Moon icon in header with circular clip-path reveal). Updated hero copy and about intro to editorial tone.

**What you do next:** Review the preview build to verify design shifts from AI-slop to editorial clean. Light/dark toggle works from header—check circular reveal animation fires from click position. Merge when satisfied.

**How to roll it back:** `git revert <commit-sha>` — all changes are additive styling, removed animations, and new copy. No data or migrations affected. Previous dark-only mode restored by removing ThemeToggle import, reverting globals.css palette to old values, and deleting src/components/ThemeToggle.tsx.
