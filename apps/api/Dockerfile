FROM node:20-alpine AS base
RUN corepack enable
RUN corepack prepare pnpm@8.15.5 --activate
WORKDIR /app

COPY . .
RUN pnpm install

RUN pnpm run build --filter=api

FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache dumb-init

COPY --from=base /app/apps/api/dist ./dist
COPY --from=base /app/apps/api/package.json ./
COPY --from=base /app/node_modules ./node_modules

EXPOSE 3000
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main"]
