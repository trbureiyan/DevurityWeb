import { NextRequest, NextResponse } from "next/server";
import { isProtectedPath, isApiPath, shouldRedirectToLogin } from "./config";
import {
  extractTokenFromCookies,
  validateAuthToken,
  createApiErrorResponse,
  createLoginRedirect,
} from "./utils";
import logger from "../logger";

export async function authMiddleware(
  request: NextRequest,
): Promise<NextResponse | Response> {
  const path = request.nextUrl.pathname;

  //Si no es una ruta protegida, permitir acceso
  if (!isProtectedPath(path)) {
    return NextResponse.next();
  }

  //Extraer token
  const token = extractTokenFromCookies(request);

  if (!token) {
    return handleUnauthenticated(request, path);
  }

  //Validar token
  try {
    await validateAuthToken(token);
    return NextResponse.next();
  } catch (error) {
    return handleInvalidToken(request, path, error);
  }
}

//Manejar usuario no autenticado
function handleUnauthenticated(
  request: NextRequest,
  path: string,
): NextResponse | Response {
  if (isApiPath(path)) {
    return createApiErrorResponse("No autenticado");
  }

  if (shouldRedirectToLogin(path)) {
    return createLoginRedirect(request);
  }

  return NextResponse.next();
}

//Manejar token inválido
function handleInvalidToken(
  request: NextRequest,
  path: string,
  error: unknown,
): NextResponse | Response {
  logger.error("Error de autenticación:", { error, path });

  if (isApiPath(path)) {
    return createApiErrorResponse("Token inválido o expirado");
  }

  if (shouldRedirectToLogin(path)) {
    return createLoginRedirect(request);
  }

  return NextResponse.next();
}
