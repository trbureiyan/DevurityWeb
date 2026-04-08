# AGENTS

## Supply Chain Security & Dependencies
- **Never use ^ or ~** in dependency versions. Pin exact versions.
- **Always commit the lockfile** (pnpm-lock.yaml).
- **Use deterministic installs**: prefer pnpm install --frozen-lockfile.

## Tech Stack & Architecture (DevurityWeb)
- **Framework**: Next.js (App Router, prefer Server Components).
- **Database**: Prisma ORM with PostgreSQL.
- **Security**: Validate inputs, use custom JWT tokens, and CSRF protection.
- **Code Style**: TypeScript Strict Mode. Clear, single-responsibility modules.

## Testing
- Use Node.js built-in test runner (
ode:test) and 
ode:assert/strict).
- **Always destructure** specific assert functions (e.g., import { ok, strictEqual } from "node:assert/strict";). 

## Workflow
- Follow conventional commits (feature:, fix:, 
efactor:).
- Verify changes with 
pm run build before pushing.

## Communication, Tone & Formatting
- **NO EMOJIS:** Never use standard Unicode emojis (e.g., 🚀, 👍, 🤖, etc.) in your explanations, code comments, pull request descriptions, or commit messages.
- **Use GitHub Markdown Alerts:** When you need to emphasize something, use GitHub's standard markdown blockquotes instead of emojis:
  - `> [!NOTE]`
  - `> [!TIP]`
  - `> [!IMPORTANT]`
  - `> [!WARNING]`
  - `> [!CAUTION]`
- **Text-based Emojis:** If a specific placeholder or reaction is strictly necessary, use GitHub-flavored shortcodes (e.g., `:shipit:`, `:tada:`) or simple ASCII art/kaomoji.
- **Professionalism:** Keep communication highly technical, concise, and straight to the point.