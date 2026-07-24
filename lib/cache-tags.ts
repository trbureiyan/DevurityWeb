// Tags canónicos para invalidación bajo demanda con revalidateTag().
// Cada dominio de datos tiene un tag único — nunca strings mágicos dispersos.
export const CACHE_TAGS = {
  projects: "projects",
  updates:  "updates",
  team:     "team",
} as const;

// TTLs estándar del proyecto (en segundos).
export const CACHE_TTL = {
  medium: 60 * 60,      // 1 hora
  long:   60 * 60 * 6,  // 6 horas
} as const;

// En desarrollo, cada petición va directo a DB sin esperar expiración.
// Resuelve el problema de fixtures y seeds que no se reflejan en UI.
export const activeTTL = (ttl: number): number =>
  process.env.NODE_ENV === "development" ? 0 : ttl;
