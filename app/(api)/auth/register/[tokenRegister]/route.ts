import { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "@/lib/jwt";
import { errorRequest } from "@/lib/error";
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
export async function GET(res: Response, { params }: Params) {
  const token = (await params).tokenRegister;
  try {
    const { email, name } = await validateToken(token);
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
      JSON.stringify(errorRequest("enlace", "El enlace no es valido")),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function POST(req: Request, { params }: Params) {
  const token = (await params).tokenRegister;
  let payload: payload | unknown;
  try {
    payload = await validateToken(token);
  } catch (e) {
    console.log(e);
    return new Response(
      JSON.stringify(errorRequest("enlace", "El enlace no es valido")),
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
          "semestre no valido, por favor ingrese un numero",
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

  return new Response(
    JSON.stringify({
      message:
        "Tu registro ha sido copmletado, un administrador validara tu peticion para aprobarte o rechazarte al semillero. Este pendiente de tu correo.",
    }),
  );
}
