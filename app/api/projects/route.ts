import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import slugify from "@sindresorhus/slugify";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { getProjects } from "@/lib/content-db";
import { serializeRecord } from "@/lib/serialize";
import { ensureContentSeeded } from "@/lib/ensure-seed";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await ensureContentSeeded();
  const { searchParams } = new URL(req.url);
  const completed = searchParams.get("completed");
  let projects = await getProjects();
  if (completed === "true") {
    projects = projects.filter((p: any) => p.is_completed === true);
  } else if (completed === "false") {
    projects = projects.filter((p: any) => p.is_completed === false);
  }
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  const body = await req.json();
  const title = String(body.title || "").trim();
  if (!title) {
    return NextResponse.json({ error: "title required" }, { status: 400 });
  }

  const images = Array.isArray(body.image)
    ? body.image
    : body.image
      ? [body.image]
      : [];

  const row = await prisma.project.create({
    data: {
      uuid: body.uuid || randomUUID(),
      title,
      slug: slugify(title),
      description: body.description ?? null,
      image: images,
      is_completed: Boolean(body.is_completed),
      created_at: BigInt(body.created_at ?? Date.now()),
    },
  });
  return NextResponse.json(serializeRecord(row), { status: 201 });
}
