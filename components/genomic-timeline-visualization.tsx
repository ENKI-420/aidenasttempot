"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import {
  Clock,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  DnaIcon as DNA,
  Activity,
  Pill,
  ClipboardList,
  User,
  FileText,
  BarChart3,
  Zap,
  Microscope,
  Brain,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react"

// Define types for our timeline data
interface TimelineEvent {
  id: string
  date: string // Format: YYYY-MM-DD
  dayOffset: number // Days from initial event
  title: string
  description: string
  category:
    | "genomic-analysis"
    | "clinical-finding"
    | "treatment-decision"
    | "patient-outcome"
    | "follow-up-analysis"
    | "ai-insight"
  icon: React.ReactNode
  confidence?: number // AI confidence level (0-100)
  relatedEvents?: string[] // IDs of related events
  details?: {
    before?: string
    after?: string
    impact?: string
  }
}

interface GenomicVariantTimeline {
  id: string
  name: string
  initialInterpretation: string
  timepoints: {
    dayOffset: number
    interpretation: string
    confidence: number
    evidence: "limited" | "moderate" | "strong"
  }[]
}

interface ClinicalOutcomeTimeline {
  id: string
  name: string
  timepoints: {
    dayOffset: number
    status: string
    severity: "none" | "mild" | "moderate" | "severe"
    details: string
  }[]
}

interface PatientTimelineData {
  id: string
  name: string
  startDate: string // Format: YYYY-MM-DD
  totalDuration: number // in days
  events: TimelineEvent[]
  genomicVariants: GenomicVariantTimeline[]
  clinicalOutcomes: ClinicalOutcomeTimeline[]
  aiInsights: {
    dayOffset: number
    insights: string[]
    limitations: string[]
    confidence: number
  }[]
}

