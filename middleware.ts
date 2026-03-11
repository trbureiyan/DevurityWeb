import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authMiddleware } from "./lib/auth/middleware";
import { csrfAdapter } from "./lib/csrf";
import { verifyJwtPayload } from "./lib/auth/jwt-edge";

const redirectMap: Record<string, string> = {
  "/auth": "/auth/login",
  "/register": "/auth/register",
  "/login": "/auth/login"
};

const forbiddenFragments = [
  ".env",
  ".git",
  "package.json",
  "tsconfig",
  "next.config",
];

// Middleware principal
export async function middleware(
  request: NextRequest,
): Promise<NextResponse | Response> {
  const token = request.cookies.get("auth_token")?.value;
  const currentPath = request.nextUrl.pathname;
  const normalisedPath =
    currentPath.endsWith("/") && currentPath !== "/"
      ? currentPath.slice(0, -1)
      : currentPath;

  // If there is an active session (token cookie present) and the user
  // is trying to access the login page, redirect them to profile to
  // avoid showing the login UI to already-authenticated users.
  if (token && (normalisedPath === "/auth/login" || normalisedPath === "/login" || normalisedPath === "/auth")) {
    const decoded = await verifyJwtPayload(token);
    if (decoded?.sub) {
      const url = request.nextUrl.clone();
      url.pathname = `/profile/${decoded.sub}`;
      url.search = "";
      return NextResponse.redirect(url, 308);
    }
    // Token inválido — dejar pasar para que se autentique de nuevo
  }

  const redirectTarget = redirectMap[normalisedPath];
  if (redirectTarget) {
    const url = request.nextUrl.clone();
    url.pathname = redirectTarget;
    url.search = "";
    return NextResponse.redirect(url, 308);
  }

  const lowerPath = currentPath.toLowerCase();
  const hasTraversal = lowerPath.includes("..") || lowerPath.includes("%2e%2e");
  const touchesForbidden = forbiddenFragments.some((fragment) =>
    lowerPath.includes(fragment),
  );

  if (hasTraversal || touchesForbidden) {
    if (currentPath.startsWith("/api")) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (currentPath !== "/not-found") {
      const notFoundUrl = request.nextUrl.clone();
      notFoundUrl.pathname = "/not-found";
      notFoundUrl.search = "";
      return NextResponse.redirect(notFoundUrl, 308);
    }

    return NextResponse.rewrite(request.nextUrl);
  }

  // Si no hay token y es ruta protegida, redirigir a login
  if (!token && isProtectedPath(currentPath)) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Verificar roles para rutas de admin y sus endpoints de API
  if (currentPath.startsWith("/admin") || currentPath.startsWith("/api/admin")) {
    const roleCheck = await checkUserRole(request, token);
    if (roleCheck) {
      return roleCheck;
    }
  }

  // Verificar CSRF para requests que lo requieran
  const csrfResult = await verifyCsrf(request);
  if (csrfResult) {
    return csrfResult;
  }

  return await authMiddleware(request);
}

// Función helper para verificar rutas protegidas
function isProtectedPath(path: string): boolean {
  const protectedPaths = ["/admin", "/profile", "/attendance"];

  return protectedPaths.some((protectedPath) => path.startsWith(protectedPath));
}

// Función helper para denegar acceso
function denyAccess(request: NextRequest): NextResponse {
  if (request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.json(
      {
        error: "403 - Acceso restringido.",
      },
      { status: 403 },
    );
  } else {
    return NextResponse.redirect(new URL("/access-denied", request.url));
  }
}

// Función para verificar roles de usuario — usa JWT Edge-compatible directamente
// para evitar self-fetch que es inestable en Vercel Edge Runtime.
async function checkUserRole(
  request: NextRequest,
  token: string | undefined,
): Promise<NextResponse | null> {
  if (!token) {
    return denyAccess(request);
  }

  // Verificar rol directamente desde el JWT (Edge-compatible)
  const decoded = await verifyJwtPayload(token);
  if (!decoded) {
    console.error("[Admin middleware] JWT inválido o expirado");
    return denyAccess(request);
  }
  if (decoded.role !== "admin") {
    return denyAccess(request);
  }

  return null;
}

// Función para verificar CSRF
async function verifyCsrf(request: NextRequest): Promise<NextResponse | null> {
  const method = request.method;
  const path = request.nextUrl.pathname;

  // Solo verificar CSRF para métodos que modifican datos
  if (!csrfAdapter.requiresCsrfProtection(method)) {
    return null;
  }

  // Excluir rutas públicas que no necesitan CSRF
  const publicPaths = [
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/logout",
    "/api/auth/refresh",
    "/api/auth/is-admin",
    "/api/auth/forgot-password",
    "/api/auth/reset-password",
    "/api/qr-dinamico",
    "/api/asistencia",
    "/api/admin/attendances", // Excluir escaneo QR de CSRF
  ];

  if (publicPaths.some((publicPath) => path.startsWith(publicPath))) {
    return null;
  }

  // Obtener tokens
  const csrfTokenFromHeader = request.headers.get("x-csrf-token");
  const csrfTokenFromCookie = request.cookies.get("csrf_token")?.value;
  // Debug logs
  console.log("[CSRF] Checking", {
    method,
    path,
    hasHeader: !!csrfTokenFromHeader,
    hasCookie: !!csrfTokenFromCookie,
    headerSample: csrfTokenFromHeader?.slice(0, 6),
    cookieSample: csrfTokenFromCookie?.slice(0, 6),
  });

  // Verificar que ambos tokens existan y coincidan
  if (!csrfTokenFromHeader || !csrfTokenFromCookie) {
    console.warn("[CSRF] Missing token", {
      hasHeader: !!csrfTokenFromHeader,
      hasCookie: !!csrfTokenFromCookie,
    });
    return NextResponse.json(
      { error: "Token CSRF requerido" },
      {
        status: 403,
      },
    );
  }
  // Debug log antes de la validación
  if (!csrfAdapter.validateToken(csrfTokenFromHeader, csrfTokenFromCookie)) {
    console.warn("[CSRF] Invalid token", {
      headerSample: csrfTokenFromHeader.slice(0, 6),
      cookieSample: csrfTokenFromCookie.slice(0, 6),
    });
    return NextResponse.json(
      { error: "Token CSRF inválido" },
      {
        status: 403,
      },
    );
  }

  return null;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)",
  ],
};

