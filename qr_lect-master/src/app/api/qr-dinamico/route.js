import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import QRCode from "qrcode";

// Tiempo de expiración del QR en minutos (configurable)
const QR_EXPIRATION_MINUTES = 2;

export async function POST(req) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "ID de usuario requerido" },
        { status: 400 },
      );
    }

    // Verificar que el usuario existe
    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(userId) },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    // Generar timestamp actual y de expiración
    const timestamp = Date.now();
    const expirationTime = timestamp + QR_EXPIRATION_MINUTES * 60 * 1000;

    // Crear un token simple usando Math.random
    const token =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    // Datos que irán en el QR: userId + timestamp + token
    const qrData = JSON.stringify({
      userId: usuario.id,
      timestamp: timestamp,
      token: token,
      expiresAt: expirationTime,
    });

    // Generar QR con los datos dinámicos
    const qrImage = await QRCode.toDataURL(qrData);

    return NextResponse.json({
      qr: qrImage,
      expiresAt: expirationTime,
      userId: usuario.id,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        role: usuario.role,
      },
    });
  } catch (error) {
    console.error("Error al generar QR dinámico:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
