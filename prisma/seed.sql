-- Script para insertar roles base en la base de datos
-- Ejecuta este script en tu base de datos PostgreSQL

-- Insertar roles si no existen
INSERT INTO roles (name) VALUES ('admin')
ON CONFLICT (name) DO NOTHING;

INSERT INTO roles (name) VALUES ('user')
ON CONFLICT (name) DO NOTHING;

-- Insertar skills
INSERT INTO public.skills ("name") VALUES
	 ('Python'),
	 ('JavaScript'),
	 ('Java'),
	 ('C'),
	 ('C++'),
	 ('C#'),
	 ('SQL'),
	 ('TypeScript'),
	 ('PHP'),
	 ('Go')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.skills ("name") VALUES
	 ('Swift'),
	 ('Kotlin'),
	 ('Ruby'),
	 ('R'),
	 ('Dart'),
	 ('MATLAB'),
	 ('Shell (Bash)'),
	 ('Assembly Language'),
	 ('Objective-C'),
	 ('Visual Basic (.NET)')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.skills ("name") VALUES
	 ('Lua'),
	 ('Django'),
	 ('Flask'),
	 ('FastAPI'),
	 ('TensorFlow'),
	 ('PyTorch'),
	 ('React'),
	 ('Next.js'),
	 ('Express.js'),
	 ('Vue.js')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.skills ("name") VALUES
	 ('Angular'),
	 ('NestJS'),
	 ('Spring Boot'),
	 ('Qt'),
	 ('Boost'),
	 ('Unreal Engine'),
	 ('.NET'),
	 ('ASP.NET Core'),
	 ('Unity'),
	 ('Laravel')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.skills ("name") VALUES
	 ('Symfony'),
	 ('CodeIgniter'),
	 ('Gin'),
	 ('Fiber'),
	 ('Echo'),
	 ('SwiftUI'),
	 ('Vapor'),
	 ('Ktor'),
	 ('Jetpack Compose'),
	 ('Ruby on Rails')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.skills ("name") VALUES
	 ('Shiny'),
	 ('ggplot2'),
	 ('tidyverse'),
	 ('Flutter'),
	 ('Simulink'),
	 ('Deep Learning Toolbox'),
	 ('NASM'),
	 ('MASM'),
	 ('GAS'),
	 ('Cocoa')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.skills ("name") VALUES
	 ('Cocoa Touch'),
	 ('.NET Framework'),
	 ('.NET Core'),
	 ('LÖVE2D'),
	 ('Solar2D'),
	 ('Cloud Computing'),
	 ('AWS'),
	 ('Azure'),
	 ('Google Cloud'),
	 ('DigitalOcean')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.skills ("name") VALUES
	 ('Vercel'),
	 ('Netlify'),
	 ('DevOps'),
	 ('Docker'),
	 ('Kubernetes'),
	 ('CI/CD'),
	 ('Jenkins'),
	 ('GitHub Actions'),
	 ('Ciberseguridad'),
	 ('Pentesting')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.skills ("name") VALUES
	 ('OWASP'),
	 ('Seguridad de APIs'),
	 ('Hardening'),
	 ('Firewalls'),
	 ('Inteligencia Artificial'),
	 ('Machine Learning'),
	 ('Deep Learning'),
	 ('NLP'),
	 ('Computer Vision'),
	 ('Data Science')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.skills ("name") VALUES
	 ('Mobile Development'),
	 ('Frontend Development'),
	 ('Backend Development'),
	 ('Blockchain / Web3'),
	 ('Testing / QA'),
	 ('Jest'),
	 ('Cypress'),
	 ('Selenium'),
	 ('Playwright'),
	 ('PostgreSQL')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.skills ("name") VALUES
	 ('MySQL'),
	 ('MongoDB'),
	 ('Redis'),
	 ('Firebase'),
	 ('Figma'),
	 ('Adobe XD'),
	 ('Tailwind CSS'),
	 ('Material UI'),
	 ('Bootstrap'),
	 ('Chakra UI')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.skills ("name") VALUES
	 ('Bulma'),
	 ('Foundation'),
	 ('Ant Design'),
	 ('Semantic UI'),
	 ('jQuery'),
	 ('REST'),
	 ('GraphQL'),
	 ('gRPC'),
	 ('WebSockets'),
	 ('SOAP')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.skills ("name") VALUES
	 ('Rust')
