import { PrismaClient } from "../../lib/generated/prisma";
import { randomProjectData, randomInt } from "./factory";
import type { SeedResult } from "./ui";

const DEFAULT_COUNT = 5;

export interface ProjectsFixtureOptions {
  count?: number;
  dryRun?: boolean;
  onProgress?: (current: number, total: number) => void;
}

/**
 * Inserta N proyectos ficticios en la tabla projects.
 * Los slugs llevan un sufijo numérico derivado de Date.now() + índice
 * para garantizar unicidad y evitar colisiones con el catálogo base.
 *
 * @returns Conteo de registros creados y omitidos.
 */
export async function seedProjects(
  prisma: PrismaClient,
  options: ProjectsFixtureOptions = {}
): Promise<SeedResult> {
  const { count = DEFAULT_COUNT, dryRun = false, onProgress } = options;

  if (dryRun) {
    return { created: 0, skipped: 0 };
  }

  let created = 0;
  let skipped = 0;

  for (let i = 0; i < count; i++) {
    const suffix = Date.now() + randomInt(0, 9999) + i;
    const data = randomProjectData(suffix);

    try {
      await prisma.projects.create({ data });
      created++;
    } catch (err) {
      // Solo swallow colisiones de slug (P2002); cualquier otro error es real
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
 * Borra user_projects (FK) y projects, luego re-siembra.
 * Requiere que el caller haya obtenido confirmación antes de invocar.
 *
 * @returns Conteos del seed posterior.
 */
export async function resetProjects(
  prisma: PrismaClient,
  options: ProjectsFixtureOptions = {}
): Promise<SeedResult> {
  if (options.dryRun) {
    return seedProjects(prisma, options);
  }

  // user_projects primero por la FK user_projects_fk_projects
  await prisma.$transaction([
    prisma.user_projects.deleteMany({}),
    prisma.projects.deleteMany({}),
  ]);

  return seedProjects(prisma, options);
}

export interface ProjectsStatus {
  total: number;
  archived: number;
  byStage: Array<{ stage: string; count: number }>;
}

/** Lee conteos actuales sin modificar datos. */
export async function statusProjects(prisma: PrismaClient): Promise<ProjectsStatus> {
  const [total, archived, byStage] = await Promise.all([
    prisma.projects.count(),
    prisma.projects.count({ where: { is_archived: true } }),
    prisma.projects.groupBy({
      by: ["stage"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    }),
  ]);

  return {
    total,
    archived,
    byStage: byStage.map((r) => ({ stage: r.stage, count: r._count.id })),
  };
}
