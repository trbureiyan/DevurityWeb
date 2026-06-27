/**
 * scripts/fixtures/index.ts — Fixture CLI (Rich TUI)
 *
 * Interactive terminal utility for populating development databases with
 * realistic test data. Never touches base tables (roles, skills, platforms,
 * programs).
 *
 * Usage:
 *   pnpm run db:fixture              → interactive menu
 *   pnpm run db:fixture:dry          → dry-run — preview without mutations
 */

import * as p from "@clack/prompts";
import { PrismaClient } from "../../lib/generated/prisma";
import { assertDevelopmentOnly } from "./factory";
import {
  C,
  renderResultBox,
  renderStatusBox,
  renderError,
  type SeedResult,
} from "./ui";

import { seedUsers, resetUsers, statusUsers } from "./users.fixture";
import { seedAttendances, resetAttendances, statusAttendances } from "./attendances.fixture";
import { seedUserProjects, resetUserProjects, statusUserProjects } from "./user-projects.fixture";
import { createBackup, listBackups, restoreBackup } from "./backup";

// ─────────────────────────────────────────────────────────────
// Bootstrap
// ─────────────────────────────────────────────────────────────
assertDevelopmentOnly();

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function handleCancel(value: unknown): void {
  if (p.isCancel(value)) {
    p.cancel("Operación cancelada.");
    process.exit(0);
  }
}

/** Prompt for a positive integer with a visible default. */
async function askCount(label: string, defaultVal: number): Promise<number> {
  const raw = await p.text({
    message: label,
    placeholder: String(defaultVal),
    validate: (v?: string) => {
      if (!v || v === "") return undefined;
      const n = parseInt(v, 10);
      if (isNaN(n) || n <= 0) return "Ingresa un número entero mayor que 0.";
    },
  });
  handleCancel(raw);
  const parsed = parseInt((raw as string).trim(), 10);
  return isNaN(parsed) || parsed <= 0 ? defaultVal : parsed;
}

/** Prompt the user to type CONFIRMAR for destructive operations. */
async function requireConfirm(tableName: string): Promise<void> {
  p.log.warn(
    `${C.yellow}Esta operación limpiará la tabla ${C.bold}${tableName}${C.reset}${C.yellow} y sus dependientes.${C.reset}`
  );

  const answer = await p.text({
    message: "Escribe CONFIRMAR para continuar:",
    validate: (v?: string) => {
      if ((v ?? "").trim() !== "CONFIRMAR") return "Escribe exactamente CONFIRMAR para continuar.";
    },
  });
  handleCancel(answer);
}

// ─────────────────────────────────────────────────────────────
// Status helpers
// ─────────────────────────────────────────────────────────────
async function showStatusAll(): Promise<void> {
  const s = p.spinner();
  s.start("Consultando estado de las tablas...");

  const [users, att, up] = await Promise.all([
    statusUsers(prisma),
    statusAttendances(prisma),
    statusUserProjects(prisma),
  ]);

  s.stop("Consulta completada.");

  renderStatusBox([
    { label: "users  — total",        value: String(users.total) },
    { label: "users  — activos",      value: String(users.active) },
    ...users.byRole.map((r) => ({
      label: `  └ ${r.role}`,
      value: String(r.count),
    })),
    { label: "attendances — total",   value: String(att.total) },
    { label: "  └ usuarios distintos", value: String(att.uniqueUsers) },
    { label: "user_projects — total",  value: String(up.total) },
    { label: "  └ proyectos activos",  value: String(up.activeProjects) },
  ]);
}

// ─────────────────────────────────────────────────────────────
// Table-specific menus
// ─────────────────────────────────────────────────────────────
async function menuUsers(): Promise<void> {
  const operation = await p.select({
    message: "Operación para users:",
    options: [
      { value: "seed",   label: "seed    — insertar N usuarios nuevos" },
      { value: "reset",  label: "reset   — limpiar tabla e insertar N usuarios nuevos" },
      { value: "status", label: "status  — mostrar conteo actual" },
    ],
  });
  handleCancel(operation);

  if (operation === "status") {
    const s = p.spinner();
    s.start("Consultando...");
    const st = await statusUsers(prisma);
    s.stop("Listo.");
    renderStatusBox([
      { label: "total",   value: String(st.total) },
      { label: "activos", value: String(st.active) },
      ...st.byRole.map((r) => ({ label: `  └ ${r.role}`, value: String(r.count) })),
    ]);
    return;
  }

  const count = await askCount("¿Cuántos usuarios?", 10);

  const roleInput = await p.select({
    message: "Rol a asignar:",
    options: [
      { value: "",                label: "Aleatorio (distribución equiproporcional)" },
      { value: "user",            label: "user" },
      { value: "admin",           label: "admin" },
      { value: "lead_project",    label: "lead_project" },
      { value: "content_manager", label: "content_manager" },
    ],
  });
  handleCancel(roleInput);
  const role = roleInput === "" ? undefined : String(roleInput);

  if (operation === "reset") {
    await requireConfirm("users");
  }

  if (DRY_RUN) {
    p.log.info(`[dry-run] Insertaría ${count} usuario(s), rol: ${role ?? "aleatorio"}.`);
    return;
  }

  const s = p.spinner();
  s.start(`Procesando users... (0 / ${count})`);

  const fn = operation === "reset" ? resetUsers : seedUsers;
  const result: SeedResult = await fn(prisma, {
    count,
    role,
    onProgress: (cur, total) => s.message(`Procesando users... (${cur} / ${total})`),
  });

  s.stop(`users completado.`);
  renderResultBox({ users: result });
}

