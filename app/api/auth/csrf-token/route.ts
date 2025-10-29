import { NextResponse } from "next/server";
import { csrfAdapter } from "@/lib/csrf";

export async function GET() {
  try {
    // Generar nuevo token CSRF
    const csrfToken = csrfAdapter.generateToken();

    // Crear cookie CSRF
    const csrfCookie = csrfAdapter.createCookie(csrfToken);

    return NextResponse.json(
      {
        csrfToken,
        success: true,
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": csrfCookie,
        },
      },
    );
  } catch (error) {
    console.error("Error generando token CSRF:", error);
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        success: false,
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
