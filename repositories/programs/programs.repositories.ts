import prisma from "@/lib/postgresDriver";

export interface Program {
  id: bigint;
  name: string;
}

export async function getPrograms(): Promise<Program[]> {
  const programs = await prisma.programs.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return programs;
}

export async function findProgramByName(name: string): Promise<Program | null> {
  if (!name.trim()) {
    return null;
  }

  return prisma.programs.findUnique({ where: { name } });
}

export async function programExists(name: string): Promise<boolean> {
  const program = await findProgramByName(name);
  return !!program;
}
