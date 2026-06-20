---
name: devurity-project
description: Provide project-specific guidance for DevurityWeb. Use when working on this repository's architecture, Next.js App Router patterns, Prisma usage, authentication flows, testing conventions, or repository standards.
---

# DevurityWeb Project Guidance

Apply these conventions when the task touches this codebase.

## Stack and architecture

Next.js App Router — Server Components by default; add `"use client"` only when hooks, browser APIs, or client state are strictly required. Prisma ORM with PostgreSQL handles the database layer. Security model: custom JWT auth via `lib/jwt.ts` and CSRF protection via `hooks/useCsrf.ts` on all state-changing requests. Keep modules focused and single-responsibility. Reuse existing utilities under `lib/` and `hooks/` before introducing new patterns.

## Testing conventions

Use `node:test` and destructured imports from `node:assert/strict`:

```ts
import { ok, strictEqual } from "node:assert/strict";
```

Add or update tests when changing behavior that is practical to verify.

## Dependency and workflow conventions

No `^` or `~` in dependency version specifiers — pin exact versions. Commit `pnpm-lock.yaml` with every change to `package.json`. Verify with `pnpm run build` before considering work complete. Follow conventional commits: `feature:`, `fix:`, `refactor:`.

## Writing and comments

Comments explain the *why* and the *non-obvious what*. A comment that restates a well-named function is noise — delete it. Use ASCII markers inline: `[!]` for dangerous mutations, `[?]` for uncertain approaches, `[x]` for deprecated paths, `-->` to redirect the reader to relevant code.

JSDoc covers the function contract — what it does, what it expects, what it returns, what it can throw. Not the implementation. No `@author` or `@version`. No prose that starts with "This method is responsible for..."

All repository text — comments, documentation, PR descriptions, commit messages — follows `github-instructions.md`. No emojis, no filler, no corporate vocabulary. Prose by default; lists only for ordered sequences or technical enumerations where prose would be harder to scan.

## Project context

Repository layout: `app/`, `components/`, `lib/`, `repositories/`, `tests/`, `docs/`. Keep documentation and implementation aligned. Prefer readable TypeScript over clever abstractions.