import { TeamMember, RoleGroup } from "@/components/about/TeamSection";

export const ITEMS_PER_PAGE = 8;

export function groupTeamMembers(members: TeamMember[]): Record<RoleGroup, TeamMember[]> {
  const groups: Record<RoleGroup, TeamMember[]> = {
    admin: [],
    lead_project: [],
    content_manager: [],
    user: [],
  };

  members.forEach((member) => {
    let roleGroup: RoleGroup = "user";
    const rawRole = member.role.toLowerCase();

    if (rawRole === "admin" || rawRole === "administrador") {
      roleGroup = "admin";
    } else if (rawRole === "lead_project" || rawRole === "project_leader" || rawRole === "project_lead") {
      roleGroup = "lead_project";
    } else if (rawRole === "content_manager") {
      roleGroup = "content_manager";
    }

    groups[roleGroup].push(member);
  });

  return groups;
}

export function getPaginatedMembers(members: TeamMember[], page: number): TeamMember[] {
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  return members.slice(startIndex, endIndex);
}

export function getTotalPages(totalItems: number): number {
  return Math.ceil(totalItems / ITEMS_PER_PAGE);
}
