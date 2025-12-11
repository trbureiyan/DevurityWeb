/**
 * Definiciones centralizadas de types de actualización/noticias
 * @module update.types
 */

// Status de una actualización/noticia

export type UpdateStatus = 'draft' | 'published' | 'archived';

// Update base de la entidad desde db
// Adaptado con el esquema de Prisma para la tabla de updates

export interface Update {
  id: string | bigint;
  slug: string;
  title: string;
  description: string;
  display_date: string;     // Fecha amigable para UI ("13 de agosto 2025")
  published_at: Date | string;
  tags: string[];
  border_color: string;
  href: string | null;
  is_featured: boolean;
  status: UpdateStatus;
  created_at?: Date | string;
  updated_at?: Date | string;
}

// DTO para crear una nueva actualización

export interface CreateUpdateDTO {
  slug: string;
  title: string;
  description: string;
  display_date: string;
  published_at?: Date | string;
  tags: string[];
  border_color?: string;
  href?: string | null;
  is_featured?: boolean;
  status?: UpdateStatus;
}

// DTO para actualizar una update existente

export interface UpdateUpdateDTO {
  slug?: string;
  title?: string;
  description?: string;
  display_date?: string;
  published_at?: Date | string;
  tags?: string[];
  border_color?: string;
  href?: string | null;
  is_featured?: boolean;
  status?: UpdateStatus;
}

// Transformed update item for the feed (frontend-ready)
// Usado por vistas y componentes

export interface UpdateItem {
  id: string;
  title: string;
  excerpt: string;          // Alias
  publishedAt: string;      // ISO date para sorting
  displayDate: string;
  tags: string[];
  borderColor: string;      // camelCase para frontend
  slug: string;
  href: string;             // Never null - defaults to /updates/[slug]
}

// Interfaz NewsEvent para compatibilidad hacia atrás
// Usado por EventsSection y otros componentes

export interface NewsEvent {
  id: number | string;
  slug: string;
  title: string;
  date: string;             // Alias para displayDate
  publishedAt: string;
  description: string;
  tags: string[];
  borderColor: string;
  href: string;
}

// Filtros de query para obtener updates

export interface UpdateFilters {
  status?: UpdateStatus;
  is_featured?: boolean;
  limit?: number;
  offset?: number;
}
