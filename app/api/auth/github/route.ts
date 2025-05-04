import { type NextRequest, NextResponse } from "next/server"
import { withErrorHandling } from "@/lib/api-middleware"
import { createExternalServiceError, tryCatch } from "@/lib/error-handling"
import { logger } from "@/lib/logger"

async function handler(req: NextRequest) {
  return await tryCatch(
    async () => {
      // Generate a random state value for CSRF protection
      const state = crypto.randomUUID()

      // Store the state in a cookie for verification later
      const stateOptions = {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        maxAge: 60 * 10, // 10 minutes
      }

      // Get GitHub OAuth configuration
      const clientId = process.env.GITHUB_CLIENT_ID
      if (!clientId) {
        throw createExternalServiceError("GitHub client ID is not configured")
      }

      // Construct the GitHub authorization URL
      const redirectUri = process.env.REDIRECT_URI
      const githubAuthUrl = new URL("https://github.com/login/oauth/authorize")
      githubAuthUrl.searchParams.append("client_id", clientId)
      githubAuthUrl.searchParams.append("redirect_uri", redirectUri || "")
      githubAuthUrl.searchParams.append("state", state)
      githubAuthUrl.searchParams.append("scope", "read:user user:email")

      logger.info("Redirecting to GitHub OAuth", {
        redirectUri,
        state,
      })

      // Create the response with the redirect
      const response = NextResponse.redirect(githubAuthUrl.toString())

      // Set the state cookie
      response.cookies.set("github_oauth_state", state, stateOptions)

      return response
    },
    (error) => {
      logger.error("Failed to initiate GitHub OAuth flow", { error })
      return createExternalServiceError("Failed to initiate GitHub authentication", {
        originalError: error.message,
      })
    },
  )
}

export const GET = withErrorHandling(handler)
