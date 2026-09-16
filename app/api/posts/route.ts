import { NextResponse } from "next/server";
import { getPosts } from "@/lib/content";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(getPosts());
}
