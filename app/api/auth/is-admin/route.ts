import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/lib/jwt";
import { findByIdWithRole } from "@/repositories/users/users.repositories";

export async function GET(request: NextRequest) {
  try {
    // Obtener token de las cookies
    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ isAdmin: false }, { status: 200 });
    }

    // Validar token
    const decoded = (await validateToken(token)) as { sub: string };

    // Obtener usuario con rol
    const user = await findByIdWithRole(decoded.sub);

    if (!user || !user.is_active) {
      return NextResponse.json({ isAdmin: false }, { status: 200 });
    }

    // Verificar si es admin
    const isAdmin = user.roles.name === "admin";

    return NextResponse.json({
      isAdmin,
      userId: user.id.toString(),
    });

  } catch (error) {
    console.error("Error verificando si es admin:", error);
    return NextResponse.json({ isAdmin: false }, { status: 200 });
  }
}
