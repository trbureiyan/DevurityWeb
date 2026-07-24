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
import { CACHE_TAGS, CACHE_TTL, activeTTL } from "@/lib/cache-tags";

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

export const getLandingQuickNav     = () => getQuickNavItemsInternal();
export const getLandingProjects     = () => getFeaturedProjectsInternal();
export const getLandingGalleryPreview = () => getGalleryPreviewImagesInternal();

// Noticias del landing — comparte el tag "updates" para invalidación conjunta
export const getLandingNews = unstable_cache(
  async (): Promise<NewsEvent[]> => getLatestUpdates(3),
  ["landing-news"],
  {
    tags:       [CACHE_TAGS.updates],
    revalidate: activeTTL(CACHE_TTL.long),
  }
);
