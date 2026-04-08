export const normalizeSpace = (str: string): string => {
  return str.trim().replace(/\s+/g, "_");
};
