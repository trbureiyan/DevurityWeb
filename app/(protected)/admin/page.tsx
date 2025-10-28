"use client";

import React from "react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="p-8">
      {/* Quick Access Section */}
      <section className="mb-12">
        <h1 className="text-2xl font-semibold text-white mb-2">
          Accesos rápidos
        </h1>
        <p className="text-gray-400 mb-6">
          Accesos rápidos a herramientas importantes
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {/* Add Event/News Card */}
          <div className="bg-[#1A1515] border border-[#2E2E2E] rounded-lg p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl leading-none"
              aria-label="Cerrar"
            >
              ×
            </button>
            <h3 className="text-white font-semibold text-lg mb-2">
              Añadir nuevo evento o noticia
            </h3>
            <p className="text-gray-400 text-sm mb-4">Lorem ipsum dor...</p>
            <Link
              href="/admin/eventos/nuevo"
              className="text-link hover:text-link/80 text-sm font-medium"
            >
              Añadir
            </Link>
          </div>

          {/* Add Project Card */}
          <div className="bg-[#1A1515] border border-[#2E2E2E] rounded-lg p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl leading-none"
              aria-label="Cerrar"
            >
              ×
            </button>
            <h3 className="text-white font-semibold text-lg mb-2">
              Añadir nuevo proyecto
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Link
              href="/admin/projects/nuevo"
              className="text-link hover:text-link/80 text-sm font-medium"
            >
              Añadir
            </Link>
          </div>
        </div>
      </section>

      {/* Registration Requests Section */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Gestionar solicitudes de registros recientes
          </h2>
          <p className="text-gray-400 mb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
          <Link
            href="/admin/registro"
            className="text-link hover:text-link/80 text-sm font-medium"
          >
            Más información
          </Link>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20 bg-[#0A0808] border border-[#2E2E2E] rounded-lg">
          <p className="text-white text-2xl mb-8 text-center">
            No se ha recibido ninguna solicitud en los últimos 90 días
          </p>
          <Link
            href="/admin/perfiles"
            className="px-6 py-3 bg-transparent border-2 border-buttons text-buttons rounded-full hover:bg-buttons hover:text-white transition-colors font-medium"
          >
            Acceder a perfiles
          </Link>
        </div>

        {/* If there were requests, they would be displayed here */}
        {/* Example of what the list could look like when there are requests:
        <div className="space-y-4">
          <div className="bg-[#1A1515] border border-[#2E2E2E] rounded-lg p-6 flex items-center justify-between">
            <div>
              <h4 className="text-white font-semibold mb-1">Juan Pérez</h4>
              <p className="text-gray-400 text-sm">juan.perez@example.com</p>
              <p className="text-gray-500 text-xs mt-1">Hace 2 días</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Aprobar
              </button>
              <button className="px-4 py-2 bg-buttons text-white rounded hover:bg-buttons/80">
                Rechazar
              </button>
            </div>
          </div>
        </div>
        */}
      </section>
    </div>
  );
}
