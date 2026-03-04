import Image from "next/image";
import { IMAGES } from "@/public/images";
import type { QuickNavItem } from "@/lib/types/landing";

// Props para items de navegación rápida -> array de objetos con label y href
type HeroSectionProps = {
  quickNavItems: QuickNavItem[];
};

// Hero con el main banner, logo, titulo, y navegacion rápida

export default function HeroSection({ quickNavItems }: HeroSectionProps) {
  return (
    <section id="hero" className="relative h-225 w-full overflow-hidden">
      {/* Fondo con imagen de ondas */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.landing.banner}
          alt="Background waves"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Overlay oscuro para mejorar contraste */}
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Overlay degradado oscuro en la parte inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-variable-collection-fondo via-variable-collection-fondo/50 to-transparent"></div>
      </div>

      {/* Contenido central del Hero */}
      <div className="relative h-212 flex flex-col items-center justify-center px-6">
        {/* Logo central */}
        <div className="mb-8 relative">
          <div className="w-48 h-48 md:w-64 md:h-64 relative">
            <Image
              src={IMAGES.logo.main}
              alt="Devurity Logo"
              fill
              className="object-contain drop-shadow-2xl animate-fade-in"
              priority
              sizes="(max-width: 768px) 192px, 256px"
            />
          </div>
        </div>

        {/* Título principal */}
        <h1 className="font-orbitron font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-[0.2em] text-center animate-fade-in">
          DEVURITY
        </h1>

        {/* Subtítulo */}
        <h2 className="font-orbitron font-medium text-2xl md:text-3xl lg:text-4xl text-white mb-4 tracking-wider text-center animate-fade-up">
          Semillero de Innovación Tecnológica
        </h2>

        {/* Descripción */}
        <p className="font-ubuntu text-lg md:text-xl text-white/90 max-w-3xl text-center mb-12 leading-relaxed animate-fade-up px-4">
          Exploramos, desarrollamos y aplicamos soluciones tecnológicas reales desde la universidad hacia el mundo.
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-[50px] animate-bounce">
          <svg 
            className="w-6 h-6 text-white/60" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

      {/* Menú de navegación rápida lateral derecho */}
      <nav className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-8 z-10">
        {quickNavItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group relative font-ubuntu text-white/70 hover:text-white text-sm transition-colors duration-300 text-right pb-2"
          >
            {item.label}
            {/* Línea decorativa debajo del texto */}
            <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-gradient-to-l from-variable-collection-botones to-variable-collection-link group-hover:w-full transition-all duration-500 ease-out"></span>
          </a>
        ))}
      </nav>
    </section>
  );
}
