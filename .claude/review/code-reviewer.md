# Code Review — Skip deploy-preview for Dependabot PRs

**Date:** 2026-07-19
**Verdict:** PASS. Single-line `if:` guard at job level in `.github/workflows/deploy-preview.yml`. Idiomatic GitHub Actions pattern; no duplication, no oversized file, no missing states.
