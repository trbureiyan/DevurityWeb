const PUBLIC_ROUTE_ALIASES: Readonly<Record<string, string>> = {
  "/auth": "/auth/login",
  "/login": "/auth/login",
  "/register": "/auth/register",
};

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/gallery",
  "/help",
  "/help/faq",
  "/help/reglamentos",
  "/projects",
  "/updates",
  "/access-denied",
] as const;

const PROTECTED_PREFIXES = [
  "/admin",
  "/api",
  "/auth",
  "/content_manager",
  "/forgot-password",
  "/leader_proyect",
  "/profile",
  "/recovery-password",
] as const;

/**
 * Normaliza una ruta pública eliminando el slash final si no es la raíz.
 * @param pathname - La ruta a normalizar
 * @returns La ruta normalizada
 */
export function normalizePublicPath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

/**
 * Obtiene la redirección pública para un alias conocido.
 * @param pathname - Ruta alias a evaluar (ej: /login)
 * @returns Ruta canónica o null si no es un alias
 */
export function getPublicRedirect(pathname: string): string | null {
  const normalizedPath = normalizePublicPath(pathname);
  return PUBLIC_ROUTE_ALIASES[normalizedPath] ?? null;
}

/**
 * Valida y retorna una ruta interna segura para redirección.
 * Rechaza URLs absolutas (http/https), rutas relativas a protocolo (//),
 * secuencias con contrabarra (\, /\) y valores malformados o no texto.
 * @param target - La ruta candidata recibida (ej: desde searchParams)
 * @returns La ruta interna sanitizada o null si es insegura.
 */
export function getSafeInternalRedirect(target: string | null | undefined): string | null {
  if (!target || typeof target !== "string") return null;

  const trimmed = target.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//") || trimmed.startsWith("/\\")) {
    return null;
  }

  // rechaza contrabarras y caracteres de control
  if (trimmed.includes("\\") || /[\x00-\x1F\x7F]/.test(trimmed)) {
    return null;
  }

  try {
    const parsed = new URL(trimmed, "http://localhost");
    if (parsed.origin !== "http://localhost") {
      return null;
    }
    return parsed.pathname + parsed.search + parsed.hash;
  } catch {
    return null;
  }
}

/**
 * Genera sugerencias de rutas públicas cercanas mediante distancia de Levenshtein.
 * @param pathname - Ruta no encontrada
 * @param limit - Máximo número de sugerencias (por defecto 3)
 * @returns Lista de rutas públicas sugeridas
 */
export function getPublicRouteSuggestions(pathname: string, limit = 3): string[] {
  const normalizedPath = normalizePublicPath(pathname);

  if (isRestrictedPath(normalizedPath)) {
    return [];
  }

  const rankedRoutes = PUBLIC_ROUTES.map((route) => ({
    route,
    distance: levenshtein(normalizedPath, route),
  }))
    .filter(({ route, distance }) => distance <= suggestionDistance(route))
    .sort((a, b) => a.distance - b.distance || a.route.length - b.route.length);

  return rankedRoutes.slice(0, limit).map(({ route }) => route);
}

function isRestrictedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function suggestionDistance(route: string): number {
  if (route.length <= 5) return 1;
  if (route.length <= 10) return 2;
  return 3;
}

function levenshtein(left: string, right: string): number {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);

  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    let diagonal = previous[0];
    previous[0] = leftIndex;

    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const above = previous[rightIndex];
      const cost = left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1;

      previous[rightIndex] = Math.min(
        previous[rightIndex] + 1,
        previous[rightIndex - 1] + 1,
        diagonal + cost,
      );
      diagonal = above;
    }
  }

  return previous[right.length];
}
