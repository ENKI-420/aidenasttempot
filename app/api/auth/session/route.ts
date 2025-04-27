import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const sessionToken = cookies().get("session_token")?.value

    if (!sessionToken) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 })
    }

    // In a real app, you would:
    // 1. Validate the session token against your database
    // 2. Return the user data associated with the session

    // For demo purposes, we're just checking if the token exists
    return NextResponse.json({
      isAuthenticated: true,
      // In a real app, this would be fetched from your database
      user: {
        id: "1",
        name: "Authenticated User",
        email: "user@example.com",
      },
    })
  } catch (error) {
    console.error("Session check error:", error)
    return NextResponse.json({ isAuthenticated: false, error: "Failed to validate session" }, { status: 500 })
  }
}
