FROM node:18-alpine AS base

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

FROM base AS deps
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate

RUN npm run build

RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS runner
WORKDIR /app

RUN apk add --no-cache libc6-compat openssl

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

RUN chown -R nestjs:nodejs /app
USER nestjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]