import { NextRequest, NextResponse } from "next/server";
import slugify from "@sindresorhus/slugify";
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
  const title = body.title != null ? String(body.title).trim() : undefined;
  const data: Record<string, unknown> = {};
  if (title != null) {
    data.title = title;
    data.slug = slugify(title);
  }
  if ("short_description" in body) data.short_description = body.short_description ?? null;
  if ("description" in body) data.description = body.description ?? null;
  if ("image" in body) data.image = body.image ?? null;
  if ("category" in body) data.category = body.category ?? null;
  if ("highlights" in body) {
    data.highlights = Array.isArray(body.highlights) ? body.highlights : [];
  }

  try {
    const row = await prisma.service.update({
      where: { uuid: params.uuid },
      data,
    });
    return NextResponse.json(serializeRecord(row));
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { uuid: string } }
) {
  const auth = await requireAdmin(_req);
  if (!auth.ok) return auth.response;

  try {
    await prisma.service.delete({ where: { uuid: params.uuid } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
