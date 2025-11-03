FROM node:20-alpine AS base
RUN corepack enable
RUN corepack prepare pnpm@8.15.5 --activate
WORKDIR /app

# Dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/*/package.json ./packages/*/
RUN pnpm install
# Build
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules
COPY . .
RUN pnpm run build --filter=api

# Production
FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache dumb-init

COPY --from=build /app/apps/api/dist ./dist
COPY --from=build /app/apps/api/package.json ./
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main"]
