"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import type { ProjectDetail, ProjectResource } from "@/lib/types/project.types";
import ProjectContentEditor from "./ProjectContentEditor";

interface ProjectPageTabProps {
  slug: string;
  project: ProjectDetail;
  canEdit: boolean;
  onProjectChange: (project: ProjectDetail) => void;
}

export default function ProjectPageTab({ slug, project, canEdit, onProjectChange }: ProjectPageTabProps) {
  const [resources, setResources] = useState<ProjectResource[]>([]);
  const [editorOpen, setEditorOpen] = useState(false);

  const refreshResources = useCallback(async () => {
    try {
      const res = await fetch(`/api/projects/${slug}/resources`);
      const json = await res.json();
      if (json.success) setResources(json.data as ProjectResource[]);
    } catch (error) {
      console.error("Error cargando recursos:", error);
    }
  }, [slug]);

  useEffect(() => {
    refreshResources();
  }, [refreshResources]);

  const images = resources.filter((r) => r.kind === "image");
  const documentsAndLinks = resources.filter((r) => r.kind !== "image");

  return (
    <div className="mx-auto max-w-4xl">
      {canEdit && (
        <div className="mb-6 flex justify-end">
          <button
            type="button"
            onClick={() => setEditorOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-black/30 px-4 py-2 text-sm font-ubuntu text-white transition-colors duration-150 hover:border-white/30"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Editar contenidos
          </button>
        </div>
      )}

      {project.heroImage && (
        <div className="relative mb-8 aspect-[21/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30">
          <Image src={project.heroImage} alt={`Banner de ${project.title}`} fill className="object-cover" />
        </div>
      )}

      {project.contentMarkdown ? (
        <article className="prose prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
            {project.contentMarkdown}
          </ReactMarkdown>
        </article>
      ) : (
        <p className="font-ubuntu text-white/60">
          {canEdit
            ? "Este proyecto todavia no tiene contenido. Usa \"Editar contenidos\" para subir un archivo .md."
            : "Este proyecto todavia no tiene contenido publicado."}
        </p>
      )}

      {images.length > 0 && (
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {images.map((resource) => (
            <div
              key={resource.id}
              className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black/30"
            >
              <Image
                src={resource.url}
                alt={resource.title || project.title}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {documentsAndLinks.length > 0 && (
        <div className="mt-10">
          <h2 className="font-orbitron text-sm uppercase tracking-[0.3em] text-variable-collection-link">
            Recursos
          </h2>
          <ul className="mt-4 space-y-2">
            {documentsAndLinks.map((resource) => (
              <li key={resource.id}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-ubuntu text-variable-collection-link transition-colors duration-150 hover:text-white"
                >
                  {resource.kind === "link" ? "🔗" : "📄"} {resource.title || resource.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {editorOpen && (
        <ProjectContentEditor
          slug={slug}
          project={project}
          resources={resources}
          onClose={() => setEditorOpen(false)}
          onProjectChange={onProjectChange}
          onResourcesChange={setResources}
        />
      )}
    </div>
  );
}
