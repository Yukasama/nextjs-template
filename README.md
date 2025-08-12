<div align="center">

# Next.js Template

**A production-ready Next.js template with enterprise-grade tools and modern best practices**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker)](https://www.docker.com/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-45ba4b?style=flat&logo=playwright)](https://playwright.dev/)
[![Security](https://img.shields.io/badge/Security-A+-green?style=flat&logo=shield)](https://securityheaders.com/)

**[🌐 Live Demo](https://nextjs-template.candlezone.eu)** • **[📖 Documentation](#guide)**

</div>

## Features

- 🔒 **A+ Security Headers** - CSP with nonce-based security, comprehensive headers protection
- 🐳 **Docker-Ready** - BuildKit secrets, multi-stage optimization, standalone output
- 🔧 **Quality Assurance** - Custom ESLint configuration with 15+ plugins, automated workflows
- 🛡️ **Typesafe Environment** - T3-env with validation, build-time type checking
- 🎨 **Tailwind CSS v4** - Next-generation CSS framework with advanced theming
- 🧪 **End-to-End Tests** - Playwright testing with accessibility validation
- ⚡ **Next.js 15** - Latest React framework with App Router
- 🌙 **Dark Theme** - Seamless light/dark mode with next-themes
- 📝 **Structured Logging** - Pino logger with development file output
- ✨ **Code Formatting** - Prettier with automatic formatting
- 🚀 **CI/CD Pipeline** - GitHub Actions for testing, linting, and deployment

---

## Quick Start

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (recommended package manager)

### Installation

```bash
# Install dependencies
pnpm install

# Install Playwright browsers for testing
pnpm exec playwright install

# Copy environment variables
cp .env.example .env

# Start the development server
pnpm dev
```

Your application will be available at **http://localhost:3000**

### Available Scripts

| Command         | Description                             |
| --------------- | --------------------------------------- |
| `pnpm dev`      | Start development server with Turbopack |
| `pnpm build`    | Build for production                    |
| `pnpm start`    | Start production server                 |
| `pnpm test`     | Run Playwright tests                    |
| `pnpm lint`     | Lint code with ESLint                   |
| `pnpm prettier` | Format code with Prettier               |

---

## Guide

### Docker Deployment

<details>
<summary><strong>Build and run with Docker</strong></summary>

```bash
# Build Docker image with build arguments
docker build -t nextjs-template:prod \
  --build-arg NEXT_PUBLIC_HOST_URL=http://localhost:3000 \
  --secret id=private_api_key,src=.env .

# Start with Docker Compose
docker compose up
```

> **Note:** Environment variables prefixed with `NEXT_PUBLIC_` must be passed as build arguments, while secrets are mounted securely during build.

</details>

### SonarQube Code Analysis

<details>
<summary><strong>Run quality analysis</strong></summary>

```bash
# Start SonarQube server
cd resources/sonarqube
docker compose up

# Run code analysis (from root directory)
pnpm sonar
```

</details>

### GitHub Actions CI/CD

<details>
<summary><strong>Required repository secrets</strong></summary>

For the CI/CD pipeline to work properly, add these secrets to your GitHub repository:

```bash
NEXT_PUBLIC_HOST_URL=https://your-domain.com
PRIVATE_EXAMPLE_API_KEY=your-secret-api-key
SNYK_TOKEN=your-snyk-token-from-account
```

The pipeline automatically handles:

- Code linting with ESLint
- End-to-end testing with Playwright
- Security scanning with Snyk
- Docker image publishing

</details>

### Bundle Analysis

<details>
<summary><strong>Analyze bundle size</strong></summary>

```bash
# Analyze production bundle
ANALYZE=true pnpm build
```

This will generate a detailed report of your bundle sizes and help identify optimization opportunities.

</details>

---

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/) for type safety
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with custom design system
- **Testing:** [Playwright](https://playwright.dev/) for E2E testing
- **Logging:** [Pino](https://getpino.io/) for structured logging
- **Environment:** [T3 Env](https://env.t3.gg/) for typesafe environment variables
- **Linting:** [ESLint 9](https://eslint.org/) with 15+ plugins
- **Code Quality:** [SonarQube](https://www.sonarqube.org/) integration
- **Security:** CSP with nonce + comprehensive headers
- **Deployment:** Docker-ready with multi-stage builds

## License

This project is licensed under the MIT License. Feel free to use it for your projects!

<div align="center">

**[⭐ Star this repo](https://github.com/Yukasama/nextjs-template)** if you find it helpful!

Made by [Yukasama](https://github.com/Yukasama)

</div>
