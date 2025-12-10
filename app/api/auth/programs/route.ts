import { NextResponse } from "next/server";
import { getPrograms } from "@/repositories/programs/programs.repositories";
import { errorRequest } from "@/lib/error";

// Modulo API para obtener la lista de programas disponibles

export async function GET() {
  try {
    const programs = await getPrograms();

    return NextResponse.json({
      programs: programs.map((program) => program.name),
    });
  } catch (error) {
    console.error("Error fetching programs:", error);
    return NextResponse.json(
      errorRequest("programs", "Error al obtener los programas"),
      { status: 500 },
    );
  }
}
