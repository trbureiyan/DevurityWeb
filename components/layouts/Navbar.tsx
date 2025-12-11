"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import LoginButton from "@/components/ui/LoginButton";
import { useAuthContext } from "@/contexts/AuthContext";

// Importar el menú móvil sin SSR para evitar errores de hidratación
const MobileMenu = dynamic(() => import("./MobileMenu"), {
  ssr: false,
});

const NAVIGATION_ITEMS = [
  { label: "Nosotros", href: "/about" },
  { label: "Proyectos", href: "/projects" },
  { label: "Eventos", href: "/updates" },
  { label: "Asistencia", href: "admin/attendances" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, isAuthenticated, isLoading, logout, isAdmin } = useAuthContext();

  const navigationItems = [
    { label: "Nosotros", href: "/about" },
    { label: "Proyectos", href: "/projects" },
    { label: "Eventos", href: "/updates" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    closeProfileDropdown();
  };

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".profile-dropdown")) {
        closeProfileDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getInitials = (name: string, last_name?: string) => {
    if (!last_name) return name.charAt(0).toUpperCase();
    return `${name.charAt(0)}${last_name.charAt(0)}`.toUpperCase();
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
            {NAVIGATION_ITEMS.map((item, index) => (
              <li key={index} className="flex flex-col items-center justify-center">
                <Link
                  href={item.href}
                  className="font-ubuntu font-medium text-white text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap hover:text-variable-collection-link transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Auth Section */}
          {isLoading ? (
            <div className="w-8 h-8 bg-gray-600 rounded-full animate-pulse"></div>
          ) : isAuthenticated && user ? (
            <div className="relative profile-dropdown">
              {/* Profile Avatar */}
              <button
                onClick={toggleProfileDropdown}
                className="w-10 h-10 bg-variable-collection-botones rounded-full flex items-center justify-center text-white font-semibold text-sm hover:bg-variable-collection-botones/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-variable-collection-link"
                aria-label="Menú de perfil"
                aria-expanded={isProfileDropdownOpen}
              >
                {getInitials(user.name, user.last_name)}
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 top-12 w-48 bg-[#1A1515] border border-[#2E2E2E] rounded-lg shadow-lg py-2 z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-[#2E2E2E]">
                    <p className="text-white font-medium text-sm">
                      {user.name} {user.last_name}
                    </p>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                  </div>

                  {/* Profile Link */}
                  <Link
                    href="/profile"
                    onClick={closeProfileDropdown}
                    className="block px-4 py-2 text-white text-sm hover:bg-[#2E2E2E] transition-colors duration-200"
                  >
                    Mi Perfil
                  </Link>

                  {/* Admin Link (if admin) */}
                  {isAdmin() && (
                    <Link
                      href="/admin"
                      onClick={closeProfileDropdown}
                      className="block px-4 py-2 text-white text-sm hover:bg-[#2E2E2E] transition-colors duration-200"
                    >
                      Panel Admin
                    </Link>
                  )}

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-400 text-sm hover:bg-[#2E2E2E] transition-colors duration-200 border-t border-[#2E2E2E] mt-2"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="w-[105px] h-[30px] flex items-center justify-center px-4 bg-variable-collection-botones rounded-lg overflow-hidden hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-variable-collection-link focus:ring-offset-2 focus:ring-offset-variable-collection-fondo"
              aria-label="Iniciar Sesión"
            >
              <span className="font-ubuntu font-bold text-white text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap">
                Iniciar Sesión
              </span>
            </Link>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden items-center gap-4">
          {/* Mobile Auth Section */}
          {isLoading ? (
            <div className="w-8 h-8 bg-gray-600 rounded-full animate-pulse"></div>
          ) : isAuthenticated && user ? (
            <div className="relative profile-dropdown">
              {/* Mobile Profile Avatar */}
              <button
                onClick={toggleProfileDropdown}
                className="w-8 h-8 bg-variable-collection-botones rounded-full flex items-center justify-center text-white font-semibold text-xs hover:bg-variable-collection-botones/90 transition-colors duration-200"
                aria-label="Menú de perfil"
                aria-expanded={isProfileDropdownOpen}
              >
                {getInitials(user.name, user.last_name)}
              </button>

              {/* Mobile Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 top-10 w-48 bg-[#1A1515] border border-[#2E2E2E] rounded-lg shadow-lg py-2 z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-[#2E2E2E]">
                    <p className="text-white font-medium text-sm">
                      {user.name} {user.last_name}
                    </p>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                  </div>

                  {/* Profile Link */}
                  <Link
                    href="/profile"
                    onClick={closeProfileDropdown}
                    className="block px-4 py-2 text-white text-sm hover:bg-[#2E2E2E] transition-colors duration-200"
                  >
                    Mi Perfil
                  </Link>

                  {/* Admin Link (if admin) */}
                  {isAdmin() && (
                    <Link
                      href="/admin"
                      onClick={closeProfileDropdown}
                      className="block px-4 py-2 text-white text-sm hover:bg-[#2E2E2E] transition-colors duration-200"
                    >
                      Panel Admin
                    </Link>
                  )}

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-400 text-sm hover:bg-[#2E2E2E] transition-colors duration-200 border-t border-[#2E2E2E] mt-2"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
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
      <MobileMenu
        isMenuOpen={isMenuOpen}
        closeMenu={closeMenu}
        navigationItems={NAVIGATION_ITEMS}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={logout}
      />
    </header>
  );
}
