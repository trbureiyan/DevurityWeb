# Cambios pendientes para revisión e implementación

Responsable sugerido: @Arekkazu

Este documento consolida los cambios no confirmados (unstaged) y propuestas asociadas que requieren validación técnica y decisiones de implementación.

Fecha: 2025-11-08

## 1) Repositorio de usuarios (`repositories/users/users.repositories.ts`)

Cambios detectados:
- Conversión segura a BigInt con trazas (`toBigInt`) y uso consistente en consultas.
- Nuevas selecciones con includes de `roles`, `user_skills`, `user_platforms`.
- Paginación para usuarios inactivos con serialización de BigInt a string.
- `createUser` ahora valida skills contra DB y arroja `INVALID_SKILLS_SELECTION` si hay desalineación.
- Operaciones de activación y eliminación de usuarios inactivos con transacción y limpieza de relaciones.

Decisiones/Acciones:
- Validar nivel de logging: bajar `console.log`/`console.error` a un logger central (nivel debug) y respetar PII.
- Confirmar que `skills` es un catálogo cerrado y documentar su fuente; introducir cache/tag para lectura.
- Añadir tipos explícitos de retorno (evitar `any[]` en `PaginatedUsersResponse.users`).
- Alinear nombres de campos (`last_name` vs `lastName`) entre API y UI (normalizador o mappers).

## 2) Registro por token (`app/api/auth/register/[tokenRegister]/route.ts`)

Cambios detectados:
- Validación de token (GET/POST) y expiración (UNIX now vs `exp`).
- Validaciones ampliadas: `semester` (1..13), `motivation`, `password` (regex), y `skills` (array, normalización, unicidad).
- Mensajería de error más específica y códigos HTTP apropiados (422/409/500).
- `createUser` recibe `skills: uniqueSkills` y propaga `INVALID_SKILLS_SELECTION`.

Decisiones/Acciones:
- Revisar uniformidad de mensajes (acentos, consistencia de campos: "Motivación"/"motivacion").
- Evitar mensajes truncados (p.ej., "Verifica tu " en regex password) y centralizar textos en `lib/error`.
- Unificar validación de skills con repositorio (single source of truth, DRY).
- Añadir rate-limit mínimo para POST (prevención de abuso) y auditoría básica.

## 3) Perfil protegido

### a) Redirección (`app/(protected)/profile/page.tsx`)
Cambios detectados:
- Página cliente que consulta `/api/auth/profile` y luego `/api/auth/users/me` para obtener `user.id`, con redirección a `/profile/{id}`.

Decisiones/Acciones:
- Consolidar endpoints (evitar doble fetch); devolver `id` en `/api/auth/profile` si es posible.
- Manejar estados de carga/error accesibles y tiempos de espera (timeout/reintentos con backoff).
- Añadir telemetría básica para fallos de redirección.

### b) Contenido de perfil (`app/(protected)/profile/[id]/ProfileContent.tsx`)
Cambios detectados:
- Componente client con UI de perfil, avatares, skills, proyectos en curso estáticos, y enlaces sociales estáticos; QR dinámico por usuario.
- Utiliza `UserProfile` desde `lib/data/users` (pendiente confirmar contrato).

Decisiones/Acciones:
- Reemplazar `STATIC_PROFILE_DATA` por datos reales cuando haya contrato; mientras tanto encapsular en props o un provider con fallback.
- Normalizar `user.lastName` vs `last_name` (mapper en boundary de datos).
- Validar accesibilidad (aria-labels, contrastes) y recortes de texto.

## 4) UI/SEO complementarios

- `app/updates/page.tsx`: se añadió `robots: { index: true, follow: true }` y `openGraph.locale: es_CO`.
- `app/projects/page.tsx`: año dinámico en “Portafolio Devurity {YYYY}”.

Acciones:
- Considerar añadir `alternates.canonical`, OpenGraph completo (title/desc/url/images) y Twitter card común.
- JSON-LD (CollectionPage + ItemList) para `/updates` y `/projects`.

## Checklist de implementación

Prioridad alta:
- [ ] Centralizar validación y catálogo de `skills`; compartir entre API y repo.
- [ ] Reducir logging sensible; migrar a logger y ocultar PII.
- [ ] Unificar endpoints de perfil o exponer `id` en `/api/auth/profile`.
- [ ] Revisar y corregir textos de error (acentos, truncados) en token register.

Prioridad media:
- [ ] Tipar correctamente `PaginatedUsersResponse.users`.
- [ ] Introducir rate-limiting en POST /auth/register/[tokenRegister].
- [ ] Sustituir `STATIC_PROFILE_DATA` por datos reales o prop controlada.

## Notas para @arekazzu

