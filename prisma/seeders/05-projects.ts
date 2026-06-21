import type { PrismaClient } from "../../lib/generated/prisma";

/**
 * Authoritative project catalog.
 *
 * States:
 *   En Continuidad → stage: "desarrollo" | "produccion" | "experimentacion"
 *   En Pausa       → stage: "pausa"
 *   Cancelado      → is_archived: true
 *
 * NOTE: `start_date` is intentionally NOT updated on upsert —
 * it preserves the real historical start date set at first insert.
 */

interface ProjectSeed {
  slug: string;
  title: string;
  description: string;
  stage: string;
  focus_areas: string[];
  stack: string[];
  hero_image: string | null;
  cta_label: string | null;
  cta_href: string | null;
  start_date: Date;
  is_archived?: boolean;
}

const PROJECTS: ProjectSeed[] = [
  // ── En Continuidad ─────────────────────────────────────────────────────────

  {
    slug: "cancer-temprano",
    title: "Detección de Cáncer (IA)",
    description:
      "Pipeline de IA para analizar registros clínicos y resaltar señales de interés en etapas tempranas, reduciendo el tiempo de triaje diagnóstico.",
    stage: "desarrollo",
    focus_areas: ["Salud", "Inteligencia Artificial"],
    stack: ["Python", "Machine Learning", "Deep Learning"],
    hero_image: null,
    cta_label: null,
    cta_href: null,
    start_date: new Date("2025-08-28"),
  },
  {
    slug: "secops-honeynet",
    title: "Honeypot / SecOps Honeynet",
    description:
      "Infraestructura contenida de honeypots para observar tácticas reales y ajustar la postura defensiva con datos verificables.",
    stage: "desarrollo",
    focus_areas: ["Ciberseguridad"],
    stack: ["Python", "Linux", "Docker"],
    hero_image: null,
    cta_label: null,
    cta_href: null,
    start_date: new Date("2025-09-04"),
  },
  {
    slug: "plataforma-aprendizaje",
    title: "Plataforma Web de Aprendizaje",
    description:
      "Entorno web interactivo para cursos, recursos y seguimiento del progreso académico dirigido a la comunidad universitaria.",
    stage: "desarrollo",
    focus_areas: ["Educación", "Desarrollo Web"],
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL"],
    hero_image: null,
    cta_label: null,
    cta_href: null,
    start_date: new Date("2025-10-01"),
  },
  {
    slug: "maqagr-app",
    title: "Desarrollo de Aplicación Agrícola (MaqAgr)",
    description:
      "Aplicativo web que evalúa compatibilidad tractor-implemento (potencia, terreno y especificaciones), apoyando decisiones que reducen costos y evitan daños al suelo.",
    stage: "desarrollo",
    focus_areas: ["Agrotech", "Productividad"],
    stack: ["Node.js", "React", "Tailwind CSS", "MongoDB"],
    hero_image: null,
    cta_label: "Poster en AmiTIC 2025",
    cta_href:
      "https://www.linkedin.com/feed/update/urn:li:activity:7386808584354971648",
    start_date: new Date("2025-09-26"),
  },
  {
    slug: "devurity-web",
    title: "Página Oficial del Semillero Devurity",
    description:
      "Plataforma web informativa y de gestión para el semillero, destacando proyectos, eventos y facilitando la colaboración entre miembros.",
    stage: "produccion",
    focus_areas: ["Desarrollo Web", "Comunidad", "Diseño UI/UX", "Branding"],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "TailwindCSS",
      "Prisma",
      "PostgreSQL",
    ],
    hero_image: null,
    cta_label: "Repositorio público",
    cta_href: "https://www.github.com/trbureiyan/DevurityWeb",
    start_date: new Date("2025-11-06"),
  },
  {
    slug: "etflow",
    title: "ETFlow",
    description:
      "Herramienta de automatización de flujos ETL orientada a integrar fuentes de datos heterogéneas con bajo código.",
    stage: "desarrollo",
    focus_areas: ["Data Science", "Backend Development"],
    stack: ["Python", "TypeScript"],
    hero_image: null,
    cta_label: null,
    cta_href: null,
    start_date: new Date("2025-10-01"),
  },

  // ── En Pausa / Definición ───────────────────────────────────────────────────

  {
    slug: "sistema-gestion-personal",
    title: "Sistema de Gestión de Personal",
    description:
      "Plataforma para administrar nóminas, turnos, documentos y desempeño del talento humano en organizaciones medianas.",
    stage: "pausa",
    focus_areas: ["Operaciones", "RRHH"],
    stack: [],
    hero_image: null,
    cta_label: null,
    cta_href: null,
    start_date: new Date("2025-10-16"),
  },
  {
    slug: "granja-hrm",
    title: "Gestión de Personal de la Granja",
    description:
      "Plataforma operativa para turnos, bases de datos y control documental del talento en granjas tecnificadas.",
    stage: "pausa",
    focus_areas: ["Operaciones", "RRHH", "Agrotech"],
    stack: [],
    hero_image: null,
    cta_label: null,
    cta_href: null,
    start_date: new Date("2025-10-16"),
  },
  {
    slug: "enterprise-cyber-lab",
    title: "Entorno de Ciberseguridad Empresarial",
    description:
      "Laboratorio controlado para evaluar amenazas internas, ejercicios de respuesta y cumplimiento basado en escenarios de negocio.",
    stage: "pausa",
    focus_areas: ["Ciberseguridad", "Compliance"],
    stack: ["Linux"],
    hero_image: null,
    cta_label: null,
    cta_href: null,
    start_date: new Date("2025-09-04"),
  },
  {
    slug: "nutriplant",
    title: "Nutriplant",
    description:
      "Sistema de monitoreo y recomendación de nutrición vegetal para optimizar rendimientos en cultivos controlados.",
    stage: "pausa",
    focus_areas: ["Agrotech", "Inteligencia Artificial"],
    stack: [],
    hero_image: null,
    cta_label: null,
    cta_href: null,
    start_date: new Date("2025-10-01"),
  },
  {
    slug: "modelo-pruebas-psicologia",
    title: "Modelo de Pruebas para Psicología",
    description:
      "Plataforma digital para administrar, calificar y analizar baterías psicológicas estandarizadas.",
    stage: "pausa",
    focus_areas: ["Salud", "Educación"],
    stack: [],
    hero_image: null,
    cta_label: null,
    cta_href: null,
    start_date: new Date("2025-10-01"),
  },
  {
    slug: "conteo-enfermedades-alevinos",
    title: "Conteo y Clasificación de Enfermedades en Alevinos",
    description:
      "Sistema de visión por computadora para detectar y clasificar enfermedades en alevinos durante la etapa de cría.",
    stage: "pausa",
    focus_areas: ["Computer Vision", "Agrotech", "Inteligencia Artificial"],
    stack: ["Python", "Computer Vision"],
    hero_image: null,
    cta_label: null,
    cta_href: null,
    start_date: new Date("2025-10-01"),
  },
  {
    slug: "modulo-inventario-granja",
    title: "Módulo Inventario y Auditorías Granja",
    description:
      "Módulo de control de inventario y auditorías internas para la gestión eficiente de activos en granjas experimentales.",
    stage: "pausa",
    focus_areas: ["Operaciones", "Agrotech"],
    stack: [],
    hero_image: null,
    cta_label: null,
    cta_href: null,
    start_date: new Date("2025-10-01"),
  },

  // ── Cancelados (archivados) ─────────────────────────────────────────────────

  {
    slug: "videojuego-emociones",
    title: "Videojuego sobre Emociones",
    description:
      "Videojuego educativo orientado al reconocimiento y gestión emocional para niños en edad escolar.",
    stage: "incubacion",
    focus_areas: ["Educación", "Salud"],
    stack: [],
    hero_image: null,
    cta_label: null,
    cta_href: null,
    start_date: new Date("2025-10-01"),
    is_archived: true,
  },
  {
    slug: "modalidad-grado",
    title: "Proyecto Modalidad de Grado",
    description:
      "Iniciativa transversal que consolida entregables académicos, investigación aplicada y transferencia de conocimiento.",
    stage: "incubacion",
    focus_areas: ["Investigación", "Educación"],
    stack: [],
    hero_image: null,
    cta_label: null,
    cta_href: null,
    start_date: new Date("2025-10-09"),
    is_archived: true,
  },
];

export async function seedProjects(prisma: PrismaClient) {
  let upserted = 0;

  for (const project of PROJECTS) {
    const { start_date, is_archived = false, ...rest } = project;

    await prisma.projects.upsert({
      where: { slug: project.slug },
      update: {
        // start_date intentionally excluded to preserve historical value
        ...rest,
        is_archived,
      },
      create: {
        ...rest,
        is_archived,
        start_date,
      },
    });
    upserted++;
  }

  console.log(`✅ Projects: ${upserted} upserted`);
}
