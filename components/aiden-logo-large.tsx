interface AidenLogoLargeProps {
  className?: string
  width?: number
  height?: number
}

export function AidenLogoLarge({ className, width = 120, height = 40 }: AidenLogoLargeProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Logo icon */}
      <g transform="translate(0, 0) scale(1.25)">
        <circle cx="16" cy="20" r="12" fill="#0D1117" />
        <path
          d="M16 8C9.38 8 4 13.38 4 20C4 26.62 9.38 32 16 32C22.62 32 28 26.62 28 20C28 13.38 22.62 8 16 8ZM16 30C10.48 30 6 25.52 6 20C6 14.48 10.48 10 16 10C21.52 10 26 14.48 26 20C26 25.52 21.52 30 16 30Z"
          fill="#10B981"
          fillOpacity="0.2"
        />

        {/* Circuit lines */}
        <path
          d="M16 12V14M16 26V28M8 20H10M22 20H24M10.34 14.34L12.17 16.17M21.66 25.66L19.83 23.83M10.34 25.66L12.17 23.83M21.66 14.34L19.83 16.17"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* A letter stylized */}
        <path d="M12 24L16 16L20 24" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.5 21.5H18.5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Digital nodes */}
        <circle cx="16" cy="16" r="1.25" fill="#10B981" />
        <circle cx="12" cy="24" r="1.25" fill="#10B981" />
        <circle cx="20" cy="24" r="1.25" fill="#10B981" />
        <circle cx="13.5" cy="21.5" r="0.75" fill="#10B981" />
        <circle cx="18.5" cy="21.5" r="0.75" fill="#10B981" />
      </g>

      {/* AIDEN text */}
      <g transform="translate(36, 0)">
        <path d="M10.336 28L6.656 16.4H9.376L11.936 25.28H12.096L14.656 16.4H17.376L13.696 28H10.336Z" fill="#10B981" />
        <path d="M19.0273 28V16.4H21.5873V28H19.0273Z" fill="#10B981" />
        <path d="M24.0977 28V16.4H26.6577V25.76H31.8177V28H24.0977Z" fill="#10B981" />
        <path
          d="M33.4688 28V16.4H41.9488V18.64H36.0288V20.96H41.3088V23.2H36.0288V25.76H41.9488V28H33.4688Z"
          fill="#10B981"
        />
        <path d="M43.6 28V16.4H46.16V25.76H51.32V28H43.6Z" fill="#10B981" />
      </g>

      {/* Tagline */}
      <text x="36" y="36" fontSize="8" fill="#8B949E" fontFamily="sans-serif">
        Advanced AI Platform
      </text>
    </svg>
  )
}
