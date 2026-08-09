import { describe, it } from "node:test";
import { match, ok, strictEqual } from "node:assert/strict";
import {
  validateRegistrationStep,
  parseBackendError,
  REGISTRATION_RULES,
  type RegistrationFormData,
} from "../lib/auth/register-validation";

const VALID_PASSWORD = "Segura#123";
const PASSWORD_WITHOUT_SPECIAL = "Segura123";
const PASSWORD_WITHOUT_UPPERCASE = "segura#123";
const PASSWORD_WITHOUT_NUMBER = "Segura#abc";
const SHORT_PASSWORD = "Seg#1";
const MISMATCHED_PASSWORD = "Segura#999";

// datos base válidos para cada paso
const VALID_STEP_0: RegistrationFormData = {
  semester: "3",
  motivation: "",
  program: "Ingeniería de Sistemas",
  skills: [],
  password: "",
  confirmPassword: "",
};

const VALID_STEP_1: RegistrationFormData = {
  semester: "3",
  motivation: "Quiero aprender ciberseguridad y contribuir al semillero.",
  program: "Ingeniería de Sistemas",
  skills: [{ id: 1, name: "Python" }],
  password: "",
  confirmPassword: "",
};

const VALID_STEP_2: RegistrationFormData = {
  semester: "3",
  motivation: "Quiero aprender ciberseguridad y contribuir al semillero.",
  program: "Ingeniería de Sistemas",
  skills: [{ id: 1, name: "Python" }],
  password: VALID_PASSWORD,
  confirmPassword: VALID_PASSWORD,
};

describe("validateRegistrationStep — Paso 0: Información Académica", () => {
  it("acepta semestre en el límite mínimo (1)", () => {
    strictEqual(
      validateRegistrationStep(0, { ...VALID_STEP_0, semester: "1" }),
      null,
    );
  });

  it("acepta semestre en el límite máximo (13)", () => {
    strictEqual(
      validateRegistrationStep(0, { ...VALID_STEP_0, semester: "13" }),
      null,
    );
  });

  it("rechaza semestre igual a 0", () => {
    const result = validateRegistrationStep(0, {
      ...VALID_STEP_0,
      semester: "0",
    });
    ok(result !== null, "esperaba error para semestre 0");
    match(result, /1.*13/);
  });

  it("rechaza semestre 14 (supera el máximo del backend)", () => {
    const result = validateRegistrationStep(0, {
      ...VALID_STEP_0,
      semester: "14",
    });
    ok(result !== null, "esperaba error para semestre 14");
    match(result, /1.*13/);
  });

  it("rechaza semestre 20 (valor incorrecto del frontend anterior)", () => {
    const result = validateRegistrationStep(0, {
      ...VALID_STEP_0,
      semester: "20",
    });
    ok(result !== null);
  });

  it("rechaza semestre no numérico", () => {
    const result = validateRegistrationStep(0, {
      ...VALID_STEP_0,
      semester: "abc",
    });
    ok(result !== null);
  });

  it("rechaza programa vacío", () => {
    const result = validateRegistrationStep(0, {
      ...VALID_STEP_0,
      program: "",
    });
    ok(result !== null);
    match(result, /programa/i);
  });

  it("rechaza programa de solo espacios", () => {
    const result = validateRegistrationStep(0, {
      ...VALID_STEP_0,
      program: "   ",
    });
    ok(result !== null);
  });
});

describe("validateRegistrationStep — Paso 1: Perfil", () => {
  it("acepta motivación y habilidades válidas", () => {
    strictEqual(validateRegistrationStep(1, VALID_STEP_1), null);
  });

  it("rechaza motivación vacía", () => {
    const result = validateRegistrationStep(1, {
      ...VALID_STEP_1,
      motivation: "",
    });
    ok(result !== null);
    match(result, /motivaci[oó]n/i);
  });

  it("rechaza motivación de solo espacios", () => {
    const result = validateRegistrationStep(1, {
      ...VALID_STEP_1,
      motivation: "   ",
    });
    ok(result !== null);
  });

  it(`rechaza motivación que supera ${REGISTRATION_RULES.MAX_MOTIVATION_LENGTH} caracteres`, () => {
    const overLimit = "x".repeat(REGISTRATION_RULES.MAX_MOTIVATION_LENGTH + 1);
    const result = validateRegistrationStep(1, {
      ...VALID_STEP_1,
      motivation: overLimit,
    });
    ok(result !== null);
    match(result, /2000/);
  });

  it(`acepta motivación exactamente de ${REGISTRATION_RULES.MAX_MOTIVATION_LENGTH} caracteres`, () => {
    const atLimit = "x".repeat(REGISTRATION_RULES.MAX_MOTIVATION_LENGTH);
    strictEqual(
      validateRegistrationStep(1, { ...VALID_STEP_1, motivation: atLimit }),
      null,
    );
  });

  it("rechaza cero habilidades seleccionadas", () => {
    const result = validateRegistrationStep(1, {
      ...VALID_STEP_1,
      skills: [],
    });
    ok(result !== null);
    match(result, /habilidad/i);
  });

  it(`rechaza más de ${REGISTRATION_RULES.MAX_SKILLS_COUNT} habilidades`, () => {
    const tooMany = Array.from({ length: REGISTRATION_RULES.MAX_SKILLS_COUNT + 1 }, (_, i) => ({
      id: i + 1,
      name: `Skill ${i + 1}`,
    }));
    const result = validateRegistrationStep(1, {
      ...VALID_STEP_1,
      skills: tooMany,
    });
    ok(result !== null);
  });
});

