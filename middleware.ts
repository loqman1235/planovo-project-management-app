export { auth as middleware } from "@/auth";

// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "./auth";

// const protectedRoutes = ["/dashboard"];

// export async function middleware(req: NextRequest) {
//   const { nextUrl } = req;
//   const isProtectedRoute = protectedRoutes.some((route) =>
//     nextUrl.pathname.startsWith(route),
//   );

//   if (isProtectedRoute) {
//     const session = await auth();

//     if (!session) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//   }

//   return NextResponse.next();
// }
