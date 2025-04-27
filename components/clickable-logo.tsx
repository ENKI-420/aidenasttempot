"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AidenLogoAnimated } from "./aiden-logo-animated"
import { AidenLogoLargeAnimated } from "./aiden-logo-large-animated"

interface ClickableLogoProps {
  size?: number
  large?: boolean
  width?: number
  height?: number
  href?: string
  onClick?: () => void
  className?: string
  showText?: boolean
}

export function ClickableLogo({
  size = 32,
  large = false,
  width = 120,
  height = 40,
  href = "/",
  onClick,
  className = "",
  showText = true,
}: ClickableLogoProps) {
  const router = useRouter()
  const [ripple, setRipple] = useState({ active: false, x: 0, y: 0 })

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setRipple({ active: true, x, y })
    setTimeout(() => setRipple({ active: false, x: 0, y: 0 }), 600)

    // Execute custom onClick if provided
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <Link href={href} className={`relative flex items-center gap-2 group ${className}`} onClick={handleClick}>
      {large ? (
        <AidenLogoLargeAnimated width={width} height={height} interactive={true} />
      ) : (
        <div className="flex items-center gap-2">
          <AidenLogoAnimated size={size} interactive={true} />
          {showText && (
            <span className="text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-green-500">
              AIDEN
            </span>
          )}
        </div>
      )}

      {/* Ripple effect */}
      {ripple.active && (
        <span
          className="absolute rounded-full bg-green-500/20 animate-ripple"
          style={{
            width: "100px",
            height: "100px",
            left: ripple.x - 50,
            top: ripple.y - 50,
          }}
        />
      )}
    </Link>
  )
}
