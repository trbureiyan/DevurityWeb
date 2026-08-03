import { NextRequest, NextResponse } from "next/server";
import { csrfAdapter } from "@/lib/csrf";

export async function GET(request: NextRequest) {
  try {
    const existingToken = request.cookies.get("csrf_token")?.value;
    const csrfToken = existingToken && /^[A-Za-z0-9]{32}$/.test(existingToken)
      ? existingToken
      : csrfAdapter.generateToken();

    // reutilizar el token evita desincronizar header y cookie cuando varios componentes lo solicitan
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
