FROM node:20-alpine
RUN corepack enable
RUN corepack prepare pnpm@8.15.5 --activate
RUN apk add --no-cache dumb-init
WORKDIR /app

COPY . .
RUN pnpm install
RUN pnpm run build --filter=api

EXPOSE 3000
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "apps/api/dist/main"]
