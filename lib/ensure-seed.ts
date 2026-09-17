import prisma from "@/lib/prisma";
import { seedAll } from "@/lib/seed-content";

let seeding: Promise<unknown> | null = null;

/** If content tables are empty, load bundled seed-data once (first deploy). */
export async function ensureContentSeeded() {
  const count = await prisma.service.count();
  if (count > 0) return;
  if (!seeding) {
    seeding = seedAll(prisma).finally(() => {
      seeding = null;
    });
  }
  await seeding;
}
