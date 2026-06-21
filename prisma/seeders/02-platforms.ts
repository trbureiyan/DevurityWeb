import type { PrismaClient } from "../../lib/generated/prisma";

const PLATFORM_NAMES = [
  "GitHub",
  "ORCID",
  "Bento.me",
  "Linktree",
  "YouTube",
  "Twitter",
  "Facebook",
  "LinkedIn",
  "Instagram",
  "Website",
];

export async function seedPlatforms(prisma: PrismaClient) {
  let created = 0;
  let skipped = 0;

  for (const name of PLATFORM_NAMES) {
    const existing = await prisma.platforms.findFirst({ where: { name } });
    if (existing) {
      skipped++;
      continue;
    }
    await prisma.platforms.create({ data: { name } });
    created++;
  }

  console.log(
    `✅ Platforms: ${created} created, ${skipped} already existed`,
  );
}
