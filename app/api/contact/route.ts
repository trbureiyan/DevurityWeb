import { errorRequest } from "@/lib/error";
import { EmailOptions, sendEmail } from "@/lib/email";
import {
  checkRateLimit,
  getClientIp,
  formatResetTime,
} from "@/lib/rateLimit";

// api/contact
export async function POST(request: Request) {
  try {
    // Verificar rate limit por IP
    const clientIp = getClientIp(request);
    const rateLimitCheck = checkRateLimit(clientIp);

    if (rateLimitCheck.isLimited) {
      const timeRemaining = formatResetTime(rateLimitCheck.resetTime);
      return new Response(
        JSON.stringify(
          errorRequest(
            "límite",
            `Has excedido el límite de solicitudes. Por favor, intenta de nuevo en ${timeRemaining}.`
          )
        ),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Limit": "3",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimitCheck.resetTime.toString(),
            "Retry-After": Math.ceil(
              (rateLimitCheck.resetTime - Date.now()) / 1000
            ).toString(),
          },
        }
      );
    }

    const { name, email, message } = await request.json();

    // Validaciones
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify(
          errorRequest("", "Todos los campos son requeridos para enviar el mensaje")
        ),
        {
          status: 422,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!name.trim()) {
      return new Response(
        JSON.stringify(errorRequest("nombre", "El campo nombre es requerido")),
        {
          status: 422,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!email.trim()) {
      return new Response(
        JSON.stringify(errorRequest("correo", "El campo correo es requerido")),
        {
          status: 422,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify(
          errorRequest("correo", "El correo electrónico no es válido")
        ),
        {
          status: 422,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!message.trim()) {
      return new Response(
        JSON.stringify(errorRequest("mensaje", "El campo mensaje es requerido")),
        {
          status: 422,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Preparar el email para el equipo de Devurity
    const htmlBody: string = contactEmailTemplate(name, email, message);
    const emailToSent: EmailOptions = {
      to: process.env.EMAIL || "devurity@usco.edu.co", // Email de destino (Devurity)
      subject: `Nuevo mensaje de contacto de ${name}`,
      htmlBody,
    };

    // Enviar email
    const isSent = await sendEmail(emailToSent);

    if (!isSent) {
      return new Response(
        JSON.stringify(
          errorRequest(
            "envío",
            "Ha ocurrido un error al enviar el mensaje. Por favor, intenta de nuevo."
          )
        ),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message:
          "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": "3",
          "X-RateLimit-Remaining": rateLimitCheck.remaining.toString(),
          "X-RateLimit-Reset": rateLimitCheck.resetTime.toString(),
        },
      }
    );
  } catch (error) {
    console.error("Error en /api/contact:", error);
    return new Response(
      JSON.stringify(
        errorRequest(
          "servidor",
          "Ha ocurrido un error inesperado. Por favor, intenta de nuevo."
        )
      ),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Template HTML para el email de contacto
const contactEmailTemplate = (
  name: string,
  email: string,
  message: string
) => {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo mensaje de contacto</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      .email-header {
        background: linear-gradient(135deg, #171212 0%, #2a1f1f 100%);
        color: #ffffff;
        padding: 30px 20px;
        text-align: center;
      }
      .email-header h1 {
        margin: 0;
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 0.1em;
      }
      .email-header p {
        margin: 10px 0 0;
        font-size: 14px;
        color: #f66661;
      }
      .email-body {
        padding: 30px 20px;
        color: #333333;
      }
      .email-body h2 {
        color: #171212;
        font-size: 20px;
        margin-top: 0;
        margin-bottom: 20px;
        border-bottom: 2px solid #ca2b26;
        padding-bottom: 10px;
      }
      .info-section {
        background-color: #f9f9f9;
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 20px;
      }
      .info-item {
        margin-bottom: 10px;
      }
      .info-label {
        font-weight: bold;
        color: #555555;
        display: inline-block;
        width: 80px;
      }
      .info-value {
        color: #333333;
      }
      .message-section {
        background-color: #ffffff;
        border-left: 4px solid #ca2b26;
        padding: 15px;
        margin-top: 20px;
      }
      .message-section h3 {
        margin-top: 0;
        color: #171212;
        font-size: 16px;
      }
      .message-content {
        color: #555555;
        line-height: 1.6;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
      .email-footer {
        background-color: #f4f4f4;
        padding: 20px;
        text-align: center;
        font-size: 12px;
        color: #777777;
      }
      .email-footer a {
        color: #ca2b26;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h1>DEVURITY</h1>
        <p>Nuevo mensaje de contacto</p>
      </div>
      
      <div class="email-body">
        <h2>Información del remitente</h2>
        
        <div class="info-section">
          <div class="info-item">
            <span class="info-label">Nombre:</span>
            <span class="info-value">${name}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Email:</span>
            <span class="info-value"><a href="mailto:${email}" style="color: #ca2b26; text-decoration: none;">${email}</a></span>
          </div>
        </div>
        
        <div class="message-section">
          <h3>Mensaje:</h3>
          <p class="message-content">${message}</p>
        </div>
      </div>
      
      <div class="email-footer">
        <p>Este mensaje fue enviado desde el formulario de contacto de <strong>Devurity</strong></p>
        <p>
          <a href="https://devurity.usco.edu.co">devurity.usco.edu.co</a> | 
          <a href="mailto:devurity@usco.edu.co">devurity@usco.edu.co</a>
        </p>
      </div>
    </div>
  </body>
  </html>
  `;
};
