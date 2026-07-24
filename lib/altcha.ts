import { createChallenge, verifySolution } from "altcha-lib/v1";

// Secret HMAC para firma y verificación stateless
const HMAC_KEY =
  process.env.ALTCHA_HMAC_SECRET ||
  "devurity-local-altcha-secret-key-change-in-prod";

/**
 * Genera un challenge ALTCHA firmado con HMAC y expiración de 10 minutos.
 * Devuelve el formato plano que espera el widget v2.x del CDN.
 */
export async function generateChallenge() {
  return createChallenge({
    algorithm: "SHA-256",
    hmacKey: HMAC_KEY,
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
  return verifySolution(payload, HMAC_KEY, true);
}
