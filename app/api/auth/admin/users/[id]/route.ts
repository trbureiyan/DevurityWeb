import { NextRequest, NextResponse } from "next/server";
import {
  activateUser,
  deleteInactiveUser,
  findById,
} from "@/repositories/users/users.repositories";
import { EmailOptions, sendEmail } from "@/lib/email";
import { errorRequest } from "@/lib/error";

// Helper function to serialize BigInt values
function serializeBigInt(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === "bigint") {
    return obj.toString();
  }

  if (Array.isArray(obj)) {
    return obj.map(serializeBigInt);
  }

  if (typeof obj === "object") {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = serializeBigInt(value);
    }
    return result;
  }

  return obj;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: userId } = await params;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "ID de usuario es requerido",
        },
        { status: 400 },
      );
    }

    const result = await activateUser(userId);

    if (result) {
      const { email } = await findById(userId);
      const emailToSent: EmailOptions = {
        to: email,
        subject: "Bienvenido a devurity",
        htmlBody: emailTemplate,
      };
      const isSent = await sendEmail(emailToSent);

      if (!isSent) {
        return new Response(
          JSON.stringify(
            errorRequest("registro", "Ha ocurrido un error en el "),
          ),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      return NextResponse.json({
        success: true,
        message: "Usuario aprobado exitosamente",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error:
            "No se pudo aprobar el usuario. Puede que ya esté activo o no exista",
        },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Error approving user:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error interno del servidor al aprobar el usuario",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: userId } = await params;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "ID de usuario es requerido",
        },
        { status: 400 },
      );
    }

    const result = await deleteInactiveUser(userId);

    if (result) {
      return NextResponse.json({
        success: true,
        message: "Usuario rechazado y eliminado exitosamente",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error:
            "No se pudo rechazar el usuario. Puede que ya esté activo o no exista",
        },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Error rejecting user:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error interno del servidor al rechazar el usuario",
      },
      { status: 500 },
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: userId } = await params;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "ID de usuario es requerido",
        },
        { status: 400 },
      );
    }

    const user = await findById(userId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Usuario no encontrado",
        },
        { status: 404 },
      );
    }

    // Convertir todos los BigInt a string para serialización
    const serializedUser = serializeBigInt(user);

    return NextResponse.json({
      success: true,
      data: serializedUser,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error interno del servidor al obtener el usuario",
      },
      { status: 500 },
    );
  }
}

const emailTemplate = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>¡Bienvenido a DEVURITY!</title>
    <style>
      body {
        background: #000;
        color: #fff;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 20px;
        line-height: 1.6;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        padding: 30px;
        background: #0f0f0f;
        border-radius: 12px;
        box-shadow: 0 0 20px rgba(255, 0, 100, 0.1);
        border: 1px solid #333;
      }
      .header {
        text-align: center;
        margin-bottom: 30px;
      }
      .logo {
        width: 120px;
        height: auto;
        margin-bottom: 20px;
      }
      h1 {
        font-size: 28px;
        font-weight: 700;
        color: #ff0066;
        letter-spacing: 1px;
        margin: 0;
      }
      .subtitle {
        font-size: 20px;
        color: #00ff88;
        font-weight: 600;
        margin: 10px 0;
      }
      p {
        margin: 15px 0;
        font-size: 16px;
        color: white;
      }
      .welcome-box {
        background: linear-gradient(135deg, #1a1a1a, #2a1a2a);
        padding: 20px;
        border-radius: 8px;
        border-left: 4px solid #00ff88;
        margin: 20px 0;
      }
      .cta-button {
        display: inline-block;
        background: linear-gradient(90deg, #00ff88, #00cc66);
        color: #000;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 30px;
        font-weight: bold;
        margin: 20px 0;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .cta-button:hover {
        transform: scale(1.05);
        box-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
      }
      .footer {
        text-align: center;
        margin-top: 30px;
        font-size: 14px;
        color: #888;
      }
      .highlight {
        color: #ff0066;
        font-weight: bold;
      }
      .success-icon {
        color: #00ff88;
        font-size: 24px;
        margin-right: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>DEVURITY</h1>
        <div class="subtitle">¡Tu solicitud ha sido aprobada!</div>
      </div>

      <div class="welcome-box">
        <p>🎉 <strong>¡Felicidades!</strong> Has sido aceptado oficialmente en <span class="highlight">DEVURITY</span>.</p>
        <p>Estamos emocionados de darte la bienvenida a nuestro <strong>Semillero de Innovación Tecnológica</strong> donde exploraremos, desarrollaremos y aplicaremos soluciones tecnológicas reales.</p>
      </div>

      <p><span class="success-icon">✓</span> Tu cuenta ha sido activada exitosamente</p>

      <p style="text-align: center;">
        <a href="${process.env.DOMAIN}/auth/login" class="cta-button">Iniciar Sesión</a>
      </p>


      <div class="footer">
        <p>© 2025 DEVURITY — Exploramos, desarrollamos y aplicamos soluciones tecnológicas reales desde la universidad hacia el mundo.</p>
      </div>
    </div>
  </body>
  </html>

  `;
