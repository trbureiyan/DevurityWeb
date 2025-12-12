// Constantes de tiempo
export const TIME = {
  ONE_SECOND: 1000,
  ONE_MINUTE: 60 * 1000,
  ONE_HOUR: 60 * 60 * 1000,
  ONE_DAY: 24 * 60 * 60 * 1000,
  ONE_WEEK: 7 * 24 * 60 * 60 * 1000,
} as const;

// Constantes de validación de username
export const USERNAME = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 30,
  PATTERN: /^[a-z0-9][a-z0-9_-]*[a-z0-9]$/,
  ALLOWED_CHARS: /^[a-z0-9_-]+$/,
  CHANGE_COOLDOWN: TIME.ONE_WEEK,
} as const;

// Constantes de URLs
export const URL = {
  MAX_CUSTOM_WEBSITES: 3,
} as const;

// Constantes de límites de API
export const API_LIMITS = {
  MAX_SKILLS: 10,
  MAX_PROJECTS: 20,
  MAX_SOCIAL_LINKS: 10,
} as const;
