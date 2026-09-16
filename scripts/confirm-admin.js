/**
 * One-shot production bootstrap: marks the admin email as confirmed.
 * Safe to run repeatedly (idempotent). Remove after admin is confirmed.
 */
const { PrismaClient } = require("@prisma/client");

const ADMIN_EMAIL = "muhammetkaydan@gmail.com";

async function main() {
  const prisma = new PrismaClient();
  try {
    const result = await prisma.atamep_users.updateMany({
      where: { email: ADMIN_EMAIL },
      data: { confirmed: true },
    });
    console.log(
      `confirm-admin: updated ${result.count} row(s) for ${ADMIN_EMAIL}`
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error("confirm-admin failed:", err);
  process.exit(1);
});
