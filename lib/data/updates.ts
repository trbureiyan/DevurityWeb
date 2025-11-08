import { unstable_cache } from "next/cache";
import { LATEST_NEWS, type NewsEvent } from "@/lib/constants/updates";

// -- Cache revision para el feed de actualizaciones --

// Ajusta NEXT_PUBLIC_UPDATES_CACHE_REV en desarrollo para invalidar manualmente.
const UPDATES_CACHE_REV = process.env.NEXT_PUBLIC_UPDATES_CACHE_REV ?? "stable";
// Si estás en desarrollo, usa una cadena única para forzar la recarga en cada llamada
// const UPDATES_CACHE_REV = process.env.NODE_ENV === "development" ? String(Date.now()) : (process.env.NEXT_PUBLIC_UPDATES_CACHE_REV ?? "stable");

// -- Tipos y mapeo de datos --

// Definición del item del feed de actualizaciones
export interface UpdateItem {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  displayDate: string;
  tags: string[];
  borderColor: string;
  slug: string;
  href: string;
}

// Mapea los items de NewsEvent al formato UpdateItem
const mapNewsToUpdates = (news: NewsEvent[]): UpdateItem[] => {
  return news.map((item) => {
    // Normalización de slug y href (fallback a la página interna si no hay href válido)
    const slug = item.slug.trim();
    const rawHref = item.href.trim();
    const href = rawHref && rawHref !== "#" ? rawHref : `/updates/${slug}`;

    // Validaciones básicas
    if (!slug) {
      throw new Error(`News item with id ${item.id} is missing a slug.`);
    }
    if (!href) {
      throw new Error(`News item with id ${item.id} is missing an href.`);
    }

    // Construcción del objeto final
    return {
      id: String(item.id),
      title: item.title,
      excerpt: item.description,
      publishedAt: item.publishedAt, // fecha ISO para ordenamiento
      displayDate: item.date,        // fecha amigable para UI
      tags: item.tags,
      borderColor: item.borderColor,
      slug,
      href,
    };
  });
};

// Cachea y ordena el feed (por fecha desc y luego por id desc para desempates)
export const getUpdatesFeed = unstable_cache(async (): Promise<UpdateItem[]> => {
  const updates = mapNewsToUpdates(LATEST_NEWS);

  return updates.sort((a, b) => {
    const dateDiff = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    if (dateDiff !== 0) return dateDiff;
    return Number(b.id) - Number(a.id);
  });
},
// Claves de cache: nombre + revisión para invalidación manual
["updates-feed", UPDATES_CACHE_REV],
{
  // Revalidación de 6 horas
  revalidate: 60 * 60 * 6,
});
