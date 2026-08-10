// Roles globales (tabla `roles`, uno por usuario, viene del JWT `role` claim).
export const GLOBAL_ROLES = {
  ADMIN: "admin",
  USER: "user",
  LEAD_PROJECT: "lead_project",
  CONTENT_MANAGER: "content_manager",
  AUDITOR: "auditor",
} as const;

export type GlobalRole = (typeof GLOBAL_ROLES)[keyof typeof GLOBAL_ROLES];

// Roles con alcance por proyecto (tabla `user_projects.project_role`, enum ProjectRole en Prisma).
export const PROJECT_ROLES = {
  LEADER: "leader",
  MEMBER: "member",
} as const;

export type ProjectRoleName = (typeof PROJECT_ROLES)[keyof typeof PROJECT_ROLES];
