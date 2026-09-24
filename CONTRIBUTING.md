# Contributing to DevurityWeb

DevurityWeb is the official portal for the Devurity research seedbed at Universidad Surcolombiana, licensed under GPL 3.0. Contributions are welcome from team members and the broader community.

## Prerequisites

- Node.js 24
- pnpm (enforced via `preinstall`; npm and yarn are rejected)
- PostgreSQL 16
- A `.env.local` file with the variables listed in `.env.example`

## Local setup

```bash
git clone https://github.com/trbureiyan/DevurityWeb.git
cd DevurityWeb
pnpm install --frozen-lockfile
cp .env.example .env.local   # fill in your local values
pnpm exec prisma migrate dev
pnpm run dev
```

`postinstall` runs `prisma generate` automatically. If you need to reset and reseed local fixtures, use `pnpm run db:fixture`.

## Branching model

This repository follows Git Flow:

| Branch prefix | Target | Purpose |
|---|---|---|
| `feature/` | `dev` | New functionality |
| `bugfix/` | `dev` | Non-critical bug fixes |
| `hotfix/` | `main` | Critical production patches |
| `release/` | `main` | Release preparation |

Branch names should be lowercase and hyphen-separated: `feature/project-traceability-view`.

## Commit messages

Format: `type: short description in imperative mood`

Valid types: `feat`, `fix`, `hotfix`, `refactor`, `test`, `chore`, `docs`, `style`, `perf`.

Examples:

```
feat: add project traceability fields to admin view
fix: restore HMAC base64url padding in Edge runtime
chore: pin next to 15.5.25
```

The description starts with a lowercase letter and has no trailing period. Limit the subject line to 72 characters. Use the body for the _why_ when it is not obvious from the diff.

## Opening a pull request

Use the PR template (`.github/pull_request_template.md`). It offers two versions:

- Full version — for new features, architectural changes, or large refactors. Requires acceptance criteria, test coverage table, and a pre-merge checklist.
- Abbreviated version — for small fixes, typos, or minor improvements. Requires a brief summary, checklist, and validation confirmation.

Delete the version you are not using before opening the PR.

PRs against `dev` require at least one approval before merge. PRs against `main` (hotfixes and releases) require at least one approval and a passing CI run.

Before opening a PR, verify locally:

```bash
pnpm exec tsc --noEmit
pnpm test
pnpm run lint
pnpm run build
```

This matches the CI check order. A PR that fails any of these steps will not be merged.

## Opening an issue

Use the issue template (`.github/ISSUE_TEMPLATE/custom.md`). Issues are structured as stories with user narratives and Gherkin acceptance criteria, or as technical tasks with an explicit checklist. Include the relevant role permissions table if the issue touches any protected route or action.

If your issue is a bug, describe the reproduction steps and the observed versus expected behavior.

## Code conventions

These conventions derive from the project's architecture. Follow them to keep changes consistent with the existing codebase.

**TypeScript:** strict mode is always on. Avoid `any`; use explicit types at module boundaries.

**React:** default to Server Components. Add `"use client"` only when the component requires hooks, browser APIs, or client-managed state.

**Auth and CSRF:** authentication logic lives in `lib/jwt.ts`. Apply CSRF protection via `hooks/useCsrf.ts` on all state-changing requests.

**Database:** all database access goes through Prisma. Use relational updates and transactions where data integrity requires it. Always use `select` to request only the fields the query consumes.

**Dependencies:** pin exact versions — no `^` or `~`. Commit `pnpm-lock.yaml` on every change that modifies `package.json`.

**Reuse before creating:** check `lib/` and `hooks/` before introducing a new pattern. Utilities and hooks that already exist should be extended, not duplicated.

**Comments:** explain the _why_ and the non-obvious _what_. A comment that restates what a well-named function does is noise. Use ASCII urgency markers: `[!]` dangerous side effect, `[?]` uncertain approach, `[x]` deprecated path.

## Testing

Tests live in `tests/` and run with Node's built-in test runner:

```bash
pnpm test            # run all tests once
pnpm run test:watch  # re-run on change
```

Write tests for all new business logic and for every bug fix. The test pattern is Setup → Act → Assert → Teardown.

## Security disclosure

This project contains a custom JWT authentication system with double-token CSRF protection. If you find a vulnerability, report it privately by email before opening a public issue. Include a description of the vulnerability, reproduction steps, and the affected component. You will receive a response within 72 hours.
