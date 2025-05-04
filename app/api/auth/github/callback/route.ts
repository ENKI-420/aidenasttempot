import { type NextRequest, NextResponse } from "next/server"
import { withErrorHandling } from "@/lib/api-middleware"
import { createAuthenticationError, createExternalServiceError, tryCatch } from "@/lib/error-handling"
import { logger } from "@/lib/logger"

async function handler(req: NextRequest) {
  return await tryCatch(
    async () => {
      // Get the URL parameters
      const url = new URL(req.url)
      const code = url.searchParams.get("code")
      const state = url.searchParams.get("state")

      // Get the state from the cookie
      const storedState = req.cookies.get("github_oauth_state")?.value

      // Validate the state to prevent CSRF attacks
      if (!state || !storedState || state !== storedState) {
        throw createAuthenticationError("Invalid state parameter")
      }

      // Validate the code
      if (!code) {
        throw createAuthenticationError("No authorization code received")
      }

      // Get GitHub OAuth configuration
      const clientId = process.env.GITHUB_CLIENT_ID
      const clientSecret = process.env.GITHUB_CLIENT_SECRET

      if (!clientId || !clientSecret) {
        throw createExternalServiceError("GitHub OAuth credentials are not configured")
      }

      // Exchange the code for an access token
      const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: process.env.REDIRECT_URI,
        }),
      })

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.text()
        logger.error("Failed to exchange GitHub code for token", {
          status: tokenResponse.status,
          error: errorData,
        })
        throw createExternalServiceError("Failed to authenticate with GitHub")
      }

      const tokenData = await tokenResponse.json()

      if (tokenData.error) {
        logger.error("GitHub token exchange error", { error: tokenData.error })
        throw createExternalServiceError(`GitHub authentication error: ${tokenData.error_description}`)
      }

      const accessToken = tokenData.access_token

      // Get the user information
      const userResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      })

      if (!userResponse.ok) {
        const errorData = await userResponse.text()
        logger.error("Failed to fetch GitHub user data", {
          status: userResponse.status,
          error: errorData,
        })
        throw createExternalServiceError("Failed to fetch user information from GitHub")
      }

      const userData = await userResponse.json()

      // Get the user's email
      const emailResponse = await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `token ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      })

      let primaryEmail = userData.email

      if (emailResponse.ok) {
        const emails = await emailResponse.json()
        const primary = emails.find((email: any) => email.primary)
        if (primary) {
          primaryEmail = primary.email
        }
      }

      // Create a session token
      const sessionToken = crypto.randomUUID()

      // In a real app, you would store the session in a database
      // For now, we'll just set a cookie with the user info

      const user = {
        id: userData.id.toString(),
        username: userData.login,
        name: userData.name || userData.login,
        email: primaryEmail,
        avatar: userData.avatar_url,
      }

      logger.info("GitHub authentication successful", {
        userId: user.id,
        username: user.username,
      })

      // Create the response with a redirect to the dashboard
      const response = NextResponse.redirect(new URL("/dashboard", req.url))

      // Set the session cookie
      response.cookies.set("session_token", sessionToken, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      })

      // Set a cookie with the user info (not httpOnly so it's accessible to client JS)
      response.cookies.set("user_info", JSON.stringify(user), {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      })

      // Clear the state cookie
      response.cookies.set("github_oauth_state", "", {
        path: "/",
        maxAge: 0,
      })

      return response
    },
    (error) => {
      logger.error("GitHub OAuth callback error", { error })

      // Redirect to login page with error
      const loginUrl = new URL("/login", req.url)
      loginUrl.searchParams.append("error", "github_auth_failed")

      const response = NextResponse.redirect(loginUrl.toString())

      // Clear the state cookie
      response.cookies.set("github_oauth_state", "", {
        path: "/",
        maxAge: 0,
      })

      return response
    },
  )
}

export const GET = withErrorHandling(handler)
