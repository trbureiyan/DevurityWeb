import { NextRequest } from "next/server";
import { validateToken } from "@/lib/jwt";
import { errorRequest } from "@/lib/error";
import { logger } from "@/lib/logger";
import { randomUUID } from "crypto";
import { Prisma } from "@/lib/generated/prisma";
import { JsonWebTokenError, TokenExpiredError, NotBeforeError } from "jsonwebtoken";
import {
  createUser,
  existUserByEmail,
} from "@/repositories/users/users.repositories";
import { bcryptAdapter } from "@/lib/bcrypt";
import { isValidPassword } from "@/lib/regex";
import { programExists } from "@/repositories/programs/programs.repositories";
import { getSkillById } from "@/repositories/skills/skills.repositories";

/**
 * Registro via token firmado
 * - GET: valida JWT (integridad/expiración), revisa si el email ya existe y devuelve datos mínimos para el formulario
 * - POST: revalida el token una sola vez, valida payload (semestre/programa/motivación/password/habilidades), comprueba existencia de programa y skills, evita duplicados y crea el usuario con password hasheado
 * - Respuestas específicas 422/409/500 y logging con requestId + métricas de tiempo para trazabilidad
 */
interface Params {
  params: Promise<{
    tokenRegister: string;
  }>;
}

interface TokenPayload {
  email: string;
  name: string;
  lastname: string;
  exp: number;
}

// Constantes de validación
const MAX_NAME_LENGTH = 100;
const MAX_MOTIVATION_LENGTH = 2000;
const MAX_SKILLS_COUNT = 20;

// Helper para validar el payload del token
function validateTokenPayload(payload: unknown, requestId: string): payload is TokenPayload {
  if (!payload || typeof payload !== "object") {
    logger.warn(`[${requestId}] Invalid token payload - not an object`);
    return false;
  }

  const p = payload as Partial<TokenPayload>;

  // Validar email
  if (!p.email || typeof p.email !== "string" || p.email.trim().length === 0) {
    logger.warn(`[${requestId}] Invalid token payload - invalid email`);
    return false;
  }

  // Validar name
  if (!p.name || typeof p.name !== "string" || p.name.trim().length === 0) {
    logger.warn(`[${requestId}] Invalid token payload - invalid name`);
    return false;
  }

  if (p.name.length > MAX_NAME_LENGTH) {
    logger.warn(`[${requestId}] Invalid token payload - name too long`, { length: p.name.length });
    return false;
  }

  // Validar lastname
  if (!p.lastname || typeof p.lastname !== "string" || p.lastname.trim().length === 0) {
    logger.warn(`[${requestId}] Invalid token payload - invalid lastname`);
    return false;
  }

  if (p.lastname.length > MAX_NAME_LENGTH) {
    logger.warn(`[${requestId}] Invalid token payload - lastname too long`, { length: p.lastname.length });
    return false;
  }

  // Validar exp
  if (!p.exp || typeof p.exp !== "number") {
    logger.warn(`[${requestId}] Invalid token payload - invalid exp`);
    return false;
  }

  return true;
}

