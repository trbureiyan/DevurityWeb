// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "../lib/generated/prisma"; // -- local

const prisma = new PrismaClient();

export default prisma;
