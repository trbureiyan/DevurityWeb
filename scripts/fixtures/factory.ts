import { PrismaClient } from "../../lib/generated/prisma";

// ─────────────────────────────────────────────────────────────
// Guard: fixtures must never run against a production database.
// Check both NODE_ENV and a simple heuristic on the DATABASE_URL.
// ─────────────────────────────────────────────────────────────

/**
 * Aborts the process if the current environment looks like production.
 * Checks NODE_ENV and common production database hostnames.
 *
 * @throws Never — calls process.exit(1) on detection.
 */
export function assertDevelopmentOnly(): void {
  const env = process.env.NODE_ENV;
  const url = process.env.DATABASE_URL ?? "";

  // Allow only when NODE_ENV is exactly "development" AND the URL points to a
  // local host. Any other combination — staging, preview, production, missing
  // env — is treated as unsafe. This inverts the default stance so that a
  // misconfigured environment fails closed rather than open.
  const isLocalUrl =
    url.includes("localhost") ||
    url.includes("127.0.0.1") ||
    url.includes("host.docker.internal");

  const isSafe = env === "development" && isLocalUrl;

  if (!isSafe) {
    process.stderr.write(
      "\n[!] ABORTING: fixture scripts must not run outside a local development database.\n" +
      "    NODE_ENV=" + JSON.stringify(env) + "\n" +
      "    DATABASE_URL must point to localhost. Current URL does not qualify.\n\n"
    );
    process.exit(1);
  }
}

// ─────────────────────────────────────────────────────────────
// Random data helpers
// ─────────────────────────────────────────────────────────────
const FIRST_NAMES = [
  "Andrés", "María", "Carlos", "Laura", "Santiago", "Valentina",
  "Sebastián", "Camila", "Diego", "Isabella", "Julián", "Sara",
  "Felipe", "Ana", "Daniel", "Paula", "Miguel", "Sofía", "Jorge", "Elena",
];

const LAST_NAMES = [
  "García", "Martínez", "López", "Hernández", "González", "Pérez",
  "Rodríguez", "Sánchez", "Ramírez", "Torres", "Flores", "Vargas",
  "Castro", "Moreno", "Jiménez", "Ruiz", "Díaz", "Mendoza", "Silva", "Ramos",
];

const MOTIVATIONS = [
  "Aprender sobre ciberseguridad y aplicarla en proyectos reales.",
  "Contribuir al desarrollo de software de calidad en la región.",
  "Investigar nuevas tecnologías y compartir el conocimiento.",
  "Desarrollar habilidades técnicas en un entorno colaborativo.",
  "Aportar al ecosistema tecnológico universitario.",
  "Fortalecer mi perfil profesional con proyectos reales.",
  "Aprender de mis compañeros y crecer como desarrollador.",
];

