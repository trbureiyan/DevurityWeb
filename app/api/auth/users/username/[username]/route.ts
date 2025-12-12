import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/lib/jwt";
import { findByUsername } from "@/repositories/users/users.repositories";

// Modulo API para obtener usuario por username

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> },
) {
  const { username } = await params;
  
  try {
    // Verificar autenticación
    const cookies = request.headers.get("cookie");
    if (!cookies) {
      return NextResponse.json(
        { error: "No autenticado - Sin cookies" },
        { status: 401 },
      );
    }

    const token = cookies
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { error: "No autenticado - Token no encontrado" },
        { status: 401 },
      );
    }

    // Validar token
    await validateToken(token);

    // Eliminar @ si viene en el username
    const cleanUsername = username.startsWith("@") ? username.slice(1) : username;

    // Buscar usuario por username
    const user = await findByUsername(cleanUsername);

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    if (!user.is_active) {
      return NextResponse.json({ error: "Cuenta inactiva" }, { status: 403 });
    }

    // Retornar el ID del usuario para que el frontend pueda redirigir
    return NextResponse.json({
      id: user.id.toString(),
      username: user.username,
      name: user.name,
      last_name: user.last_name,
    });
  } catch (error) {
    console.error("Error obteniendo usuario por username:", error);

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
