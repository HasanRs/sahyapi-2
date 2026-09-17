import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

const MAX_BYTES = 2.5 * 1024 * 1024; // ~2.5MB before base64 expansion

/**
 * Authenticated image upload — returns a data URL stored in Postgres fields.
 * No Firebase / Atamep storage.
 */
export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  const form = await req.formData();
  const file = form.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "file required" }, { status: 400 });
  }

  const blob = file as File;
  if (!["image/jpeg", "image/png", "image/webp"].includes(blob.type)) {
    return NextResponse.json(
      { error: "Only JPG, PNG or WEBP allowed" },
      { status: 400 }
    );
  }
  if (blob.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File too large (max ~2.5MB)" },
      { status: 400 }
    );
  }

  const buf = Buffer.from(await blob.arrayBuffer());
  const url = `data:${blob.type};base64,${buf.toString("base64")}`;
  return NextResponse.json({ url });
}