ON CONFLICT (name) DO NOTHING;

-- Insertar plataformas
INSERT INTO public.platforms ("name") VALUES
	 ('GitHub'),
	 ('ORCID'),
	 ('Bento.me'),
	 ('Linktree'),
	 ('YouTube'),
	 ('Twitter'),
	 ('Facebook'),
	 ('LinkedIn'),
	 ('Instagram'),
	 ('Website')
ON CONFLICT DO NOTHING;

-- Insertar programas académicos
INSERT INTO public.programs ("name") VALUES
	 ('Física'),
	 ('Matemática Aplicada'),
	 ('Biología Aplicada'),
	 ('Ciencia Política'),
	 ('Derecho'),
	 ('Antropología'),
	 ('Comunicación Social y Periodismo'),
	 ('Psicología'),
	 ('Administración de Empresas'),
	 ('Administración Financiera')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.programs ("name") VALUES
	 ('Administración Turística y Hotelera'),
	 ('Economía'),
	 ('Contaduría Pública'),
	 ('Licenciatura en Ciencias Naturales y Educación Ambiental'),
	 ('Licenciatura en Ciencias Sociales'),
	 ('Licenciatura en Educación Artística'),
	 ('Licenciatura en Educación Física, Recreación y Deportes'),
	 ('Licenciatura en Educación Infantil'),
	 ('Licenciatura en Lenguas Extranjeras con Énfasis en Inglés'),
	 ('Licenciatura en Literatura y Lengua Castellana')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.programs ("name") VALUES
	 ('Licenciatura en Matemáticas'),
	 ('Ingeniería Agrícola'),
	 ('Ingeniería Agroindustrial'),
	 ('Ingeniería Civil'),
	 ('Ingeniería de Petróleos'),
	 ('Ingeniería de Software'),
	 ('Ingeniería Electrónica'),
	 ('Tecnología en Construcción de Obras Civiles'),
	 ('Tecnología en Desarrollo de Software')
ON CONFLICT (name) DO NOTHING;

