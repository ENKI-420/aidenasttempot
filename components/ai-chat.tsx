"use client"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Send } from "lucide-react"
import { useChat } from "ai/react"

interface AIChatProps {
  featureId: string
  featureTitle: string
}

export function AIChat({ featureId, featureTitle }: AIChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Use the useChat hook from the AI SDK
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/ai",
    initialMessages: [
      {
        id: "initial-message",
        role: "assistant",
        content: getInitialMessage(featureId),
      },
    ],
    body: {
      featureId,
      featureTitle,
    },
    onError: (err) => {
      console.error("Chat error:", err)
    },
  })

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col h-[400px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0d1117] rounded-md">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === "user"
                  ? "bg-[#238636] text-white"
                  : "bg-[#161b22] border border-[#30363d] text-[#c9d1d9]"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-[#161b22] border border-[#30363d] text-[#c9d1d9]">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          </div>
        )}
        {error && (
          <div className="flex justify-center">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-[#300] border border-[#500] text-[#f88]">
              An error occurred. Please try again.
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder={`Ask about ${featureTitle.toLowerCase()}...`}
          className="flex-1 bg-[#0d1117] border-[#30363d] text-white focus:border-[#58a6ff] focus:ring-[#58a6ff]/30"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading} className="bg-[#238636] hover:bg-[#2ea043] text-white">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  )
}

// Helper function to get the initial message based on the feature
function getInitialMessage(featureId: string): string {
  switch (featureId) {
    case "version-control":
      return "I can help you learn more about our Advanced Version Control features. What specific aspects are you interested in? For example, you can ask about branching strategies, merge workflows, or release management."
    case "collaboration":
      return "I'm here to explain our Seamless Collaboration tools. You can ask me about real-time editing, code reviews, discussion threads, or any other collaboration features you're curious about."
    case "security":
      return "I can provide information about our Enterprise-Grade Security measures. Feel free to ask about access controls, encryption, compliance, or any security concerns you might have."
    case "ai-assistance":
      return "I'm your guide to our AI-Powered Assistance features. Ask me about code suggestions, bug detection, performance optimization, or how our AI can enhance your development workflow."
    case "workflow":
      return "I can help you understand our Modern Development Workflow tools. You might want to know about CI/CD integration, automated testing, deployment strategies, or other workflow optimizations."
    default:
      return "How can I help you learn more about this feature?"
  }
}
