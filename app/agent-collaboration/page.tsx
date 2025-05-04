import { AgentCollaborationDiagram } from "@/components/agent-collaboration-diagram"
import DashboardNav from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Brain, Zap, Network, Workflow, Share2 } from "lucide-react"

export default function AgentCollaborationPage() {
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
          <h1 className="text-3xl font-bold mb-2">Multi-Modal Agent Collaboration</h1>
          <p className="text-gray-400 mb-8">
            Visualizing how specialized AI agents work together to process different types of data and solve complex
            tasks.
          </p>

          <div className="bg-gray-900 border border-green-900/40 rounded-lg p-6 mb-8">
            <AgentCollaborationDiagram />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-900 border border-green-900/40 rounded-lg p-6">
              <div className="bg-green-900/20 p-3 rounded-full w-fit mb-4">
                <Brain className="h-6 w-6 text-green-500" />
              </div>
              <h2 className="text-xl font-bold mb-3">How It Works</h2>
              <p className="text-gray-400 mb-4">
                AIDEN's collaborative agent system enables multiple specialized AI agents to work together seamlessly.
                Each agent brings unique capabilities for processing different data types and contributes to a
                comprehensive solution.
              </p>
              <p className="text-gray-400">
                The central orchestrator coordinates all agents, manages task allocation, and ensures efficient
                collaboration across the entire system.
              </p>
            </div>

            <div className="bg-gray-900 border border-green-900/40 rounded-lg p-6">
              <div className="bg-green-900/20 p-3 rounded-full w-fit mb-4">
                <Zap className="h-6 w-6 text-green-500" />
              </div>
              <h2 className="text-xl font-bold mb-3">Key Benefits</h2>
              <ul className="text-gray-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Process multiple data types simultaneously (text, images, audio)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Leverage specialized models optimized for specific tasks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Dynamic task allocation based on agent capabilities and availability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Seamless information sharing between agents for comprehensive analysis</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900 border border-green-900/40 rounded-lg p-6">
              <div className="bg-green-900/20 p-3 rounded-full w-fit mb-4">
                <Network className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Flexible Architecture</h3>
              <p className="text-gray-400 text-sm">
                Add, remove, or customize agents based on your specific needs. The system automatically adapts to
                changes in the agent ecosystem.
              </p>
            </div>

            <div className="bg-gray-900 border border-green-900/40 rounded-lg p-6">
              <div className="bg-green-900/20 p-3 rounded-full w-fit mb-4">
                <Workflow className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Intelligent Workflows</h3>
              <p className="text-gray-400 text-sm">
                Create sophisticated workflows that route information between agents based on content type, complexity,
                and processing requirements.
              </p>
            </div>

            <div className="bg-gray-900 border border-green-900/40 rounded-lg p-6">
              <div className="bg-green-900/20 p-3 rounded-full w-fit mb-4">
                <Share2 className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Shared Knowledge</h3>
              <p className="text-gray-400 text-sm">
                Agents share a common knowledge base, allowing insights from one agent to inform and enhance the
                performance of others.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-black font-medium">
                Start Building Multi-Agent Systems
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
