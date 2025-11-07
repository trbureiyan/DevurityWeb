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
    title: "Proyecto 1",
    description: "Exploración visual y lógica de sistemas integrados",
    imageUrl: "", // Placeholder - se mostrará gradiente
    tags: ["Aplicacion Web", "Agro", "React", "Node.js", "DB"],
    teamMembers: [
      { id: 1, avatarUrl: "", name: "Miembro 1" },
      { id: 2, avatarUrl: "", name: "Miembro 2" },
      { id: 3, avatarUrl: "", name: "Miembro 3" },
      { id: 4, avatarUrl: "", name: "Miembro 4" },
    ],
  },
  {
    id: 2,
    title: "Proyecto 2",
    description: "Minimalismo funcional para entornos digitales",
    imageUrl: "", // Placeholder - se mostrará gradiente
    tags: ["SaaS", "Azure", "Gaming"],
    teamMembers: [
      { id: 5, avatarUrl: "", name: "Miembro 5" },
      { id: 6, avatarUrl: "", name: "Miembro 6" },
      { id: 7, avatarUrl: "", name: "Miembro 7" },
      { id: 8, avatarUrl: "", name: "Miembro 8" },
    ],
  },
  {
    id: 3,
    title: "Proyecto 3",
    description: "Minimalismo funcional para entornos digitales",
    imageUrl: "", // Placeholder - se mostrará gradiente
    tags: ["AWS", "Campo", "IoT", "Java"],
    teamMembers: [
      { id: 9, avatarUrl: "", name: "Miembro 9" },
      { id: 10, avatarUrl: "", name: "Miembro 10" },
      { id: 11, avatarUrl: "", name: "Miembro 11" },
      { id: 12, avatarUrl: "", name: "Miembro 12" },
      { id: 13, avatarUrl: "", name: "Miembro 13" },
      { id: 14, avatarUrl: "", name: "Miembro 14" },
      { id: 15, avatarUrl: "", name: "Miembro 15" },
    ],
  },
];
