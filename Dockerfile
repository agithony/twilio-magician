FROM node:20-slim AS build

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY client/package.json ./client/
COPY server/package.json ./server/
COPY tsconfig.base.json ./

RUN pnpm install --frozen-lockfile || pnpm install

COPY client/ ./client/
COPY server/ ./server/

RUN pnpm --filter client build
RUN pnpm --filter server build

# --- Runtime ---
FROM node:20-slim

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY server/package.json ./server/

RUN cd server && pnpm install --prod || (cd /app && pnpm install --prod)

COPY --from=build /app/server/dist ./server/dist
COPY --from=build /app/client/dist ./client/dist

ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "server/dist/index.js"]
