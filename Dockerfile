ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-slim AS base

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"
RUN corepack enable && corepack prepare pnpm@latest --activate

# --------------------------------------------------------
# Stage 1: Install dependencies
# --------------------------------------------------------
FROM base AS deps
WORKDIR /app

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --ignore-scripts

# --------------------------------------------------------
# Stage 2: Build the application
# --------------------------------------------------------
FROM base AS builder
WORKDIR /app

# Has to be provided at build time with --build-arg
ARG NEXT_PUBLIC_HOST_URL

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json /app/pnpm-lock.yaml ./

COPY next.config.ts tsconfig.json tailwind.config.ts postcss.config.mjs components.json ./
COPY public ./public
COPY src ./src

# Mount private API key as a secret
# Has to be provided at build time with --secret id=private_api_key,required
RUN --mount=type=secret,id=private_api_key,env=PRIVATE_EXAMPLE_API_KEY \
    pnpm build

# --------------------------------------------------------
# Stage 3: Run the application
# --------------------------------------------------------
FROM node:${NODE_VERSION}-slim AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    NODE_NO_WARNINGS=1 \
    NODE_OPTIONS=--max-old-space-size=2048 \
    NEXT_SHARP_PATH=/app/node_modules/sharp

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Create .next/cache directory and fix ownership for Next.js image caching
RUN groupadd -r nextjs && useradd --no-log-init -r -g nextjs nextjs && \
    mkdir -p /app/.next/cache && \
    chown -R nextjs:nextjs /app

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]