import { prisma } from ".";

export const Database = {
  transaction: prisma.$transaction,
  queryRaw: prisma.$queryRaw,
  queryRawUnsafe: prisma.$queryRawUnsafe,
  executeRaw: prisma.$executeRaw,
  executeRawUnsafe: prisma.$executeRawUnsafe,
};
