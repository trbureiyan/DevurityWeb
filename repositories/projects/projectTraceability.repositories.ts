import prisma from "@/lib/postgresDriver";
import { normalizeStage } from "@/repositories/projects/projects.repositories";
import type {
  ProjectArticle,
  ProjectCongress,
  ProjectTraceability,
  ProjectTraceabilityComment,
} from "@/lib/types/project.types";

/**
 * Repository de trazabilidad (Etapa 2): estado/fase/tipo/financiación con timestamp
 * por campo, artículos, congresos, comentarios de admins/auditores, y el resumen
 * general para el dashboard de /traceability.
 *
 * @module projectTraceability.repositories
 */

export interface ProjectTraceabilityBundle {
  projectId: string;
  slug: string;
  title: string;
  traceability: ProjectTraceability;
  articles: ProjectArticle[];
  congresses: ProjectCongress[];
  comments: ProjectTraceabilityComment[];
}

export async function getTraceability(slug: string): Promise<ProjectTraceabilityBundle | null> {
  const project = await prisma.projects.findUnique({
    where: { slug },
    include: {
      project_articles: { orderBy: { created_at: "desc" } },
      project_congresses: { orderBy: { created_at: "desc" } },
      project_traceability_comments: {
        orderBy: { created_at: "desc" },
        include: { users: { select: { name: true, last_name: true } } },
      },
    },
  });
  if (!project) return null;

  return {
    projectId: project.id.toString(),
    slug: project.slug,
    title: project.title,
    traceability: {
      stage: { value: normalizeStage(project.stage), updatedAt: project.stage_updated_at.toISOString() },
      currentPhase: {
        value: project.current_phase,
        updatedAt: project.current_phase_updated_at?.toISOString() ?? null,
      },
      projectType: {
        value: project.project_type,
        updatedAt: project.project_type_updated_at?.toISOString() ?? null,
      },
      hasFunding: {
        value: project.has_funding,
        updatedAt: project.has_funding_updated_at?.toISOString() ?? null,
      },
      fundingSource: project.funding_source,
      fundingNotes: project.funding_notes,
    },
    articles: project.project_articles.map((a) => ({
      id: a.id.toString(),
      title: a.title,
      authors: a.authors,
      publication: a.publication,
      url: a.url,
      publishedAt: a.published_at?.toISOString() ?? null,
    })),
    congresses: project.project_congresses.map((c) => ({
      id: c.id.toString(),
      name: c.name,
      role: c.role,
      location: c.location,
      url: c.url,
      heldAt: c.held_at?.toISOString() ?? null,
    })),
    comments: project.project_traceability_comments.map((c) => ({
      id: c.id.toString(),
      authorId: c.author_id?.toString() ?? null,
      authorName: c.users ? `${c.users.name} ${c.users.last_name}` : null,
      body: c.body,
      createdAt: c.created_at.toISOString(),
    })),
  };
}

export interface UpdateTraceabilityData {
  stage?: string;
  currentPhase?: string | null;
  projectType?: string | null;
  hasFunding?: boolean;
  fundingSource?: string | null;
  fundingNotes?: string | null;
}

// Solo estampa `_updated_at` en los campos que realmente cambiaron (compara contra el
// valor actual antes de escribir), no en cada PATCH indiscriminadamente.
export async function updateTraceabilityFields(
  slug: string,
  data: UpdateTraceabilityData,
): Promise<void> {
  const current = await prisma.projects.findUniqueOrThrow({
    where: { slug },
    select: { stage: true, current_phase: true, project_type: true, has_funding: true },
  });

  const now = new Date();
  const update: Record<string, unknown> = {};

  if (data.stage !== undefined && data.stage !== current.stage) {
    update.stage = data.stage;
    update.stage_updated_at = now;
  }
  if (data.currentPhase !== undefined && data.currentPhase !== current.current_phase) {
    update.current_phase = data.currentPhase;
    update.current_phase_updated_at = now;
  }
  if (data.projectType !== undefined && data.projectType !== current.project_type) {
    update.project_type = data.projectType;
    update.project_type_updated_at = now;
  }
  if (data.hasFunding !== undefined && data.hasFunding !== current.has_funding) {
    update.has_funding = data.hasFunding;
    update.has_funding_updated_at = now;
  }
  if (data.fundingSource !== undefined) update.funding_source = data.fundingSource;
  if (data.fundingNotes !== undefined) update.funding_notes = data.fundingNotes;

  if (Object.keys(update).length === 0) return;

  await prisma.projects.update({ where: { slug }, data: update });
}

export interface AddArticleData {
  title: string;
  authors?: string | null;
  publication?: string | null;
  url?: string | null;
  publishedAt?: string | null;
  createdBy?: bigint | null;
}

export async function addArticle(projectId: bigint, data: AddArticleData): Promise<ProjectArticle> {
  const row = await prisma.project_articles.create({
    data: {
      project_id: projectId,
      title: data.title,
      authors: data.authors ?? null,
      publication: data.publication ?? null,
      url: data.url ?? null,
      published_at: data.publishedAt ? new Date(data.publishedAt) : null,
      created_by: data.createdBy ?? null,
    },
  });
  return {
    id: row.id.toString(),
    title: row.title,
    authors: row.authors,
    publication: row.publication,
    url: row.url,
    publishedAt: row.published_at?.toISOString() ?? null,
  };
}

export type UpdateArticleData = Partial<AddArticleData>;

