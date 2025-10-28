"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { user, isLoading } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden={!isMobileMenuOpen}
      />

      {/* Sidebar */}
      <aside
        className={`w-64 bg-[#0A0808] border-r border-[#2E2E2E] flex flex-col fixed top-0 left-0 h-screen z-50 transition-transform duration-300 lg:relative lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Profile Section */}
        <div className="p-6 border-b border-[#2E2E2E]">
          <Link
            href="/profile"
            className="flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="w-16 h-16 bg-variable-collection-botones rounded-full flex items-center justify-center text-white font-semibold text-xl">
              {isLoading ? (
                <div className="w-8 h-8 bg-gray-600 rounded-full animate-pulse"></div>
              ) : user ? (
                `${user.name.charAt(0)}${user.lastName.charAt(0)}`
              ) : (
                "US"
              )}
            </div>
            <div className="flex flex-col">
              <h2 className="text-white font-semibold text-lg">
                {isLoading ? "Cargando..." : user ? user.name : "Usuario"}
              </h2>
              <p className="text-white text-sm">
                {isLoading ? "" : user ? user.lastName : "Devurity"}
              </p>
              <p className="text-link text-xs mt-1">Ver mi perfil →</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6">
          <Link
            href="/admin"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-6 py-3 text-white hover:bg-[#2E2E2E] border-l-4 ${
              pathname === "/admin"
                ? "border-link bg-[#2E2E2E]"
                : "border-transparent"
            }`}
          >
            Panel de control
          </Link>
          <Link
            href="/admin/users/confirm"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-6 py-3 text-white hover:bg-[#2E2E2E] border-l-4 ${
              pathname.startsWith("/admin/users")
                ? "border-link bg-[#2E2E2E]"
                : "border-transparent"
            }`}
          >
            Solicitudes de registro
          </Link>
          <Link
            href="/admin/projects"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-6 py-3 text-white hover:bg-[#2E2E2E] border-l-4 ${
              pathname.startsWith("/admin/projects")
                ? "border-link bg-[#2E2E2E]"
                : "border-transparent"
            }`}
          >
            Proyectos
          </Link>
          <Link
            href="/admin/eventos"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-6 py-3 text-white hover:bg-[#2E2E2E] border-l-4 ${
              pathname.startsWith("/admin/eventos")
                ? "border-link bg-[#2E2E2E]"
                : "border-transparent"
            }`}
          >
            Eventos y noticias
          </Link>
          <Link
            href="/admin/perfiles"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-6 py-3 text-white hover:bg-[#2E2E2E] border-l-4 ${
              pathname.startsWith("/admin/perfiles")
                ? "border-link bg-[#2E2E2E]"
                : "border-transparent"
            }`}
          >
            Perfiles
          </Link>
          <Link
            href="/admin/contenidos"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-6 py-3 text-white hover:bg-[#2E2E2E] border-l-4 ${
              pathname.startsWith("/admin/contenidos")
                ? "border-link bg-[#2E2E2E]"
                : "border-transparent"
            }`}
          >
            Contenidos página
          </Link>
          <Link
            href="/admin/skills"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-6 py-3 text-white hover:bg-[#2E2E2E] border-l-4 ${
              pathname.startsWith("/admin/skills")
                ? "border-link bg-[#2E2E2E]"
                : "border-transparent"
            }`}
          >
            Habilidades
          </Link>
          <Link
            href="/admin/configuracion"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-6 py-3 text-white hover:bg-[#2E2E2E] border-l-4 ${
              pathname.startsWith("/admin/configuracion")
                ? "border-link bg-[#2E2E2E]"
                : "border-transparent"
            }`}
          >
            Configuración página
          </Link>

          {/* Profile Link */}
          <div className="mt-4 pt-4 border-t border-[#2E2E2E]">
            <Link
              href="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-6 py-3 text-link hover:bg-[#2E2E2E] border-l-4 ${
                pathname.startsWith("/profile")
                  ? "border-link bg-[#2E2E2E]"
                  : "border-transparent"
              }`}
            >
              Mi Perfil
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-[#0A0808] border-b border-[#2E2E2E] p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleMobileMenu}
              className="flex flex-col justify-center items-center w-8 h-8 relative focus:outline-none"
              aria-label="Abrir menú de administración"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-white transition-all duration-300 my-1.5 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </button>
            <h1 className="text-white font-semibold text-lg">Administración</h1>
            <div className="w-8"></div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
