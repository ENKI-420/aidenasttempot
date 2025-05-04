import { PatientCaseStudies } from "@/components/patient-case-studies"
import DashboardNav from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, DnaIcon as DNA, Activity, ClipboardList, User } from "lucide-react"

export default function PatientCaseStudiesPage() {
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
          <h1 className="text-3xl font-bold mb-2">Patient Case Studies</h1>
          <p className="text-gray-400 mb-8">
            Explore real-world examples of how genomic data translates to clinical decisions through AI-powered
            analysis, demonstrating the complete pathway from genetic variants to personalized treatment plans.
          </p>

          <PatientCaseStudies />

          <div className="mt-12 bg-gray-900 border border-green-900/40 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">The Genomic-to-Clinical Pathway</h2>
            <p className="text-gray-400 mb-6">
              These case studies illustrate the complete pathway from genomic data to clinical action. Each step in this
              process represents a critical translation point where AI analysis helps convert complex genetic
              information into actionable medical insights.
            </p>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-green-900/40">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-green-900/20 flex items-center justify-center">
                    <DNA className="h-6 w-6 text-green-500" />
                  </div>
                </div>
                <h3 className="text-center font-medium mb-2">Genomic Variants</h3>
                <p className="text-xs text-gray-400 text-center">
                  Identification of genetic variations through next-generation sequencing and AI-powered variant calling
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg border border-green-900/40">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-blue-900/20 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <h3 className="text-center font-medium mb-2">Clinical Implications</h3>
                <p className="text-xs text-gray-400 text-center">
                  AI analysis correlates variants with potential health impacts based on scientific literature and
                  databases
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg border border-green-900/40">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-yellow-900/20 flex items-center justify-center">
                    <ClipboardList className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
                <h3 className="text-center font-medium mb-2">Treatment Recommendations</h3>
                <p className="text-xs text-gray-400 text-center">
                  Evidence-based treatment plans derived from clinical implications, considering efficacy and patient
                  factors
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg border border-green-900/40">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-purple-900/20 flex items-center justify-center">
                    <User className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
                <h3 className="text-center font-medium mb-2">Patient Outcomes</h3>
                <p className="text-xs text-gray-400 text-center">
                  Real-world results of genomically-informed care, demonstrating the clinical value of precision
                  medicine
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Link href="/genomic-visualization">
              <Button className="bg-green-600 hover:bg-green-700 text-white font-medium">
                Explore Genomic Visualization
              </Button>
            </Link>
            <Link href="/genomic-timeline">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">View Genomic Timeline</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
