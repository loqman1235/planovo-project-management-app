import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./auth";
import { createInitialWorkspace } from "./actions/workspaceActions";
import { PUBLIC_ROUTES, PRIVATE_ROUTES, ROOT } from "./lib/routes";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const currentPath = request.nextUrl.pathname;

  // Redirect authenticated users to their workspace
  if (session?.user) {
    // Skip redirect if already on a private route
    const isOnPrivateRoute = PRIVATE_ROUTES.some((route) =>
      currentPath.startsWith(route)
    );

    if (!isOnPrivateRoute) {
      const workspace = await createInitialWorkspace(session.user.id);

      if (workspace) {
        return NextResponse.redirect(
          `${request.nextUrl.origin}/workspaces/${workspace.id}`
        );
      }
    }
  } else {
    // Redirect unauthenticated users away from private routes
    const isOnPublicRoute = PUBLIC_ROUTES.includes(currentPath);
    const isRoot = currentPath === ROOT;

    if (!isOnPublicRoute && !isRoot) {
      return NextResponse.redirect(`${request.nextUrl.origin}/sign-in`);
    }
  }

  // Pass the current path as a custom header
  const headers = new Headers(request.headers);
  headers.set("x-current-path", currentPath);

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: [
    // Match all routes except static files, APIs, and excluded paths
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
