import { cache } from "react";
import { unstable_cache } from "next/cache";
import prisma from "@/lib/postgresDriver";

export type ProjectStage = "incubacion" | "desarrollo" | "validacion" | "produccion" | "experimentacion";

export interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  stage: ProjectStage;
  focusAreas: string[];
  stack: string[];
  updatedAt: string;
  heroImage: string | null;
  callToAction?: {
    label: string;
    href: string;
  };
}

export interface ProjectFilters {
  stages: ProjectStage[];
  focusAreas: string[];
  stack: string[];
}

const unique = (values: string[]): string[] => Array.from(new Set(values)).sort();

const VALID_STAGES: ProjectStage[] = ["incubacion", "desarrollo", "validacion", "produccion", "experimentacion"];

// Incrementar este identificador cuando se requiera forzar la revalidación manual.
const PROJECTS_CACHE_KEY: string[] = ["projects-catalog", "rev-2026030201"];

export const getProjectsCatalog = unstable_cache(async (): Promise<ProjectItem[]> => {
  const rows = await prisma.projects.findMany({
    where: { is_archived: false },
    orderBy: { updated_at: "desc" },
  });

  return rows.map((row) => ({
    id: row.slug,
    title: row.title,
    summary: row.description,
    stage: (VALID_STAGES.includes(row.stage as ProjectStage) ? row.stage : "incubacion") as ProjectStage,
    focusAreas: row.focus_areas,
    stack: row.stack.filter(Boolean),
    updatedAt: row.updated_at.toISOString(),
    heroImage: row.hero_image ?? null,
    ...(row.cta_label && row.cta_href
      ? { callToAction: { label: row.cta_label, href: row.cta_href } }
      : {}),
  }));
}, PROJECTS_CACHE_KEY, {
  revalidate: 60 * 60 * 6,
});

export const getProjectsFilters = cache(async (): Promise<ProjectFilters> => {
  const projects = await getProjectsCatalog();
  return {
    stages: VALID_STAGES,
    focusAreas: unique(projects.flatMap((p) => p.focusAreas)),
    stack: unique(projects.flatMap((p) => p.stack)),
  };
});
