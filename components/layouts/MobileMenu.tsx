"use client";

import Link from "next/link";
import Image from "next/image";

interface User {
  name: string;
  lastName?: string;
  email: string;
}

interface MobileMenuProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
  navigationItems: Array<{ label: string; href: string }>;
  user?: User | null;
  isAuthenticated?: boolean;
  onLogout?: () => Promise<void>;
  isLoggingOut?: boolean;
}

export default function MobileMenu({ 
  isMenuOpen, 
  closeMenu, 
  navigationItems,
  user,
  isAuthenticated,
  onLogout,
  isLoggingOut
}: MobileMenuProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
        aria-hidden={!isMenuOpen}
      />

      {/* Panel del menú móvil */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-variable-collection-fondo border-l border-[#b3b5b7] z-50 lg:hidden transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isMenuOpen}
      >
        {/* Header del menú móvil con logo */}
        <div className="h-[60px] border-b border-[#b3b5b7] flex items-center justify-between px-6">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-variable-collection-link focus:ring-offset-2 focus:ring-offset-variable-collection-fondo rounded"
            aria-label="Ir al inicio"
          >
            <div className="relative w-[25px] h-[25px] rounded">
              <Image
                src="/images/logo/RoundyBIGLogoWBgOnly.png"
                alt="Devurity Logo"
                width={25}
                height={25}
                className="relative bg-white/10 rounded"
              />
            </div>
            <span className="font-orbitron font-bold text-white text-base tracking-[3px]">
              DEVURITY
            </span>
          </Link>
          
          {/* Botón X para cerrar el menú */}
          <button
            onClick={closeMenu}
            className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-variable-collection-link"
            aria-label="Cerrar menú"
          >
            <span className="text-2xl font-light leading-none">×</span>
          </button>
        </div>

        {/* Navegación del menú móvil */}
        <nav className="p-6" aria-label="Navegación móvil">
          <ul className="space-y-1">
            {navigationItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="block font-ubuntu font-medium text-white text-lg py-4 px-4 hover:text-variable-collection-link hover:bg-white/5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-variable-collection-link focus:ring-inset"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Información adicional del semillero */}
          <div className="mt-8 pt-6 border-t border-[#b3b5b7]">
            <div className="text-white/80">
              <p className="font-ubuntu font-medium text-sm mb-2">
                Semillero de Investigación
              </p>
              <p className="font-ubuntu text-xs text-white/60">
                Universidad Surcolombiana
              </p>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}