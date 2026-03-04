"use client";

import { useState, useEffect } from "react";

// ============ TIPOS ============
export type UpdateItem = {
  id: string;
  title: string;
  excerpt: string;
  displayDate: string;
  href?: string;
  tags: string[];
  borderColor: string;
  isLocal?: boolean;
  imageUrl?: string;
};

const ACCENT_COLOR = "#b20403";

const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop",
];

export const MOCK_UPDATES: UpdateItem[] = [
  {
    id: "1",
    title: "Lanzamiento del Semillero Devurity 2024",
    excerpt: "Iniciamos nuevo ciclo con proyectos en ciberseguridad y ciencia de datos. ¡Inscripciones abiertas!",
    displayDate: "15 MAR 2024",
    href: "/updates/1",
    tags: ["lanzamiento", "convocatoria", "2024"],
    borderColor: ACCENT_COLOR,
    imageUrl: MOCK_IMAGES[0],
  },
  {
    id: "2",
    title: "Taller de Ethical Hacking",
    excerpt: "Taller práctico de introducción al hacking ético con herramientas open source.",
    displayDate: "05 ABR 2024",
    href: "/updates/2",
    tags: ["taller", "ciberseguridad", "ethical-hacking"],
    borderColor: ACCENT_COLOR,
    imageUrl: MOCK_IMAGES[1],
  },
  {
    id: "3",
    title: "Alianza con empresa tecnológica",
    excerpt: "Nueva alianza estratégica para pasantías y proyectos conjuntos.",
    displayDate: "20 ABR 2024",
    href: "/updates/3",
    tags: ["alianza", "oportunidades", "pasantías"],
    borderColor: ACCENT_COLOR,
    imageUrl: MOCK_IMAGES[2],
  },
  {
    id: "4",
    title: "Workshop de Machine Learning",
    excerpt: "Introducción a ML con Python para análisis de datos de seguridad.",
    displayDate: "02 MAY 2024",
    href: "/updates/4",
    tags: ["workshop", "machine-learning", "python"],
    borderColor: ACCENT_COLOR,
    imageUrl: MOCK_IMAGES[3],
  },
  {
    id: "5",
    title: "Participación en Congreso Nacional",
    excerpt: "Delegación de Devurity presentará proyectos en congreso de ingeniería.",
    displayDate: "15 MAY 2024",
    href: "/updates/5",
    tags: ["evento", "congreso", "presentación"],
    borderColor: ACCENT_COLOR,
    imageUrl: MOCK_IMAGES[4],
  },
  {
    id: "6",
    title: "Curso de Desarrollo Seguro",
    excerpt: "Nuevo curso de buenas prácticas de seguridad en desarrollo de software.",
    displayDate: "01 JUN 2024",
    href: "/updates/6",
    tags: ["curso", "devsecops", "seguridad"],
    borderColor: ACCENT_COLOR,
    imageUrl: MOCK_IMAGES[5],
  },
  {
    id: "7",
    title: "Meetup de Ciberseguridad",
    excerpt: "Meetup mensual con expertos de la industria local.",
    displayDate: "10 JUN 2024",
    href: "/updates/7",
    tags: ["meetup", "networking", "industria"],
    borderColor: ACCENT_COLOR,
    imageUrl: MOCK_IMAGES[6],
  },
];

/**
 * Hook que devuelve TODAS las noticias (locales + mock),
 * con las locales al principio (más recientes primero).
 * Se puede usar tanto en updates/page.tsx como en el landing.
 */
export function useUpdates() {
  const [allUpdates, setAllUpdates] = useState<UpdateItem[]>(MOCK_UPDATES);

  // Clave única en localStorage
  const STORAGE_KEY = "devurity-local-updates";

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed: UpdateItem[] = JSON.parse(raw);
        const existingIds = new Set(MOCK_UPDATES.map((u) => u.id));
        const onlyNew = parsed
          .filter((u) => !existingIds.has(u.id))
          .map((u) => ({ ...u, borderColor: ACCENT_COLOR }));
        if (onlyNew.length > 0) {
          setAllUpdates([...onlyNew, ...MOCK_UPDATES]);
        }
      } catch {
        // localStorage corrupto, ignorar
      }
    };

    load();

    // Escuchar cambios en otras pestañas / componentes
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) load();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const persistLocal = (updates: UpdateItem[]) => {
    const localItems = updates.filter((u) => u.isLocal);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(localItems));
    // Disparar evento para que otros componentes en la misma pestaña se actualicen
    window.dispatchEvent(new Event("devurity-updates-changed"));
  };

  const addUpdate = (newUpdate: UpdateItem) => {
    const updated = [newUpdate, ...allUpdates];
    setAllUpdates(updated);
    persistLocal(updated);
  };

  const editUpdate = (edited: UpdateItem) => {
    const updated = allUpdates.map((u) => (u.id === edited.id ? edited : u));
    setAllUpdates(updated);
    persistLocal(updated);
  };

  const deleteUpdate = (id: string) => {
    const updated = allUpdates.filter((u) => u.id !== id);
    setAllUpdates(updated);
    persistLocal(updated);
  };

  return { allUpdates, setAllUpdates, addUpdate, editUpdate, deleteUpdate };
}