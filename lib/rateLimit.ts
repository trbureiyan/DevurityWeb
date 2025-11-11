/**
 * Rate Limiter para prevenir abuso del sistema
 * Limita las solicitudes por IP en una ventana de tiempo específica
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// Map para almacenar los intentos por IP
const ipRequestMap = new Map<string, RateLimitEntry>();

// Configuración del rate limiter
const RATE_LIMIT_CONFIG = {
  maxRequests: 3, // Máximo de solicitudes permitidas
  windowMs: 30 * 24 * 60 * 60 * 1000, // Ventana de tiempo: 1 mes (30 días)
};

/**
 * Limpia las entradas expiradas del mapa
 * Se ejecuta cada vez que se verifica el rate limit
 */
function cleanExpiredEntries() {
  const now = Date.now();
  for (const [ip, entry] of ipRequestMap.entries()) {
    if (now > entry.resetTime) {
      ipRequestMap.delete(ip);
    }
  }
}

/**
 * Obtiene la IP del cliente desde los headers de la request
 * Maneja proxies y cloudflare
 */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  // Prioridad: CF-Connecting-IP > X-Real-IP > X-Forwarded-For > fallback
  if (cfConnectingIp) return cfConnectingIp;
  if (realIp) return realIp;
  if (forwardedFor) {
    // X-Forwarded-For puede contener múltiples IPs, tomamos la primera
    return forwardedFor.split(",")[0].trim();
  }

  return "unknown";
}

/**
 * Verifica si una IP ha excedido el límite de solicitudes
 * @param ip - Dirección IP del cliente
 * @returns objeto con isLimited (boolean) y detalles del límite
 */
export function checkRateLimit(ip: string): {
  isLimited: boolean;
  remaining: number;
  resetTime: number;
} {
  // Limpiar entradas expiradas periódicamente
  if (ipRequestMap.size > 1000) {
    cleanExpiredEntries();
  }

  const now = Date.now();
  const entry = ipRequestMap.get(ip);

  // Si no existe entrada o ya expiró, crear una nueva
  if (!entry || now > entry.resetTime) {
    const resetTime = now + RATE_LIMIT_CONFIG.windowMs;
    ipRequestMap.set(ip, { count: 1, resetTime });
    return {
      isLimited: false,
      remaining: RATE_LIMIT_CONFIG.maxRequests - 1,
      resetTime,
    };
  }

  // Si ya alcanzó el límite
  if (entry.count >= RATE_LIMIT_CONFIG.maxRequests) {
    return {
      isLimited: true,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  // Incrementar contador
  entry.count++;
  ipRequestMap.set(ip, entry);

  return {
    isLimited: false,
    remaining: RATE_LIMIT_CONFIG.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Formatea el tiempo restante en un formato legible
 */
export function formatResetTime(resetTime: number): string {
  const now = Date.now();
  const diff = resetTime - now;

  if (diff <= 0) return "ahora";

  const minutes = Math.ceil(diff / (60 * 1000));
  if (minutes < 60) {
    return `${minutes} minuto${minutes !== 1 ? "s" : ""}`;
  }

  const hours = Math.ceil(diff / (60 * 60 * 1000));
  return `${hours} hora${hours !== 1 ? "s" : ""}`;
}
