/**
 * Reglas de negocio y validación pura del registro académico de Devurity.
 * Este módulo es cliente-safe — no importa Prisma ni bcrypt.
 * Lo consumen: el wizard de registro, los tests unitarios y el backend (referencia).
 */

// constantes del negocio que deben ser idénticas al backend route.ts
export const REGISTRATION_RULES = {
  MIN_SEMESTER: 1,
  MAX_SEMESTER: 13,
  MAX_MOTIVATION_LENGTH: 2000,
  MAX_SKILLS_COUNT: 20,
  PASSWORD_MIN_LENGTH: 8,
} as const;

export type Skill = {
  id: number;
  name: string;
};

export type RegistrationFormData = {
  semester: string;
  motivation: string;
  program: string;
  skills: Skill[];
  password: string;
  confirmPassword: string;
};

// regex idéntico a lib/regex.ts:isValidPassword para no divergir
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~]).{8,}$/;

/**
 * Valida un paso específico del wizard de registro académico.
 * @returns null si el paso es válido, string con el mensaje de error si no.
 */
export function validateRegistrationStep(
  step: 0 | 1 | 2,
  data: RegistrationFormData,
): string | null {
  if (step === 0) {
    const s = parseInt(data.semester, 10);
    if (
      isNaN(s) ||
      s < REGISTRATION_RULES.MIN_SEMESTER ||
      s > REGISTRATION_RULES.MAX_SEMESTER
    ) {
      return `El semestre debe estar entre ${REGISTRATION_RULES.MIN_SEMESTER} y ${REGISTRATION_RULES.MAX_SEMESTER}.`;
    }
    if (!data.program.trim()) {
      return "El programa académico es requerido.";
    }
  }

  if (step === 1) {
    if (!data.motivation.trim()) {
      return "La motivación es requerida.";
    }
    if (data.motivation.length > REGISTRATION_RULES.MAX_MOTIVATION_LENGTH) {
      return `La motivación no puede exceder ${REGISTRATION_RULES.MAX_MOTIVATION_LENGTH} caracteres.`;
    }
    if (data.skills.length === 0) {
      return "Debes seleccionar al menos una habilidad.";
    }
    if (data.skills.length > REGISTRATION_RULES.MAX_SKILLS_COUNT) {
      return `Puedes seleccionar máximo ${REGISTRATION_RULES.MAX_SKILLS_COUNT} habilidades.`;
    }
  }

  if (step === 2) {
    if (!data.password) {
      return "La contraseña es requerida.";
    }
    if (!PASSWORD_REGEX.test(data.password)) {
      return "La contraseña debe tener mínimo 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos especiales.";
    }
    if (data.password !== data.confirmPassword) {
      return "Las contraseñas no coinciden.";
    }
  }

  return null;
}

/**
 * Mapea el campo devuelto por el backend (data.field) a un mensaje legible de usuario.
 * Usa el contrato estable de errorRequest() — lee data.field, no data.Error.
 */
export const BACKEND_ERROR_FIELD_MAP: Record<string, string> = {
  semestre:
    `El semestre debe estar entre ${REGISTRATION_RULES.MIN_SEMESTER} y ${REGISTRATION_RULES.MAX_SEMESTER}.`,
  Motivacion: "La motivación ingresada no es válida. Verifica el contenido.",
  Contraseña:
    "La contraseña no cumple los requisitos de seguridad.",
  habilidades:
    "Error con las habilidades seleccionadas. Verifica e intenta nuevamente.",
  programa: "El programa seleccionado no es válido. Selecciónalo de la lista oficial.",
  registro: "Error en el proceso de registro. Por favor intenta nuevamente.",
  Usuario: "Error al crear el usuario. Por favor intenta más tarde.",
};

/**
 * Extrae el mensaje de error legible de una respuesta del backend.
 * Prioriza data.field (contrato nuevo), cae en data.Error legacy si no existe.
 */
export function parseBackendError(data: Record<string, unknown>): string {
  const field = typeof data.field === "string" ? data.field : null;
  if (field && BACKEND_ERROR_FIELD_MAP[field]) {
    return BACKEND_ERROR_FIELD_MAP[field];
  }
  // fallback legacy — en transición hasta que todos los endpoints usen contrato nuevo
  const errorStr = typeof data.Error === "string" ? data.Error : null;
  if (errorStr) {
    // el formato generado por errorRequest es "mensaje: campo" — extraemos solo el sufijo
    const colonIndex = errorStr.lastIndexOf(": ");
    const extractedField = colonIndex !== -1 ? errorStr.slice(colonIndex + 2).trim() : "";
    if (extractedField && BACKEND_ERROR_FIELD_MAP[extractedField]) {
      return BACKEND_ERROR_FIELD_MAP[extractedField];
    }
  }
  return "Error al procesar la solicitud. Por favor intenta nuevamente.";
}
