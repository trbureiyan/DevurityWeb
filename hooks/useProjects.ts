"use client";

import { useState, useEffect } from "react";

// ============ TIPOS ============
export type ProjectStage =
  | "incubacion"
  | "desarrollo"
  | "validacion"
  | "produccion"
  | "experimentacion";

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
};

// ============ COLORES DE ETAPA ============
export const STAGE_COLORS: Record<ProjectStage, string> = {
  incubacion: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  desarrollo: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  validacion: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  produccion: "text-green-400 border-green-400/30 bg-green-400/10",
  experimentacion: "text-orange-400 border-orange-400/30 bg-orange-400/10",
};

// ============ DATOS MOCK ============
export const PROJECTS_CATALOG: ProjectItem[] = [
  {
    id: "secops-honeynet",
    title: "SecOps Honeynet",
    summary:
      "Infraestructura contenida de honeypots para observar tácticas reales y ajustar la postura defensiva con datos verificables.",
    stage: "incubacion",
    focusAreas: ["Ciberseguridad"],
    stack: ["Python"],
    updatedAt: "2025-09-04",
    heroImage: null,
  },
  {
    id: "maqagr-app",
    title: "Desarrollo de Aplicación Agrícola (MaqAgr)",
    summary:
      "Aplicativo web que aborda la baja mecanización del campo colombiano. Integra cálculos para verificar la compatibilidad tractor-implemento.",
    stage: "desarrollo",
    focusAreas: ["Agrotech", "Productividad"],
    stack: ["Node.js", "React", "Tailwind", "MongoDB"],
    updatedAt: "2025-09-26",
    heroImage: null,
    callToAction: {
      label: "Poster en AmiTIC 2025",
      href: "https://www.linkedin.com/feed/update/urn:li:activity:7386808584354971648",
    },
  },
  {
    id: "devurity-web",
    title: "Pagina Oficial del Semillero Devurity",
    summary:
      "Plataforma web informativa y de gestión para el semillero, destacando proyectos, eventos y facilitando la colaboración entre miembros.",
    stage: "produccion",
    focusAreas: ["Desarrollo Web", "Comunidad", "Diseño UI/UX", "Branding"],
    stack: ["Next.js", "React", "Typescript", "TailwindCSS", "Prisma", "PostgreSQL"],
    updatedAt: "2025-11-06",
    heroImage: null,
    callToAction: {
      label: "Repositorio público",
      href: "https://www.github.com/trbureiyan/DevurityWeb",
    },
  },
  {
    id: "granja-hrm",
    title: "Sistema de Gestión de Personal (Granja)",
    summary:
      "Plataforma operativa para turnos, bases de datos y control documental del talento en granjas tecnificadas.",
    stage: "incubacion",
    focusAreas: ["Operaciones", "RRHH"],
    stack: [],
    updatedAt: "2025-10-16",
    heroImage: null,
  },
  {
    id: "cancer-temprano",
    title: "Detección de Cáncer en Etapas Tempranas",
    summary:
      "Flujo de trabajo para analizar información y destacar registros con características de interés.",
    stage: "experimentacion",
    focusAreas: ["Salud"],
    stack: [],
    updatedAt: "2025-08-28",
    heroImage: null,
  },
  {
    id: "enterprise-cyber-lab",
    title: "Entorno de Ciberseguridad Empresarial",
    summary:
      "Laboratorio controlado para evaluar amenazas internas, ejercicios de respuesta y cumplimiento basado en escenarios de negocio.",
    stage: "incubacion",
    focusAreas: ["Ciberseguridad", "Compliance"],
    stack: ["Linux"],
    updatedAt: "2025-09-04",
    heroImage: null,
  },
  {
    id: "modalidad-grado",
    title: "Proyecto Modalidad de Grado",
    summary:
      "Iniciativa transversal que consolida entregables académicos, investigación aplicada y transferencia de conocimiento.",
    stage: "incubacion",
    focusAreas: ["Investigacion", "Educacion"],
    stack: [],
    updatedAt: "2025-10-09",
    heroImage: null,
  },
];

const STORAGE_KEY = "devurity-local-projects";

/**
 * Hook compartido — fuente de verdad para proyectos.
 * Úsalo en projects/page.tsx y en ProjectsPreviewSection del landing.
 */
export function useProjects() {
  const [allProjects, setAllProjects] = useState<ProjectItem[]>(PROJECTS_CATALOG);

  // Carga local al montar
  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed: ProjectItem[] = JSON.parse(raw);
        const existingIds = new Set(PROJECTS_CATALOG.map((p) => p.id));
        const onlyNew = parsed.filter((p) => !existingIds.has(p.id));
        // Los items editados del catálogo reemplazan el original
        const edited = parsed.filter((p) => existingIds.has(p.id));
        const merged = PROJECTS_CATALOG.map((p) => {
          const override = edited.find((e) => e.id === p.id);
          return override ? { ...p, ...override } : p;
        });
        setAllProjects([...onlyNew, ...merged]);
      } catch {
        // localStorage corrupto, ignorar
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
  }, []);

  const persist = (projects: ProjectItem[]) => {
    // Guarda nuevos Y ediciones de los del catálogo
    const toSave = projects.filter(
      (p) =>
        p.isLocal ||
        // Si difiere del original, guardar la versión editada
        JSON.stringify(p) !==
          JSON.stringify(PROJECTS_CATALOG.find((o) => o.id === p.id))
    );
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
    // Los proyectos del catálogo no se eliminan de verdad, se marcan
    // Los locales sí se eliminan
    const updated = allProjects.filter((p) => p.id !== id);
    setAllProjects(updated);
    // Remover del storage
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
    stages: ["incubacion", "experimentacion", "validacion", "produccion", "desarrollo"],
    focusAreas: Array.from(new Set(allProjects.flatMap((p) => p.focusAreas))).sort(),
    stack: Array.from(
      new Set(allProjects.flatMap((p) => p.stack).filter(Boolean))
    ).sort(),
  };

  return { allProjects, addProject, editProject, deleteProject, filters };
}