import { validateToken } from "../jwt";
import { NextRequest, NextResponse } from "next/server";

//Extraer token de las cookies
export function extractTokenFromCookies(request: NextRequest): string | null {
  return request.cookies.get("auth_token")?.value || null;
}

//Validar token y extraer datos
export async function validateAuthToken(
  token: string,
): Promise<{ sub: string; username?: string }> {
  const decoded = (await validateToken(token)) as { sub: string; username?: string };

  if (!decoded.sub) {
    throw new Error("Token inválido: falta subject");
  }

  return decoded;
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
  const loginUrl = new URL("/login", request.url);
  const response = NextResponse.redirect(loginUrl);

  // Eliminar cookie inválida
  response.cookies.delete("auth_token");

  return response;
}
