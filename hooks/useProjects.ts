"use client";

import { useState } from "react";
import { useCsrf } from "@/hooks/useCsrf";

// ============ TIPOS ============
export type ProjectStage =
  | "incubacion"
  | "desarrollo"
  | "validacion"
  | "produccion"
  | "experimentacion"
  | "pausa";

export interface ProjectItem {
  id: string; // El slug es usado como ID en el cliente
  title: string;
  summary: string;
  stage: ProjectStage;
  focusAreas: string[];
  stack: string[];
  updatedAt: string;
  heroImage: string | null;
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

/**
 * Hook compartido — fuente de verdad para proyectos conectados a la BD con CSRF.
 *
 * @param initialData - Datos precargados desde la DB por el Server Component padre.
 */
export function useProjects(initialData: ProjectItem[] = []) {
  const [allProjects, setAllProjects] = useState<ProjectItem[]>(initialData);
  const { fetchWithCsrf } = useCsrf();

  const addProject = async (project: Omit<ProjectItem, "id"> & { id?: string }) => {
    const res = await fetchWithCsrf("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });

    const result = await res.json();
    if (!result.success) {
      throw new Error(result.error || "Error al guardar el proyecto en el servidor");
    }

    const created: ProjectItem = result.data;
    setAllProjects((prev) => [created, ...prev]);
    return created;
  };

  const editProject = async (edited: ProjectItem) => {
    const res = await fetchWithCsrf(`/api/projects/${edited.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edited),
    });

    const result = await res.json();
    if (!result.success) {
      throw new Error(result.error || "Error al actualizar el proyecto en el servidor");
    }

    const updated: ProjectItem = result.data;
    setAllProjects((prev) => prev.map((p) => (p.id === edited.id ? updated : p)));
    return updated;
  };

  const deleteProject = async (id: string) => {
    const res = await fetchWithCsrf(`/api/projects/${id}`, {
      method: "DELETE",
    });

    const result = await res.json();
    if (!result.success) {
      throw new Error(result.error || "Error al eliminar el proyecto del servidor");
    }

    setAllProjects((prev) => prev.filter((p) => p.id !== id));
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