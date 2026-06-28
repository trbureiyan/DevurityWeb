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
 * Decode a base64url-encoded string to its raw bytes.
 * Used for binary fields like the JWT signature where UTF-8 re-encoding
 * would corrupt bytes >= 128.
 */
function base64UrlToBytes(str: string): Uint8Array {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/")
    + "=".repeat((4 - (str.length % 4)) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

/**
 * Decode a base64url-encoded string to a UTF-8 text string.
 * Used for JWT header and payload segments which are JSON.
 */
function base64UrlDecodeText(str: string): string {
  return new TextDecoder("utf-8").decode(base64UrlToBytes(str));
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

    // Decode Base64url signature directly to bytes — must not pass through
    // TextDecoder because the 32-byte HMAC-SHA256 digest is arbitrary binary,
    // not valid UTF-8. Using base64UrlToBytes avoids byte corruption.
    const sigBytes = base64UrlToBytes(signature);

    // Verify signature over "header.payload"
    const isValid = await crypto.subtle.verify(
      "HMAC",
      cryptoKey,
      sigBytes,
      new TextEncoder().encode(`${header}.${payload}`),
    );

    if (!isValid) return null;

    // Decode payload only after signature is confirmed valid.
    // Payload is JSON — use the UTF-8 text path.
    const decoded = JSON.parse(
      base64UrlDecodeText(payload),
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
