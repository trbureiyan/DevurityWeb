# AGENTS

## Supply Chain and dependencies

Pin exact dependency versions — no `^` or `~`. Commit `pnpm-lock.yaml` with every change that touches `package.json`. Use `pnpm install --frozen-lockfile` for deterministic installs in CI and scripts.

## Tech stack and architecture

DevurityWeb runs on Next.js with the App Router. Prefer Server Components by default; add `"use client"` only when hooks, browser APIs, or client state are strictly required. The database layer uses Prisma ORM with PostgreSQL. Authentication is handled via custom JWT tokens (`lib/jwt.ts`) with CSRF protection on all state-changing requests (`hooks/useCsrf.ts`). TypeScript strict mode is non-negotiable. Keep modules focused and single-responsibility.

## Testing

Use Node's built-in test runner (`node:test`) and `node:assert/strict`. Always destructure specific assert functions:

```ts
import { ok, strictEqual } from "node:assert/strict";
```

Do not import the default `assert` object.

## Workflow

Follow conventional commits: `feature:`, `fix:`, `refactor:`. Run `pnpm run build` before pushing. Verify all relevant checks pass before considering work complete.

## Writing, comments, and documentation

Text produced in this repository — code comments, documentation, PR descriptions, commit messages — follows the standard in `github-instructions.md`. The short version: no emojis, no filler, no corporate vocabulary. Prose by default; lists only for ordered sequences or technical enumerations where prose would be harder to scan.

Code comments explain the *why* and the *non-obvious what* — never the *how*, which the code already shows. A comment that paraphrases a well-named function gets deleted. Use ASCII markers in inline comments for urgency or type: `[!]` for dangerous mutations, `[?]` for uncertain approaches, `[x]` for deprecated paths, `-->` for redirecting the reader to the relevant code.

GitHub Markdown alerts (`> [!NOTE]`, `> [!WARNING]`, `> [!CAUTION]`, etc.) are for genuinely differentiated information — use them when severity or urgency warrants it, not as decoration. If the content is ordinary, it goes in prose.

JSDoc documents the function contract: what it does, what it expects, what it returns, what it can throw. Not the implementation. No `@author` or `@version` tags.