# MEMORY.md — whole-scene facts

- No `staging` branch or ruleset — this is a solo project on the free Supabase tier with no Supabase Branching, so the extra integration-branch layer (built for team-size review gating) was dropped deliberately. `claude/…` branches PR straight into `main`. Preview deploys still happen on every PR (`deploy-preview.yml`, wrangler env `preview`, shared production Supabase project) — only the second-hop `staging`→`main` promotion and the `require-staging-source` gate are gone.
