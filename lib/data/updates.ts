import { unstable_cache } from "next/cache";
import { getPublishedUpdates, getLatestUpdates} from "@/repositories/updates/updates.repositories"; // mapUpdateToNewsEvent # Repositorio de updates deprecado TODO: Si no se va a usar para otra cosa, mover esta función a un helper específico de updates o eliminarla si no se necesita.
import type { UpdateItem, NewsEvent } from "@/lib/types/update.types";

// -- Cache revision para el feed de actualizaciones --

// Ajusta NEXT_PUBLIC_UPDATES_CACHE_REV en desarrollo para invalidar manualmente.
const UPDATES_CACHE_REV = process.env.NEXT_PUBLIC_UPDATES_CACHE_REV ?? "stable";

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

// Cachea y ordena el feed de updates desde la base de datos
// Revalidación cada 6 horas

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
  // Claves de cache: nombre + revisión para invalidación manual
  ["updates-feed", UPDATES_CACHE_REV],
  {
    // Revalidación cada 60 segundos para que los datos aparezcan pronto tras deploy
    revalidate: 60,
  }
);

// Consulta las últimas noticias para el landing page (formato NewsEvent)
// Compatible con EventsSection y componentes de landing

export const getLatestNewsForLanding = unstable_cache(
  async (count: number = 3): Promise<NewsEvent[]> => {
    try {
      return await getLatestUpdates(count);
    } catch (error) {
      console.error("[getLatestNewsForLanding] Error fetching latest news from DB:", error);
      return [];
    }
  },
  ["latest-news-landing", UPDATES_CACHE_REV],
  {
    // Revalidación cada 60 segundos para que los datos aparezcan pronto tras deploy
    revalidate: 60,
  }
);
