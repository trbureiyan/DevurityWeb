import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A0808] border-r border-[#2E2E2E] flex flex-col">
        {/* Profile Section */}
        <div className="p-6 border-b border-[#2E2E2E]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-white rounded-lg overflow-hidden relative">
              <Image
                src="/images/logo/RoundyBIGLogoWBgOnly.png"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-white font-semibold text-lg">Brayan Toro</h2>
              <p className="text-white text-sm">Bustos</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          <Link
            href="/admin"
            className="block px-6 py-3 text-white hover:bg-[#2E2E2E] border-l-4 border-link bg-[#2E2E2E]"
          >
            Panel de control
          </Link>
          <Link
            href="/admin/registro"
            className="block px-6 py-3 text-white hover:bg-[#2E2E2E] border-l-4 border-transparent"
          >
            Solicitudes de registro
          </Link>
          <Link
            href="/admin/projects"
            className="block px-6 py-3 text-white hover:bg-[#2E2E2E] border-l-4 border-transparent"
          >
            Proyectos
          </Link>
          <Link
            href="/admin/eventos"
            className="block px-6 py-3 text-white hover:bg-[#2E2E2E] border-l-4 border-transparent"
          >
            Eventos y noticias
          </Link>
          <Link
            href="/admin/perfiles"
            className="block px-6 py-3 text-white hover:bg-[#2E2E2E] border-l-4 border-transparent"
          >
            Perfiles
          </Link>
          <Link
            href="/admin/contenidos"
            className="block px-6 py-3 text-white hover:bg-[#2E2E2E] border-l-4 border-transparent"
          >
            Contenidos pagina
          </Link>
          <Link
            href="/admin/skills"
            className="block px-6 py-3 text-white hover:bg-[#2E2E2E] border-l-4 border-transparent"
          >
            Habilidades
          </Link>
          <Link
            href="/admin/configuracion"
            className="block px-6 py-3 text-white hover:bg-[#2E2E2E] border-l-4 border-transparent"
          >
            Configuracion pagina
          </Link>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-[#2E2E2E] py-6">
          <Link
            href="/logout"
            className="block px-6 py-3 text-white hover:bg-[#2E2E2E]"
          >
            Salir
          </Link>
          <Link
            href="/admin/profile/edit"
            className="block px-6 py-3 text-white hover:bg-[#2E2E2E] flex items-center gap-2"
          >
            <span className="text-lg">📝</span>
            Editar perfil
          </Link>
          <Link
            href="/admin/projects/edit"
            className="block px-6 py-3 text-white hover:bg-[#2E2E2E] flex items-center gap-2"
          >
            <span className="text-lg">📁</span>
            Editar pag. proyecto
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
