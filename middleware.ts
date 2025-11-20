import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./auth";
import { PUBLIC_ROUTES, PRIVATE_ROUTES, ROOT } from "./lib/routes";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const currentPath = request.nextUrl.pathname;

  if (session?.user) {
    // Skip database call - let the page/layout handle workspace redirect
    const isOnPrivateRoute = PRIVATE_ROUTES.some((route) =>
      currentPath.startsWith(route)
    );

    if (!isOnPrivateRoute && currentPath !== "/onboard") {
      // Redirect to onboard - let onboard page check if workspace exists
      return NextResponse.redirect(`${request.nextUrl.origin}/onboard`);
    }
  } else {
    const isOnPublicRoute = PUBLIC_ROUTES.includes(currentPath);
    const isRoot = currentPath === ROOT;

    if (!isOnPublicRoute && !isRoot) {
      return NextResponse.redirect(`${request.nextUrl.origin}/sign-in`);
    }
  }

  const headers = new Headers(request.headers);
  headers.set("x-current-path", currentPath);

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
