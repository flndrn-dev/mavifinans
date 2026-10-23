# Mavi Finans website — Neon setup and verification

Updated 2026-10-23. Scope: this website only. Pay and handlr have their own websites and backends.

## Chosen source

`mavifinans-web` is the working source because it retains Git history (initial HEAD `550a08d`). At comparison time, it contained 1,736 non-generated files and the added `mavi` folder contained 1,789. All shared files were byte-identical. The added folder contained extra planning documents, screenshots, and browser logs, but no newer application code.

## Infrastructure

| Setting | Value |
| --- | --- |
| Organization | `org-divine-rice-48274887` |
| Project | `mavifinans` / `dry-cherry-00355609` |
| Branch | `production` / `br-summer-wind-b489poqb` |
| Region | AWS US East (Ohio), `aws-us-east-2` |
| Database | Postgres 18, application schema `mavi_web` |
| Function | `website` |
| Storage | `assets`, private |
| Primary website | `https://mavifinans.eu` |
| Future staff portal | `https://staff.mavifinans.eu` — outside this setup |

The existing project's other resources were preserved. The `website` Function rejects missing/incorrect origin secrets before parsing the request or accessing services. Next.js owns the public form routes; the browser never receives the origin secret or database/storage credentials.

`neon.ts` declares the Function and bucket. The Function uses a reusable `pg.Pool` with maximum 5 connections and `attachDatabasePool`, appropriate for Neon's long-running Node runtime. Normal traffic uses the pooled `DATABASE_URL`; migrations use `DATABASE_URL_UNPOOLED`.

## Schema and behavior

- `mavi_web.products`: five valid product interests, seeded by the migration.
- `mavi_web.waitlist_subscribers`: unique, trimmed, lowercase email addresses and timestamps.
- `mavi_web.waitlist_interests`: foreign-key relationships; repeated signups merge interests. Legacy `finans` maps to `banking`.
- `mavi_web.contact_submissions`: message fields, request ID, private archive key, archive status and staff-triage status.
- `mavi_web.submission_quotas`: persistent, keyed-digest quotas per normalized email: 5 contact messages or 20 waitlist requests per hour. These are application quotas, not perimeter DDoS protection.
- `public.mavi_website_migrations`: migration names, checksums and timestamps.

Contacts receive stable browser-generated request IDs. Repeating the same ID/payload returns the existing message; changing the payload with the same ID returns 409. A contact is first persisted with a pending archive, then written as `contact/<request-id>.json` in the private bucket, then marked stored. A storage failure retains the message and returns 503; retrying the same ID repairs the archive. No public message-reading endpoint exists.

Existing Resend email integrations run only when configured, after storage succeeds. Missing email credentials do not lose submissions. Notification errors are logged; email delivery is best effort, without a delivery queue. No email credentials were supplied, so outbound email was not tested.

## Commands

Install the CLI and link the requested project:

```bash
npm i -g neon@latest
neon init -y --org-id org-divine-rice-48274887 --project-id dry-cherry-00355609 --branch production --services postgres,object-storage,functions --no-agent-setup --package-manager pnpm
pnpm add -w @neon/config @neon/env @neon/functions pg @aws-sdk/client-s3 zod@^3
pnpm --filter web-main... install --frozen-lockfile
```

Generate `MAVI_ORIGIN_SECRET` as a random 32-byte value and put it in the ignored `.env.local` file. Never commit it. Then:

```bash
neon deploy --env .env.local
npm run db:migrate
npm run build
npm start -- --port 3010
# In another terminal with the app running and outbound email disabled:
npm run verify:neon
```

`neon deploy` pulls eight managed variables: `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `NEON_BRANCH`, `NEON_FUNCTION_WEBSITE_BASE_URL`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_ENDPOINT_URL_S3`, `AWS_REGION`. It preserves the custom origin secret. Root launch commands load `.env.local` and `.env` without overriding injected environment variables. `npm start` runs the standalone build; `npm run build` copies its static/public assets.

The migration runner uses a direct connection, a transaction and advisory lock, and rejects modified checksums. The migration was tested and rerun successfully on temporary branch `mavi-website-setup-20261023` before production. That isolated branch expires on 2026-10-24 at 23:59 UTC.

## Observed output

CLI install passed (`changed 155 packages`). Service deployment returned:

