import { PrismaClient } from "../lib/generated/prisma";

// Singleton pattern: evita múltiples instancias en desarrollo (hot-reload)
// y en serverless (cada invocación reutiliza la misma conexión)
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
