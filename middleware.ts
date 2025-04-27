import { type NextRequest, NextResponse } from "next/server"

// Define which routes require authentication
const protectedRoutes = ["/dashboard"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route requires authentication
  const isProtectedRoute = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  if (isProtectedRoute) {
    // Check for the session token
    const sessionToken = request.cookies.get("session_token")?.value

    // If no session token is found, redirect to login
    if (!sessionToken) {
      const loginUrl = new URL("/login", request.url)
      return NextResponse.redirect(loginUrl)
    }

    // In a real app, you would validate the session token here
    // For now, we'll just check if it exists
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api/auth routes (authentication endpoints)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api/auth).*)",
  ],
}
