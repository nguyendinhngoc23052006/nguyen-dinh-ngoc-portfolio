# Code Review — harden production deploy on CI + blue-green promotion

**Date:** 2026-07-24
**Verdict:** PENDING — awaiting reviewer completion.

## Changes under review
- `.github/workflows/deploy-production.yml`: Added `wait-for-ci` job (shell script polling), three-step deploy job (upload/parse/probe/promote).

## Code quality focus points
1. **Shell script quality** — error handling, idiomatic bash in `wait-for-ci`.
2. **Parsing robustness** — grep patterns for version ID and preview URL extraction.
3. **Health probe logic** — retry loop, sleep interval, exit conditions.
4. **Job dependencies** — `needs: wait-for-ci`, step output chaining.
5. **Duplication** — repeated secrets/vars across steps.
6. **Comments** — sufficient documentation for maintenance.

(Verdict and detailed findings to be updated by reviewer.)
