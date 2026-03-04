"use client";

import { useState, useCallback } from "react";
import logger from "@/lib/logger";

export function useCsrf() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCsrfToken = useCallback(async (): Promise<string | null> => {
    // Si ya tenemos un token, retornarlo
    if (csrfToken) {
      return csrfToken;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/auth/csrf-token", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error al obtener token CSRF");
      }

      const data = await response.json();
      setCsrfToken(data.csrfToken);
      return data.csrfToken;
    } catch (err) {
      logger.error("Error fetching CSRF token:", { error: err });
      setError(err instanceof Error ? err.message : "Error desconocido");
      return null;
    } finally {
      setLoading(false);
    }
  }, [csrfToken]);

  // Función para hacer requests con CSRF
  const fetchWithCsrf = async (
    url: string,
    options: RequestInit = {},
  ): Promise<Response> => {
    let token = csrfToken;

    // Solo obtener token si no lo tenemos y es una request que lo requiere
    if (!token && shouldUseCsrf(options.method)) {
      token = await fetchCsrfToken();
    }

    // Si tenemos token, agregarlo a los headers
    if (token) {
      const headers = {
        ...options.headers,
        "x-csrf-token": token,
      };

      return fetch(url, {
        ...options,
        headers,
        credentials: "include",
      });
    }

    // Si no hay token, hacer request normal (para rutas públicas)
    return fetch(url, {
      ...options,
      credentials: "include",
    });
  };

  // Función para crear FormData con CSRF
  const createFormDataWithCsrf = (formData: FormData): FormData => {
    if (csrfToken) {
      formData.append("csrf_token", csrfToken);
    }
    return formData;
  };

  // Función para verificar si un método HTTP requiere CSRF
  const shouldUseCsrf = (method?: string): boolean => {
    const protectedMethods = ["POST", "PUT", "DELETE", "PATCH"];
    return method ? protectedMethods.includes(method.toUpperCase()) : false;
  };

  return {
    csrfToken,
    loading,
    error,
    fetchWithCsrf,
    createFormDataWithCsrf,
    refetch: fetchCsrfToken,
    hasToken: !!csrfToken,
  };
}
