import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/lib/jwt";
import { findByIdWithRole } from "@/repositories/users/users.repositories";
import logger from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    logger.debug("API /verify-role: Iniciando verificación de rol");
    // Obtener token de las cookies
    const token = request.cookies.get("auth_token")?.value;
    logger.debug("API /verify-role: Token presente:", !!token);

    if (!token) {
      logger.debug("API /verify-role: No hay token, retornando 401");
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    // Validar token
    const decoded = (await validateToken(token)) as { sub: string };
    logger.debug("API /verify-role: Token validado correctamente");

    // Obtener usuario con rol
    logger.debug("API /verify-role: Buscando usuario");
    let user;
    try {
      user = await findByIdWithRole(decoded.sub);
      logger.debug("API /verify-role: Usuario encontrado:", !!user);
    } catch (dbError) {
      logger.error("API /verify-role: Error en consulta a BD", dbError);
      return NextResponse.json(
        { error: "Error de base de datos" },
        { status: 500 },
      );
    }

    if (!user) {
      logger.debug("API /verify-role: Usuario no encontrado en BD");
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    // Verificar que el usuario tenga rol
    if (!user.roles || !user.roles.name) {
      logger.debug("API /verify-role: Usuario no tiene rol asignado");
      return NextResponse.json(
        { error: "Usuario no tiene rol asignado" },
        { status: 403 },
      );
    }

    if (!user.is_active) {
      logger.debug("API /verify-role: Usuario inactivo");
      return NextResponse.json({ error: "Cuenta inactiva" }, { status: 403 });
    }

    // Retornar información del rol
    logger.debug("API /verify-role: Verificación completada exitosamente");
    return NextResponse.json({
      success: true,
      role: user.roles.name,
      userId: user.id.toString(),
    });
  } catch (error) {
    logger.error("API /verify-role: Error verificando rol", error);

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
