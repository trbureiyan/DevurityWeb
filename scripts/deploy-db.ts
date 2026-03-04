/**
 * scripts/deploy-db.ts
 *
 * Modular production database deployment runner.
 *
 * Usage:
 *   tsx scripts/deploy-db.ts <command>
 *
 * Commands:
 *   migrate   — run prisma migrate deploy
 *   repair    — run sequence repair SQL
 *   seed      — run prisma db seed (calls npm run db:seed)
 *   deploy    — migrate + repair + seed  (default full deployment)
 *   status    — prisma migrate status
 *
 * Environment:
 *   DATABASE_URL  — required (throws if missing)
 *   SKIP_SEED=1   — skip seeding step in "deploy" command
 *   DRY_RUN=1     — print commands without executing them
 *
 * Examples:
 *   tsx scripts/deploy-db.ts deploy
 *   SKIP_SEED=1 tsx scripts/deploy-db.ts deploy
 *   tsx scripts/deploy-db.ts migrate
 *   tsx scripts/deploy-db.ts status
 */

import { execSync } from "child_process";
import { existsSync } from "fs";
import { resolve } from "path";

// ── Helpers ──────────────────────────────────────────────────────────────────

const ROOT = resolve(import.meta.dirname, "..");
const DRY = process.env.DRY_RUN === "1";
const SKIP_SEED = process.env.SKIP_SEED === "1";

function run(label: string, cmd: string): void {
  console.log(`\n▶  ${label}`);
  console.log(`   $ ${cmd}`);
  if (DRY) {
    console.log("   [DRY_RUN] skipped.");
    return;
  }
  try {
    execSync(cmd, { cwd: ROOT, stdio: "inherit" });
  } catch (err) {
    console.error(`\n❌ Step failed: ${label}`);
    process.exit(1);
  }
}

function assertEnv(): void {
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is not set. Aborting.");
    process.exit(1);
  }
}

// ── Commands ─────────────────────────────────────────────────────────────────

async function cmdMigrate(): Promise<void> {
  run("Run Prisma migrations", "npx prisma migrate deploy");
}

async function cmdRepair(): Promise<void> {
  const repairFile = resolve(ROOT, "prisma/repair-sequences.sql");
  if (!existsSync(repairFile)) {
    console.warn("⚠️  prisma/repair-sequences.sql not found — skipping repair.");
    return;
  }
  run(
    "Repair DB sequences",
    `npx prisma db execute --file prisma/repair-sequences.sql --schema prisma/schema.prisma`,
  );
}

async function cmdSeed(): Promise<void> {
  run("Seed database", "npm run db:seed");
}

async function cmdStatus(): Promise<void> {
  run("Migration status", "npx prisma migrate status");
}

async function cmdDeploy(): Promise<void> {
  console.log("\n🚀 Starting full database deployment...");
  if (DRY) console.log("   (DRY_RUN mode — no commands will execute)\n");

  await cmdMigrate();
  await cmdRepair();

  if (SKIP_SEED) {
    console.log("\n⏭  SKIP_SEED=1 — skipping seeding step.");
  } else {
    await cmdSeed();
  }

  console.log("\n✅ Deployment complete.");
}

// ── Entry point ───────────────────────────────────────────────────────────────

const COMMANDS: Record<string, () => Promise<void>> = {
  migrate: cmdMigrate,
  repair: cmdRepair,
  seed: cmdSeed,
  deploy: cmdDeploy,
  status: cmdStatus,
};

const cmd = process.argv[2] ?? "deploy";

if (!COMMANDS[cmd]) {
  console.error(`❌ Unknown command: "${cmd}"`);
  console.error(`   Valid commands: ${Object.keys(COMMANDS).join(" | ")}`);
  process.exit(1);
}

assertEnv();

COMMANDS[cmd]().catch((err) => {
  console.error("❌ Unexpected error:", err);
  process.exit(1);
});
