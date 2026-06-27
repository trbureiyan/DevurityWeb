import { PrismaClient } from "../../lib/generated/prisma";
import { getAllProjectIds, getAllUserIds, pick } from "./factory";
import type { SeedResult } from "./ui";

const DEFAULT_COUNT = 15;

const PROJECT_ROLES = [
  "Desarrollador Backend",
  "Desarrollador Frontend",
  "Investigador",
  "Líder técnico",
  "QA Tester",
  "Diseñador UI/UX",
  "DevOps",
  "Analista de seguridad",
];

export interface UserProjectsFixtureOptions {
  count?: number;
  dryRun?: boolean;
  onProgress?: (current: number, total: number) => void;
}

/**
 * Insert N user-project assignments from existing users and non-archived projects.
 * Duplicate (user_id, project_id) pairs are skipped rather than errored.
 *
 * @returns Counts of created and skipped records.
 */
export async function seedUserProjects(
  prisma: PrismaClient,
  options: UserProjectsFixtureOptions = {}
): Promise<SeedResult> {
  const { count = DEFAULT_COUNT, dryRun = false, onProgress } = options;

  const [userIds, projectIds] = await Promise.all([
    getAllUserIds(prisma),
    getAllProjectIds(prisma),
  ]);

  if (userIds.length === 0 || projectIds.length === 0) {
    return { created: 0, skipped: 0 };
  }

  if (dryRun) {
    return { created: 0, skipped: 0 };
  }

  let created = 0;
  let skipped = 0;

  for (let i = 0; i < count; i++) {
    const userId = pick(userIds);
    const projectId = pick(projectIds);

    // Avoid semantically duplicate (user_id, project_id) pairs
    const existing = await prisma.user_projects.findFirst({
      where: { user_id: userId, project_id: projectId },
      select: { id: true },
    });

    if (existing) {
      skipped++;
      onProgress?.(i + 1, count);
      continue;
    }

    await prisma.user_projects.create({
      data: {
        user_id: userId,
        project_id: projectId,
        is_active: true,
        project_role: pick(PROJECT_ROLES),
      },
    });
    created++;

    onProgress?.(i + 1, count);
  }

  return { created, skipped };
}

/**
 * Delete all user-project assignments then re-seed.
 * Requires caller to have obtained confirmation before invoking.
 *
 * @returns Counts from the subsequent seed call.
 */
export async function resetUserProjects(
  prisma: PrismaClient,
  options: UserProjectsFixtureOptions = {}
): Promise<SeedResult> {
  await prisma.user_projects.deleteMany({});
  return seedUserProjects(prisma, options);
}

export interface UserProjectsStatus {
  total: number;
  active: number;
  activeProjects: number;
}

/** Read current table counts without modifying any data. */
export async function statusUserProjects(prisma: PrismaClient): Promise<UserProjectsStatus> {
  const [total, active, grouped] = await Promise.all([
    prisma.user_projects.count(),
    prisma.user_projects.count({ where: { is_active: true } }),
    prisma.user_projects.groupBy({ by: ["project_id"] }),
  ]);

  return { total, active, activeProjects: grouped.length };
}
