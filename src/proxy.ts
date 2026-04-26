import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./services/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getUser();

  if (!user && pathname.startsWith("/dashboard")) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (user && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};

export default proxy;
