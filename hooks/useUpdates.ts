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

// Mantenido para compatibilidad con imports existentes — datos reales provienen de la DB
export const MOCK_UPDATES: UpdateItem[] = [];

const STORAGE_KEY = "devurity-local-updates";

// Keeps the first occurrence of each id. Local items should be prepended so
// they win over DB items when both share an id (e.g. an edited DB entry). [!]
function deduplicateById(items: UpdateItem[]): UpdateItem[] {
  const seen = new Set<string>();
  return items.filter((u) => {
    if (seen.has(u.id)) return false;
    seen.add(u.id);
    return true;
  });
}

/**
 * Hook que fusiona datos de la base de datos (initialData) con adiciones locales
 * guardadas en localStorage.
 *
 * @param initialData - Datos precargados desde la DB por el Server Component padre.
 */
export function useUpdates(initialData: UpdateItem[] = []) {
  // Deduplicate on the very first render so EditPanel never sees duplicate keys
  // even before the useEffect fires. [!]
  const [allUpdates, setAllUpdates] = useState<UpdateItem[]>(() =>
    deduplicateById(initialData)
  );

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          setAllUpdates(deduplicateById(initialData));
          return;
        }
        const parsed: UpdateItem[] = JSON.parse(raw);
        // Solo los items marcados como locales se persisten en localStorage
        const localItems = parsed.filter((u) => u.isLocal);
        if (localItems.length > 0) {
          // Local items take precedence; drop any DB item whose id is already
          // covered by a local edit to prevent duplicate React keys. [!]
          setAllUpdates(deduplicateById([...localItems, ...initialData]));
        } else {
          setAllUpdates(deduplicateById(initialData));
        }
      } catch {
        // localStorage corrupto, ignorar
        setAllUpdates(deduplicateById(initialData));
      }
    };

    load();

    // Escuchar cambios en otras pestañas / componentes
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) load();
    };
    const handleCustom = () => load();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("devurity-updates-changed", handleCustom);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("devurity-updates-changed", handleCustom);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persistLocal = (updates: UpdateItem[]) => {
    const localItems = updates.filter((u) => u.isLocal);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(localItems));
    // Disparar evento para que otros componentes en la misma pestaña se actualicen
    window.dispatchEvent(new Event("devurity-updates-changed"));
  };

  const addUpdate = (newUpdate: UpdateItem) => {
    const updated = deduplicateById([newUpdate, ...allUpdates]);
    setAllUpdates(updated);
    persistLocal(updated);
  };

  const editUpdate = (edited: UpdateItem) => {
    const marked = { ...edited, isLocal: true };
    const updated = allUpdates.map((u) => (u.id === edited.id ? marked : u));
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
