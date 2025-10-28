import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import QRCode from "qrcode";

export async function POST(req) {
  try {
    const { nombre, correo, password } = await req.json();

    // Validaciones
    if (!nombre || !correo || !password) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 },
      );
    }

    // Verificar si el usuario ya existe
    const existente = await prisma.usuario.findUnique({
      where: { correo },
    });

    if (existente) {
      return NextResponse.json(
        { error: "El correo ya está registrado" },
        { status: 400 },
      );
    }

    // Crear el usuario sin QR primero
    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        correo,
        password,
      },
    });

    // No generamos QR estático - solo QR dinámicos
    // El QR se generará dinámicamente en el perfil del usuario

    // Retornar solo datos del usuario - QR se genera dinámicamente
    return NextResponse.json({
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        role: usuario.role,
      },
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
