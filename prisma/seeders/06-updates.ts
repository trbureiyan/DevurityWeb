import type { PrismaClient } from "../../lib/generated/prisma";

interface UpdateSeed {
  slug: string;
  title: string;
  display_date: string;
  published_at: Date;
  description: string;
  tags: string[];
  border_color: string;
  href: string | null;
  is_featured: boolean;
}

const UPDATES: UpdateSeed[] = [
  {
    slug: "certificacion-lean-six-sigma-white-belt",
    title: "Certificación Lean Six Sigma White Belt",
    display_date: "12 de noviembre 2025",
    published_at: new Date("2025-11-12"),
    description:
      "Invitamos a la sesión gratuita de Lean Six Sigma White Belt con certificación internacional CSSC, transmitida por Zoom para la comunidad Devurity y USCO.",
    tags: ["Devurity", "LeanSixSigma", "Certificación", "USCO", "Capacitación"],
    border_color: "#454f5e",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7392748576474554369",
    is_featured: true,
  },
  {
    slug: "devurity-hackathon-unad-zona-sur-2025",
    title: "Devurity en la Hackathon UNAD Zona Sur 2025",
    display_date: "22 de octubre 2025",
    published_at: new Date("2025-10-22"),
    description:
      "Participamos en la hackathon de la UNAD Zona Sur, fortaleciendo colaboración, creatividad y la conexión del equipo.",
    tags: ["Devurity", "Hackathon", "UNAD", "Ciberseguridad", "ComunidadTecnológica"],
    border_color: "#454f5e",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7387895753362391040",
    is_featured: false,
  },
  {
    slug: "espacios-colaborativos-amitic-2025",
    title: "Celebramos espacios colaborativos en AmITIC 2025",
    display_date: "22 de octubre 2025",
    published_at: new Date("2025-10-22"),
    description:
      "Resaltamos diálogos y networking universitario en AmITIC 2025, reforzando nuestra cultura de aprendizaje compartido.",
    tags: ["Devurity", "AmITIC2025", "Colaboración", "USCO", "Innovación"],
    border_color: "#5d5d63",
    href: "https://www.linkedin.com/company/devurity",
    is_featured: false,
  },
  {
    slug: "maqarg-ingenieria-software-agro",
    title: "MaqArg: ingeniería de software para el agro",
    display_date: "21 de octubre 2025",
    published_at: new Date("2025-10-21"),
    description:
      "Presentamos el proyecto MaqArg, que evalúa compatibilidad maquinaria-agro para impulsar mecanización sostenible en Colombia.",
    tags: ["Devurity", "Agritech", "Investigación", "Sostenibilidad", "AmITIC2025"],
    border_color: "#f28881",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7386808584354971648",
    is_featured: false,
  },
  {
    slug: "intercambio-academico-latinoamerica",
    title: "Intercambio académico con universidades latinoamericanas",
    display_date: "21 de octubre 2025",
    published_at: new Date("2025-10-21"),
    description:
      "Entrevistamos a estudiantes internacionales durante AmITIC, promoviendo redes académicas y colaboración regional.",
    tags: ["Devurity", "IntercambioAcadémico", "AmITIC2025", "USCO", "Innovación"],
    border_color: "#21202e",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7386536771872010240",
    is_featured: false,
  },
  {
    slug: "conversacion-lideres-academicos-amitic",
    title: "Conversación con líderes académicos en AmITIC",
    display_date: "20 de octubre 2025",
    published_at: new Date("2025-10-20"),
    description:
      "Dialogamos con directivos de la región sobre cooperación académica para fortalecer el ecosistema tecnológico.",
    tags: ["Devurity", "AmITIC2025", "InnovaciónUniversitaria", "USCO", "Liderazgo"],
    border_color: "#bf6b65",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7386446183587819520",
    is_featured: false,
  },
  {
    slug: "devurity-congreso-internacional-amitic-2025",
    title: "Devurity en el Congreso Internacional AmITIC 2025",
    display_date: "19 de octubre 2025",
    published_at: new Date("2025-10-19"),
    description:
      "Participamos en AmITIC con conferencias, pósteres y entrevistas, consolidando proyección internacional del semillero.",
    tags: ["Devurity", "AmITIC2025", "Ciberseguridad", "Investigación", "PromptEngineering"],
    border_color: "#454f5e",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7386083836922580992",
    is_featured: false,
  },
  {
    slug: "fundacion-aws-users-group-neiva",
    title: "Fundación de AWS Users Group Neiva",
    display_date: "19 de octubre 2025",
    published_at: new Date("2025-10-19"),
    description:
      "Acompañamos la creación de AWS UG Neiva para impulsar formación en cloud y arquitectura en la región surcolombiana.",
    tags: ["Devurity", "AWSCommunity", "CloudComputing", "Innovación", "ComunidadTecnológica"],
    border_color: "#5d5d63",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7385736502271516672",
    is_featured: false,
  },
  {
    slug: "alianza-exploratoria-ieee-usco",
    title: "Alianza exploratoria con líderes IEEE USCO",
    display_date: "18 de octubre 2025",
    published_at: new Date("2025-10-18"),
    description:
      "Recibimos a líderes IEEE USCO para evaluar un capítulo enfocado en desarrollo y seguridad junto a Devurity.",
    tags: ["Devurity", "IEEE", "USCO", "Ciberseguridad", "InnovaciónUniversitaria"],
    border_color: "#9e6777",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7385691211744976896",
    is_featured: false,
  },
  {
    slug: "salas-tecnologicas-stem-usco",
    title: "Exploramos las salas tecnológicas STEM+ de la USCO",
    display_date: "18 de octubre 2025",
    published_at: new Date("2025-10-18"),
    description:
      "Practicamos con RA, pantallas táctiles e impresoras 3D para fortalecer nuestra visión de innovación educativa.",
    tags: ["Devurity", "STEM", "InnovaciónEducativa", "USCO", "Tecnología"],
    border_color: "#5d5d63",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7385419409265278976",
    is_featured: false,
  },
  {
    slug: "colaboracion-granja-experimental-usco",
    title: "Colaboración en la Granja Experimental USCO",
    display_date: "18 de octubre 2025",
    published_at: new Date("2025-10-18"),
    description:
      "Consolidamos alianzas con ingeniería agrícola para llevar automatización y software a procesos de la granja experimental.",
    tags: ["Devurity", "USCO", "InnovaciónUniversitaria", "TecnologíaSostenible", "Ciberseguridad"],
    border_color: "#454f5e",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7385374125529403392",
    is_featured: false,
  },
  {
    slug: "semillero-participa-amitic-2025",
    title: "Semillero participará en AmiTIC con ponencias y ...",
    display_date: "24-26 de septiembre 2025",
    published_at: new Date("2025-09-24"),
    description:
      "El semillero presentará ponencias en AmiTIC con oportunidad de indexar proyectos.",
    tags: ["AmiTIC", "USCO", "indexación", "ponencias", "Internacional"],
    border_color: "#63768d",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7386808584354971648",
    is_featured: false,
  },
  {
    slug: "indigo-tech-vacantes-cloud-backend",
    title: "Indigo Tech abre vacantes junior en cloud y backend",
    display_date: "13 de agosto 2025",
    published_at: new Date("2025-08-13"),
    description:
      "Indigo Tech visitó el semillero ofreciendo vacantes junior en cloud, DevOps y backend.",
    tags: ["Pasantias", "Frontend", "Backend", "Cloud", "Latam"],
    border_color: "#d5d9e9",
    href: null,
    is_featured: false,
  },
  {
    slug: "devurity-primer-anio",
    title: "Devurity cumple su primer año",
    display_date: "24 de agosto 2025",
    published_at: new Date("2025-07-24"),
    description:
      "Celebramos un año de proyectos, talleres y comunidad en desarrollo de software y ciberseguridad.",
    tags: ["Devurity", "Ciberseguridad", "DesarrolloDeSoftware", "InnovaciónUniversitaria", "USCO"],
    border_color: "#5d5d63",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7385328819781521408",
    is_featured: false,
  },
  {
    slug: "visita-granja-usco",
    title: "Visita a la granja USCO",
    display_date: "2024-2",
    published_at: new Date("2024-02-01"),
    description:
      "El semillero visitó la granja USCO para plantear proyectos de modernización y apoyo técnico.",
    tags: ["Granja", "USCO", "modernización", "proyectos", "Interdisciplinario"],
    border_color: "#bf6b65",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7385374125529403392",
    is_featured: false,
  },
];

export async function seedUpdates(prisma: PrismaClient) {
  let created = 0;
  let skipped = 0;

  for (const update of UPDATES) {
    const existing = await prisma.updates.findUnique({
      where: { slug: update.slug },
    });

    if (existing) {
      skipped++;
      continue;
    }

    await prisma.updates.create({
      data: {
        ...update,
        status: "published",
      },
    });
    created++;
  }

  console.log(`✅ Updates: ${created} created, ${skipped} already existed`);
}
