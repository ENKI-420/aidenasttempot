"use client"

import { useState, useEffect } from "react"
import { TransitioningLogo } from "./transitioning-logo"
import { Button } from "@/components/ui/button"
import { Repeat } from "lucide-react"

export function HomeLogoTransition() {
  const [mode, setMode] = useState<"2d" | "3d">("2d")
  const [autoTransition, setAutoTransition] = useState(true)

  // Auto transition between 2D and 3D every 5 seconds
  useEffect(() => {
    if (!autoTransition) return

    const interval = setInterval(() => {
      setMode((prev) => (prev === "2d" ? "3d" : "2d"))
    }, 5000)

    return () => clearInterval(interval)
  }, [autoTransition])

  const toggleMode = () => {
    setAutoTransition(false)
    setMode((prev) => (prev === "2d" ? "3d" : "2d"))
  }

  return (
    <div className="flex flex-col items-center">
      <TransitioningLogo initialMode={mode} width={300} height={300} size={100} showControls={false} className="mb-4" />
      <Button
        variant="outline"
        className="border-green-900/40 text-green-500 hover:bg-green-900/20"
        onClick={toggleMode}
      >
        <Repeat className="mr-2 h-4 w-4" />
        Toggle 2D/3D
      </Button>
    </div>
  )
}
