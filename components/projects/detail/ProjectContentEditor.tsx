"use client";

import { useRef, useState, type DragEvent } from "react";
import { useCsrf } from "@/hooks/useCsrf";
import type { ProjectDetail, ProjectResource } from "@/lib/types/project.types";

interface ProjectContentEditorProps {
  slug: string;
  project: ProjectDetail;
  resources: ProjectResource[];
  onClose: () => void;
  onProjectChange: (project: ProjectDetail) => void;
  onResourcesChange: (resources: ProjectResource[]) => void;
}

function DropZone({
  label,
  hint,
  accept,
  busy,
  onFile,
}: {
  label: string;
  hint: string;
  accept: string;
  busy: boolean;
  onFile: (file: File) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-colors duration-150 ${
        isDragging ? "border-[color:var(--buttons)] bg-white/5" : "border-white/15 hover:border-white/30"
      } ${busy ? "pointer-events-none opacity-60" : ""}`}
    >
      <p className="font-ubuntu text-sm text-white">{label}</p>
      <p className="mt-1 font-ubuntu text-xs text-white/50">{hint}</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

export default function ProjectContentEditor({
  slug,
  project,
  resources,
  onClose,
  onProjectChange,
  onResourcesChange,
}: ProjectContentEditorProps) {
  const { fetchWithCsrf } = useCsrf();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const uploadFile = async (endpoint: string, file: File) => {
    setBusy(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetchWithCsrf(`/api/projects/${slug}/${endpoint}`, {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || "Error al subir el archivo");
        return;
      }
      onProjectChange(json.data as ProjectDetail);
    } catch {
      setError("Error de red al subir el archivo");
    } finally {
      setBusy(false);
    }
  };

  const uploadResourceFile = async (file: File) => {
    setBusy(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetchWithCsrf(`/api/projects/${slug}/resources`, {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || "Error al subir el recurso");
        return;
      }
      onResourcesChange([...resources, json.data as ProjectResource]);
    } catch {
      setError("Error de red al subir el recurso");
    } finally {
      setBusy(false);
    }
  };

  const addLinkResource = async () => {
    if (!linkUrl.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetchWithCsrf(`/api/projects/${slug}/resources`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: linkUrl.trim(), title: linkTitle.trim() || undefined }),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || "Error al agregar el enlace");
        return;
      }
      onResourcesChange([...resources, json.data as ProjectResource]);
      setLinkTitle("");
      setLinkUrl("");
    } catch {
      setError("Error de red al agregar el enlace");
    } finally {
      setBusy(false);
    }
  };

  const removeResource = async (resourceId: string) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetchWithCsrf(`/api/projects/${slug}/resources/${resourceId}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || "Error al quitar el recurso");
        return;
      }
      onResourcesChange(resources.filter((r) => r.id !== resourceId));
    } catch {
      setError("Error de red al quitar el recurso");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-variable-collection-fondo p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-orbitron text-lg">Editar contenidos</h2>
          <button type="button" onClick={onClose} className="text-white/60 hover:text-white">
            ✕
          </button>
        </div>

        {error && (
          <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        )}

        <div className="space-y-6">
          <div>
            <p className="mb-2 font-ubuntu text-sm text-white/80">Contenido (reemplaza todo el .md actual)</p>
            <DropZone
              label={project.contentMarkdown ? "Reemplazar contenido.md" : "Subir contenido.md"}
              hint="Arrastra un archivo .md o haz clic para elegirlo (máx. 2MB)"
              accept=".md,.markdown,text/markdown"
              busy={busy}
              onFile={(file) => uploadFile("content", file)}
            />
          </div>

          <div>
            <p className="mb-2 font-ubuntu text-sm text-white/80">Banner (reemplaza la imagen actual)</p>
            <DropZone
              label="Subir banner"
              hint="PNG, JPEG, WEBP o GIF (máx. 5MB)"
              accept="image/png,image/jpeg,image/webp,image/gif"
              busy={busy}
              onFile={(file) => uploadFile("banner", file)}
            />
          </div>

          <div>
            <p className="mb-2 font-ubuntu text-sm text-white/80">Recursos (se agregan, no reemplazan)</p>
            <DropZone
              label="Subir imagen o documento"
              hint="Imagen o PDF (máx. 10MB)"
              accept="image/png,image/jpeg,image/webp,image/gif,application/pdf"
              busy={busy}
              onFile={uploadResourceFile}
            />

            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                placeholder="Título del enlace (opcional)"
                value={linkTitle}
                onChange={(e) => setLinkTitle(e.target.value)}
                className="flex-1 rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/40"
              />
              <input
                type="url"
                placeholder="https://..."
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="flex-1 rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/40"
              />
              <button
                type="button"
                disabled={busy || !linkUrl.trim()}
                onClick={addLinkResource}
                className="rounded-lg bg-[color:var(--buttons)] px-4 py-2 text-sm text-white disabled:opacity-50"
              >
                Agregar enlace
              </button>
            </div>

            {resources.length > 0 && (
              <ul className="mt-4 space-y-2">
                {resources.map((resource) => (
                  <li
                    key={resource.id}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm"
                  >
                    <span className="truncate text-white/80">
                      {resource.kind === "link" ? "🔗" : resource.kind === "image" ? "🖼️" : "📄"}{" "}
                      {resource.title || resource.url}
                    </span>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => removeResource(resource.id)}
                      className="ml-3 shrink-0 text-red-300 hover:text-red-200 disabled:opacity-50"
                    >
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
