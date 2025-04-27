interface AidenLogoProps {
  className?: string
  size?: number
}

export function AidenLogo({ className, size = 24 }: AidenLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Brain circuit background */}
      <circle cx="12" cy="12" r="10" fill="#0D1117" />
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
        fill="#10B981"
        fillOpacity="0.2"
      />

      {/* Circuit lines */}
      <path
        d="M12 6V8M12 16V18M6 12H8M16 12H18M7.75 7.75L9.17 9.17M16.25 16.25L14.83 14.83M7.75 16.25L9.17 14.83M16.25 7.75L14.83 9.17"
        stroke="#10B981"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* A letter stylized */}
      <path d="M9 14L12 8L15 14" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 12.5H14" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Digital nodes */}
      <circle cx="12" cy="8" r="1" fill="#10B981" />
      <circle cx="9" cy="14" r="1" fill="#10B981" />
      <circle cx="15" cy="14" r="1" fill="#10B981" />
      <circle cx="10" cy="12.5" r="0.5" fill="#10B981" />
      <circle cx="14" cy="12.5" r="0.5" fill="#10B981" />
    </svg>
  )
}
