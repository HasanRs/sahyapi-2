import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

/**
 * Temporary bootstrap: confirms an existing user when email+password match.
 * Remove this route after the admin account is activated.
 */
export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Eksik alan" }, { status: 400 });
  }

  const user = await prisma.atamep_users.findUnique({ where: { email } });
  if (!user || !(await compare(password, user.password))) {
    return NextResponse.json({ error: "Geçersiz" }, { status: 401 });
  }

  const updated = await prisma.atamep_users.update({
    where: { email },
    data: { confirmed: true },
    select: { id: true, email: true, confirmed: true },
  });

  return NextResponse.json(updated);
}
