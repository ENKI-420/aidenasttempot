import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    // Clear the session cookie
    cookies().delete("session_token")

    // In a real app, you would also invalidate the session in your database

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ success: false, message: "An error occurred during logout" }, { status: 500 })
  }
}
