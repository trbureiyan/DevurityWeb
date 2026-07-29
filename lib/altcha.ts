import { createChallenge, verifySolution } from "altcha-lib/v1";

// Secret HMAC para firma y verificación stateless
function getHmacKey(): string {
  const key = process.env.ALTCHA_HMAC_SECRET;
  if (key && key.length > 0) return key;
  if (process.env.NODE_ENV === "development") {
    // en desarrollo se permite fallback para evitar configurar env vars localmente
    return "devurity-local-altcha-secret-key-change-in-prod";
  }
  throw new Error(
    "ALTCHA_HMAC_SECRET no está definida. Es requerida en producción."
  );
}

// [!] Cachea el secreto HMAC en memoria; evaluado lazy para no fallar en build si falta la env var
let _hmacKey: string | null = null;
function getOrInitHmacKey(): string {
  if (!_hmacKey) _hmacKey = getHmacKey();
  return _hmacKey;
}

/**
 * Genera un challenge ALTCHA firmado con HMAC y expiración de 10 minutos.
 * Devuelve el formato plano que espera el widget v2.x del CDN.
 *
 * @returns Challenge con algorithm, challenge, salt, signature y expires.
 * @throws Error si falta ALTCHA_HMAC_SECRET fuera de desarrollo.
 */
export async function generateChallenge() {
  return createChallenge({
    algorithm: "SHA-256",
    hmacKey: getOrInitHmacKey(),
    maxnumber: 100000,
    expires: new Date(Date.now() + 10 * 60 * 1000),
  });
}

/**
 * Verifica el payload base64 enviado por el widget ALTCHA.
 * Devuelve true si la solución es válida y no está expirada.
 */
export async function verifyAltchaPayload(payload: unknown): Promise<boolean> {
  if (!payload || typeof payload !== "string") return false;
  return verifySolution(payload, getOrInitHmacKey(), true);
}
