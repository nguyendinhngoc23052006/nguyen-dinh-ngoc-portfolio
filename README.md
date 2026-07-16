# Nguyen Dinh Ngoc — Portfolio

Personal portfolio and contact site. Built with Astro, React, and Tailwind CSS, deployed to Cloudflare Workers with a Supabase backend.

## Stack

- **Framework:** Astro 7 (SSR) + React islands
- **Styling:** Tailwind CSS v4
- **Backend:** Supabase (PostgreSQL + Row-Level Security)
- **Hosting:** Cloudflare Workers
- **CI/CD:** GitHub Actions — lint, typecheck, test, e2e, preview deploy, production deploy
- **Security:** CSP, HSTS, CodeQL, Dependabot, honeypot + origin verification

## Development

```sh
npm ci
npm run dev
```

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Lint with Biome |
| `npm run typecheck` | TypeScript check |
| `npm test` | Run unit tests |
| `npm run e2e` | Run Playwright tests |

## License

[MIT](LICENSE)
