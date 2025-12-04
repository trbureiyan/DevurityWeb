/**
 * Proxy Middleware - Next.js 15+ Compatible
 * 
 * Este archivo actúa como punto de entrada para el middleware de Next.js
 * y delega la lógica de negocio a módulos especializados en lib/middleware/
 * 
 * SEGURIDAD: Implementa múltiples capas de protección:
 * - Path traversal prevention
 * - CSRF protection
 * - Role-based access control
 * - Authentication verification
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authMiddleware } from "./lib/auth/middleware";
import {
  applyRedirects,
  validatePathSecurity,
  checkAuthenticationRequired,
  requiresAdminRole,
  checkUserRole,
  verifyCsrf,
} from "./lib/middleware";
import logger from "@/lib/logger";

/**
 * Función principal del proxy middleware
 * 
 * Orden de ejecución:
 * 1. Redirecciones de rutas legacy
 * 2. Validación de seguridad de path
 * 3. Verificación de autenticación para rutas protegidas
 * 4. Verificación de roles de admin
 * 5. Validación de CSRF para operaciones que modifican datos
 * 6. Middleware de autenticación final
 */
export async function proxy(
  request: NextRequest,
): Promise<NextResponse | Response> {
  const currentPath = request.nextUrl.pathname;
  const token = request.cookies.get("auth_token")?.value;

  logger.debug(`Proxy middleware: ${request.method} ${currentPath}`);

  // 1. Aplicar redirecciones de rutas legacy
  const redirectResponse = applyRedirects(request);
  if (redirectResponse) {
    logger.debug(`Redirigiendo: ${currentPath} -> ${redirectResponse.headers.get("location")}`);
    return redirectResponse;
  }

  // 2. Validar seguridad del path (path traversal, archivos sensibles)
  const pathSecurityResponse = validatePathSecurity(request);
  if (pathSecurityResponse) {
    logger.security("Intento de acceso bloqueado por seguridad de path", {
      path: currentPath,
      method: request.method,
    });
    return pathSecurityResponse;
  }

  // 3. Verificar autenticación para rutas protegidas
  const authRequiredResponse = checkAuthenticationRequired(request, token);
  if (authRequiredResponse) {
    logger.debug(`Redirigiendo a login - ruta protegida sin autenticación: ${currentPath}`);
    return authRequiredResponse;
  }

  // 4. Verificar roles de admin para rutas administrativas
  if (requiresAdminRole(currentPath)) {
    const roleCheckResponse = await checkUserRole(request);
    if (roleCheckResponse) {
      return roleCheckResponse;
    }
  }

  // 5. Validar CSRF para requests que lo requieren
  const csrfResponse = await verifyCsrf(request);
  if (csrfResponse) {
    return csrfResponse;
  }

  // 6. Ejecutar middleware de autenticación final
  return await authMiddleware(request);
}

/**
 * Configuración del matcher para el proxy middleware
 * 
 * Excluye archivos estáticos y recursos que no requieren procesamiento
 */
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)",
  ],
};

