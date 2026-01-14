import { errorRequest } from "@/lib/error";
import { generateToken } from "@/lib/jwt";
import { bcryptAdapter } from "@/lib/bcrypt";
import { emailUniversity } from "@/lib/regex";
import { findByEmailWithRole } from "@/repositories/users/users.repositories";
import logger from "@/lib/logger";

const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Normalización de datos
    const normalizedEmail = email?.trim().toLowerCase() || "";
    const normalizedPassword = password || "";

    if (!normalizedEmail || !normalizedPassword) {
      return new Response(
        JSON.stringify(errorRequest("", "Email y contraseña son requeridos")),
        {
          status: 422,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    if (!emailUniversity(normalizedEmail)) {
      return new Response(
        JSON.stringify(
          errorRequest("email", "Debe ser un email universitario válido"),
        ),
        {
          status: 422,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const clientIP = request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const userAttempts = loginAttempts.get(clientIP);

    if (userAttempts && userAttempts.count >= MAX_ATTEMPTS) {
      const timeSinceLastAttempt = now - userAttempts.lastAttempt;
      if (timeSinceLastAttempt < LOCKOUT_TIME) {
        return new Response(
          JSON.stringify({
            error:
              "Demasiados intentos fallidos. Intenta nuevamente en 15 minutos.",
          }),
          {
            status: 429,
            headers: { "Content-Type": "application/json" },
          },
        );
      } else {
        loginAttempts.delete(clientIP);
      }
    }

    const user = await findByEmailWithRole(normalizedEmail);

    if (!user) {
      updateLoginAttempts(clientIP, now);
      return new Response(
        JSON.stringify({
          error: "Credenciales inválidas",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    if (!user.is_active) {
      return new Response(
        JSON.stringify({
          error: "Tu cuenta está pendiente de aprobación por un administrador",
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const isPasswordValid = bcryptAdapter.compare(
      normalizedPassword,
      user.password,
    );
    if (!isPasswordValid) {
      updateLoginAttempts(clientIP, now);
      return new Response(
        JSON.stringify({
          error: "Credenciales inválidas",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    loginAttempts.delete(clientIP);

    const tokenPayload = {
      sub: user.id.toString(),
    };

    const token = await generateToken(tokenPayload, 14400);
    logger.info(token);
    let redirectTo = "/profile";

    if (user.roles.name === "admin") {
      redirectTo = "/admin";
    } else if (user.roles.name === "user") {
      redirectTo = `/profile/${user.id}`;
    }

    const cookie = `auth_token=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=14400${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`;

    return new Response(
      JSON.stringify({
        success: true,
        redirectTo,
        user: {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          last_name: user.last_name,
          role: user.roles.name,
          is_active: user.is_active,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": cookie,
        },
      },
    );
  } catch (error) {
    console.error("Error en login:", error);
    return new Response(
      JSON.stringify({
        error: "Error interno del servidor",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

function updateLoginAttempts(clientIP: string, timestamp: number) {
  const current = loginAttempts.get(clientIP) || { count: 0, lastAttempt: 0 };
  loginAttempts.set(clientIP, {
    count: current.count + 1,
    lastAttempt: timestamp,
  });

  setTimeout(() => {
    loginAttempts.delete(clientIP);
  }, LOCKOUT_TIME + 60000);
}
