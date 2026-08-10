"use client";

import { useEffect, useState } from "react";
import { useCsrf } from "@/hooks/useCsrf";
import { STAGE_LABELS } from "@/hooks/useProjects";
import { VALID_STAGES, type ProjectStage } from "@/lib/types/project.types";
import type { ProjectTraceabilityBundle } from "@/repositories/projects/projectTraceability.repositories";

interface ProjectTrazabilidadTabProps {
  slug: string;
  canEdit: boolean; // admin | auditor
  isAdmin: boolean; // comentarios: solo admin puede agregar
}

function formatTimestamp(value: string | null): string {
  if (!value) return "Sin registrar";
  return `Actualizado ${new Date(value).toLocaleDateString("es-CO")}`;
}

export default function ProjectTrazabilidadTab({ slug, canEdit, isAdmin }: ProjectTrazabilidadTabProps) {
  const { fetchWithCsrf } = useCsrf();
  const [bundle, setBundle] = useState<ProjectTraceabilityBundle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [stage, setStage] = useState<ProjectStage>("incubacion");
  const [currentPhase, setCurrentPhase] = useState("");
  const [projectType, setProjectType] = useState("");
  const [hasFunding, setHasFunding] = useState(false);
  const [fundingSource, setFundingSource] = useState("");
  const [fundingNotes, setFundingNotes] = useState("");

  const [articleForm, setArticleForm] = useState({ title: "", authors: "", url: "" });
  const [congressForm, setCongressForm] = useState({ name: "", role: "", location: "" });
  const [commentBody, setCommentBody] = useState("");

  const refresh = async () => {
    try {
      const res = await fetch(`/api/projects/${slug}/traceability`, { credentials: "include" });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || "Error al cargar la trazabilidad");
        return;
      }
      const data = json.data as ProjectTraceabilityBundle;
      setBundle(data);
      setStage(data.traceability.stage.value);
      setCurrentPhase(data.traceability.currentPhase.value ?? "");
      setProjectType(data.traceability.projectType.value ?? "");
      setHasFunding(data.traceability.hasFunding.value);
      setFundingSource(data.traceability.fundingSource ?? "");
      setFundingNotes(data.traceability.fundingNotes ?? "");
    } catch {
      setError("Error de red al cargar la trazabilidad");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const saveTraceability = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetchWithCsrf(`/api/projects/${slug}/traceability`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage,
          currentPhase: currentPhase || null,
          projectType: projectType || null,
          hasFunding,
          fundingSource: fundingSource || null,
          fundingNotes: fundingNotes || null,
        }),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || "Error al guardar");
        return;
      }
      setBundle(json.data as ProjectTraceabilityBundle);
    } catch {
      setError("Error de red al guardar");
    } finally {
      setSaving(false);
    }
  };

  const addArticle = async () => {
    if (!articleForm.title.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetchWithCsrf(`/api/projects/${slug}/traceability/articles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articleForm),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || "Error al agregar el artículo");
        return;
      }
      setArticleForm({ title: "", authors: "", url: "" });
      await refresh();
    } finally {
      setSaving(false);
    }
  };

  const removeArticle = async (id: string) => {
    setSaving(true);
    try {
      await fetchWithCsrf(`/api/projects/${slug}/traceability/articles/${id}`, { method: "DELETE" });
      await refresh();
    } finally {
      setSaving(false);
    }
  };

  const addCongress = async () => {
    if (!congressForm.name.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetchWithCsrf(`/api/projects/${slug}/traceability/congresses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(congressForm),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || "Error al agregar el congreso");
        return;
      }
      setCongressForm({ name: "", role: "", location: "" });
      await refresh();
    } finally {
      setSaving(false);
    }
  };

  const removeCongress = async (id: string) => {
    setSaving(true);
    try {
      await fetchWithCsrf(`/api/projects/${slug}/traceability/congresses/${id}`, { method: "DELETE" });
      await refresh();
    } finally {
      setSaving(false);
    }
  };

  const addComment = async () => {
    if (!commentBody.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetchWithCsrf(`/api/projects/${slug}/traceability/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: commentBody.trim() }),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || "Error al agregar el comentario");
        return;
      }
      setCommentBody("");
      await refresh();
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="font-ubuntu text-white/60">Cargando trazabilidad…</p>;
  if (!bundle) return <p className="font-ubuntu text-white/60">No se pudo cargar la trazabilidad.</p>;

  const inputClass =
    "w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/40 disabled:opacity-60";

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>
      )}

      <section>
        <h2 className="mb-4 font-orbitron text-sm uppercase tracking-[0.3em] text-variable-collection-link">
          Estado del proyecto
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-white/60">Estado</label>
            <select
              value={stage}
              disabled={!canEdit}
              onChange={(e) => setStage(e.target.value as ProjectStage)}
              className={inputClass}
            >
              {VALID_STAGES.map((s) => (
                <option key={s} value={s}>
                  {STAGE_LABELS[s]}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-white/40">{formatTimestamp(bundle.traceability.stage.updatedAt)}</p>
          </div>

          <div>
            <label className="mb-1 block text-xs text-white/60">Fase actual</label>
            <input
              type="text"
              value={currentPhase}
              disabled={!canEdit}
              onChange={(e) => setCurrentPhase(e.target.value)}
              className={inputClass}
            />
            <p className="mt-1 text-xs text-white/40">{formatTimestamp(bundle.traceability.currentPhase.updatedAt)}</p>
          </div>

          <div>
            <label className="mb-1 block text-xs text-white/60">Tipo de proyecto</label>
            <input
              type="text"
              value={projectType}
              disabled={!canEdit}
              onChange={(e) => setProjectType(e.target.value)}
              className={inputClass}
            />
            <p className="mt-1 text-xs text-white/40">{formatTimestamp(bundle.traceability.projectType.updatedAt)}</p>
          </div>

          <div>
            <label className="mb-1 flex items-center gap-2 text-xs text-white/60">
              <input
                type="checkbox"
                checked={hasFunding}
                disabled={!canEdit}
                onChange={(e) => setHasFunding(e.target.checked)}
              />
              Cuenta con financiación
            </label>
            <p className="mt-1 text-xs text-white/40">{formatTimestamp(bundle.traceability.hasFunding.updatedAt)}</p>
          </div>

          <div>
            <label className="mb-1 block text-xs text-white/60">Fuente de financiación</label>
            <input
              type="text"
              value={fundingSource}
              disabled={!canEdit}
              onChange={(e) => setFundingSource(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs text-white/60">Notas de financiación</label>
            <textarea
              value={fundingNotes}
              disabled={!canEdit}
              onChange={(e) => setFundingNotes(e.target.value)}
              rows={2}
              className={inputClass}
            />
          </div>
        </div>

        {canEdit && (
          <button
            type="button"
            disabled={saving}
            onClick={saveTraceability}
            className="mt-4 rounded-lg bg-[color:var(--buttons)] px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            Guardar cambios
          </button>
        )}
      </section>

      <section>
        <h2 className="mb-4 font-orbitron text-sm uppercase tracking-[0.3em] text-variable-collection-link">
          Artículos publicados
        </h2>
        <ul className="space-y-2">
          {bundle.articles.map((article) => (
            <li
              key={article.id}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm"
            >
              <span className="text-white/80">
                {article.title}
                {article.authors ? ` — ${article.authors}` : ""}
              </span>
              {canEdit && (
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => removeArticle(article.id)}
                  className="text-xs text-red-300 hover:text-red-200 disabled:opacity-50"
                >
                  Quitar
                </button>
              )}
            </li>
          ))}
          {bundle.articles.length === 0 && <p className="text-sm text-white/40">Sin artículos registrados.</p>}
        </ul>
        {canEdit && (
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              placeholder="Título"
              value={articleForm.title}
              onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Autores"
              value={articleForm.authors}
              onChange={(e) => setArticleForm({ ...articleForm, authors: e.target.value })}
              className={inputClass}
            />
            <button
              type="button"
              disabled={saving || !articleForm.title.trim()}
              onClick={addArticle}
              className="shrink-0 rounded-lg bg-[color:var(--buttons)] px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              Agregar
            </button>
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 font-orbitron text-sm uppercase tracking-[0.3em] text-variable-collection-link">
          Congresos
        </h2>
        <ul className="space-y-2">
          {bundle.congresses.map((congress) => (
            <li
              key={congress.id}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm"
            >
              <span className="text-white/80">
                {congress.name}
                {congress.role ? ` — ${congress.role}` : ""}
              </span>
              {canEdit && (
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => removeCongress(congress.id)}
                  className="text-xs text-red-300 hover:text-red-200 disabled:opacity-50"
                >
                  Quitar
                </button>
              )}
            </li>
          ))}
          {bundle.congresses.length === 0 && <p className="text-sm text-white/40">Sin congresos registrados.</p>}
        </ul>
        {canEdit && (
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              placeholder="Nombre del congreso"
              value={congressForm.name}
              onChange={(e) => setCongressForm({ ...congressForm, name: e.target.value })}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Rol (ponencia, poster...)"
              value={congressForm.role}
              onChange={(e) => setCongressForm({ ...congressForm, role: e.target.value })}
              className={inputClass}
            />
            <button
              type="button"
              disabled={saving || !congressForm.name.trim()}
              onClick={addCongress}
              className="shrink-0 rounded-lg bg-[color:var(--buttons)] px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              Agregar
            </button>
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 font-orbitron text-sm uppercase tracking-[0.3em] text-variable-collection-link">
          Comentarios y anotaciones
        </h2>
        <ul className="space-y-3">
          {bundle.comments.map((comment) => (
            <li key={comment.id} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
              <p className="text-white/80">{comment.body}</p>
              <p className="mt-1 text-xs text-white/40">
                {comment.authorName ?? "Anónimo"} · {new Date(comment.createdAt).toLocaleDateString("es-CO")}
              </p>
            </li>
          ))}
          {bundle.comments.length === 0 && <p className="text-sm text-white/40">Sin comentarios todavía.</p>}
        </ul>
        {isAdmin && (
          <div className="mt-3 flex gap-2">
            <textarea
              placeholder="Agregar un comentario…"
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              rows={2}
              className={`flex-1 ${inputClass}`}
            />
            <button
              type="button"
              disabled={saving || !commentBody.trim()}
              onClick={addComment}
              className="shrink-0 rounded-lg bg-[color:var(--buttons)] px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              Comentar
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
