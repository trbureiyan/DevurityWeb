"use client";

import { useState } from "react";
import { useCsrf } from "@/hooks/useCsrf";

// ============ TIPOS ============
export type UpdateItem = {
  id: string;
  title: string;
  excerpt: string;
  displayDate: string;
  href?: string;
  tags: string[];
  borderColor: string;
  imageUrl?: string;
};

// Mantenido para compatibilidad con imports existentes — datos reales provienen de la DB
export const MOCK_UPDATES: UpdateItem[] = [];

/**
 * Hook que gestiona las actualizaciones (noticias y eventos) conectándose
 * con la base de datos a través de la API REST del backend con tokens CSRF.
 *
 * @param initialData - Datos precargados desde la DB por el Server Component padre.
 */
export function useUpdates(initialData: UpdateItem[] = []) {
  const [allUpdates, setAllUpdates] = useState<UpdateItem[]>(initialData);
  const { fetchWithCsrf } = useCsrf();

  const addUpdate = async (item: Omit<UpdateItem, "id">) => {
    const response = await fetchWithCsrf("/api/updates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: item.title,
        excerpt: item.excerpt,
        displayDate: item.displayDate,
        tags: item.tags,
        href: item.href,
        borderColor: item.borderColor,
      }),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "Error al crear la actualización");
    }

    setAllUpdates((prev) => [result.data, ...prev]);
    return result.data;
  };

  const editUpdate = async (item: UpdateItem) => {
    const response = await fetchWithCsrf(`/api/updates/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: item.title,
        excerpt: item.excerpt,
        displayDate: item.displayDate,
        tags: item.tags,
        href: item.href,
        borderColor: item.borderColor,
      }),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "Error al actualizar la actualización");
    }

    setAllUpdates((prev) =>
      prev.map((u) => (u.id === item.id ? result.data : u))
    );
    return result.data;
  };

  const deleteUpdate = async (id: string) => {
    const response = await fetchWithCsrf(`/api/updates/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "Error al eliminar la actualización");
    }

    setAllUpdates((prev) => prev.filter((u) => u.id !== id));
  };

  return { allUpdates, setAllUpdates, addUpdate, editUpdate, deleteUpdate };
}