import type { PrismaClient } from "../../lib/generated/prisma";

export const ROLE_NAMES = ["admin", "user", "lead_project", "content_manager"];

export async function seedRoles(prisma: PrismaClient) {
  const results = await Promise.all(
    ROLE_NAMES.map((name) =>
      prisma.roles.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );

  console.log(
    `✅ Roles: ${results.length} upserted (${results.map((r) => r.name).join(", ")})`,
  );
}
