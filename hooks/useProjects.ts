"use client";

import { useState, useEffect } from "react";

// ============ TIPOS ============
export type ProjectStage =
  | "incubacion"
  | "desarrollo"
  | "validacion"
  | "produccion"
  | "experimentacion"
  | "pausa";

export interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  stage: ProjectStage;
  focusAreas: string[];
  stack: string[];
  updatedAt: string;
  heroImage: string | null;
  isLocal?: boolean;
  callToAction?: {
    label: string;
    href: string;
  };
}

export interface ProjectFilters {
  stages: ProjectStage[];
  focusAreas: string[];
  stack: string[];
}

// ============ ETIQUETAS LEGIBLES DE ETAPA ============
export const STAGE_LABELS: Record<ProjectStage, string> = {
  incubacion: "Incubación",
  desarrollo: "Desarrollo",
  validacion: "Validación",
  produccion: "Producción",
  experimentacion: "Experimentación",
  pausa: "En Pausa",
};

// ============ COLORES DE ETAPA ============
export const STAGE_COLORS: Record<ProjectStage, string> = {
  incubacion: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  desarrollo: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  validacion: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  produccion: "text-green-400 border-green-400/30 bg-green-400/10",
  experimentacion: "text-orange-400 border-orange-400/30 bg-orange-400/10",
  pausa: "text-zinc-400 border-zinc-400/30 bg-zinc-400/10",
};

// Mantenido para compatibilidad con imports existentes — datos reales provienen de la DB
export const PROJECTS_CATALOG: ProjectItem[] = [];

const STORAGE_KEY = "devurity-local-projects";

/**
 * Hook compartido — fuente de verdad para proyectos.
 *
 * @param initialData - Datos precargados desde la DB por el Server Component padre.
 *
 * Úsalo en projects/page.tsx y en ProjectsPreviewSection del landing.
 */
export function useProjects(initialData: ProjectItem[] = []) {
  const [allProjects, setAllProjects] = useState<ProjectItem[]>(initialData);

  // Carga local al montar
  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          setAllProjects(initialData);
          return;
        }
        const parsed: ProjectItem[] = JSON.parse(raw);
        // Solo los items marcados como locales se persisten en localStorage
        const localItems = parsed.filter((p) => p.isLocal);
        if (localItems.length > 0) {
          setAllProjects([...localItems, ...initialData]);
        } else {
          setAllProjects(initialData);
        }
      } catch {
        // localStorage corrupto, ignorar
        setAllProjects(initialData);
      }
    };

    load();

    // Escuchar cambios en otras pestañas
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) load();
    };
    // Escuchar cambios en la misma pestaña
    const handleCustom = () => load();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("devurity-projects-changed", handleCustom);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("devurity-projects-changed", handleCustom);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persist = (projects: ProjectItem[]) => {
    // Solo guardar items locales (los de DB son la fuente de verdad)
    const toSave = projects.filter((p) => p.isLocal);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    window.dispatchEvent(new Event("devurity-projects-changed"));
  };

  const addProject = (project: ProjectItem) => {
    const updated = [project, ...allProjects];
    setAllProjects(updated);
    persist(updated);
  };

  const editProject = (edited: ProjectItem) => {
    const updated = allProjects.map((p) => (p.id === edited.id ? edited : p));
    setAllProjects(updated);
    persist(updated);
  };

  const deleteProject = (id: string) => {
    const updated = allProjects.filter((p) => p.id !== id);
    setAllProjects(updated);
    // Remover del storage si era local
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const saved: ProjectItem[] = raw ? JSON.parse(raw) : [];
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(saved.filter((p) => p.id !== id))
      );
      window.dispatchEvent(new Event("devurity-projects-changed"));
    } catch {}
  };

  // Filtros computados dinámicamente
  const filters: ProjectFilters = {
    stages: ["incubacion", "desarrollo", "validacion", "produccion", "experimentacion", "pausa"],
    focusAreas: Array.from(new Set(allProjects.flatMap((p) => p.focusAreas))).sort(),
    stack: Array.from(
      new Set(allProjects.flatMap((p) => p.stack).filter(Boolean))
    ).sort(),
  };

  return { allProjects, addProject, editProject, deleteProject, filters };
}