import type { PrismaClient } from "../../lib/generated/prisma";

export async function seedRoles(prisma: PrismaClient) {
  const roleNames = ["admin", "user"];

  const results = await Promise.all(
    roleNames.map((name) =>
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
