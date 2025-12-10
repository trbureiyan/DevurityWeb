import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/postgresDriver";

interface _QRData {
  userId: string;
  timestamp: number;
  token: string;
  expiresAt: number;
}

export async function POST(req: NextRequest) {
  try {
    console.log("[Attendances API] POST /api/admin/attendances start");
    const { qrData } = await req.json();

    console.log("[Attendances API] Body received", { hasQrData: !!qrData });

    if (!qrData) {
      return NextResponse.json(
        { error: "Datos del QR requeridos" },
        { status: 400 },
      );
    }

    // Validar que sea un objeto JSON (QR dinámico)
    if (typeof qrData !== "object" || qrData === null) {
      return NextResponse.json(
        {
          error:
            "QR inválido. Por favor, genera un nuevo código QR desde tu perfil.",
        },
        { status: 400 },
      );
    }

    // Validar estructura del QR
    if (
      !qrData.userId ||
      !qrData.timestamp ||
      !qrData.token ||
      !qrData.expiresAt
    ) {
      return NextResponse.json(
        { error: "QR inválido - faltan datos requeridos" },
        { status: 400 },
      );
    }

    // Verificar que el QR no haya expirado
    const now = Date.now();
    if (now > qrData.expiresAt) {
      return NextResponse.json(
        { error: "QR expirado. Por favor, genera uno nuevo desde tu perfil." },
        { status: 410 },
      );
    }

    const userId = BigInt(qrData.userId);

    // Verificar que el usuario existe
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        last_name: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    // Obtener fecha actual (solo fecha, sin hora)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Verificar si ya existe una asistencia para este usuario hoy
    const existingAttendance = await prisma.attendances.findFirst({
      where: {
        user_id: userId,
        attendance_date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Siguiente día
        },
      },
    });

    if (existingAttendance) {
      console.log("[Attendances API] Duplicate attendance detected", {
        userId: qrData.userId,
        existingDate: existingAttendance.attendance_date,
      });
      return NextResponse.json(
        {
          error: "Asistencia ya registrada hoy",
          fecha: existingAttendance.attendance_date.toLocaleString("es-CO"),
          usuario: `${user.name} ${user.last_name}`,
        },
        { status: 409 },
      );
    }

    // Crear nueva asistencia (solo fecha, sin hora)
    const attendanceDate = new Date();
    attendanceDate.setHours(0, 0, 0, 0);
    
    const attendance = await prisma.attendances.create({
      data: {
        attendance_date: attendanceDate,
        user_id: userId,
      },
    });

    console.log("[Attendances API] Attendance created", {
      attendanceId: attendance.id,
      userId: qrData.userId,
    });

    return NextResponse.json({
      id: attendance.id.toString(),
      usuario: {
        nombre: `${user.name} ${user.last_name}`,
        correo: user.email,
      },
      fecha: attendance.attendance_date.toLocaleString("es-CO"),
    });
  } catch (error) {
    console.error("Error al registrar asistencia:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
