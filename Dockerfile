FROM node:16-alpine AS base

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY . .

RUN npm run build
#RUN npx prisma generate

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY /public ./public

COPY /.next/standalone ./
COPY /.next/static ./.next/static

USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]
