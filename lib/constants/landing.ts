import type { Event, QuickNavItem } from "@/lib/types/landing";

// Items de navegacion rapida
export const QUICK_NAV_ITEMS: QuickNavItem[] = [
  { label: 'Bienvenido', href: '#hero' },
  { label: 'Enfoque', href: '#nosotros' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' },
];

// Info eventos y noticias
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
