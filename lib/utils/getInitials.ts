/**
 * Extrae iniciales de un nombre completo o de nombre + apellido separados.
 *
 * @param name - Nombre completo (ej. "Juan Pérez") o solo nombre.
 * @param lastName - Apellido opcional. Si se provee, se usa en vez de dividir `name`.
 * @returns Iniciales en mayúsculas (máx 2 caracteres).
 *
 * @example
 * getInitials("Juan Pérez")        // "JP"
 * getInitials("Juan", "Pérez")     // "JP"
 * getInitials("Ana")               // "AN"
 * getInitials("")                  // "?"
 */
export function getInitials(name: string, lastName?: string): string {
  if (lastName !== undefined) {
    const ln = lastName.trim();
    if (ln.length > 0) {
      return `${name.charAt(0).toUpperCase()}${ln.charAt(0).toUpperCase()}`;
    }
    // lastName vacío tras trim — caer al layout de nombre completo
  }

  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
