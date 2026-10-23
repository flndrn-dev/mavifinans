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

These checks sent requests through the running Next.js app and independently queried Postgres/downloaded the S3 archive; they did not substitute mocks. The initial service tests used HTTP requests. Later deployment configuration used the authenticated native Chrome UI, while GitHub and Hostinger DNS were managed through the signed-in Brave session.

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

## Live deployment

The dedicated website repository is https://github.com/flndrn-dev/mavifinans, branch `main`. The local folder tracks GitHub origin/main. The former Codeberg history is preserved locally as `archive/codeberg-main`, with its remote named `legacy-codeberg`; it was not published to the dedicated website repository. Separate product source folders remain local and are excluded from this website repository.

| Target | Verified value |
| --- | --- |
| Dokploy | https://admin.loowii.com |
| Project | Mavi Finans / `kTsyoKgSNLmgqxDTksb3r` |
| Environment | production / `J1ejqq1tt_Spl4IF15xAM` |
| Application | mavifinans-web / `KQ_sBIICqWoCWWgOW2FDG` |
| Server | built-in Dokploy Server, `187.124.209.17` |
| App identifier | `app-calculate-wireless-capacitor-r5c3le` |
| GitHub source | flndrn-dev/mavifinans, main, On Push |
| Auto-deploy | enabled |
| Dockerfile | `apps/web-main/Dockerfile` |
| Docker context | repository root (`.`) |
| Main domain | mavifinans.eu, port 3000, HTTPS with Let's Encrypt |

The existing Mavi Finans website service was reused on its verified existing server. The Hostinger VPS whose display name is mavifinans.sh has a different address (`187.124.64.116`); that VPS was not selected or changed. The website's own existing server, confirmed in Dokploy's Web Server settings and the original .sh DNS, is `187.124.209.17`.

With the user's explicit approval, the existing GitHub app `Dokploy-2026-04-29-f2bu6m` was granted access to only the new `mavifinans` repository in addition to its prior 11 selections. No other repository permissions were changed.

The website's existing HOSTNAME, PORT and Umami environment settings were preserved. The Function URL and matching origin secret were added from the ignored local environment file. The website container does not receive Postgres or Object Storage credentials. Dokploy showed `Environments Added` after saving.

Application code commit `d4abe616d10106fe1fd5c572d61d3f1ba11490c6` was committed and pushed to GitHub main. Dokploy's deployment records show `Done` for that commit, including the initial 56-second build and a cached 2-second deployment. The running application exposes the Stop action in Dokploy.

The production linux/amd64 Docker image was independently built from the clean GitHub checkout. The build completed TypeScript and generated all 24 pages. The resulting image was started on local port 3011 with the same two website environment settings; the full Postgres, private storage, Function authentication, retry and quota verification suite passed against that container, then removed its synthetic records and files.

In Hostinger's mavifinans.eu DNS zone, only the apex A record was changed from `187.124.64.116` to `187.124.209.17`, with TTL 300. The www CNAME to mavifinans.eu and the independent staff A record at `187.124.64.116` were preserved. Both the authoritative nameserver and Cloudflare's public resolver returned the new address. Some cached resolvers still returned the old address immediately after the change.

### HTTPS and cutover verification

Both mavifinans.eu and www.mavifinans.eu return HTTP/2 200 on the verified server with normal certificate validation enabled. HTTP redirects to HTTPS with status 308. Let’s Encrypt issued separate valid certificates for the two names:

```text
subject: CN=mavifinans.eu
issuer: C=US; O=Let's Encrypt; CN=YR2
expire date: Jan 21 13:08:32 2027 GMT
subjectAltName: host "mavifinans.eu" matched cert's "mavifinans.eu"
SSL certificate verify ok.
HTTP/2 200
```

The www certificate expires Jan 21 13:08:30 2027 GMT and also passed hostname and certificate verification.

The first certificate attempt happened before the DNS cutover and failed because the ACME challenge reached the former address, 187.124.64.116. After the apex DNS change and route reconciliation, both certificates passed verification. No certificate verification was disabled and no browser security interstitial was bypassed.

