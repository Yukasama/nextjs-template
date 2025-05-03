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

## Use Docker

```bash
# Build Docker image
docker build -t nextjs-template:prod .

# Start with Docker compose
cd resources/deploy
docker compose up
```

## SonarQube Scan

```bash
# Start SonarQube image
cd resources/sonarqube
docker compose up

# Do sonar scan (from root directory)
pnpm sonar
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
