# Security Review — Skip deploy-preview for Dependabot PRs

**Date:** 2026-07-19
**Verdict:** PASS. Workflow-only 1-line skip; no code, no secrets, no new attack surface. Actually improves security posture — Dependabot PRs no longer attempt to use secrets they can't access, reducing failure-log noise.