- Este documento no hace merge de cambios sensibles de Prisma ni repositorio de usuarios fuera de lo aquí descrito; revisar conjuntamente si se quiere activar `onDelete: Cascade` en relaciones.
- Las decisiones de normalización (`last_name` vs `lastName`) y contratos para `UserProfile` requieren tu visto bueno para evitar deudas técnicas.
- Si prefieres, puedo abrir PRs separados por área (API auth, repos usuarios, perfil, SEO) para facilitar la revisión.

## Anexo: Diffs explícitos por archivo de cambios y soluciones implementadas para funcionamiento

Los siguientes diffs representan el estado de los cambios introducidos en local.

Han sido implementados para solucionar problemas y errores en funcionamiento de la pagina, porfavor revisar e integrar debidamente.

### 1. app/(protected)/profile/[id]/ProfileContent.tsx (archivo nuevo)

``` tsx
"use client";

import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import QRDynamic from "@/components/qr-dynamic";
import type { UserProfile } from "@/lib/data/users";

const STATIC_PROFILE_DATA = {
  workingOn: [
    { title: "Desarrollo de Aplicación Agrícola - MinAg", link: "#" },
    { title: "Security Web", link: "#" },
  ],
  socialLinks: [
    {
      icon: "discord" as const,
      url: "https://discord.gg/",
      label: "https://discord.gg/",
    },
    { icon: "twitter" as const, url: "#", label: "@devurity" },
    {
      icon: "instagram" as const,
      url: "http://instagram.com/",
      label: "http://instagram.com/",
    },
  ],
};

type SocialIcon = "discord" | "twitter" | "instagram";

type ProfileContentProps = {
  user: UserProfile;
};

const getInitial = (value: string): string => {
  if (!value) {
    return "D";
  }
  return value.trim().charAt(0).toUpperCase();
};

const renderSocialIcon = (icon: SocialIcon) => {
  if (icon === "discord") {
    return (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    );
  }

  if (icon === "twitter") {
    return (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26l8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }

  return (
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07c3.252.148 4.771 1.691 4.919 4.919c.058 1.265.069 1.645.069 4.849c0 3.205-.012 3.584-.069 4.849c-.149 3.225-1.664 4.771-4.919 4.919c-1.266.058-1.644.07-4.85.07c-3.204 0-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92c-.058-1.265-.07-1.644-.07-4.849c0-3.204.013-3.583.07-4.849c.149-3.227 1.664-4.771 4.919-4.919c1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072C2.695.272.273 2.69.073 7.052C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98c.059-1.28.073-1.689.073-4.948c0-3.259-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324a6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8a4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881a1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
};

export default function ProfileContent({ user }: ProfileContentProps) {
  const fullName = `${user.name} ${user.lastName}`.trim() || "Miembro Devurity";

  return (
    <div className="min-h-screen bg-variable-collection-fondo">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-[#2A2520] rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50">
          <div className="relative pt-12 pb-8 px-4 md:px-8 bg-gradient-to-b from-[#2A2520] to-[#1A1A1A]">
            <button
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="Enviar mensaje"
              type="button"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </button>

            <div className="flex justify-center mb-6">
              <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-white/90 shadow-2xl">
                <AvatarFallback className="bg-variable-collection-botones text-white text-4xl md:text-5xl font-bold">
                  {getInitial(fullName)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="text-center">
              <h1 className="font-bold text-2xl md:text-3xl text-white mb-2">
                {fullName}
              </h1>
              <p className="text-gray-400 text-sm">ID: {user.id}</p>
            </div>
          </div>

          <div className="bg-[#1A1A1A] px-4 md:px-8 py-6 md:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-8">
                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                  <h2 className="font-bold text-white text-lg md:text-xl mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-variable-collection-botones rounded-full" />
                    Skills / Lenguajes
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.length > 0 ? (
                      user.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-gray-700/50 text-gray-200 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-600/50 transition-colors duration-200"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">
                        Aún no has registrado habilidades.
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                  <h2 className="font-bold text-white text-lg md:text-xl mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-variable-collection-botones rounded-full" />
                    Trabajando en
                  </h2>
                  <ul className="space-y-3">
                    {STATIC_PROFILE_DATA.workingOn.map((project) => (
                      <li key={project.title}>
                        <Link
                          href={project.link}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-700/30 transition-all duration-200 group"
                        >
                          <div className="w-2 h-2 bg-variable-collection-link rounded-full mt-2 flex-shrink-0" />
                          <div className="flex-1">
                            <span className="text-variable-collection-link group-hover:text-white transition-colors duration-200 font-medium">
                              {project.title}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                  <h2 className="font-bold text-white text-lg md:text-xl mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-variable-collection-botones rounded-full" />
                    Social & Links
                  </h2>
                  <div className="space-y-3">
                    {STATIC_PROFILE_DATA.socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700/30 transition-all duration-200 group"
                      >
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-gray-600 transition-colors duration-200 flex-shrink-0">
                          {renderSocialIcon(social.icon)}
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-200 text-sm break-all flex-1">
                          {social.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                <QRDynamic userId={user.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 2. app/(protected)/profile/page.tsx

> lineas eliminadas:

``` tsx
71 | 
71 | return null;
72 |
```

### 3. app/api/auth/register/[tokenRegister]/route.ts

> lineas añadidas (+92 - +127):

``` tsx
  if (!Array.isArray(skills) || skills.length === 0) {
    return new Response(
      JSON.stringify(
        errorRequest(
          "habilidades",
          "Selecciona al menos una habilidad válida.",
        ),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const normalizedSkills = skills
    .filter((skill): skill is string => typeof skill === "string")
    .map((skill) => skill.trim())
    .filter((skill) => skill.length > 0);

  if (normalizedSkills.length !== skills.length) {
    return new Response(
      JSON.stringify(
        errorRequest(
          "habilidades",
          "Se detectaron habilidades vacías o inválidas.",
        ),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const uniqueSkills = Array.from(new Set(normalizedSkills));
```

> lineas eliminadas:

``` tsx
188 | skills,
```

> lineas añadidas (+224):

``` tsx
skills: uniqueSkills,
```

> lineas añadidas (+228 - +243):

``` tsx
if (e instanceof Error && e.message === "INVALID_SKILLS_SELECTION") {
      return new Response(
        JSON.stringify(
          errorRequest(
            "habilidades",
            "Alguna habilidad seleccionada no existe en el sistema.",
          ),
        ),
        {
          status: 422,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    console.log(e);
```

> lineas eliminadas:

``` tsx
194         errorRequest("Usuario", "Ha ocurrido un error en la creacion del "),
```

> lineas añadidas (+246 - +249):

``` tsx
if (e instanceof Error && e.message === errorRequest(
          "registro",
          "Ha ocurrido un error al crear el usuario. Intenta nuevamente.",
        ),
```


### 4. repositories/users/users.repositories.ts

> lineas añadidas (+189 - +191):

``` tsx
if (skillsDB.length !== skills.length) {
        throw new Error("INVALID_SKILLS_SELECTION");
      }
```

### 5. lib/postgresDriver.ts

> lineas eliminadas:

``` tsx
import { PrismaClient } from "@prisma/client";
// import { PrismaClient } from "../lib/generated/prisma"; -- local
```

> lineas añadidas:

``` tsx
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "../lib/generated/prisma"; // -- local
```

### 6. prisma/schema.prisma

> lineas eliminadas:

``` tsx
  users           users?   @relation(fields: [user_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "attendances_fk_users")

```

> lineas añadidas (+16):

``` tsx
  users           users?   @relation(fields: [user_id], references: [id], onDelete: Cascade, map: "attendances_fk_users")
```

### 7. lib/data/users.ts

> lineas añadidas:

``` tsx
import { cache } from "react";
import prisma from "@/lib/postgresDriver"

// types y mapeo 
// |
// --> En produccion, validacion estricta de datos y manejo de errores

export interface UserProfile {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
  motivation: string | null;
  semester: number | null;
  skills: string[];
  isActive: boolean;
}

type RawUserProfile = {
  id: bigint;
  name: string;
  last_name: string | null;
  email: string;
  motivation: string | null;
  semester: number | null;
  is_active: boolean;
  roles: {
    name: string;
  } | null;
  user_skills: Array<{
    skills: {
      name: string;
    } | null;
  }>;
};

const toBigIntOrNull = (value: string): bigint | null => {
  try {
    return BigInt(value);
  } catch {
    return null;
  }
};

const mapUserProfile = (user: RawUserProfile): UserProfile => {
  const skills = Array.isArray(user.user_skills)
    ? user.user_skills
        .map((entry) => entry?.skills?.name)
        .filter((name: unknown): name is string => typeof name === "string")
    : [];

  return {
    id: user.id.toString(),
    name: user.name,
    lastName: user.last_name ?? "",
    email: user.email,
    role: user.roles?.name ?? "Miembro",
    motivation: user.motivation ?? null,
    semester: typeof user.semester === "number" ? user.semester : null,
    skills,
    isActive: Boolean(user.is_active),
  };
};

export const getUserProfileById = cache(async (id: string): Promise<UserProfile | null> => {
  const numericId = toBigIntOrNull(id);

  if (numericId === null) {
    return null;
  }

  const user = await prisma.users.findUnique({
    where: { id: numericId },
    include: {
      roles: {
        select: {
          name: true,
        },
      },
      user_skills: {
        include: {
          skills: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  return mapUserProfile(user as RawUserProfile);
});

```