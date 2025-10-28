import prisma from "@/lib/postgresDriver";

export async function getSkills() {
  return await prisma.skills.findMany({
    select: {
      name: true,
    },
  });
}
