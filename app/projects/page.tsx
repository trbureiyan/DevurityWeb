import { getProjectsCatalog } from "@/lib/data/projects";
import ProjectsPageClient from "@/components/projects/ProjectsPageClient";
import type { ProjectItem } from "@/hooks/useProjects";

export default async function ProjectsPage() {
  let initialData: ProjectItem[] = [];

  try {
    initialData = (await getProjectsCatalog()) as ProjectItem[];
  } catch (error) {
    console.error("[ProjectsPage] Error al cargar proyectos desde la DB:", error);
  }

  return <ProjectsPageClient initialData={initialData} />;
}
