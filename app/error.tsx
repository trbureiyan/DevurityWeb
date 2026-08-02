"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Error boundary global para la aplicacion.
 * Captura errores de render en el arbol de rutas y muestra una UI de recuperacion
 * en vez de la pantalla blanca por defecto de Next.js.
 *
 * @param error - El error capturado durante el render.
 * @param reset - Funcion para reintentar el render del segmento.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-variable-collection-fondo flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <h1 className="text-6xl md:text-7xl font-bold text-variable-collection-botones mb-2">
            500
          </h1>
          <div className="w-24 h-1 bg-variable-collection-botones mx-auto" />
        </div>

        <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
          Algo salio mal
        </h2>
        <p className="text-gray-400 mb-8 text-sm">
          Ocurrio un error inesperado al cargar esta pagina. Puedes intentar
          de nuevo o volver al inicio.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-variable-collection-botones text-white px-8 py-3 rounded-lg hover:bg-variable-collection-botones/90 transition-colors font-medium"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/"
            className="border border-white/20 hover:border-white/40 text-white/70 hover:text-white px-8 py-3 rounded-lg transition-colors font-medium"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
