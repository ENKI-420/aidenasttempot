import { logger } from "./logger"

/**
 * Interface for performance metrics
 */
export interface PerformanceMetrics {
  name: string
  duration: number
  startTime: number
  endTime: number
  metadata?: Record<string, any>
}

/**
 * Class for tracking performance metrics
 */
export class PerformanceTracker {
  private metrics: Map<string, PerformanceMetrics> = new Map()

  /**
   * Starts tracking a performance metric
   */
  start(name: string, metadata?: Record<string, any>): void {
    const startTime = performance.now()
    this.metrics.set(name, {
      name,
      duration: 0,
      startTime,
      endTime: 0,
      metadata,
    })
  }

  /**
   * Ends tracking a performance metric
   */
  end(name: string, additionalMetadata?: Record<string, any>): PerformanceMetrics | undefined {
    const metric = this.metrics.get(name)

    if (!metric) {
      logger.warn(`Attempted to end tracking for non-existent metric: ${name}`)
      return undefined
    }

    const endTime = performance.now()
    const duration = endTime - metric.startTime

    const updatedMetric: PerformanceMetrics = {
      ...metric,
      duration,
      endTime,
      metadata: {
        ...metric.metadata,
        ...additionalMetadata,
      },
    }

    this.metrics.set(name, updatedMetric)

    // Log the performance metric
    logger.info(`Performance metric: ${name}`, {
      duration: `${duration.toFixed(2)}ms`,
      ...updatedMetric.metadata,
    })

    return updatedMetric
  }

  /**
   * Gets a performance metric
   */
  get(name: string): PerformanceMetrics | undefined {
    return this.metrics.get(name)
  }

  /**
   * Gets all performance metrics
   */
  getAll(): PerformanceMetrics[] {
    return Array.from(this.metrics.values())
  }

  /**
   * Clears all performance metrics
   */
  clear(): void {
    this.metrics.clear()
  }

  /**
   * Executes a function and tracks its performance
   */
  async track<T>(name: string, fn: () => Promise<T>, metadata?: Record<string, any>): Promise<T> {
    this.start(name, metadata)

    try {
      const result = await fn()
      this.end(name)
      return result
    } catch (error) {
      this.end(name, { error: error instanceof Error ? error.message : "Unknown error" })
      throw error
    }
  }
}

// Create and export a default performance tracker instance
export const performanceTracker = new PerformanceTracker()
