import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "your_github_client_id"
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "your_github_client_secret"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    // Verify state to prevent CSRF attacks
    const storedState = cookies().get("github_oauth_state")?.value

    if (!state || !storedState || state !== storedState) {
      return NextResponse.redirect(new URL("/login?error=invalid_state", request.url))
    }

    // Clean up the state cookie
    cookies().delete("github_oauth_state")

    if (!code) {
      return NextResponse.redirect(new URL("/login?error=no_code", request.url))
    }

    // Exchange code for access token
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenData.access_token) {
      return NextResponse.redirect(new URL("/login?error=token_error", request.url))
    }

    // Get user data from GitHub API
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const userData = await userResponse.json()

    // Get user emails if needed
    const emailsResponse = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const emails = await emailsResponse.json()
    const primaryEmail = emails.find((email: any) => email.primary)?.email || emails[0]?.email

    // Create a session
    const sessionToken = crypto.randomUUID()

    // Set a secure HTTP-only cookie
    cookies().set({
      name: "session_token",
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    // In a real app, you would store the session in a database
    // along with the user information

    // Redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url))
  } catch (error) {
    console.error("GitHub OAuth error:", error)
    return NextResponse.redirect(new URL("/login?error=oauth_error", request.url))
  }
}
