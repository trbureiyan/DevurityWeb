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
            Revisa y aprueba las solicitudes de registro de nuevos usuarios
          </p>
          <Link
            href="/admin/registro"
            className="text-link hover:text-link/80 text-sm font-medium"
          >
            Más información
          </Link>
        </div>
      </section>
    </div>
  );
}