export async function updateArticle(
  projectId: bigint,
  articleId: bigint,
  data: UpdateArticleData,
): Promise<ProjectArticle | null> {
  const result = await prisma.project_articles.updateMany({
    where: { id: articleId, project_id: projectId },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.authors !== undefined && { authors: data.authors }),
      ...(data.publication !== undefined && { publication: data.publication }),
      ...(data.url !== undefined && { url: data.url }),
      ...(data.publishedAt !== undefined && { published_at: data.publishedAt ? new Date(data.publishedAt) : null }),
    },
  });
  if (result.count === 0) return null;

  const row = await prisma.project_articles.findUniqueOrThrow({ where: { id: articleId } });
  return {
    id: row.id.toString(),
    title: row.title,
    authors: row.authors,
    publication: row.publication,
    url: row.url,
    publishedAt: row.published_at?.toISOString() ?? null,
  };
}

export async function removeArticle(projectId: bigint, articleId: bigint): Promise<boolean> {
  const result = await prisma.project_articles.deleteMany({
    where: { id: articleId, project_id: projectId },
  });
  return result.count > 0;
}

export interface AddCongressData {
  name: string;
  role?: string | null;
  location?: string | null;
  url?: string | null;
  heldAt?: string | null;
  createdBy?: bigint | null;
}

export async function addCongress(projectId: bigint, data: AddCongressData): Promise<ProjectCongress> {
  const row = await prisma.project_congresses.create({
    data: {
      project_id: projectId,
      name: data.name,
      role: data.role ?? null,
      location: data.location ?? null,
      url: data.url ?? null,
      held_at: data.heldAt ? new Date(data.heldAt) : null,
      created_by: data.createdBy ?? null,
    },
  });
  return {
    id: row.id.toString(),
    name: row.name,
    role: row.role,
    location: row.location,
    url: row.url,
    heldAt: row.held_at?.toISOString() ?? null,
  };
}

export type UpdateCongressData = Partial<AddCongressData>;

export async function updateCongress(
  projectId: bigint,
  congressId: bigint,
  data: UpdateCongressData,
): Promise<ProjectCongress | null> {
  const result = await prisma.project_congresses.updateMany({
    where: { id: congressId, project_id: projectId },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.role !== undefined && { role: data.role }),
      ...(data.location !== undefined && { location: data.location }),
      ...(data.url !== undefined && { url: data.url }),
      ...(data.heldAt !== undefined && { held_at: data.heldAt ? new Date(data.heldAt) : null }),
    },
  });
  if (result.count === 0) return null;

  const row = await prisma.project_congresses.findUniqueOrThrow({ where: { id: congressId } });
  return {
    id: row.id.toString(),
    name: row.name,
    role: row.role,
    location: row.location,
    url: row.url,
    heldAt: row.held_at?.toISOString() ?? null,
  };
}

export async function removeCongress(projectId: bigint, congressId: bigint): Promise<boolean> {
  const result = await prisma.project_congresses.deleteMany({
    where: { id: congressId, project_id: projectId },
  });
  return result.count > 0;
}

export async function addComment(
  projectId: bigint,
  authorId: bigint,
  body: string,
): Promise<ProjectTraceabilityComment> {
  const row = await prisma.project_traceability_comments.create({
    data: { project_id: projectId, author_id: authorId, body },
    include: { users: { select: { name: true, last_name: true } } },
  });
  return {
    id: row.id.toString(),
    authorId: row.author_id?.toString() ?? null,
    authorName: row.users ? `${row.users.name} ${row.users.last_name}` : null,
    body: row.body,
    createdAt: row.created_at.toISOString(),
  };
}

export interface DashboardSummary {
  totalProjects: number;
  byStage: Record<string, number>;
  fundedProjects: number;
  totalArticles: number;
  totalCongresses: number;
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const [totalProjects, stageGroups, fundedProjects, totalArticles, totalCongresses] = await Promise.all([
    prisma.projects.count({ where: { is_archived: false } }),
    prisma.projects.groupBy({
      by: ["stage"],
      where: { is_archived: false },
      _count: { _all: true },
    }),
    prisma.projects.count({ where: { is_archived: false, has_funding: true } }),
    prisma.project_articles.count(),
    prisma.project_congresses.count(),
  ]);

  const byStage: Record<string, number> = {};
  for (const group of stageGroups) {
    byStage[group.stage] = group._count._all;
  }

  return { totalProjects, byStage, fundedProjects, totalArticles, totalCongresses };
}

export interface DashboardProjectRow {
  slug: string;
  title: string;
  stage: string;
  leaderName: string | null;
  updatedAt: string;
}

export async function listProjectsForDashboard(): Promise<DashboardProjectRow[]> {
  const projects = await prisma.projects.findMany({
    where: { is_archived: false },
    orderBy: { updated_at: "desc" },
    select: { id: true, slug: true, title: true, stage: true, updated_at: true },
  });

  const leaderRows = await prisma.user_projects.findMany({
    where: { project_id: { in: projects.map((p) => p.id) }, project_role: "leader", is_active: true },
    select: { project_id: true, users: { select: { name: true, last_name: true } } },
  });
  const leaderByProject = new Map(
    leaderRows.map((row) => [row.project_id?.toString(), row.users ? `${row.users.name} ${row.users.last_name}` : null]),
  );

  return projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    stage: normalizeStage(p.stage),
    leaderName: leaderByProject.get(p.id.toString()) ?? null,
    updatedAt: p.updated_at.toISOString(),
  }));
}
