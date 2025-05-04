import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Brain, ClipboardList } from "lucide-react"
import { ClickableLogo } from "@/components/clickable-logo"
import { GenomicVisualization3D } from "@/components/genomic-visualization-3d"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-green-900/40 py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <ClickableLogo href="/" />

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-gray-400 hover:text-green-500 transition">
              Dashboard
            </Link>
            <Link href="/bots" className="text-gray-400 hover:text-green-500 transition">
              Bots
            </Link>
            <Link href="/api-keys" className="text-gray-400 hover:text-green-500 transition">
              API Keys
            </Link>
            <Link href="/docs" className="text-gray-400 hover:text-green-500 transition">
              Documentation
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" className="border-green-700 text-green-500 hover:bg-green-900/20">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-green-600 hover:bg-green-700 text-black font-medium">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                <span className="text-green-500">Genomic</span> AI Frontiers
              </h1>
              <p className="text-xl text-gray-400 mb-10">
                Visualizing the boundary between current genomic analysis capabilities and future possibilities. Our
                platform illuminates what AI can analyze today in clinical genomics—and how these insights translate to
                actionable medical outcomes at the frontier of precision medicine.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-black font-medium">
                    Explore Clinical Genomics <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/patient-case-studies">
                  <Button size="lg" variant="outline" className="border-green-700 text-green-500 hover:bg-green-900/20">
                    View Patient Case Studies
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 flex justify-center relative">
              <div className="absolute w-full h-full bg-green-500/5 rounded-full filter blur-3xl"></div>
              <GenomicVisualization3D width={400} height={400} autoRotate={true} showLabels={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-16">
            <span className="text-green-500">Powerful</span> Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black p-8 rounded-lg border border-green-900/40 hover:border-green-500/40 transition group">
              <div className="bg-green-900/20 p-3 rounded-full w-fit mb-6 group-hover:bg-green-900/30 transition-colors">
                <Brain className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Multi-Modal Collaborative Agents</h3>
              <p className="text-gray-400 mb-4">
                Deploy sophisticated AI agents that collaborate across multiple models and modalities, processing text,
                images, audio, and more for comprehensive solutions.
              </p>
              <Link
                href="/agent-collaboration"
                className="text-green-500 hover:text-green-400 text-sm font-medium flex items-center"
              >
                View Collaboration Diagram <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
            <div className="bg-black p-8 rounded-lg border border-green-900/40 hover:border-green-500/40 transition group">
              <div className="bg-green-900/20 p-3 rounded-full w-fit mb-6 group-hover:bg-green-900/30 transition-colors">
                <ClipboardList className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Clinical Case Studies</h3>
              <p className="text-gray-400 mb-4">
                Explore real-world examples of how genomic data translates to clinical decisions through AI-powered
                analysis and personalized treatment recommendations.
              </p>
              <Link
                href="/patient-case-studies"
                className="text-green-500 hover:text-green-400 text-sm font-medium flex items-center"
              >
                View Patient Cases <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
            <div className="bg-black p-8 rounded-lg border border-green-900/40 hover:border-green-500/40 transition group">
              <div className="bg-green-900/20 p-3 rounded-full w-fit mb-6 group-hover:bg-green-900/30 transition-colors">
                <Shield className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Enterprise Security</h3>
              <p className="text-gray-400">
                Military-grade encryption and security protocols to keep your data and AI models safe from unauthorized
                access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-black border-t border-green-900/40">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to <span className="text-green-500">Power Up</span> Your AI?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of developers and companies building the next generation of AI applications with AIDEN.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-black font-medium">
              <Zap className="mr-2 h-5 w-5" /> Start Building Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-10 px-6 bg-gray-900 border-t border-green-900/40">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <ClickableLogo className="mb-6 md:mb-0" />
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <Link href="/about" className="hover:text-green-500 transition">
                About
              </Link>
              <Link href="/pricing" className="hover:text-green-500 transition">
                Pricing
              </Link>
              <Link href="/docs" className="hover:text-green-500 transition">
                Documentation
              </Link>
              <Link href="/blog" className="hover:text-green-500 transition">
                Blog
              </Link>
              <Link href="/contact" className="hover:text-green-500 transition">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-green-900/40 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} AIDEN. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
