import type { TeamMember, RoleGroup } from "@/components/about/team.types";

export const ITEMS_PER_PAGE = 8;

/**
 * Groups members by supported role, placing unknown roles in the user group.
 * @param members Members to classify by their role string.
 * @returns A complete role-to-members map, including empty groups.
 */
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

/**
 * Returns one page of members using the shared page size.
 * @param members Ordered members to paginate.
 * @param page One-based page number; callers should provide a value of at least one.
 * @returns At most `ITEMS_PER_PAGE` members for the requested page.
 */
export function getPaginatedMembers(members: TeamMember[], page: number): TeamMember[] {
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  return members.slice(startIndex, endIndex);
}

/**
 * Calculates the number of pages required for a member count.
 * @param totalItems Number of members; zero returns zero pages.
 * @returns The ceiling of the item count divided by `ITEMS_PER_PAGE`.
 */
export function getTotalPages(totalItems: number): number {
  return Math.ceil(totalItems / ITEMS_PER_PAGE);
}
