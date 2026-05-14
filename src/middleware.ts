import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(request: NextRequest) {
    // Get the token from the request
    const token = (request as any).nextauth?.token;

    // Protected routes that require authentication
    const protectedPaths = [
      "/dashboard",
      "/resume",
      "/cover-letter",
      "/settings",
      "/profile",
      "/api/resumes",
      "/api/cover-letters",
    ];

    const pathname = request.nextUrl.pathname;
    
    // Explicitly allow unauthenticated access to builder creation pages
    const isPublicNewPath = pathname === "/resume/new" || pathname === "/cover-letter/new";

    const isProtectedPath = protectedPaths.some(
      (path) => pathname === path || pathname.startsWith(path)
    );

    // If accessing protected route without token
    if (isProtectedPath && !isPublicNewPath && !token) {
      // If it's an API route, return 401 Unauthorized instead of redirecting
      // This prevents POST requests from being redirected to pages and triggering "Failed to find Server Action"
      if (pathname.startsWith("/api/")) {
        return new NextResponse(
          JSON.stringify({ error: "Authentication required" }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        );
      }
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/", // Redirect to home where the auth modal is
    },
    callbacks: {
      authorized: ({ token }) => {
        // This controls whether the middleware applies
        // We return true to continue, and let our middleware function handle the logic
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/resume/:path*",
    "/cover-letter/:path*",
    "/settings/:path*",
    "/profile/:path*",
    "/api/resumes/:path*",
    "/api/cover-letters/:path*",
  ],
};
