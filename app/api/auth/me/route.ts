import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/lib/jwt";
import { findByIdWithRole } from "@/repositories/users/users.repositories";

export async function GET(request: NextRequest) {
  try {
    console.log("API /me: Iniciando verificación de autenticación");

    // Obtener token de las cookies
    const token = request.cookies.get("auth_token")?.value;
    console.log("API /me: Token encontrado:", !!token);

    if (!token) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    // Validar token
    const decoded = (await validateToken(token)) as { sub: string };
    console.log("API /me: Token válido, user ID:", decoded.sub);

    // Obtener usuario con rol
    const user = await findByIdWithRole(decoded.sub);
    console.log("API /me: Usuario encontrado:", !!user);

    if (!user) {
      console.log("API /me: Usuario no encontrado en BD");
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    if (!user.is_active) {
      console.log("API /me: Usuario inactivo");
      return NextResponse.json({ error: "Cuenta inactiva" }, { status: 403 });
    }

    // Retornar información del usuario
    console.log("API /me: Retornando datos del usuario:", user.email);
    return NextResponse.json({
      user: {
        id: user.id.toString(),
        email: user.email,
        name: user.name,
        lastName: user.last_name,
        role: user.roles.name,
        isActive: user.is_active,
      },
    });
  } catch (error) {
    console.error("API /me: Error obteniendo datos del usuario:", error);

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
