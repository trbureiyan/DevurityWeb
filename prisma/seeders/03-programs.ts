import type { PrismaClient } from "../../lib/generated/prisma";

const PROGRAMS = [
  "Física",
  "Matemática Aplicada",
  "Biología Aplicada",
  "Ciencia Política",
  "Derecho",
  "Antropología",
  "Comunicación Social y Periodismo",
  "Psicología",
  "Administración de Empresas",
  "Administración Financiera",
  "Administración Turística y Hotelera",
  "Economía",
  "Contaduría Pública",
  "Licenciatura en Ciencias Naturales y Educación Ambiental",
  "Licenciatura en Ciencias Sociales",
  "Licenciatura en Educación Artística",
  "Licenciatura en Educación Física, Recreación y Deportes",
  "Licenciatura en Educación Infantil",
  "Licenciatura en Lenguas Extranjeras con Énfasis en Inglés",
  "Licenciatura en Literatura y Lengua Castellana",
  "Licenciatura en Matemáticas",
  "Ingeniería Agrícola",
  "Ingeniería Agroindustrial",
  "Ingeniería Civil",
  "Ingeniería de Petróleos",
  "Ingeniería de Software",
  "Ingeniería Electrónica",
  "Tecnología en Construcción de Obras Civiles",
  "Tecnología en Desarrollo de Software",
];

export async function seedPrograms(prisma: PrismaClient) {
  let created = 0;
  let skipped = 0;

  for (const name of PROGRAMS) {
    const existing = await prisma.programs.findUnique({ where: { name } });
    if (existing) {
      skipped++;
      continue;
    }
    await prisma.programs.create({ data: { name } });
    created++;
  }

  console.log(
    `✅ Programs: ${created} created, ${skipped} already existed`,
  );
}
