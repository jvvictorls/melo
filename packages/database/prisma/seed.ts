import { createPrismaClient } from "../src/index.js";
import { seedUsers } from "./seeds/user.seeds.js";

const prisma = createPrismaClient();

async function main() {
  await seedUsers(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
