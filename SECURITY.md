# Política de seguridad

## Versiones con soporte

Solo la rama `main` (desplegada en producción en Vercel) recibe correcciones de seguridad activas. Las correcciones se aplican directamente sobre `main` vía `hotfix/` y se retropropagan a `dev`.

| Rama | Soporte de seguridad |
|---|---|
| `main` | Activo |
| `dev` | Recibe backport de hotfixes críticos |
| Ramas de feature | Sin soporte |

## Reporte de vulnerabilidades

DevurityWeb gestiona autenticación con JWT propio, protección CSRF con doble token, control de acceso por roles (RBAC) y registros de asistencia vinculados a usuarios institucionales. Los problemas en estas áreas tienen impacto real sobre personas.

**No abras un issue público para reportar una vulnerabilidad.** Usa el canal de divulgación privada de GitHub:

[Reportar una vulnerabilidad](https://github.com/trbureiyan/DevurityWeb/security/advisories/new)

Incluye en el reporte:

- Descripción del problema y su impacto potencial.
- Pasos para reproducirlo (versión afectada, entorno, request/response si aplica).
- Componente o archivo donde se ubica la falla.
- Si ya tienes una propuesta de mitigación, inclúyela.

### Tiempos de respuesta

| Evento | Plazo |
|---|---|
| Acuse de recibo | 72 horas |
| Evaluación inicial | 7 días |
| Corrección o plan de mitigación | 30 días (crítico) / 90 días (otros) |
| Divulgación coordinada | A convenir con el informante |

Este proyecto no ofrece recompensas económicas (bug bounty). Se reconocerá públicamente la contribución del informante en el advisory, salvo que prefiera anonimato.

## Alcance

Las siguientes áreas están dentro del alcance de la política:

- Sistema de autenticación JWT y renovación de tokens (`lib/auth/`, `app/api/auth/`)
- Protección CSRF con doble token (`hooks/useCsrf.ts`, middleware)
- RBAC y control de acceso por ruta (`middleware.ts`, endpoints protegidos)
- Sistema de asistencia QR y validación de firmas (`app/api/asistencia/`)
- Endpoints de administración y gestión de usuarios
- Validación de entrada en los límites del sistema (rutas API)

Fuera de alcance:

- Servicios de terceros (Vercel, Supabase, Resend, servicios de correo).
- Ataques que requieran acceso físico al servidor o a la base de datos.
- Ingeniería social contra miembros del equipo.
- Problemas de seguridad en dependencias de terceros no relacionados con la forma en que se usan en este proyecto — repórtalos directamente al mantenedor de la dependencia.
- Ataques de denegación de servicio volumétricos.

## Versiones de dependencias

Las dependencias se fijan con versiones exactas (sin `^` ni `~`) y se auditan con `pnpm audit` ante cada actualización. Si encuentras una vulnerabilidad en una dependencia que afecte a este proyecto de forma específica, repórtala también por el canal privado.
