import { PrismaClient } from "@/lib/generated/prisma";


const prisma = new PrismaClient();

export default prisma;

// Función para obtener roles con usuarios
export async function getRolesWithUsers() {
  const roles = await prisma.roles.findMany({
    include: {
      users: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
    orderBy: { id: "asc" },
  });

  // Convertir BigInt id a string para React
  return roles.map((r) => ({
    ...r,
    id: r.id.toString(),
  }));
}
