// Validación de URLs proporcionadas por el cliente antes de persistirlas (campo `href`)

const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

export type HrefValidationResult =
  | { ok: true; href: string | null }
  | { ok: false; error: string };

/**
 * Valida un href externo antes de persistirlo, rechazando esquemas peligrosos
 * (javascript:, data:, vbscript:, etc.) y aceptando solo rutas internas
 * (que empiezan con "/" o "#") o URLs externas http/https.
 *
 * @param rawHref - Valor crudo recibido del cliente (puede ser undefined).
 * @returns `{ ok: true, href }` con el href saneado (o null si venía vacío),
 *          o `{ ok: false, error }` si el valor es inválido o inseguro.
 */
export function validateHref(rawHref: unknown): HrefValidationResult {
  if (rawHref === undefined || rawHref === null) {
    return { ok: true, href: null };
  }

  if (typeof rawHref !== "string") {
    return { ok: false, error: "El link debe ser una cadena de texto" };
  }

  const trimmed = rawHref.trim();
  if (!trimmed) {
    return { ok: true, href: null };
  }

  if (trimmed.startsWith("/") || trimmed.startsWith("#")) {
    return { ok: true, href: trimmed };
  }

  try {
    const url = new URL(trimmed);
    if (!ALLOWED_PROTOCOLS.has(url.protocol)) {
      return { ok: false, error: "El link debe ser una URL http(s) o una ruta interna" };
    }
    return { ok: true, href: trimmed };
  } catch {
    return { ok: false, error: "El link no es una URL válida" };
  }
}
