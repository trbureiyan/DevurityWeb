# Devurity Web

> Plataforma oficial del Semillero de Ciberseguridad y Desarrollo e ingenieria Devurity  
> Construida por y para estudiantes, investigadores y profesionales de la USCO

![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-GPL--3.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Prisma](https://img.shields.io/badge/ORM-Prisma-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![OpenSource](https://img.shields.io/badge/open--source-collaborative-success)

---

## About

DevurityWeb es la plataforma oficial del semillero Devurity, diseñada como un sistema modular, escalable, extensible y util para:

- Difusión científica y tecnológica
- Gestión de miembros y proyectos
- Anuncios y noticias desde el ecosistema Devurity
- Plataforma pública con contenido estructurado
- Panel administrativo funcional

La arquitectura busca equilibrio entre **rigor técnico y accesibilidad educativa**, permitiendo participación de nuevos miembros con estándares profesionales.

---

## Nuestra filosofia como proyecto

- **Código abierto y comunitario**
- **Construcción colaborativa**
- **Aprendizaje avanzado aplicable**
- **Documentación técnica**
- **Escalabilidad y modularidad**
- **Ética y responsabilidad tecnológica**
- **Seguridad primero**

> *Este proyecto es de la comunidad Devurity. Su crecimiento pertenece al semillero.*

---

## T-Stack

| Área | Tecnología |
|---|---|
Framework | Next.js 15 (App Router) & React 19
Lenguaje | TypeScript estricto
UI | Tailwind CSS v4 + componentes custom
ORM | Prisma
BD | PostgreSQL (cloud)
Auth | JWT + CSRF + Roles
Infra | Vercel & AWS (deploy final)
Docs | MarkDown + Jira (interno)
Licencia | GPL-3.0

---

## Lista de Features

### Público
- Landing institucional
- Perfiles de miembros
- Proyectos y actividades
- Eventos y logros
- Contacto y onboarding

### Admin
- Validación de usuarios
- Roles y permisos
- Registro de asistencia (QR dinámico)
- Gestión de contenido (futuro)

---

## Estructura principal y descriptiva del Proyecto

```
app/                                 — # rutas Next.js (App Router)
├─ (public)/                         — ## páginas públicas
│  │
│  ├─ about/                         — sección “Sobre nosotros”
│  ├─ access-denied/                 — acceso denegado
│  ├─ auth/                          — autenticación
│  │  │
│  │  ├─ login/                      — inicio de sesión
│  │  └─ register/                   — registro de usuarios
│  │     │
│  │     └─ [tokenRegister]/         — confirmación de registro por token
│  │
│  ├─ gallery/                       — galería pública
│  ├─ projects/                      — listado de proyectos
│  │  │
│  │  └─ project/                    — detalle de proyecto
│  │
│  └─ updates/                       — noticias/eventos
│     └─ update/                     — detalle de noticia/evento
│
├─ (protected)/                      — ## páginas protegidas por auth
│  ├─ admin/                         — panel administrativo
│  │  │
│  │  ├─ attendances/                — registro de asistencias (QR)
│  │  ├─ skills/                     — gestión de habilidades
│  │  └─ users/                      — gestión de usuarios
│  │     │
│  │     └─ confirm/                 — aprobación de registros
│  │        └─ [id]/                 — detalle de solicitud
│  │
│  └─ profile/                       — perfil de usuario
│     └─ [id]/                       — perfil por ID
│
├─ api/                              — ## endpoints (route handlers)
│  ├─ admin/
│  │  └─ attendances/                — API asistencias admin
│  ├─ asistencia/                    — API asistencias pública
│  │
│  ├─ auth/                          — APIs de autenticación
│  │  ├─ admin/
│  │  │  └─ users/                   — tool usuarios
│  │  │     └─ [id]/                 
│  │  ├─ csrf-token/                 — emisión de token CSRF
│  │  ├─ is-admin/                   — verificación rol admin
│  │  ├─ login/                      — login
│  │  ├─ logout/                     — logout
│  │  ├─ me/                         — sesión actual
│  │  ├─ profile/                    — perfil básico
│  │  ├─ refresh/                    — refresh de JWT
│  │  ├─ register/                   — registro
│  │  ├─ skills/                     — skills del usuario
│  │  ├─ users/                      
│  │  │  ├─ me/                      — info del usuario actual
│  │  │  └─ [id]/                    — info por ID
│  │  └─ verify-role/                — verificación de rol
│  │
│  ├─ contact/                       — form de contacto
│  ├─ qr-dinamico/                   — generación de QR dinámico
│  └─ skills/                        — CRUD de habilidades
│     │
│     └─ [id]/                       — recurso habilidad por ID
│
components/                          — # componentes UI reutilizables
├─ admin/                            — UI panel admin
├─ gallery/                          — UI galería
├─ icons/                            — íconos
├─ landing/                          — secciones de la landing
├─ layouts/                          — Navbar/Footer/Layout
└─ ui/                               — primitivas de UI (botón, avatar)
│
lib/                                 — # utilidades y core
├─ auth/                             — config/middleware/utils de auth
├─ constants/                        — constantes (landing, roles, galería)
├─ generated/                        — cliente Prisma generado
└─ types/                            — tipos compartidos
│
repositories/                        — # capa de acceso a datos (Prisma)
├─ projects/                         
├─ skills/                           
└─ users/                            
│
docs/                                — # documentación del proyecto
tests/                               — # base para pruebas automatizadas
````

Diseñada para permitir modularidad y contribución incremental.

---

## 🛠️ Instalación y Uso

```bash
git clone https://github.com/trbureiyan/DevurityWeb
cd DevurityWeb
npm install
cp .env.example .env
npx prisma db push
npm run dev
````

> ⚠️ Se requiere Node 18+ y PostgreSQL

---

## Roadmap Técnico
````
      ┌───────────────────────────────────┐
      │      Base del sistema y Auth      │
      │            FULL-STACK             │
      └───────────────────────────────────┘
                       │
                       ▼
      ┌───────────────────────────────────┐
      │     CI para linting y build       │
      └───────────────────────────────────┘
                       │
                       ▼
      ┌───────────────────────────────────┐
      │  Módulo de proyectos en progreso  │
      └───────────────────────────────────┘
                       │
                       ▼
      ┌───────────────────────────────────┐
      │    Portal de perfiles completo    │
      └───────────────────────────────────┘
                       │
                       ▼
        ┌────────────────────────────────┐
        │ Markdown editor + SEO dinámico |
        └────────────────────────────────┘
                       │
                       ▼
        ┌─────────────────────────────┐
        │            Pruebas          │
        └─────────────────────────────┘
                       │
                       ▼
        ┌────────────────────────────────┐
        │  CDN para assets del semillero |
        └────────────────────────────────┘
````

---

## 🤝 Contribución

> El proyecto está abierto a miembros del semillero y colaboradores externos autorizados.

Guía rápida:

1. Crear branch desde `dev`
2. Pushear commits
3. PR con descripción clara y checklist
4. Documentar cambios en `/docs`

Convenciones:

* Conventional Commits
* Estandar ESLint + TS strict
* Tests cuando aplique

---

## Ética & Comunidad

Este proyecto fomenta:

* Colaboración real
* Comunidad técnica responsable
* Investigación abierta
* Construcción sin ego y con propósito
* Practicar y aplicar la seguridad robusta

Uso indebido o propietario de aportes está prohibido bajo GPL-3.0.

---

## 📄 Licencia

Este proyecto está bajo licencia **GNU GPL-3.0**
Ver archivo [`LICENSE`](./LICENSE) para detalles.

---

## 👥 Autores y Mantenimiento

Liderazgo actual:

* **Brayan Toro Bustos** - Product Owner & Lider General
* **Alexander Lozada Caviedes** - Líder Técnico Backend
* **Manuel Felipe Rojas Yasno** - Backend dev & SCRUM Master 
* **Juan Camilo Mora Castañeda** - Frontend dev & support
* **Pablo Trujillo Artunduaga** - T-Stack dev & support
* **Equipo Devurity** - Contribuidores activos

Mentoría institucional:

* Prof. Jorge E. Martínez
* Prof. Eduardo Martínez
* Semillero Devurity — Universidad Surcolombiana

---

## Nota Final

Este repositorio no es solo code random; es un **laboratorio de formación avanzada**, y un puente entre la universidad, la industria y la comunidad de investigación.

> "De la universidad al impacto real — Devurity."

---

## ✨ Invitación

Si deseas colaborar, aprender o aportar ideas: 👉 Contáctanos vía correo o redes internas del semillero.
