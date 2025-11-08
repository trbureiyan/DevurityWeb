import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/lib/jwt";
import { findByIdWithRole } from "@/repositories/users/users.repositories";
export async function POST(request: NextRequest) {
  try {
    console.log("API /verify-role: Iniciando verificación de rol");
    // Obtener token de las cookies
    const token = request.cookies.get("auth_token")?.value;
    console.log("API /verify-role: Token encontrado:", !!token);

    if (!token) {
      console.log("API /verify-role: No hay token, retornando 401");
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    // Validar token
    const decoded = (await validateToken(token)) as { sub: string };
    console.log("API /verify-role: Token válido, user ID:", decoded.sub);

    // Obtener usuario con rol
    console.log("API /verify-role: Buscando usuario con ID:", decoded.sub);
    let user;
    try {
      user = await findByIdWithRole(decoded.sub);
      console.log("API /verify-role: Usuario encontrado:", !!user);
    } catch (dbError) {
      console.error("API /verify-role: Error en consulta a BD:", dbError);
      return NextResponse.json(
        { error: "Error de base de datos" },
        { status: 500 },
      );
    }

    if (!user) {
      console.log("API /verify-role: Usuario no encontrado en BD");
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    // Verificar que el usuario tenga rol
    if (!user.roles || !user.roles.name) {
      console.log("API /verify-role: Usuario no tiene rol asignado");
      return NextResponse.json(
        { error: "Usuario no tiene rol asignado" },
        { status: 403 },
      );
    }

    if (!user.is_active) {
      console.log("API /verify-role: Usuario inactivo");
      return NextResponse.json({ error: "Cuenta inactiva" }, { status: 403 });
    }

    // Retornar información del rol
    console.log("API /verify-role: Rol del usuario:", user.roles.name);
    return NextResponse.json({
      success: true,
      role: user.roles.name,
      userId: user.id.toString(),
    });
  } catch (error) {
    console.error("API /verify-role: Error verificando rol:", error);

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
