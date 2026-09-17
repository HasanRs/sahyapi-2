import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { seedAll } from "@/lib/seed-content";

export const dynamic = "force-dynamic";

/** Admin-only: re-run bundled content seed + user migration. */
export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  const result = await seedAll();
  return NextResponse.json({ ok: true, ...result });
}
