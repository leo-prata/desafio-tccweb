#!/bin/sh

# Este script será executado toda vez que o container iniciar.

echo "==> Running Prisma migrations..."
npx prisma migrate deploy

echo "==> Starting NestJS application..."

# O comando 'exec "$@"' é uma prática padrão.
# Ele substitui o processo do shell pelo comando que passamos no Dockerfile (o CMD).
# Isso garante que o Node.js receba corretamente os sinais do sistema (como o de parada).
exec "$@"