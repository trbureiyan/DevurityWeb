import { cache } from "react";
import { unstable_cache } from "next/cache";

import {
  FEATURED_PROJECTS,
  QUICK_NAV_ITEMS,
  type ProjectPreview,
} from "@/lib/constants/landing";
import { LATEST_NEWS, type NewsEvent } from "@/lib/constants/updates";
import { GALLERY_IMAGES } from "@/lib/constants/gallery";
import type { QuickNavItem } from "@/lib/types/landing";

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
  return [...LATEST_NEWS].sort((a, b) => {
    const dateDiff = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

    if (dateDiff !== 0) {
      return dateDiff;
    }

    return b.id - a.id;
  });
};

export const getLandingQuickNav = () => getQuickNavItemsInternal();

export const getLandingProjects = () => getFeaturedProjectsInternal();

export const getLandingGalleryPreview = () => getGalleryPreviewImagesInternal();

export const getLandingNews = unstable_cache(getLatestNewsInternal, ["landing-news"], {
  revalidate: 60 * 60 * 24 * 7,
});
