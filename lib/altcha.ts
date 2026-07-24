import { create, randomInt } from "altcha-lib/frameworks/nextjs";
import { deriveKey } from "altcha-lib/algorithms/pbkdf2";

// Secret HMAC para firma y verificación stateless
const HMAC_SECRET =
  process.env.ALTCHA_HMAC_SECRET ||
  "devurity-local-altcha-secret-key-change-in-prod";

const _instance = create({
  hmacSignatureSecret: HMAC_SECRET,
  createChallengeParameters: () => ({
    algorithm: "PBKDF2/SHA-256",
    cost: 3000,
    counter: randomInt(3000, 6000),
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // Expiración de 10 minutos
  }),
  deriveKey,
});

/**
 * Instancia de ALTCHA lista para usar en route handlers de Next.js.
 * challengeHandler: GET handler que genera y firma el challenge.
 * verify: valida el payload enviado por el widget del cliente.
 */
export const altcha = {
  challengeHandler: _instance.challengeHandler,
  // pre-vinculamos deriveKey y el secreto para que los route handlers solo pasen el payload
  verify: (payload: unknown) => _instance.verify(payload, deriveKey, HMAC_SECRET),
};
