/**
 * Log levels for the application
 */
export enum LogLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
  FATAL = "fatal",
}

/**
 * Interface for log entries
 */
export interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: Record<string, any>
}

/**
 * Logger configuration
 */
export interface LoggerConfig {
  minLevel: LogLevel
  enableConsole: boolean
}

/**
 * Default configuration
 */
const defaultConfig: LoggerConfig = {
  minLevel: process.env.NODE_ENV === "production" ? LogLevel.INFO : LogLevel.DEBUG,
  enableConsole: true,
}

/**
 * Logger service for consistent logging across the application
 */
export class Logger {
  private config: LoggerConfig

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = { ...defaultConfig, ...config }
  }

  /**
   * Creates a log entry
   */
  private createLogEntry(level: LogLevel, message: string, context?: Record<string, any>): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
    }
  }

  /**
   * Determines if a log level should be processed
   */
  private shouldLog(level: LogLevel): boolean {
    const levels = Object.values(LogLevel)
    const configLevelIndex = levels.indexOf(this.config.minLevel)
    const currentLevelIndex = levels.indexOf(level)

    return currentLevelIndex >= configLevelIndex
  }

  /**
   * Processes a log entry
   */
  private processLogEntry(entry: LogEntry): void {
    if (!this.shouldLog(entry.level)) {
      return
    }

    if (this.config.enableConsole) {
      const { level, message, context } = entry

      switch (level) {
        case LogLevel.DEBUG:
          console.debug(message, context)
          break
        case LogLevel.INFO:
          console.info(message, context)
          break
        case LogLevel.WARN:
          console.warn(message, context)
          break
        case LogLevel.ERROR:
        case LogLevel.FATAL:
          console.error(message, context)
          break
      }
    }

    // In a production environment, you would send logs to a service like
    // Datadog, New Relic, or a custom logging endpoint
  }

  /**
   * Log methods for different levels
   */
  debug(message: string, context?: Record<string, any>): void {
    this.processLogEntry(this.createLogEntry(LogLevel.DEBUG, message, context))
  }

  info(message: string, context?: Record<string, any>): void {
    this.processLogEntry(this.createLogEntry(LogLevel.INFO, message, context))
  }

  warn(message: string, context?: Record<string, any>): void {
    this.processLogEntry(this.createLogEntry(LogLevel.WARN, message, context))
  }

  error(message: string, context?: Record<string, any>): void {
    this.processLogEntry(this.createLogEntry(LogLevel.ERROR, message, context))
  }

  fatal(message: string, context?: Record<string, any>): void {
    this.processLogEntry(this.createLogEntry(LogLevel.FATAL, message, context))
  }
}

// Create and export a default logger instance
export const logger = new Logger()
