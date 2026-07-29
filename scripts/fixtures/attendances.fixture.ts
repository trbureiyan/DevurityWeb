import { PrismaClient } from "../../lib/generated/prisma";
import { getActiveUserIds, randomDateAround, assertDevelopmentOnly } from "./factory";
import type { SeedResult } from "./ui";

const DEFAULT_COUNT = 30;

export interface AttendancesFixtureOptions {
  count?: number;
  dryRun?: boolean;
  onProgress?: (current: number, total: number) => void;
}

/**
 * Insert N attendance records distributed among currently active users.
 * Records are spread over the past 90 days.
 *
 * @returns Counts of created and skipped records.
 */
export async function seedAttendances(
  prisma: PrismaClient,
  options: AttendancesFixtureOptions = {}
): Promise<SeedResult> {
  const { count = DEFAULT_COUNT, dryRun = false, onProgress } = options;

  const userIds = await getActiveUserIds(prisma);

  if (userIds.length === 0) {
    return { created: 0, skipped: 0 };
  }

  if (dryRun) {
    return { created: 0, skipped: 0 };
  }

  const today = new Date();
  let created = 0;
  let skipped = 0;

  for (let i = 0; i < count; i++) {
    const userId = userIds[Math.floor(Math.random() * userIds.length)];
    const date = randomDateAround(today, 90);
    // Normalize to midnight — PostgreSQL @db.Date has no time component
    date.setHours(0, 0, 0, 0);

    try {
      await prisma.attendances.create({
        data: { user_id: userId, attendance_date: date },
      });
      created++;
    } catch (err) {
      // Only skip expected duplicate-entry errors (same user + same date unique constraint).
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
 * Elimina todos los registros de asistencia y vuelve a sembrar datos de prueba.
 * Requiere que el llamador haya obtenido confirmación previa del usuario.
 * Aborta si `NODE_ENV` no es `"development"` o `DATABASE_URL` no apunta a localhost.
 *
 * @param prisma - Cliente Prisma activo.
 * @param options - Opciones de sembrado (count, dryRun, onProgress).
 * @returns Conteo de registros creados y omitidos del sembrado posterior.
 * @throws Aborta el proceso si no está en entorno de desarrollo (via assertDevelopmentOnly).
 */
export async function resetAttendances(
  prisma: PrismaClient,
  options: AttendancesFixtureOptions = {}
): Promise<SeedResult> {
  assertDevelopmentOnly();
  await prisma.attendances.deleteMany({});
  return seedAttendances(prisma, options);
}

export interface AttendancesStatus {
  total: number;
  uniqueUsers: number;
}

/** Read current table counts without modifying any data. */
export async function statusAttendances(prisma: PrismaClient): Promise<AttendancesStatus> {
  const [total, grouped] = await Promise.all([
    prisma.attendances.count(),
    prisma.attendances.groupBy({ by: ["user_id"] }),
  ]);

  return { total, uniqueUsers: grouped.length };
}
