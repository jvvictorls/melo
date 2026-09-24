import bcrypt from "bcrypt";
import { Role, type PrismaClient } from "../../src/index.js";

const SALT_ROUNDS = 10;

export async function seedUsers(prisma: PrismaClient) {
  if (
    process.env.NODE_ENV === "production" &&
    !process.env.SEED_SUPERADMIN_PASSWORD
  ) {
    throw new Error(
      "Defina SEED_SUPERADMIN_PASSWORD para rodar o seed em produção",
    );
  }

  const users = [
    {
      name: "Super Admin",
      email: process.env.SEED_SUPERADMIN_EMAIL ?? "superadmin@melo.dev",
      password: process.env.SEED_SUPERADMIN_PASSWORD ?? "ChangeMe123!",
      role: Role.SUPERADMIN,
    },
    {
      name: "Admin",
      email: "admin@melo.dev",
      password: "ChangeMe123!",
      role: Role.ADMIN,
    },
    {
      name: "User",
      email: "user@melo.dev",
      password: "ChangeMe123!",
      role: Role.USER,
    },
  ];

  for (const { password, ...data } of users) {
    // upsert: o seed é idempotente e não sobrescreve a senha de quem já existe
    await prisma.user.upsert({
      where: { email: data.email },
      update: { name: data.name, role: data.role },
      create: { ...data, password: await bcrypt.hash(password, SALT_ROUNDS) },
    });
  }

  console.log(`✔ ${users.length} usuários semeados`);
}
