"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import QRDynamic from "@/components/qr-dynamic";
import SkillSelector from "@/components/ui/SkillSelector";
import SocialLinksEditor from "@/components/ui/SocialLinksEditor";
import { UsernameEditor } from "@/components/ui/UsernameEditor";
import { Tooltip } from "@/components/ui/Tooltip";
import ProgramSelector from "@/components/ui/ProgramSelector";
import { useCsrf } from "@/hooks/useCsrf";
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

// Define un tipo para fechas que pueden ser nulas o indefinidas
type NullableDate = string | null | undefined;

// Define la estructura de los datos del usuario obtenidos de la API

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

interface UserData {
  id: string;
  name: string;
  last_name: string;
  email: string;
  skills: string[];
  role: string;
  motivation: string;
  semester: number;
  username?: string;
  created_at?: string;
  createdAt?: string;
  joined_at?: string;
  joinedAt?: string;
  website?: string;
  github?: string;
  bio?: string;
  avatar?: string;
  avatar_url?: string;
  profile_image?: string;
  profileImage?: string;
  image?: string;
  photo?: string;
  working_on?: ProjectData[];
  social_links?: SocialLinkData[];
}

// Datos de emergencia (solo si la API falla completamente)
const emergencyData: UserData = {
  id: "emergency",
  name: "Usuario",
  last_name: "Devurity",
  email: "usuario@devurity.com",
  skills: ["Cargando..."],
  role: "Miembro",
  motivation: "",
  semester: 0,
  bio: "Bienvenido a Devurity",
  working_on: [],
  social_links: []
};

