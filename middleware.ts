import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./auth";
import { PUBLIC_ROUTES, PRIVATE_ROUTES, ROOT } from "./lib/routes";
import { getDefaultWorkspace } from "./lib/workspace";

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export async function middleware(request: NextRequest) {
  const session = await auth();
  const currentPath = request.nextUrl.pathname;

  if (session?.user) {
    const defaultWorkspace = await getDefaultWorkspace(session.user.id);

    if (currentPath === "/onboard" && defaultWorkspace) {
      return NextResponse.redirect(
        `${request.nextUrl.origin}/workspaces/${defaultWorkspace.id}`
      );
    }

    const isOnPrivateRoute = PRIVATE_ROUTES.some((route) =>
      currentPath.startsWith(route)
    );

    if (!isOnPrivateRoute) {
      if (defaultWorkspace) {
        return NextResponse.redirect(
          `${request.nextUrl.origin}/workspaces/${defaultWorkspace.id}`
        );
      } else {
        return NextResponse.redirect(`${request.nextUrl.origin}/onboard`);
      }
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
