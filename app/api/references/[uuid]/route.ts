import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { serializeRecord } from "@/lib/serialize";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: { uuid: string } }
) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  const body = await req.json();
  const data: Record<string, unknown> = {};
  if ("group" in body) data.group = body.group ?? null;
  if ("image" in body) data.image = body.image ?? null;

  try {
    const row = await prisma.reference.update({
      where: { uuid: params.uuid },
      data,
    });
    return NextResponse.json(serializeRecord(row));
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { uuid: string } }
) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;
  try {
    await prisma.reference.delete({ where: { uuid: params.uuid } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
