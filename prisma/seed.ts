import { PrismaClient } from "../lib/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Crear roles
  const adminRole = await prisma.roles.upsert({
    where: { name: "admin" },
    update: {},
    create: {
      name: "admin",
    },
  });

  const userRole = await prisma.roles.upsert({
    where: { name: "user" },
    update: {},
    create: {
      name: "user",
    },
  });

  console.log("✅ Roles created:", {
    admin: adminRole.id.toString(),
    user: userRole.id.toString(),
  });

  // Crear plataformas sociales base para SocialLinks
  const platforms = [
    "GitHub",
    "ORCID",
    "Bento.me",
    "Linktree",
    "YouTube",
    "Twitter",
    "Facebook",
    "LinkedIn",
    "Instagram",
    "Website",
  ];

  let createdPlatforms = 0;
  let existingPlatforms = 0;

  for (const platformName of platforms) {
    const existed = await prisma.platforms.findFirst({
      where: { name: platformName },
    });

    if (existed) {
      existingPlatforms++;
      continue;
    }

    await prisma.platforms.create({
      data: { name: platformName },
    });
    createdPlatforms++;
  }

  console.log(
    `✅ Platforms processed: ${createdPlatforms} created, ${existingPlatforms} already existed`,
  );

  // Crear programas académicos
  const programs = [
    "Física",
    "Matemática Aplicada",
    "Biología Aplicada",
    "Ciencia Política",
    "Derecho",
    "Antropología",
    "Comunicación Social y Periodismo",
    "Psicología",
    "Administración de Empresas",
    "Administración Financiera",
    "Administración Turística y Hotelera",
    "Economía",
    "Contaduría Pública",
    "Licenciatura en Ciencias Naturales y Educación Ambiental",
    "Licenciatura en Ciencias Sociales",
    "Licenciatura en Educación Artística",
    "Licenciatura en Educación Física, Recreación y Deportes",
    "Licenciatura en Educación Infantil",
    "Licenciatura en Lenguas Extranjeras con Énfasis en Inglés",
    "Licenciatura en Literatura y Lengua Castellana",
    "Licenciatura en Matemáticas",
    "Ingeniería Agrícola",
    "Ingeniería Agroindustrial",
    "Ingeniería Civil",
    "Ingeniería de Petróleos",
    "Ingeniería de Software",
    "Ingeniería Electrónica",
    "Tecnología en Construcción de Obras Civiles",
    "Tecnología en Desarrollo de Software",
  ];

  console.log(`⏳ Creating ${programs.length} programs...`);
  let createdPrograms = 0;
  let existingPrograms = 0;

  for (const programName of programs) {
    const existed = await prisma.programs.findUnique({ where: { name: programName } });

    if (existed) {
      existingPrograms++;
      continue;
    }

    await prisma.programs.create({ data: { name: programName } });
    createdPrograms++;
  }

  console.log(`✅ Programs processed: ${createdPrograms} created, ${existingPrograms} already existed`);

  // Crear todas las skills
  const skills = [
    'Python',
    'JavaScript',
    'Java',
    'C',
    'C++',
    'C#',
    'SQL',
    'TypeScript',
    'PHP',
    'Go',
    'Swift',
    'Kotlin',
    'Ruby',
    'R',
    'Dart',
    'MATLAB',
    'Shell (Bash)',
    'Assembly Language',
    'Objective-C',
    'Visual Basic (.NET)',
    'Lua',
    'Django',
    'Flask',
    'FastAPI',
    'TensorFlow',
    'PyTorch',
    'React',
    'Next.js',
    'Express.js',
    'Vue.js',
    'Angular',
    'NestJS',
    'Spring Boot',
    'Qt',
    'Boost',
    'Unreal Engine',
    '.NET',
    'ASP.NET Core',
    'Unity',
    'Laravel',
    'Symfony',
    'CodeIgniter',
    'Gin',
    'Fiber',
    'Echo',
    'SwiftUI',
    'Vapor',
    'Ktor',
    'Jetpack Compose',
    'Ruby on Rails',
    'Shiny',
    'ggplot2',
    'tidyverse',
    'Flutter',
    'Simulink',
    'Deep Learning Toolbox',
    'NASM',
    'MASM',
    'GAS',
    'Cocoa',
    'Cocoa Touch',
    '.NET Framework',
    '.NET Core',
    'LÖVE2D',
    'Solar2D',
    'Cloud Computing',
    'AWS',
    'Azure',
    'Google Cloud',
    'DigitalOcean',
    'Vercel',
    'Netlify',
    'DevOps',
    'Docker',
    'Kubernetes',
    'CI/CD',
    'Jenkins',
    'GitHub Actions',
    'Ciberseguridad',
    'Pentesting',
    'OWASP',
    'Seguridad de APIs',
    'Hardening',
    'Firewalls',
    'Inteligencia Artificial',
    'Machine Learning',
    'Deep Learning',
    'NLP',
    'Computer Vision',
    'Data Science',
    'Mobile Development',
    'Frontend Development',
    'Backend Development',
    'Blockchain / Web3',
    'Testing / QA',
    'Jest',
    'Cypress',
    'Selenium',
    'Playwright',
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'Redis',
    'Firebase',
    'Figma',
    'Adobe XD',
    'Tailwind CSS',
    'Material UI',
    'Bootstrap',
    'Chakra UI',
    'Bulma',
    'Foundation',
    'Ant Design',
    'Semantic UI',
    'jQuery',
    'REST',
    'GraphQL',
    'gRPC',
    'WebSockets',
    'SOAP',
    'Rust'
  ];

  console.log(`⏳ Creating ${skills.length} skills...`);
  let createdCount = 0;
  let existingCount = 0;

  for (const skillName of skills) {
    const existed = await prisma.skills.findFirst({ where: { name: skillName } });

    if (existed) {
      existingCount++;
      continue;
    }

    await prisma.skills.create({ data: { name: skillName } });
    createdCount++;
  }

  console.log(`✅ Skills processed: ${createdCount} created, ${existingCount} already existed`);

  // Crear proyectos del catálogo
  const projectsCatalog = [
    {
      slug: "secops-honeynet",
      title: "SecOps Honeynet",
      description:
        "Infraestructura contenida de honeypots para observar tácticas reales y ajustar la postura defensiva con datos verificables.",
      stage: "incubacion",
      focus_areas: ["Ciberseguridad"],
      stack: ["Python"],
      hero_image: null,
      cta_label: null,
      cta_href: null,
      start_date: new Date("2025-09-04"),
    },
    {
      slug: "maqagr-app",
      title: "Desarrollo de Aplicación Agrícola (MaqAgr)",
      description:
        "Aplicativo web que aborda la baja mecanización del campo colombiano. Integra cálculos para verificar la compatibilidad tractor-implemento (potencia, terreno y especificaciones), apoyando decisiones que reducen costos y evitan daños al suelo.",
      stage: "desarrollo",
      focus_areas: ["Agrotech", "Productividad"],
      stack: ["Node.js", "React", "Tailwind", "MongoDB"],
      hero_image: null,
      cta_label: "Poster en AmiTIC 2025",
      cta_href: "https://www.linkedin.com/feed/update/urn:li:activity:7386808584354971648",
      start_date: new Date("2025-09-26"),
    },
    {
      slug: "devurity-web",
      title: "Pagina Oficial del Semillero Devurity",
      description:
        "Plataforma web informativa y de gestión para el semillero, destacando proyectos, eventos y facilitando la colaboración entre miembros.",
      stage: "produccion",
      focus_areas: ["Desarrollo Web", "Comunidad", "Diseño UI/UX", "Branding"],
      stack: ["Next.js", "React", "Typescript", "Open Source", "TailwindCSS", "Prisma", "PostgreSQL"],
      hero_image: null,
      cta_label: "Repositorio público",
      cta_href: "https://www.github.com/trbureiyan/DevurityWeb",
      start_date: new Date("2025-11-06"),
    },
    {
      slug: "granja-hrm",
      title: "Sistema de Gestión de Personal (Granja)",
      description:
        "Plataforma operativa para turnos, bases de datos y control documental del talento en granjas tecnificadas.",
      stage: "incubacion",
      focus_areas: ["Operaciones", "RRHH"],
      stack: [],
      hero_image: null,
      cta_label: null,
      cta_href: null,
      start_date: new Date("2025-10-16"),
    },
    {
      slug: "cancer-temprano",
      title: "Detección de Cáncer en Etapas Tempranas",
      description:
        "Flujo de trabajo para analizar información y destacar registros con características de interés.",
      stage: "experimentacion",
      focus_areas: ["Salud"],
      stack: [],
      hero_image: null,
      cta_label: null,
      cta_href: null,
      start_date: new Date("2025-08-28"),
    },
    {
      slug: "enterprise-cyber-lab",
      title: "Entorno de Ciberseguridad Empresarial",
      description:
        "Laboratorio controlado para evaluar amenazas internas, ejercicios de respuesta y cumplimiento basado en escenarios de negocio.",
      stage: "incubacion",
      focus_areas: ["Ciberseguridad", "Compliance"],
      stack: ["Linux"],
      hero_image: null,
      cta_label: null,
      cta_href: null,
      start_date: new Date("2025-09-04"),
    },
    {
      slug: "modalidad-grado",
      title: "Proyecto Modalidad de Grado",
      description:
        "Iniciativa transversal que consolida entregables académicos, investigación aplicada y transferencia de conocimiento.",
      stage: "incubacion",
      focus_areas: ["Investigacion", "Educacion"],
      stack: [],
      hero_image: null,
      cta_label: null,
      cta_href: null,
      start_date: new Date("2025-10-09"),
    },
  ];

  console.log(`⏳ Creating ${projectsCatalog.length} projects...`);

  for (const project of projectsCatalog) {
    await prisma.projects.upsert({
      where: { slug: project.slug },
      // NOTA: start_date NO se actualiza intencionalmente para preservar la fecha
      // histórica real del inicio del proyecto. Solo se establece durante la creación inicial.
      update: {
        title: project.title,
        description: project.description,
        stage: project.stage,
        focus_areas: project.focus_areas,
        stack: project.stack,
        hero_image: project.hero_image,
        cta_label: project.cta_label,
        cta_href: project.cta_href,
      },
      create: {
        slug: project.slug,
        title: project.title,
        description: project.description,
        stage: project.stage,
        focus_areas: project.focus_areas,
        stack: project.stack,
        hero_image: project.hero_image,
        cta_label: project.cta_label,
        cta_href: project.cta_href,
        start_date: project.start_date,
      },
    });
  }

  console.log(`✅ Projects processed: ${projectsCatalog.length} upserted`);

  // Crear updates/noticias iniciales
  const updates = [
    {
      slug: "certificacion-lean-six-sigma-white-belt",
      title: "Certificación Lean Six Sigma White Belt",
      display_date: "12 de noviembre 2025",
      published_at: new Date("2025-11-12"),
      description: "Invitamos a la sesión gratuita de Lean Six Sigma White Belt con certificación internacional CSSC, transmitida por Zoom para la comunidad Devurity y USCO.",
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
      description: "Participamos en la hackathon de la UNAD Zona Sur, fortaleciendo colaboración, creatividad y la conexión del equipo.",
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
      description: "Resaltamos diálogos y networking universitario en AmITIC 2025, reforzando nuestra cultura de aprendizaje compartido.",
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
      description: "Presentamos el proyecto MaqArg, que evalúa compatibilidad maquinaria-agro para impulsar mecanización sostenible en Colombia.",
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
      description: "Entrevistamos a estudiantes internacionales durante AmITIC, promoviendo redes académicas y colaboración regional.",
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
      description: "Dialogamos con directivos de la región sobre cooperación académica para fortalecer el ecosistema tecnológico.",
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
      description: "Participamos en AmITIC con conferencias, pósteres y entrevistas, consolidando proyección internacional del semillero.",
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
      description: "Acompañamos la creación de AWS UG Neiva para impulsar formación en cloud y arquitectura en la región surcolombiana.",
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
      description: "Recibimos a líderes IEEE USCO para evaluar un capítulo enfocado en desarrollo y seguridad junto a Devurity.",
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
      description: "Practicamos con RA, pantallas táctiles e impresoras 3D para fortalecer nuestra visión de innovación educativa.",
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
      description: "Consolidamos alianzas con ingeniería agrícola para llevar automatización y software a procesos de la granja experimental.",
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
      description: "El semillero presentará ponencias en AmiTIC con oportunidad de indexar proyectos.",
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
      description: "Indigo Tech visitó el semillero ofreciendo vacantes junior en cloud, DevOps y backend.",
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
      description: "Celebramos un año de proyectos, talleres y comunidad en desarrollo de software y ciberseguridad.",
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
      description: "El semillero visitó la granja USCO para plantear proyectos de modernización y apoyo técnico.",
      tags: ["Granja", "USCO", "modernización", "proyectos", "Interdisciplinario"],
      border_color: "#bf6b65",
      href: "https://www.linkedin.com/feed/update/urn:li:activity:7385374125529403392",
      is_featured: false,
    },
  ];

  console.log(`⏳ Creating ${updates.length} updates/news...`);
  let createdUpdates = 0;
  let existingUpdates = 0;

  for (const update of updates) {
    const existed = await prisma.updates.findUnique({ where: { slug: update.slug } });

    if (existed) {
      existingUpdates++;
      continue;
    }

    await prisma.updates.create({
      data: {
        slug: update.slug,
        title: update.title,
        description: update.description,
        display_date: update.display_date,
        published_at: update.published_at,
        tags: update.tags,
        border_color: update.border_color,
        href: update.href,
        is_featured: update.is_featured,
        status: "published",
      },
    });
    createdUpdates++;
  }

  console.log(`✅ Updates processed: ${createdUpdates} created, ${existingUpdates} already existed`);
  console.log("Seeding completed!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
