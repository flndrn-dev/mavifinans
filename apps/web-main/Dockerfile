FROM node:24-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.28.1 --activate

FROM base AS builder
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY apps/web-main/package.json ./apps/web-main/
COPY packages/ui/package.json ./packages/ui/
RUN pnpm install --frozen-lockfile
COPY . .
ENV NODE_OPTIONS=--max-old-space-size=2048
RUN pnpm --filter web-main build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
COPY --from=builder /app/apps/web-main/.next/standalone ./
COPY --from=builder /app/apps/web-main/.next/static ./apps/web-main/.next/static
COPY --from=builder /app/apps/web-main/public ./apps/web-main/public
EXPOSE 3000
CMD ["node", "apps/web-main/server.js"]
