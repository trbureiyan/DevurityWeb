"use client";

import { useEffect } from "react";
import { useCsrf } from "@/hooks/useCsrf";

export function CSRFProvider({ children }: { children: React.ReactNode }) {
  const { refetch, loading } = useCsrf();

  useEffect(() => {
    // Inicializar token CSRF al montar el componente
    if (!loading) {
      refetch();
    }
  }, [loading, refetch]);

  return <>{children}</>;
}