// Sample data for our timeline visualization
const patientTimelineData: PatientTimelineData[] = [
  {
    id: "timeline-001",
    name: "Patient A - Cardiovascular Genomics Case",
    startDate: "2024-01-15",
    totalDuration: 365, // One year follow-up
    events: [
      {
        id: "event-001",
        date: "2024-01-15",
        dayOffset: 0,
        title: "Initial Genomic Sequencing",
        description: "Whole genome sequencing performed due to family history of early-onset cardiovascular disease.",
        category: "genomic-analysis",
        icon: <DNA className="h-5 w-5" />,
      },
      {
        id: "event-002",
        date: "2024-01-28",
        dayOffset: 13,
        title: "Preliminary Variant Identification",
        description: "AI analysis identified 3 variants of potential significance related to cardiovascular function.",
        category: "ai-insight",
        icon: <Zap className="h-5 w-5" />,
        confidence: 65,
        details: {
          before: "No known genetic factors for patient's symptoms",
          after: "Multiple variants identified with potential cardiovascular implications",
          impact: "Directed further clinical investigation toward specific pathways",
        },
      },
      {
        id: "event-003",
        date: "2024-02-10",
        dayOffset: 26,
        title: "Clinical Correlation",
        description: "Cardiologist review confirmed relevance of MYBPC3 variant to patient's clinical presentation.",
        category: "clinical-finding",
        icon: <Activity className="h-5 w-5" />,
        relatedEvents: ["event-002"],
      },
      {
        id: "event-004",
        date: "2024-02-25",
        dayOffset: 41,
        title: "Initial Treatment Plan",
        description:
          "Beta-blocker therapy initiated based on genomic findings suggesting hypertrophic cardiomyopathy risk.",
        category: "treatment-decision",
        icon: <Pill className="h-5 w-5" />,
        relatedEvents: ["event-003"],
      },
      {
        id: "event-005",
        date: "2024-04-15",
        dayOffset: 91,
        title: "3-Month Follow-up",
        description: "Echocardiogram showed stabilization of cardiac function with current treatment.",
        category: "patient-outcome",
        icon: <User className="h-5 w-5" />,
        relatedEvents: ["event-004"],
      },
      {
        id: "event-006",
        date: "2024-05-20",
        dayOffset: 126,
        title: "Advanced AI Analysis",
        description:
          "New AI algorithm identified additional significance of TTN variant interaction with MYBPC3, suggesting increased risk.",
        category: "ai-insight",
        icon: <Brain className="h-5 w-5" />,
        confidence: 82,
        details: {
          before: "Single variant focus (MYBPC3) for treatment decisions",
          after: "Multi-variant interaction model showing compound effect",
          impact: "Revealed need for more aggressive intervention based on combined genetic factors",
        },
      },
      {
        id: "event-007",
        date: "2024-06-10",
        dayOffset: 147,
        title: "Treatment Modification",
        description:
          "Added ACE inhibitor and increased monitoring frequency based on new genomic interaction insights.",
        category: "treatment-decision",
        icon: <ClipboardList className="h-5 w-5" />,
        relatedEvents: ["event-006"],
      },
      {
        id: "event-008",
        date: "2024-07-15",
        dayOffset: 182,
        title: "6-Month Comprehensive Review",
        description: "Cardiac MRI and biomarker panel showed improved cardiac remodeling with adjusted treatment.",
        category: "patient-outcome",
        icon: <CheckCircle2 className="h-5 w-5" />,
        relatedEvents: ["event-007"],
      },
      {
        id: "event-009",
        date: "2024-09-30",
        dayOffset: 259,
        title: "RNA Sequencing Analysis",
        description:
          "Transcriptome analysis revealed altered expression patterns confirming the functional impact of identified variants.",
        category: "follow-up-analysis",
        icon: <Microscope className="h-5 w-5" />,
        relatedEvents: ["event-002", "event-006"],
      },
      {
        id: "event-010",
        date: "2024-11-15",
        dayOffset: 305,
        title: "AI-Powered Risk Prediction",
        description:
          "Longitudinal data integration enabled 5-year cardiovascular event risk prediction with improved accuracy.",
        category: "ai-insight",
        icon: <BarChart3 className="h-5 w-5" />,
        confidence: 89,
        details: {
          before: "General risk assessment based on variant presence",
          after: "Personalized risk trajectory with temporal dimension",
          impact: "Enabled long-term preventive strategy optimization",
        },
      },
      {
        id: "event-011",
        date: "2025-01-15",
        dayOffset: 366,
        title: "One-Year Comprehensive Assessment",
        description:
          "Patient shows significant improvement in cardiac function and exercise tolerance with genomically-guided treatment.",
        category: "patient-outcome",
        icon: <FileText className="h-5 w-5" />,
        relatedEvents: ["event-007", "event-010"],
      },
    ],
    genomicVariants: [
      {
        id: "variant-001",
        name: "MYBPC3 c.1504C>T (p.Arg502Trp)",
        initialInterpretation: "Variant of uncertain significance with potential cardiac implications",
        timepoints: [
          {
            dayOffset: 13,
            interpretation: "Variant of uncertain significance (VUS)",
            confidence: 65,
            evidence: "limited",
          },
          {
            dayOffset: 91,
            interpretation: "Likely pathogenic variant associated with hypertrophic cardiomyopathy",
            confidence: 78,
            evidence: "moderate",
          },
          {
            dayOffset: 259,
            interpretation: "Pathogenic variant with confirmed functional impact on myocardial contractility",
            confidence: 92,
            evidence: "strong",
          },
        ],
      },
      {
        id: "variant-002",
        name: "TTN c.65428G>A (p.Gly21810Ser)",
        initialInterpretation: "Likely benign variant",
        timepoints: [
          {
            dayOffset: 13,
            interpretation: "Likely benign variant",
            confidence: 70,
            evidence: "limited",
          },
          {
            dayOffset: 126,
            interpretation: "Variant of uncertain significance with potential modifier effect",
            confidence: 60,
            evidence: "limited",
          },
          {
            dayOffset: 259,
            interpretation: "Moderate risk modifier when co-occurring with MYBPC3 variants",
            confidence: 85,
            evidence: "moderate",
          },
        ],
      },
      {
        id: "variant-003",
        name: "MYH7 c.2389G>A (p.Ala797Thr)",
        initialInterpretation: "Variant of uncertain significance",
        timepoints: [
          {
            dayOffset: 13,
            interpretation: "Variant of uncertain significance",
            confidence: 50,
            evidence: "limited",
          },
          {
            dayOffset: 126,
            interpretation: "Likely benign variant",
            confidence: 75,
            evidence: "moderate",
          },
          {
            dayOffset: 259,
            interpretation: "Benign variant",
            confidence: 90,
            evidence: "strong",
          },
        ],
      },
    ],
    clinicalOutcomes: [
      {
        id: "outcome-001",
        name: "Left Ventricular Hypertrophy",
        timepoints: [
          {
            dayOffset: 0,
            status: "Mild septal hypertrophy (15mm)",
            severity: "mild",
            details: "Incidental finding on echocardiogram",
          },
          {
            dayOffset: 91,
            status: "Stable septal hypertrophy (15mm)",
            severity: "mild",
            details: "No progression on beta-blocker therapy",
          },
          {
            dayOffset: 182,
            status: "Reduced septal hypertrophy (13mm)",
            severity: "mild",
            details: "Improvement with combined therapy",
          },
          {
            dayOffset: 366,
            status: "Minimal septal hypertrophy (12mm)",
            severity: "mild",
            details: "Continued improvement with genomically-guided therapy",
          },
        ],
      },
      {
        id: "outcome-002",
        name: "Exercise Tolerance",
        timepoints: [
          {
            dayOffset: 0,
            status: "Reduced exercise tolerance, NYHA Class II",
            severity: "moderate",
            details: "Dyspnea with moderate exertion",
          },
          {
            dayOffset: 91,
            status: "Improved exercise tolerance, NYHA Class I-II",
            severity: "mild",
            details: "Mild improvement with initial therapy",
          },
          {
            dayOffset: 182,
            status: "Normal exercise tolerance, NYHA Class I",
            severity: "mild",
            details: "Significant improvement with adjusted therapy",
          },
          {
            dayOffset: 366,
            status: "Excellent exercise tolerance, NYHA Class I",
            severity: "none",
            details: "Complete resolution of exercise limitation",
          },
        ],
      },
      {
        id: "outcome-003",
        name: "Arrhythmia Risk",
        timepoints: [
          {
            dayOffset: 0,
            status: "Occasional PVCs on Holter monitoring",
            severity: "mild",
            details: "No sustained arrhythmias",
          },
          {
            dayOffset: 91,
            status: "Reduced PVC burden",
            severity: "mild",
            details: "Improvement with beta-blocker therapy",
          },
          {
            dayOffset: 182,
            status: "Minimal PVCs",
            severity: "mild",
            details: "Continued improvement with combined therapy",
          },
          {
            dayOffset: 366,
            status: "No significant arrhythmias",
            severity: "none",
            details: "Resolution of arrhythmia risk",
          },
        ],
      },
    ],
    aiInsights: [
      {
        dayOffset: 13,
        insights: [
          "Identified MYBPC3 variant as potentially significant",
          "Suggested cardiac-focused clinical evaluation",
          "Recommended family screening for the variant",
        ],
        limitations: [
          "Limited confidence in variant pathogenicity classification",
          "Uncertain genotype-phenotype correlation",
          "Insufficient data on variant interactions",
        ],
        confidence: 65,
      },
      {
        dayOffset: 126,
        insights: [
          "Detected synergistic effect between MYBPC3 and TTN variants",
          "Predicted increased risk of progressive hypertrophy",
          "Suggested more aggressive pharmacological intervention",
          "Recommended more frequent cardiac imaging",
        ],
        limitations: [
          "Limited longitudinal data on variant co-occurrence",
          "Moderate confidence in interaction model",
          "Incomplete understanding of molecular mechanisms",
        ],
        confidence: 82,
      },
      {
        dayOffset: 305,
        insights: [
          "Developed personalized 5-year risk prediction model",
          "Identified optimal therapeutic targets based on variant profile",
          "Predicted excellent response to current treatment regimen",
          "Suggested reduced monitoring frequency based on stable course",
        ],
        limitations: [
          "Model based on limited population data with similar variant combinations",
          "Environmental factors not fully incorporated",
          "Potential unknown genetic modifiers",
        ],
        confidence: 89,
      },
    ],
  },
  {
    id: "timeline-002",
    name: "Patient B - Pharmacogenomic Evolution Case",
    startDate: "2024-02-10",
    totalDuration: 300, // 10 months follow-up
    events: [
      {
        id: "event-101",
        date: "2024-02-10",
        dayOffset: 0,
        title: "Initial Pharmacogenomic Testing",
        description: "Pharmacogenomic panel ordered due to adverse reactions to multiple medications.",
        category: "genomic-analysis",
        icon: <DNA className="h-5 w-5" />,
      },
      {
        id: "event-102",
        date: "2024-02-20",
        dayOffset: 10,
        title: "Basic Variant Identification",
        description: "Initial analysis identified CYP2D6 poor metabolizer status affecting multiple drug pathways.",
        category: "ai-insight",
        icon: <Zap className="h-5 w-5" />,
        confidence: 75,
        details: {
          before: "Unexplained adverse drug reactions",
          after: "Identified specific metabolic pathway deficiency",
          impact: "Enabled medication selection adjustments",
        },
      },
      // Additional events would be defined here
    ],
    genomicVariants: [
      // Pharmacogenomic variants would be defined here
    ],
    clinicalOutcomes: [
      // Clinical outcomes would be defined here
    ],
    aiInsights: [
      // AI insights would be defined here
    ],
  },
]

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