-- Insertar updates/noticias
INSERT INTO public.updates (slug, title, display_date, published_at, description, tags, border_color, href, is_featured, status) VALUES
	 ('certificacion-lean-six-sigma-white-belt', 'Certificación Lean Six Sigma White Belt', '12 de noviembre 2025', '2025-11-12', 'Invitamos a la sesión gratuita de Lean Six Sigma White Belt con certificación internacional CSSC, transmitida por Zoom para la comunidad Devurity y USCO.', ARRAY['Devurity', 'LeanSixSigma', 'Certificación', 'USCO', 'Capacitación'], '#454f5e', 'https://www.linkedin.com/feed/update/urn:li:activity:7392748576474554369', true, 'published')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.updates (slug, title, display_date, published_at, description, tags, border_color, href, is_featured, status) VALUES
	 ('devurity-hackathon-unad-zona-sur-2025', 'Devurity en la Hackathon UNAD Zona Sur 2025', '22 de octubre 2025', '2025-10-22', 'Participamos en la hackathon de la UNAD Zona Sur, fortaleciendo colaboración, creatividad y la conexión del equipo.', ARRAY['Devurity', 'Hackathon', 'UNAD', 'Ciberseguridad', 'ComunidadTecnológica'], '#454f5e', 'https://www.linkedin.com/feed/update/urn:li:activity:7387895753362391040', false, 'published'),
	 ('espacios-colaborativos-amitic-2025', 'Celebramos espacios colaborativos en AmITIC 2025', '22 de octubre 2025', '2025-10-22', 'Resaltamos diálogos y networking universitario en AmITIC 2025, reforzando nuestra cultura de aprendizaje compartido.', ARRAY['Devurity', 'AmITIC2025', 'Colaboración', 'USCO', 'Innovación'], '#5d5d63', 'https://www.linkedin.com/company/devurity', false, 'published'),
	 ('maqarg-ingenieria-software-agro', 'MaqArg: ingeniería de software para el agro', '21 de octubre 2025', '2025-10-21', 'Presentamos el proyecto MaqArg, que evalúa compatibilidad maquinaria-agro para impulsar mecanización sostenible en Colombia.', ARRAY['Devurity', 'Agritech', 'Investigación', 'Sostenibilidad', 'AmITIC2025'], '#f28881', 'https://www.linkedin.com/feed/update/urn:li:activity:7386808584354971648', false, 'published'),
	 ('intercambio-academico-latinoamerica', 'Intercambio académico con universidades latinoamericanas', '21 de octubre 2025', '2025-10-21', 'Entrevistamos a estudiantes internacionales durante AmITIC, promoviendo redes académicas y colaboración regional.', ARRAY['Devurity', 'IntercambioAcadémico', 'AmITIC2025', 'USCO', 'Innovación'], '#21202e', 'https://www.linkedin.com/feed/update/urn:li:activity:7386536771872010240', false, 'published'),
	 ('conversacion-lideres-academicos-amitic', 'Conversación con líderes académicos en AmITIC', '20 de octubre 2025', '2025-10-20', 'Dialogamos con directivos de la región sobre cooperación académica para fortalecer el ecosistema tecnológico.', ARRAY['Devurity', 'AmITIC2025', 'InnovaciónUniversitaria', 'USCO', 'Liderazgo'], '#bf6b65', 'https://www.linkedin.com/feed/update/urn:li:activity:7386446183587819520', false, 'published')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.updates (slug, title, display_date, published_at, description, tags, border_color, href, is_featured, status) VALUES
	 ('devurity-congreso-internacional-amitic-2025', 'Devurity en el Congreso Internacional AmITIC 2025', '19 de octubre 2025', '2025-10-19', 'Participamos en AmITIC con conferencias, pósteres y entrevistas, consolidando proyección internacional del semillero.', ARRAY['Devurity', 'AmITIC2025', 'Ciberseguridad', 'Investigación', 'PromptEngineering'], '#454f5e', 'https://www.linkedin.com/feed/update/urn:li:activity:7386083836922580992', false, 'published'),
	 ('fundacion-aws-users-group-neiva', 'Fundación de AWS Users Group Neiva', '19 de octubre 2025', '2025-10-19', 'Acompañamos la creación de AWS UG Neiva para impulsar formación en cloud y arquitectura en la región surcolombiana.', ARRAY['Devurity', 'AWSCommunity', 'CloudComputing', 'Innovación', 'ComunidadTecnológica'], '#5d5d63', 'https://www.linkedin.com/feed/update/urn:li:activity:7385736502271516672', false, 'published'),
	 ('alianza-exploratoria-ieee-usco', 'Alianza exploratoria con líderes IEEE USCO', '18 de octubre 2025', '2025-10-18', 'Recibimos a líderes IEEE USCO para evaluar un capítulo enfocado en desarrollo y seguridad junto a Devurity.', ARRAY['Devurity', 'IEEE', 'USCO', 'Ciberseguridad', 'InnovaciónUniversitaria'], '#9e6777', 'https://www.linkedin.com/feed/update/urn:li:activity:7385691211744976896', false, 'published'),
	 ('salas-tecnologicas-stem-usco', 'Exploramos las salas tecnológicas STEM+ de la USCO', '18 de octubre 2025', '2025-10-18', 'Practicamos con RA, pantallas táctiles e impresoras 3D para fortalecer nuestra visión de innovación educativa.', ARRAY['Devurity', 'STEM', 'InnovaciónEducativa', 'USCO', 'Tecnología'], '#5d5d63', 'https://www.linkedin.com/feed/update/urn:li:activity:7385419409265278976', false, 'published'),
	 ('colaboracion-granja-experimental-usco', 'Colaboración en la Granja Experimental USCO', '18 de octubre 2025', '2025-10-18', 'Consolidamos alianzas con ingeniería agrícola para llevar automatización y software a procesos de la granja experimental.', ARRAY['Devurity', 'USCO', 'InnovaciónUniversitaria', 'TecnologíaSostenible', 'Ciberseguridad'], '#454f5e', 'https://www.linkedin.com/feed/update/urn:li:activity:7385374125529403392', false, 'published')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.updates (slug, title, display_date, published_at, description, tags, border_color, href, is_featured, status) VALUES
	 ('semillero-participa-amitic-2025', 'Semillero participará en AmiTIC con ponencias y ...', '24-26 de septiembre 2025', '2025-09-24', 'El semillero presentará ponencias en AmiTIC con oportunidad de indexar proyectos.', ARRAY['AmiTIC', 'USCO', 'indexación', 'ponencias', 'Internacional'], '#63768d', 'https://www.linkedin.com/feed/update/urn:li:activity:7386808584354971648', false, 'published'),
	 ('indigo-tech-vacantes-cloud-backend', 'Indigo Tech abre vacantes junior en cloud y backend', '13 de agosto 2025', '2025-08-13', 'Indigo Tech visitó el semillero ofreciendo vacantes junior en cloud, DevOps y backend.', ARRAY['Pasantias', 'Frontend', 'Backend', 'Cloud', 'Latam'], '#d5d9e9', NULL, false, 'published'),
	 ('devurity-primer-anio', 'Devurity cumple su primer año', '24 de agosto 2025', '2025-07-24', 'Celebramos un año de proyectos, talleres y comunidad en desarrollo de software y ciberseguridad.', ARRAY['Devurity', 'Ciberseguridad', 'DesarrolloDeSoftware', 'InnovaciónUniversitaria', 'USCO'], '#5d5d63', 'https://www.linkedin.com/feed/update/urn:li:activity:7385328819781521408', false, 'published'),
	 ('visita-granja-usco', 'Visita a la granja USCO', '2024-2', '2024-02-01', 'El semillero visitó la granja USCO para plantear proyectos de modernización y apoyo técnico.', ARRAY['Granja', 'USCO', 'modernización', 'proyectos', 'Interdisciplinario'], '#bf6b65', 'https://www.linkedin.com/feed/update/urn:li:activity:7385374125529403392', false, 'published')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Insertar / actualizar catálogo de proyectos
