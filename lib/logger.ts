/**
 * Sistema de logging seguro para producción
 * 
 * SEGURIDAD: Este módulo filtra información sensible en producción
 * para evitar la exposición de tokens, IDs de usuario, emails, etc.
 */

const isProduction = process.env.NODE_ENV === "production";

// Patrones de datos sensibles que no deben loguearse
const sensitivePatterns = [
  /token/i,
  /password/i,
  /secret/i,
  /key/i,
  /auth/i,
  /cookie/i,
  /session/i,
  /credential/i,
];

// Función para sanitizar mensajes
function sanitizeMessage(message: string): string {
  if (!isProduction) return message;
  
  // Ocultar emails
  let sanitized = message.replace(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    "[EMAIL_REDACTED]"
  );
  
  // Ocultar tokens JWT (formato típico)
  sanitized = sanitized.replace(
    /eyJ[a-zA-Z0-9_-]*\.eyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*/g,
    "[JWT_REDACTED]"
  );
  
  // Ocultar IDs numéricos largos
  sanitized = sanitized.replace(
    /\b\d{10,}\b/g,
    "[ID_REDACTED]"
  );
  
  return sanitized;
}

// Función para verificar si un mensaje contiene datos sensibles
// Exportada para uso en validaciones externas
export function containsSensitiveData(message: string): boolean {
  return sensitivePatterns.some(pattern => pattern.test(message));
}

export const logger = {
  /**
   * Log de información general - solo en desarrollo
   */
  info: (message: string, ...args: unknown[]): void => {
    if (!isProduction) {
      console.log(`[INFO] ${message}`, ...args);
    }
  },

  /**
   * Log de debug - solo en desarrollo
   */
  debug: (message: string, ...args: unknown[]): void => {
    if (!isProduction) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  },

  /**
   * Log de advertencia - siempre, pero sanitizado en producción
   */
  warn: (message: string, ...args: unknown[]): void => {
    const sanitized = sanitizeMessage(message);
    console.warn(`[WARN] ${sanitized}`, isProduction ? "" : args);
  },

  /**
   * Log de error - siempre, pero sin detalles sensibles en producción
   */
  error: (message: string, error?: unknown): void => {
    const sanitized = sanitizeMessage(message);
    
    if (isProduction) {
      // En producción, solo loguear mensaje genérico y tipo de error
      const errorType = error instanceof Error ? error.name : "Unknown";
      console.error(`[ERROR] ${sanitized} - Type: ${errorType}`);
    } else {
      // En desarrollo, mostrar todo para debugging
      console.error(`[ERROR] ${message}`, error);
    }
  },

  /**
   * Log de auditoría de seguridad - siempre registrar pero sin datos sensibles
   */
  security: (event: string, details?: Record<string, unknown>): void => {
    const timestamp = new Date().toISOString();
    const sanitizedEvent = sanitizeMessage(event);
    
    // En producción, no incluir detalles que puedan contener datos sensibles
    if (isProduction) {
      console.log(`[SECURITY] ${timestamp} - ${sanitizedEvent}`);
    } else {
      console.log(`[SECURITY] ${timestamp} - ${sanitizedEvent}`, details || "");
    }
  },
};

export default logger;
