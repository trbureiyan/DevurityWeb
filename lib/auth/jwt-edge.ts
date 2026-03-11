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

    // Decode Base64url signature
    const sigBytes = Uint8Array.from(
      atob(signature.replace(/-/g, "+").replace(/_/g, "/")),
      (c) => c.charCodeAt(0),
    );

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
      atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
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
