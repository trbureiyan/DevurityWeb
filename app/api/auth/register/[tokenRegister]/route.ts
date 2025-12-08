import { NextRequest } from "next/server";
import { validateToken } from "@/lib/jwt";
import { errorRequest } from "@/lib/error";
import {
  createUser,
  existUserByEmail,
} from "@/repositories/users/users.repositories";
import { bcryptAdapter } from "@/lib/bcrypt";
import { isValidPassword } from "@/lib/regex";
import { EmailOptions, sendEmail } from "@/lib/email";

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

export async function GET(req: NextRequest, { params }: Params) {
  const timeUnixNow = Math.floor(Date.now() / 1000);
  const { tokenRegister: token } = await params;
  try {
    const payload = (await validateToken(token)) as TokenPayload;
    const { email, name, exp } = payload;
    if (await existUserByEmail(email)) {
      return new Response(
        JSON.stringify(
          errorRequest("registro", "Ya existe un usuario con este correo."),
        ),
        { status: 409, headers: { "Content-Type": "application/json" } },
      );
    }

    if (timeUnixNow > exp) {
      throw new Error("Token expirado");
    }

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
    return new Response(
      JSON.stringify(
        errorRequest("registro", "Ya ha expirado la duracion del "),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function POST(req: NextRequest, { params }: Params) {
  const { tokenRegister: token } = await params;
  const timeUnixNow = Math.floor(Date.now() / 1000);
  let payload: TokenPayload;

  console.log("[INFO] Starting registration process");

  try {
    payload = (await validateToken(token)) as TokenPayload;
    if (timeUnixNow > payload.exp) {
      throw new Error("Token expired");
    }
    console.log("[INFO] Token validated successfully for email:", payload.email);
    payload = (await validateToken(token)) as TokenPayload;
    if (timeUnixNow > payload.exp) {
      throw new Error("Token expired");
    }
  } catch (error) {
    console.error("[ERROR] Token validation failed:", error);
    return new Response(
      JSON.stringify(
        errorRequest("registro", "Ya ha expirado la duracion del token"),
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
  } catch (error) {
    console.error("[ERROR] Invalid JSON in request body:", error);
    return new Response(
      JSON.stringify(errorRequest("", "Datos de registro inválidos")),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const { semester, motivation, skills, password } = requestBody;

  // Validar que todos los campos estén presentes
  if (!semester || !motivation || skills === undefined || !password) {
    console.error("[ERROR] Missing required fields:", {
      semester: !!semester,
      motivation: !!motivation,
      skills: skills !== undefined,
      password: !!password,
    });
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
    console.error("[ERROR] Skills is not an array:", typeof skills);
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
    console.error("[ERROR] Skills array is empty");
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

  // Validaciones
  if (isNaN(semester) || !semester || semester < 1 || semester > 13) {
    console.error("[ERROR] Invalid semester:", semester);
    return new Response(
      JSON.stringify(
        errorRequest(
          "semestre",
          "Semestre no válido. Por favor ingresa un semestre válido",
        ),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (!motivation || motivation.trim().length === 0) {
    console.error("[ERROR] Empty motivation");
    return new Response(
      JSON.stringify(
        errorRequest(
          "Motivacion",
          "motivacion no valido, por favor explica tu motivacion para ingresar al semillero",
        ),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (!password) {
    console.error("[ERROR] Empty password");
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
    console.error("[ERROR] Invalid password format");
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
  try {
    if (await existUserByEmail(email)) {
      console.error("[ERROR] User already exists:", email);
      return new Response(
        JSON.stringify(
          errorRequest("registro", "Ya existe un usuario con este correo."),
        ),
        { status: 409, headers: { "Content-Type": "application/json" } },
      );
    }
  } catch (error) {
    console.error("[ERROR] Error checking existing user:", error);
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
  try {
    console.log("[INFO] Creating user with data:", {
      name,
      email,
      lastname,
      semester,
      skillsCount: skills.length,
      motivationLength: motivation.length
    });
    await createUser({
      name: name,
      email: email.toLowerCase(),
      last_name: lastname,
      password: bcryptAdapter.hash(password),
      semester,
      skills,
      motivation,
    });

    console.log("[SUCCESS] User created successfully:", email);

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
    console.error("[ERROR] Error creating user:", e);
    console.error("[ERROR] Error details:", {
      message: e instanceof Error ? e.message : "Unknown error",
      stack: e instanceof Error ? e.stack : undefined,
    });

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
