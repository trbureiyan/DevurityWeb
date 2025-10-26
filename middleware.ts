import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authMiddleware } from "./lib/auth/middleware";

// Middleware principal
export async function middleware(
  request: NextRequest,
): Promise<NextResponse | Response> {
  const token = request.cookies.get("auth_token")?.value;
  const currentPath = request.nextUrl.pathname;

  // Si no hay token y es ruta protegida, guardar intent URL
  if (!token && isProtectedPath(currentPath)) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return await authMiddleware(request);
}

// Función helper para verificar rutas protegidas
function isProtectedPath(path: string): boolean {
  const protectedPaths = ["/admin", "/projects", "/profile", "/attendance"];

  return protectedPaths.some((protectedPath) => path.startsWith(protectedPath));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)",
  ],
};
