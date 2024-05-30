import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

const db = prisma;
export default db;


// import { PrismaClient } from "@prisma/client";
// const db = new PrismaClient();
// export default db;