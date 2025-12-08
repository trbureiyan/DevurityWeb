import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/lib/jwt";
import { findByIdWithRole } from "@/repositories/users/users.repositories";
import logger from "@/lib/logger";

export async function GET(request: NextRequest) {
  try {
    logger.debug("API /me: Iniciando verificación de autenticación");

    // Obtener token de las cookies
    const token = request.cookies.get("auth_token")?.value;
    logger.debug("API /me: Token presente:", !!token);

    if (!token) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    // Validar token
    const decoded = (await validateToken(token)) as { sub: string };
    logger.debug("API /me: Token validado correctamente");

    // Obtener usuario con rol
    const user = await findByIdWithRole(decoded.sub);
    logger.debug("API /me: Usuario encontrado:", !!user);

    if (!user) {
      logger.debug("API /me: Usuario no encontrado en BD");
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    if (!user.is_active) {
      logger.debug("API /me: Usuario inactivo");
      return NextResponse.json({ error: "Cuenta inactiva" }, { status: 403 });
    }

    // Retornar información del usuario
    logger.debug("API /me: Retornando datos del usuario");
    return NextResponse.json({
      user: {
        id: user.id.toString(),
        email: user.email,
        name: user.name,
        last_name: user.last_name,
        role: user.roles.name,
        is_active: user.is_active,
      },
    });
  } catch (error) {
    logger.error("API /me: Error obteniendo datos del usuario", error);

    if (error instanceof Error) {
      if (
        error.message.includes("invalid signature") ||
        error.message.includes("jwt expired") ||
        error.message.includes("jwt malformed")
      ) {
        return NextResponse.json(
          { error: "Token inválido o expirado" },
          { status: 401 },
        );
      }
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
