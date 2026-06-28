import fs from "fs";
import path from "path";
import { ROLE_NAMES } from "../prisma/seeders/01-roles";
import { PLATFORM_NAMES } from "../prisma/seeders/02-platforms";
import { PROGRAMS } from "../prisma/seeders/03-programs";
import { SKILLS } from "../prisma/seeders/04-skills";
import { PROJECTS } from "../prisma/seeders/05-projects";
import { UPDATES } from "../prisma/seeders/06-updates";

// Helper to escape single quotes for SQL
function escapeStr(val: string | null | undefined): string {
  if (val === null || val === undefined) return "NULL";
  return `'${val.replace(/'/g, "''")}'`;
}

// Helper to format string arrays to pg array syntax: ARRAY['val1', 'val2']
function formatArray(arr: string[] | null | undefined): string {
  if (!arr || arr.length === 0) return "ARRAY[]::text[]";
  const items = arr.map((item) => `'${item.replace(/'/g, "''")}'`);
  return `ARRAY[${items.join(", ")}]`;
}

// Helper to format Date objects for SQL — emits full ISO timestamp to preserve
// the time component for fields like published_at and start_date.
function formatDate(date: Date | null | undefined): string {
  if (!date) return "NULL";
  return `'${date.toISOString()}'`;
}

function generateSql(): string {
  const sqlLines: string[] = [];

  // File Header
  sqlLines.push("-- ============================================================");
  sqlLines.push("-- SCRIPT GENERADO AUTOMÁTICAMENTE PARA INICIALIZAR LA BASE DE DATOS");
  sqlLines.push("-- Sincronizado a partir de los seeders de TypeScript (prisma/seeders/*)");
  sqlLines.push("-- Ejecutar con: pnpm run db:seed:sql-sync para regenerar");
  sqlLines.push("-- ============================================================\n");

  // 1. Roles
  sqlLines.push("-- 1. Insertar roles");
  ROLE_NAMES.forEach((role) => {
    sqlLines.push(`INSERT INTO roles (name) VALUES (${escapeStr(role)}) ON CONFLICT (name) DO NOTHING;`);
  });
  sqlLines.push("");

  // 2. Skills (Batched in groups of 10 for readability)
  sqlLines.push("-- 2. Insertar skills");
  const skillBatches: string[][] = [];
  for (let i = 0; i < SKILLS.length; i += 10) {
    skillBatches.push(SKILLS.slice(i, i + 10));
  }
  skillBatches.forEach((batch) => {
    sqlLines.push("INSERT INTO public.skills (\"name\") VALUES");
    const values = batch.map((skill) => `\t (${escapeStr(skill)})`).join(",\n");
    sqlLines.push(values);
    sqlLines.push("ON CONFLICT (name) DO NOTHING;\n");
  });

  // 3. Platforms
  sqlLines.push("-- 3. Insertar plataformas");
  sqlLines.push("INSERT INTO public.platforms (\"name\") VALUES");
  const platformValues = PLATFORM_NAMES.map((p) => `\t (${escapeStr(p)})`).join(",\n");
  sqlLines.push(platformValues);
  sqlLines.push("ON CONFLICT DO NOTHING;\n");

  // 4. Academic Programs (Batched in groups of 10)
  sqlLines.push("-- 4. Insertar programas académicos");
  const programBatches: string[][] = [];
  for (let i = 0; i < PROGRAMS.length; i += 10) {
    programBatches.push(PROGRAMS.slice(i, i + 10));
  }
  programBatches.forEach((batch) => {
    sqlLines.push("INSERT INTO public.programs (\"name\") VALUES");
    const values = batch.map((prog) => `\t (${escapeStr(prog)})`).join(",\n");
    sqlLines.push(values);
    sqlLines.push("ON CONFLICT (name) DO NOTHING;\n");
  });

  // 5. Updates
  sqlLines.push("-- 5. Insertar actualizaciones / noticias");
  UPDATES.forEach((update) => {
    const fields = [
      "slug",
      "title",
      "display_date",
      "published_at",
      "description",
      "tags",
      "border_color",
      "href",
      "is_featured",
      "status",
    ].join(", ");

    const values = [
      escapeStr(update.slug),
      escapeStr(update.title),
      escapeStr(update.display_date),
      formatDate(update.published_at),
      escapeStr(update.description),
      formatArray(update.tags),
      escapeStr(update.border_color),
      escapeStr(update.href),
      update.is_featured ? "true" : "false",
      "'published'", // Default status
    ].join(", ");

    sqlLines.push(`INSERT INTO public.updates (${fields}) VALUES (${values}) ON CONFLICT (slug) DO NOTHING;`);
  });
  sqlLines.push("");

  // 6. Projects
  sqlLines.push("-- 6. Insertar / actualizar catálogo de proyectos");
  PROJECTS.forEach((project) => {
    const fields = [
      "slug",
      "title",
      "description",
      "stage",
      "focus_areas",
      "stack",
      "hero_image",
      "cta_label",
      "cta_href",
      "start_date",
      "is_archived",
    ].join(", ");

    const values = [
      escapeStr(project.slug),
      escapeStr(project.title),
      escapeStr(project.description),
      escapeStr(project.stage),
      formatArray(project.focus_areas),
      formatArray(project.stack),
      escapeStr(project.hero_image),
      escapeStr(project.cta_label),
      escapeStr(project.cta_href),
      formatDate(project.start_date),
      project.is_archived ? "true" : "false",
    ].join(", ");

    const updateSet = [
      `title        = EXCLUDED.title`,
      `description  = EXCLUDED.description`,
      `stage        = EXCLUDED.stage`,
      `focus_areas  = EXCLUDED.focus_areas`,
      `stack        = EXCLUDED.stack`,
      `hero_image   = EXCLUDED.hero_image`,
      `cta_label    = EXCLUDED.cta_label`,
      `cta_href     = EXCLUDED.cta_href`,
      `start_date   = EXCLUDED.start_date`,
      `is_archived  = EXCLUDED.is_archived`,
      `updated_at   = NOW()`,
    ].join(",\n  ");

    sqlLines.push(`INSERT INTO public.projects (${fields})`);
    sqlLines.push(`VALUES (${values})`);
    sqlLines.push(`ON CONFLICT (slug) DO UPDATE SET`);
    sqlLines.push(`  ${updateSet};`);
    sqlLines.push("");
  });

  // Footer Verification Queries
  sqlLines.push("-- 7. Verificar datos insertados");
  sqlLines.push("SELECT * FROM roles;");
  sqlLines.push("SELECT COUNT(*) as total_skills FROM skills;");
  sqlLines.push("SELECT COUNT(*) as total_platforms FROM platforms;");
  sqlLines.push("SELECT COUNT(*) as total_programs FROM programs;");
  sqlLines.push("SELECT COUNT(*) as total_projects FROM projects;");
  sqlLines.push("SELECT COUNT(*) as total_updates FROM updates;");

  return sqlLines.join("\n");
}

function main() {
  console.log("🔄 Sincronizando TypeScript seeders a prisma/seed.sql...");
  try {
    const sqlContent = generateSql();
    const outputPath = path.join(process.cwd(), "prisma", "seed.sql");
    fs.writeFileSync(outputPath, sqlContent, "utf-8");
    console.log(`✅ Sincronización exitosa. Archivo generado en: ${outputPath}`);
  } catch (error) {
    console.error("❌ Error al generar seed.sql:", error);
    process.exit(1);
  }
}

main();
