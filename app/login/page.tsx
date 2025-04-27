"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { GitHubLogoIcon } from "@/components/github-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { FeatureTabs } from "@/components/feature-tabs"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check for error parameters in the URL (from OAuth redirects)
  useEffect(() => {
    const errorParam = searchParams.get("error")
    if (errorParam) {
      switch (errorParam) {
        case "invalid_state":
          setError("Security verification failed. Please try again.")
          break
        case "no_code":
          setError("GitHub authorization failed. Please try again.")
          break
        case "token_error":
          setError("Failed to authenticate with GitHub. Please try again.")
          break
        case "oauth_error":
          setError("An error occurred during GitHub authentication.")
          break
        default:
          setError("An error occurred. Please try again.")
      }
    }
  }, [searchParams])

  // Check if user is already authenticated
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/session")
        const data = await response.json()

        if (data.isAuthenticated) {
          router.push("/dashboard")
        }
      } catch (error) {
        console.error("Session check error:", error)
      }
    }

    checkSession()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Basic validation
      if (!username || !password) {
        throw new Error("Username and password are required")
      }

      // Call the real API endpoint
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed")
      }

      if (!data.success) {
        throw new Error(data.message || "Authentication failed")
      }

      // Redirect to dashboard on successful login
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGitHubLogin = () => {
    setError(null)
    setIsLoading(true)

    // Redirect to the GitHub OAuth endpoint
    window.location.href = "/api/auth/github"
  }

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col">
      {/* Header */}
      <header className="border-b border-[#30363d] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GitHubLogoIcon className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">GitHub</span>
          </div>
          <nav className="hidden md:flex items-center gap-4">
            <Link href="#" className="text-[#c9d1d9] hover:text-white">
              Features
            </Link>
            <Link href="#" className="text-[#c9d1d9] hover:text-white">
              Enterprise
            </Link>
            <Link href="#" className="text-[#c9d1d9] hover:text-white">
              Pricing
            </Link>
          </nav>
        </div>
      </header>

      {/* Feature Tabs */}
      <section className="border-b border-[#30363d] bg-[#0d1117]">
        <div className="container mx-auto py-4">
          <FeatureTabs />
        </div>
      </section>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold text-white text-center mb-8">Sign in to GitHub</h1>

          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-6 mb-6">
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-900 text-red-300">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-[#c9d1d9]">
                  Username or email address
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-[#0d1117] border-[#30363d] text-white focus:border-[#58a6ff] focus:ring-[#58a6ff]/30"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password" className="text-[#c9d1d9]">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-sm text-[#58a6ff] hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#0d1117] border-[#30363d] text-white focus:border-[#58a6ff] focus:ring-[#58a6ff]/30"
                  disabled={isLoading}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-[#238636] hover:bg-[#2ea043] text-white" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign in
              </Button>
            </form>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-4 mb-6">
            <Button
              variant="outline"
              className="w-full border-[#30363d] text-white hover:bg-[#30363d]"
              onClick={handleGitHubLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <GitHubLogoIcon className="mr-2 h-4 w-4" />
              )}
              Sign in with GitHub
            </Button>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-4 text-center">
            <p className="text-[#c9d1d9]">
              New to GitHub?{" "}
              <Link href="/signup" className="text-[#58a6ff] hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#30363d] py-6 px-4">
        <div className="container mx-auto text-center text-[#8b949e] text-sm">
          <div className="flex justify-center flex-wrap gap-4 mb-2">
            <Link href="/terms" className="hover:text-[#58a6ff] hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-[#58a6ff] hover:underline">
              Privacy
            </Link>
            <Link href="/security" className="hover:text-[#58a6ff] hover:underline">
              Security
            </Link>
            <Link href="/contact" className="hover:text-[#58a6ff] hover:underline">
              Contact GitHub
            </Link>
          </div>
          <p>© {new Date().getFullYear()} GitHub, Inc.</p>
        </div>
      </footer>
    </div>
  )
}
