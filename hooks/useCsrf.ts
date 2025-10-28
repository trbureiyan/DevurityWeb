"use client";

import { useState, useEffect } from "react";

export function useCsrf() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener token CSRF al montar el componente
  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const fetchCsrfToken = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/auth/csrf-token", {
        method: "GET",
        credentials: "include", // Incluir cookies
      });

      if (!response.ok) {
        throw new Error("Error al obtener token CSRF");
      }

      const data = await response.json();
      setCsrfToken(data.csrfToken);
    } catch (err) {
      console.error("Error fetching CSRF token:", err);
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  // Función para hacer requests con CSRF
  const fetchWithCsrf = async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    if (!csrfToken) {
      throw new Error("Token CSRF no disponible");
    }

    const headers = {
      ...options.headers,
      "x-csrf-token": csrfToken,
    };

    return fetch(url, {
      ...options,
      headers,
      credentials: "include", // Siempre incluir cookies
    });
  };

  // Función para crear FormData con CSRF
  const createFormDataWithCsrf = (formData: FormData): FormData => {
    if (csrfToken) {
      formData.append("csrf_token", csrfToken);
    }
    return formData;
  };

  return {
    csrfToken,
    loading,
    error,
    fetchWithCsrf,
    createFormDataWithCsrf,
    refetch: fetchCsrfToken,
  };
}
