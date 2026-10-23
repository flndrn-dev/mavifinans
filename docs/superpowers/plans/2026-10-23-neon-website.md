# Mavi Finans Neon Website Implementation Plan

**Goal:** Persist the current website's real form flows using the requested Neon Postgres, Object Storage, and Functions services.

**Architecture:** Existing Next.js form routes call an authenticated Neon Function. A reusable pg pool persists records; private S3 storage archives contact messages. Root launch scripts load the CLI-managed environment for the web workspace.

**Tech Stack:** Next.js 16, TypeScript, node-postgres, Neon Functions, AWS S3 SDK, pnpm.

**Spec:** ../specs/2026-10-23-neon-website-design.md

## Global constraints

- Use project dry-cherry-00355609 / org-divine-rice-48274887 / production.
- Scope is the current website; keep Pay and handlr independent.
- Use pooled connections for traffic, direct connections for migrations.
- No secrets in Git or browser bundles; Function authenticates before data access.

## Review focus

- Repeated/case-varied email submissions must merge without duplicates.
- Both banking and legacy finans interest values must work.
- Malformed/oversized bodies and unknown interests must fail without writes.
- Contact retries and storage failures must retain a recoverable message.
- Direct anonymous Function access and quota overflow must reject requests.

## Tasks

- [x] Add root build/start/dev/migration/verification scripts and declare runtime dependencies with pnpm workspace-root flags. Verify dependency resolution.
- [x] Add versioned SQL schema and a transactional/checksummed migration runner. Verify on a temporary Neon branch and rerun for idempotency.
- [x] Replace generated hello handler with the authenticated website backend, shared validation and private contact archive integration. Declare its origin secret in neon.ts.
- [x] Wire existing Next.js form endpoints to the Function, retain configured Resend notifications after persistence, and add stable contact retry IDs. Verify validation, duplicate handling and quotas with meaningful tests.
- [x] Deploy the declared services to production, migrate, run npm run build and start the app. Exercise form → Next.js → Function → Postgres/storage and independently assert stored values. Record output and limitations.

## Follow-up hosting migration requested by user

- [ ] Inspect the existing Mavi Finans website project, service, environment and server at admin.loowii.com using authenticated access. Reuse the exact target that hosts mavifinans.sh.
- [ ] Verify the repository/build source, publish the local changes, configure the existing website service's Neon Function URL and origin secret, and deploy via Dokploy.
- [ ] Move mavifinans.eu onto the same verified server, verify HTTPS/pages/form persistence, then remove the old mavifinans.sh website routing/configuration.
