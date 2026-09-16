import { NextRequest, NextResponse } from "next/server";
import { getReferences } from "@/lib/content";

export async function GET(request: NextRequest) {
  const limitParam = request.nextUrl.searchParams.get("limit");
  const limit = limitParam ? Number(limitParam) : undefined;
  return NextResponse.json(getReferences(Number.isFinite(limit) ? limit : undefined));
}
