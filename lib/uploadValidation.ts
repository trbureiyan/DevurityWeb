/**
 * Validación de archivos subidos por el usuario (banner, contenido .md, recursos).
 * Nunca confiar en el `Content-Type` que manda el cliente — siempre verificar los
 * primeros bytes del archivo ("magic bytes") antes de subir nada a Storage.
 *
 * @module uploadValidation
 */

export const MAX_MARKDOWN_BYTES = 2 * 1024 * 1024; // 2MB
export const MAX_BANNER_BYTES = 5 * 1024 * 1024; // 5MB
export const MAX_RESOURCE_BYTES = 10 * 1024 * 1024; // 10MB

export interface SniffedImage {
  mime: "image/png" | "image/jpeg" | "image/webp" | "image/gif";
  extension: "png" | "jpg" | "webp" | "gif";
}

// Verifica la firma de bytes real del archivo, ignorando el Content-Type declarado por el cliente.
export function sniffImage(bytes: Uint8Array): SniffedImage | null {
  if (bytes.length < 12) return null;

  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return { mime: "image/png", extension: "png" };
  }

  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { mime: "image/jpeg", extension: "jpg" };
  }

  if (
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  ) {
    return { mime: "image/webp", extension: "webp" };
  }

  if (
    bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38
  ) {
    return { mime: "image/gif", extension: "gif" };
  }

  return null;
}

export function isPdf(bytes: Uint8Array): boolean {
  return (
    bytes.length >= 4 &&
    bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46 // %PDF
  );
}

// Valida que el buffer sea texto UTF-8 sin bytes nulos (descarta binarios disfrazados de .md).
export function isValidMarkdownBuffer(bytes: Uint8Array): boolean {
  if (bytes.includes(0)) return false;
  try {
    new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return true;
  } catch {
    return false;
  }
}

export function hasMarkdownExtension(filename: string): boolean {
  const lower = filename.toLowerCase();
  return lower.endsWith(".md") || lower.endsWith(".markdown");
}
