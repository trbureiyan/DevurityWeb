# AGENTS

DevurityWeb — Plataforma oficial del Semillero de Investigación Devurity (Universidad Surcolombiana).
Next.js 15 (App Router), React 19, TypeScript strict, Tailwind v4, Prisma ORM 6 (PostgreSQL), JWT + CSRF + RBAC, Vercel (`gru1`).

---

## Repository Map

```text
DevurityWeb/
├── app/                          # Next.js App Router — pages, layouts, API routes
│   ├── (protected)/              # Auth-gated routes (admin, profile, content_manager, leader_proyect)
│   ├── api/                      # Route handlers (REST endpoints)
│   │   ├── admin/                # Admin-only endpoints (users, attendances, dashboard)
│   │   ├── auth/                 # Auth flows (login, register, refresh, forgot/reset password, csrf-token, me, profile, skills, users, programs)
│   │   ├── altcha/               # ALTCHA anti-bot challenge endpoint
│   │   ├── contact/              # Contact form (ALTCHA verified)
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
│   ├── bcrypt.ts                 # bcryptjs wrapper (NOT bcrypt — Edge Runtime incompatibility)
│   ├── postgresDriver.ts         # Prisma client singleton
│   ├── email.ts                  # Nodemailer setup
│   ├── error.ts                  # Error response helpers
│   ├── logger.ts                 # Logging utility
│   ├── altcha.ts                 # ALTCHA challenge/verify (stateless HMAC PoW)
│   ├── rateLimit.ts              # Rate limiting
│   ├── regex.ts                  # Validation patterns (email, etc.)
│   ├── constants/                # Static data (gallery, landing, metadata, validation)
│   ├── data/                     # Server data fetchers (admin, landing, projects, updates)
│   ├── types/                    # TypeScript types (landing, update.types, user.types, altcha-widget.d)
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
├── scripts/                      # Utility scripts (deploy-db.ts, migrate.mjs, fixtures/)
├── tests/                        # Tests con node:test — *.node-test.ts (auth-refresh, csrf, jwt, profile-skills, projects, qr-attendance, regex, updates, url)
├── public/                       # Static assets
└── .github/                      # CI workflows, templates, PR instructions
```

**Layer architecture:** Route handler → `lib/data/` (business logic) → `repositories/` (Prisma queries) → PostgreSQL. Components consume hooks or context for client state. Server Components access `lib/data/` directly.

---

## Commands

| Command | Purpose | Notes |
|---|---|---|
| `pnpm dev` | Dev server (Turbopack) | Local development |
| `pnpm build` | Production build | Run before every push |
| `pnpm start` | Serve production build | After build |
| `pnpm lint` | ESLint | Pre-commit hook runs this on staged files |
| `pnpm test` | node:test runner | `tests/*.node-test.ts` |
| `pnpm test:watch` | node:test watch mode | TDD workflow |
| `pnpm test:coverage` | node:test con coverage | Cubre `lib/` y `repositories/` |
| `npx tsc --noEmit` | Type-check | Pre-push hook runs this |
| `pnpm db:fixture` | TUI interactiva de datos | `scripts/fixtures/index.ts` |

### Prisma commands

> [!CAUTION]
> Prisma commands modify the database schema or data. **Never run Prisma commands de forma autónoma without explicit user confirmation.** Always state what you intend to do and wait for approval. Migrations are irreversible without manual intervention. `db push` bypasses the migration history.

| Command | Purpose | Risk |
|---|---|---|
| `npx prisma generate` | Regenerate client from schema | Safe — codegen only |
| `npx prisma studio` | Database GUI | Safe — read/write in local dev |
| `pnpm db:status` | Check deploy status | Safe — read-only query |

---

## Task Intake and Research

When assigned a task:

1. Read `AGENTS.md` first.
2. Read the prompt carefully. Identify the goal, constraints, and scope before touching files.
3. Inspect relevant files using exact, targeted reads. Do not perform wide directory scans when specific paths are known.
4. Verify current implementation before writing code. Never assume code structure — inspect it.
5. Identify edge cases (Edge Runtime compatibility, BigInt serialization, CSRF, RBAC) before drafting a plan.

### Rules of Engagement

- Start with the smallest plausible file set. Targeted search over repo-wide scans.
- Ignore `node_modules/`, `.next/`, `lib/generated/`, `backup/`.
- If a task touches auth, check `middleware.ts`, `lib/jwt.ts`, `lib/auth/jwt-edge.ts`, and `hooks/useCsrf.ts` together — they form a unit.
- If a task touches admin, check RBAC in `middleware.ts` plus the admin layout and route guards.

**Audit before acting:** Verify each finding against current code. Fix only still-valid issues. Skip the rest with a brief reason. Keep changes minimal. Validate after.

### Documentation Maintenance

