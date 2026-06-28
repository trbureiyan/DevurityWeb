import * as fs from "node:fs/promises";
import * as path from "node:path";
import { PrismaClient, users, attendances, user_projects, user_skills, user_platforms } from "../../lib/generated/prisma";
import type { SeedResult } from "./ui";

const BACKUP_DIR = path.join(process.cwd(), "scripts", "fixtures", "backups");

type JsonRecord = Record<string, unknown>;

// Helper to serialize BigInts to strings in JSON
function replacer(key: string, value: unknown): unknown {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
}

// Helper to parse strings back to BigInts or Dates based on schema needs during restore
function reviveUser(u: JsonRecord): users {
  return {
    ...(u as unknown as users),
    id: BigInt(u.id as string | number),
    role_id: BigInt(u.role_id as string | number),
    program_id: u.program_id ? BigInt(u.program_id as string | number) : null,
    joined_at: u.joined_at ? new Date(u.joined_at as string) : null,
    username_last_changed: u.username_last_changed ? new Date(u.username_last_changed as string) : null,
  };
}

function reviveAttendance(a: JsonRecord): attendances {
  return {
    ...(a as unknown as attendances),
    id: BigInt(a.id as string | number),
    user_id: a.user_id ? BigInt(a.user_id as string | number) : null,
    attendance_date: new Date(a.attendance_date as string),
  };
}

function reviveUserProject(up: JsonRecord): user_projects {
  return {
    ...(up as unknown as user_projects),
    id: BigInt(up.id as string | number),
    project_id: up.project_id ? BigInt(up.project_id as string | number) : null,
    user_id: up.user_id ? BigInt(up.user_id as string | number) : null,
  };
}

function reviveUserSkill(us: JsonRecord): user_skills {
  return {
    ...(us as unknown as user_skills),
    id: BigInt(us.id as string | number),
    skill_id: us.skill_id ? BigInt(us.skill_id as string | number) : null,
    user_id: us.user_id ? BigInt(us.user_id as string | number) : null,
  };
}

function reviveUserPlatform(up: JsonRecord): user_platforms {
  return {
    ...(up as unknown as user_platforms),
    id: BigInt(up.id as string | number),
    platform_id: up.platform_id ? BigInt(up.platform_id as string | number) : null,
    user_id: up.user_id ? BigInt(up.user_id as string | number) : null,
  };
}

export interface BackupData {
  timestamp: string;
  users: JsonRecord[];
  attendances: JsonRecord[];
  user_projects: JsonRecord[];
  user_skills: JsonRecord[];
  user_platforms: JsonRecord[];
}

/** Ensure the backup directory exists. */
async function ensureBackupDir(): Promise<void> {
  await fs.mkdir(BACKUP_DIR, { recursive: true });
}

/** Create a JSON snapshot of the dynamic tables. */
export async function createBackup(prisma: PrismaClient, label?: string): Promise<string> {
  await ensureBackupDir();

  const [users, attendances, user_projects, user_skills, user_platforms] = await Promise.all([
    prisma.users.findMany(),
    prisma.attendances.findMany(),
    prisma.user_projects.findMany(),
    prisma.user_skills.findMany(),
    prisma.user_platforms.findMany(),
  ]);

  const data: BackupData = {
    timestamp: new Date().toISOString(),
    users,
    attendances,
    user_projects,
    user_skills,
    user_platforms,
  };

  const cleanLabel = label
    ? label.replace(/[^a-zA-Z0-9-_]/g, "_").toLowerCase()
    : "auto";

  const dateStr = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `snapshot_${cleanLabel}_${dateStr}.json`;
  const filepath = path.join(BACKUP_DIR, filename);

  await fs.writeFile(filepath, JSON.stringify(data, replacer, 2), "utf-8");
  return filename;
}

/** List all available backup JSON files sorted by date descending. */
export async function listBackups(): Promise<string[]> {
  await ensureBackupDir();
  const files = await fs.readdir(BACKUP_DIR);
  return files
    .filter((f) => f.endsWith(".json"))
    .sort((a, b) => {
      // Extract the trailing ISO timestamp from snapshot_<label>_<timestamp>.json
      // e.g. "snapshot_auto_2025-07-24T12-30-00-000Z.json" → "2025-07-24T12-30-00-000Z"
      const tsA = a.replace(/^snapshot_.*_(\d{4}-.+)\.json$/, "$1");
      const tsB = b.replace(/^snapshot_.*_(\d{4}-.+)\.json$/, "$1");
      return tsB.localeCompare(tsA);
    });
}

/** Restore database dynamic tables from a JSON backup. */
export async function restoreBackup(
  prisma: PrismaClient,
  filename: string
): Promise<Record<string, SeedResult>> {
  const filepath = path.join(BACKUP_DIR, filename);
  const content = await fs.readFile(filepath, "utf-8");
  const data: BackupData = JSON.parse(content);

  const users = data.users.map(reviveUser);
  const attendances = data.attendances.map(reviveAttendance);
  const user_projects = data.user_projects.map(reviveUserProject);
  const user_skills = (data.user_skills ?? []).map(reviveUserSkill);
  const user_platforms = (data.user_platforms ?? []).map(reviveUserPlatform);

  // Restore everything in a single safe transaction
  await prisma.$transaction(async (tx) => {
    // 1. Clear dynamic tables in order of dependency (dependents first)
    await tx.attendances.deleteMany({});
    await tx.user_projects.deleteMany({});
    await tx.user_skills.deleteMany({});
    await tx.user_platforms.deleteMany({});
    await tx.users.deleteMany({});

    // 2. Insert records back (parent first)
    // We run individual inserts to respect explicit IDs and handle dependencies correctly
    for (const u of users) {
      await tx.users.create({ data: u });
    }
    for (const us of user_skills) {
      await tx.user_skills.create({ data: us });
    }
    for (const up of user_platforms) {
      await tx.user_platforms.create({ data: up });
    }
    for (const a of attendances) {
      await tx.attendances.create({ data: a });
    }
    for (const up of user_projects) {
      await tx.user_projects.create({ data: up });
    }

    // 3. Repair PostgreSQL sequences so future auto-increment inserts don't collide
    const tablesToRepair = ["users", "user_skills", "user_platforms", "attendances", "user_projects"];
    for (const table of tablesToRepair) {
      await tx.$executeRawUnsafe(
        `SELECT setval(pg_get_serial_sequence('${table}', 'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM "${table}";`
      );
    }
  });

  return {
    users: { created: users.length, skipped: 0 },
    user_skills: { created: user_skills.length, skipped: 0 },
    user_platforms: { created: user_platforms.length, skipped: 0 },
    attendances: { created: attendances.length, skipped: 0 },
    user_projects: { created: user_projects.length, skipped: 0 },
  };
}
