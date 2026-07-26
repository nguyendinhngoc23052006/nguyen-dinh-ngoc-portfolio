Make the light/dark toggle feel like a firework going off — pink light mode, particle burst from the click point, synthesized "bang" via Web Audio, slightly slower + snappier clip-path reveal. All effects respect `prefers-reduced-motion`.

## Changes
- **`src/styles/globals.css`** — light-mode palette repainted in pink OKLCH tokens (background, card, primary, secondary, muted, accent, border, ring). Dark mode unchanged. View-transition curve → `cubic-bezier(0.16, 1, 0.3, 1)` over `0.7s` for a punchier reveal.
- **`src/components/ThemeToggle.tsx`** —
  - `playBang()`: synthesizes a short low-passed white-noise burst + sub-bass sine thump via Web Audio API. No audio file, no fetches, no CSP impact. `AudioContext` closes 800ms after start.
  - `launchFireworks(x, y, next)`: appends a fullscreen fixed-position `<canvas>` (pointer-events: none, z-index 9999), spawns ~210–300 particles from three offset burst points around the click, animates with gravity/drag/fade via RAF, and removes the canvas when particles die or after 2500ms. Hues follow the destination theme (pink burst → light, cool burst → dark).
  - Both effects short-circuit under `prefers-reduced-motion: reduce` — the view transition still runs (already reduced to 1ms by the existing rule).
  - `busyRef` gate ignores clicks for 800ms so rapid re-clicks can't stack concurrent canvases / AudioContexts.

## Abuse case
UI-only. No fetches, no user input reflected as HTML, no secrets, no auth/money/PII/upload paths touched. Coordinates are numeric and self-sourced. Fireworks canvas is created via `document.createElement` (not `innerHTML`) and cannot inject markup.

## Verification
- `npm run lint` → clean.
- `npm run typecheck` → clean.
- `npm test` → 17 pass.
- Manual: click toggle → hear bang, see firework burst from cursor, page fades through pink (or back to neutral dark).

## Self-check
- [x] base = main; exactly one PR
- [~] no migrations
- [x] tests/lint/typecheck green; happy AND unhappy paths exercised (reduced-motion, no-AudioContext, no-view-transitions all fall through cleanly); e2e not affected — existing suite still green
- [x] scripts named `lint`, `typecheck`, `test`, `e2e`
- [~] no Supabase key changes; middleware untouched
- [~] no irreversible actions
- [x] no avoidable debt; MEMORY.md updated with the re-entrancy lesson
- [~] no migrations to explain
- [x] reviewers ran — `.claude/review/*` verdicts refreshed this PR (scale-reviewer caught the missing re-entrancy guard, fixed)
- [x] subagents dispatched at sonnet (one tier below opus 4.7)

## For you
**What changed:** Light mode is now pink. Clicking the theme toggle plays a short "bang" and shoots a firework burst from the click point on top of the existing clip-path reveal. Reduced-motion users get the plain view transition.

**What you do next:** Merge. No env or secret action needed. On preview, click the sun/moon icon in the header — you should hear the bang and see the burst (browsers require a user gesture before audio plays, so the first click is the gesture; every click is loud).

**How to roll it back:** Revert this PR. Nothing is persisted server-side.
