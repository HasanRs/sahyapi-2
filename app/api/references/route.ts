import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { getReferences } from "@/lib/content-db";
import { serializeRecord } from "@/lib/serialize";
import { ensureContentSeeded } from "@/lib/ensure-seed";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await ensureContentSeeded();
  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Number(limitParam) : undefined;
  return NextResponse.json(await getReferences(limit));
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  const body = await req.json();
  const row = await prisma.reference.create({
    data: {
      uuid: body.uuid || randomUUID(),
      group: body.group ?? null,
      image: body.image ?? null,
      created_at: BigInt(body.created_at ?? Date.now()),
    },
  });
  return NextResponse.json(serializeRecord(row), { status: 201 });
}
