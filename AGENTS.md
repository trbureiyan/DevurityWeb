# AGENTS

## Repository Map

```
DevurityWeb/
├── app/                          # Next.js App Router — pages, layouts, API routes
│   ├── (protected)/              # Auth-gated routes (admin, profile, content_manager, leader_proyect)
│   ├── api/                      # Route handlers (REST endpoints)
│   │   ├── admin/                # Admin-only endpoints (users, attendances, dashboard)
│   │   ├── auth/                 # Auth flows (login, register, refresh, forgot/reset password, csrf-token, me, profile, skills, users, programs)
│   │   ├── contact/              # Contact form
│   │   ├── qr-dinamico/          # QR generation
│   │   ├── skills/               # Skills CRUD
│   │   └── team/                 # Team listing
│   ├── auth/                     # Auth pages (login, register)
│   ├── about/, gallery/, help/, projects/, updates/  # Public pages
│   └── layout.tsx, page.tsx, globals.css             # Root layout, landing, global styles
├── components/                   # React components
│   ├── landing/                  # Landing sections (Hero, About, CTA, Events, Gallery, Impact, Projects, Reglamento, Contact)
│   ├── layouts/                  # Navbar, Footer, MobileMenu, NavbarConditional
│   ├── admin/                    # Admin dashboard + sidebar
│   ├── ui/                       # Shared primitives (Tooltip, avatar, LoginButton, ProgramSelector, SkillSelector, SocialLinksEditor, UsernameEditor)
│   ├── icons/                    # HeroIcons wrapper
│   ├── gallery/, help/, projects/, updates/, about/  # Feature-specific client components
│   └── qr-dynamic.tsx            # QR code component
├── contexts/
│   └── AuthContext.tsx            # Client-side auth state provider
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts                # Auth state + actions
│   ├── useCsrf.ts                # CSRF token fetch + injection
│   ├── useProfileData.ts         # Profile data fetching
│   ├── useAvailableSkills.ts     # Skills list
│   ├── usePrograms.ts            # Academic programs
│   ├── useProjects.ts            # Projects listing
│   ├── useSkillObjects.ts        # Skill objects
│   ├── useTokenValidation.ts     # Token validation
│   └── useUpdates.ts             # Updates/news
├── lib/                          # Shared server-side utilities
│   ├── jwt.ts                    # JWT generation/verification (main)
│   ├── auth/
│   │   ├── jwt-edge.ts           # Edge-compatible JWT (for middleware)
│   │   ├── middleware.ts          # Auth middleware helper
│   │   ├── config.ts             # Auth config
│   │   └── utils.ts              # Auth utilities
│   ├── csrf.ts                   # CSRF adapter (double-submit cookie)
│   ├── bcrypt.ts                 # Password hashing
│   ├── postgresDriver.ts         # Prisma client singleton
│   ├── email.ts                  # Nodemailer setup
│   ├── error.ts                  # Error response helpers
│   ├── logger.ts                 # Logging utility
│   ├── rateLimit.ts              # Rate limiting
│   ├── regex.ts                  # Validation patterns (email, etc.)
│   ├── constants/                # Static data (gallery, landing, metadata, validation)
│   ├── data/                     # Server data fetchers (admin, landing, projects, updates)
│   ├── types/                    # TypeScript types (landing, update.types, user.types)
│   └── generated/prisma/         # [GENERATED] Prisma client — never edit
├── repositories/                 # Data access layer (Prisma queries)
│   ├── admin/users.repositories.ts
│   ├── programs/programs.repositories.ts
│   ├── skills/skills.repositories.ts
│   ├── updates/updates.repositories.ts
│   └── users/users.repositories.ts
├── prisma/
│   ├── schema.prisma             # Database schema (11 models)
│   ├── migrations/               # Migration history
│   ├── seed.ts                   # Seed orchestrator
│   └── seeders/                  # Seed data by domain (roles, platforms, programs, skills, projects, updates)
├── middleware.ts                  # Global middleware: auth guard, RBAC, CSRF, path traversal protection
├── scripts/                      # Utility scripts (deploy-db.ts, migrate.mjs)
├── tests/                        # [EMPTY] Test directory — vitest configured but no tests written yet
├── public/                       # Static assets (favicons, placeholders)
├── styles/                       # [EMPTY] — Tailwind lives in globals.css
├── docs/                         # [EMPTY]
├── backup/                       # [EMPTY]
└── .github/
    ├── workflows/ci.yml          # CI: lint + typecheck + build (no tests, no DB)
    ├── pull_request_template.md  # PR template (full + compact)
    ├── copilot-instructions.md   # AI agent instructions
    └── ISSUE_TEMPLATE/custom.md  # Issue template with Gherkin criteria
```

