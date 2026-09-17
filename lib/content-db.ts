import prisma from "@/lib/prisma";
import { serializeRecord, serializeRecords } from "@/lib/serialize";

export async function getServices() {
  const rows = await prisma.service.findMany({ orderBy: { created_at: "asc" } });
  return serializeRecords(rows);
}

export async function getServiceBySlug(slug: string) {
  const row = await prisma.service.findUnique({ where: { slug } });
  return row ? serializeRecord(row) : null;
}

export async function getPosts() {
  const rows = await prisma.post.findMany({ orderBy: { created_at: "desc" } });
  return serializeRecords(rows);
}

export async function getPostBySlug(slug: string) {
  const row = await prisma.post.findUnique({ where: { slug } });
  return row ? serializeRecord(row) : null;
}

export async function getProjects() {
  const rows = await prisma.project.findMany({ orderBy: { created_at: "asc" } });
  return serializeRecords(rows);
}

export async function getProjectBySlug(slug: string) {
  const row = await prisma.project.findUnique({ where: { slug } });
  return row ? serializeRecord(row) : null;
}

export async function getReferences(limit?: number) {
  const rows = await prisma.reference.findMany({ orderBy: { created_at: "asc" } });
  const list = serializeRecords(rows);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export async function getGroups() {
  const rows = await prisma.group.findMany({ orderBy: { created_at: "asc" } });
  return serializeRecords(rows);
}
