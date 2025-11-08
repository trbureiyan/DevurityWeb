import { cache } from "react";
import { unstable_cache } from "next/cache";

export type ProjectStage = "incubacion" | "desarrollo" | "validacion" | "produccion" | "experimentacion";

export interface ProjectItem {
  id: string;
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

const PROJECTS_CATALOG: ProjectItem[] = [
  {
    id: "secops-honeynet",
    title: "SecOps Honeynet",
    summary:
      "Infraestructura contenida de honeypots para observar tácticas reales y ajustar la postura defensiva con datos verificables.",
    stage: "incubacion",
    focusAreas: ["Ciberseguridad"],
    stack: ["Python"],
    updatedAt: "2025-09-4",
    heroImage: null,
  },
  {
    id: "maqagr-app",
    title: "Desarrollo de Aplicación Agrícola (MaqAgr)",
    summary:
      "Aplicativo web que aborda la baja mecanización del campo colombiano. Integra cálculos para verificar la compatibilidad tractor-implemento (potencia, terreno y especificaciones), apoyando decisiones que reducen costos y evitan daños al suelo.",
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
    stack: ["Next.js","React","Typescript","Open Source", "TailwindCSS", "Prisma", "PostgreSQL"],
    updatedAt: "2025-11-6",
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
    stack: [""],
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
    stack: [""],
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
    updatedAt: "2025-09-4",
    heroImage: null,
  },
  {
    id: "modalidad-grado",
    title: "Proyecto Modalidad de Grado",
    summary:
      "Iniciativa transversal que consolida entregables académicos, investigación aplicada y transferencia de conocimiento.",
    stage: "incubacion",
    focusAreas: ["Investigacion", "Educacion"],
    stack: [""],
    updatedAt: "2025-10-09",
    heroImage: null,
  },
];

const unique = (values: string[]): string[] => Array.from(new Set(values)).sort();

// Incrementar este identificador cuando se requiera forzar la revalidación manual.
const PROJECTS_CACHE_KEY: string[] = ["projects-catalog", "rev-2025110607"]; // rev-2025110602 <-- 2025-11-06 xx

const computeFilters = (): ProjectFilters => {
  return {
    stages: ["incubacion", "experimentacion", "validacion", "produccion"],
    focusAreas: unique(PROJECTS_CATALOG.flatMap((project) => project.focusAreas)),
    stack: unique(PROJECTS_CATALOG.flatMap((project) => project.stack)),
  };
};

export const getProjectsCatalog = unstable_cache(async (): Promise<ProjectItem[]> => {
  return PROJECTS_CATALOG;
// }, ["projects-catalog"], {
}, PROJECTS_CACHE_KEY, {
  revalidate: 60 * 60 * 6,
});

export const getProjectsFilters = cache(async (): Promise<ProjectFilters> => {
  return computeFilters();
});
