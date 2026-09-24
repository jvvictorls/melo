import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client.js";

export function createPrismaAdapter(connectionString: string) {
  return new PrismaPg({ connectionString });
}

export function createPrismaClient(
  connectionString = process.env.DATABASE_URL,
) {
  if (!connectionString) throw new Error("DATABASE_URL is not defined");
  return new PrismaClient({ adapter: createPrismaAdapter(connectionString) });
}
