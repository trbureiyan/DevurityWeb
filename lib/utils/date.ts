/**
 * Formatea una fecha ISO como cadena legible en español colombiano.
 *
 * @param isoDate - Cadena de fecha en formato ISO 8601 (ej. "2024-03-15T00:00:00.000Z").
 * @param style - Estilo del mes: "short" produce "mar.", "long" produce "marzo". Por defecto "short".
 * @returns Cadena formateada en es-CO con zona horaria UTC (ej. "15 de mar. de 2024").
 * @throws {RangeError} Si isoDate no puede ser interpretado como fecha válida.
 */
export function formatDateCO(
  isoDate: string,
  style: "short" | "long" = "short",
): string {
  return new Date(isoDate).toLocaleDateString("es-CO", {
    year: "numeric",
    month: style,
    day: "numeric",
    timeZone: "UTC",
  });
}
