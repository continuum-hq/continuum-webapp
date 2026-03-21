import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0].toLowerCase();
  const path = request.nextUrl.pathname;

  const isOpsHost = hostname.startsWith("ops.") || hostname === "ops.localhost";

  // Canonical URL on ops subdomain is "/" (not "/ops") — avoid duplicate paths in the address bar
  if (isOpsHost && path === "/ops") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Ops subdomain root: internally serve /ops but keep the browser URL as "/"
  if (isOpsHost && path === "/") {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", `${request.nextUrl.origin}/`);
      return NextResponse.redirect(loginUrl);
    }
    const url = request.nextUrl.clone();
    url.pathname = "/ops";
    return NextResponse.rewrite(url);
  }

  const needsAuth =
    path.startsWith("/dashboard") ||
    path.startsWith("/setup") ||
    path.startsWith("/ops");

  if (!needsAuth) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    const callback = `${path}${request.nextUrl.search}`;
    loginUrl.searchParams.set("callbackUrl", callback);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/setup/:path*",
    "/ops",
    "/ops/:path*",
  ],
};
