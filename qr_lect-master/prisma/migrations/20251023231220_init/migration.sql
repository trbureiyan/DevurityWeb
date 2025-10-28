-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "qr" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
