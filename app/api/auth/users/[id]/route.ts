import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/lib/jwt";
import { findByIdWithSkills } from "@/repositories/users/users.repositories";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
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
    const decoded = (await validateToken(token)) as { sub: string };

    // Verificar que el usuario autenticado está accediendo a su propio perfil
    if (decoded.sub !== id) {
      return NextResponse.json(
        { error: "No autorizado para acceder a este perfil" },
        { status: 403 },
      );
    }

    // Obtener usuario con skills
    const user = await findByIdWithSkills(id);

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    if (!user.is_active) {
      return NextResponse.json({ error: "Cuenta inactiva" }, { status: 403 });
    }

    // Extraer skills del usuario
    const skills = user.user_skills
      .map((userSkill) => userSkill.skills?.name)
      .filter((name): name is string => name !== undefined && name !== null);

    return NextResponse.json({
      user: {
        id: user.id.toString(),
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        skills: skills,
        role: user.roles.name,
        motivation: user.motivation,
        semester: user.semester,
      },
    });
  } catch (error) {
    console.error("Error obteniendo datos del usuario:", error);

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
