export interface SkillOption {
  id: number | string;
  name: string;
}

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
