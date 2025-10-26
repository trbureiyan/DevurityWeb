import { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "@/lib/jwt";
import { errorRequest } from "@/lib/error";
import {
  createUser,
  existUserByEmail,
} from "@/repositories/users/users.respositories";
import { bcryptAdapter } from "@/lib/bcrypt";
import { isValidPassword } from "@/lib/regex";
interface Params {
  params: {
    tokenRegister: string;
  };
}
interface payload {
  email: string;
  name: string;
  lastname: string;
}

export async function GET(req: Request, { params }: Params) {
  const timeUnixNow = Math.floor(Date.now() / 1000);
  const token = (await params).tokenRegister;
  try {
    const { email, name, exp } = await validateToken(token);
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

export async function POST(req: Request, { params }: Params) {
  const token = (await params).tokenRegister;
  const timeUnixNow = Math.floor(Date.now() / 1000);
  let payload: payload | unknown;
  try {
    payload = await validateToken(token);
    if (timeUnixNow > payload.exp) {
      throw new Error("Token expired");
    }
  } catch (e) {
    return new Response(
      JSON.stringify(
        errorRequest("registro", "Ya ha expirado la duracion del"),
      ),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  const { name, email, lastname } = payload;

  const { semester, motivation, skills, password } = await req.json();
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
  if (isNaN(semester) || !semester) {
    return new Response(
      JSON.stringify(
        errorRequest(
          "semestre",
          "semestre no valido, por favor ingrese correctamente el ",
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
      name,
      email,
      lastname,
      password: bcryptAdapter.hash(password),
      semester,
      skills,
      motivation,
    });
  } catch (e) {
    console.log(e);
    return new Response(
      JSON.stringify(
        errorRequest("Usuario", "Ha ocurrido un error en la creacion del "),
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
        "Tu registro ha sido copmletado, un administrador validara tu peticion para aprobarte o rechazarte al semillero. Este pendiente de tu correo.",
    }),
  );
}
