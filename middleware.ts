import {getToken} from "next-auth/jwt";
import {NextRequest, NextResponse} from "next/server";
import {routes} from "@/app/admin/layouts/AdminLayout";

const sessionRoutes: string[] = ['/login', '/register'];

export default async function middleware(req: NextRequest) {
    // Get the pathname of the request (e.g. /, /admin)
    const path = req.nextUrl.pathname;

    // If it's the root path, just render it
    if (path === "/") {
        return NextResponse.next();
    }

    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (!session &&
        !sessionRoutes.includes(path) &&
        path.startsWith('/admin')
    ) {
        return NextResponse.redirect(new URL("/login", req.url));
    } else if (
        session &&
        sessionRoutes.includes(path) ||
        path === '/admin'
    ) {
        return NextResponse.redirect(new URL("/admin/hizmetler", req.url));
    }
    return NextResponse.next();
}
