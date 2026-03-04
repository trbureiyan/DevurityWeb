/**
 * @deprecated Archivo deprecado.
 * 
 * Los datos de noticias/eventos ahora se consultan desde la db.
 * Usar las funciones del repositorio: @/repositories/updates/updates.repositories
 * 
 * - Para obtener updates: getPublishedUpdates()
 * - Para el landing: getLatestUpdates(count)
 * - Para feed completo: @/lib/data/updates → getUpdatesFeed()
 * 
 * Este archivo se mantiene temporalmente para referencia de la estructura de datos
 * y será eliminado en una versión futura.
 * 
 */

// Re-exportar types desde la nueva ubicación para compatibilidad hacia el back
export type { NewsEvent } from "@/lib/types/update.types";

/* 
* @deprecated Usar getPublishedUpdates() desde @/repositories/updates/updates.repositories
*/
export interface NewsEventLegacy {
  id: number;
  slug: string;
  title: string;
  date: string;
  publishedAt: string;
  description: string;
  tags: string[];
  borderColor: string;
  href: string;
}

/**
 * @deprecated Este array ya no se usa. Los datos están en la tabla 'updates' de la DB.
 */
export const LATEST_NEWS: NewsEventLegacy[] = [
  {
    id: 1,
    slug: "indigo-tech-vacantes-cloud-backend",
    title: "Indigo Tech abre vacantes junior en cloud y backend",
    date: "13 de agosto 2025",
    publishedAt: "2025-08-13",
    description:
      "Indigo Tech visitó el semillero ofreciendo vacantes junior en cloud, DevOps y backend.",
    tags: ["Pasantias", "Frontend", "Backend", "Cloud", "Latam"],
    borderColor: "#d5d9e9",
    href: "#",
  },
  {
    id: 2,
    slug: "semillero-participa-amitic-2025",
    title: "Semillero participará en AmiTIC con ponencias y ...",
    date: "24-26 de septiembre 2025",
    publishedAt: "2025-09-24",
    description:
      "El semillero presentará ponencias en AmiTIC con oportunidad de indexar proyectos.",
    tags: ["AmiTIC", "USCO", "indexación", "ponencias", "Internacional"],
    borderColor: "#63768d",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7386808584354971648",
  },
  {
    id: 3,
    slug: "visita-granja-usco",
    title: "Visita a la granja USCO",
    date: "2024-2",
    publishedAt: "2024-02-01",
    description:
      "El semillero visitó la granja USCO para plantear proyectos de modernización y apoyo técnico.",
    tags: ["Granja", "USCO", "modernización", "proyectos", "Interdisciplinario"],
    borderColor: "#bf6b65",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7385374125529403392",
  },
  {
    id: 4,
    slug: "devurity-hackathon-unad-zona-sur-2025",
    title: "Devurity en la Hackathon UNAD Zona Sur 2025",
    date: "22 de octubre 2025",
    publishedAt: "2025-10-22",
    description:
      "Participamos en la hackathon de la UNAD Zona Sur, fortaleciendo colaboración, creatividad y la conexión del equipo.",
    tags: ["Devurity", "Hackathon", "UNAD", "Ciberseguridad", "ComunidadTecnológica"],
    borderColor: "#454f5e",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7387895753362391040",
  },
  {
    id: 5,
    slug: "espacios-colaborativos-amitic-2025",
    title: "Celebramos espacios colaborativos en AmITIC 2025",
    date: "22 de octubre 2025",
    publishedAt: "2025-10-22",
    description:
      "Resaltamos diálogos y networking universitario en AmITIC 2025, reforzando nuestra cultura de aprendizaje compartido.",
    tags: ["Devurity", "AmITIC2025", "Colaboración", "USCO", "Innovación"],
    borderColor: "#5d5d63",
    href: "https://www.linkedin.com/company/devurity",
  },
  {
    id: 6,
    slug: "maqarg-ingenieria-software-agro",
    title: "MaqArg: ingeniería de software para el agro",
    date: "21 de octubre 2025",
    publishedAt: "2025-10-21",
    description:
      "Presentamos el proyecto MaqArg, que evalúa compatibilidad maquinaria-agro para impulsar mecanización sostenible en Colombia.",
    tags: ["Devurity", "Agritech", "Investigación", "Sostenibilidad", "AmITIC2025"],
    borderColor: "#f28881",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7386808584354971648",
  },
  {
    id: 7,
    slug: "intercambio-academico-latinoamerica",
    title: "Intercambio académico con universidades latinoamericanas",
    date: "21 de octubre 2025",
    publishedAt: "2025-10-21",
    description:
      "Entrevistamos a estudiantes internacionales durante AmITIC, promoviendo redes académicas y colaboración regional.",
    tags: ["Devurity", "IntercambioAcadémico", "AmITIC2025", "USCO", "Innovación"],
    borderColor: "#21202e",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7386536771872010240",
  },
  {
    id: 8,
    slug: "conversacion-lideres-academicos-amitic",
    title: "Conversación con líderes académicos en AmITIC",
    date: "20 de octubre 2025",
    publishedAt: "2025-10-20",
    description:
      "Dialogamos con directivos de la región sobre cooperación académica para fortalecer el ecosistema tecnológico.",
    tags: ["Devurity", "AmITIC2025", "InnovaciónUniversitaria", "USCO", "Liderazgo"],
    borderColor: "#bf6b65",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7386446183587819520",
  },
  {
    id: 9,
    slug: "devurity-congreso-internacional-amitic-2025",
    title: "Devurity en el Congreso Internacional AmITIC 2025",
    date: "19 de octubre 2025",
    publishedAt: "2025-10-19",
    description:
      "Participamos en AmITIC con conferencias, pósteres y entrevistas, consolidando proyección internacional del semillero.",
    tags: ["Devurity", "AmITIC2025", "Ciberseguridad", "Investigación", "PromptEngineering"],
    borderColor: "#454f5e",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7386083836922580992",
  },
  {
    id: 10,
    slug: "fundacion-aws-users-group-neiva",
    title: "Fundación de AWS Users Group Neiva",
    date: "19 de octubre 2025",
    publishedAt: "2025-10-19",
    description:
      "Acompañamos la creación de AWS UG Neiva para impulsar formación en cloud y arquitectura en la región surcolombiana.",
    tags: ["Devurity", "AWSCommunity", "CloudComputing", "Innovación", "ComunidadTecnológica"],
    borderColor: "#5d5d63",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7385736502271516672",
  },
  {
    id: 11,
    slug: "alianza-exploratoria-ieee-usco",
    title: "Alianza exploratoria con líderes IEEE USCO",
    date: "18 de octubre 2025",
    publishedAt: "2025-10-18",
    description:
      "Recibimos a líderes IEEE USCO para evaluar un capítulo enfocado en desarrollo y seguridad junto a Devurity.",
    tags: ["Devurity", "IEEE", "USCO", "Ciberseguridad", "InnovaciónUniversitaria"],
    borderColor: "#9e6777",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7385691211744976896",
  },
  {
    id: 12,
    slug: "salas-tecnologicas-stem-usco",
    title: "Exploramos las salas tecnológicas STEM+ de la USCO",
    date: "18 de octubre 2025",
    publishedAt: "2025-10-18",
    description:
      "Practicamos con RA, pantallas táctiles e impresoras 3D para fortalecer nuestra visión de innovación educativa.",
    tags: ["Devurity", "STEM", "InnovaciónEducativa", "USCO", "Tecnología"],
    borderColor: "#5d5d63",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7385419409265278976",
  },
  {
    id: 13,
    slug: "colaboracion-granja-experimental-usco",
    title: "Colaboración en la Granja Experimental USCO",
    date: "18 de octubre 2025",
    publishedAt: "2025-10-18",
    description:
      "Consolidamos alianzas con ingeniería agrícola para llevar automatización y software a procesos de la granja experimental.",
    tags: ["Devurity", "USCO", "InnovaciónUniversitaria", "TecnologíaSostenible", "Ciberseguridad"],
    borderColor: "#454f5e",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7385374125529403392",
  },
  {
    id: 14,
    slug: "devurity-primer-anio",
    title: "Devurity cumple su primer año",
    date: "24 de agosto 2025",
    publishedAt: "2025-07-24",
    description:
      "Celebramos un año de proyectos, talleres y comunidad en desarrollo de software y ciberseguridad.",
    tags: ["Devurity", "Ciberseguridad", "DesarrolloDeSoftware", "InnovaciónUniversitaria", "USCO"],
    borderColor: "#5d5d63",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7385328819781521408",
  },
  {
    id: 15,
    slug: "certificacion-lean-six-sigma-white-belt",
    title: "Certificación Lean Six Sigma White Belt",
    date: "12 de noviembre 2025",
    publishedAt: "2025-11-12",
    description:
      "Invitamos a la sesión gratuita de Lean Six Sigma White Belt con certificación internacional CSSC, transmitida por Zoom para la comunidad Devurity y USCO.",
    tags: ["Devurity", "LeanSixSigma", "Certificación", "USCO", "Capacitación"],
    borderColor: "#454f5e",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7392748576474554369",
  },
];
