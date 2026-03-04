"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Orbitron } from "next/font/google";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import QRDynamic from "@/components/qr-dynamic";
import SkillSelector from "@/components/ui/SkillSelector";
import SocialLinksEditor from "@/components/ui/SocialLinksEditor";
import { UsernameEditor } from "@/components/ui/UsernameEditor";
import { Tooltip } from "@/components/ui/Tooltip";
import ProgramSelector from "@/components/ui/ProgramSelector";
import { useCsrf } from "@/hooks/useCsrf";
import { useProfileData } from "@/hooks/useProfileData";
import logger from "@/lib/logger";

// Configurar fuente Orbitron
const orbitron = Orbitron({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron"
});

type NullableDate = string | null | undefined;

interface ProjectData {
  title: string;
  link: string;
}

interface SocialLinkData {
  icon: string;
  url: string;
  label: string;
}

function SocialIconDisplay({ icon }: { icon: string }) {
  const key = icon.toLowerCase();
  switch (key) {
    case "github":
      return (
        <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M4.983 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.983 0zM.32 8.478h4.4V24h-4.4zM8.388 8.478h4.216v2.118h.06c.588-1.116 2.024-2.292 4.168-2.292 4.458 0 5.278 2.936 5.278 6.756V24h-4.4v-6.764c0-1.614-.028-3.688-2.246-3.688-2.25 0-2.595 1.757-2.595 3.574V24h-4.4z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M23.498 6.186a2.974 2.974 0 0 0-2.09-2.103C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.408.583a2.974 2.974 0 0 0-2.09 2.103A31.533 31.533 0 0 0 .5 12a31.53 31.53 0 0 0 .002 5.814 2.974 2.974 0 0 0 2.09 2.103C4.495 20.5 12 20.5 12 20.5s7.505 0 9.408-.583a2.974 2.974 0 0 0 2.09-2.103A31.533 31.533 0 0 0 23.5 12a31.53 31.53 0 0 0-.002-5.814zM9.75 15.5v-7l6 3.5-6 3.5z" />
        </svg>
      );
    case "twitter":
      return (
        <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.36 2.92c0 .34.04.67.11 1A12.15 12.15 0 0 1 3.15 4.8a4.28 4.28 0 0 0 1.32 5.71 4.25 4.25 0 0 1-1.94-.54v.06a4.28 4.28 0 0 0 3.44 4.19 4.3 4.3 0 0 1-1.93.07 4.28 4.28 0 0 0 3.99 2.97A8.6 8.6 0 0 1 2 19.54a12.14 12.14 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19-.01-.39-.02-.58A8.7 8.7 0 0 0 22.46 6z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M22.675 0H1.325C.594 0 0 .593 0 1.326v21.348C0 23.407.594 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.407 24 22.674V1.326C24 .593 23.406 0 22.675 0z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07c3.252.148 4.771 1.691 4.919 4.919c.058 1.265.069 1.645.069 4.849c0 3.205-.012 3.584-.069 4.849c-.149 3.225-1.664 4.771-4.919 4.919c-1.266.058-1.644.07-4.85.07c-3.204 0-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92c-.058-1.265-.07-1.644-.07-4.849c0-3.204.013-3.583.07-4.849c.149-3.227 1.664-4.771 4.919-4.919c1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072C2.695.272.273 2.69.073 7.052C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98c.059-1.28.073-1.689.073-4.948c0-3.259-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324a6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8a4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881a1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      );
    case "orcid":
      return (
        <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 24a12 12 0 1 1 0-24 12 12 0 0 1 0 24zM8.344 7.353c-.497 0-.9.4-.9.897v7.5c0 .496.403.897.9.897s.9-.4.9-.897v-7.5c0-.496-.403-.897-.9-.897zm2.974 8.606h1.395V7.353h-1.395v8.606zm6.338-4.2a2.792 2.792 0 0 0-2.79-2.79h-1.258v1.3h1.258c.822 0 1.49.667 1.49 1.49 0 .822-.668 1.49-1.49 1.49h-1.258v1.3h1.258a2.792 2.792 0 0 0 2.79-2.79zm-9.327-3.306c.497 0 .9-.4.9-.897 0-.496-.403-.897-.9-.897a.898.898 0 0 0-.9.897c0 .496.403.897.9.897z" />
        </svg>
      );
    case "bento.me":
      return (
        <svg className="size-5" viewBox="0 0 24 24" aria-hidden fill="none">
          <defs>
            <linearGradient id="bentoGradient" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
              <stop stopColor="#C54CFF" />
              <stop offset="1" stopColor="#00E5FF" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="#0B0B0F" stroke="url(#bentoGradient)" strokeWidth="1.5" />
          <path
            d="M8.5 7.5h7a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-7a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 1 .75-.75zm0 5h7a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-7a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 1 .75-.75z"
            fill="url(#bentoGradient)"
          />
        </svg>
      );
    default:
      return (
        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

// Vista de perfil: lectura y edición de datos con control de propiedad, QR dinámico y normalización de enlaces.
export default function ProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const { fetchWithCsrf } = useCsrf();
  
  const { userData, setUserData, currentUserId, loading, error } = useProfileData(id);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Estados para edición
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editableSkills, setEditableSkills] = useState<string[]>([]);
  const [editableProgram, setEditableProgram] = useState("");
  const [editableWorkingOnText, setEditableWorkingOnText] = useState('');
  const [editableSocialLinks, setEditableSocialLinks] = useState<SocialLinkData[]>([]);
  const [editableBio, setEditableBio] = useState('');
  const [editableGithub, setEditableGithub] = useState('');
  const [editableUsername, setEditableUsername] = useState('');

  // --- VALIDACIONES ---

  const allowedPlatforms = [
    "github",
    "linkedin",
    "youtube",
    "twitter",
    "facebook",
    "instagram",
    "orcid",
    "bento.me",
    "linktree",
    "website",
  ];

  const platformDisplayMap: Record<string, string> = {
    github: "GitHub",
    linkedin: "LinkedIn",
    youtube: "YouTube",
    twitter: "Twitter",
    facebook: "Facebook",
    instagram: "Instagram",
    orcid: "ORCID",
    "bento.me": "Bento.me",
    linktree: "Linktree",
    website: "Website",
  };

  const maxCustomWebsites = 3;

  const normalizePlatformName = (platform?: string | null) => {
    if (!platform) return "website";
    const lowered = platform.trim().toLowerCase();
    const match = allowedPlatforms.find((p) => p === lowered);
    return match || "website";
  };

  const getDisplayLabelForPlatform = (platform: string) =>
    platformDisplayMap[platform] || platformDisplayMap.website;

  const validateAndNormalizeUrl = (url: string, label: string): string => {
    if (!url || url.trim().length === 0) {
      throw new Error(`URL vacía para ${label}`);
    }

    const trimmed = url.trim();

    // Bloquear strings sin dominio
    if (!trimmed.includes(".")) {
      throw new Error(`URL debe incluir un dominio válido para ${label}. Ej: midominio.com o https://midominio.com`);
    }

    // Rechazar caracteres no válidos
    if (/[^\w\d-._~:/?#\[\]@!$&'()*+,;=%]/.test(trimmed)) {
      throw new Error(`URL contiene caracteres no permitidos para ${label}`);
    }

    // Normalizar protocolo
    const withProtocol = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;

    try {
      // Validar construyendo URL
      const parsed = new URL(withProtocol);

      // Pequeña lista de dominios prohibidos (contenido inapropiado)
      const blockedHosts = ["porn", "adult", "xxx", "sex", "nsfw"];
      if (blockedHosts.some((bad) => parsed.hostname.toLowerCase().includes(bad))) {
        throw new Error("Este dominio no está permitido");
      }

      return parsed.toString();
    } catch {
      throw new Error(`URL inválida para ${label}`);
    }
  };

  const normalizeSocialLinks = (links: SocialLinkData[], github: string) => {
    const cleaned: SocialLinkData[] = [];
    let customWebsiteCount = 0;

    const merged = [...links];

    // Asegurar GitHub si viene aparte
    if (github) {
      const hasGithub = merged.some(
        (l) => l.label?.toLowerCase() === "github" || l.icon?.toLowerCase() === "github",
      );
      if (!hasGithub) {
        merged.push({ label: "GitHub", icon: "github", url: github });
      }
    }

    for (const link of merged) {
      const rawUrl = link.url?.trim();
      if (!rawUrl) continue;

      const platform = normalizePlatformName(link.label || link.icon || "website");

      if (platform === "website") {
        customWebsiteCount += 1;
        if (customWebsiteCount > maxCustomWebsites) {
          console.warn(`Skipping extra custom website link (limit ${maxCustomWebsites}).`);
          continue;
        }
      }

      try {
        const normalizedUrl = validateAndNormalizeUrl(
          rawUrl,
          platform === "website" ? "Website" : platform,
        );

        cleaned.push({
          label: getDisplayLabelForPlatform(platform),
          icon: platform,
          url: normalizedUrl,
        });
      } catch (err) {
        console.warn(
          `Link inválido para ${platform}: ${rawUrl}. Motivo: ${
            err instanceof Error ? err.message : "URL inválida"
          }`,
        );
        continue;
      }
    }

    return cleaned;
  };

  // --- UTILIDADES DE PARSEO ---
  
  const workingOnArrayToText = (projects: ProjectData[]) => 
    projects.map(p => `${p.title} | ${p.link}`).join('\n');
  
  const workingOnTextToArray = (text: string): ProjectData[] => {
    return text.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        const parts = line.split('|').map(p => p.trim());
        return {
          title: parts[0] || 'Nuevo Proyecto',
          link: parts[1] || '#',
        };
      });
  };

  // --- HANDLERS DE EDICIÓN ---

  // Prepara estados editables a partir del perfil actual.
  const handleEdit = () => {
    // Inicializar los estados con los datos actuales
    setEditableSkills(userData?.skills || []);
    setEditableProgram(userData?.program || "");
    setEditableWorkingOnText(workingOnArrayToText(userData?.working_on || []));
    setEditableSocialLinks(
      (userData?.social_links || []).map((link) => {
        const platform = normalizePlatformName(link.label || link.icon || "website");
        return {
          ...link,
          label: getDisplayLabelForPlatform(platform),
          icon: platform,
        };
      }),
    );
    setEditableBio(userData?.bio || '');
    setEditableGithub(userData?.github || '');
    setEditableUsername(userData?.username || '');
    
    setIsEditing(true);
    setSaveError(null);
    setSaveSuccess(false);
  };

  // Valida y persiste cambios del perfil usando CSRF; actualiza estado local al éxito.
  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      // Validar y normalizar links antes de enviar
      const normalizedSocialLinks = normalizeSocialLinks(editableSocialLinks, editableGithub);

      // Preparar datos para enviar
      const updatedData = {
        skills: editableSkills,
        working_on: workingOnTextToArray(editableWorkingOnText),
        social_links: normalizedSocialLinks,
        bio: editableBio,
        github: editableGithub,
        username: editableUsername,
        program: editableProgram || null,
      };

      logger.debug("Guardando datos de perfil", { userId: userData?.id });

      // Llamada a la API con CSRF integrado
      const response = await fetchWithCsrf(`/api/auth/users/${userData?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Error ${response.status}: ${response.statusText}`);
      }

      // Actualizar estado local con los datos confirmados
      setUserData(prev => prev ? ({ 
        ...prev, 
        ...updatedData
      }) : null);

      setSaveSuccess(true);
      setIsEditing(false);
      
      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => setSaveSuccess(false), 3000);

    } catch (err) {
      logger.error('Error al guardar perfil', { error: err });
      setSaveError(err instanceof Error ? err.message : 'Error desconocido al guardar');
    } finally {
      setSaving(false);
    }
  };

  // Sale del modo edición sin persistir cambios.
  const handleCancel = () => {
    setIsEditing(false);
    setSaveError(null);
    setSaveSuccess(false);
  };

  // --- Lógica del componente ---

  const normalizeExternalLink = (href?: string | null) => {
    if (!href) return undefined;
    const trimmed = href.trim();
    if (!trimmed) return undefined;
    if (trimmed.startsWith("#")) return trimmed;
    if (/^(https?:|mailto:|tel:|data:|blob:)/i.test(trimmed)) return trimmed;
    if (trimmed.startsWith("/")) return trimmed;
    return `https://${trimmed.replace(/^\/+/, "")}`;
  };

  // Genera las iniciales del usuario a partir de su nombre y apellido
  const getInitials = (name: string, lastName: string) => {
    return `${name.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#110e0e] flex items-center justify-center">
        <div className="text-white text-xl">Cargando perfil...</div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-[#110e0e] flex flex-col items-center justify-center p-4">
        <div className="text-red-400 text-2xl font-bold mb-4">404 - Perfil no encontrado</div>
        <div className="text-white/60 mb-6 text-center max-w-md">
          {error || "El perfil que buscas no existe o no está disponible."}
        </div>
        <Link 
          href="/"
          className="rounded-full bg-[#da292e] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  const fullName = `${userData.name} ${userData.last_name}`;
  const userInitials = getInitials(userData.name, userData.last_name);

  // Prioriza la primera fecha válida disponible entre varios campos posibles.
  const resolveDate = (...candidates: NullableDate[]): Date | null => {
    for (const value of candidates) {
      if (!value) continue;
      const parsed = new Date(value);
      if (!Number.isNaN(parsed.getTime())) return parsed;
    }
    return null;
  };

  const joinedDate = resolveDate(userData.joined_at, userData.joinedAt, userData.created_at, userData.createdAt);
  const formattedJoinDate = joinedDate
    ? joinedDate.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })
    : "Fecha no disponible";

  // Validar si el usuario tiene username configurado
  const hasUsername = userData.username && userData.username.trim().length > 0;
  const username = hasUsername ? `${userData.username}` : null;
  const bio = userData.bio || "Sin descripción disponible";

  const websiteLink = normalizeExternalLink(userData.website);
  const githubLink = normalizeExternalLink(userData.github);
  const avatarSrc = userData.avatar || userData.avatar_url || userData.profile_image || userData.image;

  // Items del header
  const infoItems = [
    ...(joinedDate ? [{
      icon: (
        <svg aria-hidden className="size-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      text: `Se unió el ${formattedJoinDate}`,
      href: undefined,
    }] : []),
    {
      icon: (
        <svg aria-hidden className="size-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      text: userData.email,
      href: `mailto:${userData.email}`,
    },
    ...(userData.website ? [{
      icon: (
        <svg aria-hidden className="size-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      text: userData.website.replace(/^https?:\/\//, ''),
      href: websiteLink,
    }] : []),
    ...(userData.github ? [{
      icon: (
        <svg aria-hidden className="size-4 text-white/50" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
      text: "GitHub",
      href: githubLink,
    }] : []),
  ].filter(item => item.text);

  const skillsText = userData.skills?.length ? userData.skills.join(", ") : "Sin habilidades registradas";

  return (
    <div className="min-h-screen bg-[#110e0e] text-white font-sans selection:bg-red-500/30">
      
      {/* Banner Superior */}
      <div className="h-58 bg-[#ffefe0]" aria-hidden />

      {/* Contenedor principal */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16">
        
        {/* Mensajes de estado */}
        {saveSuccess && (
          <div className="mb-4 rounded-lg bg-green-900/50 border border-green-700 p-4 text-green-200">
            ✅ Perfil actualizado correctamente
          </div>
        )}
        
        {saveError && (
          <div className="mb-4 rounded-lg bg-red-900/50 border border-red-700 p-4 text-red-200">
            ❌ Error: {saveError}
          </div>
        )}

        {/* --- SECTION HEADER / PERFIL --- */}
        <section className="relative -mt-20">
          <div className="relative rounded-[24px] bg-[#221b1b] px-8 pb-10 pt-16 shadow-2xl md:px-12 md:pb-12 md:pt-20">
            
            {/* Botón de Edición - Solo mostrar si es perfil propio */}
            {userData && currentUserId && userData.id.toString() === currentUserId && (
              <div className="absolute right-8 top-8">
                {isEditing ? (
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className={`rounded-full ${saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} px-4 py-2 text-sm font-semibold text-white transition-colors`}
                    >
                      {saving ? 'Guardando...' : 'Guardar'}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={saving}
                      className="rounded-full bg-gray-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-600 disabled:bg-gray-700"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="rounded-full bg-[#da292e] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                  >
                    Editar Perfil
                  </button>
                )}
              </div>
            )}

            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[60%]">
              <div className="flex size-48 items-center justify-center rounded-full border-[8px] border-[#221b1b] bg-[#ffefe0]">
                <Avatar className="size-full overflow-hidden rounded-full">
                  {avatarSrc ? (
                    <AvatarImage
                      src={avatarSrc}
                      alt={`Foto de ${fullName}`}
                      className="size-full object-cover"
                    />
                  ) : null}
                  <AvatarFallback className="bg-[#da292e] text-5xl font-bold uppercase text-white">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Textos del Header */}
            <div className="mt-16 text-center">
              <h1 className={`text-4xl font-bold tracking-wide text-white ${orbitron.className}`}>{fullName}</h1>
              
              {/* Username con editor si está en modo edición */}
              {isEditing ? (
                <div className="mt-4 flex justify-center">
                  <UsernameEditor
                    currentUsername={editableUsername}
                    usernameLastChanged={userData.username_last_changed || null}
                    isEditing={isEditing}
                    onUsernameChange={setEditableUsername}
                  />
                </div>
              ) : username ? (
                <p className={`mt-2 text-sm font-medium tracking-widest text-white/40 uppercase ${orbitron.className}`}>
                  @{username}
                </p>
              ) : (
                <p className={`mt-2 text-xs font-medium tracking-widest text-white/20 uppercase italic ${orbitron.className}`}>
                  Username no configurado
                </p>
              )}
              
              <div className="mt-6 flex justify-center">
                {isEditing ? (
                  <Tooltip 
                    content="Tu biografía es lo primero que otros miembros verán. Describe tu experiencia y objetivos en el semillero."
                    position="top"
                  >
                    <div className="w-full max-w-2xl">
                      <div className="flex items-center gap-2 justify-center mb-2 text-xs text-white/40 cursor-help">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                        </svg>
                        Biografía - Información importante
                      </div>
                      <textarea
                        value={editableBio}
                        onChange={(e) => setEditableBio(e.target.value)}
                        rows={4}
                        className="w-full resize-none rounded-lg border border-white/20 bg-black/30 p-4 text-white/90 focus:border-[#da292e] focus:ring-1 focus:ring-[#da292e] text-center"
                        placeholder="Escribe tu descripción de perfil aquí..."
                      />
                    </div>
                  </Tooltip>
                ) : (
                  <p className="max-w-2xl text-center text-base leading-relaxed text-white/70">
                    {bio}
                  </p>
                )}
              </div>

              {/* Fila de Iconos de Contacto */}
              {infoItems.length > 0 && (
                <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/60">
                    {infoItems.map((item) => (
                      <div key={item.text} className="flex items-center gap-2 transition-colors hover:text-white">
                        {item.icon}
                        {item.href ? (
                          item.text === "GitHub" && isEditing ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={editableGithub}
                                onChange={(e) => setEditableGithub(e.target.value)}
                                className="w-48 rounded border border-white/20 bg-black/30 px-2 py-1 text-sm text-white/90 focus:border-[#da292e] focus:outline-none"
                                placeholder="URL de GitHub"
                              />
                              <span className="text-xs text-white/40">(GitHub)</span>
                            </div>
                          ) : (
                            <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-white/30 underline-offset-4">
                              {item.text}
                            </a>
                          )
                        ) : (
                          <span>{item.text}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* --- GRID DE CONTENIDO (Skills, Proyectos, Social, QR) --- */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          
          <div className="space-y-6">

            {/* Programa académico */}
            <article className="rounded-[24px] bg-[#221b1b] p-8 shadow-xl">
              <h2 className="text-lg font-bold text-white">Programa académico</h2>
              {isEditing ? (
                <div className="mt-4">
                  <ProgramSelector
                    value={editableProgram || null}
                    onChange={(programName) => setEditableProgram(programName || "")}
                    placeholder="Busca y selecciona tu programa"
                    helperText="Selecciona un único programa de la lista oficial."
                  />
                </div>
              ) : (
                <p className="mt-4 text-sm font-medium leading-relaxed text-white/60">
                  {userData.program || "Programa no especificado"}
                </p>
              )}
            </article>
            
            {/* Skills */}
            <article className="rounded-[24px] bg-[#221b1b] p-8 shadow-xl">
              <h2 className="text-lg font-bold text-white">Skills / Lenguajes</h2>
              {isEditing ? (
                <Tooltip 
                  content="Selecciona las tecnologías que dominas. Esto ayuda a formar equipos complementarios en proyectos."
                  position="top"
                >
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2 text-xs text-white/40 cursor-help">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                      </svg>
                      Skills - Información importante
                    </div>
                    <SkillSelector 
                      selectedSkills={editableSkills} 
                      onChange={setEditableSkills} 
                    />
                  </div>
                </Tooltip>
              ) : (
                <p className="mt-4 text-sm font-medium leading-relaxed text-white/60">
                  {skillsText}
                </p>
              )}
            </article>

            {/* Trabajando en */}
            <article className="rounded-[24px] bg-[#221b1b] p-8 shadow-xl">
              <h2 className="text-lg font-bold text-white">Trabajando en</h2>
              {isEditing ? (
                <div className="mt-4">
                  <textarea
                    value={editableWorkingOnText}
                    onChange={(e) => setEditableWorkingOnText(e.target.value)}
                    rows={5}
                    className="w-full resize-none rounded-lg border border-white/20 bg-black/30 p-3 text-white/90 focus:border-[#da292e] focus:ring-1 focus:ring-[#da292e]"
                    placeholder="Escribe un proyecto por línea. Usa ' | ' para separar el Título y el Link. (Ej: Proyecto X | #)"
                  />
                </div>
              ) : (
                <ul className="mt-5 space-y-3">
                  {userData.working_on && userData.working_on.length > 0 ? (
                    userData.working_on.map((project) => (
                      <li key={project.title} className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-[#da292e]" />
                        <Link
                          href={project.link}
                          className="text-sm font-medium text-[#da292e] hover:text-red-400 transition-colors"
                        >
                          {project.title}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-white/40">No hay proyectos registrados</li>
                  )}
                </ul>
              )}
            </article>
          </div>

          <div className="space-y-6">
            {/* Social Links */}
            <article className="rounded-[24px] bg-[#221b1b] p-8 shadow-xl">
              <h2 className="text-lg font-bold text-white">Social & Links</h2>
              {isEditing ? (
                 <div className="mt-4">
                    <SocialLinksEditor 
                      links={editableSocialLinks} 
                      onChange={setEditableSocialLinks} 
                    />
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  {userData.social_links && userData.social_links.length > 0 ? (
                    userData.social_links.map((social) => {
                      const socialHref = social.url.startsWith('http://') || social.url.startsWith('https://') 
                        ? social.url 
                        : `https://${social.url}`;
                      
                      return (
                        <a
                          key={`${social.icon}-${social.url}`}
                          href={socialHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-4 rounded-xl border border-transparent bg-white/5 px-4 py-3 transition-all hover:bg-white/10"
                        >
                          <span className="flex size-10 items-center justify-center rounded-full bg-black/40 text-white/80 group-hover:text-white">
                            <SocialIconDisplay icon={social.icon} />
                          </span>
                          <div className="flex flex-1 flex-col overflow-hidden">
                            <span className="truncate border-b border-white/10 pb-1 text-sm text-white/60 group-hover:border-white/30 group-hover:text-white/90 transition-colors">
                              {social.label}
                            </span>
                          </div>
                        </a>
                      );
                    })
                  ) : (
                    <div className="text-sm text-white/40">No hay links sociales registrados</div>
                  )}
                </div>
              )}
            </article>

            {/* Código QR Dinámico - Solo visible para el propietario del perfil */}
            {userData && currentUserId && userData.id.toString() === currentUserId && (
              <article className="rounded-[24px] bg-[#221b1b] p-8 shadow-xl">
                <h2 className="mb-6 text-lg font-bold text-white">Código QR</h2>
                {userData?.id ? (
                  <QRDynamic
                    userId={userData.id}
                    className="rounded-xl border border-white/5 bg-[#221b1b]"
                  />
                ) : (
                  <div className="text-center text-white/40">Cargando QR...</div>
                )}
              </article>
            )}
          </div>

        </section>
      </main>
    </div>
  );
}