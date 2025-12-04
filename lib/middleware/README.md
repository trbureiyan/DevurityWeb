# Arquitectura del Proxy Middleware

## Estructura Refactorizada

La lógica del middleware ha sido modularizada en componentes especializados para mejorar la mantenibilidad, testabilidad y separación de responsabilidades.

```
proxy.ts                      # Punto de entrada del middleware (Next.js 15+)
lib/
  middleware/
    ├── index.ts              # Barrel export de todos los módulos
    ├── security.ts           # Protección contra path traversal y archivos sensibles
    ├── redirects.ts          # Manejo de redirecciones de rutas legacy
    ├── authorization.ts      # Verificación de roles y permisos
    └── csrf-protection.ts    # Validación de tokens CSRF
```

## Flujo de Ejecución

El `proxy.ts` ejecuta las validaciones en el siguiente orden:

1. **Redirecciones** (`redirects.ts`)
   - Normalización de URLs
   - Redirección de rutas legacy

2. **Seguridad de Path** (`security.ts`)
   - Detección de path traversal (`..`, `%2e%2e`)
   - Bloqueo de acceso a archivos sensibles (`.env`, `.git`, etc.)
   - Verificación de autenticación para rutas protegidas

3. **Autorización** (`authorization.ts`)
   - Verificación de roles de admin
   - Control de acceso basado en roles (RBAC)
   - Implementa fail-secure: deniega acceso en caso de error

4. **Protección CSRF** (`csrf-protection.ts`)
   - Validación de tokens CSRF para operaciones POST/PUT/DELETE/PATCH
   - Exclusión de rutas públicas de autenticación
   - Comparación timing-safe de tokens

5. **Middleware de Autenticación** (`lib/auth/middleware.ts`)
   - Validación final de JWT
   - Gestión de sesiones

## Módulos Backend

### `security.ts`

Proporciona funciones para:
- `isProtectedPath()`: Verifica si una ruta requiere autenticación
- `validatePathSecurity()`: Detecta path traversal y archivos sensibles
- `checkAuthenticationRequired()`: Redirige a login si no hay token
- `denyAccess()`: Genera respuestas de acceso denegado

### `redirects.ts`

Maneja:
- `redirectMap`: Mapeo de rutas legacy
- `normalizePath()`: Normalización de URLs
- `applyRedirects()`: Aplicación de redirecciones configuradas

### `authorization.ts`

Controla:
- `checkUserRole()`: Verifica permisos de admin mediante API
- `requiresAdminRole()`: Determina si una ruta necesita rol admin
- Implementa patrón **fail-secure** para errores

### `csrf-protection.ts`

Valida:
- Tokens CSRF en headers y cookies
- Exclusión de rutas públicas
- Usa comparación timing-safe para prevenir timing attacks

## Ventajas de la Refactorización

### ✅ Mantenibilidad
- Código modular y organizado por responsabilidad
- Fácil de entender y modificar
- Separación clara entre lógica de negocio

### ✅ Testabilidad
- Funciones puras fáciles de testear
- Mocking simplificado para pruebas unitarias
- Cada módulo puede testearse independientemente

### ✅ Reutilización
- Módulos pueden usarse en otros contextos
- Funciones exportadas disponibles para otros componentes
- Lógica centralizada evita duplicación

### ✅ Seguridad
- Implementación de fail-secure en autorización
- CSRF protection con timing-safe comparison
- Logging seguro sin exponer datos sensibles
- Path traversal prevention

### ✅ Escalabilidad
- Fácil agregar nuevas validaciones
- Módulos independientes pueden evolucionar sin afectar otros
- Estructura clara para futuros desarrolladores

## Migración desde middleware.ts

El archivo `middleware.ts` antiguo ha sido:
1. ✅ Refactorizado en módulos especializados
2. ✅ Movido a `proxy.ts` (Next.js 15+ compatible)
3. ✅ Mejorado con logging seguro
4. ✅ Documentado con comentarios explicativos

## Uso y Configuración

### Agregar Nueva Ruta Protegida

Editar `lib/middleware/security.ts`:

```typescript
const protectedPaths = [
  "/admin", 
  "/profile", 
  "/attendance",
  "/nueva-ruta", // Agregar aquí
];
```

### Agregar Redirección Legacy

Editar `lib/middleware/redirects.ts`:

```typescript
export const redirectMap: Record<string, string> = {
  "/old-path": "/new-path",
  // Agregar nuevas redirecciones aquí
};
```

### Excluir Ruta de CSRF

Editar `lib/middleware/csrf-protection.ts`:

```typescript
const publicPaths = [
  "/api/auth/login",
  "/api/nueva-ruta-publica", // Agregar aquí
];
```

## Testing

Cada módulo puede testearse independientemente:

```typescript
import { validatePathSecurity } from '@/lib/middleware/security';

describe('Security Module', () => {
  it('should block path traversal attempts', () => {
    const request = createMockRequest('/../../etc/passwd');
    const response = validatePathSecurity(request);
    expect(response?.status).toBe(404);
  });
});
```

## Logging

Todos los módulos usan el sistema de logging seguro (`lib/logger.ts`):
- `logger.debug()`: Solo en desarrollo
- `logger.security()`: Eventos de seguridad sin datos sensibles
- `logger.error()`: Errores sanitizados en producción

## Mejoras Futuras

- [ ] Rate limiting por IP
- [ ] Cache de verificaciones de roles
- [ ] Métricas de performance
- [ ] Tests unitarios completos
- [ ] Tests de integración
- [ ] Documentación de API
