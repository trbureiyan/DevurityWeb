import { use } from "react";
import prisma from "../../lib/postgresDriver";

/* Includes */

const allIncludes = {
  roles: {
    select: {
      name: true,
    },
  },
  user_skills: {
    select: {
      skills: {
        select: {
          name: true,
        },
      },
    },
  },
  user_platforms: {
    include: {
      platforms: {
        select: {
          name: true,
        },
      },
    },
  },
};

/*  */

export interface user {
  name: string;
  email: string;
  password: string;
  lastname: string;
  personal_email: string | null;
  is_active: boolean;
  role_id: number;
  motivation: string;
  semester: number;
}

export interface createUserInterface {
  name: string;
  email: string;
  password: string;
  lastname: string;
  motivation: string;
  skills: string[];
  semester: number;
}

export async function createUser(users: createUserInterface) {
  const { name, password, email, lastname, skills, motivation, semester } =
    users;
  return await prisma.$transaction(async (tx) => {
    // 1. Crear usuario
    const nuevoUsuario = await tx.users.create({
      data: {
        name,
        last_name: lastname,
        email,
        password,
        role_id: 2,
        motivation,
        semester,
      },
    });
    // 2. Buscar skills existentes
    const skillsDB = await tx.skills.findMany({
      where: {
        name: { in: skills },
      },
      select: { id: true },
    });
    // Asociar skills al usuario (en tabla intermedia)
    if (skills.length > 0) {
      await tx.user_skills.createMany({
        data: skillsDB.map((skill) => ({
          user_id: nuevoUsuario.id,
          skill_id: skill.id,
        })),
      });
    }

    return nuevoUsuario;
  });
}

export async function findPasswordByEmail(email: string) {
  const user = await prisma.users.findUnique({
    where: { email },
    select: {
      password: true,
    },
  });
  return user?.password;
}

export async function existUserByEmail(email: string) {
  const user = await prisma.users.findUnique({
    where: { email },
    select: { id: true },
  });
  return !!user;
}
