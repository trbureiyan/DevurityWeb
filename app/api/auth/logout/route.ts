import { NextResponse } from "next/server";

export async function POST() {
  try {
    const expiredCookie = `auth_token=; HttpOnly; Path=/; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`;

    return new Response(
      JSON.stringify({
        success: true,
        message: "Sesión cerrada exitosamente",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": expiredCookie,
        },
      },
    );
  } catch (error) {
    console.error("Error en logout:", error);
    return new Response(JSON.stringify({ error: "Error al cerrar sesión" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
