import prisma from "@/lib/postgresDriver";
import type { Update, CreateUpdateDTO, UpdateUpdateDTO, UpdateFilters, NewsEvent } from "@/lib/types/update.types";

/**
 * Repository para operaciones CRUD de updates/noticias
 * 
 * @module updates.repositories
 */

// Convierte un registro de Prisma al tipo Update

function mapPrismaToUpdate(record: {
  id: bigint;
  slug: string;
  title: string;
  description: string;
  display_date: string;
  published_at: Date;
  tags: string[];
  border_color: string;
  href: string | null;
  is_featured: boolean;
  status: string;
  created_at: Date;
  updated_at: Date;
}): Update {
  return {
    id: record.id.toString(),
    slug: record.slug,
    title: record.title,
    description: record.description,
    display_date: record.display_date,
    published_at: record.published_at.toISOString(),
    tags: record.tags,
    border_color: record.border_color,
    href: record.href,
    is_featured: record.is_featured,
    status: record.status as Update['status'],
    created_at: record.created_at.toISOString(),
    updated_at: record.updated_at.toISOString(),
  };
}

/**
 * Convierte un Update al formato NewsEvent para compatibilidad con componentes existentes
 */
export function mapUpdateToNewsEvent(update: Update): NewsEvent {
  return {
    id: typeof update.id === 'string' ? parseInt(update.id, 10) || update.id : Number(update.id),
    slug: update.slug,
    title: update.title,
    date: update.display_date,
    publishedAt: typeof update.published_at === 'string' 
      ? update.published_at.split('T')[0] 
      : update.published_at.toISOString().split('T')[0],
    description: update.description,
    tags: update.tags,
    borderColor: update.border_color,
    href: update.href || `/updates/${update.slug}`,
  };
}

// Consulta todos los updates publicados, ordenados por fecha

export async function getPublishedUpdates(filters?: UpdateFilters): Promise<Update[]> {
  const { limit, offset, is_featured } = filters || {};

  const updates = await prisma.updates.findMany({
    where: {
      status: 'published',
      ...(is_featured !== undefined && { is_featured }),
    },
    orderBy: [
      { published_at: 'desc' },
      { id: 'desc' },
    ],
    take: limit,
    skip: offset,
  });

  return updates.map(mapPrismaToUpdate);
}

// Consulta update por su slug

export async function getUpdateBySlug(slug: string): Promise<Update | null> {
  const update = await prisma.updates.findUnique({
    where: { slug },
  });

  if (!update) return null;
  return mapPrismaToUpdate(update);
}

// Consulta un update por su ID

export async function getUpdateById(id: string | bigint): Promise<Update | null> {
  const numericId = typeof id === 'string' ? BigInt(id) : id;
  
  const update = await prisma.updates.findUnique({
    where: { id: numericId },
  });

  if (!update) return null;
  return mapPrismaToUpdate(update);
}

/**
 * Obtiene el update destacado más reciente
 */
export async function getFeaturedUpdate(): Promise<Update | null> {
  const update = await prisma.updates.findFirst({
    where: {
      status: 'published',
      is_featured: true,
    },
    orderBy: { published_at: 'desc' },
  });

  if (!update) return null;
  return mapPrismaToUpdate(update);
}

// Consulta los últimos N updates para el landing page

export async function getLatestUpdates(count: number = 3): Promise<NewsEvent[]> {
  const updates = await getPublishedUpdates({ limit: count });
  return updates.map(mapUpdateToNewsEvent);
}

// Cuenta el total de updates publicados

export async function countPublishedUpdates(): Promise<number> {
  return prisma.updates.count({
    where: { status: 'published' },
  });
}

// Crea un nuevo update

export async function createUpdate(data: CreateUpdateDTO): Promise<Update> {
  const update = await prisma.updates.create({
    data: {
      slug: data.slug,
      title: data.title,
      description: data.description,
      display_date: data.display_date,
      published_at: data.published_at ? new Date(data.published_at) : new Date(),
      tags: data.tags,
      border_color: data.border_color || '#454f5e',
      href: data.href || null,
      is_featured: data.is_featured || false,
      status: data.status || 'published',
    },
  });

  return mapPrismaToUpdate(update);
}

// Actualiza un update existente

export async function updateUpdate(id: string | bigint, data: UpdateUpdateDTO): Promise<Update> {
  const numericId = typeof id === 'string' ? BigInt(id) : id;

  const update = await prisma.updates.update({
    where: { id: numericId },
    data: {
      ...(data.slug && { slug: data.slug }),
      ...(data.title && { title: data.title }),
      ...(data.description && { description: data.description }),
      ...(data.display_date && { display_date: data.display_date }),
      ...(data.published_at && { published_at: new Date(data.published_at) }),
      ...(data.tags && { tags: data.tags }),
      ...(data.border_color && { border_color: data.border_color }),
      ...(data.href !== undefined && { href: data.href }),
      ...(data.is_featured !== undefined && { is_featured: data.is_featured }),
      ...(data.status && { status: data.status }),
    },
  });

  return mapPrismaToUpdate(update);
}

// Elimina update (soft delete - cambia status a archived)
export async function deleteUpdate(id: string | bigint): Promise<Update> {
  return updateUpdate(id, { status: 'archived' });
}

// Archiva un update (alias de deleteUpdate para compatibilidad)
export async function archiveUpdate(id: string | bigint): Promise<Update> {
  return deleteUpdate(id);
}

/**
 * Elimina un update permanentemente de la base de datos
 * Ojo: Esta acción es irreversible
 * Usar solo en casos excepcionales
 */
export async function hardDeleteUpdate(id: string | bigint): Promise<void> {
  const numericId = typeof id === 'string' ? BigInt(id) : id;
  
  await prisma.updates.delete({
    where: { id: numericId },
  });
}

// Verifica si slug ya existe
export async function slugExists(slug: string): Promise<boolean> {
  const count = await prisma.updates.count({
    where: { slug },
  });
  return count > 0;
}
