import prisma from "@/lib/postgresDriver";

export interface CreateSkillData {
  name: string;
}

export interface UpdateSkillData {
  name?: string;
}

// Existing function - keep as is
export async function getSkills() {
  const skills = await prisma.skills.findMany({
    select: {
      name: true,
    },
  });

  return skills;
}

// New CRUD operations
export async function getAllSkills() {
  const skills = await prisma.skills.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  // Convert BigInt IDs to numbers
  return skills.map((skill) => ({
    ...skill,
    id: Number(skill.id),
  }));
}

export async function getSkillById(id: number) {
  const skill = await prisma.skills.findUnique({
    where: { id: BigInt(id) },
    select: {
      id: true,
      name: true,
    },
  });

  if (!skill) return null;

  // Convert BigInt ID to number
  return {
    ...skill,
    id: Number(skill.id),
  };
}

export async function createSkill(data: CreateSkillData) {
  const skill = await prisma.skills.create({
    data: {
      name: data.name,
    },
    select: {
      id: true,
      name: true,
    },
  });

  // Convert BigInt ID to number
  return {
    ...skill,
    id: Number(skill.id),
  };
}

export async function updateSkill(id: number, data: UpdateSkillData) {
  const skill = await prisma.skills.update({
    where: { id: BigInt(id) },
    data,
    select: {
      id: true,
      name: true,
    },
  });

  // Convert BigInt ID to number
  return {
    ...skill,
    id: Number(skill.id),
  };
}

export async function deleteSkill(id: number) {
  const skill = await prisma.skills.delete({
    where: { id: BigInt(id) },
    select: {
      id: true,
      name: true,
    },
  });

  // Convert BigInt ID to number
  return {
    ...skill,
    id: Number(skill.id),
  };
}

export async function skillExists(name: string) {
  const skill = await prisma.skills.findUnique({
    where: { name },
    select: { id: true },
  });
  return !!skill;
}