**Layer architecture:** Route handler → `lib/data/` (business logic) → `repositories/` (Prisma queries) → PostgreSQL. Components consume hooks or context for client state. Server Components access `lib/data/` directly.

## Commands

| Command | Purpose | Notes |
|---|---|---|
| `pnpm dev` | Dev server (Turbopack) | Local development |
| `pnpm build` | Production build | Run before every push |
| `pnpm start` | Serve production build | After build |
| `pnpm lint` | ESLint | Pre-commit hook runs this on staged files |
| `pnpm test` | Vitest (run mode) | `tests/**/*.test.ts` |
| `pnpm test:watch` | Vitest (watch mode) | TDD workflow |
| `pnpm test:coverage` | Vitest with coverage | Covers `lib/` and `repositories/` |
| `npx tsc --noEmit` | Type-check | Pre-push hook runs this |

### Prisma commands

> [!CAUTION]
> Prisma commands modify the database schema or data. **Never run Prisma commands agenticically without explicit user confirmation.** Always state what you intend to do and wait for approval. Migrations are irreversible without manual intervention. `db push` bypasses the migration history.

| Command | Purpose | Risk |
|---|---|---|
| `npx prisma generate` | Regenerate client from schema | Safe — codegen only |
| `npx prisma migrate dev` | Create + apply migration in dev | **Requires human approval** |
| `npx prisma migrate deploy` | Apply pending migrations (production) | **Requires human approval** |
| `npx prisma db push` | Push schema changes without migration | **Dangerous** — skips migration history |
| `npx prisma studio` | Database GUI | Safe — read/write browser |
| `pnpm db:seed` | Run seeders | **Requires human approval** — mutates data |
| `pnpm db:repair` | Repair sequences | **Requires human approval** |
| `pnpm db:status` | Check deploy status | Safe — read only |

**Prisma workflow before any schema change:**
1. Edit `prisma/schema.prisma`
2. Ask user to confirm: `npx prisma migrate dev --name <description>`
3. Verify migration SQL in `prisma/migrations/`
4. Run `npx prisma generate` to update the client
5. Never edit `lib/generated/prisma/` — it is regenerated

## Task Intake and Research

Before writing code, investigate in this order:

1. **Route handler** in `app/api/` — understand the endpoint contract
2. **Page/layout** in `app/` — understand the UI contract
3. **Data layer** in `lib/data/` — business logic
4. **Repository** in `repositories/` — Prisma queries
5. **Schema** in `prisma/schema.prisma` — data model
6. **Shared utilities** in `lib/` and `hooks/`
7. **Components** in `components/` — UI patterns
8. **Middleware** in `middleware.ts` — auth/CSRF/RBAC behavior

**Investigation rules:**
- Start with the smallest plausible file set. Targeted search over repo-wide scans.
- Ignore `node_modules/`, `.next/`, `lib/generated/`, `backup/`.
- If a task touches auth, check `middleware.ts`, `lib/jwt.ts`, `lib/auth/jwt-edge.ts`, and `hooks/useCsrf.ts` together — they form a unit.
- If a task touches admin, check RBAC in `middleware.ts` plus the admin layout and route guards.

**Audit before acting:** Verify each finding against current code. Fix only still-valid issues. Skip the rest with a brief reason. Keep changes minimal. Validate after.

## Current Risk Areas

- **JWT and auth flow**: `lib/jwt.ts` (main), `lib/auth/jwt-edge.ts` (edge), `lib/auth/middleware.ts` (helpers). Token expiration, refresh flow, and secret management. Changes here affect every authenticated route. The middleware also performs RBAC checks via the JWT `role` claim.
- **CSRF protection**: `lib/csrf.ts` + `hooks/useCsrf.ts` + `middleware.ts`. Double-submit cookie pattern. Every POST/PUT/DELETE must carry the token. Public exemptions are hardcoded in `middleware.ts` — adding new public routes requires updating that list.
- **Prisma schema**: 11 models with BigInt PKs, cascade deletes, and junction tables (`user_skills`, `user_platforms`, `user_projects`). Migrations must be tested against a clean DB. Never edit generated files in `lib/generated/prisma/`.
- **BigInt serialization**: Prisma uses `BigInt` IDs. JSON cannot serialize BigInt — always convert with `.toString()` before returning from route handlers or repositories. This is a recurring source of runtime crashes.
- **App Router boundaries**: `"use client"` placement determines what ships to the browser. Server-only code (DB queries, JWT verification, `lib/email.ts`, `lib/bcrypt.ts`) must never leak into client components.
- **Middleware scope**: `middleware.ts` runs on every request (matcher excludes static assets). It handles auth redirect, RBAC, CSRF, path traversal protection, and forbidden fragment blocking. Changes here affect the entire app.
- **Rate limiting**: Login endpoint uses in-memory `Map` for attempt tracking. This resets on server restart and does not work across Vercel serverless instances.
- **Environment variables**: `.env.local` is never committed. Validate required vars at startup. See `.env.example` for the canonical list.

