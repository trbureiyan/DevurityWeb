/**
 * Módulo de redirecciones para el middleware
 * 
 * Maneja las redirecciones de rutas legacy y normalizaciones de URLs
 */

import { NextRequest, NextResponse } from "next/server";

/**
 * Mapa de redirecciones de rutas legacy a nuevas rutas
 */
export const redirectMap: Record<string, string> = {
  "/auth": "/auth/login",
  "/register": "/auth/register",
  "/login": "/auth/login",
};

/**
 * Normaliza una ruta eliminando trailing slash excepto para la raíz
 */
export function normalizePath(path: string): string {
  return path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
}

/**
 * Aplica redirecciones configuradas si la ruta coincide
 * 
 * @returns NextResponse con redirección si aplica, null si no hay redirección
 */
export function applyRedirects(request: NextRequest): NextResponse | null {
  const currentPath = request.nextUrl.pathname;
  const normalisedPath = normalizePath(currentPath);

  const redirectTarget = redirectMap[normalisedPath];
  
  if (redirectTarget) {
    const url = request.nextUrl.clone();
    url.pathname = redirectTarget;
    url.search = "";
    return NextResponse.redirect(url, 308);
  }

  return null;
}
