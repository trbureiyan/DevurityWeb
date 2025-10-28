import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req) {
  try {
    const { correo, password } = await req.json();

    // Validar que los campos no estén vacíos
    if (!correo || !password) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 },
      );
    }

    // Buscar el usuario por correo y password
    const usuario = await prisma.usuario.findFirst({
      where: {
        correo: correo,
        password: password,
      },
      select: {
        id: true,
        nombre: true,
        correo: true,
        password: true,
        role: true,
      },
    });

    // Si no existe el usuario
    if (!usuario) {
      return NextResponse.json(
        { error: "Credenciales incorrectas" },
        { status: 401 },
      );
    }

    console.log("Usuario encontrado:", {
      id: usuario.id,
      nombre: usuario.nombre,
      role: usuario.role,
    });

    // Devolver solo datos del usuario - QR se genera dinámicamente
    return NextResponse.json({
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        role: usuario.role,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