## Design Patterns and Component Reuse

### Visual system

The project uses a dark theme with these canonical tokens (defined in `globals.css`):

| Token | Value | Usage |
|---|---|---|
| `--background` | `#171212` | Page background |
| `--foreground` | `#ffffff` | Primary text |
| `--buttons` / `--variable-collection-botones` | `rgba(202, 43, 38)` | CTA buttons, accents |
| `--link` / `--variable-collection-link` | `rgba(246, 102, 97)` | Links, hover states, scrollbar hover |
| `--selected` / `--variable-collection-selected` | `rgba(85, 85, 85)` | Selected states, scrollbar thumb |
| `--placeholder` / `--variable-collection-placeholder` | `rgba(46, 46, 46)` | Input placeholders, empty states |

Fonts: `font-orbitron` for headings/brand, `font-ubuntu` for body/paragraphs.

### Component conventions

- **Before creating a new component**, check `components/ui/` for existing primitives. Reuse `Tooltip`, `avatar`, `LoginButton`, `ProgramSelector`, `SkillSelector`, `SocialLinksEditor`, `UsernameEditor` before building new ones.
- **Landing sections** live in `components/landing/`. Each is a Server Component by default. Client interactivity requires `"use client"` only when hooks or browser APIs are needed.
- **Client components** use the `"use client"` directive at the top of the file. They consume `AuthContext` via `useAuth()` or the CSRF hook.
- **Animations** use the custom CSS classes from `globals.css` (`animate-fade-in`, `animate-fade-up`, `animate-bounce`, `animate-shimmer`, `animate-shake`). Framer Motion is available for complex animations. Always respect `prefers-reduced-motion` — the CSS layer already handles this for custom classes; for framer-motion, use `useReducedMotion()`.
- **Icons** come from `@heroicons/react` via `components/icons/HeroIcons.tsx`.

### Naming

- Components: PascalCase files and exports (`HeroSection.tsx`)
- Hooks: camelCase with `use` prefix (`useAuth.ts`)
- Utilities: camelCase (`postgresDriver.ts`, `rateLimit.ts`)
- Types: PascalCase interfaces, camelCase files (`user.types.ts`)
- Routes: lowercase with hyphens (`forgot-password/`, `qr-dinamico/`)

## Commits and PRs

### Commits

Short, direct, caveman-style. Read the message, correlate with the diff. No storytelling.

Format: `<type>: <what changed — max 72 chars>`

Types: `feature`, `fix`, `hotfix`, `refactor`, `test`, `chore`, `docs`, `style`, `perf`

Good examples:
```
fix: login rate limit reset on success
feature: profile social links editor
refactor: extract user query to repository
test: add auth middleware coverage
chore: pin dependency versions
```

Bad examples:
```
feat: add comprehensive user profile management system with social links   ← too long
fix: resolved an issue where the login endpoint was not properly handling  ← storytelling
chore: various improvements and cleanup                                    ← vague
```

### Architectural decisions

When a change introduces a non-obvious design choice, add a one-line decision comment in the code near the decision point:

```ts
// [DECISION] In-memory rate limit — acceptable for single-instance dev server.
// Production requires Redis-backed limiter when scaling beyond one instance.
```

Format: `// [DECISION] <choice> — <why>. <tradeoff or future action>.`

Do not write ADR documents. The decision lives with the code.
## Database fixtures

For development, use `pnpm run db:fixture` to populate test data. This launches an interactive CLI that seeds `users`, `attendances`, and `user_projects` as base. Source lives in `scripts/fixtures/`. Each module exposes `seed`, `reset`, and `status`. Reset operations require typing `CONFIRMAR` in the terminal and abort automatically outside `NODE_ENV=development`.

Never seed fixture data directly in production. The guard in `scripts/fixtures/factory.ts` (function `assertDevelopmentOnly`) enforces this at runtime.

## Workflow

### PRs

Use the existing PR template. Two versions available:
- **Full version**: for features, architectural changes, anything >200 lines
- **Compact version**: for fixes, typos, small changes

Every PR must pass: `pnpm lint` + `npx tsc --noEmit` + `pnpm build`.

## Manual Actions — Do Not Touch

The agent must not execute these actions. Describe what needs to happen and ask the user to do it manually:

