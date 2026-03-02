"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";

interface SocialLink {
  icon: string;
  url: string;
  label: string;
}

interface TeamMemberCardProps {
  id: string;
  name: string;
  username?: string;
  role: string;
  bio: string;
  avatar?: string;
  socialLinks?: SocialLink[];
  tagline?: string;
}

// Iconos para redes sociales
// ToDo: A futuro se puede implementar una libreria de iconos con licencia permisiva. Segun la demanda en la app.
const SocialIcon = ({ icon }: { icon: string }) => {
  const iconClass = "w-5 h-5";
  
  switch (icon.toLowerCase()) {
    case "github":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case "twitter":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      );
    case "website":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      );
  }
};

// Referencia estable para el valor por defecto de socialLinks.
// Declarar [] directamente como valor por defecto en la firma del componente crea un nuevo
// array en cada render, rompiendo la comparación por referencia de React y provocando
// re-renders innecesarios en cualquier efecto o memo que dependiera de socialLinks.
// Una constante a nivel de módulo es creada una sola vez en toda la vida del módulo.
const EMPTY_SOCIAL_LINKS: SocialLink[] = [];

export default function TeamMemberCard({
  id,
  name,
  username,
  role,
  bio,
  avatar,
  socialLinks = EMPTY_SOCIAL_LINKS,
  tagline,
}: TeamMemberCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const profileSlug = username || id;
  const displayAvatar = (!imageError && avatar) ? avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=400&background=10b981&color=fff&bold=true`;

  return (
    // LazyMotion + m: patrón de tree-shaking de framer-motion recomendado por Vercel.
    // Reemplaza `motion.*` (bundle completo ~150KB gzip) por `m.*` + `domAnimation` (~18KB).
    // `domAnimation` cubre opacity, transform, scale y border-radius — suficiente para
    // las animaciones de esta card. Si se necesitaran layout animations o drag, cambiar
    // a `domMax` (~36KB). Importar `motion` directamente en cualquier componente que se
    // use en una lista (como este, en la grilla del equipo) multiplica el costo de parse.
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative"
      >
        {/* Card Container */}
        <div className="relative bg-gradient-to-br from-zinc-900/50 to-black/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]">
          
          {/* Glow Effect on Hover */}
          <AnimatePresence>
            {isHovered && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Avatar Section */}
          <Link href={`/profile/${profileSlug}`} className="block">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={displayAvatar}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                onError={() => setImageError(true)}
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Role badge */}
              <div className="absolute top-3 left-3 px-3 py-1 bg-emerald-500/90 backdrop-blur-sm rounded-full">
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                  {role}
                </span>
              </div>
            </div>
          </Link>

          {/* Content Section */}
          <div className="p-6 space-y-4">
            {/* Name */}
            <div>
              <Link 
                href={`/profile/${profileSlug}`}
                className="block group/name"
              >
                <h3 className="text-xl font-bold text-white group-hover/name:text-emerald-400 transition-colors">
                  {name}
                </h3>
              </Link>
              {tagline && (
                <p className="text-sm text-emerald-400 mt-1 font-mono">
                  {tagline}
                </p>
              )}
            </div>

            {/* Bio/Description */}
            <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">
              {bio}
            </p>

            {/* Social Links - Máximo 3 */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3 pt-2 border-t border-zinc-800/50">
                {socialLinks.slice(0, 3).map((link) => (
                  <a
                    key={`${link.icon}-${link.url}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800/50 hover:bg-emerald-500/20 border border-zinc-700/50 hover:border-emerald-500/50 text-zinc-400 hover:text-emerald-400 transition-all duration-300 hover:scale-110"
                    title={link.label}
                  >
                    <SocialIcon icon={link.icon} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Bottom accent line */}
          <div className="h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </m.div>
    </LazyMotion>
  );
}
