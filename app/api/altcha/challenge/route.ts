import { generateChallenge } from "@/lib/altcha";

export const dynamic = "force-dynamic";

/**
 * Genera un challenge ALTCHA firmado con HMAC-SHA256 para el widget anti-bot.
 *
 * El challenge expira a los 10 minutos y se usa para verificar PoW
 * (proof-of-work) del lado del cliente sin estado de sesión.
 *
 * @returns {Promise<Response>} JSON con { algorithm, challenge, salt, signature, expires }
 * @throws {Error} Si ALTCHA_HMAC_SECRET no está configurada en producción.
 */
export async function GET() {
  const challenge = await generateChallenge();
  return Response.json(challenge, {
    headers: { "Cache-Control": "no-store" },
  });
}
