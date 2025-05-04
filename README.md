# Next.js Template

## Preparation

```bash
# Install dependencies
pnpm i

# Install playwright browsers
pnpm exec playwright install

# Start the server
pnpm dev
```

## Features

- Next.js 15
- Tailwind v4
- Dark Theme (next-themes)
- End-To-End Tests (Playwright)
- Logging (Pino)
- Typesafe Environment Variables (t3-env)
- Formatting (Prettier)
- Linting (ESLint 9 + SonarQube)
- A+ Security Headers (CSP with Nonce)
- Docker Ready
- CI/CD with GitHub Actions for Linting, Testing, Security

## Guide

### Use Docker

```bash
# Build Docker image
# You have to pass NEXT_PUBLIC_ vars as build arguments
# Secrets are passed with a secret mount as you can see in the Dockerfile
docker build -t nextjs-template:prod --build-arg NEXT_PUBLIC_HOST_URL=http://localhost:3000 .

# Start with Docker compose
cd resources/deploy
docker compose up
```

### SonarQube Scan

```bash
# Start SonarQube image
cd resources/sonarqube
docker compose up

# Do sonar scan (from root directory)
pnpm sonar
```

### GitHub Actions

Note: For the CI to work, you have to add the following secrets to your repository:

```bash
NEXT_PUBLIC_HOST_URL=
PRIVATE_EXAMPLE_API_KEY=
```

