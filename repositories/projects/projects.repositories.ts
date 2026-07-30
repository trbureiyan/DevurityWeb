import prisma from "@/lib/postgresDriver";
import type { projects } from "@/lib/generated/prisma";

export interface CreateProjectDTO {
  title: string;
  description: string;
  stage?: string;
  focus_areas?: string[];
  stack?: string[];
  hero_image?: string | null;
  cta_label?: string | null;
  cta_href?: string | null;
  start_date?: Date | null;
  is_archived?: boolean;
}

export interface UpdateProjectDTO {
  title?: string;
  description?: string;
  stage?: string;
  focus_areas?: string[];
  stack?: string[];
  hero_image?: string | null;
  cta_label?: string | null;
  cta_href?: string | null;
  start_date?: Date | null;
  is_archived?: boolean;
  slug?: string;
}

/**
 * Sanitiza una cadena de texto para convertirla en un slug válido.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD") // Descompone caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Elimina acentos
    .trim()
    .replace(/\s+/g, "-") // Reemplaza espacios con guiones
    .replace(/[^\w\-]+/g, "") // Elimina caracteres no alfanuméricos
    .replace(/\-\-+/g, "-"); // Colapsa guiones repetidos
}

/**
 * Verifica si un slug ya existe en la base de datos, con opción de excluir un ID específico.
 */
export async function slugExists(slug: string, excludeId?: bigint): Promise<boolean> {
  const count = await prisma.projects.count({
    where: {
      slug,
      ...(excludeId !== undefined && { id: { not: excludeId } }),
    },
  });
  return count > 0;
}

/**
 * Genera un slug único resolviendo colisiones.
 */
export async function generateUniqueSlug(title: string): Promise<string> {
  const baseSlug = slugify(title);
  if (!baseSlug) {
    return `project-${Math.random().toString(36).substring(2, 8)}`;
  }
  let slug = baseSlug;
  let exists = await slugExists(slug);
  let counter = 1;
  while (exists) {
    const suffix = Math.random().toString(36).substring(2, 6);
    slug = `${baseSlug}-${suffix}`;
    exists = await slugExists(slug);
    counter++;
    if (counter > 10) {
      slug = `${baseSlug}-${Date.now()}`;
      break;
    }
  }
  return slug;
}

/**
 * Busca un proyecto por su ID de base de datos (BigInt).
 */
export async function getProjectById(id: bigint): Promise<projects | null> {
  return prisma.projects.findUnique({
    where: { id },
  });
}

/**
 * Busca un proyecto por su campo slug.
 */
export async function getProjectBySlug(slug: string): Promise<projects | null> {
  return prisma.projects.findUnique({
    where: { slug },
  });
}

/**
 * Crea un proyecto persistente y genera su slug único automáticamente si no se especifica.
 */
export async function createProject(data: CreateProjectDTO): Promise<projects> {
  const slug = await generateUniqueSlug(data.title);
  
  return prisma.projects.create({
    data: {
      slug,
      title: data.title,
      description: data.description,
      stage: data.stage ?? "incubacion",
      focus_areas: data.focus_areas ?? [],
      stack: data.stack ?? [],
      hero_image: data.hero_image ?? null,
      cta_label: data.cta_label ?? null,
      cta_href: data.cta_href ?? null,
      start_date: data.start_date ?? new Date(),
      is_archived: data.is_archived ?? false,
    },
  });
}

/**
 * Actualiza un proyecto por su ID de base de datos (BigInt).
 */
export async function updateProject(id: bigint, data: UpdateProjectDTO): Promise<projects> {
  return prisma.projects.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.stage !== undefined && { stage: data.stage }),
      ...(data.focus_areas !== undefined && { focus_areas: data.focus_areas }),
      ...(data.stack !== undefined && { stack: data.stack }),
      ...(data.hero_image !== undefined && { hero_image: data.hero_image }),
      ...(data.cta_label !== undefined && { cta_label: data.cta_label }),
      ...(data.cta_href !== undefined && { cta_href: data.cta_href }),
      ...(data.start_date !== undefined && { start_date: data.start_date }),
      ...(data.is_archived !== undefined && { is_archived: data.is_archived }),
      ...(data.slug !== undefined && { slug: data.slug }),
    },
  });
}

/**
 * Elimina físicamente un proyecto por su ID de base de datos (BigInt).
 */
export async function hardDeleteProject(id: bigint): Promise<void> {
  await prisma.projects.delete({
    where: { id },
  });
}