The full verification suite passed against the live HTTPS website: homepage, waitlist and contact pages, sitemap domain, authenticated Function access, real Postgres writes, matching private JSON archives, duplicate/retry behavior, invalid inputs, private-object access, and durable quotas. Only synthetic test records/objects from the verification run were removed. Outbound email was not configured in the live website environment.

Because this machine’s configured resolver still cached the former address during verification, the final live test used an explicit lookup for the authoritative address, equivalent to curl --resolve. The URL, hostname/SNI and default certificate validation remained https://mavifinans.eu. The Function, database and storage requests used their normal DNS paths. The authoritative server, Cloudflare and Google DNS already returned 187.124.209.17. Other caches can retain the previous record for up to its original 3600-second TTL; such clients may temporarily reach the former server and see its certificate error until that cache expires.

Dokploy’s refreshed domain list contains only mavifinans.eu and www.mavifinans.eu, both on port 3000 with HTTPS/Let’s Encrypt enabled. The old mavifinans.sh route is absent and that URL returns 404 instead of serving the website. The service description was updated to “Main mavifinans.eu website — Neon backend.” The independent staff DNS record and other product services were preserved.

Automatic deployment was proven by pushing documentation commit 13fa58e46df0f2d2ae0e28cc21391720c4135f30 to main and observing a matching new Dokploy deployment with status Done (2 seconds), without a manual deploy action. Documentation-only updates use the same verified On Push deployment configuration.

Follow-up verification confirmed normal access without a DNS override: the machine's default resolver returned 187.124.209.17, `curl -I -v https://mavifinans.eu` reported `SSL certificate verify ok` and `HTTP/2 200`, and the existing Chrome tab displayed the homepage with “Connection is secure.”

The shared desktop/mobile header navigation sends Pay to `/pay` and For Creators to `/for-creators`, following the user’s later correction to keep service-information navigation inside Mavi Finans. Explicit product visit links remain separate.

The website follow-up adds Handlr to pricing and the product footer, with a dedicated `/handlr` page. `/for-creators` now shows Live, links to the live product, and describes current one-off support and marginal fees from Handlr’s live pricing page. `/for-creator` redirects to the existing plural route. Features 05 and 06 use “Financial partner processing” and “mavi Connect” as requested; the separate payment applications were not modified.

The subsequent requested refinements give all five pricing cards equal heights and aligned internal rows/actions, use Mavi Pay blue (#45B1E8) and Handlr’s dark-palette mint (#7FE6CF), and shorten Handlr’s fee copy to a fair platform fee from 1% to a maximum of 3%. Handlr copy includes “Your creator payments, handled by Handlr.” Browser icon metadata explicitly uses the existing Mavi SVG, with cache versioning and 48px/180px PNG exports of the same artwork for compatibility.

`npm run build` passed after these changes: “Compiled successfully,” TypeScript completed, all 25 pages generated, and “Standalone website assets ready.” During the follow-up, this Mac’s system lookup again returned the former server address even though the authoritative nameserver, Cloudflare, and Google all returned 187.124.209.17. Requests sent to the current address continued to verify the normal hostname and certificate successfully; the stale system lookup was still being investigated at this point.

The final refinement build also passed all 25 pages. The standalone app started with “Ready in 0ms.” HTTP checks passed for the homepage, pricing, creator and Handlr pages, singular-route redirect, shared navigation/footer links, both green Live top borders, concise fee copy, requested payment wording, and the SVG/PNG favicon resources. Desktop visual inspection confirmed equal card sizes, aligned tier headings/descriptions/actions, and the corrected brand colors. DNS checks isolated the remaining local access issue to both DNS addresses advertised by the local router, which still returned the old address with approximately 39 minutes remaining in their cached record; both authoritative nameservers and public resolvers returned the correct address.

Mavi Pay pricing was subsequently checked against `/Volumes/Data/Dev/mavi-pay/backend/lib/fees.ts` and `apps/web/app/pricing/page.tsx`: Free personal 5%, Free business 4%, Pro personal €9/month + 3%, Pro business €29/month + 2%. The user confirmed using the folder’s €9/€29 monthly amounts. The pricing card, `/pay` feature copy, and metadata now agree; payment gateway fees remain separate and the source’s provisional launch pricing is stated concisely.
