import prisma from "@/lib/prisma";
import { seedAll } from "@/lib/seed-content";
import { ensureSchema } from "@/lib/ensure-schema";

let seeding: Promise<unknown> | null = null;

/** Ensure tables exist, then load bundled seed-data if empty (first deploy). */
export async function ensureContentSeeded() {
  await ensureSchema();
  const count = await prisma.service.count();
  if (count > 0) return;
  if (!seeding) {
    seeding = seedAll(prisma).finally(() => {
      seeding = null;
    });
  }
  await seeding;
}
