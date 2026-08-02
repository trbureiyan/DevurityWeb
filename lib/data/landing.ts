import { cache } from "react";
import {
  FEATURED_PROJECTS,
  QUICK_NAV_ITEMS,
  type ProjectPreview,
} from "@/lib/constants/landing";
import { GALLERY_IMAGES } from "@/lib/constants/gallery";
import type { QuickNavItem } from "@/lib/types/landing";

// Datos estáticos: memoización por request es suficiente, no necesitan ISR
const getQuickNavItemsInternal = cache(async (): Promise<QuickNavItem[]> => {
  return QUICK_NAV_ITEMS;
});

const getFeaturedProjectsInternal = cache(async (): Promise<ProjectPreview[]> => {
  return FEATURED_PROJECTS;
});

const getGalleryPreviewImagesInternal = cache(async (): Promise<string[]> => {
  return GALLERY_IMAGES.slice(0, 12);
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
 * Retorna hasta 12 imágenes de previsualización para la galería del landing.
 * @returns {Promise<string[]>} URLs de imágenes de galería.
 */
export const getLandingGalleryPreview = () => getGalleryPreviewImagesInternal();
