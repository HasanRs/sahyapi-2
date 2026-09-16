import { NextResponse } from "next/server";
import { getServices } from "@/lib/content";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(getServices());
}
