import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/postgresDriver";
import { csrfAdapter } from "@/lib/csrf";

/**
 * Registra asistencia mediante escaneo de QR.
 *
 * Valida CSRF, verifica firma criptográfica del QR, confirma que el usuario
 * existe y que no haya registrado asistencia hoy, y crea el registro.
 *
 * @param request - NextRequest con JSON body: { qrData: { userId, timestamp, token, expiresAt, signature } }.
 * @returns 200 con datos de la asistencia registrada.
 * @returns 400 si el QR es inválido, faltan campos, o la firma no coincide.
 * @returns 403 si el token CSRF falta o es inválido.
 * @returns 404 si el usuario no existe.
 * @returns 409 si ya existe asistencia hoy.
 * @returns 500 si hay un error interno del servidor.
 */
export async function POST(request: NextRequest) {
  try {
    const csrfTokenFromHeader = request.headers.get("x-csrf-token");
    const csrfTokenFromCookie = request.cookies.get("csrf_token")?.value;

    if (!csrfTokenFromHeader || !csrfTokenFromCookie) {
      return NextResponse.json(
        { error: "Token CSRF requerido" },
        { status: 403 }
      );
    }

    if (!csrfAdapter.validateToken(csrfTokenFromHeader, csrfTokenFromCookie)) {
      return NextResponse.json(
        { error: "Token CSRF inválido" },
        { status: 403 }
      );
    }

    const { qrData } = await request.json();

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

    // Validar que tenga los campos requeridos
    if (
      !qrData.userId ||
      !qrData.timestamp ||
      !qrData.token ||
      !qrData.expiresAt ||
      !qrData.signature
    ) {
      return NextResponse.json(
        { error: "QR inválido - faltan datos requeridos o firma de seguridad" },
        { status: 400 },
      );
    }

    // Verificar firma criptográfica del QR para evitar alteraciones o falsificaciones
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return NextResponse.json({ error: "Configuración del servidor incompleta" }, { status: 500 });
    }
    const cryptoMod = await import("crypto");
    const expectedSignature = cryptoMod.default
      .createHmac("sha256", jwtSecret)
      .update(`${qrData.userId}:${qrData.timestamp}:${qrData.token}:${qrData.expiresAt}`)
      .digest("hex");

    // Comparación de tiempo constante para evitar timing attacks
    if (typeof qrData.signature !== "string") {
      return NextResponse.json(
        { error: "QR inválido - firma corrupta o no autorizada" },
        { status: 400 },
      );
    }
    const sigBuffer = Buffer.from(qrData.signature, "hex");
    const expectedBuffer = Buffer.from(expectedSignature, "hex");
    if (sigBuffer.length !== expectedBuffer.length || !cryptoMod.default.timingSafeEqual(sigBuffer, expectedBuffer)) {
      return NextResponse.json(
        { error: "QR inválido - firma corrupta o no autorizada" },
        { status: 400 },
      );
    }

    // Verificar que el QR no haya expirado
    const now = Date.now();
    if (now > qrData.expiresAt) {
      return NextResponse.json(
        { error: "QR expirado. Por favor, genera uno nuevo desde tu perfil." },
        { status: 410 }, // 410 Gone - recurso ya no disponible
      );
    }

    const userId = qrData.userId;

    // Verificar que el usuario existe
    const usuario = await prisma.users.findUnique({
      where: { id: BigInt(userId) },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    // Obtener fecha actual (inicio y fin del día en hora local)
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const mañana = new Date(hoy);
    mañana.setDate(mañana.getDate() + 1);

    // Verificar si ya existe un registro de asistencia hoy
    const asistenciaExistente = await prisma.attendances.findFirst({
      where: {
        user_id: BigInt(userId),
        attendance_date: {
          gte: hoy,
          lt: mañana,
        },
      },
      include: {
        users: true,
      },
    });

    if (asistenciaExistente) {
      const horaRegistro =
        asistenciaExistente.attendance_date.toLocaleTimeString("es-CO", {
          hour: "2-digit",
          minute: "2-digit",
        });

      return NextResponse.json(
        {
          error: `${usuario.name} ya registró asistencia hoy`,
          mensaje: `Registrado a las ${horaRegistro}`,
          usuario: usuario,
          asistencia: asistenciaExistente,
        },
        { status: 409 },
      );
    }

    // Crear nueva asistencia
    const nuevaAsistencia = await prisma.attendances.create({
      data: {
        user_id: BigInt(userId),
        attendance_date: new Date(),
      },
      include: {
        users: true,
      },
    });

    return NextResponse.json({
      message: "Asistencia registrada exitosamente",
      id: nuevaAsistencia.id.toString(),
      usuario: {
        id: nuevaAsistencia.users?.id.toString(),
        nombre: nuevaAsistencia.users?.name,
        email: nuevaAsistencia.users?.email,
      },
      fecha: nuevaAsistencia.attendance_date,
    });
  } catch (error) {
    console.error("Error al registrar asistencia:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

/**
 * Obtiene el listado completo de asistencias. Solo accesible para administradores.
 *
 * @param request - NextRequest con cookie auth_token.
 * @returns 200 con array de asistencias serializadas (BigInt → string).
 * @returns 401 si no hay token o es inválido.
 * @returns 403 si el rol no es admin.
 * @returns 500 si hay un error interno.
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const { validateToken } = await import("@/lib/jwt");
    let decoded;
    try {
      decoded = (await validateToken(token)) as { sub: string; role?: string };
    } catch {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }

    const asistencias = await prisma.attendances.findMany({
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { attendance_date: "desc" },
    });

    const serializedAsistencias = asistencias.map(a => ({
      ...a,
      id: a.id.toString(),
      user_id: a.user_id ? a.user_id.toString() : null,
      users: a.users ? {
        ...a.users,
        id: a.users.id.toString()
      } : null
    }));

    return NextResponse.json(serializedAsistencias);
  } catch (error) {
    console.error("Error al obtener asistencias:", error);
    return NextResponse.json(
      { error: "Error al obtener asistencias" },
      { status: 500 },
    );
  }
}
