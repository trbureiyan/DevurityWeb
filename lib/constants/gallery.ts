// Reglas de validación compartidas entre cliente (formulario de subida) y
// servidor (API route) para las imágenes de la galería.
export const GALLERY_MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
export const GALLERY_ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;
