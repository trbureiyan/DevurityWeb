# DevurityWeb — Copilot Instructions

DevurityWeb is the official portal for the Devurity Cybersecurity and Engineering Research Seedbed at Universidad Surcolombiana. It is a fullstack Next.js application with a Prisma/PostgreSQL backend, custom JWT authentication, and CSRF protection.

## Stack

Next.js 15 (App Router) with React 19, TypeScript in strict mode, Tailwind CSS v4, Prisma ORM with PostgreSQL, and JWT + CSRF + role-based auth. Deploy targets are Vercel and AWS.

## Architecture and conventions

Prefer Server Components by default. Add `"use client"` only when the component strictly requires hooks, browser APIs, or client-managed state. Authentication flows through `lib/jwt.ts`; CSRF protection is applied via `hooks/useCsrf.ts` to all state-changing requests. Database logic goes through the Prisma client — use relational updates and transactions where data integrity requires it. Reuse existing utilities under `lib/` and `hooks/` before introducing new patterns.

Supply chain: never use `^` or `~` in version specifiers; pin exact versions. Commit `pnpm-lock.yaml` on every change that modifies `package.json`. Use `pnpm install --frozen-lockfile` in CI and scripts.

Testing uses Node's built-in `node:test` runner and destructured imports from `node:assert/strict`. Do not import the default `assert` object.

## Database fixtures

For development, `pnpm run db:fixture` runs an interactive CLI to seed or reset dynamic tables (`users`, `attendances`, `user_projects`) as base. Resets require interactive typing of `CONFIRMAR` and are guarded to run in development only.


## Code style

Variable and function names should be descriptive without being verbose. Components stay modular and single-responsibility. Document complex business rules where the behavior isn't derivable from the code alone — in inline comments or associated Markdown docs in `/docs`. Document public API contracts (functions, route handlers) with JSDoc covering what the function does, its parameters, return value, and any exceptions it throws. Do not document implementation internals in the docstring.

## Writing standard

All text in this repository — comments, documentation, PR descriptions, commit messages — follows the standard in `github-instructions.md`. No emojis. No filler phrases or corporate vocabulary. Prose by default; lists only for ordered sequences or technical enumerations where prose would genuinely be harder to scan.

Code comments explain the *why* and the *non-obvious what*. A comment that restates what a well-named function does is noise and gets deleted. Use ASCII markers for urgency: `[!]` for dangerous side effects, `[?]` for uncertain approaches, `[x]` for deprecated paths.

GitHub Markdown alerts (`> [!NOTE]`, `> [!WARNING]`, `> [!CAUTION]`) carry weight only when used for genuinely differentiated information. Overuse turns them into decoration and strips the signal.
