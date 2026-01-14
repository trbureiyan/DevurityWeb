export const normalizeSpace = (str: string): string => {
  return str.replace(/\s+/g, "_").trim();
};
