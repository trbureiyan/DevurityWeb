import { PrismaClient } from "../../lib/generated/prisma";

// ─────────────────────────────────────────────────────────────
// Guard: fixtures must never run against a production database.
// Check both NODE_ENV and a simple heuristic on the DATABASE_URL.
// ─────────────────────────────────────────────────────────────

/**
 * Aborts the process if the current environment looks like production.
 * Checks NODE_ENV and common production database hostnames.
 *
 * @throws Never — calls process.exit(1) on detection.
 */
export function assertDevelopmentOnly(): void {
  const env = process.env.NODE_ENV;
  const url = process.env.DATABASE_URL ?? "";

  // [!] Detect production cloud DB hostnames — extend this list as needed
  const isProd =
    env === "production" ||
    (url.includes("supabase.co") && !url.includes("localhost")) ||
    (url.includes("neon.tech") && !url.includes("localhost"));

  if (isProd) {
    process.stderr.write(
      "\n[!] ABORTING: fixture scripts must not run against a production database.\n" +
      "    NODE_ENV=" + JSON.stringify(env) + "  DATABASE_URL looks like production.\n\n"
    );
    process.exit(1);
  }
}

// ─────────────────────────────────────────────────────────────
// Random data helpers
// ─────────────────────────────────────────────────────────────
const FIRST_NAMES = [
  "Andrés", "María", "Carlos", "Laura", "Santiago", "Valentina",
  "Sebastián", "Camila", "Diego", "Isabella", "Julián", "Sara",
  "Felipe", "Ana", "Daniel", "Paula", "Miguel", "Sofía", "Jorge", "Elena",
];

const LAST_NAMES = [
  "García", "Martínez", "López", "Hernández", "González", "Pérez",
  "Rodríguez", "Sánchez", "Ramírez", "Torres", "Flores", "Vargas",
  "Castro", "Moreno", "Jiménez", "Ruiz", "Díaz", "Mendoza", "Silva", "Ramos",
];

const MOTIVATIONS = [
  "Aprender sobre ciberseguridad y aplicarla en proyectos reales.",
  "Contribuir al desarrollo de software de calidad en la región.",
  "Investigar nuevas tecnologías y compartir el conocimiento.",
  "Desarrollar habilidades técnicas en un entorno colaborativo.",
  "Aportar al ecosistema tecnológico universitario.",
  "Fortalecer mi perfil profesional con proyectos reales.",
  "Aprender de mis compañeros y crecer como desarrollador.",
];

export function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomName(): { name: string; last_name: string } {
  return { name: pick(FIRST_NAMES), last_name: pick(LAST_NAMES) };
}

export function randomEmail(name: string, last_name: string, suffix: number): string {
  const norm = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return `${norm(name)}.${norm(last_name)}.${suffix}@fixture.devurity.dev`;
}

export function randomUsername(name: string, suffix: number): string {
  const norm = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return `${norm}_${suffix}`;
}

export function randomMotivation(): string {
  return pick(MOTIVATIONS);
}

export function randomSemester(): number {
  return randomInt(1, 10);
}

/** Generates a date in the past within the given day range. */
export function randomDateAround(centerDate: Date, daysRange: number): Date {
  const offset = randomInt(-daysRange, 0);
  const d = new Date(centerDate);
  d.setDate(d.getDate() + offset);
  return d;
}

// ─────────────────────────────────────────────────────────────
// FK lookup helpers — resolve IDs from already-seeded base tables
// ─────────────────────────────────────────────────────────────

export async function getRoleId(prisma: PrismaClient, roleName: string): Promise<bigint> {
  const role = await prisma.roles.findUniqueOrThrow({ where: { name: roleName } });
  return role.id;
}

export async function getAllRoleIds(prisma: PrismaClient): Promise<bigint[]> {
  const roles = await prisma.roles.findMany({ select: { id: true } });
  return roles.map((r) => r.id);
}

export async function getRandomRoleId(prisma: PrismaClient): Promise<bigint> {
  const ids = await getAllRoleIds(prisma);
  return pick(ids);
}

export async function getAllProjectIds(prisma: PrismaClient): Promise<bigint[]> {
  const projects = await prisma.projects.findMany({
    where: { is_archived: false },
    select: { id: true },
  });
  return projects.map((p) => p.id);
}

export async function getAllUserIds(prisma: PrismaClient): Promise<bigint[]> {
  const users = await prisma.users.findMany({ select: { id: true } });
  return users.map((u) => u.id);
}

export async function getActiveUserIds(prisma: PrismaClient): Promise<bigint[]> {
  const users = await prisma.users.findMany({
    where: { is_active: true },
    select: { id: true },
  });
  return users.map((u) => u.id);
}
