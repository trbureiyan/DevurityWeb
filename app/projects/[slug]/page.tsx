import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectsCatalog } from "@/lib/data/projects";
import { getProjectBySlug } from "@/repositories/projects/projects.repositories";
import { siteIcons } from "@/lib/constants/metadata";
import ProjectDetailClient from "@/components/projects/detail/ProjectDetailClient";

// Pagina individual del proyecto: vista publica tipo README con pestanas
// Page / Responsables / Trazabilidad. Reemplaza el stub estatico anterior.

export const revalidate = 21600;

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const projects = await getProjectsCatalog();
    return projects.map((project) => ({ slug: project.id }));
  } catch (error) {
    console.error("[generateStaticParams] Error al cargar proyectos:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project || project.isArchived) {
    return {
      title: "Proyecto no encontrado | Devurity",
      icons: siteIcons,
    };
  }

  return {
    title: `${project.title} | Devurity`,
    description: project.summary,
    icons: siteIcons,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project || project.isArchived) {
    notFound();
  }

  return <ProjectDetailClient slug={slug} initialProject={project} />;
}
