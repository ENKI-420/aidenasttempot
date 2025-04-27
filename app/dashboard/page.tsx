"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from "@/components/github-logo"
import { Loader2 } from "lucide-react"
import { FeatureTabs } from "@/components/feature-tabs"

export default function Dashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        router.push("/login")
      } else {
        console.error("Logout failed")
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col">
      <header className="border-b border-[#30363d] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <GitHubLogoIcon className="h-8 w-8" />
            <h1 className="text-xl font-semibold">GitHub Dashboard</h1>
          </div>
          <Button
            variant="outline"
            className="border-[#30363d] text-white hover:bg-[#30363d]"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Sign out
          </Button>
        </div>
      </header>

      {/* Feature Tabs */}
      <section className="border-b border-[#30363d] bg-[#0d1117]">
        <div className="container mx-auto py-4">
          <FeatureTabs />
        </div>
      </section>

      <main className="container mx-auto py-8 px-4 flex-1">
        <div className="bg-[#161b22] border border-[#30363d] rounded-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome to your Dashboard</h2>
          <p className="text-[#c9d1d9] mb-4">You have successfully logged in to the GitHub clone application.</p>
          <p className="text-[#8b949e]">
            Explore the feature tabs above to learn more about our platform capabilities.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-6">
            <h3 className="text-lg font-semibold mb-3">Recent Repositories</h3>
            <div className="space-y-4">
              <div className="p-3 bg-[#0d1117] rounded-md border border-[#30363d] hover:border-[#58a6ff] transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-[#58a6ff]">project-alpha</h4>
                    <p className="text-sm text-[#8b949e]">Updated 2 days ago</p>
                  </div>
                  <div className="text-xs text-[#8b949e] bg-[#161b22] px-2 py-1 rounded-full">Public</div>
                </div>
              </div>
              <div className="p-3 bg-[#0d1117] rounded-md border border-[#30363d] hover:border-[#58a6ff] transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-[#58a6ff]">web-dashboard</h4>
                    <p className="text-sm text-[#8b949e]">Updated 5 days ago</p>
                  </div>
                  <div className="text-xs text-[#8b949e] bg-[#161b22] px-2 py-1 rounded-full">Private</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-6">
            <h3 className="text-lg font-semibold mb-3">Activity Feed</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-1 bg-[#238636] rounded-full"></div>
                <div>
                  <p className="text-sm text-[#c9d1d9]">
                    You pushed to <span className="text-[#58a6ff]">main</span> in{" "}
                    <span className="text-[#58a6ff]">project-alpha</span>
                  </p>
                  <p className="text-xs text-[#8b949e]">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-1 bg-[#58a6ff] rounded-full"></div>
                <div>
                  <p className="text-sm text-[#c9d1d9]">
                    You created a new issue in <span className="text-[#58a6ff]">web-dashboard</span>
                  </p>
                  <p className="text-xs text-[#8b949e]">Yesterday</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-1 bg-[#8957e5] rounded-full"></div>
                <div>
                  <p className="text-sm text-[#c9d1d9]">
                    You merged a pull request in <span className="text-[#58a6ff]">api-service</span>
                  </p>
                  <p className="text-xs text-[#8b949e]">3 days ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-6">
            <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start bg-[#238636] hover:bg-[#2ea043] text-white">
                New Repository
              </Button>
              <Button className="w-full justify-start bg-[#0d1117] hover:bg-[#30363d] text-white border border-[#30363d]">
                Import Repository
              </Button>
              <Button className="w-full justify-start bg-[#0d1117] hover:bg-[#30363d] text-white border border-[#30363d]">
                New Project
              </Button>
              <Button className="w-full justify-start bg-[#0d1117] hover:bg-[#30363d] text-white border border-[#30363d]">
                New Gist
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-[#30363d] py-6 px-4">
        <div className="container mx-auto text-center text-[#8b949e] text-sm">
          <div className="flex justify-center flex-wrap gap-4 mb-2">
            <a href="#" className="hover:text-[#58a6ff] hover:underline">
              Terms
            </a>
            <a href="#" className="hover:text-[#58a6ff] hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:text-[#58a6ff] hover:underline">
              Security
            </a>
            <a href="#" className="hover:text-[#58a6ff] hover:underline">
              Status
            </a>
            <a href="#" className="hover:text-[#58a6ff] hover:underline">
              Help
            </a>
          </div>
          <p>© {new Date().getFullYear()} GitHub, Inc.</p>
        </div>
      </footer>
    </div>
  )
}