| Action | Why |
|---|---|
| `npx prisma migrate dev` | Creates migration files, modifies DB schema |
| `npx prisma migrate deploy` | Applies migrations to production DB |
| `npx prisma db push` | Pushes schema without migration history |
| `pnpm db:seed` | Mutates database data |
| `pnpm db:repair` | Repairs DB sequences |
| Editing `.env`, `.env.local`, `.env.example` | Contains secrets and config |
| Editing `middleware.ts` CSRF public paths | Security-sensitive exemptions |
| Editing `lib/jwt.ts` or `lib/auth/jwt-edge.ts` | Auth core — token logic |
| Editing `lib/csrf.ts` | CSRF protection core |
| Git push, merge, or deploy actions | Irreversible remote operations |
| Editing `lib/generated/prisma/` | Auto-generated — will be overwritten |
| Installing new dependencies | Requires `pnpm install` + lockfile commit |

When one of these is needed, output a clear instruction block:

```
MANUAL ACTION REQUIRED:
1. Run: npx prisma migrate dev --name add_user_bio
2. Verify the generated SQL in prisma/migrations/
3. Confirm before I continue with the next step
```

## TDD and Validation

### Test-first workflow

1. Write the test that defines the expected behavior
2. Run it — it should fail (red)
3. Write the minimum code to make it pass (green)
4. Refactor if needed — tests stay green
5. Run full suite before committing

### Test structure

Tests live in `tests/` with this layout:

```
tests/
├── unit/                    # Pure logic, no I/O
│   ├── lib/                 # lib/ utilities
│   └── repositories/        # Repository functions (mocked Prisma)
└── integration/             # End-to-end flows (future)
```

Naming: `<module>.test.ts` — e.g., `jwt.test.ts`, `csrf.test.ts`, `users.repositories.test.ts`

### Test conventions

- Framework: Vitest (configured in `vitest.config.ts`)
- Assertions: `expect()` with Vitest matchers
- Mocking: `vi.mock()` for Prisma and external deps
- Coverage target: `lib/` and `repositories/` (configured in vitest)
- Every test must be independent — no shared state between tests
- Use `beforeEach` for setup, `afterEach` for cleanup

### Validation before claiming done

Before stating work is complete:

1. `pnpm test` — all tests pass
2. `pnpm lint` — no lint errors
3. `npx tsc --noEmit` — no type errors
4. `pnpm build` — production build succeeds

If any of these fail, fix before reporting.

## Verify Before Fixing

Before implementing any plan or fix:

1. **Verify the finding** — read the actual code, not assumptions about it
2. **Confirm it is still valid** — the code may have changed since the issue was observed
3. **If invalid** — skip with a one-line reason: `// [SKIP] Already handled in lib/csrf.ts:42`
4. **If valid** — fix with minimal changes. Do not refactor surrounding code unless the fix requires it
5. **Validate** — run the relevant test or verification command
6. **Report** — state what was fixed, what was skipped, and why

This applies to every task: bug fixes, features, refactors, audits. No exceptions.

## Supply Chain and Dependencies

Pin exact dependency versions — no `^` or `~`. Commit `pnpm-lock.yaml` with every change that touches `package.json`. Use `pnpm install --frozen-lockfile` for deterministic installs in CI and scripts.

## Tech Stack

Next.js 15 (App Router) with React 19, TypeScript strict mode, Tailwind CSS v4, Prisma ORM with PostgreSQL. JWT + CSRF + RBAC auth. Deployed on Vercel (region `gru1`).

Prefer Server Components by default. Add `"use client"` only when hooks, browser APIs, or client state are strictly required.

## Testing

Vitest with `vite-tsconfig-paths`. Tests in `tests/**/*.test.ts`. Coverage on `lib/` and `repositories/`.

## Writing and Documentation

Text in this repository follows: no emojis, no filler, no corporate vocabulary. Prose by default. Code comments explain the *why* and the *non-obvious what* — never the *how*. Use ASCII markers: `[!]` dangerous, `[?]` uncertain, `[x]` deprecated, `-->` redirect.

JSDoc documents the function contract: what it does, parameters, return value, exceptions. No `@author` or `@version` tags.

### Estilo de comentarios en código

Los comentarios deben escribirse en español y sonar naturales — como si alguien los dejara al vuelo mientras entiende qué está pasando. Breves, conceptuales, sin explicar lo obvio. El tono es casual, casi espontáneo: una nota mental más que documentación formal.

```ts
// si no hay token, no tiene sentido seguir
if (!token) return null;

// normalizamos antes de comparar para evitar falsos negativos por mayúsculas
const normalized = input.trim().toLowerCase();

// el rol viene del JWT, no de la sesión — importante para el RBAC
const { role } = payload;
```

No describir lo que el código ya dice. Comentar solo cuando el contexto, la intención o la trampa no son evidentes a primera vista.
