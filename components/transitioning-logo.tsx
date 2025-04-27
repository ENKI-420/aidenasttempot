"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AidenLogoAnimated } from "./aiden-logo-animated"
import { AidenLogoLargeAnimated } from "./aiden-logo-large-animated"
import { AidenLogo3D } from "./aiden-logo-3d"
import { Button } from "@/components/ui/button"
import { CuboidIcon as Cube, ArrowLeft, ArrowRight } from "lucide-react"

interface TransitioningLogoProps {
  className?: string
  initialMode?: "2d" | "3d"
  size?: number
  width?: number
  height?: number
  showControls?: boolean
  autoRotate?: boolean
  showText?: boolean
  interactive?: boolean
}

export function TransitioningLogo({
  className = "",
  initialMode = "2d",
  size = 200,
  width = 300,
  height = 300,
  showControls = true,
  autoRotate = true,
  showText = true,
  interactive = true,
}: TransitioningLogoProps) {
  const [mode, setMode] = useState<"2d" | "3d" | "transitioning">(initialMode)
  const [direction, setDirection] = useState<"to3d" | "to2d">("to3d")
  const [isLarge, setIsLarge] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width, height })

  // Update container size when the window resizes
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  // Handle transition to 3D
  const transitionTo3D = () => {
    setDirection("to3d")
    setMode("transitioning")
    setTimeout(() => setMode("3d"), 500) // Match this with animation duration
  }

  // Handle transition to 2D
  const transitionTo2D = () => {
    setDirection("to2d")
    setMode("transitioning")
    setTimeout(() => setMode("2d"), 500) // Match this with animation duration
  }

  // Toggle between 2D and 3D
  const toggleMode = () => {
    if (mode === "2d") {
      transitionTo3D()
    } else if (mode === "3d") {
      transitionTo2D()
    }
  }

  // Toggle between small and large 2D logo
  const toggleSize = () => {
    setIsLarge(!isLarge)
  }

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div
        className="relative overflow-hidden flex items-center justify-center"
        style={{ width: containerSize.width, height: containerSize.height }}
      >
        <AnimatePresence mode="wait">
          {mode === "2d" && (
            <motion.div
              key="2d"
              initial={{ opacity: 0, scale: direction === "to2d" ? 0.8 : 1.2 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              {isLarge ? (
                <AidenLogoLargeAnimated width={size * 2} height={size} interactive={interactive} />
              ) : (
                <AidenLogoAnimated size={size} interactive={interactive} />
              )}
            </motion.div>
          )}

          {mode === "3d" && (
            <motion.div
              key="3d"
              initial={{ opacity: 0, scale: direction === "to3d" ? 0.8 : 1.2, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 1.2, rotateY: 90 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              <AidenLogo3D
                width={containerSize.width}
                height={containerSize.height}
                autoRotate={autoRotate}
                showText={showText}
                interactive={interactive}
              />
            </motion.div>
          )}

          {mode === "transitioning" && (
            <motion.div
              key="transition"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-20 h-20 rounded-full bg-green-900/20 flex items-center justify-center">
                <Cube className="h-10 w-10 text-green-500 animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showControls && (
        <div className="flex justify-center mt-4 gap-2">
          {mode === "2d" && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="border-green-900/40 text-green-500 hover:bg-green-900/20"
                onClick={toggleSize}
              >
                {isLarge ? "Small Logo" : "Large Logo"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-green-900/40 text-green-500 hover:bg-green-900/20"
                onClick={transitionTo3D}
              >
                <Cube className="mr-2 h-4 w-4" />
                View 3D
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}

          {mode === "3d" && (
            <Button
              variant="outline"
              size="sm"
              className="border-green-900/40 text-green-500 hover:bg-green-900/20"
              onClick={transitionTo2D}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              View 2D
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
