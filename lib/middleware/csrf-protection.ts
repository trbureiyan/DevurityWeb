/**
 * Módulo de protección CSRF para el middleware
 * 
 * Valida tokens CSRF en requests que modifican datos
 */

import { NextRequest, NextResponse } from "next/server";
import { csrfAdapter } from "@/lib/csrf";
import logger from "@/lib/logger";

/**
 * Rutas públicas que no requieren protección CSRF
 * NOTA: Solo rutas de autenticación inicial están exentas
 */
const publicPaths = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/logout",
  "/api/auth/refresh",
  "/api/auth/is-admin",
  "/api/qr-dinamico",
  "/api/asistencia",
  // SEGURIDAD: Rutas admin requieren CSRF - no están en esta lista
];

/**
 * Verifica si una ruta está exenta de protección CSRF
 */
function isPublicPath(path: string): boolean {
  return publicPaths.some((publicPath) => path.startsWith(publicPath));
}

/**
 * Valida el token CSRF para requests que lo requieren
 * 
 * @returns NextResponse con error si falla validación, null si está ok
 */
export async function verifyCsrf(
  request: NextRequest
): Promise<NextResponse | null> {
  const method = request.method;
  const path = request.nextUrl.pathname;

  // Solo verificar CSRF para métodos que modifican datos
  if (!csrfAdapter.requiresCsrfProtection(method)) {
    return null;
  }

  // Excluir rutas públicas que no necesitan CSRF
  if (isPublicPath(path)) {
    return null;
  }

  // Obtener tokens
  const csrfTokenFromHeader = request.headers.get("x-csrf-token");
  const csrfTokenFromCookie = request.cookies.get("csrf_token")?.value;

  // Verificar que ambos tokens existan
  if (!csrfTokenFromHeader || !csrfTokenFromCookie) {
    logger.security("Token CSRF faltante", {
      path,
      method,
      hasHeader: !!csrfTokenFromHeader,
      hasCookie: !!csrfTokenFromCookie,
    });

    return NextResponse.json(
      { error: "Token CSRF requerido" },
      { status: 403 }
    );
  }

  // Validar que los tokens coincidan
  if (!csrfAdapter.validateToken(csrfTokenFromHeader, csrfTokenFromCookie)) {
    logger.security("Token CSRF inválido", {
      path,
      method,
    });

    return NextResponse.json(
      { error: "Token CSRF inválido" },
      { status: 403 }
    );
  }

  logger.debug("Token CSRF validado exitosamente");
  return null;
}
