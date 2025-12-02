"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import QRDynamic from "@/components/qr-dynamic";

// Define un tipo para fechas que pueden ser nulas o indefinidas
type NullableDate = string | null | undefined;

// Define la estructura de los datos del usuario obtenidos de la API

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
}

export default function ProfilePage() {
  const params = useParams();
  const id = params.id as string;
  // Mantiene los datos del usuario una vez cargados desde la API
  const [userData, setUserData] = useState<UserData | null>(null);
  // Trackea el estado de la carga asíncrona y posibles errores
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mockea datos - esto se mantiene hardcodeado para completar la maqueta
  const profileData = {
    workingOn: [
      { title: "#", link: "#" }
    ],
    socialLinks: [
      {
        icon: "discord",
        url: "https://discord.gg/",
        label: "https://discord.gg/",
      },
      { icon: "linkedin", url: "https://linkedin.com/company/devurity", label: "https://linkedin.com/company/devurity" },
      {
        icon: "email",
        url: "http://instagram.com/",
        label: "http://instagram.com/",
      },
    ],
  };

  // Renderiza diferentes íconos sociales según la etiqueta recibida
  const renderSocialIcon = (icon: string): ReactNode => {
    switch (icon) {
      case "discord":
        return (
          <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
        );
      case "twitter":
        return (
          <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M18.244 2.25h3.308l-7.227 8.26l8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case "instagram":
        return (
          <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07c3.252.148 4.771 1.691 4.919 4.919c.058 1.265.069 1.645.069 4.849c0 3.205-.012 3.584-.069 4.849c-.149 3.225-1.664 4.771-4.919 4.919c-1.266.058-1.644.07-4.85.07c-3.204 0-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92c-.058-1.265-.07-1.644-.07-4.849c0-3.204.013-3.583.07-4.849c.149-3.227 1.664-4.771 4.919-4.919c1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072C2.695.272.273 2.69.073 7.052C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98c.059-1.28.073-1.689.073-4.948c0-3.259-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324a6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8a4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881a1.44 1.44 0 0 0 0-2.881z" />
          </svg>
        );
      default:
        return (
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M4.75 5.75h14.5m-14.5 6.5h14.5m-14.5 6.5h14.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
    }
  };

  // Asegura que los enlaces externos sean válidos y seguros para usar en <a>
  const normalizeExternalLink = (href?: string | null) => {
    if (!href) return undefined;
    const trimmed = href.trim();
    if (!trimmed) return undefined;
    if (trimmed.startsWith("#")) return trimmed;
    if (/^(https?:|mailto:|tel:|data:|blob:)/i.test(trimmed)) return trimmed;
    if (trimmed.startsWith("/")) return trimmed;

    return `https://${trimmed.replace(/^\/+/, "")}`;
  };

  useEffect(() => {
    // Obtiene los datos del usuario desde la API protegida
    async function fetchUserData() {
      try {
        setLoading(true);
        setError(null);

        // Obtener todos los datos del usuario en una sola llamada
        const response = await fetch(`/api/auth/users/${id}`);

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error("No autorizado para ver este perfil");
          }
          throw new Error("Error al obtener datos del usuario");
        }

        const data = await response.json();
        setUserData(data.user);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [id]);

  // Genera las iniciales del usuario a partir de su nombre y apellido
  const getInitials = (name: string, lastName: string) => {
    return `${name.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-variable-collection-fondo flex items-center justify-center">
        <div className="text-white text-xl">Cargando perfil...</div>
      </div>
    );
  }

  if (error && !userData) {
    return (
      <div className="min-h-screen bg-variable-collection-fondo flex items-center justify-center">
        <div className="text-white text-xl">{error}</div>
      </div>
    );
  }

  const fullName = userData
    ? `${userData.name} ${userData.last_name}`
    : "Usuario Devurity";
  // Genera las iniciales del usuario para el avatar fallback
  const userInitials = userData
    ? getInitials(userData.name, userData.last_name)
    : "UD";

  // Intenta diferentes propiedades de fecha expuestas por la API y devuelve la primera válida
  const resolveDate = (...candidates: NullableDate[]): Date | null => {
    for (const value of candidates) {
      if (!value) continue;
      const parsed = new Date(value);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed;
      }
    }
    return null;
  };

  const joinedDate = resolveDate(
    userData?.joined_at,
    userData?.joinedAt,
    userData?.created_at,
    userData?.createdAt,
  );

  const formattedJoinDate = joinedDate
    ? joinedDate.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const username = userData?.username ||
    (userData?.email ? `@${userData.email.split("@")[0]}` : "@devurity");

  const bio = userData?.bio || userData?.motivation ||
    "Ingeniero de Software, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  // Normaliza enlaces públicos y avatares posibles del backend
  const websiteLink = normalizeExternalLink(userData?.website);
  const githubLink = normalizeExternalLink(userData?.github);
  const avatarSrc = normalizeExternalLink(
    userData?.avatar ||
      userData?.avatar_url ||
      userData?.profile_image ||
      userData?.profileImage ||
      userData?.image ||
      userData?.photo,
  );

  type InfoItem = {
    icon: ReactNode;
    text: string;
    href?: string;
  };

  // Construye la lista de ítems de información del perfil dinámicamente
  const infoItems = (
    [
      formattedJoinDate
        ? {
            icon: (
              <svg
                aria-hidden
                className="size-5 text-white/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M8 3v3m8-3v3M4.5 9h15m-13 4h3m4 0h3M5 5h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            text: `Se unió el ${formattedJoinDate}`,
          }
        : null,
      userData?.email
        ? {
            icon: (
              <svg
                aria-hidden
                className="size-5 text-white/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm0 0l8 6 8-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            text: userData.email,
            href: `mailto:${userData.email}`,
          }
        : null,
      websiteLink
        ? {
            icon: (
              <svg
                aria-hidden
                className="size-5 text-white/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M12 5c3.866 0 7 3.134 7 7s-3.134 7-7 7s-7-3.134-7-7s3.134-7 7-7zm0 0c1.933 0 3.5 3.134 3.5 7s-1.567 7-3.5 7S8.5 16.866 8.5 12S10.067 5 12 5zm-7 7h14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            text: userData?.website ?? websiteLink,
            href: websiteLink,
          }
        : null,
      githubLink
        ? {
            icon: (
              <svg
                aria-hidden
                className="size-5 text-white/60"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.9 0-1.3.47-2.36 1.24-3.2-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.22.95-.26 1.97-.39 2.98-.4 1.01 0 2.03.14 2.98.4 2.3-1.54 3.3-1.22 3.3-1.22.66 1.66.25 2.88.12 3.18.77.84 1.24 1.9 1.24 3.2 0 4.59-2.8 5.6-5.48 5.89.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
              </svg>
            ),
            text: userData?.github ?? githubLink,
            href: githubLink,
          }
        : null,
    ].filter(Boolean) as InfoItem[]
  );
  // Siempre incluye el ID del usuario como ítem de información
  if (infoItems.length === 0) {
    infoItems.push({
      icon: (
        <svg
          aria-hidden
          className="size-5 text-white/60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M12 12a4 4 0 1 0 0-8a4 4 0 0 0 0 8zm0 2c-4 0-7 2-7 4v1h14v-1c0-2-3-4-7-4z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      text: `ID: ${id}`,
    });
  }
  // Prepara el texto de habilidades para el bloque correspondiente
  const skillsText = userData?.skills?.length
    ? userData.skills.join(", ")
    : "Sin habilidades registradas";

  // Opcionalmente muestra detalles suplementarios si están disponibles
  const supplementalDetails = (
    [
      userData?.role ? { label: "Rol", value: userData.role } : null,
      typeof userData?.semester === "number" && !Number.isNaN(userData.semester)
        ? { label: "Semestre", value: `Semestre ${userData.semester}` }
        : null,
      userData?.motivation ? { label: "Motivación", value: userData.motivation } : null,
    ].filter(Boolean) as { label: string; value: string }[]
  );

  return (
    <div className="min-h-screen bg-variable-collection-fondo text-white">
      <div className="h-32 bg-[#ffefe0]" aria-hidden />
      {/* Contenedor principal del perfil */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16">
        <section className="relative -mt-24">
          <header className="relative rounded-[32px] border border-white/5 bg-[#221b1b] px-6 pb-12 pt-16 shadow-[0_35px_120px_rgba(0,0,0,0.5)] md:px-12 md:pb-14 md:pt-20">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 md:left-12 md:translate-x-0">
              <div className="flex size-[9.5rem] items-center justify-center rounded-full border-[6px] border-[#171212] bg-[#ffefe0] shadow-[0_18px_50px_rgba(0,0,0,0.45)] md:size-44">
                {/* Avatar del usuario con fallback a iniciales */}
                <Avatar className="size-[8.25rem] overflow-hidden border-[6px] border-white/15 bg-variable-collection-botones/10 shadow-[0_15px_35px_rgba(0,0,0,0.4)] md:size-40">
                  {avatarSrc ? (
                    <AvatarImage
                      src={avatarSrc}
                      alt={`Foto de perfil de ${fullName}`}
                      className="size-full object-cover"
                    />
                  ) : null}
                  <AvatarFallback className="bg-variable-collection-botones text-4xl font-bold uppercase text-white md:text-5xl">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
                {/* Código QR dinámico */}
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:pl-48">
              <div className="mt-16 flex-1 text-center md:mt-0 md:text-left">
                <h1 className="text-3xl font-semibold tracking-wide md:text-4xl">{fullName}</h1>
                <span className="mt-3 inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-1 text-xs uppercase tracking-[0.4em] text-white/60 md:justify-start md:text-sm">
                  {username}
                </span>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/70 md:max-w-none">
                  lorem ipsum
                </p>
              </div>

              <div className="flex flex-col items-center gap-4 md:items-end">
                <span className="rounded-full border border-white/10 px-4 py-1 text-xs tracking-[0.3em] text-white/40">
                  ID #{id}
                </span>
              </div>
            </div>
              {/* Información del usuario en ítems */}
            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
              {infoItems.map((item, index) => {
                const content = item.href ? (
                  <a
                    href={item.href}
                    target={/^https?:/i.test(item.href) ? "_blank" : undefined}
                    rel={/^https?:/i.test(item.href) ? "noopener noreferrer" : undefined}
                    className="break-all text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.text}
                  </a>
                ) : (
                  <span className="break-all text-sm text-white/70">{item.text}</span>
                );

                return (
                  <div
                    key={`${item.text}-${index}`}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                  >
                    <span className="flex items-center justify-center rounded-full bg-black/40 p-2">
                      {item.icon}
                    </span>
                    {content}
                  </div>
                );
              })}
            </div>
          </header>
        </section>
         {/* Sección de detalles adicionales, habilidades y proyectos */}
        <section className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,1fr)]">
          <div className="space-y-6">
            { /* Bloque de habilidades del usuario */ }
            <article className="rounded-[28px] border border-white/5 bg-[#221b1b] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              <h2 className="text-lg font-semibold">Skills / Lenguajes</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{skillsText}</p>
            </article>
            { /* Bloque de proyectos en los que el usuario está trabajando */ }
            <article className="rounded-[28px] border border-white/5 bg-[#221b1b] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              <h2 className="text-lg font-semibold">Trabajando en</h2>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {profileData.workingOn.map((project, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex size-2 rounded-full bg-variable-collection-botones" aria-hidden />
                    <Link
                      href={project.link}
                      className="font-medium text-variable-collection-botones transition-colors hover:text-white"
                    >
                      {project.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          </div>
          { /* Sección de enlaces sociales y código QR */ }
          <div className="space-y-6">
            <article className="rounded-[28px] border border-white/5 bg-[#221b1b] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              <h2 className="text-lg font-semibold">Social & Links</h2>
              <div className="mt-4 space-y-4">
                {profileData.socialLinks.map((social, index) => {
                  const socialHref = normalizeExternalLink(social.url) ?? social.url;

                  return (
                    <a
                      key={index}
                      href={socialHref}
                      target={socialHref?.startsWith("http") ? "_blank" : undefined}
                      rel={socialHref?.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 rounded-2xl border border-transparent bg-black/20 px-4 py-3 transition-all hover:border-variable-collection-link/40 hover:bg-black/30"
                    >
                      <span className="flex size-11 items-center justify-center rounded-full bg-black/40 text-white">
                        {renderSocialIcon(social.icon)}
                      </span>
                      <span className="flex-1 border-b border-white/10 pb-1 text-sm text-white/80">
                        {social.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </article>
            {/* Bloque del código QR dinámico */ }
            <QRDynamic
              userId={id}
              className="rounded-[28px] border border-white/5 bg-[#221b1b] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
