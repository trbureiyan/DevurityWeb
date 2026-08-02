"use client";

import { useEffect } from "react";

/**
 * Error boundary para el panel de administracion.
 * Aisla errores de las rutas admin sin afectar el resto de la aplicacion.
 *
 * @param error - El error capturado durante el render.
 * @param reset - Funcion para reintentar el render del segmento.
 */
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[AdminError]", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <h1 className="text-5xl font-bold text-variable-collection-botones mb-2">
            Error
          </h1>
          <div className="w-16 h-1 bg-variable-collection-botones mx-auto" />
        </div>

        <h2 className="text-lg font-semibold text-white mb-3">
          No se pudo cargar esta seccion
        </h2>
        <p className="text-gray-400 mb-6 text-sm">
          Ocurrio un error al procesar la solicitud del panel de administracion.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-variable-collection-botones text-white px-6 py-2.5 rounded-lg hover:bg-variable-collection-botones/90 transition-colors font-medium text-sm"
          >
            Reintentar
          </button>
          <a
            href="/admin"
            className="border border-white/20 hover:border-white/40 text-white/70 hover:text-white px-6 py-2.5 rounded-lg transition-colors font-medium text-sm"
          >
            Volver al panel
          </a>
        </div>
      </div>
    </div>
  );
}
