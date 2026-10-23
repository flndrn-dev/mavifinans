# Mavi Finans website

Source for **mavifinans.eu**. The future staff portal is **staff.mavifinans.eu** and is managed separately.

This repository contains the Next.js website, its shared UI tokens, and the Neon backend for waitlist and contact forms. Mavi Pay and handlr are independent websites and repositories.

## Development

Requires Node.js 22+ and pnpm 10.28.1.

```bash
pnpm install --frozen-lockfile
npm run dev
```

Copy `.env.example` to an ignored `.env.local` and configure Neon as described in [the setup guide](docs/neon-setup.md).

```bash
neon deploy --env .env.local
npm run db:migrate
npm run build
npm start -- --port 3010
# In another terminal with the app running and outbound email disabled:
npm run verify:neon
```

## Deployment

GitHub: [flndrn-dev/mavifinans](https://github.com/flndrn-dev/mavifinans), branch `main`.

Dokploy: reuse the **Mavi Finans → production → mavifinans-web** application on **Dokploy Server**, the existing server hosting mavifinans.sh. Build with `apps/web-main/Dockerfile` and repository-root Docker context. Set `NEON_FUNCTION_WEBSITE_BASE_URL` and `MAVI_ORIGIN_SECRET` in the service environment. Enable automatic deployment from `main`.

Neon project: `dry-cherry-00355609`, production branch. Database credentials stay in the backend; the website container only needs its Function URL and shared origin secret. See the setup guide for migration evidence, service tests, and deployment progress.

## License

Apache 2.0. See [LICENSE](LICENSE).