describe("validateRegistrationStep — Paso 2: Acceso", () => {
  it("acepta contraseña válida que cumple todos los requisitos", () => {
    strictEqual(validateRegistrationStep(2, VALID_STEP_2), null);
  });

  it("rechaza contraseña vacía", () => {
    const result = validateRegistrationStep(2, {
      ...VALID_STEP_2,
      password: "",
      confirmPassword: "",
    });
    ok(result !== null);
    match(result, /contrase[ñn]a/i);
  });

  it("rechaza contraseña sin símbolo especial", () => {
    const result = validateRegistrationStep(2, {
      ...VALID_STEP_2,
      password: PASSWORD_WITHOUT_SPECIAL,
      confirmPassword: PASSWORD_WITHOUT_SPECIAL,
    });
    ok(result !== null);
    match(result, /s[íi]mbolos/i);
  });

  it("rechaza contraseña sin mayúscula", () => {
    const result = validateRegistrationStep(2, {
      ...VALID_STEP_2,
      password: PASSWORD_WITHOUT_UPPERCASE,
      confirmPassword: PASSWORD_WITHOUT_UPPERCASE,
    });
    ok(result !== null);
  });

  it("rechaza contraseña sin número", () => {
    const result = validateRegistrationStep(2, {
      ...VALID_STEP_2,
      password: PASSWORD_WITHOUT_NUMBER,
      confirmPassword: PASSWORD_WITHOUT_NUMBER,
    });
    ok(result !== null);
  });

  it("rechaza contraseña de menos de 8 caracteres", () => {
    const result = validateRegistrationStep(2, {
      ...VALID_STEP_2,
      password: SHORT_PASSWORD,
      confirmPassword: SHORT_PASSWORD,
    });
    ok(result !== null);
  });

  it("rechaza cuando confirmPassword no coincide", () => {
    const result = validateRegistrationStep(2, {
      ...VALID_STEP_2,
      password: VALID_PASSWORD,
      confirmPassword: MISMATCHED_PASSWORD,
    });
    ok(result !== null);
    match(result, /no coinciden/i);
  });
});

describe("parseBackendError — mapeo de respuestas del API", () => {
  it("mapea por data.field cuando existe", () => {
    const result = parseBackendError({
      field: "semestre",
      code: "VALIDATION_ERROR",
      message: "Semestre no válido. Debe ser un número entero entre 1 y 13",
      Error: "Semestre no válido. Debe ser un número entero entre 1 y 13: semestre",
    });
    match(result, /1.*13/);
  });

  it("mapea correctamente campo Motivacion", () => {
    const result = parseBackendError({
      field: "Motivacion",
      code: "VALIDATION_ERROR",
      message: "La motivación es requerida",
    });
    match(result, /motivaci/i);
  });

  it("mapea correctamente campo Contraseña", () => {
    const result = parseBackendError({
      field: "Contraseña",
      code: "VALIDATION_ERROR",
      message: "Contraseña inválida",
    });
    match(result, /contrase/i);
  });

  it("usa fallback legacy cuando data.field no existe pero data.Error contiene campo conocido", () => {
    const result = parseBackendError({
      Error: "La motivación es requerida: Motivacion",
    });
    match(result, /motivaci/i);
  });

  it("devuelve mensaje genérico cuando no hay mapeo", () => {
    const result = parseBackendError({
      Error: "Error desconocido sin campo conocido",
    });
    match(result, /procesar/i);
  });

  it("devuelve mensaje genérico ante objeto vacío", () => {
    const result = parseBackendError({});
    match(result, /procesar/i);
  });
});
