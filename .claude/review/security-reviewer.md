# Security Review — projects[0] replaced with shipped regex-tester

**Date:** 2026-07-26
**Verdict:** PASS.

New outbound link to `https://regex-tester-6dz.pages.dev` — first-party, owned by the same GitHub user hosting this site (repo `nguyendinhngoc23052006/regex-tester`, deployed by the same account on Cloudflare Pages). Anchor uses `target="_blank"` + `rel="noopener noreferrer"` — blocks reverse `window.opener` tab-nabbing and strips the Referer. No user input, no auth, no PII, no secrets, no CSP change (linking off-site to an https origin is unaffected by CSP), no middleware or service touched. Self-review — same-owner first-party link with the standard opener/referrer hardening already applied.
