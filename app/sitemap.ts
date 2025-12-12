import { MetadataRoute } from "next";
import { getProjectsCatalog } from "@/lib/data/projects";
import { getUpdatesFeed } from "@/lib/data/updates";

// Sitemap: General el sitemap.xml para mejorar SEO y los motores de búsqueda a indexar la pagina.

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://devurity.com";

  // Rutas estáticas principales
  const routes = [
    "",
    "/about",
    "/projects",
    "/updates",
    "/gallery",
    "/help",
    "/help/faq",
    "/help/reglamentos",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Proyectos dinámicos
  const projects = await getProjectsCatalog();
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`, // Asumiendo que la ruta es por ID, verificar si es slug
    lastModified: new Date(project.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Actualizaciones dinámicas
  const updates = await getUpdatesFeed();
  const updateRoutes = updates
    .filter((update) => update !== null)
    .map((update) => ({
      url: `${baseUrl}/updates/${update.slug}`,
      lastModified: new Date(update.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [...routes, ...projectRoutes, ...updateRoutes];
}
