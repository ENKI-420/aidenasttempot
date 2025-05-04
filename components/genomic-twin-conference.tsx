"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Code,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Mic,
  MicOff,
  Monitor,
  MoreHorizontal,
  Plus,
  Share2,
  Users,
  Video,
  VideoOff,
} from "lucide-react"

// Types for our conference system
interface Participant {
  id: string
  name: string
  avatar: string
  role: string
  isConnected: boolean
  isSpeaking: boolean
  hasVideo: boolean
  hasAudio: boolean
  isScreenSharing: boolean
}

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: Date
  isAI?: boolean
  attachments?: Array<{
    id: string
    name: string
    type: string
    url: string
  }>
}

interface GenomicInsight {
  id: string
  title: string
  description: string
  severity: "low" | "medium" | "high"
  source: string
  timestamp: Date
  relatedGenes: string[]
  confidence: number
}

// Mock data for demonstration
const mockParticipants: Participant[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    avatar: "/stylized-initials-sc.png",
    role: "Oncologist",
    isConnected: true,
    isSpeaking: false,
    hasVideo: true,
    hasAudio: true,
    isScreenSharing: false,
  },
  {
    id: "2",
    name: "Dr. James Wilson",
    avatar: "/intertwined-letters.png",
    role: "Genomic Analyst",
    isConnected: true,
    isSpeaking: true,
    hasVideo: true,
    hasAudio: true,
    isScreenSharing: false,
  },
  {
    id: "3",
    name: "Dr. Maria Rodriguez",
    avatar: "/medical-resonance-image.png",
    role: "Pathologist",
    isConnected: true,
    isSpeaking: false,
    hasVideo: false,
    hasAudio: true,
    isScreenSharing: false,
  },
  {
    id: "4",
    name: "AIDEN AI Assistant",
    avatar: "/abstract-ai-network.png",
    role: "AI Assistant",
    isConnected: true,
    isSpeaking: false,
    hasVideo: false,
    hasAudio: true,
    isScreenSharing: false,
  },
]

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "1",
    senderName: "Dr. Sarah Chen",
    senderAvatar: "/stylized-initials-sc.png",
    content:
      "I've reviewed the patient's genomic profile and identified several variants of interest in the BRCA1 and TP53 genes.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: "2",
    senderId: "2",
    senderName: "Dr. James Wilson",
    senderAvatar: "/intertwined-letters.png",
    content: "The TP53 variant appears to be pathogenic based on our database. Let me pull up the relevant literature.",
    timestamp: new Date(Date.now() - 1000 * 60 * 14),
  },
  {
    id: "3",
    senderId: "4",
    senderName: "AIDEN AI Assistant",
    senderAvatar: "/abstract-ai-network.png",
    content:
      "I've analyzed the variant against our knowledge base. This specific TP53 mutation (R175H) is associated with Li-Fraumeni syndrome and has been documented in multiple studies to increase cancer susceptibility.",
    timestamp: new Date(Date.now() - 1000 * 60 * 13),
    isAI: true,
  },
  {
    id: "4",
    senderId: "3",
    senderName: "Dr. Maria Rodriguez",
    senderAvatar: "/medical-resonance-image.png",
    content: "The histopathology results confirm an aggressive phenotype. This aligns with the genomic findings.",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    attachments: [
      {
        id: "a1",
        name: "Histopathology-Report.pdf",
        type: "pdf",
        url: "#",
      },
    ],
  },
]

const mockGenomicInsights: GenomicInsight[] = [
  {
    id: "1",
    title: "TP53 R175H Mutation",
    description:
      "Pathogenic mutation associated with Li-Fraumeni syndrome and increased cancer risk across multiple tissue types.",
    severity: "high",
    source: "ClinVar, COSMIC",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    relatedGenes: ["TP53", "MDM2"],
    confidence: 0.95,
  },
  {
    id: "2",
    title: "BRCA1 Exon 13 Deletion",
    description:
      "Large genomic rearrangement resulting in deletion of exon 13, associated with hereditary breast and ovarian cancer syndrome.",
    severity: "high",
    source: "ENIGMA, BIC",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    relatedGenes: ["BRCA1", "BRCA2", "PALB2"],
    confidence: 0.92,
  },
  {
    id: "3",
    title: "PIK3CA H1047R Variant",
    description: "Activating mutation in the PI3K pathway, potentially targetable with PI3K/AKT/mTOR inhibitors.",
    severity: "medium",
    source: "OncoKB, COSMIC",
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    relatedGenes: ["PIK3CA", "AKT1", "PTEN"],
    confidence: 0.88,
  },
]

