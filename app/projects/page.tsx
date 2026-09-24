import type { Metadata } from "next";
import { getProjectsCatalog } from "@/lib/data/projects";
import ProjectsPageClient from "@/components/projects/ProjectsPageClient";
import type { ProjectItem } from "@/hooks/useProjects";
import { siteIcons, siteOpenGraph, siteTwitter } from "@/lib/constants/metadata";

export const metadata: Metadata = {
  title: "Proyectos | Devurity",
  description:
    "Explora los proyectos de investigación y desarrollo del semillero Devurity: ciberseguridad, software seguro, ciencia de datos y más.",
  icons: siteIcons,
  openGraph: {
    ...siteOpenGraph,
    title: "Proyectos | Devurity",
    description:
      "Explora los proyectos de investigación y desarrollo del semillero Devurity.",
    url: "/projects",
  },
  twitter: siteTwitter,
};

export default async function ProjectsPage() {
  let initialData: ProjectItem[] = [];

  try {
    initialData = (await getProjectsCatalog()) as ProjectItem[];
  } catch (error) {
    console.error("[ProjectsPage] Error al cargar proyectos desde la DB:", error);
  }

  return <ProjectsPageClient initialData={initialData} />;
}