- `AGENTS.md` es documentación versionada del proyecto, no una nota local descartable.
- Cada cambio grande de arquitectura, autenticación, seguridad, base de datos, despliegue, dependencias, rutas o flujo de trabajo debe revisar este archivo y los documentos relacionados (`ARCHITECTURE.md`, `SKILL.md`, `README.md`).
- Si el cambio modifica una instrucción, un riesgo, un comando o una descripción de la arquitectura, actualiza la documentación en el mismo cambio.
- Si después de revisarla no hace falta editarla, deja constancia de esa decisión en el resumen del cambio. No se deben mantener instrucciones contradictorias con el código vigente.

---

## Current Risk Areas

- **JWT and auth flow**: `lib/jwt.ts` (main), `lib/auth/jwt-edge.ts` (edge), `lib/auth/middleware.ts` (helpers). Token expiration, refresh flow, and secret management. Changes here affect every authenticated route. The middleware performs RBAC checks via the JWT `role` claim — four active roles: `admin`, `content_manager`, `lead_project`, `user`. `/api/auth/refresh` re-reads the active user's role from PostgreSQL before issuing a new token, and `useAuth` refreshes during initial auth synchronization and when the window regains focus.
- **CSRF protection**: `lib/csrf.ts` + `hooks/useCsrf.ts` + `middleware.ts`. Double-submit cookie pattern. Every POST/PUT/DELETE must carry the token. Public exemptions are hardcoded in `middleware.ts` — adding new public routes requires updating that list.
- **Prisma schema**: 11 models with BigInt PKs, cascade deletes, and junction tables (`user_skills`, `user_platforms`, `user_projects`). Migrations must be tested against a clean DB. Never edit generated files in `lib/generated/prisma/`.
- **BigInt serialization**: Prisma uses `BigInt` IDs. JSON cannot serialize BigInt — always convert with `.toString()` before returning from route handlers or repositories. This is a recurring source of runtime crashes.
- **App Router boundaries**: `"use client"` placement determines what ships to the browser. Server-only code (DB queries, JWT verification, `lib/email.ts`, `lib/bcrypt.ts`) must never leak into client components.
- **Middleware scope**: `middleware.ts` runs on every request (matcher excludes static assets). It handles auth redirect, RBAC, CSRF, path traversal protection, and forbidden fragment blocking. Changes here affect the entire app.
- **ALTCHA anti-bot**: `lib/altcha.ts` + `app/api/altcha/challenge/route.ts` + `components/landing/ContactSection.tsx`. Stateless HMAC proof-of-work usando `altcha-lib`. El widget se carga desde CDN (jsdelivr) — los orígenes `cdn.jsdelivr.net` y `blob:` están permitidos en CSP (`next.config.ts:37-38`). El challenge expira a los 10 min. La env var `ALTCHA_HMAC_SECRET` es requerida en producción; en desarrollo hay fallback hardcodeado. Si se agrega ALTCHA a más formularios, actualizar CSP y verificar que el endpoint `GET /api/altcha/challenge` tenga `Cache-Control: no-store`.
- **Rate limiting**: Login endpoint uses in-memory `Map` for attempt tracking. This resets on server restart and does not work across Vercel serverless instances.
- **Environment variables**: `.env` es el archivo principal local. Validar variables requeridas al inicio. Ver `.env.example` para la lista canónica. `ALTCHA_HMAC_SECRET` es requerida en producción; en desarrollo hay fallback hardcodeado en `lib/altcha.ts:9`.
- **CSP en `next.config.ts`**: La política `Content-Security-Policy` en `next.config.ts:33-48` define los orígenes permitidos (scripts, estilos, fuentes, conexiones, etc.). Cualquier dependencia externa nueva se registra actualizando las directivas correspondientes. ALTCHA es la razón de que `cdn.jsdelivr.net` y `blob:` estén en las directivas `script-src`, `style-src` y `worker-src`.
- **Caché de datos públicos**: `lib/cache-tags.ts` centraliza los tags y TTL de `unstable_cache`. En producción, el feed completo de updates usa 6 horas y las tres noticias de la landing usan 1 hora; ambas consultas comparten el tag `updates`. En desarrollo, `activeTTL()` desactiva la expiración temporal para que los cambios de fixtures y seeds se reflejen sin esperar.

---

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

---

## Commits and PRs

### Commits

Short, direct, caveman-style. Read the message, correlate with the diff. No storytelling.

Format: `<type>: <what changed — max 72 chars>`

Types: `feature`, `fix`, `hotfix`, `refactor`, `test`, `chore`, `docs`, `style`, `perf`

Good examples:
```text
fix: login rate limit reset on success
feature: profile social links editor
refactor: extract user query to repository
test: add auth middleware coverage
chore: pin dependency versions
```