// Format timestamp to readable format
const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

// Main component
export default function GenomicTwinConference() {
  const [participants, setParticipants] = useState<Participant[]>(mockParticipants)
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [genomicInsights, setGenomicInsights] = useState<GenomicInsight[]>(mockGenomicInsights)
  const [newMessage, setNewMessage] = useState("")
  const [hasVideo, setHasVideo] = useState(true)
  const [hasAudio, setHasAudio] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [activeTab, setActiveTab] = useState("conference")
  const [showAIPanel, setShowAIPanel] = useState(false)
  const [aiQuery, setAIQuery] = useState("")

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulate video stream (in a real app, this would use WebRTC)
  useEffect(() => {
    if (videoRef.current && hasVideo) {
      // In a real implementation, this would be replaced with actual WebRTC code
      // For demo purposes, we're just showing a placeholder
      const canvas = document.createElement("canvas")
      canvas.width = 640
      canvas.height = 480
      const ctx = canvas.getContext("2d")
      if (ctx) {
        // Draw a placeholder video frame
        ctx.fillStyle = "#1e293b"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.font = "24px sans-serif"
        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.fillText("Video Stream Placeholder", canvas.width / 2, canvas.height / 2)

        // In a real app, we would connect to a media stream
        // videoRef.current.srcObject = canvas.captureStream(30)
      }
    }
  }, [hasVideo])

  // Simulate a participant speaking
  useEffect(() => {
    const speakingInterval = setInterval(() => {
      setParticipants((prev) => {
        const newParticipants = [...prev]
        const speakingIndex = Math.floor(Math.random() * 3) // Don't make AI speak randomly

        return newParticipants.map((p, i) => ({
          ...p,
          isSpeaking: i === speakingIndex,
        }))
      })
    }, 3000)

    return () => clearInterval(speakingInterval)
  }, [])

  // Send a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: `msg-${Date.now()}`,
        senderId: "self",
        senderName: "You",
        senderAvatar: "/abstract-self-reflection.png",
        content: newMessage,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, newMsg])
      setNewMessage("")

      // Simulate AI response after a short delay
      if (newMessage.includes("?") || Math.random() > 0.7) {
        setTimeout(() => {
          const aiResponse: Message = {
            id: `msg-${Date.now() + 1}`,
            senderId: "4",
            senderName: "AIDEN AI Assistant",
            senderAvatar: "/abstract-ai-network.png",
            content: generateAIResponse(newMessage),
            timestamp: new Date(),
            isAI: true,
          }

          setMessages((prev) => [...prev, aiResponse])
        }, 1500)
      }
    }
  }

  // Generate an AI response based on the message content
  const generateAIResponse = (message: string): string => {
    if (message.toLowerCase().includes("variant") || message.toLowerCase().includes("mutation")) {
      return "I've analyzed the variants in the patient's genome. The TP53 R175H mutation is particularly concerning as it's associated with poor prognosis in multiple cancer types. Would you like me to provide relevant clinical trial information for targeted therapies?"
    } else if (message.toLowerCase().includes("treatment") || message.toLowerCase().includes("therapy")) {
      return "Based on the genomic profile, several targeted therapies may be applicable. The PIK3CA mutation suggests potential sensitivity to alpelisib. Additionally, the BRCA1 deletion indicates potential benefit from PARP inhibitors such as olaparib or niraparib. Would you like me to elaborate on any of these options?"
    } else if (message.toLowerCase().includes("prognosis") || message.toLowerCase().includes("survival")) {
      return "The combination of TP53 and BRCA1 mutations typically indicates a more aggressive disease course. However, the BRCA1 mutation also presents therapeutic opportunities with PARP inhibitors, which have shown significant survival benefits in similar genomic profiles. I can provide a detailed survival analysis based on our database of similar cases if needed."
    } else {
      return "I've noted your input. Based on the patient's comprehensive genomic profile, I recommend focusing on the actionable variants in TP53, BRCA1, and PIK3CA. Would you like me to provide more specific information about any of these findings or potential therapeutic implications?"
    }
  }

  // Handle AI query submission
  const handleAIQuery = () => {
    if (aiQuery.trim()) {
      // Add user query to messages
      const userQuery: Message = {
        id: `msg-${Date.now()}`,
        senderId: "self",
        senderName: "You",
        senderAvatar: "/abstract-self-reflection.png",
        content: aiQuery,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userQuery])

      // Simulate AI processing
      setTimeout(() => {
        const aiResponse: Message = {
          id: `msg-${Date.now() + 1}`,
          senderId: "4",
          senderName: "AIDEN AI Assistant",
          senderAvatar: "/abstract-ai-network.png",
          content: generateDetailedAIResponse(aiQuery),
          timestamp: new Date(),
          isAI: true,
        }

        setMessages((prev) => [...prev, aiResponse])
        setAIQuery("")
      }, 2000)
    }
  }

  // Generate a more detailed AI response for the dedicated AI panel
  const generateDetailedAIResponse = (query: string): string => {
    if (query.toLowerCase().includes("tp53")) {
      return `
The TP53 R175H mutation identified in this patient is a well-characterized hotspot mutation that occurs in the DNA-binding domain of the p53 protein. This results in:

1. Loss of tumor suppressor function
2. Potential gain of oncogenic properties (dominant-negative effect)
3. Disruption of apoptotic pathways

Clinical implications:
- Associated with resistance to DNA-damaging agents like platinum-based chemotherapy
- Potential sensitivity to WEE1 inhibitors (e.g., adavosertib) and MDM2 inhibitors in combination therapies
- Correlation with increased genomic instability and higher tumor mutation burden

Recent studies have shown that patients with this specific mutation may benefit from immunotherapy approaches due to the higher neoantigen load resulting from genomic instability.

Would you like me to provide specific clinical trial information for TP53-mutated cancers?
      `
    } else if (query.toLowerCase().includes("brca")) {
      return `
The BRCA1 exon 13 deletion detected in this patient is a pathogenic variant that disrupts the BRCT domains of the BRCA1 protein, which are critical for:

1. DNA double-strand break repair via homologous recombination
2. Cell cycle checkpoint control
3. Transcriptional regulation

Clinical implications:
- High sensitivity to PARP inhibitors (olaparib, niraparib, rucaparib, talazoparib)
- Potential sensitivity to platinum-based chemotherapy
- Increased risk for additional primary cancers (breast, ovarian, pancreatic, prostate)

Germline testing is recommended for family members, as this mutation confers a 60-80% lifetime risk of breast cancer and 40-60% risk of ovarian cancer if inherited.

The most recent NCCN guidelines recommend consideration of risk-reducing surgeries and enhanced surveillance protocols for carriers of this mutation.
      `
    } else if (query.toLowerCase().includes("pik3ca")) {
      return `
The PIK3CA H1047R variant is an activating mutation in the catalytic subunit of PI3K, resulting in:

1. Constitutive activation of the PI3K/AKT/mTOR pathway
2. Increased cell proliferation and survival
3. Potential resistance to hormone therapy in hormone receptor-positive contexts

Therapeutic implications:
- FDA-approved targeted therapy: alpelisib (Piqray) in combination with fulvestrant for HR+/HER2- breast cancer
- Additional PI3K pathway inhibitors in clinical trials: copanlisib, taselisib
- Potential benefit from mTOR inhibitors: everolimus, temsirolimus

This mutation occurs in approximately 20-30% of breast cancers and 10-15% of colorectal cancers, with varying frequencies in other tumor types.

Recent data from the SOLAR-1 trial demonstrated a progression-free survival benefit of 11.0 vs 5.7 months for alpelisib plus fulvestrant compared to placebo plus fulvestrant in PIK3CA-mutated, HR+/HER2- advanced breast cancer.
      `
    } else {
      return `
Based on the comprehensive genomic profile of this patient, I've identified several key findings:

1. TP53 R175H mutation - Pathogenic variant affecting DNA binding domain
2. BRCA1 exon 13 deletion - Large rearrangement disrupting homologous recombination repair
3. PIK3CA H1047R variant - Activating mutation in the PI3K pathway
4. Tumor Mutation Burden: 12.4 mutations/Mb (Intermediate)
5. Microsatellite Status: Stable (MSS)

Therapeutic implications:
- PARP inhibitors (e.g., olaparib, niraparib) - High potential benefit due to BRCA1 mutation
- PI3K inhibitors (e.g., alpelisib) - Targeted therapy for PIK3CA mutation
- Clinical trials targeting TP53-mutated cancers - Several phase I/II trials available
- Immunotherapy - Limited benefit expected due to MSS status and intermediate TMB

Would you like me to elaborate on any specific aspect of this genomic profile or provide information about relevant clinical trials?
      `
    }
  }

  // Toggle video
  const toggleVideo = () => {
    setHasVideo(!hasVideo)
  }

  // Toggle audio
  const toggleAudio = () => {
    setHasAudio(!hasAudio)
  }

  // Toggle screen sharing
  const toggleScreenSharing = () => {
    setIsScreenSharing(!isScreenSharing)
  }

  // Handle keypress in message input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Handle keypress in AI query input
  const handleAIKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleAIQuery()
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold text-slate-900">Genomic Twin Conference</h1>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Live
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share conference</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download transcript</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Participants</DialogTitle>
                <DialogDescription>Add colleagues to this genomic conference session.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Input id="role" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Send Invitation</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="bg-white border-b border-slate-200">
            <TabsList className="w-full justify-start h-12 bg-transparent p-0">
              <TabsTrigger
                value="conference"
                className="data-[state=active]:bg-slate-100 rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 px-4 h-full"
              >
                Conference
              </TabsTrigger>
              <TabsTrigger
                value="genomics"
                className="data-[state=active]:bg-slate-100 rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 px-4 h-full"
              >
                Genomic Data
              </TabsTrigger>
              <TabsTrigger
                value="insights"
                className="data-[state=active]:bg-slate-100 rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 px-4 h-full"
              >
                AI Insights
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="conference" className="flex-1 flex flex-col p-0 m-0 data-[state=active]:flex">
            <div className="flex-1 flex overflow-hidden">
              {/* Main video area */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1 bg-slate-900 relative">
                  {hasVideo ? (
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <Avatar className="h-24 w-24 mx-auto">
                          <AvatarImage src="/abstract-self-reflection.png" alt="Your avatar" />
                          <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                        <p className="mt-4 text-white text-lg">Camera is turned off</p>
                      </div>
                    </div>
                  )}

                  {/* Participant videos */}
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    {participants.map((participant) => (
                      <div
                        key={participant.id}
                        className={`w-32 h-24 bg-slate-800 rounded-lg overflow-hidden border-2 ${participant.isSpeaking ? "border-green-500" : "border-transparent"}`}
                      >
                        {participant.hasVideo ? (
                          <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                            <img
                              src={participant.avatar || "/placeholder.svg?height=128&width=128&query=User"}
                              alt={participant.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Avatar className="h-12 w-12">
                              <AvatarImage
                                src={participant.avatar || "/placeholder.svg?height=48&width=48&query=User"}
                                alt={participant.name}
                              />
                              <AvatarFallback>
                                {participant.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        )}
                        <div className="absolute bottom-1 left-1 right-1 flex justify-between items-center">
                          <span className="text-xs text-white truncate max-w-[80px]">{participant.name}</span>
                          <div className="flex space-x-1">
                            {!participant.hasAudio && <MicOff className="h-3 w-3 text-red-500" />}
                            {participant.isSpeaking && participant.hasAudio && (
                              <Mic className="h-3 w-3 text-green-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Controls */}
                <div className="h-16 bg-white border-t border-slate-200 flex items-center justify-between px-4">
                  <div className="flex items-center space-x-2">
                    <Button variant={hasAudio ? "outline" : "destructive"} size="icon" onClick={toggleAudio}>
                      {hasAudio ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>

                    <Button variant={hasVideo ? "outline" : "destructive"} size="icon" onClick={toggleVideo}>
                      {hasVideo ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </Button>

                    <Button variant={isScreenSharing ? "default" : "outline"} size="icon" onClick={toggleScreenSharing}>
                      <Monitor className="h-4 w-4" />
                    </Button>
                  </div>

                  <div>
                    <Button variant="destructive" size="sm">
                      End Conference
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Users className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Participants ({participants.length})</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant={showAIPanel ? "default" : "outline"}
                            size="icon"
                            onClick={() => setShowAIPanel(!showAIPanel)}
                          >
                            <Code className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>AI Assistant</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56">
                        <div className="grid gap-2">
                          <Button variant="ghost" className="flex items-center justify-start">
                            <FileText className="mr-2 h-4 w-4" />
                            <span>View patient records</span>
                          </Button>
                          <Button variant="ghost" className="flex items-center justify-start">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            <span>Open in new window</span>
                          </Button>
                          <Button variant="ghost" className="flex items-center justify-start">
                            <Copy className="mr-2 h-4 w-4" />
                            <span>Copy conference link</span>
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              {/* Chat sidebar */}
              <div className="w-80 border-l border-slate-200 flex flex-col bg-white">
                <div className="p-4 border-b border-slate-200">
                  <h2 className="font-semibold">Conference Chat</h2>
                </div>

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="flex flex-col">
                        <div className="flex items-start space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={message.senderAvatar || "/placeholder.svg?height=32&width=32&query=User"}
                              alt={message.senderName}
                            />
                            <AvatarFallback>
                              {message.senderName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <span className="font-medium text-sm">{message.senderName}</span>
                              <span className="ml-2 text-xs text-slate-500">{formatTimestamp(message.timestamp)}</span>
                              {message.isAI && (
                                <Badge
                                  variant="outline"
                                  className="ml-2 bg-blue-50 text-blue-700 border-blue-200 text-xs"
                                >
                                  AI
                                </Badge>
                              )}
                            </div>
                            <div
                              className={`mt-1 text-sm p-2 rounded-lg ${message.isAI ? "bg-blue-50" : "bg-slate-100"}`}
                            >
                              {message.content}
                            </div>
                            {message.attachments && message.attachments.length > 0 && (
                              <div className="mt-2">
                                {message.attachments.map((attachment) => (
                                  <div
                                    key={attachment.id}
                                    className="flex items-center p-2 bg-slate-100 rounded text-sm"
                                  >
                                    <FileText className="h-4 w-4 mr-2 text-slate-500" />
                                    <span className="flex-1 truncate">{attachment.name}</span>
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="p-4 border-t border-slate-200">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      Send
                    </Button>
                  </div>
                </div>
              </div>

              {/* AI Assistant Panel */}
              {showAIPanel && (
                <div className="w-80 border-l border-slate-200 flex flex-col bg-white">
                  <div className="p-4 border-b border-slate-200">
                    <h2 className="font-semibold">AI Assistant</h2>
                    <p className="text-xs text-slate-500 mt-1">Ask detailed questions about genomic data</p>
                  </div>

                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm">I can provide detailed information about:</p>
                        <ul className="mt-2 text-sm space-y-1 list-disc pl-4">
                          <li>Specific gene variants and mutations</li>
                          <li>Treatment options based on genomic profile</li>
                          <li>Clinical trial recommendations</li>
                          <li>Prognostic information</li>
                          <li>Pathway analysis</li>
                        </ul>
                      </div>

                      {/* AI Query Input */}
                      <div className="mt-4">
                        <Label htmlFor="ai-query" className="text-sm font-medium">
                          Ask a detailed question:
                        </Label>
                        <div className="mt-1 flex items-center space-x-2">
                          <Input
                            id="ai-query"
                            placeholder="e.g., Tell me about the TP53 mutation..."
                            value={aiQuery}
                            onChange={(e) => setAIQuery(e.target.value)}
                            onKeyPress={handleAIKeyPress}
                            className="flex-1"
                          />
                          <Button onClick={handleAIQuery} disabled={!aiQuery.trim()}>
                            Ask
                          </Button>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="genomics" className="flex-1 p-0 m-0 data-[state=active]:block">
            <div className="h-full p-6 overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                  <h3 className="text-lg font-semibold mb-4">Key Genomic Variants</h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-red-800">TP53 R175H</h4>
                          <p className="text-sm text-red-700 mt-1">Pathogenic missense mutation</p>
                          <div className="mt-2 text-sm">
                            <p>Chromosome: 17p13.1</p>
                            <p>Allele Frequency: 0.48</p>
                            <p>Clinical Significance: Pathogenic</p>
                          </div>
                        </div>
                        <Badge className="bg-red-100 text-red-800 border-red-200">High Impact</Badge>
                      </div>
                    </div>

                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-red-800">BRCA1 Exon 13 Deletion</h4>
                          <p className="text-sm text-red-700 mt-1">Large genomic rearrangement</p>
                          <div className="mt-2 text-sm">
                            <p>Chromosome: 17q21.31</p>
                            <p>Deletion Size: 3.8kb</p>
                            <p>Clinical Significance: Pathogenic</p>
                          </div>
                        </div>
                        <Badge className="bg-red-100 text-red-800 border-red-200">High Impact</Badge>
                      </div>
                    </div>

                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-amber-800">PIK3CA H1047R</h4>
                          <p className="text-sm text-amber-700 mt-1">Activating missense mutation</p>
                          <div className="mt-2 text-sm">
                            <p>Chromosome: 3q26.32</p>
                            <p>Allele Frequency: 0.31</p>
                            <p>Clinical Significance: Pathogenic, Actionable</p>
                          </div>
                        </div>
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200">Medium Impact</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                  <h3 className="text-lg font-semibold mb-4">Treatment Implications</h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800">PARP Inhibitors</h4>
                      <p className="text-sm text-green-700 mt-1">Based on BRCA1 mutation</p>
                      <div className="mt-2 text-sm">
                        <p>Recommended Agents: Olaparib, Niraparib</p>
                        <p>Evidence Level: A (Strong)</p>
                        <p>Clinical Trials: NCT03344965, NCT04171700</p>
                      </div>
                    </div>

                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800">PI3K Inhibitors</h4>
                      <p className="text-sm text-green-700 mt-1">Based on PIK3CA mutation</p>
                      <div className="mt-2 text-sm">
                        <p>Recommended Agents: Alpelisib</p>
                        <p>Evidence Level: B (Moderate)</p>
                        <p>Clinical Trials: NCT04208178, NCT03056755</p>
                      </div>
                    </div>

                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <h4 className="font-medium text-amber-800">WEE1 Inhibitors</h4>
                      <p className="text-sm text-amber-700 mt-1">Based on TP53 mutation</p>
                      <div className="mt-2 text-sm">
                        <p>Recommended Agents: Adavosertib</p>
                        <p>Evidence Level: C (Emerging)</p>
                        <p>Clinical Trials: NCT03610490, NCT02576444</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 md:col-span-2">
                  <h3 className="text-lg font-semibold mb-4">Genomic Signature Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <h4 className="font-medium">Tumor Mutation Burden</h4>
                      <p className="text-2xl font-bold mt-2">12.4 mut/Mb</p>
                      <p className="text-sm text-slate-500 mt-1">Intermediate (50th percentile)</p>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <h4 className="font-medium">Microsatellite Status</h4>
                      <p className="text-2xl font-bold mt-2">MSS</p>
                      <p className="text-sm text-slate-500 mt-1">Microsatellite Stable</p>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <h4 className="font-medium">Homologous Recombination</h4>
                      <p className="text-2xl font-bold mt-2">Deficient</p>
                      <p className="text-sm text-slate-500 mt-1">Due to BRCA1 mutation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="flex-1 p-0 m-0 data-[state=active]:block">
            <div className="h-full p-6 overflow-auto">
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                  <h3 className="text-lg font-semibold mb-4">AI-Generated Insights</h3>

                  <div className="space-y-4">
                    {genomicInsights.map((insight) => (
                      <div
                        key={insight.id}
                        className={`p-4 rounded-lg border ${
                          insight.severity === "high"
                            ? "bg-red-50 border-red-200"
                            : insight.severity === "medium"
                              ? "bg-amber-50 border-amber-200"
                              : "bg-green-50 border-green-200"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium">{insight.title}</h4>
                          <Badge
                            className={`${
                              insight.severity === "high"
                                ? "bg-red-100 text-red-800 border-red-200"
                                : insight.severity === "medium"
                                  ? "bg-amber-100 text-amber-800 border-amber-200"
                                  : "bg-green-100 text-green-800 border-green-200"
                            }`}
                          >
                            {insight.severity === "high"
                              ? "High Priority"
                              : insight.severity === "medium"
                                ? "Medium Priority"
                                : "Low Priority"}
                          </Badge>
                        </div>

                        <p className="mt-2 text-sm">{insight.description}</p>

                        <div className="mt-3 flex flex-wrap gap-1">
                          {insight.relatedGenes.map((gene) => (
                            <Badge key={gene} variant="outline" className="bg-slate-100">
                              {gene}
                            </Badge>
                          ))}
                        </div>

                        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                          <span>Source: {insight.source}</span>
                          <span>Confidence: {(insight.confidence * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                  <h3 className="text-lg font-semibold mb-4">Clinical Recommendations</h3>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <h4 className="font-medium">Primary Treatment Recommendation</h4>
                      <p className="mt-2 text-sm">
                        Based on the comprehensive genomic profile, the primary treatment recommendation is a
                        combination of PARP inhibition (olaparib) targeting the BRCA1 deficiency, with consideration of
                        alpelisib for the PIK3CA mutation if disease progression occurs.
                      </p>
                      <p className="mt-2 text-sm font-medium">Supporting Evidence:</p>
                      <ul className="mt-1 text-sm list-disc pl-5 space-y-1">
                        <li>OlympiAD trial showed significant PFS benefit for olaparib in BRCA-mutated patients</li>
                        <li>SOLAR-1 trial demonstrated efficacy of alpelisib in PIK3CA-mutated cases</li>
                        <li>Preclinical data suggests synthetic lethality between PARP inhibition and TP53 mutation</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <h4 className="font-medium">Clinical Trial Opportunities</h4>
                      <div className="mt-2 space-y-3">
                        <div>
                          <p className="text-sm font-medium">NCT04171700: PARP/WEE1 Combination Study</p>
                          <p className="text-sm mt-1">
                            Phase II trial of olaparib and adavosertib in patients with BRCA-mutated and TP53-mutated
                            solid tumors
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Location: Memorial Sloan Kettering Cancer Center (New York, NY)
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-medium">
                            NCT03742895: Targeted Therapy Based on Molecular Profiling
                          </p>
                          <p className="text-sm mt-1">
                            Basket trial for multiple targeted therapies based on comprehensive genomic profiling
                          </p>
                          <p className="text-xs text-slate-500 mt-1">Location: Multiple sites (Nationwide)</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <h4 className="font-medium">Surveillance Recommendations</h4>
                      <p className="mt-2 text-sm">
                        Given the TP53 mutation and associated Li-Fraumeni syndrome risk, enhanced surveillance is
                        recommended:
                      </p>
                      <ul className="mt-1 text-sm list-disc pl-5 space-y-1">
                        <li>Whole-body MRI annually</li>
                        <li>Breast MRI every 6 months</li>
                        <li>Dermatologic examination annually</li>
                        <li>Colonoscopy every 2-3 years</li>
                        <li>Brain MRI annually</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
