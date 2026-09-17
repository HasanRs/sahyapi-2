import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { getGroups } from "@/lib/content-db";
import { serializeRecord } from "@/lib/serialize";
import { ensureContentSeeded } from "@/lib/ensure-seed";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureContentSeeded();
  return NextResponse.json(await getGroups());
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  const body = await req.json();
  const title = String(body.title || "").trim();
  if (!title) {
    return NextResponse.json({ error: "title required" }, { status: 400 });
  }

  const row = await prisma.group.create({
    data: {
      uuid: body.uuid || randomUUID(),
      title,
      created_at: BigInt(body.created_at ?? Date.now()),
    },
  });
  return NextResponse.json(serializeRecord(row), { status: 201 });
}
