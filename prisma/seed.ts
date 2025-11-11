import { PrismaClient } from '../lib/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Seed roles
  console.log('📝 Seeding roles...');
  const adminRole = await prisma.roles.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
    },
  });
  console.log('✅ Admin role created:', adminRole);

  const userRole = await prisma.roles.upsert({
    where: { name: 'user' },
    update: {},
    create: {
      name: 'user',
    },
  });
  console.log('✅ User role created:', userRole);

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
