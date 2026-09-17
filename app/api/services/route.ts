import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import slugify from "@sindresorhus/slugify";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { getServices } from "@/lib/content-db";
import { serializeRecord } from "@/lib/serialize";
import { ensureContentSeeded } from "@/lib/ensure-seed";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureContentSeeded();
  const services = await getServices();
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  const body = await req.json();
  const uuid = body.uuid || randomUUID();
  const title = String(body.title || "").trim();
  if (!title) {
    return NextResponse.json({ error: "title required" }, { status: 400 });
  }

  const row = await prisma.service.create({
    data: {
      uuid,
      title,
      slug: slugify(title),
      short_description: body.short_description ?? null,
      description: body.description ?? null,
      image: body.image ?? null,
      category: body.category ?? null,
      highlights: Array.isArray(body.highlights) ? body.highlights : [],
      created_at: BigInt(body.created_at ?? Date.now()),
    },
  });
  return NextResponse.json(serializeRecord(row), { status: 201 });
}
