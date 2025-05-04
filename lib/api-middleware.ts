import { type NextRequest, NextResponse } from "next/server"
import { AppError, createServerError } from "./error-handling"
import { logger } from "./logger"

/**
 * Type for API route handlers
 */
export type ApiHandler = (req: NextRequest, params?: any) => Promise<NextResponse> | NextResponse

/**
 * Middleware for API routes to handle errors consistently
 */
export function withErrorHandling(handler: ApiHandler): ApiHandler {
  return async (req: NextRequest, params?: any) => {
    const requestId = crypto.randomUUID()
    const startTime = performance.now()

    try {
      // Log request details
      logger.info("API request received", {
        requestId,
        method: req.method,
        url: req.url,
        params,
      })

      // Execute the handler
      const response = await handler(req, params)

      // Calculate and log response time
      const responseTime = Math.round(performance.now() - startTime)
      logger.info("API request completed", {
        requestId,
        responseTime,
        status: response.status,
      })

      return response
    } catch (error: any) {
      // Calculate error response time
      const responseTime = Math.round(performance.now() - startTime)

      // Handle AppError instances
      if (error instanceof AppError) {
        logger.error("API request failed with application error", {
          requestId,
          responseTime,
          error: error.toJSON(),
        })

        return NextResponse.json(
          { error: error.message, type: error.type, details: error.details },
          { status: error.statusCode },
        )
      }

      // Handle unknown errors
      logger.error("API request failed with unhandled error", {
        requestId,
        responseTime,
        error: error.message || "Unknown error",
        stack: error.stack,
      })

      const serverError = createServerError("An unexpected error occurred")

      return NextResponse.json(
        { error: serverError.message, type: serverError.type },
        { status: serverError.statusCode },
      )
    }
  }
}
