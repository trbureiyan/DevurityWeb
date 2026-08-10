import prisma from "@/lib/postgresDriver";
import { getPublicMediaUrl } from "@/lib/supabaseStorage";
import { VALID_STAGES, type ProjectDetail, type ProjectStage } from "@/lib/types/project.types";

/**
 * Repository para el catálogo/CRUD de proyectos (Etapa 1: página individual).
 * Trazabilidad (stage/current_phase/project_type/funding, artículos, congresos,
 * comentarios) vive en projectTraceability.repositories.ts (Etapa 2).
 *
 * @module projects.repositories
 */

type ProjectRow = NonNullable<Awaited<ReturnType<typeof prisma.projects.findUnique>>>;

export function normalizeStage(stage: string): ProjectStage {
  return (VALID_STAGES.includes(stage as ProjectStage) ? stage : "incubacion") as ProjectStage;
}

function mapToDetail(row: ProjectRow): ProjectDetail {
  return {
    id: row.slug,
    title: row.title,
    summary: row.description,
    stage: normalizeStage(row.stage),
    focusAreas: row.focus_areas,
    stack: row.stack.filter(Boolean),
    updatedAt: row.updated_at.toISOString(),
    heroImage: row.hero_image ? getPublicMediaUrl(row.hero_image) : null,
    isArchived: !!row.is_archived,
    contentMarkdown: row.content_markdown,
    ...(row.cta_label && row.cta_href
      ? { callToAction: { label: row.cta_label, href: row.cta_href } }
      : {}),
  };
}

export async function getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
  const row = await prisma.projects.findUnique({ where: { slug } });
  if (!row) return null;
  return mapToDetail(row);
}

export async function getProjectIdBySlug(slug: string): Promise<bigint | null> {
  const row = await prisma.projects.findUnique({ where: { slug }, select: { id: true } });
  return row?.id ?? null;
}

export interface ListProjectsFilters {
  search?: string;
  stage?: ProjectStage;
  includeArchived?: boolean;
}

export interface ListProjectsResult {
  projects: ProjectDetail[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function listProjects(
  filters: ListProjectsFilters = {},
  page: number = 1,
  limit: number = 20,
): Promise<ListProjectsResult> {
  const where = {
    ...(filters.includeArchived ? {} : { is_archived: false }),
    ...(filters.stage ? { stage: filters.stage } : {}),
    ...(filters.search
      ? {
          OR: [
            { title: { contains: filters.search, mode: "insensitive" as const } },
            { slug: { contains: filters.search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [rows, total] = await Promise.all([
    prisma.projects.findMany({
      where,
      orderBy: { updated_at: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.projects.count({ where }),
  ]);

  return {
    projects: rows.map(mapToDetail),
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export async function slugExists(slug: string): Promise<boolean> {
  const count = await prisma.projects.count({ where: { slug } });
  return count > 0;
}

export interface CreateProjectData {
  slug: string;
  title: string;
  description: string;
  focusAreas?: string[];
  stack?: string[];
  ctaLabel?: string | null;
  ctaHref?: string | null;
}

export async function createProject(data: CreateProjectData): Promise<ProjectDetail> {
  const row = await prisma.projects.create({
    data: {
      slug: data.slug,
      title: data.title,
      description: data.description,
      focus_areas: data.focusAreas ?? [],
      stack: data.stack ?? [],
      cta_label: data.ctaLabel ?? null,
      cta_href: data.ctaHref ?? null,
    },
  });
  return mapToDetail(row);
}

export interface UpdateProjectCoreData {
  title?: string;
  description?: string;
  focusAreas?: string[];
  stack?: string[];
  ctaLabel?: string | null;
  ctaHref?: string | null;
}

// Metadata general de la pestaña "Page" (título/descripción/tags/enlaces). El stage y
// los demás campos de trazabilidad se editan vía projectTraceability.repositories.ts.
export async function updateProjectCore(
  slug: string,
  data: UpdateProjectCoreData,
): Promise<ProjectDetail> {
  const row = await prisma.projects.update({
    where: { slug },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.focusAreas !== undefined && { focus_areas: data.focusAreas }),
      ...(data.stack !== undefined && { stack: data.stack }),
      ...(data.ctaLabel !== undefined && { cta_label: data.ctaLabel }),
      ...(data.ctaHref !== undefined && { cta_href: data.ctaHref }),
    },
  });
  return mapToDetail(row);
}

export async function archiveProject(slug: string): Promise<ProjectDetail> {
  const row = await prisma.projects.update({
    where: { slug },
    data: { is_archived: true },
  });
  return mapToDetail(row);
}

// Reemplazo completo del banner: guarda el path de Storage (no la URL), null para quitarlo.
export async function updateBannerPath(slug: string, path: string | null): Promise<ProjectDetail> {
  const row = await prisma.projects.update({
    where: { slug },
    data: { hero_image: path },
  });
  return mapToDetail(row);
}

// Reemplazo completo del contenido: guarda el texto extraído (para render sin round-trip
// a Storage) y el path del archivo canónico subido.
export async function updateContentMarkdown(
  slug: string,
  markdown: string,
  path: string,
): Promise<ProjectDetail> {
  const row = await prisma.projects.update({
    where: { slug },
    data: { content_markdown: markdown, content_markdown_path: path },
  });
  return mapToDetail(row);
}
