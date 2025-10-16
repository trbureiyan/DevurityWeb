"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const navigationItems = [
    { label: "Nosotros", href: "/about" },
    { label: "Proyectos", href: "/projects" },
    { label: "Eventos", href: "/updates" },
    { label: "Asistencia", href: "/attendance" },
  ];

  return (
    <header className="h-[60px] border-b-[2.5px] border-[#b3b5b7] bg-variable-collection-fondo sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-10 h-full flex items-center justify-between">
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
            />
            </div>
          </div>

          <div className="inline-flex flex-col items-start">
            <h1 className="font-orbitron font-bold text-white text-lg tracking-[5px] leading-[23px] whitespace-nowrap">
              DEVURITY
            </h1>
          </div>
        </Link>

        {/* Navigation Section */}
        <nav
          className="flex-1 flex justify-end items-center gap-8"
          aria-label="Main navigation"
        >
          <ul className="flex items-center gap-9">
            {navigationItems.map((item, index) => (
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

          {/* Login Button */}
          <Link
            href="/login"
            className="w-[105px] h-[30px] flex items-center justify-center px-4 bg-variable-collection-botones rounded-lg overflow-hidden hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-variable-collection-link focus:ring-offset-2 focus:ring-offset-variable-collection-fondo"
            aria-label="Iniciar Sesión"
          >
            <span className="font-ubuntu font-bold text-white text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap">
              Iniciar Sesión
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}