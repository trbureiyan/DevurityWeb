// Tags canónicos para invalidación bajo demanda con revalidateTag().
// Cada dominio de datos tiene un tag único — nunca strings mágicos dispersos.
export const CACHE_TAGS = {
  projects: "projects",
  updates:  "updates",
  team:     "team",
  gallery:  "gallery",
} as const;

// TTLs estándar del proyecto (en segundos).
export const CACHE_TTL = {
  medium: 60 * 60,      // 1 hora
  long:   60 * 60 * 6,  // 6 horas
} as const;

/**
 * En desarrollo retorna `false` para desactivar la revalidación por tiempo
 * (cada petición va directo a DB sin esperar expiración), resolviendo el
 * problema de fixtures y seeds que no se reflejan en la UI.
 *
 * En producción/test retorna el `ttl` recibido intacto.
 *
 * @param ttl - Tiempo de vida en segundos (ej. CACHE_TTL.medium = 3600).
 * @returns `false` en desarrollo, el valor `ttl` original en otros entornos.
 * @throws Nunca — siempre retorna un valor válido para `unstable_cache`.
 */
export const activeTTL = (ttl: number): number | false =>
  process.env.NODE_ENV === "development" ? false : ttl;
