# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it
responsibly.

**Email:** dinhnhuong1969@gmail.com
**Subject line:** `[SECURITY] nguyen-dinh-ngoc-portfolio`

Please include:
- A description of the vulnerability
- Steps to reproduce
- Potential impact

I will acknowledge receipt within 48 hours and aim to resolve confirmed
vulnerabilities within 7 days.

## Scope

This policy covers the portfolio site and its contact form endpoint.
Infrastructure services (Supabase, Cloudflare, GitHub) have their own
security policies.

## Security Measures

- **Row-Level Security** on all Supabase tables
- **Server-side input validation** on all API endpoints
- **Security headers** (CSP, HSTS, X-Frame-Options, etc.)
- **Honeypot + origin verification** on the contact form
- **Automated dependency scanning** via Dependabot and CodeQL
- **Secret scanning** enabled on the repository
