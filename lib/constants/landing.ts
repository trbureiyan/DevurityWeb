import type { Event, QuickNavItem } from "@/lib/types/landing";

// Items de navegacion rapida
export const QUICK_NAV_ITEMS: QuickNavItem[] = [
  { label: 'Bienvenido', href: '#hero' },
  { label: 'Enfoque', href: '#nosotros' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' },
];

// Legacy - mantener por compatibilidad
export const UPCOMING_EVENTS: Event[] = [
  { 
    title: 'Workshop de IA', 
    date: 'Marzo 15, 2025', 
    category: 'Taller' 
  },
  { 
    title: 'Hackathon Devurity', 
    date: 'Abril 20, 2025', 
    category: 'Competencia' 
  },
  { 
    title: 'Charla: Futuro del Desarrollo Web', 
    date: 'Mayo 10, 2025', 
    category: 'Conferencia' 
  },
];

// Placeholder de cant de proyectos

export const PROJECT_PREVIEW_COUNT = 3;

// Datos de ejemplo para proyectos destacados
export interface ProjectPreview {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  teamMembers: {
    id: number;
    avatarUrl: string;
    name: string;
  }[];
}

export const FEATURED_PROJECTS: ProjectPreview[] = [
  {
    id: 1,
    title: "SecOps Honeynet",
    description:
      "Infraestructura contenida de honeypots para observar tacticas reales y ajustar la postura defensiva con datos verificables.",
    imageUrl: "",
    tags: ["Ciberseguridad", "Python", "Honeypots", "ThreatIntel"],
    teamMembers: [
      { id: 1, avatarUrl: "", name: "Sara Rincon" },
      { id: 2, avatarUrl: "", name: "Juan Alvarez" },
      { id: 3, avatarUrl: "", name: "Miguel Rios" },
      { id: 4, avatarUrl: "", name: "Paula Torres" },
    ],
  },
  {
    id: 2,
    title: "MaqAgr compatibilidad tractor implemento",
    description:
      "Aplicativo web que reduce la brecha de mecanizacion rural validando potencia, terreno y match tractor implemento para decisiones claras.",
    imageUrl: "",
    tags: ["Agritech", "Node.js", "React", "MongoDB"],
    teamMembers: [
      { id: 5, avatarUrl: "", name: "Diana Herrera" },
      { id: 6, avatarUrl: "", name: "Luis Camacho" },
      { id: 7, avatarUrl: "", name: "Carlos Paez" },
      { id: 8, avatarUrl: "", name: "Maria Gomez" },
    ],
  },
  {
    id: 3,
    title: "Devurity Web",
    description:
      "Plataforma oficial del semillero que centraliza proyectos, eventos y operacion con una base en Next.js y Prisma.",
    imageUrl: "",
    tags: ["Next.js", "TailwindCSS", "Prisma", "OpenSource"],
    teamMembers: [
      { id: 9, avatarUrl: "", name: "Tatiana Rojas" },
      { id: 10, avatarUrl: "", name: "Brayan Trujillo" },
      { id: 11, avatarUrl: "", name: "Kevin Riano" },
      { id: 12, avatarUrl: "", name: "Camila Lopez" },
    ],
  },
];
