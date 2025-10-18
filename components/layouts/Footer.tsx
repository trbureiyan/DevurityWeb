"use client";

import Link from "next/link";

export default function Footer() {
  const footerLinks = [
    { label: "Sobre Nosotros", href: "/about" },
    { label: "Proyectos", href: "/projects" },
    { label: "Contacto", href: "/contact" },
    { label: "Política de Privacidad", href: "/privacy" },
    { label: "Términos de Servicio", href: "/terms" },
  ];

  return (
    <footer className="bg-variable-collection-fondo mt-auto">
      <div className="max-w-[1440px] mx-auto px-10 py-8">
        {/* Footer Links */}
        <nav className="flex justify-center items-center gap-8 mb-6" aria-label="Footer navigation">
          {footerLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="font-ubuntu font-normal text-[#9ca3af] text-sm hover:text-variable-collection-link transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <a
            href="https://linkedin.com/company/devurity"
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 flex items-center justify-center text-[#9ca3af] hover:text-variable-collection-link transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                fill="currentColor"
              />
            </svg>
          </a>

          <a
            href="mailto:contact@devurity.com"
            className="w-6 h-6 flex items-center justify-center text-[#9ca3af] hover:text-variable-collection-link transition-colors duration-200"
            aria-label="Email"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="font-ubuntu font-normal text-[#6b7280] text-xs">
            © 2025 Devurity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}