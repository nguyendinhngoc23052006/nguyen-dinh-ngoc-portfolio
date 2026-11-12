# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it
responsibly.

**Email:** nguyendinhngoc23052006@gmail.com
**Subject line:** `[SECURITY] nguyen-dinh-ngoc-portfolio`

Please include:
- A description of the vulnerability
- Steps to reproduce
- Potential impact

I will acknowledge receipt within 48 hours and aim to resolve confirmed
vulnerabilities within 7 days.

## Scope

This policy covers the portfolio site. It collects no data: there is no form, account or database.
Infrastructure services (Cloudflare, GitHub) have their own
security policies.

## Security Measures

- **Server-side input validation** on all API endpoints
- **Security headers** (CSP, HSTS, X-Frame-Options, etc.)
- **Automated dependency scanning** via Dependabot and CodeQL
- **Secret scanning** enabled on the repository
