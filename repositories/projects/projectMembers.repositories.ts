import prisma from "@/lib/postgresDriver";
import { PROJECT_ROLES } from "@/lib/constants/roles";
import type { ProjectMember } from "@/lib/types/project.types";

/**
 * Repository de integrantes/responsables de un proyecto (pestaña "Responsables").
 * Un solo líder por proyecto, aplicado aquí en código (no con índice parcial en BD).
 *
 * @module projectMembers.repositories
 */

export async function listMembers(projectId: bigint): Promise<ProjectMember[]> {
  const rows = await prisma.user_projects.findMany({
    where: { project_id: projectId, is_active: true },
    orderBy: [{ project_role: "asc" }, { created_at: "asc" }], // enum declarado como leader antes que member -> el lider queda primero
    include: {
      users: { select: { id: true, name: true, last_name: true, username: true } },
    },
  });

  return rows
    .filter((row): row is typeof row & { users: NonNullable<typeof row.users> } => row.users !== null)
    .map((row) => ({
      userId: row.users.id.toString(),
      name: row.users.name,
      lastName: row.users.last_name,
      username: row.users.username,
      role: row.project_role,
    }));
}

export async function getLeader(projectId: bigint) {
  return prisma.user_projects.findFirst({
    where: { project_id: projectId, project_role: "leader", is_active: true },
    include: { users: { select: { id: true, name: true, last_name: true } } },
  });
}

// Agrega un integrante como "member". La promoción a "leader" pasa por setLeader (admin-only,
// aplicado en la ruta API), nunca directamente aquí.
export async function addMember(projectId: bigint, userId: bigint): Promise<void> {
  await prisma.user_projects.upsert({
    where: { project_id_user_id: { project_id: projectId, user_id: userId } },
    create: { project_id: projectId, user_id: userId, project_role: PROJECT_ROLES.MEMBER, is_active: true },
    update: { is_active: true },
  });
}

export class LeaderRemovalError extends Error {
  constructor() {
    super("No se puede quitar al líder del proyecto. Asigna un nuevo líder primero.");
    this.name = "LeaderRemovalError";
  }
}

// Bloqueado si el integrante es el líder actual: un admin debe reasignar el liderazgo
// (setLeader) antes de poder quitarlo.
export async function removeMember(projectId: bigint, userId: bigint): Promise<void> {
  const row = await prisma.user_projects.findUnique({
    where: { project_id_user_id: { project_id: projectId, user_id: userId } },
  });
  if (!row) return;
  if (row.project_role === PROJECT_ROLES.LEADER) {
    throw new LeaderRemovalError();
  }
  await prisma.user_projects.delete({ where: { id: row.id } });
}

// Asigna el liderazgo a `userId`, degradando a "member" a cualquier líder anterior.
// Admin-only — el chequeo de permisos vive en la ruta API, no aquí.
export async function setLeader(projectId: bigint, userId: bigint): Promise<void> {
  await prisma.$transaction(async (tx) => {
    await tx.user_projects.updateMany({
      where: { project_id: projectId, project_role: PROJECT_ROLES.LEADER },
      data: { project_role: PROJECT_ROLES.MEMBER },
    });

    await tx.user_projects.upsert({
      where: { project_id_user_id: { project_id: projectId, user_id: userId } },
      create: { project_id: projectId, user_id: userId, project_role: PROJECT_ROLES.LEADER, is_active: true },
      update: { project_role: PROJECT_ROLES.LEADER, is_active: true },
    });
  });
}
