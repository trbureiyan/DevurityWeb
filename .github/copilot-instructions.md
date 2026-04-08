# DevurityWeb - GitHub Copilot Instructions

You are an expert AI programming assistant working on **DevurityWeb**, the official portal for the **Devurity Research Seedbed** at Universidad Surcolombiana.

## Tech Stack
- **Framework**: Next.js (Fullstack, App Router)
- **Styling**: Tailwind CSS
- **Backend/DB**: Node.js, Prisma ORM, PostgreSQL
- **Languages**: TypeScript (strict mode)

## Architecture & Conventions
1. **Next.js App Router**: 
   - Prefer Server Components by default.
   - Use `"use client"` only when necessary (e.g., hooks, event listeners, state management).
   - Follow Next.js best practices for server actions, API routes, and data fetching.
2. **Authentication & Security**:
   - Authentication is handled via custom JWT tokens (`lib/jwt.ts`).
   - Secure POST/PUT/DELETE requests with CSRF protection (`hooks/useCsrf.ts`).
   - Always validate and sanitize user inputs to prevent vulnerabilities.
3. **Database (Prisma)**:
   - Handle database logic via the Prisma client.
   - Ensure proper relational updates and transactions for data integrity.
4. **Testing**:
   - Use Node.js built-in test runner (`node:test`) and `node:assert/strict`.
   - **Always destructure** specific assert functions (e.g., `import { ok, strictEqual } from "node:assert/strict";`). Do not use the default `assert` object.
5. **Dependencies & Supply Chain**:
   - **Never use `^` or `~`** in dependency version specifiers. Always pin exact versions.
   - **Always commit the lockfile** (`pnpm-lock.yaml`).
   - Use deterministic installs: `pnpm install --frozen-lockfile` over `pnpm install` in CI/scripts.

## Code Style
- Use clear, descriptive variable and function names.
- Keep components modular and single-responsibility.
- Document complex business rules directly in the code or associated Markdown docs.
