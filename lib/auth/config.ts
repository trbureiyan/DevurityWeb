// Configuración centralizada de rutas protegidas
export const authConfig = {
  // Rutas de páginas que requieren autenticación
  protectedPages: ["/admin", "/projects", "/profile", "/attendance"],

  // Rutas de API que requieren autenticación
  protectedApis: ["/api/admin", "/api/projects", "/api/attendance", "/api/users"],

  // Rutas públicas que NO requieren autenticación
  publicPaths: [
    "/",
    "/login",
    "/register",
    "/about",
    "/updates",
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/me",
    "/api/auth/refresh",
  ],

  // Rutas de PÁGINAS que redirigen a /login cuando no autenticado
  // (Las APIs devuelven error 401 en lugar de redirigir)
  redirectToLogin: ["/admin", "/projects", "/profile", "/attendance"],
};

export function isProtectedPath(path: string): boolean {
  const isProtectedPage = authConfig.protectedPages.some((protectedPath) =>
    path.startsWith(protectedPath),
  );

  const isProtectedApi = authConfig.protectedApis.some((protectedPath) =>
    path.startsWith(protectedPath),
  );

  const isPublic = authConfig.publicPaths.some((publicPath) =>
    publicPath === "/"
      ? path === "/"
      : path.startsWith(publicPath),
  );

  return (isProtectedPage || isProtectedApi) && !isPublic;
}

export function isApiPath(path: string): boolean {
  return path.startsWith("/api/");
}

// Función para verificar si debe redirigir a login
export function shouldRedirectToLogin(path: string): boolean {
  return authConfig.redirectToLogin.some((redirectPath) =>
    path.startsWith(redirectPath),
  );
}
