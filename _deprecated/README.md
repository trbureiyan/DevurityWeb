# _deprecated/

Archivos movidos aquí como **soft-delete** durante la auditoría de react-doctor (Feb 2026).

Ninguno de estos archivos tiene imports activos desde el codebase. Se preservan por si se necesitan en el futuro.

## Archivos deprecados

| Archivo original | Razón |
|---|---|
| `generate-token.js` | Script utilitario obsoleto, sin uso |
| `lib/error-handler.ts` | Reemplazado por otros patrones de manejo de errores |
| `components/ui/button.tsx` | Componente sin imports desde ningún archivo |
| `components/ui/ProfileLink.tsx` | Componente sin imports desde ningún archivo |
| `lib/constants/help.ts` | Constantes sin uso en el codebase |
| `lib/constants/roles.ts` | Constantes sin uso en el codebase |
| `lib/constants/updates.ts` | Constantes sin uso (datos ahora vienen de DB) |
| `lib/utils/profile-helpers.ts` | Utilidades sin imports desde ningún archivo |
| `public/icons/index.ts` | Barrel export muerto, sin imports |
| `repositories/projects/projects.repositories.ts` | Repositorio sin imports desde ningún archivo |

## Recuperación

Para restaurar un archivo, muévelo de vuelta a su ruta original:

```bash
# Ejemplo:
mv _deprecated/lib/error-handler.ts lib/error-handler.ts
```

O recupéralo desde el historial de Git si ya fue eliminado.
