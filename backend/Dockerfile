FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS prisma_generator
COPY . .
COPY --from=base /app/node_modules ./node_modules

RUN npx prisma generate

FROM base AS builder
COPY . .
COPY --from=base /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./

COPY --from=prisma_generator /app/node_modules/.prisma/client ./node_modules/.prisma/client

COPY --from=prisma_generator /app/prisma ./prisma

COPY --from=builder /app/dist ./dist

RUN chown -R nestjs:nodejs /app
USER nestjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]