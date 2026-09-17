/**
 * CLI: yarn seed
 * Requires POSTGRES_* env vars.
 */
import { PrismaClient } from "@prisma/client";

async function main() {
  // Dynamic import so path aliases resolve via ts-node/register if configured;
  // fallback: inline require after generate.
  const { seedAll } = await import("../lib/seed-content");
  const prisma = new PrismaClient();
  try {
    const result = await seedAll(prisma);
    console.log(JSON.stringify(result, null, 2));
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
