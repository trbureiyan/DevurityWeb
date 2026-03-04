/**
 * prisma/seed.ts — Orchestrator
 *
 * Runs all seeder modules in order:
 *   01-roles -> 02-platforms -> 03-programs -> 04-skills -> 05-projects -> 06-updates
 *
 * Called by:  npm run db:seed
 *             prisma db seed (via package.json "prisma.seed")
 */

import { PrismaClient } from "../lib/generated/prisma";
import { seedRoles } from "./seeders/01-roles";
import { seedPlatforms } from "./seeders/02-platforms";
import { seedPrograms } from "./seeders/03-programs";
import { seedSkills } from "./seeders/04-skills";
import { seedProjects } from "./seeders/05-projects";
import { seedUpdates } from "./seeders/06-updates";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...\n");

  await seedRoles(prisma);
  await seedPlatforms(prisma);
  await seedPrograms(prisma);
  await seedSkills(prisma);
  await seedProjects(prisma);
  await seedUpdates(prisma);

  console.log("\n🎉 Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
