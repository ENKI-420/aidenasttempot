"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ImageIcon,
  FileText,
  Headphones,
  MessageSquare,
  Database,
  Zap,
  ArrowRight,
  Dna,
  TrendingUp,
  Shield,
  Link,
} from "lucide-react"
import { AidenLogoAnimated } from "./aiden-logo-animated"

interface AgentCollaborationDiagramProps {
  className?: string
  animated?: boolean
}

export function AgentCollaborationDiagram({ className = "", animated = true }: AgentCollaborationDiagramProps) {
  const [activeAgent, setActiveAgent] = useState<number | null>(null)
  const [showAllConnections, setShowAllConnections] = useState(false)

  // Auto-cycle through agents if animated is true
  useEffect(() => {
    if (!animated) return

    const interval = setInterval(() => {
      setActiveAgent((prev) => {
        if (prev === null) return 0
        return (prev + 1) % 9 // Update from 5 to 9 to include all agents
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [animated])

  // Define the agents
  const agents = [
    {
      id: 0,
      name: "Text Analysis Agent",
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/40",
      description: "Processes and analyzes text data, documents, and natural language",
    },
    {
      id: 1,
      name: "Image Processing Agent",
      icon: ImageIcon,
      color: "text-purple-500",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/40",
      description: "Analyzes visual content, recognizes objects, and extracts information from images",
    },
    {
      id: 2,
      name: "Audio Analysis Agent",
      icon: Headphones,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-500/40",
      description: "Processes audio data, transcribes speech, and analyzes sound patterns",
    },
    {
      id: 3,
      name: "Conversation Agent",
      icon: MessageSquare,
      color: "text-green-500",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/40",
      description: "Manages dialogues, maintains context, and handles user interactions",
    },
    {
      id: 4,
      name: "Knowledge Agent",
      icon: Database,
      color: "text-red-500",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/40",
      description: "Retrieves and manages information from various knowledge sources",
    },
    {
      id: 5,
      name: "Genomic Analysis Agent",
      icon: Dna,
      color: "text-teal-500",
      bgColor: "bg-teal-500/20",
      borderColor: "border-teal-500/40",
      description: "Specializes in analyzing genomic sequences, identifying variants, and interpreting genetic data",
    },
    {
      id: 6,
      name: "Prediction Agent",
      icon: TrendingUp,
      color: "text-amber-500",
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-500/40",
      description: "Forecasts outcomes, predicts trends, and generates probabilistic models from data",
    },
    {
      id: 7,
      name: "Security Agent",
      icon: Shield,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/20",
      borderColor: "border-indigo-500/40",
      description: "Ensures data privacy, manages access controls, and protects sensitive information",
    },
    {
      id: 8,
      name: "Integration Agent",
      icon: Link,
      color: "text-pink-500",
      bgColor: "bg-pink-500/20",
      borderColor: "border-pink-500/40",
      description: "Connects disparate data sources, harmonizes formats, and enables cross-platform interoperability",
    },
  ]

  // Toggle active agent on click
  const handleAgentClick = (id: number) => {
    if (activeAgent === id) {
      setActiveAgent(null)
    } else {
      setActiveAgent(id)
    }
  }

  // Toggle showing all connections
  const toggleAllConnections = () => {
    setShowAllConnections(!showAllConnections)
    if (!showAllConnections) {
      setActiveAgent(null)
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="relative w-full aspect-[16/9] max-h-[600px]">
        {/* Central Orchestrator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div
            className="flex flex-col items-center justify-center w-32 h-32 rounded-full bg-black border-2 border-green-500/50 shadow-lg shadow-green-500/20"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            <AidenLogoAnimated size={40} />
            <p className="text-xs font-semibold text-green-500 mt-2">Orchestrator</p>
          </motion.div>
        </div>

        {/* Agents */}
        {agents.map((agent, index) => {
          // Calculate position in a circle around the center
          const angle = (index * (2 * Math.PI)) / agents.length
          const radius = "38%" // Distance from center
          const top = `calc(50% + ${radius} * ${Math.sin(angle)})`
          const left = `calc(50% + ${radius} * ${Math.cos(angle)})`

          return (
            <motion.div
              key={agent.id}
              className={`absolute w-28 h-28 -translate-x-1/2 -translate-y-1/2 cursor-pointer`}
              style={{ top, left }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleAgentClick(agent.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`w-full h-full rounded-full ${agent.bgColor} border-2 ${
                  activeAgent === agent.id ? agent.borderColor : "border-gray-700/40"
                } flex flex-col items-center justify-center p-2 transition-all duration-300`}
              >
                <div className={`p-2 rounded-full ${activeAgent !== null ? agents[activeAgent].bgColor : ""}`}>
                  {activeAgent !== null &&
                    React.createElement(agents[activeAgent].icon, {
                      className: `h-4 w-4 ${agents[activeAgent].color}`,
                    })}
                </div>
                <p className="text-xs font-medium text-white text-center mt-1">{agent.name}</p>
              </div>
            </motion.div>
          )
        })}

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          {/* Connections to central orchestrator */}
          {agents.map((agent, index) => {
            const angle = (index * (2 * Math.PI)) / agents.length
            const radius = 38
            const x2 = 50 + radius * Math.cos(angle)
            const y2 = 50 + radius * Math.sin(angle)

            return (
              <motion.line
                key={`line-to-center-${agent.id}`}
                x1="50%"
                y1="50%"
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke={
                  activeAgent === agent.id || activeAgent === null || showAllConnections
                    ? agent.color.replace("text-", "")
                    : "#2a2a2a"
                }
                strokeWidth={activeAgent === agent.id || showAllConnections ? "3" : "1"}
                strokeDasharray={activeAgent === agent.id || showAllConnections ? "0" : "5,5"}
                strokeOpacity={activeAgent === agent.id || activeAgent === null || showAllConnections ? "0.6" : "0.2"}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            )
          })}

          {/* Inter-agent connections (only shown when an agent is active or showAllConnections is true) */}
          {agents.map((sourceAgent, sourceIndex) => {
            return agents.map((targetAgent, targetIndex) => {
              // Skip self-connections and only show connections for active agent or all if showAllConnections
              if (
                sourceIndex >= targetIndex ||
                (!showAllConnections && activeAgent !== sourceAgent.id && activeAgent !== targetAgent.id)
              ) {
                return null
              }

              const sourceAngle = (sourceIndex * (2 * Math.PI)) / agents.length
              const targetAngle = (targetIndex * (2 * Math.PI)) / agents.length
              const radius = 38
              const x1 = 50 + radius * Math.cos(sourceAngle)
              const y1 = 50 + radius * Math.sin(sourceAngle)
              const x2 = 50 + radius * Math.cos(targetAngle)
              const y2 = 50 + radius * Math.sin(targetAngle)

              // Determine if this connection should be highlighted
              const isHighlighted =
                showAllConnections || activeAgent === sourceAgent.id || activeAgent === targetAgent.id

              return (
                <motion.path
                  key={`line-${sourceAgent.id}-${targetAgent.id}`}
                  d={`M ${x1}% ${y1}% Q 50% 50%, ${x2}% ${y2}%`}
                  fill="none"
                  stroke={isHighlighted ? "#10b981" : "#2a2a2a"}
                  strokeWidth={isHighlighted ? "2" : "1"}
                  strokeDasharray={isHighlighted ? "0" : "5,5"}
                  strokeOpacity={isHighlighted ? "0.4" : "0.1"}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              )
            })
          })}

          {/* Data flow animations */}
          {(activeAgent !== null || showAllConnections) &&
            agents.map((agent, index) => {
              if (!showAllConnections && activeAgent !== agent.id) return null

              const angle = (index * (2 * Math.PI)) / agents.length
              const radius = 38
              const x2 = 50 + radius * Math.cos(angle)
              const y2 = 50 + radius * Math.sin(angle)

              return (
                <motion.circle
                  key={`data-flow-${agent.id}`}
                  cx="50%"
                  cy="50%"
                  r="4"
                  fill={agent.color.replace("text-", "")}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    cx: ["50%", `${x2}%`],
                    cy: ["50%", `${y2}%`],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1,
                    ease: "easeInOut",
                  }}
                />
              )
            })}
        </svg>

        {/* Agent description (shown when an agent is active) */}
        {activeAgent !== null && (
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg border border-gray-700 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-full ${agents[activeAgent]?.bgColor}`}>
                {React.createElement(agents[activeAgent].icon, {
                  className: `h-4 w-4 ${agents[activeAgent]?.color}`,
                })}
              </div>
              <h4 className="font-medium">{agents[activeAgent]?.name}</h4>
            </div>
            <p className="text-sm text-gray-300 mt-1">{agents[activeAgent]?.description}</p>
          </motion.div>
        )}

        {/* Show all connections toggle */}
        <motion.button
          className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${
            showAllConnections ? "bg-green-500/20 text-green-400" : "bg-gray-800 text-gray-400"
          }`}
          onClick={toggleAllConnections}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Zap className="h-3 w-3" />
          {showAllConnections ? "Hide Connections" : "Show All Connections"}
        </motion.button>
      </div>

      {/* Legend */}
      <div className="mt-6 bg-gray-900/50 rounded-lg p-4 border border-gray-800">
        <h3 className="text-lg font-medium mb-3">How Agents Collaborate</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-green-500/20 p-2 rounded-full mt-0.5">
              <AidenLogoAnimated className="h-4 w-4" interactive={false} />
            </div>
            <div>
              <h4 className="font-medium text-sm">Central Orchestrator</h4>
              <p className="text-xs text-gray-400">
                Coordinates all agents, manages task allocation, and ensures efficient collaboration
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-blue-500/20 p-2 rounded-full mt-0.5">
              <ArrowRight className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Data Flow</h4>
              <p className="text-xs text-gray-400">
                Information flows bidirectionally between agents and the orchestrator for seamless integration
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-teal-500/20 p-2 rounded-full mt-0.5">
              <Dna className="h-4 w-4 text-teal-500" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Genomic Analysis</h4>
              <p className="text-xs text-gray-400">
                Specialized agent for interpreting genetic data and identifying clinically relevant variants
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-amber-500/20 p-2 rounded-full mt-0.5">
              <TrendingUp className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Predictive Analytics</h4>
              <p className="text-xs text-gray-400">
                Forecasts outcomes and generates insights based on complex pattern recognition
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
