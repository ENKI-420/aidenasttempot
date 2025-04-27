"use client"

import { useRef, useState } from "react"
import styles from "./aiden-logo-animated.module.css"

interface AidenLogoLargeAnimatedProps {
  className?: string
  width?: number
  height?: number
  interactive?: boolean
}

export function AidenLogoLargeAnimated({
  className = "",
  width = 120,
  height = 40,
  interactive = true,
}: AidenLogoLargeAnimatedProps) {
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
      width={width}
      height={height}
      viewBox="0 0 120 40"
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
      {/* Logo icon */}
      <g transform="translate(0, 0) scale(1.25)" className={styles.logoIcon}>
        <circle cx="16" cy="20" r="12" fill="#0D1117" className={styles.background} />
        <path
          d="M16 8C9.38 8 4 13.38 4 20C4 26.62 9.38 32 16 32C22.62 32 28 26.62 28 20C28 13.38 22.62 8 16 8ZM16 30C10.48 30 6 25.52 6 20C6 14.48 10.48 10 16 10C21.52 10 26 14.48 26 20C26 25.52 21.52 30 16 30Z"
          fill="#10B981"
          fillOpacity="0.2"
          className={styles.circuitBg}
        />

        {/* Circuit lines */}
        <g className={styles.circuitLines}>
          <path
            d="M16 12V14"
            stroke="#10B981"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.circuitLine1}
          />
          <path
            d="M16 26V28"
            stroke="#10B981"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.circuitLine2}
          />
          <path
            d="M8 20H10"
            stroke="#10B981"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.circuitLine3}
          />
          <path
            d="M22 20H24"
            stroke="#10B981"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.circuitLine4}
          />
          <path
            d="M10.34 14.34L12.17 16.17"
            stroke="#10B981"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.circuitLine5}
          />
          <path
            d="M21.66 25.66L19.83 23.83"
            stroke="#10B981"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.circuitLine6}
          />
          <path
            d="M10.34 25.66L12.17 23.83"
            stroke="#10B981"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.circuitLine7}
          />
          <path
            d="M21.66 14.34L19.83 16.17"
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
            d="M12 24L16 16L20 24"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.aLetterPath}
          />
          <path
            d="M13.5 21.5H18.5"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.aLetterCrossbar}
          />
        </g>

        {/* Digital nodes */}
        <g className={styles.nodes}>
          <circle cx="16" cy="16" r="1.25" fill="#10B981" className={styles.node1} />
          <circle cx="12" cy="24" r="1.25" fill="#10B981" className={styles.node2} />
          <circle cx="20" cy="24" r="1.25" fill="#10B981" className={styles.node3} />
          <circle cx="13.5" cy="21.5" r="0.75" fill="#10B981" className={styles.node4} />
          <circle cx="18.5" cy="21.5" r="0.75" fill="#10B981" className={styles.node5} />
        </g>

        {/* Pulse overlay */}
        <circle
          cx="16"
          cy="20"
          r="13"
          stroke="#10B981"
          strokeWidth="0.5"
          strokeOpacity="0.5"
          fill="none"
          className={styles.pulse}
        />

        {/* Hover/click effect overlay */}
        <circle
          cx="16"
          cy="20"
          r="14"
          fill="url(#hoverGradientLarge)"
          className={styles.interactionOverlay}
          style={{ opacity: isHovered ? 0.2 : 0, transform: isPressed ? "scale(0.9)" : "scale(1)" }}
        />
      </g>

      {/* AIDEN text */}
      <g transform="translate(36, 0)" className={`${styles.aidenText} ${isPressed ? styles.textPressed : ""}`}>
        <path
          d="M10.336 28L6.656 16.4H9.376L11.936 25.28H12.096L14.656 16.4H17.376L13.696 28H10.336Z"
          fill="#10B981"
          className={styles.textChar1}
        />
        <path d="M19.0273 28V16.4H21.5873V28H19.0273Z" fill="#10B981" className={styles.textChar2} />
        <path d="M24.0977 28V16.4H26.6577V25.76H31.8177V28H24.0977Z" fill="#10B981" className={styles.textChar3} />
        <path
          d="M33.4688 28V16.4H41.9488V18.64H36.0288V20.96H41.3088V23.2H36.0288V25.76H41.9488V28H33.4688Z"
          fill="#10B981"
          className={styles.textChar4}
        />
        <path d="M43.6 28V16.4H46.16V25.76H51.32V28H43.6Z" fill="#10B981" className={styles.textChar5} />
      </g>

      {/* Tagline */}
      <text x="36" y="36" fontSize="8" fill="#8B949E" fontFamily="sans-serif" className={styles.tagline}>
        Advanced AI Platform
      </text>

      {/* Gradient definitions */}
      <defs>
        <radialGradient id="hoverGradientLarge" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}
