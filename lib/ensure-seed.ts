import prisma from "@/lib/prisma";
import { seedAll, seedProductsIfEmpty } from "@/lib/seed-content";
import { ensureSchema } from "@/lib/ensure-schema";

let seeding: Promise<unknown> | null = null;
let productSeeding: Promise<unknown> | null = null;

/** Ensure tables exist, then load bundled seed-data if empty (first deploy). */
export async function ensureContentSeeded() {
  await ensureSchema();
  const count = await prisma.service.count();
  if (count === 0) {
    if (!seeding) {
      seeding = seedAll(prisma).finally(() => {
        seeding = null;
      });
    }
    await seeding;
    return;
  }
  // Existing installs: backfill products table when first introduced
  if (!productSeeding) {
    productSeeding = seedProductsIfEmpty(prisma).finally(() => {
      productSeeding = null;
    });
  }
  await productSeeding;
}
