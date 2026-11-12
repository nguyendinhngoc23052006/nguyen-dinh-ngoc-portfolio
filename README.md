# Nguyen Dinh Ngoc — Portfolio

Personal portfolio and CV site: who I am, the systems I built and how to reach me. Built with Astro, React, and Tailwind CSS, served by Cloudflare Workers. No database: the content lives in `src/data/portfolio.ts`.

## Stack

- **Framework:** Astro 7 (SSR) + React islands
- **Styling:** Tailwind CSS v4
- **Hosting:** Cloudflare Workers
- **CI/CD:** GitHub Actions — lint, typecheck, test, e2e, preview deploy, production deploy
- **Security:** CSP, HSTS, CodeQL, Dependabot

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
