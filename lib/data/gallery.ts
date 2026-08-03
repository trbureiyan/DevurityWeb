import { unstable_cache } from "next/cache";
import { listGalleryImages } from "@/repositories/gallery/gallery.repositories";
import type { GalleryImage } from "@/lib/types/gallery.types";
import { CACHE_TAGS, CACHE_TTL, activeTTL } from "@/lib/cache-tags";

// Feed completo de imágenes de la galería, cacheado con tag para invalidación bajo demanda
export const getGalleryFeed = unstable_cache(
  async (): Promise<GalleryImage[]> => {
    try {
      return await listGalleryImages();
    } catch (error) {
      console.error("[getGalleryFeed] Error fetching gallery images from DB:", error);
      return [];
    }
  },
  ["gallery-feed"],
  {
    tags:       [CACHE_TAGS.gallery],
    revalidate: activeTTL(CACHE_TTL.long),
  },
);

// URLs públicas de la galería para el <GalleryClient> y el preview del landing
export async function getGalleryImageUrls(): Promise<string[]> {
  const images = await getGalleryFeed();
  return images.map((image) => image.publicUrl);
}
