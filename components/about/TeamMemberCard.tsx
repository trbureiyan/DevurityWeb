"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

interface SocialLink {
  icon: string; // "twitter", "linkedin", "github", "website"
  url: string;
  label: string;
}

interface TeamMemberCardProps {
  id: string;
  name: string;
  username?: string;
  bio: string;
  skills?: string[];
  avatar?: string;
  socialLinks?: SocialLink[];
  tagline?: string;
}

// Mapear nombres de iconos a componentes
const ICON_MAP: Record<string, JSX.Element> = {
  twitter: <FaTwitter />,
  linkedin: <FaLinkedin />,
  github: <FaGithub />,
  website: <FaGlobe />,
};

const SocialIcon = ({ icon }: { icon: string }) => {
  return ICON_MAP[icon.toLowerCase()] || (
    <div className="w-4 h-4 bg-white rounded-full" />
  );
};

export default function TeamMemberCard({
  id,
  name,
  username,
  bio,
  skills = [],
  avatar,
  socialLinks = [],
  tagline,
}: TeamMemberCardProps) {
  const [imageError, setImageError] = useState(false);
  const profileSlug = username || id;

  // --- Procesar skills para evitar duplicados ---
  const skillsText = useMemo(() => {
  if (!skills || skills.length === 0) return "";

  // Normalizar tagline para comparar
  const normalizedTagline = (tagline || "").toLowerCase().trim();

  const normalized = skills
    .flatMap(skill => skill.split(/[/•,]/))
    .map(s => s.trim().toLowerCase())
    .filter(Boolean)

    // ❗ eliminar skill si ya está en tagline
    .filter(skill => skill !== normalizedTagline);

  const uniqueSkills = Array.from(new Set(normalized));

  const capitalized = uniqueSkills.map(
    s => s.charAt(0).toUpperCase() + s.slice(1)
  );

  return capitalized.join(" / ");
}, [skills, tagline]);

  // Avatar fallback
  const displayAvatar =
    !imageError && avatar
      ? avatar
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name
        )}&size=400&background=ca2b26&color=ffffff&bold=true`;

  // Separar primeros 3 links y resto
  const primaryLinks = socialLinks.slice(0, 3);
  const secondaryLinks = socialLinks.slice(3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative max-w-sm"
    >
      <div className="relative bg-[var(--placeholder)] border border-[var(--selected)] hover:border-[var(--link)] rounded-[2rem] p-4 transition-all duration-300 hover:shadow-[0_10px_35px_rgba(246,102,97,0.15)]">
        
        {/* Avatar */}
        <Link href={`/profile/${profileSlug}`} className="block">
          <div className="relative w-36 h-36 mx-auto rounded-2xl overflow-hidden border-4 border-[var(--selected)] shadow-lg bg-[var(--background)]">
            <Image
              src={displayAvatar}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              onError={() => setImageError(true)}
            />
          </div>
        </Link>

        {/* Contenido */}
        <div className="pt-5 px-2 flex flex-col gap-2 font-ubuntu">
          <h3 className="text-xl font-bold text-[var(--foreground)] tracking-wide">{name}</h3>

          {/* Mostrar skills en rojo si existen */}
{skillsText ? (
  <p className="text-sm text-[var(--link)] font-medium">
    {skillsText}
  </p>
) : tagline ? (
  /* Si no hay skills, usar tagline pero en rojo */
  <p className="text-sm text-[var(--link)] font-medium">
    {tagline}
  </p>
) : null}

          <p className="text-sm text-[var(--foreground)] leading-relaxed mt-2 line-clamp-4">{bio}</p>

          {/* Primeros 3 links como botones */}
          {primaryLinks.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-4 mt-2">
              {primaryLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-2xl bg-[var(--buttons)] text-[var(--foreground)] text-sm font-medium shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md hover:bg-[#E94560]"
                  title={link.label}
                >
                  <span className="text-lg"><SocialIcon icon={link.icon} /></span>
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Resto de links como íconos redondos */}
          {secondaryLinks.length > 0 && (
            <div className="flex items-center justify-center gap-3 pt-4">
              {secondaryLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--background)] text-[var(--foreground)] hover:bg-[#E94560] transition"
                  title={link.label}
                >
                  <SocialIcon icon={link.icon} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}