```text
Applied changes
  + bucket assets
  + function website
Utilized services: Postgres, Object Storage, Functions
Pulled 8 Neon variables into .env.local
```

Production migration:

```text
Applied: 001_website.sql
Website database migrations complete.
```

Final `npm run build` exited 0:

```text
✓ Compiled successfully in 34.2s
Finished TypeScript in 9.1s
✓ Generating static pages using 9 workers (24/24) in 626ms
Standalone website assets ready.
```

`npm test` passed 3 tests with zero failures. The running production app's service checks returned:

```text
PASS app: homepage, waitlist, contact and mavifinans.eu sitemap
PASS function: direct unauthenticated request rejected (401)
PASS validation: invalid email/interests/JSON rejected (400), oversized body rejected (413)
PASS postgres: one normalized signup; repeated submission merges banking/pay/wallet interests
PASS contact: Next.js -> authenticated Function -> Postgres -> private S3 JSON; exact contents verified
PASS retries: same ID creates one message; changed payload rejected (409); anonymous archive read denied
PASS durable quotas: sixth contact and exhausted signup rejected (429); expired quota resets
ALL NEON WEBSITE END-TO-END CHECKS PASSED
Cleanup complete: only this run's synthetic rows and objects removed.
```

These checks sent requests through the running Next.js app and independently queried Postgres/downloaded the S3 archive; they did not substitute mocks. Browser interaction testing was unavailable because no browser was connected.

## Issues encountered

- The Neon MCP connection is scoped to another project, so setup used the authenticated CLI with the requested project ID.
- The exact initial `neon init` command stalled on optional agent-plugin installation. It was stopped; initialization with `--no-agent-setup` linked the requested production branch.
- The initializer's `pnpm add` failed because pnpm requires `-w` for workspace-root dependencies. Installing with `pnpm add -w` resolved this.
- The workspace referenced a missing handlr Kysely patch. That root-only reference was removed; no handlr code/configuration was changed.
- Sandboxed npm/Neon requests could not reach the network; approved network access resolved dependency installation and CLI requests.
- A build attempted before installation finished could not find Next.js. Both subsequent complete builds passed.
- `next start` warned about standalone output. The root startup command now runs the generated standalone server and prepares its assets during the build.
- pnpm reported pre-existing mobile React peer warnings and skipped optional package build scripts. The website build and live service checks passed.
- node-postgres reports a forward-compatibility warning about `sslmode=require`; the current driver applies full certificate verification. No TLS checks were disabled.

## Dokploy deployment handoff

The user requested reuse of the Mavi Finans project at `https://admin.loowii.com` and the same service/server currently hosting `mavifinans.sh`, with the new domain `mavifinans.eu`. Once the replacement is verified, remove the old website's `.sh` routing/configuration. Do not modify independent Pay/handlr services or provision the future staff portal as part of this task.

At inspection time, `.sh` resolved to `187.124.209.17` and returned HTTPS 200; `.eu` resolved to `187.124.64.116` and failed certificate verification. Server selection must be verified in Dokploy before mutation; DNS alone does not establish the service's server ID.

No Dokploy API credentials or connected browser were available in this session, so no Dokploy service, domain, server, Git deployment source or DNS setting was changed. The existing `.sh` site remains running. The local source changes have not yet been committed/pushed; Dokploy's existing remote branch cannot deploy these uncommitted files.

Chrome recovery diagnostics confirmed Chrome running, the ChatGPT extension enabled in the Default profile, and a valid native-host manifest. The supported fresh-window recovery was approved and attempted, but the browser client still returned `Browser is not available: chrome`. The user is reconnecting Chrome after reinstalling the Browser plugin; live deployment remains pending authenticated access.

The final standalone startup returned `Ready in 0ms` on `http://127.0.0.1:3010`; the complete end-to-end verification passed again against that server with no standalone startup warning.

Once authenticated access is available: identify the existing website service/server/build source, preserve its other environment values, configure `NEON_FUNCTION_WEBSITE_BASE_URL` and the same `MAVI_ORIGIN_SECRET` from ignored `.env.local`, publish the exact local changes through the verified source, deploy to the existing server, point `.eu` DNS there, verify HTTPS/pages/form persistence, then remove the old `.sh` website route. The updated website Compose manifest already expects the two server-only variables and the `.eu` host. The Neon database/storage credentials are only required in the Function, not in the website container.
