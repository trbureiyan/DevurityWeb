import { verifyJwtPayload } from "./jwt-edge";
import { NextRequest, NextResponse } from "next/server";

//Extraer token de las cookies
export function extractTokenFromCookies(request: NextRequest): string | null {
  return request.cookies.get("auth_token")?.value || null;
}

//Validar token y extraer datos (Edge-compatible, usa Web Crypto API)
/**
 * Valida un JWT y extrae el subject (ID de usuario) y el rol opcional.
 *
 * @param token JWT firmado con HS256 (de cookie auth_token).
 * @returns Objeto con `sub` obligatorio y `role` opcional.
 * @throws Error si el token no contiene el claim `sub`.
 */
export async function validateAuthToken(
  token: string,
): Promise<{ sub: string; role?: string }> {
  const decoded = await verifyJwtPayload(token);

  if (!decoded?.sub) {
    throw new Error("Token inválido: falta subject");
  }

  return { sub: decoded.sub, role: decoded.role };
}

//Crear respuesta de error para APIs
export function createApiErrorResponse(
  message: string,
  status: number = 401,
): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// Crear redirección a login
export function createLoginRedirect(request: NextRequest): NextResponse {
  const loginUrl = new URL("/auth/login", request.url);
  const response = NextResponse.redirect(loginUrl);

  return response;
}
