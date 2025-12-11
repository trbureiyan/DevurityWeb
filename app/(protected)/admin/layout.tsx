"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Contexto de navegación y auth para proteger y controlar la vista admin.
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { user, isLoading, logout } = useAuthContext();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Cierra sesión y redirige a landing.
  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  // Deriva iniciales para avatar fallback.
  const getInitials = (name: string, last_name: string) => {
    return `${name.charAt(0).toUpperCase()}${last_name?.charAt(0)?.toUpperCase() || ""}`;
  };

  const initials = user
    ? getInitials(user.name, user.last_name ?? "")
    : getInitials("Usuario", "Devurity");

  return (
    <div className="flex min-h-screen bg-background text-foreground p-6 gap-6">
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
  onClick={closeMobileMenu}
        aria-hidden={!isMobileMenuOpen}
      />

      <AdminSidebar
        pathname={pathname}
        isMobileMenuOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        onLogout={handleLogout}
        user={user ?? null}
        isLoading={isLoading}
        initials={initials}
      />

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-[#221b1b] border border-[rgba(140,140,140,0.2)] rounded-lg p-4 mb-6">
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
