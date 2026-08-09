import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  validateRegistrationStep,
  parseBackendError,
  REGISTRATION_RULES,
  type RegistrationFormData,
} from "../lib/auth/register-validation";

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
  password: "Segura#123",
  confirmPassword: "Segura#123",
};

describe("validateRegistrationStep — Paso 0: Información Académica", () => {
  it("acepta semestre en el límite mínimo (1)", () => {
    assert.strictEqual(
      validateRegistrationStep(0, { ...VALID_STEP_0, semester: "1" }),
      null,
    );
  });

  it("acepta semestre en el límite máximo (13)", () => {
    assert.strictEqual(
      validateRegistrationStep(0, { ...VALID_STEP_0, semester: "13" }),
      null,
    );
  });

  it("rechaza semestre igual a 0", () => {
    const result = validateRegistrationStep(0, {
      ...VALID_STEP_0,
      semester: "0",
    });
    assert.ok(result !== null, "esperaba error para semestre 0");
    assert.match(result, /1.*13/);
  });

  it("rechaza semestre 14 (supera el máximo del backend)", () => {
    const result = validateRegistrationStep(0, {
      ...VALID_STEP_0,
      semester: "14",
    });
    assert.ok(result !== null, "esperaba error para semestre 14");
    assert.match(result, /1.*13/);
  });

  it("rechaza semestre 20 (valor incorrecto del frontend anterior)", () => {
    const result = validateRegistrationStep(0, {
      ...VALID_STEP_0,
      semester: "20",
    });
    assert.ok(result !== null);
  });

  it("rechaza semestre no numérico", () => {
    const result = validateRegistrationStep(0, {
      ...VALID_STEP_0,
      semester: "abc",
    });
    assert.ok(result !== null);
  });

  it("rechaza programa vacío", () => {
    const result = validateRegistrationStep(0, {
      ...VALID_STEP_0,
      program: "",
    });
    assert.ok(result !== null);
    assert.match(result, /programa/i);
  });

  it("rechaza programa de solo espacios", () => {
    const result = validateRegistrationStep(0, {
      ...VALID_STEP_0,
      program: "   ",
    });
    assert.ok(result !== null);
  });
});

describe("validateRegistrationStep — Paso 1: Perfil", () => {
  it("acepta motivación y habilidades válidas", () => {
    assert.strictEqual(validateRegistrationStep(1, VALID_STEP_1), null);
  });

  it("rechaza motivación vacía", () => {
    const result = validateRegistrationStep(1, {
      ...VALID_STEP_1,
      motivation: "",
    });
    assert.ok(result !== null);
    assert.match(result, /motivaci[oó]n/i);
  });

  it("rechaza motivación de solo espacios", () => {
    const result = validateRegistrationStep(1, {
      ...VALID_STEP_1,
      motivation: "   ",
    });
    assert.ok(result !== null);
  });

  it(`rechaza motivación que supera ${REGISTRATION_RULES.MAX_MOTIVATION_LENGTH} caracteres`, () => {
    const overLimit = "x".repeat(REGISTRATION_RULES.MAX_MOTIVATION_LENGTH + 1);
    const result = validateRegistrationStep(1, {
      ...VALID_STEP_1,
      motivation: overLimit,
    });
    assert.ok(result !== null);
    assert.match(result, /2000/);
  });

  it(`acepta motivación exactamente de ${REGISTRATION_RULES.MAX_MOTIVATION_LENGTH} caracteres`, () => {
    const atLimit = "x".repeat(REGISTRATION_RULES.MAX_MOTIVATION_LENGTH);
    assert.strictEqual(
      validateRegistrationStep(1, { ...VALID_STEP_1, motivation: atLimit }),
      null,
    );
  });

  it("rechaza cero habilidades seleccionadas", () => {
    const result = validateRegistrationStep(1, {
      ...VALID_STEP_1,
      skills: [],
    });
    assert.ok(result !== null);
    assert.match(result, /habilidad/i);
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
    assert.ok(result !== null);
  });
});

describe("validateRegistrationStep — Paso 2: Acceso", () => {
  it("acepta contraseña válida que cumple todos los requisitos", () => {
    assert.strictEqual(validateRegistrationStep(2, VALID_STEP_2), null);
  });

  it("rechaza contraseña vacía", () => {
    const result = validateRegistrationStep(2, {
      ...VALID_STEP_2,
      password: "",
      confirmPassword: "",
    });
    assert.ok(result !== null);
    assert.match(result, /contrase[ñn]a/i);
  });

  it("rechaza contraseña sin símbolo especial", () => {
    const result = validateRegistrationStep(2, {
      ...VALID_STEP_2,
      password: "Segura123",
      confirmPassword: "Segura123",
    });
    assert.ok(result !== null);
    assert.match(result, /s[íi]mbolos/i);
  });

  it("rechaza contraseña sin mayúscula", () => {
    const result = validateRegistrationStep(2, {
      ...VALID_STEP_2,
      password: "segura#123",
      confirmPassword: "segura#123",
    });
    assert.ok(result !== null);
  });

  it("rechaza contraseña sin número", () => {
    const result = validateRegistrationStep(2, {
      ...VALID_STEP_2,
      password: "Segura#abc",
      confirmPassword: "Segura#abc",
    });
    assert.ok(result !== null);
  });

  it("rechaza contraseña de menos de 8 caracteres", () => {
    const result = validateRegistrationStep(2, {
      ...VALID_STEP_2,
      password: "Seg#1",
      confirmPassword: "Seg#1",
    });
    assert.ok(result !== null);
  });

  it("rechaza cuando confirmPassword no coincide", () => {
    const result = validateRegistrationStep(2, {
      ...VALID_STEP_2,
      password: "Segura#123",
      confirmPassword: "Segura#999",
    });
    assert.ok(result !== null);
    assert.match(result, /no coinciden/i);
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
    assert.match(result, /1.*13/);
  });

  it("mapea correctamente campo Motivacion", () => {
    const result = parseBackendError({
      field: "Motivacion",
      code: "VALIDATION_ERROR",
      message: "La motivación es requerida",
    });
    assert.match(result, /motivaci/i);
  });

  it("mapea correctamente campo Contraseña", () => {
    const result = parseBackendError({
      field: "Contraseña",
      code: "VALIDATION_ERROR",
      message: "Contraseña inválida",
    });
    assert.match(result, /contrase/i);
  });

  it("usa fallback legacy cuando data.field no existe pero data.Error contiene campo conocido", () => {
    const result = parseBackendError({
      Error: "La motivación es requerida: Motivacion",
    });
    assert.match(result, /motivaci/i);
  });

  it("devuelve mensaje genérico cuando no hay mapeo", () => {
    const result = parseBackendError({
      Error: "Error desconocido sin campo conocido",
    });
    assert.match(result, /procesar/i);
  });

  it("devuelve mensaje genérico ante objeto vacío", () => {
    const result = parseBackendError({});
    assert.match(result, /procesar/i);
  });
});
