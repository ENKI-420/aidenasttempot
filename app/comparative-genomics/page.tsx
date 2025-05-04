import { ComparativeGenomicAnalysis } from "@/components/comparative-genomic-analysis"
import DashboardNav from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Brain, Microscope } from "lucide-react"

export default function ComparativeGenomicsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardNav />

      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-6">
          <Link href="/" className="text-gray-400 hover:text-green-500 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">AI vs. Traditional Genomic Analysis</h1>
          <p className="text-gray-400 mb-8">
            A comprehensive comparison of AI-powered and traditional approaches to genomic analysis, highlighting key
            differences in methodology, performance, and clinical outcomes.
          </p>

          <ComparativeGenomicAnalysis />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 border border-blue-900/40 rounded-lg p-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-900/20 flex items-center justify-center">
                  <Microscope className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-center mb-4">Traditional Approach</h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    <strong>Established Protocols:</strong> Well-documented, standardized workflows with clear decision
                    rules
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    <strong>Expert Judgment:</strong> Integration of clinical expertise and human reasoning for complex
                    cases
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    <strong>Transparency:</strong> Clear evidence trail and interpretable decision-making process
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    <strong>Limitations:</strong> Time-intensive, variable consistency, limited ability to detect
                    complex patterns
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 border border-green-900/40 rounded-lg p-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-green-900/20 flex items-center justify-center">
                  <Brain className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-center mb-4">AI-Powered Approach</h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>
                    <strong>Speed & Scale:</strong> Rapid analysis of vast datasets and literature in minutes or hours
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>
                    <strong>Pattern Recognition:</strong> Detection of subtle patterns and complex relationships across
                    data
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>
                    <strong>Consistency:</strong> Standardized analysis criteria applied uniformly across all cases
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>
                    <strong>Limitations:</strong> Dependence on training data quality, interpretability challenges,
                    requires validation
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Link href="/genomic-timeline">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">Explore Genomic Timeline</Button>
            </Link>
            <Link href="/genomic-visualization">
              <Button className="bg-green-600 hover:bg-green-700 text-white font-medium">
                View Genomic Visualization
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