Bad examples:
```text
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

---

## Database fixtures

For development, use `pnpm run db:fixture` to populate test data. This launches an interactive CLI that seeds `users`, `attendances`, `projects` y `user_projects` como base. Source lives in `scripts/fixtures/`. Each module exposes `seed`, `reset`, and `status`. Reset operations require typing `CONFIRMAR` in the terminal and abort automatically outside `NODE_ENV=development`.

Never seed fixture data directly in production. The guard in `scripts/fixtures/factory.ts` (function `assertDevelopmentOnly`) enforces this at runtime.

---

## Workflow

### PRs

Use the existing PR template. Two versions available:
- **Full version**: for features, architectural changes, anything >200 lines
- **Compact version**: for fixes, typos, small changes

Every PR must pass: `pnpm lint` + `pnpm test` + `npx tsc --noEmit` + `pnpm build`.

---

## Manual Actions — Do Not Touch

The agent must not execute these actions. Describe what needs to happen and ask the user to do it manually:

| Action | Why |
|---|---|
| `npx prisma migrate dev` | Creates migration files, modifies DB schema |
| `npx prisma migrate deploy` | Applies migrations to production DB |
| `npx prisma db push` | Pushes schema without migration history |
| `pnpm db:seed` | Mutates database data |
| `pnpm db:repair` | Repairs DB sequences |
| Editing `.env`, `.env.example` | Contains secrets and config |
| Editing `middleware.ts` CSRF public paths | Security-sensitive exemptions |
| Editing `lib/jwt.ts` or `lib/auth/jwt-edge.ts` | Auth core — token logic |
| Editing `lib/csrf.ts` | CSRF protection core |
| Git push, merge, or deploy actions | Irreversible remote operations |
| Editing `lib/generated/prisma/` | Auto-generated — will be overwritten |
| Installing new dependencies | Requires `pnpm install` + lockfile commit |

When one of these is needed, output a clear instruction block:

```text
MANUAL ACTION REQUIRED:
1. Run: npx prisma migrate dev --name add_user_bio
2. Verify the generated SQL in prisma/migrations/
3. Confirm before I continue with the next step
```

---

## TDD and Validation

### Test-first workflow

1. Write the test that defines the expected behavior
2. Run it — it should fail (red)
3. Write the minimum code to make it pass (green)
4. Refactor if needed — tests stay green
5. Run full suite before committing

### Test structure

Tests live in `tests/` with this layout:

```text
tests/
├── auth-refresh.node-test.ts  # Refresh del JWT con rol vigente en DB
├── csrf.node-test.ts          # CSRF token helpers
├── jwt.node-test.ts           # JWT generation and verification
├── profile-skills.node-test.ts # Profile and skills flows
├── projects.node-test.ts      # Project API validation and RBAC
├── qr-attendance.node-test.ts # QR signature and attendance flow
├── regex.node-test.ts         # Regex validation patterns
├── updates.node-test.ts       # Updates API validation and RBAC
├── url.node-test.ts           # URL validation
├── unit/                    # Future: pure logic, no I/O
└── integration/             # Future: end-to-end flows
```

Naming: `<module>.node-test.ts` — e.g., `jwt.node-test.ts`, `csrf.node-test.ts`.

### Test conventions

- Framework: `node:test` (built-in Node.js runner)
- Assertions: `assert` module nativo
- Mocking: `mock` de `node:test` para Prisma y deps externas
- Coverage target: `lib/` y `repositories/`
- Every test must be independent — no shared state between tests
- Use `before`/`after` for setup and teardown

### Validation before claiming done

Before stating work is complete:

1. `pnpm test` — all tests pass
2. `pnpm lint` — no lint errors
3. `npx tsc --noEmit` — no type errors
4. `pnpm build` — production build succeeds

If any of these fail, fix before reporting.

---

## Verify Before Fixing

Before implementing any plan or fix:

1. **Verify the finding** — read the actual code, not assumptions about it
2. **Confirm it is still valid** — the code may have changed since the issue was observed
3. **If invalid** — skip with a one-line reason: `// [SKIP] Already handled in lib/csrf.ts:42`
4. **If valid** — fix with minimal changes. Do not refactor surrounding code unless the fix requires it
5. **Validate** — run the relevant test or verification command
6. **Report** — state what was fixed, what was skipped, and why

This applies to every task: bug fixes, features, refactors, audits. No exceptions.

---

## Supply Chain and Dependencies

Pin exact dependency versions — no `^` or `~`. Commit `pnpm-lock.yaml` with every change that touches `package.json`. Use `pnpm install --frozen-lockfile` for deterministic installs in CI and scripts.

Release age gating is enabled in `pnpm-workspace.yaml`:

| Política | Valor | Efecto |
|----------|-------|--------|
| `allowBuilds` | Lista blanca explícita | Solo paquetes aprobados ejecutan scripts de instalación |
| `minimumReleaseAge` | `1440` (1 día) | Bloquea versiones publicadas hace menos de 24 horas |
| `minimumReleaseAgeIgnoreMissingTime` | `true` | Omite el chequeo si el registro no tiene metadatos de tiempo |

Install scripts are disabled by default. If a new dependency requires a build step, it must be explicitly approved via `allowBuilds` in `pnpm-workspace.yaml`.

| Dependency | Purpose | Source |
|---|---|---|
| `altcha-lib` | Server-side challenge creation + solution verification (stateless HMAC PoW) | npm |
| ALTCHA widget (v2.x) | Client-side Web Component (loaded from jsdelivr CDN, not bundled) | CDN — `cdn.jsdelivr.net/npm/altcha@2.3.0/` |

---

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