export function pick<T>(arr: T[]): T {
  if (arr.length === 0) {
    throw new Error("pick() called with an empty array");
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomName(): { name: string; last_name: string } {
  return { name: pick(FIRST_NAMES), last_name: pick(LAST_NAMES) };
}

export function randomEmail(name: string, last_name: string, suffix: number): string {
  const norm = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return `${norm(name)}.${norm(last_name)}.${suffix}@fixture.devurity.dev`;
}

export function randomUsername(name: string, suffix: number): string {
  const norm = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return `${norm}_${suffix}`;
}

export function randomMotivation(): string {
  return pick(MOTIVATIONS);
}

export function randomSemester(): number {
  return randomInt(1, 10);
}

/** Generates a date in the past within the given day range. */
export function randomDateAround(centerDate: Date, daysRange: number): Date {
  const offset = randomInt(-daysRange, 0);
  const d = new Date(centerDate);
  d.setDate(d.getDate() + offset);
  return d;
}

// ─────────────────────────────────────────────────────────────
// FK lookup helpers — resolve IDs from already-seeded base tables
// ─────────────────────────────────────────────────────────────

export async function getRoleId(prisma: PrismaClient, roleName: string): Promise<bigint> {
  const role = await prisma.roles.findUniqueOrThrow({ where: { name: roleName } });
  return role.id;
}

export async function getAllRoleIds(prisma: PrismaClient): Promise<bigint[]> {
  const roles = await prisma.roles.findMany({ select: { id: true } });
  return roles.map((r) => r.id);
}

export async function getRandomRoleId(prisma: PrismaClient): Promise<bigint> {
  const ids = await getAllRoleIds(prisma);
  return pick(ids);
}

export async function getAllProjectIds(prisma: PrismaClient): Promise<bigint[]> {
  const projects = await prisma.projects.findMany({
    where: { is_archived: false },
    select: { id: true },
  });
  return projects.map((p) => p.id);
}

export async function getAllUserIds(prisma: PrismaClient): Promise<bigint[]> {
  const users = await prisma.users.findMany({ select: { id: true } });
  return users.map((u) => u.id);
}

export async function getActiveUserIds(prisma: PrismaClient): Promise<bigint[]> {
  const users = await prisma.users.findMany({
    where: { is_active: true },
    select: { id: true },
  });
  return users.map((u) => u.id);
}

// ─────────────────────────────────────────────────────────────
// Datos de proyectos para fixture — espejo del catálogo real
// ─────────────────────────────────────────────────────────────

const PROJECT_TITLES = [
  "Sistema de Monitoreo IoT",
  "Plataforma de Analítica Educativa",
  "Red de Sensores Ambientales",
  "Módulo de Auditoría de Código",
  "Dashboard de Métricas de Salud",
  "Generador de Reportes Automáticos",
  "Bot de Asistencia Académica",
  "Sistema de Control de Acceso Biométrico",
  "Analizador de Tráfico de Red",
  "Plataforma de Gestión de Eventos",
  "Motor de Búsqueda Semántica",
  "Simulador de Circuitos Lógicos",
  "Aplicación de Telemedicina Rural",
  "Sistema de Inventario con QR",
  "Asistente de Escritura con IA",
  "Herramienta de Pentesting Automatizado",
  "Plataforma de Votación Electrónica",
  "Sistema de Alerta Temprana de Inundaciones",
  "Módulo de Reconocimiento Facial",
  "API de Procesamiento de Lenguaje Natural",
];

const PROJECT_DESCRIPTIONS: Record<string, string> = {
  "Sistema de Monitoreo IoT":
    "Infraestructura de sensores conectados para capturar y visualizar datos ambientales en tiempo real desde múltiples nodos distribuidos.",
  "Plataforma de Analítica Educativa":
    "Herramienta de análisis de datos académicos que permite identificar patrones de aprendizaje y predecir riesgo de deserción estudiantil.",
  "Red de Sensores Ambientales":
    "Red distribuida de sensores de bajo costo para monitorear calidad del aire, temperatura y humedad en zonas urbanas y rurales.",
  "Módulo de Auditoría de Código":
    "Herramienta automatizada de análisis estático que detecta vulnerabilidades, deuda técnica y violaciones de estilo en repositorios Git.",
  "Dashboard de Métricas de Salud":
    "Interfaz visual centralizada que consolida indicadores clínicos de múltiples fuentes para apoyar decisiones médicas en tiempo real.",
  "Generador de Reportes Automáticos":
    "Motor de generación de informes que toma datos estructurados y produce documentos PDF/Excel personalizables según plantillas configurables.",
  "Bot de Asistencia Académica":
    "Agente conversacional integrado a plataformas universitarias para responder preguntas frecuentes, gestionar horarios y enviar recordatorios.",
  "Sistema de Control de Acceso Biométrico":
    "Solución de control de acceso físico basada en reconocimiento de huella dactilar con registro de eventos y alertas de seguridad.",
  "Analizador de Tráfico de Red":
    "Herramienta de captura y análisis de paquetes para detectar anomalías, ataques de fuerza bruta y exfiltración de datos en redes locales.",
  "Plataforma de Gestión de Eventos":
    "Sistema web para la creación, promoción y control de asistencia a eventos académicos y culturales con integración a calendarios.",
  "Motor de Búsqueda Semántica":
    "Motor de recuperación de información que usa embeddings vectoriales para encontrar contenido relevante más allá de coincidencias exactas de texto.",
  "Simulador de Circuitos Lógicos":
    "Entorno interactivo de simulación de compuertas y circuitos digitales para prácticas de laboratorio de electrónica digital.",
  "Aplicación de Telemedicina Rural":
    "Plataforma de teleconsulta médica optimizada para conectividad limitada, orientada a comunidades rurales sin acceso a atención presencial.",
  "Sistema de Inventario con QR":
    "Gestión de activos físicos mediante códigos QR dinámicos con seguimiento de ubicación, estado y movimientos en tiempo real.",
  "Asistente de Escritura con IA":
    "Herramienta de apoyo a la redacción académica que sugiere mejoras de estilo, detecta plagio y adapta el tono según el tipo de documento.",
  "Herramienta de Pentesting Automatizado":
    "Framework de pruebas de penetración que automatiza la identificación de vulnerabilidades OWASP Top 10 en aplicaciones web.",
  "Plataforma de Votación Electrónica":
    "Sistema de votación digital con verificación de identidad, cifrado de extremo a extremo y auditoría transparente del proceso electoral.",
  "Sistema de Alerta Temprana de Inundaciones":
    "Red de sensores hidrológicos con modelos predictivos para emitir alertas anticipadas en cuencas hidrográficas de alto riesgo.",
  "Módulo de Reconocimiento Facial":
    "Componente de visión artificial para identificación de personas en tiempo real aplicable a control de asistencia y seguridad.",
  "API de Procesamiento de Lenguaje Natural":
    "Servicio REST que expone modelos de NLP para análisis de sentimientos, extracción de entidades y clasificación de texto en español.",
};

export const FOCUS_AREAS_POOL = [
  "Ciberseguridad",
  "Inteligencia Artificial",
  "Desarrollo Web",
  "Educación",
  "Salud",
  "Agrotech",
  "Data Science",
  "Backend Development",
  "Computer Vision",
  "IoT",
  "Operaciones",
  "Investigación",
  "Compliance",
  "RRHH",
  "Comunidad",
];

export const STACK_POOL = [
  "Python",
  "TypeScript",
  "Node.js",
  "Next.js",
  "React",
  "PostgreSQL",
  "Docker",
  "Linux",
  "Machine Learning",
  "TailwindCSS",
  "MongoDB",
  "Prisma",
  "Deep Learning",
  "Computer Vision",
  "Redis",
  "FastAPI",
  "Go",
];

export const STAGES = [
  "incubacion",
  "desarrollo",
  "validacion",
  "produccion",
  "experimentacion",
  "pausa",
] as const;

/**
 * Genera un slug kebab-case a partir de un título y un sufijo numérico.
 * Normaliza tildes, elimina caracteres no alfanuméricos y une con guiones.
 */
export function randomSlug(title: string, suffix: number): string {
  return (
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") +
    "-" +
    suffix
  );
}

/** Toma N ítems al azar de un array sin repetición. */
export function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, shuffled.length));
}

/** Genera los campos variables de un proyecto fixture. */
export function randomProjectData(suffix: number): {
  title: string;
  slug: string;
  description: string;
  stage: string;
  focus_areas: string[];
  stack: string[];
  is_archived: boolean;
  hero_image: null;
  cta_label: null;
  cta_href: null;
  start_date: Date;
} {
  const title = PROJECT_TITLES[suffix % PROJECT_TITLES.length];
  return {
    title,
    slug: randomSlug(title, suffix),
    description: PROJECT_DESCRIPTIONS[title] ?? "Proyecto de desarrollo tecnológico del semillero Devurity.",
    stage: pick([...STAGES]),
    focus_areas: pickN(FOCUS_AREAS_POOL, randomInt(1, 3)),
    stack: pickN(STACK_POOL, randomInt(0, 4)),
    is_archived: Math.random() < 0.1,
    hero_image: null,
    cta_label: null,
    cta_href: null,
    start_date: randomDateAround(new Date(), 365),
  };
}
