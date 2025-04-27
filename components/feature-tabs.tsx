"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { GitBranch, Users, Shield, Bot, Workflow } from "lucide-react"
import { AIChat } from "@/components/ai-chat"

interface FeatureInfo {
  id: string
  title: string
  description: string
  icon: React.ElementType
  content: string
}

const features: FeatureInfo[] = [
  {
    id: "version-control",
    title: "Advanced Version Control",
    description: "Manage changes, history, and releases effortlessly.",
    icon: GitBranch,
    content:
      "Our advanced version control system allows you to track changes, manage branches, and collaborate seamlessly with your team. With features like conflict resolution, code review, and release management, you can ensure your codebase remains organized and efficient.",
  },
  {
    id: "collaboration",
    title: "Seamless Collaboration",
    description: "Work synchronously with team members in real-time.",
    icon: Users,
    content:
      "Collaborate with your team in real-time with features like simultaneous editing, commenting, and discussion threads. Our platform ensures everyone stays on the same page, regardless of their location or time zone.",
  },
  {
    id: "security",
    title: "Enterprise-Grade Security",
    description: "Robust security protocols protecting your data.",
    icon: Shield,
    content:
      "Our enterprise-grade security ensures your code and data remain protected. With features like role-based access control, audit logs, and encryption, you can trust that your intellectual property is secure.",
  },
  {
    id: "ai-assistance",
    title: "AI-Powered Assistance",
    description: "Intelligent suggestions and real-time insights.",
    icon: Bot,
    content:
      "Leverage the power of AI to enhance your development workflow. Our AI assistant provides code suggestions, identifies potential issues, and helps you write better code faster.",
  },
  {
    id: "workflow",
    title: "Modern Development Workflow",
    description: "Streamlined processes integrating cutting-edge practices.",
    icon: Workflow,
    content:
      "Embrace modern development practices with our integrated workflow tools. From CI/CD pipelines to automated testing and deployment, our platform helps you deliver high-quality software efficiently.",
  },
]

export function FeatureTabs() {
  const [activeFeature, setActiveFeature] = useState<FeatureInfo | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleLearnMore = (feature: FeatureInfo) => {
    setActiveFeature(feature)
    setIsDialogOpen(true)
  }

  return (
    <div className="w-full">
      <TooltipProvider>
        <Tabs defaultValue="version-control" className="w-full">
          <TabsList className="grid grid-cols-5 bg-[#161b22] border border-[#30363d]">
            {features.map((feature) => (
              <Tooltip key={feature.id}>
                <TooltipTrigger asChild>
                  <TabsTrigger
                    value={feature.id}
                    className="data-[state=active]:bg-[#0d1117] data-[state=active]:text-[#58a6ff] data-[state=active]:border-t-2 data-[state=active]:border-[#58a6ff] rounded-none"
                  >
                    <feature.icon className="h-4 w-4 mr-2" />
                    <span className="hidden md:inline">{feature.title}</span>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-[#161b22] border border-[#30363d] text-white p-4 max-w-xs">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-[#58a6ff]">{feature.title}</h3>
                    <p className="text-sm text-[#c9d1d9]">{feature.description}</p>
                    <Button
                      variant="link"
                      className="text-[#58a6ff] p-0 h-auto text-sm"
                      onClick={() => handleLearnMore(feature)}
                    >
                      Learn more
                    </Button>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </TabsList>

          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id} className="mt-6">
              <div className="bg-[#161b22] border border-[#30363d] rounded-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#0d1117] p-2 rounded-full">
                    <feature.icon className="h-5 w-5 text-[#58a6ff]" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">{feature.title}</h2>
                </div>
                <p className="text-[#c9d1d9] mb-4">{feature.content}</p>
                <Button
                  variant="outline"
                  className="border-[#30363d] text-[#58a6ff] hover:bg-[#0d1117] hover:text-[#58a6ff]"
                  onClick={() => handleLearnMore(feature)}
                >
                  Learn more with AI
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </TooltipProvider>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#161b22] border border-[#30363d] text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              {activeFeature && (
                <>
                  <activeFeature.icon className="h-5 w-5 text-[#58a6ff]" />
                  <span>{activeFeature?.title}</span>
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-[#c9d1d9]">
              Ask our AI assistant about {activeFeature?.title.toLowerCase()}
            </DialogDescription>
          </DialogHeader>

          {activeFeature && <AIChat featureId={activeFeature.id} featureTitle={activeFeature.title} />}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="border-[#30363d] text-white hover:bg-[#30363d]">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