export default function ProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const { fetchWithCsrf } = useCsrf();
  
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null); // ID del usuario autenticado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Estados para edición
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editableSkillsText, setEditableSkillsText] = useState('');
  const [editableWorkingOnText, setEditableWorkingOnText] = useState('');
  const [editableSocialLinksText, setEditableSocialLinksText] = useState('');
  const [editableBio, setEditableBio] = useState('');
  const [editableGithub, setEditableGithub] = useState('');

  // --- UTILIDADES DE PARSEO ---

  const skillsArrayToText = (skills: string[]) => skills.join(', ');
  
  const workingOnArrayToText = (projects: ProjectData[]) => 
    projects.map(p => `${p.title} | ${p.link}`).join('\n');

  const socialLinksArrayToText = (links: SocialLinkData[]) => 
    links.map(l => `${l.label} | ${l.url}`).join('\n');

  const skillsTextToArray = (text: string) => 
    text.split(',').map(s => s.trim()).filter(s => s.length > 0);
  
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

  const socialLinksTextToArray = (text: string): SocialLinkData[] => {
    return text.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        const parts = line.split('|').map(p => p.trim());
        const url = parts[1] || '#';
        const icon = url.toLowerCase().includes('instagram') ? 'instagram' : 'link';
        return {
          label: parts[0] || url,
          url: url,
          icon: icon
        };
      });
  };

  // --- HANDLERS DE EDICIÓN ---

  const handleEdit = () => {
    // Inicializar los textareas con los datos actuales
    setEditableSkillsText(skillsArrayToText(userData?.skills || []));
    setEditableWorkingOnText(workingOnArrayToText(userData?.working_on || []));
    setEditableSocialLinksText(socialLinksArrayToText(userData?.social_links || []));
    setEditableBio(userData?.bio || '');
    setEditableGithub(userData?.github || '');
    
    setIsEditing(true);
    setSaveError(null);
    setSaveSuccess(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      // Preparar datos para enviar
      const updatedData = {
        skills: skillsTextToArray(editableSkillsText),
        working_on: workingOnTextToArray(editableWorkingOnText),
        social_links: socialLinksTextToArray(editableSocialLinksText),
        bio: editableBio,
        github: editableGithub
      };

      console.log("Guardando datos para usuario:", id);

      // Llamada a la API real para guardar
      const response = await fetch(`/api/users/${id}`, {
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
      console.error('Error al guardar:', err);
      setSaveError(err instanceof Error ? err.message : 'Error desconocido al guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSaveError(null);
    setSaveSuccess(false);
  };

  // --- Lógica del componente ---

  const renderSocialIcon = (icon: string): ReactNode => {
    switch (icon) {
      case "instagram":
        return (
          <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07c3.252.148 4.771 1.691 4.919 4.919c.058 1.265.069 1.645.069 4.849c0 3.205-.012 3.584-.069 4.849c-.149 3.225-1.664 4.771-4.919 4.919c-1.266.058-1.644.07-4.85.07c-3.204 0-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92c-.058-1.265-.07-1.644-.07-4.849c0-3.204.013-3.583.07-4.849c.149-3.227 1.664-4.771 4.919-4.919c1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072C2.695.272.273 2.69.073 7.052C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98c.059-1.28.073-1.689.073-4.948c0-3.259-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324a6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8a4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881a1.44 1.44 0 0 0 0-2.881z" />
          </svg>
        );
      default:
        return (
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
    }
  };

  const normalizeExternalLink = (href?: string | null) => {
    if (!href) return undefined;
    const trimmed = href.trim();
    if (!trimmed) return undefined;
    if (trimmed.startsWith("#")) return trimmed;
    if (/^(https?:|mailto:|tel:|data:|blob:)/i.test(trimmed)) return trimmed;
    if (trimmed.startsWith("/")) return trimmed;
    return `https://${trimmed.replace(/^\/+/, "")}`;
  };

  // Cargar datos del usuario desde API REAL
  useEffect(() => {
    const abortController = new AbortController();
    
    async function fetchUserData() {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Cargando datos para ID:", id);
        
        // Llamada a la API real
        const response = await fetch(`/api/users/${id}`);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Datos recibidos:", data);
        
        setUserData(data);

      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
        
        // Solo usar datos de emergencia si realmente no hay datos
        setUserData({...emergencyData, id: id});
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    }
    
    if (id && id !== "emergency") {
      fetchUserData();
    } else if (id === "emergency") {
      setUserData({ ...emergencyData, id: id });
      setLoading(false);
    }
  }, [id]);

  const getInitials = (name: string, lastName: string) => {
    return `${name.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#110e0e] flex items-center justify-center">
        <div className="text-white text-xl">Cargando perfil de {id}...</div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-[#110e0e] flex flex-col items-center justify-center p-4">
        <div className="text-red-400 text-xl mb-4">Error al cargar perfil</div>
        <div className="text-white/60 mb-4">{error}</div>
        <div className="text-white/40 text-sm">ID: {id}</div>
      </div>
    );
  }

  const fullName = userData ? `${userData.name} ${userData.last_name}` : "Usuario Devurity";
  const userInitials = userData ? getInitials(userData.name, userData.last_name) : "UD";

  const resolveDate = (...candidates: NullableDate[]): Date | null => {
    for (const value of candidates) {
      if (!value) continue;
      const parsed = new Date(value);
      if (!Number.isNaN(parsed.getTime())) return parsed;
    }
    return null;
  };

  const joinedDate = resolveDate(userData?.joined_at, userData?.joinedAt, userData?.created_at, userData?.createdAt);
  const formattedJoinDate = joinedDate
    ? joinedDate.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })
    : "Fecha no disponible";

  const username = userData?.username || (userData?.email ? `@${userData.email.split("@")[0]}` : "@devurity");
  const bio = userData?.bio || "Sin descripción disponible";

  const websiteLink = normalizeExternalLink(userData?.website);
  const githubLink = normalizeExternalLink(userData?.github);
  const avatarSrc = userData?.avatar || userData?.avatar_url || userData?.profile_image || userData?.image;

  // Items del header
  const infoItems = [
    {
      icon: (
        <svg aria-hidden className="size-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      text: `Se unió el ${formattedJoinDate}`,
    },
    {
      icon: (
        <svg aria-hidden className="size-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      text: userData?.email,
      href: userData?.email ? `mailto:${userData.email}` : undefined,
    },
    ...(userData?.website ? [{
      icon: (
        <svg aria-hidden className="size-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      text: userData.website.replace(/^https?:\/\//, ''),
      href: websiteLink,
    }] : []),
    ...(userData?.github ? [{
      icon: (
        <svg aria-hidden className="size-4 text-white/50" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
      text: "GitHub",
      href: githubLink,
    }] : []),
  ].filter(item => item.text && item.href);

  const skillsText = userData?.skills?.length ? userData.skills.join(", ") : "Sin habilidades registradas";

  return (
    <div className="min-h-screen bg-[#110e0e] text-white font-sans selection:bg-red-500/30">
      
      {/* Banner Superior */}
      <div className="h-48 bg-[#ffefe0]" aria-hidden />

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
            
            {/* Botón de Edición */}
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

            {/* Avatar Flotante */}
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
              <h1 className="text-4xl font-bold tracking-wide text-white">{fullName}</h1>
              <p className="mt-2 text-sm font-medium tracking-widest text-white/40 uppercase">{username}</p>
              
              <div className="mt-6 flex justify-center">
                {isEditing ? (
                  <div className="w-full max-w-2xl">
                    <textarea
                      value={editableBio}
                      onChange={(e) => setEditableBio(e.target.value)}
                      rows={4}
                      className="w-full resize-none rounded-lg border border-white/20 bg-black/30 p-4 text-white/90 focus:border-[#da292e] focus:ring-1 focus:ring-[#da292e] text-center"
                      placeholder="Escribe tu descripción de perfil aquí..."
                    />
                    <p className="mt-2 text-xs text-white/40 text-center">
                      Esta es tu descripción pública que verán los demás usuarios
                    </p>
                  </div>
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
                    {infoItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 transition-colors hover:text-white">
                        {item.icon}
                        {item.href ? (
                          idx === infoItems.findIndex(i => i.text === "GitHub") && isEditing ? (
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
            
            {/* Skills */}
            <article className="rounded-[24px] bg-[#221b1b] p-8 shadow-xl">
              <h2 className="text-lg font-bold text-white">Skills / Lenguajes</h2>
              {isEditing ? (
                <div>
                    <textarea
                      value={editableSkillsText}
                      onChange={(e) => setEditableSkillsText(e.target.value)}
                      rows={3}
                      className="w-full resize-none rounded-lg border border-white/20 bg-black/30 p-3 text-white/90 focus:border-[#da292e] focus:ring-1 focus:ring-[#da292e]"
                      placeholder="Separa las habilidades con comas (Ej: Java, React, Python)"
                    />
                </div>
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
                <div>
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
                  {userData?.working_on?.map((project, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-2 size-1.5 rounded-full bg-[#da292e]" />
                      <Link
                        href={project.link}
                        className="text-sm font-medium text-[#da292e] hover:text-red-400 transition-colors"
                      >
                        {project.title}
                      </Link>
                    </li>
                  )) || (
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
                 <div>
                    <textarea
                      value={editableSocialLinksText}
                      onChange={(e) => setEditableSocialLinksText(e.target.value)}
                      rows={6}
                      className="w-full resize-none rounded-lg border border-white/20 bg-black/30 p-3 text-white/90 focus:border-[#da292e] focus:ring-1 focus:ring-[#da292e]"
                      placeholder="Escribe un link por línea. Usa ' | ' para separar el Label y la URL. (Ej: mi-bento | https://bento.me/user)"
                    />
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  {userData?.social_links?.map((social, index) => {
                    const socialHref = normalizeExternalLink(social.url) ?? social.url;
                    return (
                      <a
                        key={index}
                        href={socialHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 rounded-xl border border-transparent bg-white/5 px-4 py-3 transition-all hover:bg-white/10"
                      >
                        <span className="flex size-10 items-center justify-center rounded-full bg-black/40 text-white/80 group-hover:text-white">
                          {renderSocialIcon(social.icon)}
                        </span>
                        <div className="flex flex-1 flex-col overflow-hidden">
                          <span className="truncate border-b border-white/10 pb-1 text-sm text-white/60 group-hover:border-white/30 group-hover:text-white/90 transition-colors">
                            {social.label}
                          </span>
                        </div>
                      </a>
                    );
                  }) || (
                    <div className="text-sm text-white/40">No hay links sociales registrados</div>
                  )}
                </div>
              )}
            </article>

            {/* Código QR Dinámico */}
            <article className="rounded-[24px] bg-[#221b1b] p-8 shadow-xl">
                <h2 className="mb-6 text-lg font-bold text-white">Código QR</h2>
                <QRDynamic
                  userId={id}
                  className="rounded-xl border border-white/5 bg-[#221b1b]"
                />
            </article>
          </div>

        </section>
      </main>
    </div>
  );
}