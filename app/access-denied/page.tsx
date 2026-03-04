"use client";

import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen bg-variable-collection-fondo flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Code */}
        <div className="mb-6">
          <h1 className="text-6xl md:text-7xl font-bold text-variable-collection-botones mb-2">
            403
          </h1>
          <div className="w-24 h-1 bg-variable-collection-botones mx-auto"></div>
        </div>

        {/* Title and Message */}
        <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
          Acceso Restringido
        </h2>
        <p className="text-gray-400 mb-8 text-sm">
          No tienes los permisos necesarios para acceder a este recurso.
        </p>

        {/* Action Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-block bg-variable-collection-botones text-white px-8 py-3 rounded-lg hover:bg-variable-collection-botones/90 transition-colors font-medium"
          >
            Volver al Inicio
          </Link>
        </div>

        {/* Technical Information */}
        <div className="mt-8 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span>HTTP 403 - Forbidden</span>
          </div>
          <p className="text-gray-500 text-xs">
            El servidor entendió la solicitud pero se niega a autorizarla.
          </p>
        </div>
      </div>
    </div>
  );
}
