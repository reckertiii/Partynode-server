FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json tsconfig.base.json ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/game-engine/package.json ./packages/game-engine/
COPY packages/self-hosted-node/package.json ./packages/self-hosted-node/

RUN npm install

COPY packages/shared ./packages/shared
COPY packages/game-engine ./packages/game-engine
COPY packages/self-hosted-node ./packages/self-hosted-node

RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NODE_PORT=8080
ENV NODE_DATA_DIR=/app/data

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/shared/package.json ./packages/shared/
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/game-engine/package.json ./packages/game-engine/
COPY --from=builder /app/packages/game-engine/dist ./packages/game-engine/dist
COPY --from=builder /app/packages/self-hosted-node/package.json ./packages/self-hosted-node/
COPY --from=builder /app/packages/self-hosted-node/dist ./packages/self-hosted-node/dist

VOLUME ["/app/data"]
EXPOSE 8080
CMD ["node", "packages/self-hosted-node/dist/index.js"]
