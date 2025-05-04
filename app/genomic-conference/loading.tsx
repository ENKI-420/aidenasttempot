import { LoadingSpinner } from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner size="lg" />
      <span className="ml-2 text-lg font-medium">Loading Genomic Conference...</span>
    </div>
  )
}
