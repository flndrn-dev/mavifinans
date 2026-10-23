# Website development

Install Node.js 22+ and pnpm 10.28.1. Run `pnpm install --frozen-lockfile`, configure the ignored root `.env.local`, and run `npm run dev`.

The website lives in `apps/web-main`; shared UI tokens live in `packages/ui`. Neon handlers live in `functions`, SQL migrations in `db/migrations`, and command-line helpers in `scripts`.

Run `npm test` for validation tests, `npm run build` for the production build, and `npm start -- --port 3010` to run the standalone server. With the app running and outbound email disabled, `npm run verify:neon` checks the real form routes, Postgres records, Function authorization and private contact archives, then removes its synthetic test data.

See [the setup guide](docs/neon-setup.md) for infrastructure and deployment details. Pushes to the configured GitHub `main` branch are intended to deploy through the existing Dokploy website service.
