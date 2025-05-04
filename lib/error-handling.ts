/**
 * Standardized error types for consistent handling across the application
 */
export enum ErrorType {
  AUTHENTICATION = "AUTHENTICATION",
  AUTHORIZATION = "AUTHORIZATION",
  VALIDATION = "VALIDATION",
  NOT_FOUND = "NOT_FOUND",
  SERVER_ERROR = "SERVER_ERROR",
  EXTERNAL_SERVICE = "EXTERNAL_SERVICE",
  RATE_LIMIT = "RATE_LIMIT",
  DATABASE = "DATABASE",
}

/**
 * Application error class with standardized structure
 */
export class AppError extends Error {
  type: ErrorType
  statusCode: number
  details?: any

  constructor(message: string, type: ErrorType, statusCode: number, details?: any) {
    super(message)
    this.name = "AppError"
    this.type = type
    this.statusCode = statusCode
    this.details = details

    // Ensures proper stack trace for debugging
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }
  }

  /**
   * Converts the error to a JSON structure suitable for logging
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      type: this.type,
      statusCode: this.statusCode,
      details: this.details,
      stack: process.env.NODE_ENV === "development" ? this.stack : undefined,
    }
  }
}

/**
 * Factory functions for creating specific error types
 */
export const createAuthenticationError = (message: string, details?: any) =>
  new AppError(message, ErrorType.AUTHENTICATION, 401, details)

export const createAuthorizationError = (message: string, details?: any) =>
  new AppError(message, ErrorType.AUTHORIZATION, 403, details)

export const createValidationError = (message: string, details?: any) =>
  new AppError(message, ErrorType.VALIDATION, 400, details)

export const createNotFoundError = (message: string, details?: any) =>
  new AppError(message, ErrorType.NOT_FOUND, 404, details)

export const createServerError = (message: string, details?: any) =>
  new AppError(message, ErrorType.SERVER_ERROR, 500, details)

export const createExternalServiceError = (message: string, details?: any) =>
  new AppError(message, ErrorType.EXTERNAL_SERVICE, 502, details)

export const createRateLimitError = (message: string, details?: any) =>
  new AppError(message, ErrorType.RATE_LIMIT, 429, details)

export const createDatabaseError = (message: string, details?: any) =>
  new AppError(message, ErrorType.DATABASE, 500, details)

/**
 * Safely executes a function and handles any errors
 */
export async function tryCatch<T>(fn: () => Promise<T>, errorTransformer?: (error: any) => AppError): Promise<T> {
  try {
    return await fn()
  } catch (error: any) {
    if (error instanceof AppError) {
      throw error
    }

    if (errorTransformer) {
      throw errorTransformer(error)
    }

    // Default error handling if no transformer provided
    const message = error.message || "An unexpected error occurred"
    throw createServerError(message, { originalError: error.toString() })
  }
}
