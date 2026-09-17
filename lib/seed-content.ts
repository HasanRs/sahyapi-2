import { readFileSync } from "fs";
import { join } from "path";
import type { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";
import { migrateLegacyUsers } from "@/lib/migrate-legacy-users";

function loadJson(name: string) {
  return JSON.parse(
    readFileSync(join(process.cwd(), "prisma/seed-data", `${name}.json`), "utf8")
  );
}

/** Upsert bundled Şah Yapı content + migrate legacy users into Postgres. */
export async function seedAll(client: PrismaClient = prisma) {
  const userMig = await migrateLegacyUsers();

  const services = loadJson("services");
  for (const s of services) {
    await client.service.upsert({
      where: { uuid: s.uuid },
      create: {
        uuid: s.uuid,
        title: s.title,
        slug: s.slug,
        short_description: s.short_description ?? null,
        description: s.description ?? null,
        image: s.image ?? null,
        category: s.category ?? null,
        highlights: Array.isArray(s.highlights) ? s.highlights : [],
        created_at: BigInt(s.created_at ?? Date.now()),
      },
      update: {
        title: s.title,
        slug: s.slug,
        short_description: s.short_description ?? null,
        description: s.description ?? null,
        image: s.image ?? null,
        category: s.category ?? null,
        highlights: Array.isArray(s.highlights) ? s.highlights : [],
      },
    });
  }

  const posts = loadJson("posts");
  for (const p of posts) {
    await client.post.upsert({
      where: { uuid: p.uuid },
      create: {
        uuid: p.uuid,
        title: p.title,
        slug: p.slug,
        description: p.description ?? null,
        image: p.image ?? null,
        created_at: BigInt(p.created_at ?? Date.now()),
      },
      update: {
        title: p.title,
        slug: p.slug,
        description: p.description ?? null,
        image: p.image ?? null,
      },
    });
  }

  const projects = loadJson("projects");
  for (const p of projects) {
    const images = Array.isArray(p.image) ? p.image : p.image ? [p.image] : [];
    await client.project.upsert({
      where: { uuid: p.uuid },
      create: {
        uuid: p.uuid,
        title: p.title,
        slug: p.slug,
        description: p.description ?? null,
        image: images,
        is_completed: Boolean(p.is_completed),
        created_at: BigInt(p.created_at ?? Date.now()),
      },
      update: {
        title: p.title,
        slug: p.slug,
        description: p.description ?? null,
        image: images,
        is_completed: Boolean(p.is_completed),
      },
    });
  }

  const groups = loadJson("groups");
  for (const g of groups) {
    await client.group.upsert({
      where: { uuid: g.uuid },
      create: {
        uuid: g.uuid,
        title: g.title,
        created_at: BigInt(g.created_at ?? Date.now()),
      },
      update: { title: g.title },
    });
  }

  const references = loadJson("references");
  for (const r of references) {
    await client.reference.upsert({
      where: { uuid: r.uuid },
      create: {
        uuid: r.uuid,
        group: r.group ?? null,
        image: r.image ?? null,
        created_at: BigInt(r.created_at ?? Date.now()),
      },
      update: {
        group: r.group ?? null,
        image: r.image ?? null,
      },
    });
  }

  return {
    users: userMig,
    counts: {
      services: services.length,
      posts: posts.length,
      projects: projects.length,
      groups: groups.length,
      references: references.length,
    },
  };
}