// Helper function to calculate date from offset
function calculateDate(startDate: string, dayOffset: number): string {
  const date = new Date(startDate)
  date.setDate(date.getDate() + dayOffset)
  return formatDate(date)
}

// Helper function to get icon color based on category
function getCategoryColor(category: string): string {
  switch (category) {
    case "genomic-analysis":
      return "text-green-500"
    case "clinical-finding":
      return "text-blue-500"
    case "treatment-decision":
      return "text-yellow-500"
    case "patient-outcome":
      return "text-purple-500"
    case "follow-up-analysis":
      return "text-teal-500"
    case "ai-insight":
      return "text-red-500"
    default:
      return "text-gray-500"
  }
}

// Helper function to get background color based on category
function getCategoryBgColor(category: string): string {
  switch (category) {
    case "genomic-analysis":
      return "bg-green-900/20"
    case "clinical-finding":
      return "bg-blue-900/20"
    case "treatment-decision":
      return "bg-yellow-900/20"
    case "patient-outcome":
      return "bg-purple-900/20"
    case "follow-up-analysis":
      return "bg-teal-900/20"
    case "ai-insight":
      return "bg-red-900/20"
    default:
      return "bg-gray-900/20"
  }
}

// Helper function to get badge color based on evidence level
function getEvidenceBadgeColor(evidence: string): string {
  switch (evidence) {
    case "strong":
      return "bg-green-600 hover:bg-green-700"
    case "moderate":
      return "bg-blue-600 hover:bg-blue-700"
    case "limited":
      return "bg-yellow-600 hover:bg-yellow-700"
    default:
      return "bg-gray-600 hover:bg-gray-700"
  }
}

