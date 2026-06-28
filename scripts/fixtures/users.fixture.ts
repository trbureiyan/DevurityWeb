import { PrismaClient } from "../../lib/generated/prisma";
import bcrypt from "bcryptjs";
import {
  randomName,
  randomEmail,
  randomUsername,
  randomMotivation,
  randomSemester,
  getRandomRoleId,
  getRoleId,
} from "./factory";
import type { SeedResult } from "./ui";

// Pre-computed hash — avoids bcrypt cost per record during bulk seeding
const DEFAULT_PASSWORD_HASH = bcrypt.hashSync("Devurity2025!", 10);
const DEFAULT_COUNT = 10;

export interface UsersFixtureOptions {
  count?: number;
  role?: string;
  isActive?: boolean;
  dryRun?: boolean;
  onProgress?: (current: number, total: number) => void;
}

/**
 * Insert N fixture users into the database.
 * Silently skips records that collide on unique constraints.
 *
 * @returns Counts of created and skipped records.
 */
export async function seedUsers(
  prisma: PrismaClient,
  options: UsersFixtureOptions = {}
): Promise<SeedResult> {
  const { count = DEFAULT_COUNT, role, isActive = true, dryRun = false, onProgress } = options;

  const roleId = role
    ? await getRoleId(prisma, role)
    : await getRandomRoleId(prisma);

  if (dryRun) {
    return { created: 0, skipped: 0 };
  }

  let created = 0;
  let skipped = 0;

  for (let i = 0; i < count; i++) {
    const { name, last_name } = randomName();
    const suffix = Date.now() + i;

    try {
      await prisma.users.create({
        data: {
          name,
          last_name,
          email: randomEmail(name, last_name, suffix),
          password: DEFAULT_PASSWORD_HASH,
          username: randomUsername(name, suffix),
          motivation: randomMotivation(),
          semester: randomSemester(),
          is_active: isActive,
          role_id: roleId,
        },
      });
      created++;
    } catch (err) {
      // Only swallow unique-constraint violations (P2002) on email or username.
      // Any other error — FK, connection, schema mismatch — is a real failure.
      const code = (err as { code?: string }).code;
      if (code === "P2002") {
        skipped++;
      } else {
        throw err;
      }
    }

    onProgress?.(i + 1, count);
  }

  return { created, skipped };
}

/**
 * Delete all users (and dependents) then re-seed.
 * Requires caller to have obtained confirmation before invoking.
 *
 * @returns Counts from the subsequent seed call.
 */
export async function resetUsers(
  prisma: PrismaClient,
  options: UsersFixtureOptions = {}
): Promise<SeedResult> {
  // [!] Wrap dependent deletes in a transaction so the reset is atomic.
  // A failure at any step rolls back rather than leaving the DB half-cleared.
  await prisma.$transaction([
    prisma.attendances.deleteMany({}),
    prisma.user_skills.deleteMany({}),
    prisma.user_platforms.deleteMany({}),
    prisma.user_projects.deleteMany({}),
    prisma.users.deleteMany({}),
  ]);

  return seedUsers(prisma, options);
}

export interface UsersStatus {
  total: number;
  active: number;
  byRole: Array<{ role: string; count: number }>;
}

/** Read current table counts without modifying any data. */
export async function statusUsers(prisma: PrismaClient): Promise<UsersStatus> {
  const [total, active, byRole] = await Promise.all([
    prisma.users.count(),
    prisma.users.count({ where: { is_active: true } }),
    prisma.roles.findMany({ include: { _count: { select: { users: true } } } }),
  ]);

  return {
    total,
    active,
    byRole: byRole.map((r) => ({ role: r.name, count: r._count.users })),
  };
}