async function menuAttendances(): Promise<void> {
  const operation = await p.select({
    message: "Operación para attendances:",
    options: [
      { value: "seed",   label: "seed    — insertar N registros de asistencia" },
      { value: "reset",  label: "reset   — limpiar tabla e insertar N registros" },
      { value: "status", label: "status  — mostrar conteo actual" },
    ],
  });
  handleCancel(operation);

  if (operation === "status") {
    const s = p.spinner();
    s.start("Consultando...");
    const st = await statusAttendances(prisma);
    s.stop("Listo.");
    renderStatusBox([
      { label: "total",             value: String(st.total) },
      { label: "usuarios distintos", value: String(st.uniqueUsers) },
    ]);
    return;
  }

  const count = await askCount("¿Cuántos registros de asistencia?", 30);

  if (operation === "reset") {
    await requireConfirm("attendances");
  }

  if (DRY_RUN) {
    p.log.info(`[dry-run] Insertaría ${count} asistencia(s).`);
    return;
  }

  const s = p.spinner();
  s.start(`Procesando attendances... (0 / ${count})`);

  const fn = operation === "reset" ? resetAttendances : seedAttendances;
  const result: SeedResult = await fn(prisma, {
    count,
    onProgress: (cur, total) => s.message(`Procesando attendances... (${cur} / ${total})`),
  });

  s.stop("attendances completado.");
  renderResultBox({ attendances: result });
}

async function menuUserProjects(): Promise<void> {
  const operation = await p.select({
    message: "Operación para user_projects:",
    options: [
      { value: "seed",   label: "seed    — insertar N asignaciones usuario-proyecto" },
      { value: "reset",  label: "reset   — limpiar tabla e insertar N asignaciones" },
      { value: "status", label: "status  — mostrar conteo actual" },
    ],
  });
  handleCancel(operation);

  if (operation === "status") {
    const s = p.spinner();
    s.start("Consultando...");
    const st = await statusUserProjects(prisma);
    s.stop("Listo.");
    renderStatusBox([
      { label: "total",            value: String(st.total) },
      { label: "activos",          value: String(st.active) },
      { label: "proyectos activos", value: String(st.activeProjects) },
    ]);
    return;
  }

  const count = await askCount("¿Cuántas asignaciones?", 15);

  if (operation === "reset") {
    await requireConfirm("user_projects");
  }

  if (DRY_RUN) {
    p.log.info(`[dry-run] Insertaría ${count} asignación/asignaciones usuario-proyecto.`);
    return;
  }

  const s = p.spinner();
  s.start(`Procesando user_projects... (0 / ${count})`);

  const fn = operation === "reset" ? resetUserProjects : seedUserProjects;
  const result: SeedResult = await fn(prisma, {
    count,
    onProgress: (cur, total) => s.message(`Procesando user_projects... (${cur} / ${total})`),
  });

  s.stop("user_projects completado.");
  renderResultBox({ user_projects: result });
}

async function menuAll(): Promise<void> {
  p.log.step("Seed all — poblará users → attendances → user_projects en orden.");

  const usersCount = await askCount("¿Cuántos usuarios?", 10);
  const attCount   = await askCount("¿Cuántos registros de asistencia?", 30);
  const upCount    = await askCount("¿Cuántas asignaciones usuario-proyecto?", 15);

  if (DRY_RUN) {
    p.log.info(`[dry-run] ${usersCount} usuarios, ${attCount} asistencias, ${upCount} asignaciones.`);
    return;
  }

  const results: Record<string, SeedResult> = {};

  const s = p.spinner();

  s.start(`Procesando users... (0 / ${usersCount})`);
  results.users = await seedUsers(prisma, {
    count: usersCount,
    onProgress: (cur, total) => s.message(`Procesando users... (${cur} / ${total})`),
  });
  s.message(`Procesando attendances... (0 / ${attCount})`);

  results.attendances = await seedAttendances(prisma, {
    count: attCount,
    onProgress: (cur, total) => s.message(`Procesando attendances... (${cur} / ${total})`),
  });
  s.message(`Procesando user_projects... (0 / ${upCount})`);

  results.user_projects = await seedUserProjects(prisma, {
    count: upCount,
    onProgress: (cur, total) => s.message(`Procesando user_projects... (${cur} / ${total})`),
  });

  s.stop("Seed general completado.");
  renderResultBox(results);
}

