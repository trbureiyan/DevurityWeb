import { cache } from "react";
import { unstable_cache } from "next/cache";
import {
  FEATURED_PROJECTS,
  QUICK_NAV_ITEMS,
  type ProjectPreview,
} from "@/lib/constants/landing";
import { getLatestUpdates } from "@/repositories/updates/updates.repositories";
import { getGalleryImageUrls } from "@/lib/data/gallery";
import type { QuickNavItem } from "@/lib/types/landing";
import type { NewsEvent } from "@/lib/types/update.types";
import { CACHE_TAGS, CACHE_TTL, activeTTL } from "@/lib/cache-tags";

// Datos estáticos: memoización por request es suficiente, no necesitan ISR
const getQuickNavItemsInternal = cache(async (): Promise<QuickNavItem[]> => {
  return QUICK_NAV_ITEMS;
});

const getFeaturedProjectsInternal = cache(async (): Promise<ProjectPreview[]> => {
  return FEATURED_PROJECTS;
});

/**
 * Retorna los elementos de navegación rápida del landing (datos estáticos).
 * @returns {Promise<QuickNavItem[]>} Lista de ítems de navegación.
 */
export const getLandingQuickNav     = () => getQuickNavItemsInternal();

/**
 * Retorna los proyectos destacados del landing (datos estáticos).
 * @returns {Promise<ProjectPreview[]>} Lista de proyectos en preview.
 */
export const getLandingProjects     = () => getFeaturedProjectsInternal();

/**
 * Retorna hasta 12 imágenes de previsualización para la galería del landing,
 * cargadas en vivo desde la DB/Storage.
 * @returns {Promise<string[]>} URLs de imágenes de galería.
 */
export const getLandingGalleryPreview = async (): Promise<string[]> => {
  const images = await getGalleryImageUrls();
  return images.slice(0, 12);
};

/**
 * Obtiene las últimas 3 noticias/eventos desde la BD con caché ISR.
 * Comparte el tag "updates" para invalidación conjunta con otras partes del sitio.
 *
 * @returns {Promise<NewsEvent[]>} Lista de noticias recientes.
 * @throws Si la consulta a la base de datos falla — propaga la excepción.
 */
export const getLandingNews = unstable_cache(
  async (): Promise<NewsEvent[]> => getLatestUpdates(3),
  ["landing-news"],
  {
    tags:       [CACHE_TAGS.updates],
    revalidate: activeTTL(CACHE_TTL.long),
  }
);