-- Fuente de verdad: prisma/seeders/05-projects.ts
-- NOTA: start_date NO se actualiza en ON CONFLICT para preservar
--       la fecha histórica real de inicio del proyecto.
-- ============================================================

-- ── En Continuidad ─────────────────────────────────────────────────────────

INSERT INTO public.projects (slug, title, description, stage, focus_areas, stack, hero_image, cta_label, cta_href, start_date, is_archived)
VALUES (
  'cancer-temprano',
  'Detección de Cáncer (IA)',
  'Pipeline de IA para analizar registros clínicos y resaltar señales de interés en etapas tempranas, reduciendo el tiempo de triaje diagnóstico.',
  'desarrollo',
  ARRAY['Salud', 'Inteligencia Artificial'],
  ARRAY['Python', 'Machine Learning', 'Deep Learning'],
  NULL, NULL, NULL,
  '2025-08-28',
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title        = EXCLUDED.title,
  description  = EXCLUDED.description,
  stage        = EXCLUDED.stage,
  focus_areas  = EXCLUDED.focus_areas,
  stack        = EXCLUDED.stack,
  hero_image   = EXCLUDED.hero_image,
  cta_label    = EXCLUDED.cta_label,
  cta_href     = EXCLUDED.cta_href,
  is_archived  = EXCLUDED.is_archived,
  updated_at   = NOW();

INSERT INTO public.projects (slug, title, description, stage, focus_areas, stack, hero_image, cta_label, cta_href, start_date, is_archived)
VALUES (
  'secops-honeynet',
  'Honeypot / SecOps Honeynet',
  'Infraestructura contenida de honeypots para observar tácticas reales y ajustar la postura defensiva con datos verificables.',
  'desarrollo',
  ARRAY['Ciberseguridad'],
  ARRAY['Python', 'Linux', 'Docker'],
  NULL, NULL, NULL,
  '2025-09-04',
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title        = EXCLUDED.title,
  description  = EXCLUDED.description,
  stage        = EXCLUDED.stage,
  focus_areas  = EXCLUDED.focus_areas,
  stack        = EXCLUDED.stack,
  is_archived  = EXCLUDED.is_archived,
  updated_at   = NOW();

INSERT INTO public.projects (slug, title, description, stage, focus_areas, stack, hero_image, cta_label, cta_href, start_date, is_archived)
VALUES (
  'plataforma-aprendizaje',
  'Plataforma Web de Aprendizaje',
  'Entorno web interactivo para cursos, recursos y seguimiento del progreso académico dirigido a la comunidad universitaria.',
  'desarrollo',
  ARRAY['Educación', 'Desarrollo Web'],
  ARRAY['Next.js', 'React', 'TypeScript', 'PostgreSQL'],
  NULL, NULL, NULL,
  '2025-10-01',
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title        = EXCLUDED.title,
  description  = EXCLUDED.description,
  stage        = EXCLUDED.stage,
  focus_areas  = EXCLUDED.focus_areas,
  stack        = EXCLUDED.stack,
  is_archived  = EXCLUDED.is_archived,
  updated_at   = NOW();

INSERT INTO public.projects (slug, title, description, stage, focus_areas, stack, hero_image, cta_label, cta_href, start_date, is_archived)
VALUES (
  'maqagr-app',
  'Desarrollo de Aplicación Agrícola (MaqAgr)',
  'Aplicativo web que evalúa compatibilidad tractor-implemento (potencia, terreno y especificaciones), apoyando decisiones que reducen costos y evitan daños al suelo.',
  'desarrollo',
  ARRAY['Agrotech', 'Productividad'],
  ARRAY['Node.js', 'React', 'Tailwind CSS', 'MongoDB'],
  NULL,
  'Poster en AmiTIC 2025',
  'https://www.linkedin.com/feed/update/urn:li:activity:7386808584354971648',
  '2025-09-26',
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title        = EXCLUDED.title,
  description  = EXCLUDED.description,
  stage        = EXCLUDED.stage,
  focus_areas  = EXCLUDED.focus_areas,
  stack        = EXCLUDED.stack,
  cta_label    = EXCLUDED.cta_label,
  cta_href     = EXCLUDED.cta_href,
  is_archived  = EXCLUDED.is_archived,
  updated_at   = NOW();

INSERT INTO public.projects (slug, title, description, stage, focus_areas, stack, hero_image, cta_label, cta_href, start_date, is_archived)
VALUES (
  'devurity-web',
  'Página Oficial del Semillero Devurity',
  'Plataforma web informativa y de gestión para el semillero, destacando proyectos, eventos y facilitando la colaboración entre miembros.',
  'produccion',
  ARRAY['Desarrollo Web', 'Comunidad', 'Diseño UI/UX', 'Branding'],
  ARRAY['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Prisma', 'PostgreSQL'],
  NULL,
  'Repositorio público',
  'https://www.github.com/trbureiyan/DevurityWeb',
  '2025-11-06',
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title        = EXCLUDED.title,
  description  = EXCLUDED.description,
  stage        = EXCLUDED.stage,
  focus_areas  = EXCLUDED.focus_areas,
  stack        = EXCLUDED.stack,
  cta_label    = EXCLUDED.cta_label,
  cta_href     = EXCLUDED.cta_href,
  is_archived  = EXCLUDED.is_archived,
  updated_at   = NOW();

INSERT INTO public.projects (slug, title, description, stage, focus_areas, stack, hero_image, cta_label, cta_href, start_date, is_archived)
VALUES (
  'etflow',
  'ETFlow',
  'Herramienta de automatización de flujos ETL orientada a integrar fuentes de datos heterogéneas con bajo código.',
  'desarrollo',
  ARRAY['Data Science', 'Backend Development'],
  ARRAY['Python', 'TypeScript'],
  NULL, NULL, NULL,
  '2025-10-01',
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title        = EXCLUDED.title,
  description  = EXCLUDED.description,
  stage        = EXCLUDED.stage,
  focus_areas  = EXCLUDED.focus_areas,
  stack        = EXCLUDED.stack,
  is_archived  = EXCLUDED.is_archived,
  updated_at   = NOW();

-- ── En Pausa / Definición ───────────────────────────────────────────────────

INSERT INTO public.projects (slug, title, description, stage, focus_areas, stack, hero_image, cta_label, cta_href, start_date, is_archived)
VALUES (
  'sistema-gestion-personal',
  'Sistema de Gestión de Personal',
  'Plataforma para administrar nóminas, turnos, documentos y desempeño del talento humano en organizaciones medianas.',
  'pausa',
  ARRAY['Operaciones', 'RRHH'],
  ARRAY[]::text[],
  NULL, NULL, NULL,
  '2025-10-16',
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title        = EXCLUDED.title,
  description  = EXCLUDED.description,
  stage        = EXCLUDED.stage,
  focus_areas  = EXCLUDED.focus_areas,
  is_archived  = EXCLUDED.is_archived,
  updated_at   = NOW();

INSERT INTO public.projects (slug, title, description, stage, focus_areas, stack, hero_image, cta_label, cta_href, start_date, is_archived)
VALUES (
  'granja-hrm',
  'Gestión de Personal de la Granja',
  'Plataforma operativa para turnos, bases de datos y control documental del talento en granjas tecnificadas.',
  'pausa',
  ARRAY['Operaciones', 'RRHH', 'Agrotech'],
  ARRAY[]::text[],
  NULL, NULL, NULL,
  '2025-10-16',
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title        = EXCLUDED.title,
  description  = EXCLUDED.description,
  stage        = EXCLUDED.stage,
  focus_areas  = EXCLUDED.focus_areas,
  is_archived  = EXCLUDED.is_archived,
  updated_at   = NOW();

INSERT INTO public.projects (slug, title, description, stage, focus_areas, stack, hero_image, cta_label, cta_href, start_date, is_archived)
VALUES (
  'enterprise-cyber-lab',
  'Entorno de Ciberseguridad Empresarial',
  'Laboratorio controlado para evaluar amenazas internas, ejercicios de respuesta y cumplimiento basado en escenarios de negocio.',
  'pausa',
  ARRAY['Ciberseguridad', 'Compliance'],
  ARRAY['Linux'],
  NULL, NULL, NULL,
  '2025-09-04',
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title        = EXCLUDED.title,
  description  = EXCLUDED.description,
  stage        = EXCLUDED.stage,
  focus_areas  = EXCLUDED.focus_areas,
  stack        = EXCLUDED.stack,
  is_archived  = EXCLUDED.is_archived,
  updated_at   = NOW();

INSERT INTO public.projects (slug, title, description, stage, focus_areas, stack, hero_image, cta_label, cta_href, start_date, is_archived)
VALUES (
  'nutriplant',
  'Nutriplant',
  'Sistema de monitoreo y recomendación de nutrición vegetal para optimizar rendimientos en cultivos controlados.',
  'pausa',
  ARRAY['Agrotech', 'Inteligencia Artificial'],
  ARRAY[]::text[],
  NULL, NULL, NULL,
  '2025-10-01',
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title        = EXCLUDED.title,
  description  = EXCLUDED.description,
  stage        = EXCLUDED.stage,
  focus_areas  = EXCLUDED.focus_areas,
  is_archived  = EXCLUDED.is_archived,
  updated_at   = NOW();

INSERT INTO public.projects (slug, title, description, stage, focus_areas, stack, hero_image, cta_label, cta_href, start_date, is_archived)
VALUES (
  'modelo-pruebas-psicologia',
  'Modelo de Pruebas para Psicología',
  'Plataforma digital para administrar, calificar y analizar baterías psicológicas estandarizadas.',
  'pausa',
  ARRAY['Salud', 'Educación'],
  ARRAY[]::text[],
  NULL, NULL, NULL,
  '2025-10-01',
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title        = EXCLUDED.title,
  description  = EXCLUDED.description,
  stage        = EXCLUDED.stage,
  focus_areas  = EXCLUDED.focus_areas,
  is_archived  = EXCLUDED.is_archived,
  updated_at   = NOW();

INSERT INTO public.projects (slug, title, description, stage, focus_areas, stack, hero_image, cta_label, cta_href, start_date, is_archived)
VALUES (
  'conteo-enfermedades-alevinos',
  'Conteo y Clasificación de Enfermedades en Alevinos',
  'Sistema de visión por computadora para detectar y clasificar enfermedades en alevinos durante la etapa de cría.',
  'pausa',
  ARRAY['Computer Vision', 'Agrotech', 'Inteligencia Artificial'],
  ARRAY['Python', 'Computer Vision'],
  NULL, NULL, NULL,
  '2025-10-01',
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title        = EXCLUDED.title,
  description  = EXCLUDED.description,
  stage        = EXCLUDED.stage,
  focus_areas  = EXCLUDED.focus_areas,
  stack        = EXCLUDED.stack,
  is_archived  = EXCLUDED.is_archived,
  updated_at   = NOW();

INSERT INTO public.projects (slug, title, description, stage, focus_areas, stack, hero_image, cta_label, cta_href, start_date, is_archived)
VALUES (
  'modulo-inventario-granja',
  'Módulo Inventario y Auditorías Granja',
  'Módulo de control de inventario y auditorías internas para la gestión eficiente de activos en granjas experimentales.',
  'pausa',
  ARRAY['Operaciones', 'Agrotech'],
  ARRAY[]::text[],
  NULL, NULL, NULL,
  '2025-10-01',
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title        = EXCLUDED.title,
  description  = EXCLUDED.description,
  stage        = EXCLUDED.stage,
  focus_areas  = EXCLUDED.focus_areas,
  is_archived  = EXCLUDED.is_archived,
  updated_at   = NOW();

-- ── Cancelados (archivados) ─────────────────────────────────────────────────

INSERT INTO public.projects (slug, title, description, stage, focus_areas, stack, hero_image, cta_label, cta_href, start_date, is_archived)
VALUES (
  'videojuego-emociones',
  'Videojuego sobre Emociones',
  'Videojuego educativo orientado al reconocimiento y gestión emocional para niños en edad escolar.',
  'incubacion',
  ARRAY['Educación', 'Salud'],
  ARRAY[]::text[],
  NULL, NULL, NULL,
  '2025-10-01',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title        = EXCLUDED.title,
  description  = EXCLUDED.description,
  is_archived  = EXCLUDED.is_archived,
  updated_at   = NOW();

INSERT INTO public.projects (slug, title, description, stage, focus_areas, stack, hero_image, cta_label, cta_href, start_date, is_archived)
VALUES (
  'modalidad-grado',
  'Proyecto Modalidad de Grado',
  'Iniciativa transversal que consolida entregables académicos, investigación aplicada y transferencia de conocimiento.',
  'incubacion',
  ARRAY['Investigación', 'Educación'],
  ARRAY[]::text[],
  NULL, NULL, NULL,
  '2025-10-09',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title        = EXCLUDED.title,
  description  = EXCLUDED.description,
  is_archived  = EXCLUDED.is_archived,
  updated_at   = NOW();

-- Verificar datos insertados
SELECT * FROM roles;
SELECT COUNT(*) as total_skills FROM skills;
SELECT COUNT(*) as total_platforms FROM platforms;
SELECT COUNT(*) as total_programs FROM programs;
SELECT COUNT(*) as total_projects FROM projects;
SELECT COUNT(*) as total_updates FROM updates;

-- ============================================================
-- Si después de restaurar un backup aparece P2002 en (id),
-- ejecutar: npx prisma db execute --file prisma/repair-sequences.sql --schema prisma/schema.prisma
-- ============================================================
