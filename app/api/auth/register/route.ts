import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { migrateLegacyUsers } from "@/lib/migrate-legacy-users";

export async function POST(req: Request) {
  await migrateLegacyUsers();

  const { email, password } = await req.json();
  const exists = await prisma.sahyapi_users.findUnique({
    where: { email },
  });
  if (exists) {
    return NextResponse.json(
      { error: "Kullanıcı zaten mevcut!" },
      { status: 400 }
    );
  } else {
    const user = await prisma.sahyapi_users.create({
      data: {
        email,
        password: await hash(password, 10),
      },
    });
    return NextResponse.json(user);
  }
}
