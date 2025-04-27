"use client"

import { useRef, useState } from "react"
import styles from "./aiden-logo-animated.module.css"

interface AidenLogoAnimatedProps {
  className?: string
  size?: number
  animationIntensity?: "subtle" | "medium" | "high"
  interactive?: boolean
}

export function AidenLogoAnimated({
  className = "",
  size = 24,
  animationIntensity = "subtle",
  interactive = true,
}: AidenLogoAnimatedProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  // Handle mouse/touch interactions if interactive is true
  const interactionProps = interactive
    ? {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => {
          setIsHovered(false)
          setIsPressed(false)
        },
        onMouseDown: () => setIsPressed(true),
        onMouseUp: () => setIsPressed(false),
        onTouchStart: () => setIsPressed(true),
        onTouchEnd: () => setIsPressed(false),
        style: { cursor: "pointer" },
      }
    : {}

  // Determine interaction state classes
  const interactionClass = interactive ? `${isHovered ? styles.hovered : ""} ${isPressed ? styles.pressed : ""}` : ""

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${styles.logoContainer} ${interactionClass}`}
      {...interactionProps}
      aria-label="AIDEN logo"
      role={interactive ? "button" : "img"}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsPressed(true)
              }
            }
          : undefined
      }
      onKeyUp={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsPressed(false)
                // Trigger click event or callback here if needed
              }
            }
          : undefined
      }
    >
      {/* Brain circuit background */}
      <circle cx="12" cy="12" r="10" fill="#0D1117" className={styles.background} />
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
        fill="#10B981"
        fillOpacity="0.2"
        className={styles.circuitBg}
      />

      {/* Circuit lines */}
      <g className={styles.circuitLines}>
        <path
          d="M12 6V8"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.circuitLine1}
        />
        <path
          d="M12 16V18"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.circuitLine2}
        />
        <path
          d="M6 12H8"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.circuitLine3}
        />
        <path
          d="M16 12H18"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.circuitLine4}
        />
        <path
          d="M7.75 7.75L9.17 9.17"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.circuitLine5}
        />
        <path
          d="M16.25 16.25L14.83 14.83"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.circuitLine6}
        />
        <path
          d="M7.75 16.25L9.17 14.83"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.circuitLine7}
        />
        <path
          d="M16.25 7.75L14.83 9.17"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.circuitLine8}
        />
      </g>

      {/* A letter stylized */}
      <g className={styles.aLetter}>
        <path
          d="M9 14L12 8L15 14"
          stroke="#10B981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.aLetterPath}
        />
        <path
          d="M10 12.5H14"
          stroke="#10B981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.aLetterCrossbar}
        />
      </g>

      {/* Digital nodes */}
      <g className={styles.nodes}>
        <circle cx="12" cy="8" r="1" fill="#10B981" className={styles.node1} />
        <circle cx="9" cy="14" r="1" fill="#10B981" className={styles.node2} />
        <circle cx="15" cy="14" r="1" fill="#10B981" className={styles.node3} />
        <circle cx="10" cy="12.5" r="0.5" fill="#10B981" className={styles.node4} />
        <circle cx="14" cy="12.5" r="0.5" fill="#10B981" className={styles.node5} />
      </g>

      {/* Pulse overlay */}
      <circle
        cx="12"
        cy="12"
        r="11"
        stroke="#10B981"
        strokeWidth="0.5"
        strokeOpacity="0.5"
        fill="none"
        className={styles.pulse}
      />

      {/* Hover/click effect overlay */}
      <circle
        cx="12"
        cy="12"
        r="12"
        fill="url(#hoverGradient)"
        className={styles.interactionOverlay}
        style={{ opacity: isHovered ? 0.2 : 0, transform: isPressed ? "scale(0.9)" : "scale(1)" }}
      />

      {/* Gradient definitions */}
      <defs>
        <radialGradient id="hoverGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}
