import prisma from "@/lib/prisma";
import { ensureSchema } from "@/lib/ensure-schema";

/**
 * One-time: copy rows from legacy `atamep_users` into `sahyapi_users` if needed.
 * Safe to call on every boot / seed — no-ops when already migrated.
 */
export async function migrateLegacyUsers() {
  try {
    await ensureSchema();
    const count = await prisma.sahyapi_users.count();
    if (count > 0) return { migrated: 0, reason: "sahyapi_users already has rows" };

    const legacy = await prisma.$queryRawUnsafe<
      { id: number; email: string; password: string; confirmed: boolean }[]
    >(
      `SELECT id, email, password, confirmed FROM atamep_users`
    ).catch(() => [] as { id: number; email: string; password: string; confirmed: boolean }[]);

    if (!legacy.length) return { migrated: 0, reason: "no atamep_users table or empty" };

    for (const user of legacy) {
      await prisma.sahyapi_users.upsert({
        where: { email: user.email },
        create: {
          email: user.email,
          password: user.password,
          confirmed: user.confirmed,
        },
        update: {},
      });
    }
    return { migrated: legacy.length, reason: "copied from atamep_users" };
  } catch (e) {
    return { migrated: 0, reason: String(e) };
  }
}
