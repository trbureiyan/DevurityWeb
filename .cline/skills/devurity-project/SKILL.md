---
name: devurity-project
description: Provide project-specific guidance for DevurityWeb. Use when working on this repository's architecture, Next.js App Router patterns, Prisma usage, authentication flows, testing conventions, or repository standards.
---

# DevurityWeb Project Guidance

Apply these repository conventions when the task touches this codebase.

## Stack and architecture

- Framework: Next.js App Router.
- Prefer Server Components by default.
- Use `"use client"` only when hooks, browser APIs, or client state are required.
- Database: Prisma ORM with PostgreSQL.
- Security model: custom JWT auth plus CSRF protection.
- Keep modules focused and single-responsibility.

## Security and validation

- Validate and sanitize user input.
- Preserve CSRF protections for state-changing requests.
- Reuse existing auth and security utilities under `lib/` and `hooks/` before introducing new patterns.

## Testing conventions

- Prefer Node's built-in test runner: `node:test`.
- Prefer destructured imports from `node:assert/strict`.
- Add or update tests when changing behavior that is practical to verify.

## Dependency and workflow conventions

- Do not use `^` or `~` in dependency versions.
- Keep lockfiles committed.
- Before considering work complete, verify with the repository's relevant checks.

## Project context

- Keep documentation and implementation aligned.
- Prefer readable TypeScript over clever abstractions.
- Respect the repository layout in `app/`, `components/`, `lib/`, `repositories/`, and `tests/`.