async function menuBackups(): Promise<void> {
  const op = await p.select({
    message: "Gestión de Copias de Seguridad (Snapshots):",
    options: [
      { value: "create",  label: "Crear snapshot actual de la base de datos" },
      { value: "restore", label: "Restaurar un snapshot previo" },
      { value: "back",    label: "Volver" },
    ],
  });
  handleCancel(op);

  if (op === "back") return;

  if (op === "create") {
    const label = await p.text({
      message: "Ingresa una etiqueta para identificar este snapshot (ej: config_limpia):",
      placeholder: "auto",
      validate: (v?: string) => {
        if (v && !/^[a-zA-Z0-9-_]+$/.test(v)) {
          return "La etiqueta solo puede contener letras, números, guiones y guiones bajos.";
        }
      },
    });
    handleCancel(label);

    const s = p.spinner();
    s.start("Creando snapshot...");
    try {
      const filename = await createBackup(prisma, typeof label === "string" && label ? label : undefined);
      s.stop(`Snapshot creado con éxito: ${filename}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      s.stop(`Error al crear snapshot: ${msg}`);
    }
  } else if (op === "restore") {
    const list = await listBackups();
    if (list.length === 0) {
      p.log.warn("No se encontraron snapshots guardados en scripts/fixtures/backups/.");
      return;
    }

    const file = await p.select({
      message: "Selecciona el snapshot a restaurar:",
      options: list.map((f) => ({ value: f, label: f })),
    });
    handleCancel(file);

    p.log.warn(
      `${C.yellow}Advertencia: Restaurar este snapshot borrará todos los datos dinámicos actuales.${C.reset}`
    );

    const answer = await p.text({
      message: "Escribe CONFIRMAR para continuar con la restauración:",
      validate: (v?: string) => {
        if ((v ?? "").trim() !== "CONFIRMAR") {
          return "Escribe exactamente CONFIRMAR para continuar.";
        }
      },
    });
    handleCancel(answer);

    const s = p.spinner();
    s.start("Restaurando base de datos...");
    try {
      const results = await restoreBackup(prisma, String(file));
      s.stop("Restauración completada con éxito.");
      renderResultBox(results);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      s.stop(`Error al restaurar base de datos: ${msg}`);
    }
  }
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  // Extract DB name from URL for the header — avoids printing credentials
  const dbUrl = process.env.DATABASE_URL ?? "";
  const dbName = dbUrl.split("/").pop()?.split("?")[0] ?? "local";

  p.intro(
    `${C.bold}DEVURITY${C.reset}  Fixture CLI` +
    (DRY_RUN ? `  ${C.yellow}[dry-run]${C.reset}` : "") +
    `\n  ${C.gray}Database: ${dbName}${C.reset}` +
    `\n  ${C.gray}Tablas base (roles, skills, platforms, programs) no son afectadas.${C.reset}`
  );

  while (true) {
    const table = await p.select({
      message: "¿Qué tabla quieres gestionar?",
      options: [
        { value: "users",         label: "users" },
        { value: "attendances",   label: "attendances" },
        { value: "user_projects", label: "user_projects" },
        { value: "all",           label: "seed all   — poblar todas las tablas a la vez" },
        { value: "status",        label: "status all  — ver conteo actual de todas las tablas" },
        { value: "backups",       label: "backups     — crear o restaurar copias de seguridad (Snapshots)" },
        { value: "exit",          label: "salir" },
      ],
    });
    handleCancel(table);

    if (table === "exit") break;

    try {
      if (table === "users")              await menuUsers();
      else if (table === "attendances")   await menuAttendances();
      else if (table === "user_projects") await menuUserProjects();
      else if (table === "all")           await menuAll();
      else if (table === "status")        await showStatusAll();
      else if (table === "backups")       await menuBackups();
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "cancelled") continue;
      const msg = err instanceof Error ? err.message : String(err);
      renderError("Operación fallida.", msg);
    }

    console.log("");
  }

  p.outro(`${C.green}✔${C.reset}  Fixture CLI cerrado.`);
  await prisma.$disconnect();
}

main().catch(async (err) => {
  if (err instanceof Error && err.message !== "cancelled") {
    renderError("Error inesperado.", err.message);
  }
  await prisma.$disconnect();
  process.exit(0);
});
