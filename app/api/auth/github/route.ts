import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// GitHub OAuth configuration
// In a real app, these would be environment variables
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "your_github_client_id"
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "your_github_client_secret"
const REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:3000/api/auth/github/callback"

export async function GET(request: NextRequest) {
  // Generate a random state for CSRF protection
  const state = crypto.randomUUID()

  // Store the state in a cookie for verification later
  cookies().set({
    name: "github_oauth_state",
    value: state,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10, // 10 minutes
  })

  // Redirect to GitHub's authorization URL
  const githubAuthUrl = new URL("https://github.com/login/oauth/authorize")
  githubAuthUrl.searchParams.append("client_id", GITHUB_CLIENT_ID)
  githubAuthUrl.searchParams.append("redirect_uri", REDIRECT_URI)
  githubAuthUrl.searchParams.append("state", state)
  githubAuthUrl.searchParams.append("scope", "user:email")

  return NextResponse.redirect(githubAuthUrl.toString())
}
