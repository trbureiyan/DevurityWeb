import { NextResponse } from "next/server";
import { validateToken } from "@/lib/jwt";
import { updatePasswordByEmail } from "@/repositories/users/users.repositories";
import { bcryptAdapter } from "@/lib/bcrypt";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, password } = body || {};

    if (!token || !password) {
      return NextResponse.json({ ok: false, message: "Token y contraseña son requeridos" }, { status: 400 });
    }

    // Validate token
    let decoded: any;
    try {
      decoded = await validateToken(token);
    } catch (err) {
      return NextResponse.json({ ok: false, message: "Token inválido o expirado" }, { status: 401 });
    }

    if (!decoded || decoded.type !== "recovery" || !decoded.email) {
      return NextResponse.json({ ok: false, message: "Token inválido" }, { status: 401 });
    }

    const email: string = decoded.email;

    // Hash password and update
    const hashed = bcryptAdapter.hash(password);
    const updated = await updatePasswordByEmail(email, hashed);
    if (!updated) {
      return NextResponse.json({ ok: false, message: "No se pudo actualizar la contraseña" }, { status: 500 });
    }

    // Send confirmation email
    const html = `
      <div style="font-family:sans-serif;color:#111">
        <h3>Contraseña actualizada</h3>
        <p>Tu contraseña fue cambiada correctamente. Si no fuiste tú, contacta al soporte.</p>
      </div>
    `;
    await sendEmail({ to: email, subject: "Tu contraseña se actualizó", htmlBody: html });

    return NextResponse.json({ ok: true, message: "Contraseña actualizada" });
  } catch (error) {
    console.error("reset-password error:", error);
    return NextResponse.json({ ok: false, message: "Error interno" }, { status: 500 });
  }
}
