import { GenomicTimelineVisualization } from "@/components/genomic-timeline-visualization"
import DashboardNav from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Clock, Brain, Activity } from "lucide-react"

export default function GenomicTimelinePage() {
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
          <h1 className="text-3xl font-bold mb-2">Genomic Insights Evolution</h1>
          <p className="text-gray-400 mb-8">
            Explore how genomic insights evolve into clinical outcomes over time, demonstrating the dynamic nature of
            precision medicine and the increasing accuracy of AI analysis.
          </p>

          <GenomicTimelineVisualization />

          <div className="mt-12 bg-gray-900 border border-green-900/40 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">The Temporal Dimension of Genomic Medicine</h2>
            <p className="text-gray-400 mb-6">
              Genomic medicine is not static—it evolves over time as our understanding deepens and AI capabilities
              advance. This timeline visualization demonstrates several key aspects of this evolution:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-green-900/40">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-blue-900/20 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <h3 className="text-center font-medium mb-2">Evolving Interpretations</h3>
                <p className="text-xs text-gray-400 text-center">
                  Variant classifications change as new evidence emerges, moving from uncertain to definitive clinical
                  significance
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg border border-green-900/40">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-red-900/20 flex items-center justify-center">
                    <Brain className="h-6 w-6 text-red-500" />
                  </div>
                </div>
                <h3 className="text-center font-medium mb-2">AI Confidence Growth</h3>
                <p className="text-xs text-gray-400 text-center">
                  AI analysis becomes more confident and accurate as algorithms improve and more data becomes available
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg border border-green-900/40">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-green-900/20 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-green-500" />
                  </div>
                </div>
                <h3 className="text-center font-medium mb-2">Treatment Refinement</h3>
                <p className="text-xs text-gray-400 text-center">
                  Clinical interventions become more targeted and effective as genomic insights mature and treatment
                  responses are observed
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Link href="/patient-case-studies">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                Explore Patient Case Studies
              </Button>
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
