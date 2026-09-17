import { NextRequest, NextResponse } from "next/server";
import { getReferences } from "@/lib/firestore-content";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const limitParam = request.nextUrl.searchParams.get("limit");
  const limit = limitParam ? Number(limitParam) : undefined;
  const references = await getReferences(
    Number.isFinite(limit) ? limit : undefined
  );
  return NextResponse.json(references);
}
