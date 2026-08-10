import prisma from "@/lib/postgresDriver";
import { getPublicMediaUrl } from "@/lib/supabaseStorage";
import type { ProjectResource, ProjectResourceKind } from "@/lib/types/project.types";

/**
 * Repository de recursos de un proyecto (imágenes/documentos/enlaces), parte de la
 * página pública. Alta incremental — a diferencia del banner/contenido, nunca se reemplazan.
 *
 * @module projectResources.repositories
 */

type ResourceRow = NonNullable<Awaited<ReturnType<typeof prisma.project_resources.findFirst>>>;

function mapResource(row: ResourceRow): ProjectResource {
  const url = row.kind === "link" ? (row.external_url ?? "") : row.storage_path ? getPublicMediaUrl(row.storage_path) : "";
  return {
    id: row.id.toString(),
    kind: row.kind as ProjectResourceKind,
    title: row.title,
    url,
    mimeType: row.mime_type,
    sizeBytes: row.size_bytes,
    displayOrder: row.display_order,
  };
}

export async function listResources(projectId: bigint): Promise<ProjectResource[]> {
  const rows = await prisma.project_resources.findMany({
    where: { project_id: projectId },
    orderBy: [{ display_order: "asc" }, { created_at: "asc" }],
  });
  return rows.map(mapResource);
}

export interface AddResourceData {
  kind: ProjectResourceKind;
  title?: string | null;
  storagePath?: string | null;
  externalUrl?: string | null;
  mimeType?: string | null;
  sizeBytes?: number | null;
  uploadedBy?: bigint | null;
}

export async function addResource(
  projectId: bigint,
  data: AddResourceData,
): Promise<ProjectResource> {
  const count = await prisma.project_resources.count({ where: { project_id: projectId } });
  const row = await prisma.project_resources.create({
    data: {
      project_id: projectId,
      kind: data.kind,
      title: data.title ?? null,
      storage_path: data.storagePath ?? null,
      external_url: data.externalUrl ?? null,
      mime_type: data.mimeType ?? null,
      size_bytes: data.sizeBytes ?? null,
      display_order: count,
      uploaded_by: data.uploadedBy ?? null,
    },
  });
  return mapResource(row);
}

export interface RemovedResource {
  resource: ProjectResource;
  storagePath: string | null;
}

// Incluye storagePath (ademas de la url publica ya resuelta) para que la ruta API pueda
// borrar el archivo del bucket sin tener que reverse-engineer la URL. null si no existia
// / no pertenecia a ese proyecto.
export async function removeResource(
  projectId: bigint,
  resourceId: bigint,
): Promise<RemovedResource | null> {
  const row = await prisma.project_resources.findFirst({
    where: { id: resourceId, project_id: projectId },
  });
  if (!row) return null;

  await prisma.project_resources.delete({ where: { id: row.id } });
  return { resource: mapResource(row), storagePath: row.storage_path };
}
