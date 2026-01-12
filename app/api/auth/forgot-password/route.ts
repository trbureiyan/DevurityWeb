import { NextResponse } from "next/server";
import { existUserByEmail } from "@/repositories/users/users.repositories";
import { generateToken } from "@/lib/jwt";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body || {};

    if (!email || typeof email !== "string") {
      return NextResponse.json({ ok: false, message: "Email es requerido" }, { status: 400 });
    }

    const exists = await existUserByEmail(email);

    // For security don't reveal whether an email exists. But still send success so UX smooth.
    if (!exists) {
      return NextResponse.json({ ok: true, message: "Si el correo existe, recibirás un email con instrucciones." });
    }

    // Generar token con expiración corta (1 hora)
    const token = await generateToken({ email, type: "recovery" }, 60 * 60);

    // Build recovery link using env or request url
    const origin = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || new URL(req.url).origin;
    const recoveryLink = `${origin}/recovery-password/${encodeURIComponent(token)}`;

    const html = `
      <div style="font-family: sans-serif; color: #111">
        <h2>Recupera tu contraseña</h2>
        <p>Hicimos una solicitud para restablecer la contraseña de tu cuenta.</p>
        <p>Haz clic en el botón para crear una nueva contraseña — el enlace expirará en 1 hora.</p>
        <p style="margin: 24px 0">
          <a href="${recoveryLink}" style="display:inline-block;padding:12px 20px;background:#CA2B26;color:#fff;border-radius:8px;text-decoration:none">Recuperar contraseña</a>
        </p>
        <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
      </div>
    `;

    const sent = await sendEmail({ to: email, subject: "Recupera tu contraseña - Devurity", htmlBody: html });

    if (!sent) {
      return NextResponse.json({ ok: false, message: "No se pudo enviar el correo, intenta más tarde." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: "Si el correo existe, recibirás un email con instrucciones." });
  } catch (error) {
    console.error("forgot-password error:", error);
    return NextResponse.json({ ok: false, message: "Error interno" }, { status: 500 });
  }
}