// Helper function to get severity color
function getSeverityColor(severity: string): string {
  switch (severity) {
    case "none":
      return "bg-green-600"
    case "mild":
      return "bg-blue-600"
    case "moderate":
      return "bg-yellow-600"
    case "severe":
      return "bg-red-600"
    default:
      return "bg-gray-600"
  }
}

export function GenomicTimelineVisualization() {
  const [activeTimeline, setActiveTimeline] = useState<PatientTimelineData>(patientTimelineData[0])
  const [currentDay, setCurrentDay] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1) // days per second
  const [activeTab, setActiveTab] = useState("timeline")
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  // Filter events based on current day
  const visibleEvents = activeTimeline.events.filter((event) => event.dayOffset <= currentDay)

  // Get current variants interpretation
  const getCurrentVariantInterpretation = (variant: GenomicVariantTimeline) => {
    // Find the most recent interpretation before or at current day
    const validTimepoints = variant.timepoints.filter((tp) => tp.dayOffset <= currentDay)
    if (validTimepoints.length === 0) return null
    return validTimepoints.reduce((prev, current) => (current.dayOffset > prev.dayOffset ? current : prev))
  }

  // Get current clinical status
  const getCurrentClinicalStatus = (outcome: ClinicalOutcomeTimeline) => {
    // Find the most recent status before or at current day
    const validTimepoints = outcome.timepoints.filter((tp) => tp.dayOffset <= currentDay)
    if (validTimepoints.length === 0) return null
    return validTimepoints.reduce((prev, current) => (current.dayOffset > prev.dayOffset ? current : prev))
  }

  // Get current AI insights
  const getCurrentAIInsights = () => {
    // Find the most recent insights before or at current day
    const validInsights = activeTimeline.aiInsights.filter((insight) => insight.dayOffset <= currentDay)
    if (validInsights.length === 0) return null
    return validInsights.reduce((prev, current) => (current.dayOffset > prev.dayOffset ? current : prev))
  }

  // Handle timeline navigation
  const navigateTimeline = (direction: "next" | "prev") => {
    const currentIndex = patientTimelineData.findIndex((t) => t.id === activeTimeline.id)
    if (direction === "next" && currentIndex < patientTimelineData.length - 1) {
      setActiveTimeline(patientTimelineData[currentIndex + 1])
      setCurrentDay(0)
      setSelectedEvent(null)
    } else if (direction === "prev" && currentIndex > 0) {
      setActiveTimeline(patientTimelineData[currentIndex - 1])
      setCurrentDay(0)
      setSelectedEvent(null)
    }
  }

  // Handle event selection
  const handleEventClick = (event: TimelineEvent) => {
    setSelectedEvent(event.id === selectedEvent?.id ? null : event)
    // Scroll to the event in the timeline
    if (event.id !== selectedEvent?.id && timelineRef.current) {
      const eventElement = document.getElementById(`event-${event.id}`)
      if (eventElement) {
        timelineRef.current.scrollTo({
          left: eventElement.offsetLeft - 100,
          behavior: "smooth",
        })
      }
    }
  }

  // Handle playback
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isPlaying && currentDay < activeTimeline.totalDuration) {
      interval = setInterval(() => {
        setCurrentDay((prev) => {
          const next = prev + playbackSpeed
          if (next >= activeTimeline.totalDuration) {
            setIsPlaying(false)
            return activeTimeline.totalDuration
          }
          return next
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, currentDay, activeTimeline.totalDuration, playbackSpeed])

  // Reset playback when changing timelines
  useEffect(() => {
    setIsPlaying(false)
    setCurrentDay(0)
    setSelectedEvent(null)
  }, [activeTimeline])

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Genomic Insights Evolution</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateTimeline("prev")}
            disabled={activeTimeline.id === patientTimelineData[0].id}
            className="border-green-900/40 text-green-500 hover:bg-green-900/20"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous Case
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateTimeline("next")}
            disabled={activeTimeline.id === patientTimelineData[patientTimelineData.length - 1].id}
            className="border-green-900/40 text-green-500 hover:bg-green-900/20"
          >
            Next Case <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      <Card className="bg-gray-900 border-green-900/40 mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{activeTimeline.name}</CardTitle>
              <CardDescription>
                Start Date: {formatDate(activeTimeline.startDate)} | Duration: {activeTimeline.totalDuration} days
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="border-green-900/40 text-green-500 hover:bg-green-900/20"
              >
                {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCurrentDay(0)
                  setIsPlaying(false)
                }}
                className="border-green-900/40 text-green-500 hover:bg-green-900/20"
              >
                <RotateCcw className="h-4 w-4 mr-1" /> Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-sm font-medium">
                  Current Date: {calculateDate(activeTimeline.startDate, currentDay)} (Day {currentDay})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Playback Speed:</span>
                <select
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                  className="bg-gray-800 border border-gray-700 rounded text-xs px-2 py-1"
                >
                  <option value="1">1x (1 day/sec)</option>
                  <option value="5">5x (5 days/sec)</option>
                  <option value="10">10x (10 days/sec)</option>
                  <option value="30">30x (30 days/sec)</option>
                </select>
              </div>
            </div>
            <div className="w-full">
              <Slider
                value={[currentDay]}
                min={0}
                max={activeTimeline.totalDuration}
                step={1}
                onValueChange={(value) => {
                  setCurrentDay(value[0])
                  setIsPlaying(false)
                }}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatDate(activeTimeline.startDate)}</span>
                <span>{calculateDate(activeTimeline.startDate, Math.floor(activeTimeline.totalDuration / 2))}</span>
                <span>{calculateDate(activeTimeline.startDate, activeTimeline.totalDuration)}</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="timeline" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-gray-800 border border-green-900/40">
              <TabsTrigger
                value="timeline"
                className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500"
              >
                Event Timeline
              </TabsTrigger>
              <TabsTrigger
                value="variants"
                className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500"
              >
                Genomic Variants
              </TabsTrigger>
              <TabsTrigger
                value="outcomes"
                className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500"
              >
                Clinical Outcomes
              </TabsTrigger>
              <TabsTrigger
                value="ai"
                className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500"
              >
                AI Evolution
              </TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="mt-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Event Timeline</h3>
                <p className="text-gray-400 text-sm">
                  This timeline shows key events in the patient's journey, from initial genomic analysis to clinical
                  outcomes. Drag the slider to see how insights evolve over time.
                </p>
              </div>

              {/* Horizontal scrollable timeline */}
              <div
                ref={timelineRef}
                className="relative w-full overflow-x-auto pb-4 mb-6"
                style={{ scrollbarWidth: "thin" }}
              >
                <div className="w-max min-w-full">
                  <div className="relative h-20 flex items-center">
                    {/* Timeline line */}
                    <div className="absolute h-0.5 bg-gray-700 w-full top-1/2 transform -translate-y-1/2"></div>

                    {/* Timeline events */}
                    {activeTimeline.events.map((event) => {
                      const isVisible = event.dayOffset <= currentDay
                      const isSelected = selectedEvent?.id === event.id
                      const position = (event.dayOffset / activeTimeline.totalDuration) * 100

                      return (
                        <div
                          id={`event-${event.id}`}
                          key={event.id}
                          className={`absolute cursor-pointer transition-all duration-300 ${
                            isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                          }`}
                          style={{ left: `${position}%` }}
                          onClick={() => handleEventClick(event)}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              isSelected ? "ring-2 ring-white ring-offset-2 ring-offset-gray-900" : ""
                            } ${getCategoryBgColor(event.category)}`}
                          >
                            <span className={`${getCategoryColor(event.category)}`}>{event.icon}</span>
                          </div>
                          <div
                            className={`absolute bottom-full mb-2 transform -translate-x-1/2 left-1/2 ${
                              isSelected ? "font-medium text-white" : "text-gray-400"
                            } text-xs whitespace-nowrap`}
                          >
                            Day {event.dayOffset}
                          </div>
                        </div>
                      )
                    })}

                    {/* Current day marker */}
                    <div
                      className="absolute w-0.5 h-8 bg-green-500 top-1/2 transform -translate-y-1/2 z-10"
                      style={{ left: `${(currentDay / activeTimeline.totalDuration) * 100}%` }}
                    >
                      <div className="absolute top-full mt-1 transform -translate-x-1/2 text-xs text-green-500 font-medium whitespace-nowrap">
                        Day {currentDay}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected event details or event list */}
              {selectedEvent ? (
                <Card className="bg-gray-800 border-green-900/40">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-md flex items-center">
                        <span className={`mr-2 ${getCategoryColor(selectedEvent.category)}`}>{selectedEvent.icon}</span>
                        {selectedEvent.title}
                      </CardTitle>
                      <Badge className="bg-gray-700">
                        {calculateDate(activeTimeline.startDate, selectedEvent.dayOffset)} (Day{" "}
                        {selectedEvent.dayOffset})
                      </Badge>
                    </div>
                    <CardDescription>{selectedEvent.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedEvent.category === "ai-insight" && selectedEvent.details && (
                      <div className="mt-2 space-y-3">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-400">Before</h4>
                            <p className="text-white">{selectedEvent.details.before}</p>
                          </div>
                          <div className="flex items-center justify-center">
                            <ArrowRight className="h-6 w-6 text-green-500" />
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-400">After</h4>
                            <p className="text-white">{selectedEvent.details.after}</p>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-gray-700">
                          <h4 className="font-medium text-gray-400 mb-1">Clinical Impact</h4>
                          <p className="text-white text-sm">{selectedEvent.details.impact}</p>
                        </div>
                        {selectedEvent.confidence && (
                          <div className="pt-3 border-t border-gray-700">
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="font-medium text-gray-400">AI Confidence</h4>
                              <span className="text-white">{selectedEvent.confidence}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                              <div
                                className="bg-green-500 h-1.5 rounded-full"
                                style={{ width: `${selectedEvent.confidence}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedEvent.relatedEvents && selectedEvent.relatedEvents.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-gray-700">
                        <h4 className="font-medium text-gray-400 mb-2">Related Events</h4>
                        <div className="space-y-2">
                          {selectedEvent.relatedEvents.map((relatedId) => {
                            const relatedEvent = activeTimeline.events.find((e) => e.id === relatedId)
                            return (
                              relatedEvent && (
                                <div
                                  key={relatedId}
                                  className="flex items-center p-2 rounded bg-gray-700 cursor-pointer hover:bg-gray-600"
                                  onClick={() => handleEventClick(relatedEvent)}
                                >
                                  <span className={`mr-2 ${getCategoryColor(relatedEvent.category)}`}>
                                    {relatedEvent.icon}
                                  </span>
                                  <div>
                                    <div className="text-sm font-medium">{relatedEvent.title}</div>
                                    <div className="text-xs text-gray-400">
                                      Day {relatedEvent.dayOffset} -{" "}
                                      {calculateDate(activeTimeline.startDate, relatedEvent.dayOffset)}
                                    </div>
                                  </div>
                                </div>
                              )
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {visibleEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start p-3 rounded bg-gray-800 border border-green-900/40 cursor-pointer hover:bg-gray-700"
                      onClick={() => handleEventClick(event)}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getCategoryBgColor(
                          event.category,
                        )}`}
                      >
                        <span className={`${getCategoryColor(event.category)}`}>{event.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-medium">{event.title}</h4>
                          <Badge className="bg-gray-700 ml-2">Day {event.dayOffset}</Badge>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{event.description}</p>
                      </div>
                    </div>
                  ))}

                  {visibleEvents.length === 0 && (
                    <div className="text-center py-6 text-gray-400">
                      No events yet. Move the timeline slider forward to see events.
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="variants" className="mt-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Genomic Variant Evolution</h3>
                <p className="text-gray-400 text-sm">
                  This view shows how the interpretation of genomic variants evolves over time as more evidence becomes
                  available and AI analysis improves.
                </p>
              </div>

              <div className="space-y-4">
                {activeTimeline.genomicVariants.map((variant) => {
                  const currentInterpretation = getCurrentVariantInterpretation(variant)

                  return (
                    <Card key={variant.id} className="bg-gray-800 border-green-900/40">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center">
                          <DNA className="h-4 w-4 mr-2 text-green-500" />
                          {variant.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Initial Interpretation</h4>
                            <p className="text-sm">{variant.initialInterpretation}</p>
                          </div>

                          {currentInterpretation && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-2">
                                Current Interpretation (Day {currentInterpretation.dayOffset})
                              </h4>
                              <div className="p-3 rounded bg-gray-700">
                                <div className="flex justify-between items-start mb-2">
                                  <p className="text-sm">{currentInterpretation.interpretation}</p>
                                  <Badge className={getEvidenceBadgeColor(currentInterpretation.evidence)}>
                                    {currentInterpretation.evidence.charAt(0).toUpperCase() +
                                      currentInterpretation.evidence.slice(1)}{" "}
                                    Evidence
                                  </Badge>
                                </div>
                                <div className="flex justify-between items-center mt-3">
                                  <span className="text-xs text-gray-400">AI Confidence:</span>
                                  <span className="text-xs text-white">{currentInterpretation.confidence}%</span>
                                </div>
                                <div className="w-full bg-gray-600 rounded-full h-1.5 mt-1">
                                  <div
                                    className="bg-green-500 h-1.5 rounded-full"
                                    style={{ width: `${currentInterpretation.confidence}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          )}

                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Interpretation Timeline</h4>
                            <div className="relative pt-6">
                              {/* Timeline line */}
                              <div className="absolute h-0.5 bg-gray-700 w-full top-3"></div>

                              {/* Timeline points */}
                              <div className="flex justify-between">
                                {variant.timepoints.map((timepoint, index) => {
                                  const isReached = currentDay >= timepoint.dayOffset
                                  const position = (timepoint.dayOffset / activeTimeline.totalDuration) * 100

                                  return (
                                    <div
                                      key={index}
                                      className="relative"
                                      style={{ left: `${position}%`, marginLeft: "-12px" }}
                                    >
                                      <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                          isReached ? "bg-green-900/20 text-green-500" : "bg-gray-700 text-gray-500"
                                        }`}
                                      >
                                        {index + 1}
                                      </div>
                                      <div
                                        className={`absolute top-full mt-1 transform -translate-x-1/2 text-xs ${
                                          isReached ? "text-gray-300" : "text-gray-500"
                                        } whitespace-nowrap`}
                                      >
                                        Day {timepoint.dayOffset}
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="outcomes" className="mt-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Clinical Outcomes Evolution</h3>
                <p className="text-gray-400 text-sm">
                  This view shows how clinical outcomes change over time in response to genomically-guided
                  interventions.
                </p>
              </div>

              <div className="space-y-4">
                {activeTimeline.clinicalOutcomes.map((outcome) => {
                  const currentStatus = getCurrentClinicalStatus(outcome)

                  return (
                    <Card key={outcome.id} className="bg-gray-800 border-green-900/40">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center">
                          <Activity className="h-4 w-4 mr-2 text-blue-500" />
                          {outcome.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {currentStatus && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-400 mb-2">
                              Current Status (Day {currentStatus.dayOffset})
                            </h4>
                            <div className="p-3 rounded bg-gray-700">
                              <div className="flex justify-between items-start">
                                <p className="text-sm">{currentStatus.status}</p>
                                <Badge className={getSeverityColor(currentStatus.severity)}>
                                  {currentStatus.severity.charAt(0).toUpperCase() + currentStatus.severity.slice(1)}{" "}
                                  Severity
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-400 mt-2">{currentStatus.details}</p>
                            </div>
                          </div>
                        )}

                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Outcome Timeline</h4>
                          <div className="space-y-3">
                            {outcome.timepoints.map((timepoint, index) => {
                              const isReached = currentDay >= timepoint.dayOffset
                              return (
                                <div
                                  key={index}
                                  className={`p-2 rounded border ${
                                    isReached
                                      ? "bg-gray-700 border-gray-600"
                                      : "bg-gray-800/50 border-gray-700 opacity-50"
                                  }`}
                                >
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs font-medium">
                                      Day {timepoint.dayOffset} (
                                      {calculateDate(activeTimeline.startDate, timepoint.dayOffset)})
                                    </span>
                                    <Badge className={isReached ? getSeverityColor(timepoint.severity) : "bg-gray-600"}>
                                      {timepoint.severity.charAt(0).toUpperCase() + timepoint.severity.slice(1)}
                                    </Badge>
                                  </div>
                                  <p className="text-sm mt-1">{timepoint.status}</p>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="ai" className="mt-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">AI Analysis Evolution</h3>
                <p className="text-gray-400 text-sm">
                  This view shows how AI analysis capabilities and insights evolve over time as more data becomes
                  available and algorithms improve.
                </p>
              </div>

              {getCurrentAIInsights() ? (
                <Card className="bg-gray-800 border-green-900/40">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-md flex items-center">
                        <Brain className="h-4 w-4 mr-2 text-red-500" />
                        AI Insights at Day {getCurrentAIInsights()?.dayOffset}
                      </CardTitle>
                      <Badge className="bg-red-900/40 text-red-400 border border-red-500/30">
                        Confidence: {getCurrentAIInsights()?.confidence}%
                      </Badge>
                    </div>
                    <CardDescription>
                      {calculateDate(activeTimeline.startDate, getCurrentAIInsights()?.dayOffset || 0)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Key Insights</h4>
                        <ul className="space-y-2">
                          {getCurrentAIInsights()?.insights.map((insight, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span className="text-sm">{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Current Limitations</h4>
                        <ul className="space-y-2">
                          {getCurrentAIInsights()?.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-start">
                              <AlertCircle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 shrink-0" />
                              <span className="text-sm">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">AI Confidence Evolution</h4>
                        <div className="relative h-40 mt-4">
                          {/* Chart background grid */}
                          <div className="absolute inset-0 grid grid-cols-1 grid-rows-4">
                            {[0, 1, 2, 3].map((i) => (
                              <div key={i} className="border-t border-gray-700 relative" style={{ gridRow: 4 - i }}>
                                <span className="absolute -top-2.5 -left-8 text-xs text-gray-500">{25 * (i + 1)}%</span>
                              </div>
                            ))}
                          </div>

                          {/* Confidence line */}
                          <svg className="absolute inset-0 h-full w-full overflow-visible">
                            <defs>
                              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0" />
                              </linearGradient>
                            </defs>

                            {/* Area under the curve */}
                            <path
                              d={`
                                M 0 ${100 - (activeTimeline.aiInsights[0]?.confidence || 0) * 0.8}
                                ${activeTimeline.aiInsights
                                  .filter((insight) => insight.dayOffset <= currentDay)
                                  .map(
                                    (insight) =>
                                      `L ${
                                        (insight.dayOffset / activeTimeline.totalDuration) * 100
                                      } ${100 - insight.confidence * 0.8}`,
                                  )
                                  .join(" ")}
                                L ${
                                  (Math.min(
                                    currentDay,
                                    activeTimeline.aiInsights[activeTimeline.aiInsights.length - 1]?.dayOffset || 0,
                                  ) /
                                    activeTimeline.totalDuration) *
                                  100
                                } 100
                                L 0 100
                                Z
                              `}
                              fill="url(#gradient)"
                              opacity="0.3"
                            />

                            {/* Line */}
                            <path
                              d={`
                                M 0 ${100 - (activeTimeline.aiInsights[0]?.confidence || 0) * 0.8}
                                ${activeTimeline.aiInsights
                                  .filter((insight) => insight.dayOffset <= currentDay)
                                  .map(
                                    (insight) =>
                                      `L ${
                                        (insight.dayOffset / activeTimeline.totalDuration) * 100
                                      } ${100 - insight.confidence * 0.8}`,
                                  )
                                  .join(" ")}
                              `}
                              fill="none"
                              stroke="rgb(34, 197, 94)"
                              strokeWidth="2"
                            />

                            {/* Data points */}
                            {activeTimeline.aiInsights
                              .filter((insight) => insight.dayOffset <= currentDay)
                              .map((insight, i) => (
                                <circle
                                  key={i}
                                  cx={`${(insight.dayOffset / activeTimeline.totalDuration) * 100}%`}
                                  cy={`${100 - insight.confidence * 0.8}%`}
                                  r="4"
                                  fill="rgb(34, 197, 94)"
                                />
                              ))}
                          </svg>

                          {/* X-axis labels */}
                          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
                            {activeTimeline.aiInsights.map((insight, i) => (
                              <div
                                key={i}
                                className="absolute"
                                style={{
                                  left: `${(insight.dayOffset / activeTimeline.totalDuration) * 100}%`,
                                  transform: "translateX(-50%)",
                                  opacity: insight.dayOffset <= currentDay ? 1 : 0.3,
                                }}
                              >
                                Day {insight.dayOffset}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-10 text-gray-400">
                  No AI insights available yet. Move the timeline slider forward to see AI analysis.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="bg-gray-900 border border-green-900/40 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <div className="bg-yellow-900/20 p-2 rounded-full mt-1">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Understanding Genomic Evolution</h3>
            <p className="text-gray-400 text-sm">
              This visualization demonstrates how genomic insights evolve over time as more data becomes available and
              AI analysis improves. The interpretation of genetic variants can change significantly as new evidence
              emerges, clinical correlations are established, and AI algorithms become more sophisticated. This temporal
              dimension is crucial for understanding the dynamic nature of precision medicine.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
