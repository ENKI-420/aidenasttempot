import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// In a real application, you would use a proper hashing library
// and store user credentials securely in a database
const MOCK_USERS = [
  {
    id: "1",
    username: "demo",
    // In production, this would be a hashed password
    password: "password123",
    name: "Demo User",
    email: "demo@example.com",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Basic validation
    if (!username || !password) {
      return NextResponse.json({ success: false, message: "Username and password are required" }, { status: 400 })
    }

    // In a real app, you would:
    // 1. Query your database for the user
    // 2. Compare password hashes using bcrypt or similar
    // 3. Generate a JWT or session token

    // For demo purposes, we're using a simple mock user check
    const user = MOCK_USERS.find((u) => u.username === username && u.password === password)

    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid username or password" }, { status: 401 })
    }

    // Create a session (in a real app, use a proper session library)
    const sessionToken = crypto.randomUUID()

    // Set a secure HTTP-only cookie
    cookies().set({
      name: "session_token",
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      // Expire in 7 days
      maxAge: 60 * 60 * 24 * 7,
    })

    // Return user data (excluding password)
    const { password: _, ...userData } = user

    return NextResponse.json({
      success: true,
      user: userData,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "An error occurred during login" }, { status: 500 })
  }
}
