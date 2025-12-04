/**
 * Módulo de autorización para el middleware
 * 
 * Maneja la verificación de roles y permisos de usuarios
 */

import { NextRequest, NextResponse } from "next/server";
import logger from "@/lib/logger";
import { denyAccess } from "./security";

/**
 * Verifica si el usuario autenticado tiene permisos de administrador
 * 
 * SEGURIDAD: Implementa fail-secure - si hay error, se deniega el acceso
 * 
 * @returns NextResponse con error si no es admin o hay problema, null si es admin
 */
export async function checkUserRole(
  request: NextRequest
): Promise<NextResponse | null> {
  try {
    // Usar el endpoint simple de verificación de admin
    const adminResponse = await fetch(
      `${request.nextUrl.origin}/api/auth/is-admin`,
      {
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      }
    );

    if (!adminResponse.ok) {
      logger.error(
        `Error verificando admin: ${adminResponse.status} ${adminResponse.statusText}`
      );
      return denyAccess(request);
    }

    const adminData = await adminResponse.json();

    // Verificar que el usuario sea admin
    if (!adminData.isAdmin) {
      logger.security("Intento de acceso a zona admin sin permisos", {
        path: request.nextUrl.pathname,
        method: request.method,
      });
      return denyAccess(request);
    }

    logger.debug("Verificación de admin exitosa");
    return null;
  } catch (error) {
    logger.error("Error verificando si es admin", error);
    
    // SEGURIDAD: En caso de error, DENEGAR acceso por defecto (fail-secure)
    // Es preferible bloquear temporalmente a un admin legítimo que permitir acceso no autorizado
    logger.security("Acceso denegado por error en verificación de admin", {
      path: request.nextUrl.pathname,
    });
    
    return denyAccess(request);
  }
}

/**
 * Verifica si la ruta actual requiere permisos de admin
 */
export function requiresAdminRole(path: string): boolean {
  return path.startsWith("/admin");
}
