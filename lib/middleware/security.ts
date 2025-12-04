/**
 * Módulo de seguridad para el middleware
 * 
 * Maneja la protección contra:
 * - Path traversal attacks
 * - Acceso a archivos sensibles
 * - Rutas protegidas sin autenticación
 */

import { NextRequest, NextResponse } from "next/server";

/**
 * Fragmentos prohibidos en rutas para prevenir acceso a archivos sensibles
 */
export const forbiddenFragments = [
  ".env",
  ".git",
  "package.json",
  "tsconfig",
  "next.config",
];

/**
 * Rutas que requieren autenticación
 */
const protectedPaths = ["/admin", "/profile", "/attendance"];

/**
 * Verifica si una ruta está protegida y requiere autenticación
 */
export function isProtectedPath(path: string): boolean {
  return protectedPaths.some((protectedPath) => path.startsWith(protectedPath));
}

/**
 * Valida que la ruta no contenga intentos de path traversal o acceso a archivos sensibles
 * 
 * @returns NextResponse con error si la ruta es inválida, null si es válida
 */
export function validatePathSecurity(
  request: NextRequest
): NextResponse | null {
  const currentPath = request.nextUrl.pathname;
  const lowerPath = currentPath.toLowerCase();

  // Detectar path traversal
  const hasTraversal = lowerPath.includes("..") || lowerPath.includes("%2e%2e");
  
  // Detectar acceso a archivos sensibles
  const touchesForbidden = forbiddenFragments.some((fragment) =>
    lowerPath.includes(fragment)
  );

  if (hasTraversal || touchesForbidden) {
    // Para rutas de API, retornar JSON
    if (currentPath.startsWith("/api")) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Para rutas de páginas, redirigir a not-found
    if (currentPath !== "/not-found") {
      const notFoundUrl = request.nextUrl.clone();
      notFoundUrl.pathname = "/not-found";
      notFoundUrl.search = "";
      return NextResponse.redirect(notFoundUrl, 308);
    }

    return NextResponse.rewrite(request.nextUrl);
  }

  return null;
}

/**
 * Verifica si un usuario tiene autenticación para rutas protegidas
 * 
 * @returns NextResponse con redirección a login si no está autenticado, null si está ok
 */
export function checkAuthenticationRequired(
  request: NextRequest,
  token: string | undefined
): NextResponse | null {
  const currentPath = request.nextUrl.pathname;

  // Si no hay token y es ruta protegida, redirigir a login
  if (!token && isProtectedPath(currentPath)) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return null;
}

/**
 * Genera una respuesta de acceso denegado
 */
export function denyAccess(request: NextRequest): NextResponse {
  if (request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.json(
      {
        error: "403 - Acceso restringido.",
      },
      { status: 403 }
    );
  } else {
    return NextResponse.redirect(new URL("/access-denied", request.url));
  }
}
