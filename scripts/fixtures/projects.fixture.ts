import { PrismaClient } from "../../lib/generated/prisma";
import { randomProjectData } from "./factory";
import type { SeedResult } from "./ui";

const DEFAULT_COUNT = 5;

export interface ProjectsFixtureOptions {
  count?: number;
  dryRun?: boolean;
  onProgress?: (current: number, total: number) => void;
}

/**
 * Helper que inserta proyectos ficticios usando el cliente que se le pase —
 * puede ser el cliente principal o el cliente transaccional de $transaction.
 * Sufijo derivado del batchId + índice: determinístico dentro del lote y libre
 * de colisiones con el catálogo base (que usa IDs estáticos).
 */
async function insertProjects(
  tx: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">,
  count: number,
  batchId: number,
  onProgress?: (current: number, total: number) => void
): Promise<SeedResult> {
  let created = 0;
  let skipped = 0;

  for (let i = 0; i < count; i++) {
    // sufijo determinístico: batchId + índice garantiza orden dentro del lote
    const suffix = batchId * 1000 + i;
    const data = randomProjectData(suffix);

    try {
      await tx.projects.create({ data });
      created++;
    } catch (err) {
      // solo swallow colisiones de slug (P2002); cualquier otro error es real
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
 * Inserta N proyectos ficticios en la tabla projects.
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

  // batchId derivado del timestamp del inicio del lote — estable para todo el batch
  const batchId = Date.now();
  return insertProjects(prisma, count, batchId, onProgress);
}

/**
 * Borra user_projects (FK) y projects, luego re-siembra, todo en una única
 * transacción interactiva para garantizar atomicidad.
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

  const { count = DEFAULT_COUNT, onProgress } = options;
  const batchId = Date.now();

  return prisma.$transaction(async (tx) => {
    // user_projects primero por la FK user_projects_fk_projects
    await tx.user_projects.deleteMany({});
    await tx.projects.deleteMany({});
    return insertProjects(tx, count, batchId, onProgress);
  });
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
