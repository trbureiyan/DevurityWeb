"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const footerLinks = [
    { label: "Sobre Nosotros", href: "/about" },
    { label: "Proyectos", href: "/projects" },
    { label: "Eventos", href: "/updates" },
    { label: "Contacto", href: "/contact" },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/devurity",
      icon: (
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
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/SemilleroInvestigacionDevurity",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "Email",
      href: "mailto:devurity@usco.edu.co",
      icon: (
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
      ),
    },
  ];

  return (
    <footer className="relative bg-variable-collection-fondo border-t border-white/5 mt-auto overflow-hidden">
      {/* Degradado rojizo de fondo desde abajo */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#ff000008] via-transparent to-transparent pointer-events-none"></div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="font-orbitron font-bold text-white text-lg mb-3 tracking-wider">
              DEVURITY
            </h3>
            <p className="font-ubuntu text-[#9ca3af] text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Semillero de investigación en desarrollo y seguridad de la
              Universidad Surcolombiana
            </p>
          </div>

          {/* Links Section */}
          <div className="text-center md:text-left">
            <h4 className="font-ubuntu font-semibold text-white text-sm mb-3 uppercase tracking-wider">
              Enlaces Rápidos
            </h4>
            <nav
              className="flex flex-col space-y-2"
              aria-label="Footer navigation"
            >
              {footerLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="font-ubuntu text-[#9ca3af] text-sm hover:text-variable-collection-link transition-colors duration-200 inline-block"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Section */}
          <div className="text-center md:text-left lg:text-right">
            <h4 className="font-ubuntu font-semibold text-white text-sm mb-3 uppercase tracking-wider">
              Síguenos
            </h4>
            <div className="flex justify-center md:justify-start lg:justify-end items-center gap-4 mb-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-[#9ca3af] hover:bg-variable-collection-link hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="font-ubuntu text-[#9ca3af] text-xs">
              devurity@usco.edu.co
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 my-6"></div>

        {/* Credits Section */}
        <div className="mb-8 text-center">
          <p className="font-ubuntu text-[#6b7280] text-xs mb-4">
            Hecho con ❤️ por el equipo de desarrollo
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              { name: "Brayan Toro Bustos" },
              { name: "Alexander Lozada Caviedes" },
              { name: "Manuel Felipe Rojas Yasno" },
              { name: "Juan Camilo Mora Castañeda" },
              { name: "Pablo Trujillo Artunduaga" },
            ].map((author, index) => (
              <div key={index} className="flex flex-col">
                <span className="font-ubuntu text-[#9ca3af] text-xs font-medium hover:text-white transition-colors duration-200">
                  {author.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 my-6"></div>

        <Image
          src="/images/logo/facultad de ingenieria horizontal.png"
          alt="Devurity Logo"
          width={150}
          height={150}
          priority
        />
        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-ubuntu text-[#6b7280] text-xs text-center sm:text-left order-2 sm:order-1">
            © 2025 Devurity. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 order-1 sm:order-2">
            <Link
              href="/help"
              className="font-ubuntu text-[#6b7280] text-xs hover:text-variable-collection-link transition-colors duration-200"
            >
              FAQ
            </Link>
            <span className="text-[#6b7280]">•</span>
            <Link
              href="/help"
              className="font-ubuntu text-[#6b7280] text-xs hover:text-variable-collection-link transition-colors duration-200"
            >
              Preguntas frecuentes
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
