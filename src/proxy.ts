import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./services/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getUser();

  // ১. ইউজার যদি লগইন করা না থাকে এবং ড্যাশবোর্ড এক্সেস করতে চায়
  if (!user && pathname.startsWith("/dashboard")) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ২. ইউজার যদি অলরেডি লগইন করা থাকে এবং আবার লগইন পেজে যেতে চায়
  if (user && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ৩. অন্য সব ক্ষেত্রে রিডাইরেক্ট না করে পরের ধাপে যেতে দিন
  return NextResponse.next();
}

// ৪. এখানে matcher ঠিক করা খুব জরুরি
export const config = {
  matcher: [
    "/dashboard/:path*", // ড্যাশবোর্ডের সব রুট
    "/login", // লগইন পেজ
  ],
};

// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
// import { getUser } from "./services/auth";

// // This function can be marked `async` if using `await` inside
// export async function proxy(request: NextRequest) {
//   //   console.log(request.nextUrl);
//   const { pathname, origin } = request.nextUrl;
//   const user = await getUser();
//   if (!user) {
//     return NextResponse.redirect(
//       new URL(`/login?redirect=${pathname}`, request.url),
//     );
//   }
//   return NextResponse.redirect(new URL("/home", request.url));
// }

// // Alternatively, you can use a default export:
// // export default function proxy(request: NextRequest) { ... }

// export const config = {
//   matcher: "/dashboard",
// };
