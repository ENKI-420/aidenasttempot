import { GenomicVisualization3D } from "@/components/genomic-visualization-3d"
import DashboardNav from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Brain, Zap, Activity, Pill, Heart, AlertTriangle } from "lucide-react"

export default function GenomicVisualizationPage() {
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
          <h1 className="text-3xl font-bold mb-2">Genomic-to-Clinical Visualization</h1>
          <p className="text-gray-400 mb-8">
            Explore how AI translates genomic data into actionable clinical insights, visualizing both current
            capabilities and future frontiers.
          </p>

          <div className="bg-gray-900 border border-green-900/40 rounded-lg p-6 mb-8">
            <div className="flex flex-col items-center">
              <GenomicVisualization3D
                width={600}
                height={500}
                autoRotate={true}
                showLabels={true}
                showClinicalOutcomes={true}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-900 border border-green-900/40 rounded-lg p-6">
              <div className="bg-green-900/20 p-3 rounded-full w-fit mb-4">
                <Brain className="h-6 w-6 text-green-500" />
              </div>
              <h2 className="text-xl font-bold mb-3">Genomic Analysis</h2>
              <p className="text-gray-400 mb-4">
                Our AI platform analyzes genomic data to identify variants with potential clinical significance. The
                visualization highlights regions where AI has detected single nucleotide polymorphisms (SNPs) and
                structural variants.
              </p>
              <p className="text-gray-400">
                Current AI capabilities include identification of common variants and correlation with known databases,
                while future developments will enable more complex structural analysis and novel variant discovery.
              </p>
            </div>

            <div className="bg-gray-900 border border-green-900/40 rounded-lg p-6">
              <div className="bg-blue-900/20 p-3 rounded-full w-fit mb-4">
                <Activity className="h-6 w-6 text-blue-500" />
              </div>
              <h2 className="text-xl font-bold mb-3">Clinical Outcomes</h2>
              <p className="text-gray-400 mb-4">
                The visualization demonstrates how specific genomic variants connect to potential clinical outcomes,
                creating a clear pathway from genetic data to actionable medical insights.
              </p>
              <p className="text-gray-400">
                AI currently excels at identifying established genotype-phenotype correlations, while the frontier of
                precision medicine lies in predicting complex, multifactorial outcomes and personalized treatment
                responses.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900 border border-green-900/40 rounded-lg p-6">
              <div className="bg-red-900/20 p-3 rounded-full w-fit mb-4">
                <Heart className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Cardiovascular Risk</h3>
              <p className="text-gray-400 text-sm">
                Specific genetic variants can indicate increased risk for cardiovascular conditions. Our AI analyzes
                these markers to provide risk assessments based on established clinical correlations.
              </p>
            </div>

            <div className="bg-gray-900 border border-green-900/40 rounded-lg p-6">
              <div className="bg-yellow-900/20 p-3 rounded-full w-fit mb-4">
                <Pill className="h-5 w-5 text-yellow-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Medication Response</h3>
              <p className="text-gray-400 text-sm">
                Pharmacogenomic analysis identifies how genetic variations affect medication metabolism and efficacy,
                enabling more personalized treatment approaches and dosage recommendations.
              </p>
            </div>

            <div className="bg-gray-900 border border-green-900/40 rounded-lg p-6">
              <div className="bg-purple-900/20 p-3 rounded-full w-fit mb-4">
                <AlertTriangle className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Condition Susceptibility</h3>
              <p className="text-gray-400 text-sm">
                Genetic markers can indicate predisposition to specific conditions, allowing for preventative monitoring
                and early intervention strategies based on individual genomic profiles.
              </p>
            </div>
          </div>

          <div className="bg-gray-900 border border-green-900/40 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Current Capabilities vs. Future Frontiers</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-green-900/40">
                    <th className="py-3 px-4 text-left text-green-500">Capability</th>
                    <th className="py-3 px-4 text-left text-blue-500">Current AI Analysis</th>
                    <th className="py-3 px-4 text-left text-purple-500">Future Frontier</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-green-900/40">
                    <td className="py-3 px-4">Variant Detection</td>
                    <td className="py-3 px-4">Common SNPs and known variants</td>
                    <td className="py-3 px-4">Novel variant discovery and complex structural analysis</td>
                  </tr>
                  <tr className="border-b border-green-900/40">
                    <td className="py-3 px-4">Clinical Correlation</td>
                    <td className="py-3 px-4">Established genotype-phenotype associations</td>
                    <td className="py-3 px-4">Prediction of complex, multifactorial outcomes</td>
                  </tr>
                  <tr className="border-b border-green-900/40">
                    <td className="py-3 px-4">Treatment Guidance</td>
                    <td className="py-3 px-4">Basic pharmacogenomic insights</td>
                    <td className="py-3 px-4">Personalized treatment protocols and dosage optimization</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Risk Assessment</td>
                    <td className="py-3 px-4">Population-based risk estimates</td>
                    <td className="py-3 px-4">Individual-specific risk calculation with environmental factors</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-black font-medium">
                <Zap className="mr-2 h-5 w-5" /> Explore Genomic Analysis Platform
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
