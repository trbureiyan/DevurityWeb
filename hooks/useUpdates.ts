"use client";

import { useReducer, useEffect, useCallback } from "react";
import { useCsrf } from "@/hooks/useCsrf";

export class UpdatesApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = "UpdatesApiError";
  }
}

// ============ TIPOS ============
export type UpdateItem = {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  displayDate: string;
  href?: string;
  tags: string[];
  borderColor: string;
  imageUrl?: string;
};

// Mantenido para compatibilidad con imports existentes — datos reales provienen de la DB
export const MOCK_UPDATES: UpdateItem[] = [];

async function parseApiResponse<T = unknown>(response: Response): Promise<{ success: boolean; data?: T; error?: string }> {
  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.success) {
    throw new UpdatesApiError(
      result?.error || "No se pudo completar la operación",
      response.status,
    );
  }
  return result;
}

type UpdateAction =
  | { type: "SET_ALL"; payload: UpdateItem[] }
  | { type: "ADD"; payload: UpdateItem }
  | { type: "EDIT"; payload: UpdateItem }
  | { type: "DELETE"; payload: string };

/**
 * Reducer para centralizar los cambios de estado de las actualizaciones.
 *
 * @param state - El estado actual de los elementos de actualización.
 * @param action - La acción a ejecutar.
 * @returns El nuevo estado de los elementos.
 */
function updatesReducer(state: UpdateItem[], action: UpdateAction): UpdateItem[] {
  switch (action.type) {
    case "SET_ALL":
      return action.payload;
    case "ADD":
      return [action.payload, ...state];
    case "EDIT":
      return state.map((u) => (u.id === action.payload.id ? action.payload : u));
    case "DELETE":
      return state.filter((u) => u.id !== action.payload);
    default:
      return state;
  }
}

/**
 * Hook que gestiona las actualizaciones (noticias y eventos) conectándose
 * con la base de datos a través de la API REST del backend con tokens CSRF.
 * Centraliza las actualizaciones de estado mediante un reductor dedicado.
 *
 * @param initialData - Datos precargados desde la DB por el Server Component padre.
 * @returns Un objeto con el estado actual de las actualizaciones y las funciones mutadoras.
 */
export function useUpdates(initialData: UpdateItem[] = []) {
  const [allUpdates, dispatch] = useReducer(updatesReducer, initialData);
  const { fetchWithCsrf } = useCsrf();

  // Sincronizar el estado interno si initialData cambia
  useEffect(() => {
    dispatch({ type: "SET_ALL", payload: initialData });
  }, [initialData]);

  const refreshUpdates = useCallback(async (): Promise<UpdateItem[]> => {
    const response = await fetch("/api/updates?management=1", {
      credentials: "include",
    });
    const result = await parseApiResponse<UpdateItem[]>(response);
    const updates = result.data ?? [];
    dispatch({ type: "SET_ALL", payload: updates });
    return updates;
  }, []);

  const clearUpdates = useCallback(() => {
    dispatch({ type: "SET_ALL", payload: [] });
  }, []);

  /**
   * Crea una nueva actualización en la base de datos y la agrega al estado local.
   *
   * @param item - Los datos de la nueva actualización, omitiendo la ID generada automáticamente.
   * @returns Una promesa que resuelve al elemento creado devuelto por la API.
   * @throws {Error} Si el token CSRF no se puede obtener, el servidor devuelve un error, o hay un fallo de red.
   */
  const addUpdate = async (item: Omit<UpdateItem, "id">): Promise<UpdateItem> => {
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

    const result = await parseApiResponse<UpdateItem>(response);

    const created = result.data;
    if (!created) throw new Error("La API no devolvió la actualización creada");
    dispatch({ type: "ADD", payload: created });
    return created;
  };

  /**
   * Modifica una actualización existente en el servidor y sincroniza el estado local.
   *
   * @param item - La actualización completa incluyendo su ID.
   * @returns Una promesa que resuelve al elemento editado.
   * @throws {Error} Si el token CSRF no está disponible, el servidor retorna error, o hay problemas de red.
   */
  const editUpdate = async (item: UpdateItem): Promise<UpdateItem> => {
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

    if (!response.ok) {
      const result = await response.json().catch(() => null);
      let message = result?.error || "Error al actualizar la actualización";
      if (response.status === 404) {
        message = "Esta actualización ya no existe. La lista fue actualizada.";
        try {
          await refreshUpdates();
        } catch {
          message = "La actualización ya no existe y no se pudo sincronizar la lista.";
        }
      }
      throw new UpdatesApiError(
        message,
        response.status,
      );
    }

    const result = await parseApiResponse<UpdateItem>(response);

    const updated = result.data;
    if (!updated) throw new Error("La API no devolvió la actualización editada");
    dispatch({ type: "EDIT", payload: updated });
    return updated;
  };

  /**
   * Elimina una actualización de la base de datos por su ID y actualiza el estado local.
   *
   * @param id - Identificador de la actualización a eliminar.
   * @returns Una promesa que resuelve una vez completada la eliminación en el servidor y en local.
   * @throws {Error} Si falla la validación CSRF, la API da error, o hay un fallo de red.
   */
  const deleteUpdate = async (id: string): Promise<void> => {
    const response = await fetchWithCsrf(`/api/updates/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const result = await response.json().catch(() => null);
      let message = result?.error || "Error al eliminar la actualización";
      if (response.status === 404) {
        message = "Esta actualización ya no existe. La lista fue actualizada.";
        try {
          await refreshUpdates();
        } catch {
          message = "La actualización ya no existe y no se pudo sincronizar la lista.";
        }
      }
      throw new UpdatesApiError(
        message,
        response.status,
      );
    }

    dispatch({ type: "DELETE", payload: id });
  };

  return {
    allUpdates,
    addUpdate,
    editUpdate,
    deleteUpdate,
    refreshUpdates,
    clearUpdates,
  };
}
