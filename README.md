<p align="center">
  <code>$ ./devurity --serve</code>
</p>

<h3 align="center">DevurityWeb</h3>

<p align="center">
  Plataforma web del Semillero de Ciberseguridad e Ingeniería Devurity<br/>
  Universidad Surcolombiana, Colombia.
</p>

<p align="center">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-GPL--3.0-blue" alt="Licencia"></a>
  <img src="https://img.shields.io/badge/status-active-brightgreen" alt="Estado">
  <img src="https://img.shields.io/badge/Next.js-15-black" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-strict-blue" alt="TypeScript">
</p>

---

## ¶ Qué es

DevurityWeb es la plataforma web de Devurity, semillero de investigación en ciberseguridad e ingeniería de la Universidad Surcolombiana. Cubre dos frentes desde una misma base de código: la cara pública, que comunica quién es el semillero y qué construye, y la operación interna, que gestiona membresías, asistencia, proyectos y contenido.

Nació para resolver un problema concreto, el semillero coordinaba todo por hojas de cálculo y WhatsApp, sin presencia digital propia. Llegó a producción, tras meses de desarrollo y más de 130 pull requests.

---

## ⬡ Qué hace

**Público. cualquier visitante:**

```
├── landing institucional: misión, equipo, eventos
├── perfiles públicos de miembros en /@usuario, con habilidades y enlaces sociales
├── catálogo de proyectos del semillero, con página propia por proyecto
├── noticias y eventos vía sistema de gestión de contenido
├── galería de imágenes
└── registro con validación de correo institucional (@usco.edu.co)
```

**Semillero. miembros autenticados y administradores:**

```
├── control de acceso por rol: administrador, gestor de contenido, líder de proyecto, miembro
├── panel administrativo: usuarios, roles, aprobación de registros
├── gestión, trazabilidad y seguimiento de proyectos: estado, hitos, equipo asignado
├── asistencias por código QR dinámico: genera, escanea, registra
├── gestión de contenido: noticias, eventos, destacados
├── edición de perfil: habilidades, plataformas, biografía
└── recuperación de contraseña por correo, con token de un solo uso
```

**Bajo el capó** `>_`

```
├── JWT con verificación de firma criptográfica en el edge
├── CSRF mediante patrón de doble token en cada mutación
├── rate limiting en intentos de login
├── patrón Repository entre lógica de negocio y acceso a datos
├── ISR en páginas públicas
└── middleware que aplica RBAC antes de que la solicitud llegue a la página
```

---

## ⬡ Cómo está construido

| Capa | Elección |
|---|---|
| Framework | Next.js 15, App Router, React 19 |
| Lenguaje | TypeScript (modo estricto) |
| Base de datos | PostgreSQL |
| ORM | Prisma |
| Estilos | Tailwind CSS v4 |
| Auth | JWT propio + CSRF + RBAC |
| Despliegue | Vercel (serverless, edge middleware) |
| Gestor de paquetes | pnpm |

Un stack bien pensado. SSR para un SEO vital. App Router sin necesidad de un backend separado. Prisma ofrece acceso tipado a la base de datos sin escribir SQL a mano. Vercel permitió desplegar a producción con un sano mantenimiento.

---

## ⬡ Primeros pasos

```bash
git clone https://github.com/trbureiyan/DevurityWeb
cd DevurityWeb
corepack enable
pnpm install
cp .env.example .env
pnpm exec prisma db push
pnpm run dev
```

Requiere Node 18+, pnpm y una instancia de PostgreSQL. El proyecto usa pnpm con lockfile versionado para builds deterministas; npm no es compatible.

> [!NOTE]
> Si vienes de una configuración con npm, ejecuta `node scripts/migrate.mjs` para limpiar artefactos antiguos y sincronizar con pnpm.

---

## ⬡ Estructura del proyecto

```
app/                  Rutas (App Router)
  (public)/           Páginas públicas: landing, sobre nosotros, galería, auth, proyectos
  (protected)/        Páginas autenticadas: perfil, panel de administración
  api/                Manejadores de rutas (API)
components/           UI reutilizable
  landing/            Secciones de la landing page
  admin/              Componentes del panel de administración
  ui/                 Primitivas base
lib/                  Lógica de negocio, configuración de auth, utilidades
repositories/         Capa de acceso a datos (Prisma)
prisma/               Esquema, migraciones, datos semilla
middleware.ts         Autenticación, RBAC, seguridad
```

La base de código sigue una arquitectura en capas: los componentes consumen repositorios, los repositorios hablan con Prisma, Prisma habla con Postgres. Middleware intercepta cada solicitud antes de que llegue a la página.

```
  req ─→ middleware ─→ route ─→ component ─→ repository ─→ prisma ─→ pg
```

---

## ⬡ Contribución

Abierto a miembros del semillero y colaboradores externos autorizados.

1. Rama nueva desde `dev`
2. Changes
3. Pull request con descripción clara
4. Si aplica, actualiza `/docs`

Convenciones: conventional commits, ESLint + TypeScript estricto, pruebas donde tengan sentido. Ejecuta `pnpm run build` antes de subir cambios.

---

## ⬡ El equipo

- **[Brayan Toro Bustos](https://github.com/trbureiyan)**
- **[Alexander Lozada Caviedes](https://github.com/Arekkazu)**
- **Manuel Felipe Rojas Yasno**
- **[Juan Camilo Mora Castañeda](https://github.com/JucaMora7)**

---

## ⬡ Licencia

[GNU GPL-3.0](./LICENSE). El proyecto pertenece a la comunidad Devurity: úsalo, modifícalo, y mantenlo abierto.

<p align="center">╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌</p>