export async function GET(req: NextRequest, { params }: Params) {
  const requestId = req.headers.get("x-request-id") || randomUUID();
  const startTime = Date.now();
  const { tokenRegister: token } = await params;
  
  logger.info(`[${requestId}] GET /register/[token] - Validating registration token`);
  
  try {
    const payload = await validateToken(token);
    const timeUnixNow = Math.floor(Date.now() / 1000);
    
    // Validar estructura del payload
    if (!validateTokenPayload(payload, requestId)) {
      logger.security(`Invalid token payload structure in GET`, { requestId });
      return new Response(
        JSON.stringify(
          errorRequest("registro", "Token de registro inválido"),
        ),
        { status: 422, headers: { "Content-Type": "application/json" } },
      );
    }

    const { email, name, exp } = payload;
    
    logger.debug(`[${requestId}] Token validated - exp: ${exp}, timeNow: ${timeUnixNow}`);
    
    // Verificar expiración (eliminando race condition al tomar timeUnixNow después de validar)
    if (timeUnixNow > exp) {
      logger.security(`Token expired during GET validation`, { requestId });
      return new Response(
        JSON.stringify(
          errorRequest("registro", "El token de registro ha expirado"),
        ),
        { status: 422, headers: { "Content-Type": "application/json" } },
      );
    }
    
    if (await existUserByEmail(email)) {
      logger.warn(`[${requestId}] User already exists`, { status: 409 });
      return new Response(
        JSON.stringify(
          errorRequest("registro", "Ya existe un usuario con este correo."),
        ),
        { status: 409, headers: { "Content-Type": "application/json" } },
      );
    }

    const duration = Date.now() - startTime;
    logger.info(`[${requestId}] GET succeeded - duration: ${duration}ms`);
    
    return new Response(
      JSON.stringify({
        email,
        name,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (e) {
    const duration = Date.now() - startTime;
    
    // Manejo específico de errores JWT
    if (e instanceof TokenExpiredError) {
      logger.security(`Token expired (JWT) in GET`, { requestId, duration });
      return new Response(
        JSON.stringify(
          errorRequest("registro", "El token de registro ha expirado"),
        ),
        { status: 422, headers: { "Content-Type": "application/json" } },
      );
    }
    
    if (e instanceof JsonWebTokenError) {
      logger.security(`Invalid JWT in GET`, { requestId, errorType: e.name, duration });
      return new Response(
        JSON.stringify(
          errorRequest("registro", "Token de registro inválido"),
        ),
        { status: 422, headers: { "Content-Type": "application/json" } },
      );
    }
    
    if (e instanceof NotBeforeError) {
      logger.security(`Token not yet valid in GET`, { requestId, duration });
      return new Response(
        JSON.stringify(
          errorRequest("registro", "Token de registro aún no es válido"),
        ),
        { status: 422, headers: { "Content-Type": "application/json" } },
      );
    }
    
    // Error genérico
    const errorName = e instanceof Error ? e.name : "Unknown";
    logger.error(`[${requestId}] GET failed - status: 422, error: ${errorName}`, e);
    
    return new Response(
      JSON.stringify(
        errorRequest("registro", "Error al validar el token de registro"),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function POST(req: NextRequest, { params }: Params) {
  const requestId = req.headers.get("x-request-id") || randomUUID();
  const startTime = Date.now();
  const { tokenRegister: token } = await params;
  let payload: TokenPayload;

  logger.info(`[${requestId}] POST /register/[token] - Starting registration process`);

  // Validar token (una sola vez)
  const tokenValidationStart = Date.now();
  try {
    const rawPayload = await validateToken(token);
    const timeUnixNow = Math.floor(Date.now() / 1000);
    const tokenValidationTime = Date.now() - tokenValidationStart;
    
    // Validar estructura del payload
    if (!validateTokenPayload(rawPayload, requestId)) {
      logger.security(`Invalid token payload structure during registration`, { requestId, duration: tokenValidationTime });
      return new Response(
        JSON.stringify(
          errorRequest("registro", "Token de registro inválido"),
        ),
        { status: 422, headers: { "Content-Type": "application/json" } },
      );
    }

    payload = rawPayload;
    
    logger.debug(`[${requestId}] Token validated - exp: ${payload.exp}, timeNow: ${timeUnixNow}, duration: ${tokenValidationTime}ms`);
    
    // Verificar expiración
    if (timeUnixNow > payload.exp) {
      logger.security(`Token expired during registration`, { requestId });
      return new Response(
        JSON.stringify(
          errorRequest("registro", "El token de registro ha expirado"),
        ),
        { status: 422, headers: { "Content-Type": "application/json" } },
      );
    }
  } catch (error) {
    const tokenValidationTime = Date.now() - tokenValidationStart;
    
    // Manejo específico de errores JWT
    if (error instanceof TokenExpiredError) {
      logger.security(`Token expired (JWT) during registration`, { requestId, duration: tokenValidationTime });
      return new Response(
        JSON.stringify(
          errorRequest("registro", "El token de registro ha expirado"),
        ),
        { status: 422, headers: { "Content-Type": "application/json" } },
      );
    }
    
    if (error instanceof JsonWebTokenError) {
      logger.security(`Invalid JWT during registration`, { requestId, errorType: error.name, duration: tokenValidationTime });
      return new Response(
        JSON.stringify(
          errorRequest("registro", "Token de registro inválido"),
        ),
        { status: 422, headers: { "Content-Type": "application/json" } },
      );
    }
    
    if (error instanceof NotBeforeError) {
      logger.security(`Token not yet valid during registration`, { requestId, duration: tokenValidationTime });
      return new Response(
        JSON.stringify(
          errorRequest("registro", "Token de registro aún no es válido"),
        ),
        { status: 422, headers: { "Content-Type": "application/json" } },
      );
    }
    
    const errorName = error instanceof Error ? error.name : "Unknown";
    logger.security(`Token validation failed during registration`, { requestId, errorName, duration: tokenValidationTime });
    logger.error(`[${requestId}] Token validation failed - status: 422, error: ${errorName}`, error);
    
    return new Response(
      JSON.stringify(
        errorRequest("registro", "Error al validar el token de registro"),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const { name, email, lastname } = payload;

  let requestBody;
  try {
    requestBody = await req.json();
    logger.debug(`[${requestId}] Request body parsed - keys: ${Object.keys(requestBody).join(", ")}`);
  } catch (error) {
    const errorName = error instanceof Error ? error.name : "Unknown";
    logger.error(`[${requestId}] Invalid JSON in request body - status: 422, error: ${errorName}`, error);
    return new Response(
      JSON.stringify(errorRequest("", "Datos de registro inválidos")),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const { semester, motivation, skills, password, program } = requestBody;

  // Validar que todos los campos estén presentes
  const fieldsMissing = {
    semester: !semester,
    motivation: !motivation,
    skills: skills === undefined,
    password: !password,
    program: !program,
  };
  
  if (Object.values(fieldsMissing).some(missing => missing)) {
    logger.warn(`[${requestId}] Missing required fields - status: 422`, { fieldsMissing });
    return new Response(
      JSON.stringify(errorRequest("", "Rellena todos los campos para el registro")),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Validar que skills sea un array
  if (!Array.isArray(skills)) {
    logger.warn(`[${requestId}] Skills is not an array - status: 422`, { skillsType: typeof skills });
    return new Response(
      JSON.stringify(
        errorRequest("habilidades", "El formato de habilidades no es válido")
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Validar que el array no esté vacío
  if (skills.length === 0) {
    logger.warn(`[${requestId}] Skills array is empty - status: 422`);
    return new Response(
      JSON.stringify(
        errorRequest("habilidades", "Debes seleccionar al menos una habilidad")
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Validar límite máximo de skills
  if (skills.length > MAX_SKILLS_COUNT) {
    logger.warn(`[${requestId}] Too many skills - status: 422`, { skillsCount: skills.length, max: MAX_SKILLS_COUNT });
    return new Response(
      JSON.stringify(
        errorRequest("habilidades", `Puedes seleccionar máximo ${MAX_SKILLS_COUNT} habilidades`)
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Validar que todos los elementos sean números válidos
  const invalidSkills = skills.filter((skill: unknown) => {
    const skillNum = skill as number;
    return !Number.isInteger(skillNum) || skillNum <= 0;
  });
  if (invalidSkills.length > 0) {
    logger.warn(`[${requestId}] Invalid skill IDs - status: 422`, { invalidCount: invalidSkills.length });
    return new Response(
      JSON.stringify(
        errorRequest("habilidades", "Los IDs de habilidades deben ser números enteros positivos")
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Validar duplicados
  const uniqueSkills = new Set(skills);
  if (uniqueSkills.size !== skills.length) {
    logger.warn(`[${requestId}] Duplicate skills detected - status: 422`, { total: skills.length, unique: uniqueSkills.size });
    return new Response(
      JSON.stringify(
        errorRequest("habilidades", "No puedes seleccionar habilidades duplicadas")
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Verificar que todas las skills existan en la base de datos
  const skillValidationStart = Date.now();
  try {
    const skillChecks = await Promise.all(
      skills.map((skillId: number) => getSkillById(skillId))
    );
    const skillValidationTime = Date.now() - skillValidationStart;
    
    const nonExistentSkills = skills.filter((_: number, index: number) => !skillChecks[index]);
    
    logger.debug(`[${requestId}] Skills validation - duration: ${skillValidationTime}ms`);
    
    if (nonExistentSkills.length > 0) {
      logger.warn(`[${requestId}] Non-existent skills - status: 422`, { nonExistentCount: nonExistentSkills.length });
      return new Response(
        JSON.stringify(
          errorRequest("habilidades", "Algunas habilidades seleccionadas no existen")
        ),
        {
          status: 422,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } catch (error) {
    const skillValidationTime = Date.now() - skillValidationStart;
    const errorName = error instanceof Error ? error.name : "Unknown";
    logger.error(`[${requestId}] Error validating skills - status: 500, error: ${errorName}, duration: ${skillValidationTime}ms`, error);
    return new Response(
      JSON.stringify(
        errorRequest("habilidades", "Error al validar las habilidades")
      ),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Validaciones
  if (!Number.isInteger(semester) || semester < 1 || semester > 13) {
    logger.warn(`[${requestId}] Invalid semester - status: 422`, { semester, semesterType: typeof semester, isInteger: Number.isInteger(semester) });
    return new Response(
      JSON.stringify(
        errorRequest(
          "semestre",
          "Semestre no válido. Debe ser un número entero entre 1 y 13",
        ),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (!program || typeof program !== "string" || program.trim().length === 0) {
    logger.warn(`[${requestId}] Invalid program - status: 422`, { programType: typeof program, programEmpty: !program });
    return new Response(
      JSON.stringify(
        errorRequest(
          "programa",
          "Programa no válido. Selecciona un programa de la lista",
        ),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const normalizedProgram = program.trim();

  const programExistsStart = Date.now();
  const programFound = await programExists(normalizedProgram);
  const programExistsTime = Date.now() - programExistsStart;
  
  logger.debug(`[${requestId}] Program validation - found: ${programFound}, duration: ${programExistsTime}ms`);
  
  if (!programFound) {
    logger.warn(`[${requestId}] Program not found - status: 422`, { program: normalizedProgram });
    return new Response(
      JSON.stringify(
        errorRequest(
          "programa",
          "El programa seleccionado no existe. Por favor, selecciona uno de la lista",
        ),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (!motivation || typeof motivation !== "string" || motivation.trim().length === 0) {
    logger.warn(`[${requestId}] Empty motivation - status: 422`, { motivationLength: motivation?.length || 0 });
    return new Response(
      JSON.stringify(
        errorRequest(
          "Motivacion",
          "La motivación es requerida. Por favor explica tu motivación para ingresar al semillero",
        ),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (motivation.length > MAX_MOTIVATION_LENGTH) {
    logger.warn(`[${requestId}] Motivation too long - status: 422`, { motivationLength: motivation.length, max: MAX_MOTIVATION_LENGTH });
    return new Response(
      JSON.stringify(
        errorRequest(
          "Motivacion",
          `La motivación no puede exceder ${MAX_MOTIVATION_LENGTH} caracteres`,
        ),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (!password) {
    logger.warn(`[${requestId}] Empty password - status: 422`);
    return new Response(
      JSON.stringify(
        errorRequest("Contraseña", "Por favor rellena el campo: "),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (!isValidPassword(password)) {
    logger.warn(`[${requestId}] Invalid password format - status: 422`, { passwordLength: password.length });
    return new Response(
      JSON.stringify(
        errorRequest(
          "Contraseña",
          "Debe tener mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número. Verifica tu ",
        ),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Verificar si el usuario ya existe
  const existUserStart = Date.now();
  try {
    const userExists = await existUserByEmail(email);
    const existUserTime = Date.now() - existUserStart;
    
    logger.debug(`[${requestId}] User existence check - exists: ${userExists}, duration: ${existUserTime}ms`);
    
    if (userExists) {
      logger.warn(`[${requestId}] User already exists - status: 409`);
      return new Response(
        JSON.stringify(
          errorRequest("registro", "Ya existe un usuario con este correo."),
        ),
        { status: 409, headers: { "Content-Type": "application/json" } },
      );
    }
  } catch (error) {
    const existUserTime = Date.now() - existUserStart;
    const errorName = error instanceof Error ? error.name : "Unknown";
    logger.error(`[${requestId}] Error checking existing user - status: 500, error: ${errorName}, duration: ${existUserTime}ms`, error);
    return new Response(
      JSON.stringify(
        errorRequest("registro", "Error al verificar usuario existente"),
      ),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Crear usuario
  const createUserStart = Date.now();
  try {
    logger.info(`[${requestId}] Creating user`, {
      semester,
      skillsCount: skills.length,
      motivationLength: motivation.length,
      program: normalizedProgram,
    });
    
    // Hash password de forma asíncrona para no bloquear el event loop
    const hashedPassword = bcryptAdapter.hash(password);
    
    await createUser({
      name: name,
      email: email.toLowerCase(),
      last_name: lastname,
      password: hashedPassword,
      semester,
      skills,
      motivation,
      program: normalizedProgram,
    });

    const createUserTime = Date.now() - createUserStart;
    const totalDuration = Date.now() - startTime;
    
    logger.info(`[${requestId}] User created successfully - createUserTime: ${createUserTime}ms, totalDuration: ${totalDuration}ms`);

    return new Response(
      JSON.stringify({
        message:
          "Tu registro ha sido completado, un administrador validara tu peticion para aprobarte o rechazarte al semillero. Este pendiente de tu correo.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (e) {
    const createUserTime = Date.now() - createUserStart;
    const totalDuration = Date.now() - startTime;
    const errorName = e instanceof Error ? e.name : "Unknown";
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    
    // Manejo específico de errores Prisma
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      logger.error(`[${requestId}] Prisma error creating user - code: ${e.code}, status: 409, createUserTime: ${createUserTime}ms`, e);
      
      // P2002: Unique constraint violation
      if (e.code === "P2002") {
        const field = (e.meta?.target as string[])?.join(", ") || "campo";
        return new Response(
          JSON.stringify(
            errorRequest("registro", `Ya existe un usuario con este ${field}.`),
          ),
          { status: 409, headers: { "Content-Type": "application/json" } },
        );
      }
      
      // P2003: Foreign key constraint violation
      if (e.code === "P2003") {
        return new Response(
          JSON.stringify(
            errorRequest("registro", "Datos de referencia inválidos. Verifica el programa y habilidades."),
          ),
          { status: 422, headers: { "Content-Type": "application/json" } },
        );
      }
    }
    
    logger.error(`[${requestId}] Error creating user - status: 500, error: ${errorName}, message: ${errorMessage}, createUserTime: ${createUserTime}ms, totalDuration: ${totalDuration}ms`, e);

    return new Response(
      JSON.stringify(
        errorRequest("Usuario", "Ha ocurrido un error en la creacion del usuario. Por favor intenta nuevamente."),
      ),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
