import { AidenLogoAnimated } from "./aiden-logo-animated"

interface LoadingSpinnerProps {
  size?: number
  className?: string
}

export function LoadingSpinner({ size = 40, className = "" }: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <AidenLogoAnimated size={size} />
      <p className="mt-2 text-sm text-gray-400 animate-pulse">Loading...</p>
    </div>
  )
}
