export interface SkillOption {
  id: number | string;
  name: string;
}

/**
 * Normaliza un array heterogéneo de opciones de skill (objetos con `name` o strings)
 * a un array deduplicado de nombres de skill.
 *
 * Acepta `unknown` como entrada. Entradas que no son string ni objetos con
 * propiedad `name` de tipo string se descartan silenciosamente.
 * Los duplicados se eliminan manteniendo la primera aparición.
 *
 * @param value - Array de skills en formato API o strings, o cualquier otro valor.
 * @returns Array de nombres de skill únicos. Nunca lanza excepciones.
 */
export function skillNamesFromOptions(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  const names = value.flatMap((skill) => {
    if (typeof skill === "string") return [skill];
    if (
      typeof skill === "object" &&
      skill !== null &&
      "name" in skill &&
      typeof skill.name === "string"
    ) {
      return [skill.name];
    }
    return [];
  });

  return [...new Set(names)];
}
