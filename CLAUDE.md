# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 e-commerce application for premium streetwear (SDFM 2520) built with React 19, TypeScript, and the App Router. The application features user authentication, product catalog, and modern UI components.

## Key Architecture

- **Authentication**: Better Auth with Drizzle ORM adapter, supports email/password with verification and password reset
- **Database**: PostgreSQL with Drizzle ORM, migrations stored in `migrations/development/`
- **UI**: Tailwind CSS with Radix UI components, dark/light theme support via next-themes
- **Forms**: React Hook Form with Zod validation and TanStack Form
- **Animations**: Framer Motion with custom animation components
- **Logging**: Structured logging with Pino, request tracing with nanoid-generated IDs

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Linting (uses both Oxlint and ESLint)
npm run lint
npm run lint:oxlint    # Fast Rust-based linter
npm run lint:eslint    # Next.js ESLint
npm run lint:fix       # Auto-fix linting issues

# Database migrations
npx drizzle-kit push   # Push schema changes
npx drizzle-kit generate  # Generate migrations
```

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes (auth, email)
│   ├── dashboard/      # Protected dashboard page
│   └── [auth-pages]/   # Auth flows (signin, signup, reset)
├── components/         
│   ├── animations/     # Custom Framer Motion components
│   └── ui/            # Shadcn/ui components
├── db/table/          # Drizzle schema definitions
├── lib/               # Core utilities and configurations
│   ├── auth.ts        # Better Auth configuration
│   ├── logger.ts      # Structured logging setup
│   ├── env.ts         # Environment validation with Zod
│   └── email.ts       # Resend email integration
└── data/              # Static data (products, etc.)
```

## Environment Requirements

Required environment variables (validated by `src/lib/env.ts`):
- `DATABASE_URL` - PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Auth encryption secret
- `BETTER_AUTH_URL` - Base URL for auth redirects
- `RESEND_API_KEY` - Optional, for email functionality
- `NODE_ENV` - development | production | test | stage

## Authentication System

Better Auth handles:
- Email/password authentication
- Session management via database
- Email verification (optional)
- Password reset flows
- Drizzle adapter with custom schema tables

Auth tables: `TbUser`, `TbSession`, `TbAccount`, `TbVerification`

## Database Schema

Drizzle ORM with PostgreSQL:
- Schema files in `src/db/table/`
- Migrations in `migrations/${NODE_ENV}/`
- Environment-specific migration directories

## Logging Standards

Use structured logging from `src/lib/logger.ts`:
- `log.info()`, `log.error()`, `log.warn()`, `log.debug()`
- Domain-specific loggers: `logAuth`, `logApi`, `logDb`, `logSecurity`
- Automatic request ID injection in API routes
- Context-aware logging with user/session IDs

## Code Standards

- TypeScript strict mode enabled
- Oxlint for fast linting + ESLint for Next.js rules
- Tailwind CSS with custom design system
- Zod for runtime validation
- File naming: kebab-case for components, camelCase for utilities
- Use Context7 to check up-to-date docs when needed for implmenting new libraries or framworks, or adding features using them.