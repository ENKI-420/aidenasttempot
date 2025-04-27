"use client"

import { useEffect, useRef } from "react"

export default function BotUsageChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Sample data - API requests over 30 days
    const data = Array.from({ length: 30 }, () => Math.floor(Math.random() * 50000) + 10000)

    // Chart configuration
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const maxValue = Math.max(...data) * 1.1 // Add 10% padding to the top

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background grid
    ctx.beginPath()
    ctx.strokeStyle = "#1f2937" // Dark gray
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i
      ctx.moveTo(padding, y)
      ctx.lineTo(padding + chartWidth, y)
    }

    // Vertical grid lines
    for (let i = 0; i <= 6; i++) {
      const x = padding + (chartWidth / 6) * i
      ctx.moveTo(x, padding)
      ctx.lineTo(x, padding + chartHeight)
    }

    ctx.stroke()

    // Draw axes labels
    ctx.fillStyle = "#9ca3af" // Gray
    ctx.font = "12px Inter, sans-serif"
    ctx.textAlign = "right"

    // Y-axis labels
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxValue / 5) * (5 - i))
      const y = padding + (chartHeight / 5) * i
      ctx.fillText(formatNumber(value), padding - 10, y + 4)
    }

    // X-axis labels (every 5 days)
    ctx.textAlign = "center"
    for (let i = 0; i <= 6; i++) {
      const day = Math.round((30 / 6) * i)
      const x = padding + (chartWidth / 6) * i
      ctx.fillText(day === 0 ? "Today" : `${day}d ago`, x, padding + chartHeight + 20)
    }

    // Draw line chart
    ctx.beginPath()
    ctx.strokeStyle = "#10b981" // Green
    ctx.lineWidth = 3

    // Create gradient for area under the line
    const gradient = ctx.createLinearGradient(0, padding, 0, padding + chartHeight)
    gradient.addColorStop(0, "rgba(16, 185, 129, 0.2)")
    gradient.addColorStop(1, "rgba(16, 185, 129, 0)")

    // Draw data points and connect them
    data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index
      const y = padding + chartHeight - (value / maxValue) * chartHeight

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Fill area under the line
    ctx.lineTo(padding + chartWidth, padding + chartHeight)
    ctx.lineTo(padding, padding + chartHeight)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw data points
    data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index
      const y = padding + chartHeight - (value / maxValue) * chartHeight

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = "#10b981" // Green
      ctx.fill()
      ctx.strokeStyle = "#0d9668" // Darker green
      ctx.lineWidth = 2
      ctx.stroke()
    })
  }, [])

  // Helper function to format numbers with K/M suffix
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  return (
    <div className="w-full h-[300px]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
