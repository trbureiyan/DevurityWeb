import { MetadataRoute } from "next";
import { getProjectsCatalog } from "@/lib/data/projects";
import { getUpdatesFeed } from "@/lib/data/updates";

// Sitemap: Genera el sitemap.xml para mejorar SEO y los motores de búsqueda a indexar la pagina.
// force-dynamic: evita que Next.js intente prerenderizar este archivo en build-time,
// lo que causaría un fallo si la DB no está disponible o el schema no está sincronizado.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://devurityweb.vercel.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "",                 freq: "weekly",  priority: 1.0 },
    { path: "/about",           freq: "monthly", priority: 0.9 },
    { path: "/projects",        freq: "weekly",  priority: 0.9 },
    { path: "/updates",         freq: "daily",   priority: 0.8 },
    { path: "/gallery",         freq: "monthly", priority: 0.5 },
    { path: "/help",            freq: "monthly", priority: 0.6 },
    { path: "/help/faq",        freq: "monthly", priority: 0.5 },
    { path: "/help/reglamentos",freq: "monthly", priority: 0.5 },
  ].map(({ path, freq, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: freq as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority,
  }));

  // Rutas dinámicas desde la DB — degradación elegante si la DB no está disponible
  try {
    const [projects, updates] = await Promise.all([
      getProjectsCatalog(),
      getUpdatesFeed(),
    ]);

    const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.id}`,
      lastModified: new Date(project.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    const updateRoutes: MetadataRoute.Sitemap = updates
      .filter((update) => update !== null)
      .map((update) => ({
        url: `${baseUrl}/updates/${update.slug}`,
        lastModified: new Date(update.publishedAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));

    return [...staticRoutes, ...projectRoutes, ...updateRoutes];
  } catch (error) {
    // Si la DB falla (ej: schema desincronizado, conexión caída), retornar solo rutas estáticas
    // para no bloquear el build ni devolver un sitemap vacío.
    console.error("[sitemap] DB query failed, returning static routes only:", error);
    return staticRoutes;
  }
}
