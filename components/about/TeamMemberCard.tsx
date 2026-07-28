import React from "react";
import Image from "next/image";
import Link from "next/link";

type SocialLink = {
  icon: string;
  url: string;
  label: string;
};

interface TeamMemberCardProps {
  id: string;
  name: string;
  username?: string;
  role: string;
  tagline?: string;
  bio: string;
  avatar?: string;
  socialLinks?: SocialLink[];
  program?: string;
  semester?: number;
}

export default function TeamMemberCard({
  id,
  name,
  username,
  tagline,
  bio,
  avatar,
  socialLinks = [],
  program,
  semester,
}: TeamMemberCardProps) {
  
  // Usamos el username para la ruta; si no existe, usamos el id como fallback seguro
  const profileUrl = username ? `/profile/${username}` : `/profile/${id}`;

  return (
    <Link 
      href={profileUrl}
      className="group relative bg-zinc-900/30 backdrop-blur-md rounded-2xl border border-zinc-800/80 hover:border-red-500/40 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_40px_rgba(178,4,3,0.12)] overflow-hidden min-h-[340px] cursor-pointer"
    >
      {/* Glow ambiental de fondo */}
      <div className="absolute -inset-px bg-gradient-to-br from-transparent via-transparent to-red-600/0 group-hover:to-red-600/5 rounded-2xl transition-all duration-500" />
      
      <div className="relative z-10">
        {/* Header Expandido */}
        <div className="flex items-start gap-5 mb-6">
          <div className="relative w-20 h-20 rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden flex-shrink-0 flex items-center justify-center group-hover:border-red-500/30 transition-colors duration-300 shadow-inner">
            {avatar ? (
              <Image
                src={avatar}
                alt={`${name} avatar`}
                fill
                className="object-cover"
              />
            ) : (
              <span className="font-orbitron text-2xl font-bold text-zinc-600 group-hover:text-red-500 transition-colors duration-300">
                {name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
              </span>
            )}
            
            {/* Status dot cyber */}
            <div className="absolute bottom-1.5 right-1.5 w-3 h-3 bg-red-500 rounded-full border-2 border-zinc-950 animate-pulse" />
          </div>

          <div className="space-y-1.5 pt-1 overflow-hidden">
            <h4 className="font-orbitron font-bold text-xl lg:text-2xl tracking-wide text-zinc-100 group-hover:text-white leading-tight truncate">
              {name}
            </h4>
            {username && (
              <p className="text-sm text-zinc-500 font-mono truncate">@{username}</p>
            )}
          </div>
        </div>

        {/* Separador */}
        <div className="w-full h-px bg-gradient-to-r from-zinc-800 via-zinc-800/40 to-transparent mb-5" />

        {/* Biografía */}
        <p className="text-base text-zinc-400 leading-relaxed mb-6 min-h-[72px] line-clamp-3">
          {bio}
        </p>

        {/* Habilidades en bloque destacado */}
        {tagline && (
          <div className="mb-6">
            <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2">
              {"// TECH_STACK"}
            </p>
            <p className="text-sm text-zinc-300 bg-zinc-950/60 rounded-xl px-3 py-2.5 border border-zinc-800/80 font-mono tracking-wide">
              {tagline}
            </p>
          </div>
        )}
      </div>

      {/* Footer con metadata e iconos */}
      <div className="relative z-10 pt-4 border-t border-zinc-800/50 flex items-center justify-between mt-auto">
        <div className="text-left max-w-[70%]">
          {program && (
            <p className="text-xs text-zinc-400 font-medium truncate" title={program}>
              {program}
            </p>
          )}
          {semester && (
            <p className="text-xs text-zinc-500 font-mono mt-0.5">
              {semester}° Semestre
            </p>
          )}
        </div>

        {/* Redes Sociales del Integrante */}
        <div className="flex items-center gap-2.5 relative z-20">
          {socialLinks.length > 0 ? (
            socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.label}
                className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-white text-zinc-400 hover:text-black flex items-center justify-center transition-all duration-200 border border-zinc-800 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-xs font-mono font-bold uppercase">
                  {link.icon.slice(0, 2)}
                </span>
              </a>
            ))
          ) : (
            <span className="text-xs text-zinc-600 font-mono">core_dev</span>
          )}
        </div>
      </div>
    </Link>
  );
}