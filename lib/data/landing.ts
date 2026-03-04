import { cache } from "react";
import { unstable_cache } from "next/cache";
import {
  FEATURED_PROJECTS,
  QUICK_NAV_ITEMS,
  type ProjectPreview,
} from "@/lib/constants/landing";
import { getLatestUpdates } from "@/repositories/updates/updates.repositories";
import { GALLERY_IMAGES } from "@/lib/constants/gallery";
import type { QuickNavItem } from "@/lib/types/landing";
import type { NewsEvent } from "@/lib/types/update.types";

// Funciones internas cacheadas para datos del landing
const getQuickNavItemsInternal = cache(async (): Promise<QuickNavItem[]> => {
  return QUICK_NAV_ITEMS;
});

const getFeaturedProjectsInternal = cache(async (): Promise<ProjectPreview[]> => {
  return FEATURED_PROJECTS;
});

const getGalleryPreviewImagesInternal = cache(async (): Promise<string[]> => {
  return GALLERY_IMAGES.slice(0, 12);
});

const getLatestNewsInternal = async (): Promise<NewsEvent[]> => {
  // Obtener las últimas 3 noticias desde la base de datos
  return getLatestUpdates(3);
};

export const getLandingQuickNav = () => getQuickNavItemsInternal();

export const getLandingProjects = () => getFeaturedProjectsInternal();

export const getLandingGalleryPreview = () => getGalleryPreviewImagesInternal();

export const getLandingNews = unstable_cache(getLatestNewsInternal, ["landing-news"], {
  revalidate: 21600, // Revalidar cada 6 horas | 60 * 60 * 6
});
