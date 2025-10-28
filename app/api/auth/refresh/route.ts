import { NextRequest, NextResponse } from "next/server";
import { validateToken, generateToken } from "@/lib/jwt";
import { findByIdWithRole } from "@/repositories/users/users.repositories";

export async function POST(request: NextRequest) {
  try {
    // Obtener token actual de las cookies
    const currentToken = request.cookies.get("auth_token")?.value;

    if (!currentToken) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    // Validar token actual
    let decoded;
    try {
      decoded = (await validateToken(currentToken)) as { sub: string };
    } catch (error) {
      // Token inválido o expirado
      return NextResponse.json(
        { error: "Token inválido o expirado" },
        { status: 401 },
      );
    }

    // Verificar que el usuario aún existe y está activo
    const user = await findByIdWithRole(decoded.sub);

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    if (!user.is_active) {
      return NextResponse.json({ error: "Cuenta inactiva" }, { status: 403 });
    }

    // Generar nuevo token con los mismos datos
    const newTokenPayload = {
      sub: user.id.toString(),
    };

    const newToken = await generateToken(newTokenPayload, 4 * 60 * 60); // 4 horas

    // Crear nueva cookie
    const newCookie = `auth_token=${newToken}; HttpOnly; Path=/; SameSite=Strict; Max-Age=14400${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`;

    return NextResponse.json(
      {
        success: true,
        message: "Token renovado exitosamente",
        user: {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          lastName: user.last_name,
          role: user.roles.name,
          isActive: user.is_active,
        },
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": newCookie,
        },
      },
    );
  } catch (error) {
    console.error("Error en refresh:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
