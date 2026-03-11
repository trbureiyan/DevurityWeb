"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  useProjects,
  STAGE_LABELS,
  STAGE_COLORS,
  type ProjectItem,
  type ProjectStage,
} from "@/hooks/useProjects";
import { IMAGES } from "@/public/images";

// ============ UTILIDADES ============
const ACCENT_COLOR = "#b20403";

const projectDateFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const formatProjectDate = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return projectDateFormatter.format(date);
};

const todayISO = (): string => new Date().toISOString().split("T")[0];

// ============ FUNCIONES AUXILIARES ============
const isExternalHref = (href?: string): boolean =>
  typeof href === "string" &&
  href !== "#" &&
  !href.startsWith("/") &&
  !href.startsWith("#");

// ============ FORMULARIO VACÍO ============
const emptyForm = {
  title: "",
  summary: "",
  stage: "incubacion" as ProjectStage,
  focusAreas: "",
  stack: "",
  updatedAt: "",
  ctaLabel: "",
  ctaHref: "",
};

// ============ PANEL DE EDICIÓN ============
interface EditPanelProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectItem[];
  onAdd: (p: ProjectItem) => void;
  onEdit: (p: ProjectItem) => void;
  onDelete: (id: string) => void;
}

function EditPanel({ isOpen, onClose, projects, onAdd, onEdit, onDelete }: EditPanelProps) {
  const [mode, setMode] = useState<"list" | "add" | "edit">("list");
  const [editingItem, setEditingItem] = useState<ProjectItem | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const resetToList = () => {
    setMode("list");
    setEditingItem(null);
    setFormData(emptyForm);
  };

  const handleStartEdit = (item: ProjectItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      summary: item.summary,
      stage: item.stage,
      focusAreas: item.focusAreas.join(", "),
      stack: item.stack.join(", "),
      updatedAt: item.updatedAt,
      ctaLabel: item.callToAction?.label || "",
      ctaHref: item.callToAction?.href || "",
    });
    setMode("edit");
  };

  const handleStartAdd = () => {
    setEditingItem(null);
    setFormData({ ...emptyForm, updatedAt: todayISO() });
    setMode("add");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const focusAreas = formData.focusAreas.split(",").map((s) => s.trim()).filter(Boolean);
    const stack = formData.stack.split(",").map((s) => s.trim()).filter(Boolean);
    const callToAction =
      formData.ctaLabel && formData.ctaHref
        ? { label: formData.ctaLabel, href: formData.ctaHref }
        : undefined;

    if (mode === "add") {
      const newProject: ProjectItem = {
        id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        title: formData.title,
        summary: formData.summary,
        stage: formData.stage,
        focusAreas,
        stack,
        updatedAt: formData.updatedAt || todayISO(),
        heroImage: null,
        isLocal: true,
        callToAction,
      };
      onAdd(newProject);
    } else if (mode === "edit" && editingItem) {
      onEdit({
        ...editingItem,
        title: formData.title,
        summary: formData.summary,
        stage: formData.stage,
        focusAreas,
        stack,
        updatedAt: formData.updatedAt || editingItem.updatedAt,
        callToAction,
      });
    }
    resetToList();
  };

  if (!isOpen) return null;

  const inputCls =
    "w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white font-ubuntu focus:border-red-500/50 focus:outline-none transition-colors text-sm";
  const labelCls = "block font-ubuntu text-xs text-white/50 uppercase tracking-wider";

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel lateral */}
      <aside className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-zinc-950 border-l border-white/10 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-zinc-900/80">
          <div className="flex items-center gap-3">
            {mode !== "list" && (
              <button
                onClick={resetToList}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <h3 className="font-orbitron text-lg font-bold text-white">
              {mode === "list" && "Gestionar proyectos"}
              {mode === "add" && "Agregar proyecto"}
              {mode === "edit" && "Editar proyecto"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* ——— LISTA ——— */}
          {mode === "list" && (
            <div className="p-5 space-y-4">
              {/* Botón agregar */}
              <button
                onClick={handleStartAdd}
                className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl border border-dashed border-red-600/40 hover:border-red-600/80 bg-red-600/5 hover:bg-red-600/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600/30 transition-colors">
                  <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="font-ubuntu text-sm text-white/70 group-hover:text-white transition-colors uppercase tracking-wider">
                  Agregar nuevo proyecto
                </span>
              </button>

              {/* Lista */}
              <div className="space-y-3">
                <p className="font-ubuntu text-xs uppercase tracking-widest text-white/30 px-1">
                  {projects.length} proyectos
                </p>
                {projects.map((item) => (
                  <div
                    key={item.id}
                    className="group flex items-start gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        {item.isLocal && (
                          <span className="text-[10px] text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-ubuntu uppercase tracking-wider">
                            local
                          </span>
                        )}
                        <span className={`text-[10px] border px-2 py-0.5 rounded-full font-ubuntu uppercase tracking-wider ${STAGE_COLORS[item.stage]}`}>
                          {STAGE_LABELS[item.stage]}
                        </span>
                        <p className="font-ubuntu text-[11px] text-white/30 uppercase tracking-wider">
                          {formatProjectDate(item.updatedAt)}
                        </p>
                      </div>
                      <p className="font-orbitron text-sm text-white truncate">{item.title}</p>
                      <p className="font-ubuntu text-xs text-white/40 mt-1 line-clamp-2">{item.summary}</p>
                      {item.focusAreas.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.focusAreas.slice(0, 3).map((a) => (
                            <span key={a} className="text-[10px] text-white/30 border border-white/10 px-1.5 py-0.5 rounded-full">
                              #{a}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleStartEdit(item)}
                        title="Editar"
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 text-white/60 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>

                      {confirmDeleteId === item.id ? (
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => { onDelete(item.id); setConfirmDeleteId(null); }}
                            className="w-8 h-8 rounded-full bg-red-600/30 hover:bg-red-600/60 border border-red-600/40 flex items-center justify-center transition-colors"
                            title="Confirmar"
                          >
                            <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
                            title="Cancelar"
                          >
                            <svg className="w-3.5 h-3.5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(item.id)}
                          title="Eliminar"
                          className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-600/30 flex items-center justify-center transition-colors"
                        >
                          <svg className="w-3.5 h-3.5 text-white/40 hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ——— FORMULARIO (ADD / EDIT) ——— */}
          {(mode === "add" || mode === "edit") && (
            <form onSubmit={handleSubmit} className="p-5 space-y-5">
              <div className="space-y-2">
                <label className={labelCls}>Título *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={inputCls}
                  placeholder="Ej: SecOps Honeynet"
                />
              </div>

              <div className="space-y-2">
                <label className={labelCls}>Resumen *</label>
                <textarea
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  rows={4}
                  className={`${inputCls} resize-none`}
                  placeholder="Descripción breve del proyecto..."
                />
              </div>

              <div className="space-y-2">
                <label className={labelCls}>Etapa *</label>
                <select
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value as ProjectStage })}
                  className={`${inputCls} [color-scheme:dark]`}
                >
                  {Object.entries(STAGE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className={labelCls}>Áreas de enfoque (separadas por coma) *</label>
                <input
                  type="text"
                  required
                  value={formData.focusAreas}
                  onChange={(e) => setFormData({ ...formData, focusAreas: e.target.value })}
                  className={inputCls}
                  placeholder="Ciberseguridad, Agrotech, Salud"
                />
              </div>

              <div className="space-y-2">
                <label className={labelCls}>Stack tecnológico (separado por coma)</label>
                <input
                  type="text"
                  value={formData.stack}
                  onChange={(e) => setFormData({ ...formData, stack: e.target.value })}
                  className={inputCls}
                  placeholder="Python, React, Node.js"
                />
              </div>

              <div className="space-y-2">
                <label className={labelCls}>Fecha de actualización</label>
                <input
                  type="date"
                  value={formData.updatedAt}
                  onChange={(e) => setFormData({ ...formData, updatedAt: e.target.value })}
                  className={`${inputCls} [color-scheme:dark]`}
                />
              </div>

              <div className="space-y-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                <p className={labelCls}>Call to action (opcional)</p>
                <input
                  type="text"
                  value={formData.ctaLabel}
                  onChange={(e) => setFormData({ ...formData, ctaLabel: e.target.value })}
                  className={inputCls}
                  placeholder="Ej: Ver repositorio"
                />
                <input
                  type="text"
                  value={formData.ctaHref}
                  onChange={(e) => setFormData({ ...formData, ctaHref: e.target.value })}
                  className={inputCls}
                  placeholder="https://..."
                />
              </div>

              <div className="flex gap-3 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={resetToList}
                  className="flex-1 py-3 border border-white/20 hover:border-white/40 text-white/70 hover:text-white rounded-full font-ubuntu text-xs uppercase tracking-wider transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-ubuntu text-xs uppercase tracking-wider transition-all hover:shadow-[0_0_20px_rgba(178,4,3,0.5)]"
                >
                  {mode === "add" ? "Guardar" : "Actualizar"}
                </button>
              </div>
            </form>
          )}
        </div>
      </aside>
    </>
  );
}

// ============ PÁGINA PRINCIPAL ============
interface ProjectsPageClientProps {
  initialData: ProjectItem[];
}

export default function ProjectsPageClient({ initialData }: ProjectsPageClientProps) {
  const { allProjects, addProject, editProject, deleteProject, filters } = useProjects(initialData);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const sortedProjects = [...allProjects].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const highlight = sortedProjects[0];
  const timeline = sortedProjects.slice(1);
  const quickPanelProjects = sortedProjects.slice(0, 12);
  const totalProjects = sortedProjects.length;
  const totalFocusAreas = filters.focusAreas.length;
  const totalStacks = filters.stack.length;
  const currentYear = new Date().getFullYear();

  const hasMore = visibleCount < timeline.length;
  const visibleTimeline = timeline.slice(0, visibleCount);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 6, timeline.length));
      setIsLoading(false);
    }, 500);
  };

  const handleLoadAll = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(timeline.length);
      setIsLoading(false);
    }, 500);
  };

  const highlightHref = highlight?.callToAction?.href || "#";
  const highlightIsExternal = isExternalHref(highlightHref);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* ═══ Hero Section ═══ */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={IMAGES.about.background}
            alt="Projects background"
            fill
            priority
            className="object-cover scale-110 animate-zoom-in"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/20 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/90" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse" />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-bounce" />
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-red-400 rounded-full animate-pulse delay-300" />
          </div>
        </div>

        <div className="relative h-full flex flex-col items-center justify-center px-6 pt-20">
          <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:block">
            <div className="space-y-4">
              <div className="w-px h-20 bg-gradient-to-b from-transparent via-white to-transparent mx-auto" />
              <div className="text-white/60 text-sm rotate-90 origin-center whitespace-nowrap mt-8">
                SCROLL TO EXPLORE
              </div>
            </div>
          </div>

          <div className="text-center space-y-6">
            <span className="inline-flex items-center rounded-full border border-white/10 px-6 py-2 text-sm font-ubuntu uppercase tracking-[0.2em] text-white/80 bg-black/20 backdrop-blur-sm animate-fade-in">
              Portafolio Devurity {currentYear}
            </span>
            <h1 className="font-orbitron font-bold text-6xl md:text-8xl lg:text-9xl text-white tracking-wider text-center animate-fade-in relative">
              <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent animate-gradient-x">
                PROYECTOS Y
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent animate-gradient-x">
                SOLUCIONES
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-shine" />
            </h1>
            <div className="flex justify-center items-center gap-4 mt-8">
              <div className="w-8 h-px bg-white/30" />
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              <div className="w-8 h-px bg-white/30" />
            </div>
            <p className="text-xl md:text-2xl text-white/80 font-light tracking-widest animate-fade-up delay-300 mt-6">
              <span className="text-red-500 font-semibold">{totalProjects}</span> PROYECTOS ACTIVOS
            </p>
          </div>

          <div className="absolute bottom-16 animate-bounce">
            <div className="flex flex-col items-center gap-2">
              <div className="text-white/50 text-sm tracking-widest">EXPLORAR</div>
              <svg className="w-8 h-8 text-white/60" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Sección destacada + Agenda rápida ═══ */}
      <section className="relative bg-black py-24 -mt-px">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-16 items-start">

            {/* Left - Contenido destacado */}
            <div className="space-y-8">
              <div className="flex items-center gap-2 mb-12">
                <div className="flex gap-1">
                  <div className="w-16 h-1 bg-white" />
                  <div className="w-16 h-1 bg-white" />
                  <div className="w-16 h-1 bg-white" />
                  <div className="w-8 h-1 bg-white/40" />
                  <div className="w-8 h-1 bg-white/40" />
                </div>
              </div>
              <span className="inline-flex items-center rounded-full border border-white/10 px-6 py-2 text-sm font-ubuntu uppercase tracking-[0.2em] text-red-500 bg-black/20 backdrop-blur-sm">
                Proyecto Destacado
              </span>
              <h2 className="text-6xl font-bold tracking-wider mb-6">
                <span className="text-white">{highlight?.title}</span>
                <div className="h-1 w-24 bg-[#b20403] mt-2" />
              </h2>
              <div className="border-l-4 pl-6 space-y-4" style={{ borderColor: ACCENT_COLOR }}>
                <p className="text-lg text-gray-300 leading-relaxed">{highlight?.summary}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className={`text-xs font-ubuntu uppercase tracking-wider border px-3 py-1.5 rounded-full ${STAGE_COLORS[highlight?.stage || "incubacion"]}`}>
                    {STAGE_LABELS[highlight?.stage || "incubacion"]}
                  </span>
                  {highlight?.focusAreas.map((area) => (
                    <span key={area} className="rounded-full border border-white/10 px-4 py-1.5 text-xs text-white/70">
                      #{area}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <div className="flex-1 rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
                  <p className="font-ubuntu text-xs uppercase tracking-[0.25em] text-white/50">Última actualización</p>
                  <p className="font-orbitron text-2xl text-white mt-2">{highlight && formatProjectDate(highlight.updatedAt)}</p>
                </div>
                <div className="flex-1 rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
                  <p className="font-ubuntu text-xs uppercase tracking-[0.25em] text-white/50">Stack tecnológico</p>
                  <p className="font-orbitron text-2xl text-white mt-2">{highlight?.stack.length || 0}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {highlight?.callToAction && (
                  <>
                    {highlightIsExternal ? (
                      <a href={highlightHref} target="_blank" rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-ubuntu text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(178,4,3,0.5)]"
                      >
                        {highlight.callToAction.label}
                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    ) : (
                      <Link href={highlightHref}
                        className="group inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-ubuntu text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(178,4,3,0.5)]"
                      >
                        {highlight.callToAction.label}
                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    )}
                  </>
                )}
                <a href="#historial"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-full font-ubuntu text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white/5"
                >
                  Ver todos
                </a>
              </div>
            </div>

            {/* Right - Agenda rápida */}
            <aside className="relative">
              <div className="absolute inset-0 bg-gradient-to-l from-red-600/10 to-transparent blur-3xl" />
              <div className="relative rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-sm">
                <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
                  <div>
                    <h3 className="font-orbitron text-2xl font-bold text-white">Proyectos recientes</h3>
                    <p className="mt-2 font-ubuntu text-sm text-white/50">Ordenado por última actualización</p>
                  </div>
                  <span className="font-ubuntu text-sm text-white/60 bg-white/5 px-4 py-2 rounded-full">
                    {quickPanelProjects.length} proyectos
                  </span>
                </div>
                <ul className="space-y-4 max-h-[32rem] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-red-600/50 scrollbar-track-white/5">
                  {quickPanelProjects.map((project, index) => {
                    const projectHref = project?.callToAction?.href || "#";
                    const isExternal = isExternalHref(projectHref);

                    return (
                      <li key={project.id}>
                        {isExternal ? (
                          <a href={projectHref} target="_blank" rel="noopener noreferrer"
                            className="group flex items-start gap-4 rounded-2xl border border-white/5 p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:scale-[1.02]"
                          >
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                              <span className="font-orbitron text-lg text-red-500">{String(index + 1).padStart(2, "0")}</span>
                            </div>
                            <div className="flex-1">
                              <p className="font-ubuntu text-xs uppercase tracking-[0.25em] text-white/40">{formatProjectDate(project.updatedAt)}</p>
                              <p className="mt-1 font-orbitron text-lg text-white group-hover:text-red-500 transition-colors line-clamp-1">{project.title}</p>
                              <p className="font-ubuntu text-sm text-white/60 mt-1 line-clamp-2">{project.summary}</p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                <span className={`text-xs border px-2 py-1 rounded-full ${STAGE_COLORS[project.stage]}`}>
                                  {STAGE_LABELS[project.stage]}
                                </span>
                                {project.focusAreas.slice(0, 1).map((area) => (
                                  <span key={area} className="text-xs text-white/40 border border-white/10 px-2 py-1 rounded-full">#{area}</span>
                                ))}
                                {project.focusAreas.length > 1 && <span className="text-xs text-white/40">+{project.focusAreas.length - 1}</span>}
                              </div>
                            </div>
                          </a>
                        ) : (
                          <Link href={projectHref}
                            className="group flex items-start gap-4 rounded-2xl border border-white/5 p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:scale-[1.02]"
                          >
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                              <span className="font-orbitron text-lg text-red-500">{String(index + 1).padStart(2, "0")}</span>
                            </div>
                            <div className="flex-1">
                              <p className="font-ubuntu text-xs uppercase tracking-[0.25em] text-white/40">{formatProjectDate(project.updatedAt)}</p>
                              <p className="mt-1 font-orbitron text-lg text-white group-hover:text-red-500 transition-colors line-clamp-1">{project.title}</p>
                              <p className="font-ubuntu text-sm text-white/60 mt-1 line-clamp-2">{project.summary}</p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                <span className={`text-xs border px-2 py-1 rounded-full ${STAGE_COLORS[project.stage]}`}>
                                  {STAGE_LABELS[project.stage]}
                                </span>
                                {project.focusAreas.slice(0, 1).map((area) => (
                                  <span key={area} className="text-xs text-white/40 border border-white/10 px-2 py-1 rounded-full">#{area}</span>
                                ))}
                                {project.focusAreas.length > 1 && <span className="text-xs text-white/40">+{project.focusAreas.length - 1}</span>}
                              </div>
                            </div>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-3xl -z-10" />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ═══ Grid de proyectos ═══ */}
      <section id="historial" className="relative bg-black py-24">
        <div className="container mx-auto px-6 md:px-12">

          {/* Título */}
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-7xl font-bold tracking-wider mb-6">EXPLORACIÓN</h2>
            <p className="text-lg text-white/60 font-ubuntu max-w-2xl mx-auto">
              Proyectos en desarrollo que combinan investigación, innovación y soluciones concretas.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex gap-1">
                <div className="w-12 h-1 bg-white" />
                <div className="w-12 h-1 bg-white" />
                <div className="w-12 h-1 bg-white" />
                <div className="w-6 h-1 bg-white/40" />
                <div className="w-6 h-1 bg-white/40" />
              </div>
            </div>
          </div>

          {/* Barra herramientas */}
          <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
            <button
              onClick={() => setIsPanelOpen(true)}
              className="group inline-flex items-center gap-2 border border-white/20 hover:border-red-500/50 text-white/80 hover:text-white px-6 py-3 rounded-full font-ubuntu text-sm uppercase tracking-wider transition-all duration-300 hover:bg-red-600/10 hover:shadow-[0_0_20px_rgba(178,4,3,0.2)]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span>Gestionar proyectos</span>
            </button>
            <div className="text-white/60 font-ubuntu text-sm">
              Total: <span className="text-white font-bold">{totalProjects}</span> proyectos
            </div>
          </div>

          {/* Grid de tarjetas */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleTimeline.map((project) => {
              const projectHref = project?.callToAction?.href || "#";
              const isExternal = isExternalHref(projectHref);

              const card = (
                <article
                  className="group relative h-full flex flex-col rounded-3xl border border-white/10 bg-black/40 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:border-[#b20403]/60 hover:shadow-[0_25px_60px_-20px_rgba(178,4,3,0.55)] overflow-hidden"
                >
                  {/* Header con etapa y fecha */}
                  <div className="p-6 pb-0">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                      <span className={`text-xs font-ubuntu uppercase tracking-wider border px-3 py-1.5 rounded-full ${STAGE_COLORS[project.stage]}`}>
                        {STAGE_LABELS[project.stage]}
                      </span>
                      <div className="flex items-center gap-2">
                        {project.isLocal && (
                          <span className="text-[10px] text-red-400 border border-red-500/30 px-2 py-1 rounded-full font-ubuntu uppercase">
                            local
                          </span>
                        )}
                        <span className="text-xs font-orbitron uppercase tracking-[0.3em] text-white/50">
                          {formatProjectDate(project.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 p-6 pt-2 space-y-4">
                    <h3 className="font-orbitron text-2xl font-bold text-white group-hover:text-red-500 transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="font-ubuntu text-white/70 leading-relaxed line-clamp-3">
                      {project.summary}
                    </p>

                    {/* Áreas de enfoque */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.focusAreas.map((area) => (
                        <span key={area} className="text-xs text-white/50 border border-white/10 px-3 py-1.5 rounded-full group-hover:border-red-500/20 transition-colors">
                          #{area}
                        </span>
                      ))}
                    </div>

                    {/* Stack tecnológico */}
                    {project.stack.filter(Boolean).length > 0 && (
                      <div className="flex flex-wrap gap-2 text-xs text-white/40">
                        {project.stack.filter(Boolean).slice(0, 4).map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-white/5 rounded-full">{tech}</span>
                        ))}
                        {project.stack.length > 4 && (
                          <span className="px-2 py-1 text-white/30">+{project.stack.length - 4}</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-red-500">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </article>
              );

              return isExternal ? (
                <a key={project.id} href={projectHref} target="_blank" rel="noopener noreferrer" className="block h-full">{card}</a>
              ) : (
                <Link key={project.id} href={projectHref} className="block h-full">{card}</Link>
              );
            })}
          </div>

          {/* Ver más */}
          {timeline.length > 6 && (
            <div className="mt-16 space-y-6">
              <div className="max-w-2xl mx-auto">
                <div className="flex justify-between text-sm text-white/60 mb-2 font-ubuntu">
                  <span>Mostrando {visibleCount} de {timeline.length} proyectos</span>
                  <span>{Math.round((visibleCount / timeline.length) * 100)}%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500"
                    style={{ width: `${(visibleCount / timeline.length) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {hasMore ? (
                  <>
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoading}
                      className="group inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-ubuntu text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(178,4,3,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Cargando...</span>
                        </>
                      ) : (
                        <>
                          <span>Ver más</span>
                          <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleLoadAll}
                      disabled={isLoading}
                      className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-full font-ubuntu text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Ver todos ({timeline.length - visibleCount} restantes)
                    </button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center gap-3 text-white/60">
                      <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-ubuntu">Has visto todos los proyectos disponibles</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══ Panel de edición lateral ═══ */}
      <EditPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        projects={allProjects}
        onAdd={addProject}
        onEdit={editProject}
        onDelete={deleteProject}
      />
    </main>
  );
}