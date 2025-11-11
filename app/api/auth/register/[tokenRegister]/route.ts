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

  try {
    payload = (await validateToken(token)) as TokenPayload;
    if (timeUnixNow > payload.exp) {
      throw new Error("Token expired");
    }
  } catch {
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

  const { semester, motivation, skills, password } = await req.json();
  if (!Array.isArray(skills) || skills.length === 0) {
    return new Response(
      JSON.stringify(
        errorRequest(
          "habilidades",
          "Selecciona al menos una habilidad válida.",
        ),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const normalizedSkills = skills
    .filter((skill): skill is string => typeof skill === "string")
    .map((skill) => skill.trim())
    .filter((skill) => skill.length > 0);

  if (normalizedSkills.length !== skills.length) {
    return new Response(
      JSON.stringify(
        errorRequest(
          "habilidades",
          "Se detectaron habilidades vacías o inválidas.",
        ),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const uniqueSkills = Array.from(new Set(normalizedSkills));
  if (!semester && !motivation && skills == undefined && !password) {
    return new Response(
      JSON.stringify(errorRequest("", "Rellena los campos para el registro")),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  // Validaciones
  if (isNaN(semester) || !semester || semester < 1 || semester > 13) {
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
  if (!motivation) {
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

  if (skills == undefined) {
    return new Response(
      JSON.stringify(
        errorRequest(
          "habilidades",
          "Ha aparecido un comportamiento extraño al detectar los valores del campo habilidades",
        ),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (await existUserByEmail(email)) {
    return new Response(
      JSON.stringify(
        errorRequest("registro", "Ya existe un usuario con este correo."),
      ),
      { status: 409, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    await createUser({
      name: name,
      email: email.toLowerCase(),
      lastname: lastname,
      password: bcryptAdapter.hash(password),
      semester,
      skills: uniqueSkills,
      motivation,
    });
  } catch (e) {
    if (e instanceof Error) {
      // Log detailed error for debugging
      console.error("Error creating user:", e.message);
      console.error("Stack trace:", e.stack);

      if (e.message === "INVALID_SKILLS_SELECTION") {
        return new Response(
          JSON.stringify(
            errorRequest(
              "habilidades",
              "Alguna habilidad seleccionada no existe en el sistema.",
            ),
          ),
          {
            status: 422,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      if (e.message.includes("USER_ROLE_NOT_FOUND")) {
        return new Response(
          JSON.stringify(
            errorRequest(
              "configuración",
              "Error de configuración del sistema. El rol de usuario por defecto no existe. Por favor contacta al administrador.",
            ),
          ),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
    }

    console.error("Unexpected error during registration:", e);
    return new Response(
      JSON.stringify(
        errorRequest(
          "registro",
          "Ha ocurrido un error al crear el usuario. Intenta nuevamente.",
        ),
      ),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  return new Response(
    JSON.stringify({
      message:
        "Tu registro ha sido completado, un administrador validara tu peticion para aprobarte o rechazarte al semillero. Este pendiente de tu correo.",
    }),
  );
}
