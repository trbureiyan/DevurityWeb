/**
 * Edge-compatible JWT verification using crypto.subtle (Web Crypto API).
 * Does NOT depend on Node.js-only libraries (e.g. jsonwebtoken).
 * Used in middleware.ts which runs in the Next.js Edge Runtime.
 */

export interface JwtPayload {
  sub: string;
  role?: string;
  exp?: number;
  [key: string]: unknown;
}

/**
 * Decode a base64url-encoded string, restoring padding and normalizing
 * URL-safe characters before decoding via atob() + TextDecoder for
 * proper multi-byte UTF-8 handling (accents, emojis, etc.).
 * Use only for JSON payloads (valid UTF-8), NOT for binary data like signatures.
 */
function base64UrlDecode(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/")
    + "=".repeat((4 - (str.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}

/**
 * Decode a base64url-encoded string directly to raw bytes.
 * Use for binary data (e.g. HMAC signatures) where TextDecoder would corrupt bytes ≥ 0x80.
 */
function base64UrlToBytes(str: string): Uint8Array<ArrayBuffer> {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/")
    + "=".repeat((4 - (str.length % 4)) % 4);
  const binary = atob(padded);
  const buf = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/**
 * Verify a HS256 JWT signature and return the decoded payload.
 * Returns null if the signature is invalid, the token is expired,
 * JWT_SECRET is not set, or the token is malformed.
 */
export async function verifyJwtPayload(
  token: string,
): Promise<JwtPayload | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [header, payload, signature] = parts;
    const secret = process.env.JWT_SECRET;
    if (!secret) return null;

    // Import the HMAC-SHA256 key from JWT_SECRET
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );

    // Decode Base64url signature to raw bytes (must not go through TextDecoder)
    const sigBytes = base64UrlToBytes(signature);

    // Verify signature over "header.payload"
    const isValid = await crypto.subtle.verify(
      "HMAC",
      cryptoKey,
      sigBytes,
      new TextEncoder().encode(`${header}.${payload}`),
    );

    if (!isValid) return null;

    // Decode payload only after signature is confirmed valid
    const decoded = JSON.parse(
      base64UrlDecode(payload),
    ) as JwtPayload;

    // Reject expired tokens
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}
