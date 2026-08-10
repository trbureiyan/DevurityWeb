/**
 * Tipos compartidos del catálogo y la página individual de proyectos.
 * Sin dependencias de servidor (Prisma, fs, etc.) — seguro para bundles de cliente y servidor.
 *
 * @module project.types
 */

export type ProjectStage =
  | "incubacion"
  | "desarrollo"
  | "validacion"
  | "produccion"
  | "experimentacion"
  | "pausa";

export const VALID_STAGES: ProjectStage[] = [
  "incubacion",
  "desarrollo",
  "validacion",
  "produccion",
  "experimentacion",
  "pausa",
];

export interface ProjectCallToAction {
  label: string;
  href: string;
}

export interface ProjectItem {
  id: string; // slug
  title: string;
  summary: string;
  stage: ProjectStage;
  focusAreas: string[];
  stack: string[];
  updatedAt: string;
  heroImage: string | null;
  isLocal?: boolean; // Solo usado por el catálogo cliente (localStorage), nunca viene de la API.
  callToAction?: ProjectCallToAction;
}

export interface ProjectFilters {
  stages: ProjectStage[];
  focusAreas: string[];
  stack: string[];
}

// ---- Etapa 1: página individual ----

export type ProjectResourceKind = "image" | "document" | "link";

export interface ProjectResource {
  id: string;
  kind: ProjectResourceKind;
  title: string | null;
  url: string; // URL pública ya resuelta (Supabase Storage o external_url)
  mimeType: string | null;
  sizeBytes: number | null;
  displayOrder: number;
}

export type ProjectRoleName = "leader" | "member";

export interface ProjectMember {
  userId: string;
  name: string;
  lastName: string;
  username: string | null;
  role: ProjectRoleName;
}

export interface ProjectDetail extends ProjectItem {
  isArchived: boolean;
  contentMarkdown: string | null;
}

// ---- Etapa 2: trazabilidad ----

export interface ProjectTraceabilityField<T> {
  value: T;
  updatedAt: string | null;
}

export interface ProjectTraceability {
  stage: ProjectTraceabilityField<ProjectStage>;
  currentPhase: ProjectTraceabilityField<string | null>;
  projectType: ProjectTraceabilityField<string | null>;
  hasFunding: ProjectTraceabilityField<boolean>;
  fundingSource: string | null;
  fundingNotes: string | null;
}

export interface ProjectArticle {
  id: string;
  title: string;
  authors: string | null;
  publication: string | null;
  url: string | null;
  publishedAt: string | null;
}

export interface ProjectCongress {
  id: string;
  name: string;
  role: string | null;
  location: string | null;
  url: string | null;
  heldAt: string | null;
}

export interface ProjectTraceabilityComment {
  id: string;
  authorId: string | null;
  authorName: string | null;
  body: string;
  createdAt: string;
}
