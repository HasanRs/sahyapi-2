import prisma from "@/lib/prisma";
import {NextApiRequest, NextApiResponse} from "next";
import {hash} from "bcrypt";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const {email, password} = await req.json();
    const exists = await prisma.atamep_users.findUnique({
        where: {
            email,
        },
    });
    if (exists) {
        return NextResponse.json({error: "Hesap zaten oluşturulmuş!"}, {status: 400});
    } else {
        const user = await prisma.atamep_users.create({
            data: {
                email,
                password: await hash(password, 10),
                confirmed: false,
            },
        });
        return NextResponse.json(user);
    }
}
