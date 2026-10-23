# Mavi Finans website on Neon

Scope approved by the user: the current Mavi Finans website, excluding the independent Pay and handlr backends.

## Folder comparison

The initial SHA-256 comparison found 1,736 files in mavifinans-web and 1,789 in mavi, excluding dependency/build directories, Git internals, and local environment files. Every shared file matched. The additional mavi files are planning documents, CLAUDE.md, browser logs, and screenshots. mavifinans-web has Git history (HEAD 550a08d); mavi has no .git directory. Use mavifinans-web as the implementation workspace. Neither contains newer application code than the other.

## Design

Keep Next.js and its existing public form endpoints. Use a protected Neon Function as the website data backend, with a small reusable node-postgres pool appropriate for the long-running Function runtime. The browser only calls Next.js; an origin secret authenticates Next.js to the Function before body parsing or database work.

Use the supplied project dry-cherry-00355609, organization org-divine-rice-48274887, production branch. Its aws-us-east-2 region supports the requested services. Keep secrets in ignored .env.local and inject root configuration into the web workspace at startup.

The complete schema for currently implemented website features includes product interests, unique normalized waitlist subscribers, their interest relationships, contact submissions, persistent submission quotas, and migration history. The finans interest from the dedicated page aliases banking. Repeated waitlist submissions merge interests without duplicate subscribers. Contact submissions use stable request IDs so retries neither create duplicate messages nor lose archives.

Store each contact message as JSON in a private assets bucket, with its object key and archive state in Postgres. Retry failed archives using the same key; a message is accepted only when its database row and archive exist. Keep existing Resend notifications optional after persistence; missing email credentials do not prevent storage.

Validate bodies and cap size, restrict interests, parameterize SQL, rate-limit contact and waitlist submissions with durable counters, expose no public message-reading route, and keep upstream errors and credentials out of responses. Schema migrations run over DATABASE_URL_UNPOOLED with checksums, a transaction and an advisory lock.

## Verification

Test migrations on an isolated Neon branch before production. Run npm run build, start the production app, submit both forms through Next.js, query the exact resulting rows, download the contact archive and compare its contents, test duplicate signups/retries, malformed/invalid payloads, rate limits, and unauthenticated direct Function access. Remove only synthetic test records and objects. Record exact output and failures in docs/neon-setup.md.

This does not implement the mobile authentication placeholder or future financial products. Their product behavior and schemas are outside the approved website scope.

## Requested hosting migration

The primary domain is mavifinans.eu. The user requests deployment through the existing Mavi Finans project at admin.loowii.com on the same service/server as mavifinans.sh, followed by removal of the old website's .sh configuration after .eu is verified. The future staff portal is staff.mavifinans.eu and is not part of this deployment. Live target IDs, repository source, environment, and domain ownership must be verified in Dokploy before mutation. Preserve independent Pay and handlr resources.
