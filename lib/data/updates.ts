import { unstable_cache } from "next/cache";
import { getPublishedUpdates, getLatestUpdates } from "@/repositories/updates/updates.repositories";
import type { UpdateItem, NewsEvent } from "@/lib/types/update.types";
import { CACHE_TAGS, CACHE_TTL, activeTTL } from "@/lib/cache-tags";

// Re-export types para compatibilidad con imports existentes
export type { UpdateItem, NewsEvent };

// Transforma un Update de la DB al formato UpdateItem para el frontend
function mapToUpdateItem(update: {
  id: string | bigint;
  slug: string;
  title: string;
  description: string;
  display_date: string;
  published_at: Date | string;
  tags: string[];
  border_color: string;
  href: string | null;
}): UpdateItem {
  const slug = update.slug.trim();
  const rawHref = update.href?.trim() || '';
  const href = rawHref && rawHref !== '#' ? rawHref : `/updates/${slug}`;

  return {
    id: String(update.id),
    title: update.title,
    excerpt: update.description,
    publishedAt: typeof update.published_at === 'string'
      ? update.published_at
      : update.published_at.toISOString(),
    displayDate: update.display_date,
    tags: update.tags,
    borderColor: update.border_color,
    slug,
    href,
  };
}

// Feed completo de updates publicados, cacheado con tag para invalidación bajo demanda
export const getUpdatesFeed = unstable_cache(
  async (): Promise<UpdateItem[]> => {
    try {
      const updates = await getPublishedUpdates();
      return updates.map(mapToUpdateItem);
    } catch (error) {
      console.error("[getUpdatesFeed] Error fetching updates from DB:", error);
      return [];
    }
  },
  ["updates-feed"],
  {
    tags:       [CACHE_TAGS.updates],
    revalidate: activeTTL(CACHE_TTL.long),
  }
);

// Últimas N noticias para el landing page (formato NewsEvent)
export const getLatestNewsForLanding = unstable_cache(
  async (count: number = 3): Promise<NewsEvent[]> => {
    try {
      return await getLatestUpdates(count);
    } catch (error) {
      console.error("[getLatestNewsForLanding] Error fetching latest news from DB:", error);
      return [];
    }
  },
  ["latest-news-landing"],
  {
    tags:       [CACHE_TAGS.updates],
    revalidate: activeTTL(CACHE_TTL.medium),
  }
);
