import { validateToken } from "@/lib/jwt";
import { findByIdWithRole } from "@/repositories/users/users.repositories";

export async function GET(request: Request) {
  try {
    const cookies = request.headers.get("cookie");
    if (!cookies) {
      return new Response(
        JSON.stringify({ error: "No autenticado - Sin cookies" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const token = cookies
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];

    if (!token) {
      return new Response(
        JSON.stringify({ error: "No autenticado - Token no encontrado" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const decoded = (await validateToken(token)) as {
      sub: string;
    };

    const user = await findByIdWithRole(decoded.sub);

    if (!user) {
      return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!user.is_active) {
      return new Response(JSON.stringify({ error: "Cuenta inactiva" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        user: {
          name: user.name,
          last_name: user.last_name,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error en endpoint /me:", error);

    if (error instanceof Error) {
      if (
        error.message.includes("invalid signature") ||
        error.message.includes("jwt expired") ||
        error.message.includes("jwt malformed")
      ) {
        return new Response(
          JSON.stringify({ error: "Token inválido o expirado" }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
    }

    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
