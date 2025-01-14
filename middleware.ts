// export { auth as middleware } from "@/auth";

import { NextResponse, type NextRequest } from "next/server";

// import { auth } from "@/auth";

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);

  headers.set("x-current-path", request.nextUrl.pathname);

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
