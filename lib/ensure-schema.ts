import prisma from "@/lib/prisma";

let ready: Promise<void> | null = null;

/**
 * Create Şah Yapı tables if missing. Used because `prisma db push` cannot run
 * during Vercel builds (known fail cause on this project).
 */
async function createTablesIfNeeded() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "sahyapi_users" (
      "id" SERIAL PRIMARY KEY,
      "email" TEXT NOT NULL UNIQUE,
      "password" TEXT NOT NULL,
      "confirmed" BOOLEAN NOT NULL DEFAULT false
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "sahyapi_services" (
      "uuid" TEXT PRIMARY KEY,
      "title" TEXT NOT NULL,
      "slug" TEXT NOT NULL UNIQUE,
      "short_description" TEXT,
      "description" TEXT,
      "image" TEXT,
      "category" TEXT,
      "highlights" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
      "created_at" BIGINT NOT NULL
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "sahyapi_posts" (
      "uuid" TEXT PRIMARY KEY,
      "title" TEXT NOT NULL,
      "slug" TEXT NOT NULL UNIQUE,
      "description" TEXT,
      "image" TEXT,
      "created_at" BIGINT NOT NULL
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "sahyapi_projects" (
      "uuid" TEXT PRIMARY KEY,
      "title" TEXT NOT NULL,
      "slug" TEXT NOT NULL UNIQUE,
      "description" TEXT,
      "image" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
      "is_completed" BOOLEAN NOT NULL DEFAULT false,
      "created_at" BIGINT NOT NULL
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "sahyapi_references" (
      "uuid" TEXT PRIMARY KEY,
      "group" TEXT,
      "image" TEXT,
      "created_at" BIGINT NOT NULL
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "sahyapi_groups" (
      "uuid" TEXT PRIMARY KEY,
      "title" TEXT NOT NULL,
      "created_at" BIGINT NOT NULL
    );
  `);
}

export async function ensureSchema() {
  if (!ready) {
    ready = createTablesIfNeeded().catch((e) => {
      ready = null;
      throw e;
    });
  }
  await ready;
}
