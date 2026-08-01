import { NextRequest, NextResponse } from "next/server";
import { extractTokenFromCookies } from "@/lib/auth/utils";
import { verifyJwtPayload } from "@/lib/auth/jwt-edge";
import { getAttendancesPaginated } from "@/repositories/admin/attendances.repositories";
import prisma from "@/lib/postgresDriver";
import { csrfAdapter } from "@/lib/csrf";
import { createHmac, timingSafeEqual } from "node:crypto";

export async function GET(request: NextRequest) {
  // autenticación y autorización antes de procesar parámetros
  const token = extractTokenFromCookies(request);
  if (!token) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }
  const decoded = await verifyJwtPayload(token);
  if (!decoded || decoded.role !== "admin") {
    return NextResponse.json({ error: "Acceso restringido" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    // radix 10 explícito; NaN, cero o negativos caen en 1
    const rawPage = parseInt(searchParams.get("page") ?? "1", 10);
    const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
    const limit = parseInt(searchParams.get("limit") ?? "20", 10);
    const dateFrom = searchParams.get("dateFrom") || undefined;
    const dateTo = searchParams.get("dateTo") || undefined;
    const search = searchParams.get("search") || undefined;
    const program = searchParams.get("program") || undefined;

    const result = await getAttendancesPaginated({
      page,
      limit: Math.max(1, Math.min(isNaN(limit) ? 20 : limit, 100)),
      dateFrom,
      dateTo,
      search,
      program,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching attendances:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

interface _QRData {
  userId: string;
  timestamp: number;
  token: string;
  expiresAt: number;
  signature: string;
}

export async function POST(req: NextRequest) {
  try {
    const authToken = extractTokenFromCookies(req);
    const decoded = authToken ? await verifyJwtPayload(authToken) : null;
    if (!decoded) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }
    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Acceso restringido" }, { status: 403 });
    }

    const csrfHeader = req.headers.get("x-csrf-token");
    const csrfCookie = req.cookies.get("csrf_token")?.value;
    if (!csrfHeader || !csrfCookie || !csrfAdapter.validateToken(csrfHeader, csrfCookie)) {
      return NextResponse.json({ error: "Token CSRF inválido" }, { status: 403 });
    }

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

    const { userId, timestamp, token, expiresAt, signature } = qrData as Partial<_QRData>;
    if (
      typeof userId !== "string" || !userId ||
      typeof timestamp !== "number" || !Number.isFinite(timestamp) ||
      typeof token !== "string" || !token ||
      typeof expiresAt !== "number" || !Number.isFinite(expiresAt) ||
      typeof signature !== "string" || !/^[0-9a-f]{64}$/i.test(signature)
    ) {
      return NextResponse.json(
        { error: "QR inválido - faltan datos requeridos o firma de seguridad" },
        { status: 400 },
      );
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return NextResponse.json({ error: "Configuración del servidor incompleta" }, { status: 500 });
    }
    const expectedSignature = createHmac("sha256", jwtSecret)
      .update(`${userId}:${timestamp}:${token}:${expiresAt}`)
      .digest("hex");
    if (!timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expectedSignature, "hex"))) {
      return NextResponse.json({ error: "QR inválido - firma no autorizada" }, { status: 400 });
    }

    // Verificar que el QR no haya expirado
    const now = Date.now();
    if (now > expiresAt) {
      return NextResponse.json(
        { error: "QR expirado. Por favor, genera uno nuevo desde tu perfil." },
        { status: 410 },
      );
    }

    let numericUserId: bigint;
    try {
      numericUserId = BigInt(userId);
    } catch {
      return NextResponse.json({ error: "QR inválido - identificador de usuario" }, { status: 400 });
    }

    // Verificar que el usuario existe
    const user = await prisma.users.findUnique({
      where: { id: numericUserId },
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
         user_id: numericUserId,
        attendance_date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Siguiente día
        },
      },
    });

    if (existingAttendance) {
      console.log("[Attendances API] Duplicate attendance detected", {
        userId,
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
        user_id: numericUserId,
      },
    });

    console.log("[Attendances API] Attendance created", {
      attendanceId: attendance.id,
      userId,
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
