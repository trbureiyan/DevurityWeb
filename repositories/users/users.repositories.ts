import prisma from "../../lib/postgresDriver";

function toBigInt(id: string | number): bigint {
  console.log("toBigInt: Converting ID:", id, "Type:", typeof id);
  try {
    const result = BigInt(id);
    console.log("toBigInt: Conversion successful:", result);
    return result;
  } catch (error) {
    console.error("toBigInt: Error converting ID:", id, "Error:", error);
    throw error;
  }
}

export interface PaginatedUsersResponse {
  users: any[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

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

export async function findByEmailWithRole(email: string) {
  return await prisma.users.findUnique({
    where: { email },
    include: {
      roles: {
        select: {
          name: true,
        },
      },
    },
  });
}

export async function findByIdWithRole(id: string) {
  console.log("findByIdWithRole: Searching for user with ID:", id);
  try {
    const bigIntId = toBigInt(id);
    const user = await prisma.users.findUnique({
      where: { id: bigIntId },
      include: {
        roles: {
          select: {
            name: true,
          },
        },
      },
    });
    console.log("findByIdWithRole: User found:", !!user);
    return user;
  } catch (error) {
    console.error("findByIdWithRole: Error finding user:", error);
    throw error;
  }
}

export async function findByIdWithSkills(id: string) {
  return await prisma.users.findUnique({
    where: { id: toBigInt(id) },
    include: {
      roles: {
        select: {
          name: true,
        },
      },
      user_skills: {
        include: {
          skills: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}

export async function findById(id: string) {
  console.log("findById: Searching for user with ID:", id);
  try {
    const bigIntId = toBigInt(id);
    const user = await prisma.users.findUnique({
      where: { id: bigIntId },
      select: {
        id: true,
        name: true,
        last_name: true,
        motivation: true,
        semester: true,
        user_skills: {
          include: {
            skills: {
              select: {
                name: true,
              },
            },
          },
        },
        roles: {
          select: {
            name: true,
          },
        },
      },
    });
    console.log("findById: User found:", !!user);
    console.log("findById: User data:", user);
    if (user) {
      console.log("findById: User ID type:", typeof user.id);
      console.log("findById: User ID value:", user.id);
    }
    return user;
  } catch (error) {
    console.error("findById: Error finding user:", error);
    throw error;
  }
}
export async function createUser(users: createUserInterface) {
  const { name, password, email, lastname, skills, motivation, semester } =
    users;
  return await prisma.$transaction(async (tx) => {
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

    const skillsDB = await tx.skills.findMany({
      where: {
        name: { in: skills },
      },
      select: { id: true },
    });

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

export async function findInactiveUsersWithPagination(
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedUsersResponse> {
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    prisma.users.findMany({
      where: {
        is_active: false,
      },
      include: {
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
      },
      skip,
      take: limit,
      orderBy: {
        id: "desc",
      },
    }),
    prisma.users.count({
      where: {
        is_active: false,
      },
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  // Convert BigInt IDs to strings for JSON serialization
  const usersWithStringIds = users.map((user) => ({
    ...user,
    id: user.id.toString(),
    role_id: user.role_id.toString(),
  }));

  return {
    users: usersWithStringIds,
    total,
    page,
    limit,
    totalPages,
  };
}

export async function activateUser(userId: string): Promise<boolean> {
  try {
    const result = await prisma.users.update({
      where: {
        id: toBigInt(userId),
        is_active: false, // Solo actualizar si está inactivo
      },
      data: {
        is_active: true,
      },
    });
    return !!result;
  } catch (error) {
    console.error("Error activating user:", error);
    return false;
  }
}

export async function deleteInactiveUser(userId: string): Promise<boolean> {
  try {
    // Usar transacción para asegurar que todas las dependencias se eliminen correctamente
    await prisma.$transaction(async (tx) => {
      // Eliminar relaciones primero
      await tx.user_skills.deleteMany({
        where: { user_id: toBigInt(userId) },
      });

      await tx.user_platforms.deleteMany({
        where: { user_id: toBigInt(userId) },
      });

      await tx.user_projects.deleteMany({
        where: { user_id: toBigInt(userId) },
      });

      await tx.attendances.deleteMany({
        where: { user_id: toBigInt(userId) },
      });

      // Finalmente eliminar el usuario
      await tx.users.delete({
        where: {
          id: toBigInt(userId),
          is_active: false, // Solo eliminar usuarios inactivos
        },
      });
    });
    return true;
  } catch (error) {
    console.error("Error deleting inactive user:", error);
    return false;
  }
}
