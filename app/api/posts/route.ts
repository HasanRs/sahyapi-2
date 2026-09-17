import { NextResponse } from "next/server";
import { getPosts } from "@/lib/firestore-content";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}
