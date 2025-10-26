"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/hooks/useAuth";

// Importar el menú móvil sin SSR
const MobileMenu = dynamic(() => import("./MobileMenu"), {
  ssr: false,
});

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, isLoading: authLoading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigationItems = [
    { label: "Nosotros", href: "/about" },
    { label: "Proyectos", href: "/projects" },
    { label: "Eventos", href: "/updates" },
    { label: "Asistencia", href: "/attendance" },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Error durante logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Función segura para obtener iniciales
  const getUserInitials = () => {
    if (!user?.name || !user?.lastName) return "U";
    return `${user.name.charAt(0)}${user.lastName.charAt(0)}`;
  };

  const getMobileInitial = () => {
    if (!user?.name) return "U";
    return user.name.charAt(0);
  };

  return (
    <header className="h-[60px] border-b-[2.5px] border-[#b3b5b7] bg-variable-collection-fondo sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-full flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-4 w-48">
          <div className="inline-flex flex-col items-start relative">
            <div
              className="relative w-[31px] h-[31px] rounded"
              role="img"
              aria-label="Devurity Logo"
            >
              <Image
                src="/images/logo/RoundyBIGLogoWBgOnly.png"
                alt="Devurity Logo"
                width={31}
                height={31}
                className="relative bg-white/10 rounded"
                priority
              />
            </div>
          </div>

          <div className="inline-flex flex-col items-start">
            <h1 className="font-orbitron font-bold text-white text-lg tracking-[5px] leading-[23px] whitespace-nowrap">
              DEVURITY
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation Section */}
        <nav
          className="hidden lg:flex flex-1 justify-end items-center gap-8"
          aria-label="Main navigation"
        >
          <ul className="flex items-center gap-9">
            {navigationItems.map((item, index) => (
              <li
                key={index}
                className="flex flex-col items-center justify-center"
              >
                <Link
                  href={item.href}
                  className="font-ubuntu font-medium text-white text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap hover:text-variable-collection-link transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {authLoading ? (
              // Loading state
              <div className="w-6 h-6 border-2 border-variable-collection-link border-t-transparent rounded-full animate-spin"></div>
            ) : isAuthenticated && user ? (
              // User is authenticated
              <div className="flex items-center gap-4">
                {/* User Info */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-variable-collection-botones rounded-full flex items-center justify-center">
                    <span className="font-ubuntu text-white text-xs font-bold">
                      {getUserInitials()}
                    </span>
                  </div>
                  <span className="font-ubuntu text-white text-sm hidden xl:block">
                    {user.name || "Usuario"}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-[105px] h-[30px] flex items-center justify-center px-4 bg-red-600 rounded-lg overflow-hidden hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-variable-collection-fondo disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Cerrar Sesión"
                >
                  {isLoggingOut ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span className="font-ubuntu font-bold text-white text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap">
                      Cerrar Sesión
                    </span>
                  )}
                </button>
              </div>
            ) : (
              // User is not authenticated - Login Button
              <Link
                href="/login"
                className="w-[105px] h-[30px] flex items-center justify-center px-4 bg-variable-collection-botones rounded-lg overflow-hidden hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-variable-collection-link focus:ring-offset-2 focus:ring-offset-variable-collection-fondo"
                aria-label="Iniciar Sesión"
              >
                <span className="font-ubuntu font-bold text-white text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap">
                  Iniciar Sesión
                </span>
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden items-center gap-4">
          {/* Mobile Auth Section */}
          {authLoading ? (
            // Loading state mobile
            <div className="w-6 h-6 border-2 border-variable-collection-link border-t-transparent rounded-full animate-spin"></div>
          ) : isAuthenticated && user ? (
            // User is authenticated mobile
            <div className="flex items-center gap-2">
              {/* User Avatar Mobile */}
              <div className="w-8 h-8 bg-variable-collection-botones rounded-full flex items-center justify-center">
                <span className="font-ubuntu text-white text-xs font-bold">
                  {getMobileInitial()}
                </span>
              </div>
            </div>
          ) : (
            // User is not authenticated mobile - Login Button
            <Link
              href="/login"
              className="w-[90px] h-[30px] flex items-center justify-center px-3 bg-variable-collection-botones rounded-lg overflow-hidden hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-variable-collection-link focus:ring-offset-2 focus:ring-offset-variable-collection-fondo"
              aria-label="Iniciar Sesión"
            >
              <span className="font-ubuntu font-bold text-white text-xs text-center tracking-[0] leading-[21px] whitespace-nowrap">
                Iniciar Sesión
              </span>
            </Link>
          )}

          {/* Mobile Menu Button - Hamburguesa */}
          <button
            className="flex flex-col justify-center items-center w-8 h-8 relative focus:outline-none"
            onClick={toggleMenu}
            aria-label="Abrir menú de navegación"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 my-1.5 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu - Cargado dinámicamente sin SSR */}
      {isAuthenticated && (
        <MobileMenu
          isMenuOpen={isMenuOpen}
          closeMenu={closeMenu}
          navigationItems={navigationItems}
          user={user}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
        />
      )}
    </header>
  );
}
