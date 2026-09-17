import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { migrateLegacyUsers } from "@/lib/migrate-legacy-users";

let legacyChecked = false;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "E-posta", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          throw new Error("Lütfen e-posta veya şifre giriniz!");
        }

        if (!legacyChecked) {
          await migrateLegacyUsers();
          legacyChecked = true;
        }

        const user = await prisma.sahyapi_users.findUnique({
          where: { email },
        });
        if (!user || user.confirmed == false) {
          throw new Error("Geçersiz e-posta!");
        }
        if (!(await compare(password, user.password))) {
          throw new Error("Geçersiz e-posta veya şifre!");
        }
        return user;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
