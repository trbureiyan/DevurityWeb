import { errorRequest } from "@/lib/error";
import { EmailOptions, sendEmail } from "@/lib/email";
import { generateToken } from "@/lib/jwt";
import { emailUniversity } from "@/lib/regex";
import { existUserByEmail } from "@/repositories/users/users.repositories";
// api/auth/register
export async function POST(request: Request) {
  const { name, lastname, email } = await request.json();

  // Normalización de datos
  const normalizedName = name?.trim() || "";
  const normalizedLastname = lastname?.trim() || "";
  const normalizedEmail = email?.trim().toLowerCase() || "";

  if (!normalizedEmail && !normalizedName && !normalizedLastname) {
    return new Response(
      JSON.stringify(errorRequest("", "Rellena los campos para el registro")),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (!normalizedName) {
    return new Response(JSON.stringify(errorRequest("nombre")), {
      status: 422,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!normalizedLastname) {
    return new Response(JSON.stringify(errorRequest("apellido")), {
      status: 422,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!normalizedEmail) {
    return new Response(JSON.stringify(errorRequest("correo")), {
      status: 422,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!emailUniversity(normalizedEmail)) {
    return new Response(
      JSON.stringify(errorRequest("correo", "No es valido el ")),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (await existUserByEmail(normalizedEmail)) {
    return new Response(
      JSON.stringify(
        errorRequest("registro", "Ya existe un usuario con este correo."),
      ),
      { status: 409, headers: { "Content-Type": "application/json" } },
    );
  }

  const token = await generateToken({
    email: normalizedEmail,
    name: normalizedName,
    lastname: normalizedLastname,
  });
  console.log(token);
  const htmlBody: string = registerEmailTemplate(String(token));
  const emailToSent: EmailOptions = {
    to: normalizedEmail,
    subject: "Continua tu registro en Devurity",
    htmlBody,
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
      message: "Verifica tu email para completar con el registro",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}

const registerEmailTemplate = (RegisterLink: string) => {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirma tu registro en DEVURITY</title>
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
      p {
        margin: 15px 0;
        font-size: 16px;
        color: white
      }
      .cta-button {
        display: inline-block;
        background: linear-gradient(90deg, #ff0066, #cc0055);
        color: white;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 30px;
        font-weight: bold;
        margin: 20px 0;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .cta-button:hover {
        transform: scale(1.05);
        box-shadow: 0 0 15px rgba(255, 0, 100, 0.4);
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
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>DEVURITY</h1>
      </div>
      <p>Gracias por presentar interes en <span class="highlight">DEVURITY</span>, el <strong>Semillero de Innovación Tecnológica</strong>.</p>
      <p>Para completar tu registro, por favor confirma tu correo haciendo clic en el botón de abajo para continuar con tu registro:</p>
      <p style="text-align: center;">
        <a href="${process.env.DOMAIN}/auth/register/${encodeURIComponent(RegisterLink)}" class="cta-button">Confirmar Correo</a>
      </p>
      <p>Este enlace expirará en 24 horas. Si no lo usas, deberás solicitar un nuevo enlace.</p>
      <p>Si no solicitaste este registro, puedes ignorar este mensaje.</p>
      <div class="footer">
        <p>© 2025 DEVURITY — Exploramos, desarrollamos y aplicamos soluciones tecnológicas reales desde la universidad hacia el mundo.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};
