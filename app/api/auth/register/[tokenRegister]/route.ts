import { NextRequest } from "next/server";
import { validateToken } from "@/lib/jwt";
import { errorRequest } from "@/lib/error";
import {
  createUser,
  existUserByEmail,
} from "@/repositories/users/users.repositories";
import { bcryptAdapter } from "@/lib/bcrypt";
import { isValidPassword } from "@/lib/regex";
import { EmailOptions, sendEmail } from "@/lib/email";

interface Params {
  params: Promise<{
    tokenRegister: string;
  }>;
}

interface TokenPayload {
  email: string;
  name: string;
  lastname: string;
  exp: number;
}

export async function GET(req: NextRequest, { params }: Params) {
  const timeUnixNow = Math.floor(Date.now() / 1000);
  const { tokenRegister: token } = await params;
  try {
    const payload = (await validateToken(token)) as TokenPayload;
    const { email, name, exp } = payload;
    if (await existUserByEmail(email)) {
      return new Response(
        JSON.stringify(
          errorRequest("registro", "Ya existe un usuario con este correo."),
        ),
        { status: 409, headers: { "Content-Type": "application/json" } },
      );
    }

    if (timeUnixNow > exp) {
      throw new Error("Token expirado");
    }

    return new Response(
      JSON.stringify({
        email,
        name,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (e) {
    return new Response(
      JSON.stringify(
        errorRequest("registro", "Ya ha expirado la duracion del "),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function POST(req: NextRequest, { params }: Params) {
  const { tokenRegister: token } = await params;
  const timeUnixNow = Math.floor(Date.now() / 1000);
  let payload: TokenPayload;

  try {
    payload = (await validateToken(token)) as TokenPayload;
    if (timeUnixNow > payload.exp) {
      throw new Error("Token expired");
    }
  } catch {
    return new Response(
      JSON.stringify(
        errorRequest("registro", "Ya ha expirado la duracion del token"),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const { name, email, lastname } = payload;

  const { semester, motivation, skills, password } = await req.json();
  if (!semester && !motivation && skills == undefined && !password) {
    return new Response(
      JSON.stringify(errorRequest("", "Rellena los campos para el registro")),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  // Validaciones
  if (isNaN(semester) || !semester || semester < 1 || semester > 13) {
    return new Response(
      JSON.stringify(
        errorRequest(
          "semestre",
          "Semestre no válido. Por favor ingresa un semestre válido",
        ),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  if (!motivation) {
    return new Response(
      JSON.stringify(
        errorRequest(
          "Motivacion",
          "motivacion no valido, por favor explica tu motivacion para ingresar al semillero",
        ),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  if (!password) {
    return new Response(
      JSON.stringify(
        errorRequest("Contraseña", "Por favor rellena el campo: "),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (!isValidPassword(password)) {
    return new Response(
      JSON.stringify(
        errorRequest(
          "Contraseña",
          "Debe tener mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número. Verifica tu ",
        ),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (skills == undefined) {
    return new Response(
      JSON.stringify(
        errorRequest(
          "habilidades",
          "Ha aparecido un comportamiento extraño al detectar los valores del campo habilidades",
        ),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (await existUserByEmail(email)) {
    return new Response(
      JSON.stringify(
        errorRequest("registro", "Ya existe un usuario con este correo."),
      ),
      { status: 409, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    await createUser({
      name,
      email,
      lastname,
      password: bcryptAdapter.hash(password),
      semester,
      skills,
      motivation,
    });
  } catch (e) {
    console.log(e);
    return new Response(
      JSON.stringify(
        errorRequest("Usuario", "Ha ocurrido un error en la creacion del "),
      ),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const emailToSent: EmailOptions = {
    to: email,
    subject: "Bienvenido a devurity",
    htmlBody: emailTemplate,
  };
  const isSent = await sendEmail(emailToSent);

  if (!isSent) {
    return new Response(
      JSON.stringify(errorRequest("registro", "Ha ocurrido un error en el ")),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  return new Response(
    JSON.stringify({
      message:
        "Tu registro ha sido copmletado, un administrador validara tu peticion para aprobarte o rechazarte al semillero. Este pendiente de tu correo.",
    }),
  );
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
