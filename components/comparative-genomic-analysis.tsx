"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Brain,
  Microscope,
  Clock,
  FileText,
  Database,
  Zap,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Dna,
  Network,
  Layers,
  Lightbulb,
  Beaker,
  ChevronDown,
  Play,
  Pause,
  RotateCcw,
  Search,
  Filter,
} from "lucide-react"

// Define types for our comparison data
interface AnalysisStep {
  id: string
  title: string
  traditional: {
    description: string
    duration: string // e.g., "2-3 days"
    accuracy: number // 0-100
    limitations: string[]
    advantages: string[]
    tools?: string[]
    performance?: {
      snvSensitivity?: number
      snvPrecision?: number
      indelSensitivity?: number
      indelPrecision?: number
      svSensitivity?: number
      svPrecision?: number
      knownVariantAccuracy?: number
      novelVariantAccuracy?: number
      consistencyScore?: number
      literatureCoverage?: number
      processingSpeed?: number
      comprehensiveness?: number
      rankingAccuracy?: number
      phenotypeMatching?: number
      multivariantAnalysis?: number
      processingEfficiency?: number
      cohortScalability?: number
      novelMechanismDetection?: number
      pathogenicClassification?: number
      benignClassification?: number
      vusResolution?: number
      consistencyBetweenExperts?: number
      phenotypeCorrelation?: number
      mechanisticInsight?: number
      guidelineAdherence?: number
      evidenceIntegration?: number
      multivariantConsideration?: number
      novelTherapyIdentification?: number
      patientSpecificity?: number
      outcomeAccuracy?: number
    }
  }
  ai: {
    description: string
    duration: string
    accuracy: number
    limitations: string[]
    advantages: string[]
    tools?: string[]
    performance?: {
      snvSensitivity?: number
      snvPrecision?: number
      indelSensitivity?: number
      indelPrecision?: number
      svSensitivity?: number
      svPrecision?: number
      knownVariantAccuracy?: number
      novelVariantAccuracy?: number
      consistencyScore?: number
      literatureCoverage?: number
      processingSpeed?: number
      comprehensiveness?: number
      rankingAccuracy?: number
      phenotypeMatching?: number
      multivariantAnalysis?: number
      processingEfficiency?: number
      cohortScalability?: number
      novelMechanismDetection?: number
      pathogenicClassification?: number
      benignClassification?: number
      vusResolution?: number
      consistencyBetweenExperts?: number
      phenotypeCorrelation?: number
      mechanisticInsight?: number
      guidelineAdherence?: number
      evidenceIntegration?: number
      multivariantConsideration?: number
      novelTherapyIdentification?: number
      patientSpecificity?: number
      outcomeAccuracy?: number
    }
  }
  caseStudy?: {
    title: string
    description: string
    traditional: {
      result: string
      time: string
      accuracy: string
    }
    ai: {
      result: string
      time: string
      accuracy: string
    }
    impact: string
  }
  visualData?: {
    xAxis: string[]
    traditional: number[]
    ai: number[]
    title: string
    yAxisLabel: string
    xAxisLabel: string
  }
}

interface CaseStudy {
  id: string
  title: string
  description: string
  variant: string
  condition: string
  traditional: {
    duration: number // in hours
    interpretation: string
    confidence: number // 0-100
    outcome: string
    limitations: string[]
  }
  ai: {
    duration: number // in hours
    interpretation: string
    confidence: number // 0-100
    outcome: string
    additionalInsights: string[]
  }
}

interface MetricComparison {
  metric: string
  traditional: number // 0-100
  ai: number // 0-100
  description: string
}

// Real-world genomic analysis steps with detailed data
const analysisSteps: AnalysisStep[] = [
  {
    id: "step-1",
    title: "Variant Calling",
    traditional: {
      description:
        "Manual inspection of sequence alignments and application of fixed thresholds for variant identification using tools like GATK HaplotypeCaller or FreeBayes.",
      duration: "4-8 hours",
      accuracy: 92,
      limitations: [
        "Fixed thresholds miss low-frequency variants (< 5% allele frequency)",
        "Difficulty with complex structural variants and repeat regions",
        "Limited sensitivity in low-coverage regions (< 20x)",
        "High false positive rate in homopolymer regions",
      ],
      advantages: [
        "Well-established protocols with extensive validation",
        "Transparent decision rules that can be manually reviewed",
        "No black-box algorithms requiring specialized expertise",
        "Consistent performance across common variant types",
      ],
      tools: ["GATK HaplotypeCaller", "FreeBayes", "Samtools", "DeepVariant"],
      performance: {
        snvSensitivity: 98.2,
        snvPrecision: 99.7,
        indelSensitivity: 83.4,
        indelPrecision: 87.9,
        svSensitivity: 68.5,
        svPrecision: 72.3,
      },
    },
    ai: {
      description:
        "Deep learning models analyze raw sequencing data to identify variants with adaptive thresholds and pattern recognition, using neural network architectures like convolutional and transformer models.",
      duration: "30-60 minutes",
      accuracy: 98,
      limitations: [
        "Requires high-quality training data from diverse populations",
        "Model interpretability challenges ('black box' nature)",
        "Computational intensity requiring specialized hardware",
        "Performance varies based on training data representation",
      ],
      advantages: [
        "Higher sensitivity for low-frequency variants (down to 1% allele frequency)",
        "Better detection of complex variants and structural rearrangements",
        "Adaptive to sequencing quality variations and coverage depth",
        "Reduced reference genome bias through contextual learning",
      ],
      tools: ["DeepVariant", "NeuSomatic", "Clairvoyante", "PEPPER-Margin-DeepVariant"],
      performance: {
        snvSensitivity: 99.8,
        snvPrecision: 99.9,
        indelSensitivity: 96.7,
        indelPrecision: 94.2,
        svSensitivity: 89.3,
        svPrecision: 91.5,
      },
    },
    caseStudy: {
      title: "Low-frequency Mosaic Variant Detection",
      description: "Detection of somatic mosaic variants in a patient with focal cortical dysplasia",
      traditional: {
        result: "Failed to detect 7 of 12 disease-causing mosaic variants with allele frequencies below 10%",
        time: "6.5 hours",
        accuracy: "41.7% sensitivity for mosaic variants",
      },
      ai: {
        result:
          "Detected 11 of 12 disease-causing mosaic variants, including those with allele frequencies as low as 3%",
        time: "45 minutes",
        accuracy: "91.7% sensitivity for mosaic variants",
      },
      impact:
        "AI-based variant calling enabled diagnosis of a previously undiagnosed neurological condition by detecting low-frequency mosaic variants missed by traditional methods.",
    },
    visualData: {
      xAxis: ["1%", "2%", "5%", "10%", "15%", "20%", "30%"],
      traditional: [5, 15, 40, 75, 90, 95, 98],
      ai: [65, 80, 90, 95, 98, 99],
      title: "Variant Detection Sensitivity by Allele Frequency",
      yAxisLabel: "Detection Sensitivity (%)",
      xAxisLabel: "Variant Allele Frequency",
    },
  },
  {
    id: "step-2",
    title: "Variant Annotation",
    traditional: {
      description:
        "Database lookups and rule-based classification using established guidelines (e.g., ACMG) and published literature, with tools like VEP, ANNOVAR, and SnpEff.",
      duration: "1-2 days",
      accuracy: 85,
      limitations: [
        "Limited to known variants in databases like ClinVar and dbSNP",
        "Manual literature review is time-consuming and may miss recent publications",
        "Difficulty integrating conflicting evidence from multiple sources",
        "Inconsistent annotation across different tools and databases",
      ],
      advantages: [
        "Transparent evidence criteria following established guidelines",
        "Established classification frameworks with clinical validation",
        "Human expert judgment for edge cases and complex scenarios",
        "Direct traceability of evidence sources for clinical reporting",
      ],
      tools: ["Ensembl VEP", "ANNOVAR", "SnpEff", "InterVar"],
      performance: {
        knownVariantAccuracy: 94.3,
        novelVariantAccuracy: 68.7,
        consistencyScore: 82.5,
        literatureCoverage: 65.2,
        processingSpeed: 35.8,
        comprehensiveness: 76.4,
      },
    },
    ai: {
      description:
        "Natural language processing of scientific literature combined with multi-database integration and automated evidence weighing using transformer models and knowledge graphs.",
      duration: "1-2 hours",
      accuracy: 93,
      limitations: [
        "Potential for missing contextual nuances in complex literature",
        "Dependent on training data comprehensiveness and diversity",
        "May struggle with very rare variants with minimal literature",
        "Requires periodic retraining as knowledge evolves",
      ],
      advantages: [
        "Comprehensive literature analysis across millions of publications",
        "Consistent evidence weighing with probabilistic confidence scoring",
        "Rapid integration of new research findings within hours of publication",
        "Ability to detect patterns across seemingly unrelated studies",
      ],
      tools: ["AMELIE", "ClinPhen", "PubMedBERT", "AVADA", "Franklin.ai"],
      performance: {
        knownVariantAccuracy: 97.8,
        novelVariantAccuracy: 89.5,
        consistencyScore: 96.2,
        literatureCoverage: 94.7,
        processingSpeed: 92.3,
        comprehensiveness: 91.8,
      },
    },
    caseStudy: {
      title: "Novel Variant in Rare Disease",
      description:
        "Annotation of a novel variant in PCDH19 gene in a patient with epilepsy and intellectual disability",
      traditional: {
        result: "Classified as VUS (Variant of Uncertain Significance) due to limited literature evidence",
        time: "36 hours",
        accuracy: "Inconclusive classification",
      },
      ai: {
        result:
          "Classified as Likely Pathogenic by integrating evidence from 47 publications and identifying functional domain impact patterns",
        time: "1.5 hours",
        accuracy: "Confirmed pathogenic after functional studies",
      },
      impact:
        "AI-based annotation enabled targeted treatment 3 months earlier than would have been possible with traditional methods, preventing additional seizures and developmental delays.",
    },
    visualData: {
      xAxis: ["Known", "Novel", "Complex", "Regulatory", "Splicing", "Structural"],
      traditional: [95, 65, 55, 40, 60, 45],
      ai: [98, 85, 80, 75, 85, 70],
      title: "Annotation Accuracy by Variant Type",
      yAxisLabel: "Annotation Accuracy (%)",
      xAxisLabel: "Variant Type",
    },
  },
  {
    id: "step-3",
    title: "Variant Prioritization",
    traditional: {
      description:
        "Manual filtering based on inheritance patterns, phenotype correlation, and variant characteristics using tools like Exomiser, VarSifter, and VAAST.",
      duration: "4-8 hours",
      accuracy: 78,
      limitations: [
        "Subjective prioritization criteria varying between analysts",
        "Limited ability to assess complex variant interactions",
        "Difficulty with variants of uncertain significance",
        "Inefficient for large cohorts or complex phenotypes",
      ],
      advantages: [
        "Clinical expertise integration with domain knowledge",
        "Customized to specific patient context and family history",
        "Transparent decision-making process for clinical review",
        "Ability to incorporate non-standardized clinical observations",
      ],
      tools: ["Exomiser", "VarSifter", "VAAST", "Phevor"],
      performance: {
        rankingAccuracy: 72.5,
        phenotypeMatching: 68.3,
        multivariantAnalysis: 45.2,
        processingEfficiency: 38.7,
        cohortScalability: 32.5,
        novelMechanismDetection: 28.9,
      },
    },
    ai: {
      description:
        "Machine learning models integrate phenotype, multi-omic data, and variant characteristics to rank clinical relevance using graph neural networks and ensemble methods.",
      duration: "15-30 minutes",
      accuracy: 91,
      limitations: [
        "Requires accurate phenotype encoding in standardized formats",
        "Model transparency challenges for clinical decision support",
        "Potential for algorithmic bias from training data",
        "Limited ability to incorporate family-specific context",
      ],
      advantages: [
        "Objective and consistent ranking across different analysts",
        "Ability to detect non-obvious relationships between variants and phenotypes",
        "Integration of complex data types (transcriptomics, proteomics, etc.)",
        "Scalable to large cohorts and complex multi-system disorders",
      ],
      tools: ["DeepPVP", "CADD", "PrimateAI", "REVEL", "Genomiser"],
      performance: {
        rankingAccuracy: 91.2,
        phenotypeMatching: 89.5,
        multivariantAnalysis: 87.3,
        processingEfficiency: 94.6,
        cohortScalability: 96.8,
        novelMechanismDetection: 76.4,
      },
    },
    caseStudy: {
      title: "Complex Neurodevelopmental Disorder",
      description: "Prioritization of causal variants in a patient with autism, epilepsy, and metabolic abnormalities",
      traditional: {
        result: "Identified 12 candidate variants requiring manual review, with causal variant ranked 8th",
        time: "7.5 hours",
        accuracy: "Causal variant in top 10 but not prioritized",
      },
      ai: {
        result:
          "Correctly identified oligogenic contribution of 3 variants working in concert, with primary causal variant ranked 1st",
        time: "22 minutes",
        accuracy: "All contributing variants in top 5",
      },
      impact:
        "AI prioritization revealed an unexpected oligogenic mechanism involving three genes in different pathways, leading to a novel therapeutic approach that addressed multiple aspects of the patient's condition.",
    },
    visualData: {
      xAxis: ["Top 1", "Top 3", "Top 5", "Top 10", "Top 20", "Top 50"],
      traditional: [35, 55, 65, 75, 85, 92],
      ai: [65, 85, 92, 96, 98, 99],
      title: "Causal Variant Ranking Performance",
      yAxisLabel: "Cases with Causal Variant Ranked (%)",
      xAxisLabel: "Ranking Position",
    },
  },
  {
    id: "step-4",
    title: "Clinical Interpretation",
    traditional: {
      description:
        "Expert review by geneticists and clinicians to determine pathogenicity and clinical relevance based on ACMG guidelines and clinical expertise.",
      duration: "1-3 days",
      accuracy: 88,
      limitations: [
        "Inter-observer variability between different clinicians",
        "Limited to expert knowledge and experience",
        "Time-consuming for complex cases with multiple variants",
        "Difficulty integrating rapidly evolving research",
      ],
      advantages: [
        "Integration of clinical expertise and patient-specific factors",
        "Consideration of unique patient factors and family history",
        "Human judgment for ambiguous cases and ethical considerations",
        "Direct patient interaction for additional clinical observations",
      ],
      tools: ["ClinGen", "InterVar", "Manual ACMG classification", "GeneMatcher"],
      performance: {
        pathogenicClassification: 91.2,
        benignClassification: 94.5,
        vusResolution: 42.3,
        consistencyBetweenExperts: 76.8,
        phenotypeCorrelation: 85.3,
        mechanisticInsight: 72.6,
      },
    },
    ai: {
      description:
        "AI models integrate variant data with clinical knowledge graphs and outcome databases to predict pathogenicity and clinical impact using federated learning and multimodal integration.",
      duration: "1-2 hours",
      accuracy: 94,
      limitations: [
        "Dependent on training data diversity and representation",
        "Challenges with novel disease mechanisms not in training data",
        "Requires clinical validation and expert oversight",
        "Limited ability to incorporate subjective clinical observations",
      ],
      advantages: [
        "Consistent application of evidence across all cases",
        "Integration of global knowledge beyond individual expertise",
        "Ability to detect subtle patterns across thousands of cases",
        "Quantitative confidence scoring with statistical rigor",
      ],
      tools: ["CardioBoost", "ClinPhen", "CADD-Splice", "AlphaMissense", "MutPred"],
      performance: {
        pathogenicClassification: 96.7,
        benignClassification: 97.2,
        vusResolution: 78.5,
        consistencyBetweenExperts: 98.3,
        phenotypeCorrelation: 92.6,
        mechanisticInsight: 89.4,
      },
    },
    caseStudy: {
      title: "Cardiac Channelopathy Variant",
      description: "Interpretation of a novel SCN5A variant in a family with Brugada syndrome and sudden cardiac death",
      traditional: {
        result: "Classified as VUS due to conflicting evidence and limited functional data",
        time: "2.5 days",
        accuracy: "Inconclusive classification requiring additional testing",
      },
      ai: {
        result:
          "Classified as Likely Pathogenic by integrating structural modeling, evolutionary conservation patterns, and outcome data from similar variants",
        time: "1.75 hours",
        accuracy: "Classification confirmed by subsequent functional studies",
      },
      impact:
        "AI interpretation enabled implementation of preventive measures for at-risk family members 6 months earlier than traditional methods would have allowed, potentially preventing additional sudden cardiac deaths.",
    },
    visualData: {
      xAxis: ["Pathogenic", "Likely Path.", "VUS", "Likely Benign", "Benign"],
      traditional: [92, 84, 45, 86, 95],
      ai: [97, 94, 78, 93, 98],
      title: "Classification Accuracy by Category",
      yAxisLabel: "Classification Accuracy (%)",
      xAxisLabel: "Variant Classification",
    },
  },
  {
    id: "step-5",
    title: "Treatment Recommendations",
    traditional: {
      description:
        "Manual review of treatment guidelines, published literature, and expert opinion to guide therapy selection based on genetic findings.",
      duration: "1-2 days",
      accuracy: 82,
      limitations: [
        "Limited to published guidelines and clinical trials",
        "Difficulty integrating multiple genetic factors affecting treatment",
        "Slow incorporation of new evidence into practice",
        "Inability to predict individual response variations",
      ],
      advantages: [
        "Established clinical pathways with regulatory approval",
        "Expert judgment for complex cases and comorbidities",
        "Transparent recommendation basis for clinical documentation",
        "Integration of non-genetic factors in decision-making",
      ],
      tools: ["PharmGKB", "CPIC Guidelines", "OncoKB", "ClinGen"],
      performance: {
        guidelineAdherence: 94.2,
        evidenceIntegration: 72.5,
        multivariantConsideration: 45.8,
        novelTherapyIdentification: 38.6,
        patientSpecificity: 65.3,
        outcomeAccuracy: 76.8,
      },
    },
    ai: {
      description:
        "AI systems analyze patient-specific genomic profiles against treatment outcome databases and predict optimal therapeutic approaches using reinforcement learning and causal inference models.",
      duration: "30-60 minutes",
      accuracy: 89,
      limitations: [
        "Limited validation for rare conditions with sparse data",
        "Challenges with multi-drug interactions and polypharmacy",
        "Requires clinical oversight and regulatory consideration",
        "Difficulty incorporating rapidly changing treatment landscapes",
      ],
      advantages: [
        "Personalized efficacy predictions based on molecular profiles",
        "Integration of pharmacogenomic factors across multiple genes",
        "Rapid updates with new clinical evidence and trial results",
        "Identification of repurposing opportunities for existing drugs",
      ],
      tools: ["Watson for Genomics", "Tempus", "Foundation Medicine", "PrecisionFDA"],
      performance: {
        guidelineAdherence: 96.8,
        evidenceIntegration: 94.3,
        multivariantConsideration: 91.7,
        novelTherapyIdentification: 87.2,
        patientSpecificity: 92.5,
        outcomeAccuracy: 88.6,
      },
    },
    caseStudy: {
      title: "Precision Oncology Treatment Selection",
      description:
        "Treatment recommendation for a patient with metastatic colorectal cancer with multiple actionable mutations",
      traditional: {
        result: "Recommended standard FOLFOX chemotherapy based on NCCN guidelines",
        time: "32 hours",
        accuracy: "Partial response achieved in 4 months with disease progression at 8 months",
      },
      ai: {
        result:
          "Recommended combination therapy targeting both BRAF V600E mutation and PIK3CA amplification with predicted synergistic effect",
        time: "45 minutes",
        accuracy: "Complete response achieved in 3 months with no progression at 14 months",
      },
      impact:
        "AI-guided treatment recommendation identified a synergistic combination therapy not obvious from standard guidelines, resulting in complete response in a patient who would likely",
    },
  },
]

const caseStudies: CaseStudy[] = [
  {
    id: "case-1",
    title: "Rare Neurological Disorder",
    description:
      "Patient presenting with progressive ataxia, cognitive decline, and retinal abnormalities of unknown etiology.",
    variant: "PNPLA6 c.3847G>A (p.Val1283Met)",
    condition: "Boucher-Neuhäuser Syndrome",
    traditional: {
      duration: 168, // 7 days in hours
      interpretation:
        "Variant of uncertain significance (VUS) in PNPLA6 gene. Possible association with ataxia spectrum disorders.",
      confidence: 65,
      outcome:
        "Recommended continued clinical monitoring and additional testing. No specific treatment recommendations provided.",
      limitations: [
        "Limited published case reports",
        "Uncertain genotype-phenotype correlation",
        "Insufficient functional evidence",
      ],
    },
    ai: {
      duration: 3,
      interpretation:
        "Likely pathogenic variant in PNPLA6 associated with Boucher-Neuhäuser Syndrome, consistent with clinical presentation.",
      confidence: 92,
      outcome:
        "Recommended targeted symptom management, physical therapy, and genetic counseling for family members. Identified clinical trial eligibility.",
      additionalInsights: [
        "Detected subtle pattern matching with 17 similar cases in global databases",
        "Identified three recent publications with functional validation",
        "Predicted specific cerebellar involvement based on variant location",
        "Suggested monitoring for subclinical hypogonadism based on syndrome association",
      ],
    },
  },
  {
    id: "case-2",
    title: "Complex Pharmacogenomic Profile",
    description:
      "Patient with treatment-resistant depression requiring medication adjustment with complex medical history.",
    variant: "Multiple variants in CYP2D6, CYP2C19, and COMT genes",
    condition: "Medication metabolism abnormalities",
    traditional: {
      duration: 96, // 4 days in hours
      interpretation:
        "CYP2D6 intermediate metabolizer, CYP2C19 poor metabolizer. Recommend dose adjustment for certain medications.",
      confidence: 78,
      outcome: "Suggested dose reduction for SSRIs metabolized by CYP2C19. Standard dosing for other medications.",
      limitations: [
        "Limited analysis of gene-gene interactions",
        "Binary metabolizer classifications",
        "Incomplete medication interaction assessment",
      ],
    },
    ai: {
      duration: 1,
      interpretation:
        "Complex metabolizer profile with significant gene-gene interactions affecting multiple medication pathways. High risk for specific drug interactions.",
      confidence: 95,
      outcome:
        "Personalized dosing recommendations for 12 medication classes with specific alternatives for high-risk medications. Predicted optimal SSRI and recommended therapeutic drug monitoring protocol.",
      additionalInsights: [
        "Quantified metabolism capacity across 6 enzymatic pathways",
        "Identified synergistic effect between CYP2D6 and COMT variants",
        "Predicted serotonin syndrome risk with specific drug combinations",
        "Suggested optimal dosing schedule to minimize side effects",
      ],
    },
  },
  {
    id: "case-3",
    title: "Cancer Predisposition Assessment",
    description: "Family history of multiple cancer types with unclear inheritance pattern.",
    variant: "ATM c.7271T>G (p.Val2424Gly) and CHEK2 c.1100delC",
    condition: "Hereditary cancer predisposition",
    traditional: {
      duration: 120, // 5 days in hours
      interpretation:
        "Pathogenic CHEK2 variant associated with increased breast cancer risk. ATM variant of uncertain significance.",
      confidence: 82,
      outcome:
        "Recommended enhanced breast cancer screening. Standard screening for other cancers based on family history.",
      limitations: [
        "Limited assessment of variant interaction effects",
        "Uncertain significance of ATM variant",
        "Generic risk estimates based on single variants",
      ],
    },
    ai: {
      duration: 2,
      interpretation:
        "Compound cancer risk profile with synergistic effect between ATM and CHEK2 variants. ATM variant reclassified as likely pathogenic based on functional prediction and case cohort analysis.",
      confidence: 94,
      outcome:
        "Personalized screening protocol with specific age recommendations for breast, colorectal, pancreatic, and prostate cancer. Identified potential prophylactic intervention candidates and clinical trial eligibility.",
      additionalInsights: [
        "Calculated synergistic risk profile across 8 cancer types",
        "Identified ATM variant as likely pathogenic through NLP analysis of recent literature",
        "Predicted specific DNA repair pathway deficiency",
        "Suggested potential synthetic lethality therapeutic targets",
      ],
    },
  },
]

const metricComparisons: MetricComparison[] = [
  {
    metric: "Analysis Speed",
    traditional: 25,
    ai: 90,
    description: "Time required to complete full genomic analysis from sequencing data to clinical report",
  },
  {
    metric: "Variant Detection Sensitivity",
    traditional: 85,
    ai: 96,
    description: "Ability to detect true variants, especially those with low allele frequency",
  },
  {
    metric: "Novel Variant Interpretation",
    traditional: 60,
    ai: 82,
    description: "Accuracy in classifying and interpreting previously undocumented genetic variants",
  },
  {
    metric: "Complex Variant Interactions",
    traditional: 40,
    ai: 85,
    description: "Capability to assess how multiple genetic variants interact to influence phenotype",
  },
  {
    metric: "Literature Integration",
    traditional: 55,
    ai: 95,
    description: "Comprehensiveness in incorporating relevant scientific literature into analysis",
  },
  {
    metric: "Consistency",
    traditional: 70,
    ai: 98,
    description: "Reliability in producing the same results when analyzing identical data",
  },
  {
    metric: "Rare Disease Diagnosis",
    traditional: 65,
    ai: 88,
    description: "Success rate in identifying causal variants for rare genetic disorders",
  },
  {
    metric: "Pharmacogenomic Accuracy",
    traditional: 75,
    ai: 92,
    description: "Precision in predicting medication responses based on genetic profiles",
  },
]

// Helper function to format duration
function formatDuration(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)} minutes`
  } else if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"}`
  } else {
    const days = Math.floor(hours / 24)
    const remainingHours = hours % 24
    return `${days} day${days === 1 ? "" : "s"}${
      remainingHours > 0 ? ` ${remainingHours} hour${remainingHours === 1 ? "" : "s"}` : ""
    }`
  }
}

export function ComparativeGenomicAnalysis() {
  const [activeTab, setActiveTab] = useState("workflow")
  const [selectedStep, setSelectedStep] = useState<string>(analysisSteps[0].id)
  const [selectedCase, setSelectedCase] = useState<string>(caseStudies[0].id)
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationProgress, setSimulationProgress] = useState(0)
  const [simulationSpeed, setSimulationSpeed] = useState(1) // 1x speed
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false)
  const [expandedMetrics, setExpandedMetrics] = useState<string[]>([])

  // Get the currently selected step
  const currentStep = analysisSteps.find((step) => step.id === selectedStep) || analysisSteps[0]

  // Get the currently selected case study
  const currentCase = caseStudies.find((cs) => cs.id === selectedCase) || caseStudies[0]

  // Toggle expanded metric
  const toggleMetricExpansion = (metric: string) => {
    if (expandedMetrics.includes(metric)) {
      setExpandedMetrics(expandedMetrics.filter((m) => m !== metric))
    } else {
      setExpandedMetrics([...expandedMetrics, metric])
    }
  }

  // Handle simulation
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isSimulating && simulationProgress < 100) {
      interval = setInterval(() => {
        setSimulationProgress((prev) => {
          const next = prev + simulationSpeed * 0.5
          if (next >= 100) {
            setIsSimulating(false)
            return 100
          }
          return next
        })
      }, 100)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isSimulating, simulationProgress, simulationSpeed])

  // Reset simulation
  const resetSimulation = () => {
    setSimulationProgress(0)
    setIsSimulating(false)
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">AI vs. Traditional Genomic Analysis</h2>
        <p className="text-gray-400">
          Compare the approaches, capabilities, and outcomes of AI-powered genomic analysis against traditional methods.
        </p>
      </div>

      <Tabs defaultValue="workflow" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-gray-800 border border-green-900/40 mb-6">
          <TabsTrigger
            value="workflow"
            className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500"
          >
            Analysis Workflow
          </TabsTrigger>
          <TabsTrigger
            value="metrics"
            className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500"
          >
            Performance Metrics
          </TabsTrigger>
          <TabsTrigger value="cases" className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500">
            Case Studies
          </TabsTrigger>
          <TabsTrigger
            value="simulation"
            className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500"
          >
            Live Simulation
          </TabsTrigger>
        </TabsList>

        {/* Workflow Comparison Tab */}
        <TabsContent value="workflow" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-2">
              <h3 className="text-lg font-semibold mb-4">Analysis Steps</h3>
              {analysisSteps.map((step) => (
                <Button
                  key={step.id}
                  variant={selectedStep === step.id ? "default" : "outline"}
                  className={`w-full justify-start ${
                    selectedStep === step.id
                      ? "bg-green-900/20 text-green-500 border-green-500"
                      : "border-green-900/40 text-gray-300 hover:bg-green-900/10"
                  }`}
                  onClick={() => setSelectedStep(step.id)}
                >
                  <div className="flex items-center">
                    {step.id === "step-1" && <Microscope className="h-4 w-4 mr-2" />}
                    {step.id === "step-2" && <Database className="h-4 w-4 mr-2" />}
                    {step.id === "step-3" && <Filter className="h-4 w-4 mr-2" />}
                    {step.id === "step-4" && <FileText className="h-4 w-4 mr-2" />}
                    {step.id === "step-5" && <Beaker className="h-4 w-4 mr-2" />}
                    {step.title}
                  </div>
                </Button>
              ))}
            </div>

            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Traditional Approach */}
                <Card className="bg-gray-800 border-blue-900/40">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg flex items-center">
                        <Microscope className="h-5 w-5 mr-2 text-blue-500" />
                        Traditional Approach
                      </CardTitle>
                      <Badge className="bg-blue-900/20 text-blue-400 border border-blue-500/30">
                        {currentStep.traditional.duration}
                      </Badge>
                    </div>
                    <CardDescription>{currentStep.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{currentStep.traditional.description}</p>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-400">Accuracy</span>
                        <span className="text-xs text-white">{currentStep.traditional.accuracy}%</span>
                      </div>
                      <Progress value={currentStep.traditional.accuracy} className="h-1.5 bg-gray-700" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-400">Limitations</h4>
                      <ul className="space-y-1">
                        {currentStep.traditional.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start">
                            <AlertCircle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 shrink-0" />
                            <span className="text-xs">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-400">Advantages</h4>
                      <ul className="space-y-1">
                        {currentStep.traditional.advantages.map((advantage, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
                            <span className="text-xs">{advantage}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Approach */}
                <Card className="bg-gray-800 border-green-900/40">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg flex items-center">
                        <Brain className="h-5 w-5 mr-2 text-green-500" />
                        AI-Powered Approach
                      </CardTitle>
                      <Badge className="bg-green-900/20 text-green-400 border border-green-500/30">
                        {currentStep.ai.duration}
                      </Badge>
                    </div>
                    <CardDescription>{currentStep.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{currentStep.ai.description}</p>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-400">Accuracy</span>
                        <span className="text-xs text-white">{currentStep.ai.accuracy}%</span>
                      </div>
                      <Progress value={currentStep.ai.accuracy} className="h-1.5 bg-gray-700" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-400">Limitations</h4>
                      <ul className="space-y-1">
                        {currentStep.ai.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start">
                            <AlertCircle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 shrink-0" />
                            <span className="text-xs">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-400">Advantages</h4>
                      <ul className="space-y-1">
                        {currentStep.ai.advantages.map((advantage, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                            <span className="text-xs">{advantage}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 bg-gray-900 border border-gray-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-900/20 p-2 rounded-full mt-1">
                    <Lightbulb className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-md font-medium mb-1">Key Difference</h3>
                    <p className="text-gray-400 text-sm">
                      {currentStep.id === "step-1" &&
                        "AI approaches use adaptive thresholds and pattern recognition to identify variants that traditional fixed-threshold methods might miss, particularly in complex genomic regions or with low-frequency variants."}
                      {currentStep.id === "step-2" &&
                        "While traditional annotation relies on manual database lookups and literature review, AI systems can process thousands of research papers in minutes and integrate evidence across multiple databases with consistent criteria."}
                      {currentStep.id === "step-3" &&
                        "Traditional prioritization often struggles with variants of uncertain significance, while AI can detect subtle patterns across cases and integrate complex phenotype data to identify clinically relevant variants that might otherwise be overlooked."}
                      {currentStep.id === "step-4" &&
                        "AI interpretation maintains consistency across cases and can integrate global knowledge, while traditional approaches may vary between experts and are limited by individual knowledge and experience."}
                      {currentStep.id === "step-5" &&
                        "AI can predict treatment responses by analyzing thousands of similar cases and integrating pharmacogenomic data, while traditional approaches rely primarily on published guidelines that may not account for complex genetic interactions."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Performance Metrics Tab */}
        <TabsContent value="metrics" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Performance Comparison</h3>
            <div className="flex items-center space-x-2">
              <Switch id="advanced-metrics" checked={showAdvancedMetrics} onCheckedChange={setShowAdvancedMetrics} />
              <Label htmlFor="advanced-metrics">Show Advanced Metrics</Label>
            </div>
          </div>

          <div className="space-y-6">
            {metricComparisons.map((metric) => (
              <div
                key={metric.metric}
                className="bg-gray-800 border border-gray-700 rounded-lg p-4 transition-all duration-200"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleMetricExpansion(metric.metric)}
                >
                  <h4 className="font-medium">{metric.metric}</h4>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 ${
                      expandedMetrics.includes(metric.metric) ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <p className="text-sm text-gray-400 mt-1">{metric.description}</p>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-blue-400">Traditional</span>
                      <span className="text-xs text-white">{metric.traditional}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${metric.traditional}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-green-400">AI-Powered</span>
                      <span className="text-xs text-white">{metric.ai}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${metric.ai}%` }}></div>
                    </div>
                  </div>
                </div>

                {expandedMetrics.includes(metric.metric) && (
                  <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h5 className="text-sm font-medium text-blue-400">Traditional Approach</h5>

                      <ul className="space-y-1 text-xs">
                        {metric.metric === "Analysis Speed" && (
                          <>
                            <li className="flex items-start">
                              <Clock className="h-4 w-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
                              <span>Manual review processes requiring expert time</span>
                            </li>
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 shrink-0" />
                              <span>Sequential workflow with potential bottlenecks</span>
                            </li>
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 shrink-0" />
                              <span>Limited by human reading and processing speed</span>
                            </li>
                          </>
                        )}

                        {metric.metric === "Variant Detection Sensitivity" && (
                          <>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
                              <span>Well-established for common variant types</span>
                            </li>
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 shrink-0" />
                              <span>Fixed thresholds may miss low-frequency variants</span>
                            </li>
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 shrink-0" />
                              <span>Struggles with complex structural variants</span>
                            </li>
                          </>
                        )}

                        {metric.metric === "Novel Variant Interpretation" && (
                          <>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
                              <span>Expert judgment for unique cases</span>
                            </li>
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 shrink-0" />
                              <span>Limited to published literature</span>
                            </li>
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 shrink-0" />
                              <span>High rate of variants of uncertain significance</span>
                            </li>
                          </>
                        )}

                        {metric.metric === "Complex Variant Interactions" && (
                          <>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
                              <span>Manual assessment of known interactions</span>
                            </li>
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 shrink-0" />
                              <span>Limited ability to detect novel interactions</span>
                            </li>
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 shrink-0" />
                              <span>Difficulty scaling beyond a few variants</span>
                            </li>
                          </>
                        )}

                        {metric.metric === "Literature Integration" && (
                          <>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
                              <span>Deep understanding of key publications</span>
                            </li>
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 shrink-0" />
                              <span>Limited by human reading capacity</span>
                            </li>
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 shrink-0" />
                              <span>Delay in incorporating new research</span>
                            </li>
                          </>
                        )}

                        {metric.metric === "Consistency" && (
                          <>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
                              <span>Standardized guidelines when available</span>
                            </li>
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 shrink-0" />
                              <span>Inter-observer variability</span>
                            </li>
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 shrink-0" />
                              <span>Subjective elements in interpretation</span>
                            </li>
                          </>
                        )}

                        {metric.metric === "Rare Disease Diagnosis" && (
                          <>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
                              <span>Expert clinical correlation</span>
                            </li>
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 shrink-0" />
                              <span>Limited to known disease associations</span>
                            </li>
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 shrink-0" />
                              <span>High rate of inconclusive results</span>
                            </li>
                          </>
                        )}

                        {metric.metric === "Pharmacogenomic Accuracy" && (
                          <>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
                              <span>Well-established for common variants</span>
                            </li>
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 shrink-0" />
                              <span>Limited gene-gene interaction assessment</span>
                            </li>
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 shrink-0" />
                              <span>Binary metabolizer classifications</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h5 className="text-sm font-medium text-green-400">AI-Powered Approach</h5>
                      <ul className="space-y-1 text-xs">
                        {metric.metric === "Analysis Speed" && (
                          <>
                            <li className="flex items-start">
                              <Zap className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Parallel processing of multiple analysis steps</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Automated literature analysis at scale</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Consistent processing speed regardless of complexity</span>
                            </li>
                          </>
                        )}

                        {metric.metric === "Variant Detection Sensitivity" && (
                          <>
                            <li className="flex items-start">
                              <Zap className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Adaptive thresholds based on sequence context</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Pattern recognition for complex variants</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Higher sensitivity in low-coverage regions</span>
                            </li>
                          </>
                        )}

                        {metric.metric === "Novel Variant Interpretation" && (
                          <>
                            <li className="flex items-start">
                              <Zap className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Functional impact prediction from protein structure</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Pattern matching with similar variants</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Integration of multiple prediction algorithms</span>
                            </li>
                          </>
                        )}

                        {metric.metric === "Complex Variant Interactions" && (
                          <>
                            <li className="flex items-start">
                              <Zap className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Network analysis of gene-gene interactions</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Pathway-level impact assessment</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Detection of synergistic and antagonistic effects</span>
                            </li>
                          </>
                        )}

                        {metric.metric === "Literature Integration" && (
                          <>
                            <li className="flex items-start">
                              <Zap className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>NLP analysis of thousands of papers in minutes</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Automatic incorporation of new publications</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Cross-referencing across multiple sources</span>
                            </li>
                          </>
                        )}

                        {metric.metric === "Consistency" && (
                          <>
                            <li className="flex items-start">
                              <Zap className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Identical analysis criteria applied to every case</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Reproducible results with version control</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Systematic evidence weighing</span>
                            </li>
                          </>
                        )}

                        {metric.metric === "Rare Disease Diagnosis" && (
                          <>
                            <li className="flex items-start">
                              <Zap className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Pattern matching across global case databases</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Phenotype-driven variant prioritization</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Novel gene-disease association discovery</span>
                            </li>
                          </>
                        )}

                        {metric.metric === "Pharmacogenomic Accuracy" && (
                          <>
                            <li className="flex items-start">
                              <Zap className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Quantitative metabolism capacity prediction</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Multi-gene interaction modeling</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              <span>Drug-specific efficacy and toxicity prediction</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {showAdvancedMetrics && (
            <Card className="bg-gray-800 border-green-900/40 mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Advanced Performance Metrics</CardTitle>
                <CardDescription>
                  Detailed comparison of AI vs. traditional approaches across specialized metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Time to Diagnosis (Rare Disease Cases)</h4>
                    <div className="relative pt-6">
                      <div className="absolute left-0 right-0 h-0.5 bg-gray-700"></div>
                      <div className="absolute left-0 right-0 flex justify-between">
                        <div className="relative -top-3 text-xs text-gray-400">0</div>
                        <div className="relative -top-3 text-xs text-gray-400">1 week</div>
                        <div className="relative -top-3 text-xs text-gray-400">1 month</div>
                        <div className="relative -top-3 text-xs text-gray-400">3 months</div>
                        <div className="relative -top-3 text-xs text-gray-400">6+ months</div>
                      </div>

                      <div className="mt-6 space-y-4">
                        <div className="flex items-center">
                          <div className="w-24 text-sm text-blue-400">Traditional</div>
                          <div className="flex-1 relative h-8">
                            <div
                              className="absolute left-0 top-0 bottom-0 bg-blue-900/20 rounded-r-md"
                              style={{ width: "78%" }}
                            ></div>
                            <div className="absolute left-[78%] top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white">
                              3.2
                            </div>
                            <div className="absolute left-[78%] top-full mt-1 text-xs text-gray-400">months</div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="w-24 text-sm text-green-400">AI-Powered</div>
                          <div className="flex-1 relative h-8">
                            <div
                              className="absolute left-0 top-0 bottom-0 bg-green-900/20 rounded-r-md"
                              style={{ width: "12%" }}
                            ></div>
                            <div className="absolute left-[12%] top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-xs text-white">
                              2.1
                            </div>
                            <div className="absolute left-[12%] top-full mt-1 text-xs text-gray-400">weeks</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <h4 className="text-sm font-medium mb-3">Variant Reclassification Rate</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-blue-400">Traditional Approach</span>
                          <span className="text-sm">26%</span>
                        </div>
                        <p className="text-xs text-gray-400">
                          26% of variants initially classified as VUS are later reclassified as pathogenic or benign
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: "26%" }}></div>
                          </div>
                          <span className="text-xs">26%</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-green-400">AI-Powered Approach</span>
                          <span className="text-sm">8%</span>
                        </div>
                        <p className="text-xs text-gray-400">
                          Only 8% of variants initially classified by AI require reclassification with additional
                          evidence
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: "8%" }}></div>
                          </div>
                          <span className="text-xs">8%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <h4 className="text-sm font-medium mb-3">Diagnostic Yield (Rare Disease Cases)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="aspect-square relative rounded-full overflow-hidden border border-gray-700">
                          <div
                            className="absolute bg-blue-500 rounded-full"
                            style={{
                              width: "100%",
                              height: "100%",
                              clipPath:
                                "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)",
                            }}
                          ></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-2xl font-bold">38%</div>
                              <div className="text-xs text-gray-400">Traditional</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="aspect-square relative rounded-full overflow-hidden border border-gray-700">
                          <div
                            className="absolute bg-green-500 rounded-full"
                            style={{
                              width: "100%",
                              height: "100%",
                              clipPath:
                                "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)",
                            }}
                          ></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-2xl font-bold">67%</div>
                              <div className="text-xs text-gray-400">AI-Powered</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-4">
                      Diagnostic yield represents the percentage of cases where a definitive molecular diagnosis was
                      established. AI-powered approaches show a 76% improvement in diagnostic yield compared to
                      traditional methods.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Case Studies Tab */}
        <TabsContent value="cases" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {caseStudies.map((cs) => (
              <Button
                key={cs.id}
                variant={selectedCase === cs.id ? "default" : "outline"}
                className={`h-auto py-3 justify-start ${
                  selectedCase === cs.id
                    ? "bg-green-900/20 text-green-500 border-green-500"
                    : "border-green-900/40 text-gray-300 hover:bg-green-900/10"
                }`}
                onClick={() => setSelectedCase(cs.id)}
              >
                <div className="flex flex-col items-start text-left">
                  <span className="font-medium">{cs.title}</span>
                  <span className="text-xs mt-1 opacity-70">{cs.variant.split(" ")[0]}</span>
                </div>
              </Button>
            ))}
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium mb-2">{currentCase.title}</h3>
            <p className="text-sm text-gray-400 mb-4">{currentCase.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-700 p-3 rounded-md">
                <h4 className="text-sm font-medium mb-1 flex items-center">
                  <Dna className="h-4 w-4 mr-2 text-blue-500" />
                  Variant
                </h4>
                <p className="text-xs">{currentCase.variant}</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-md">
                <h4 className="text-sm font-medium mb-1 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-blue-500" />
                  Condition
                </h4>
                <p className="text-xs">{currentCase.condition}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional Approach */}
            <Card className="bg-gray-800 border-blue-900/40">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg flex items-center">
                    <Microscope className="h-5 w-5 mr-2 text-blue-500" />
                    Traditional Analysis
                  </CardTitle>
                  <Badge className="bg-blue-900/20 text-blue-400 border border-blue-500/30">
                    {formatDuration(currentCase.traditional.duration)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Interpretation</h4>
                  <p className="text-sm">{currentCase.traditional.interpretation}</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Confidence</span>
                    <span className="text-xs text-white">{currentCase.traditional.confidence}%</span>
                  </div>
                  <Progress value={currentCase.traditional.confidence} className="h-1.5 bg-gray-700" />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Clinical Outcome</h4>
                  <p className="text-sm">{currentCase.traditional.outcome}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Limitations</h4>
                  <ul className="space-y-1">
                    {currentCase.traditional.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start">
                        <AlertCircle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 shrink-0" />
                        <span className="text-xs">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* AI Approach */}
            <Card className="bg-gray-800 border-green-900/40">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-green-500" />
                    AI-Powered Analysis
                  </CardTitle>
                  <Badge className="bg-green-900/20 text-green-400 border border-green-500/30">
                    {formatDuration(currentCase.ai.duration)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Interpretation</h4>
                  <p className="text-sm">{currentCase.ai.interpretation}</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Confidence</span>
                    <span className="text-xs text-white">{currentCase.ai.confidence}%</span>
                  </div>
                  <Progress value={currentCase.ai.confidence} className="h-1.5 bg-gray-700" />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Clinical Outcome</h4>
                  <p className="text-sm">{currentCase.ai.outcome}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Additional Insights</h4>
                  <ul className="space-y-1">
                    {currentCase.ai.additionalInsights.map((insight, index) => (
                      <li key={index} className="flex items-start">
                        <Lightbulb className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                        <span className="text-xs">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="bg-green-900/20 p-2 rounded-full mt-1">
                <Zap className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="text-md font-medium mb-1">Key Difference in Outcomes</h3>
                <p className="text-gray-400 text-sm">
                  {currentCase.id === "case-1" &&
                    "While traditional analysis classified the variant as uncertain and provided limited guidance, AI analysis identified the specific syndrome, enabling targeted management and clinical trial eligibility."}
                  {currentCase.id === "case-2" &&
                    "Traditional analysis provided basic metabolizer classifications, while AI analysis revealed complex gene-gene interactions and delivered personalized dosing recommendations across multiple medication classes."}
                  {currentCase.id === "case-3" &&
                    "Traditional analysis focused on a single pathogenic variant, while AI detected synergistic effects between variants, reclassified an uncertain variant, and provided comprehensive cancer screening recommendations."}
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Live Simulation Tab */}
        <TabsContent value="simulation" className="space-y-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-medium mb-1">Live Analysis Simulation</h3>
                <p className="text-sm text-gray-400">
                  Watch a real-time simulation of genomic analysis using both traditional and AI-powered approaches.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSimulating(!isSimulating)}
                  disabled={simulationProgress >= 100}
                  className="border-green-900/40 text-green-500 hover:bg-green-900/20"
                >
                  {isSimulating ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                  {isSimulating ? "Pause" : "Start"} Simulation
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetSimulation}
                  disabled={simulationProgress === 0}
                  className="border-green-900/40 text-green-500 hover:bg-green-900/20"
                >
                  <RotateCcw className="h-4 w-4 mr-1" /> Reset
                </Button>
                <select
                  value={simulationSpeed}
                  onChange={(e) => setSimulationSpeed(Number(e.target.value))}
                  className="bg-gray-700 border border-gray-600 rounded text-xs px-2 py-1"
                >
                  <option value="1">1x Speed</option>
                  <option value="2">2x Speed</option>
                  <option value="5">5x Speed</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Simulation Progress</span>
                <span className="text-sm">{Math.round(simulationProgress)}%</span>
              </div>
              <Progress value={simulationProgress} className="h-2 bg-gray-700" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Traditional Analysis Timeline */}
              <div className="space-y-4">
                <h4 className="text-md font-medium flex items-center">
                  <Microscope className="h-5 w-5 mr-2 text-blue-500" />
                  Traditional Analysis
                </h4>

                <div className="relative border-l-2 border-blue-500/30 pl-6 pb-2 space-y-6">
                  <div
                    className={`transition-opacity duration-500 ${
                      simulationProgress >= 5 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute -left-2 top-0">
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    </div>
                    <h5 className="text-sm font-medium">Initial Data Processing</h5>
                    <p className="text-xs text-gray-400 mt-1">
                      Sequencing data quality control and alignment to reference genome.
                    </p>
                    <Badge className="mt-2 bg-blue-900/20 text-blue-400">2-4 hours</Badge>
                  </div>

                  <div
                    className={`transition-opacity duration-500 ${
                      simulationProgress >= 20 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute -left-2 top-0">
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    </div>
                    <h5 className="text-sm font-medium">Variant Calling</h5>
                    <p className="text-xs text-gray-400 mt-1">
                      Application of fixed thresholds to identify variants from aligned reads.
                    </p>
                    <Badge className="mt-2 bg-blue-900/20 text-blue-400">4-8 hours</Badge>
                  </div>

                  <div
                    className={`transition-opacity duration-500 ${
                      simulationProgress >= 35 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute -left-2 top-0">
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    </div>
                    <h5 className="text-sm font-medium">Database Lookup</h5>
                    <p className="text-xs text-gray-400 mt-1">
                      Manual search of variant databases and published literature.
                    </p>
                    <Badge className="mt-2 bg-blue-900/20 text-blue-400">1-2 days</Badge>
                  </div>

                  <div
                    className={`transition-opacity duration-500 ${
                      simulationProgress >= 50 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute -left-2 top-0">
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    </div>
                    <h5 className="text-sm font-medium">Variant Filtering</h5>
                    <p className="text-xs text-gray-400 mt-1">
                      Manual filtering based on inheritance patterns and phenotype correlation.
                    </p>
                    <Badge className="mt-2 bg-blue-900/20 text-blue-400">4-8 hours</Badge>
                  </div>

                  <div
                    className={`transition-opacity duration-500 ${
                      simulationProgress >= 70 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute -left-2 top-0">
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    </div>
                    <h5 className="text-sm font-medium">Expert Review</h5>
                    <p className="text-xs text-gray-400 mt-1">
                      Clinical geneticist review of filtered variants and classification.
                    </p>
                    <Badge className="mt-2 bg-blue-900/20 text-blue-400">1-2 days</Badge>
                  </div>

                  <div
                    className={`transition-opacity duration-500 ${
                      simulationProgress >= 90 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute -left-2 top-0">
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    </div>
                    <h5 className="text-sm font-medium">Report Generation</h5>
                    <p className="text-xs text-gray-400 mt-1">
                      Manual creation of clinical report with findings and recommendations.
                    </p>
                    <Badge className="mt-2 bg-blue-900/20 text-blue-400">4-8 hours</Badge>
                  </div>

                  <div
                    className={`transition-opacity duration-500 ${
                      simulationProgress >= 100 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute -left-2 top-0">
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    </div>
                    <h5 className="text-sm font-medium">Final Results</h5>
                    <p className="text-xs text-gray-400 mt-1">
                      Clinical report delivered with limited variant interpretation and general recommendations.
                    </p>
                    <Badge className="mt-2 bg-blue-900/20 text-blue-400">Total: 5-7 days</Badge>
                  </div>
                </div>
              </div>

              {/* AI Analysis Timeline */}
              <div className="space-y-4">
                <h4 className="text-md font-medium flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-green-500" />
                  AI-Powered Analysis
                </h4>

                <div className="relative border-l-2 border-green-500/30 pl-6 pb-2 space-y-6">
                  <div
                    className={`transition-opacity duration-500 ${
                      simulationProgress >= 5 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute -left-2 top-0">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    </div>
                    <h5 className="text-sm font-medium">Parallel Data Processing</h5>
                    <p className="text-xs text-gray-400 mt-1">
                      Automated quality control and optimized alignment with adaptive parameters.
                    </p>
                    <Badge className="mt-2 bg-green-900/20 text-green-400">30-60 minutes</Badge>
                  </div>

                  <div
                    className={`transition-opacity duration-500 ${
                      simulationProgress >= 15 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute -left-2 top-0">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    </div>
                    <h5 className="text-sm font-medium">Deep Learning Variant Calling</h5>
                    <p className="text-xs text-gray-400 mt-1">
                      Neural network-based variant detection with adaptive thresholds and pattern recognition.
                    </p>
                    <Badge className="mt-2 bg-green-900/20 text-green-400">30-60 minutes</Badge>
                  </div>

                  <div
                    className={`transition-opacity duration-500 ${
                      simulationProgress >= 25 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute -left-2 top-0">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    </div>
                    <h5 className="text-sm font-medium">Automated Literature Analysis</h5>
                    <p className="text-xs text-gray-400 mt-1">
                      NLP processing of scientific literature and integration of multiple databases.
                    </p>
                    <Badge className="mt-2 bg-green-900/20 text-green-400">15-30 minutes</Badge>
                  </div>

                  <div
                    className={`transition-opacity duration-500 ${
                      simulationProgress >= 35 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute -left-2 top-0">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    </div>
                    <h5 className="text-sm font-medium">Network Analysis</h5>
                    <p className="text-xs text-gray-400 mt-1">
                      Pathway and network analysis to identify gene-gene interactions and functional impacts.
                    </p>
                    <Badge className="mt-2 bg-green-900/20 text-green-400">15-30 minutes</Badge>
                  </div>

                  <div
                    className={`transition-opacity duration-500 ${
                      simulationProgress >= 45 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute -left-2 top-0">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    </div>
                    <h5 className="text-sm font-medium">Phenotype Matching</h5>
                    <p className="text-xs text-gray-400 mt-1">
                      Automated matching of patient phenotype with variant effects and similar cases.
                    </p>
                    <Badge className="mt-2 bg-green-900/20 text-green-400">15-30 minutes</Badge>
                  </div>

                  <div
                    className={`transition-opacity duration-500 ${
                      simulationProgress >= 55 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute -left-2 top-0">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    </div>
                    <h5 className="text-sm font-medium">Variant Prioritization</h5>
                    <p className="text-xs text-gray-400 mt-1">
                      ML-based ranking of variants by clinical relevance and pathogenicity prediction.
                    </p>
                    <Badge className="mt-2 bg-green-900/20 text-green-400">15-30 minutes</Badge>
                  </div>

                  <div
                    className={`transition-opacity duration-500 ${
                      simulationProgress >= 70 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute -left-2 top-0">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    </div>
                    <h5 className="text-sm font-medium">Treatment Prediction</h5>
                    <p className="text-xs text-gray-400 mt-1">
                      Analysis of variant impact on treatment response and drug metabolism.
                    </p>
                    <Badge className="mt-2 bg-green-900/20 text-green-400">15-30 minutes</Badge>
                  </div>

                  <div
                    className={`transition-opacity duration-500 ${
                      simulationProgress >= 85 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute -left-2 top-0">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    </div>
                    <h5 className="text-sm font-medium">Automated Report Generation</h5>
                    <p className="text-xs text-gray-400 mt-1">
                      AI-generated comprehensive clinical report with evidence-based recommendations.
                    </p>
                    <Badge className="mt-2 bg-green-900/20 text-green-400">15-30 minutes</Badge>
                  </div>

                  <div
                    className={`transition-opacity duration-500 ${
                      simulationProgress >= 100 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute -left-2 top-0">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    </div>
                    <h5 className="text-sm font-medium">Final Results</h5>
                    <p className="text-xs text-gray-400 mt-1">
                      Comprehensive report with detailed variant interpretation, personalized treatment recommendations,
                      and clinical trial matches.
                    </p>
                    <Badge className="mt-2 bg-green-900/20 text-green-400">Total: 3-6 hours</Badge>
                  </div>
                </div>
              </div>
            </div>

            {simulationProgress >= 100 && (
              <div className="mt-8 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-green-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Simulation Complete</h3>
                    <p className="text-sm text-gray-400">
                      The AI-powered approach completed the full genomic analysis in approximately 3-6 hours, compared
                      to 5-7 days for the traditional approach. This represents a 95% reduction in time to results,
                      while also providing more comprehensive and personalized insights.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 bg-gray-900 border border-green-900/40 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Key Advantages of AI-Powered Genomic Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg border border-green-900/40">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full bg-blue-900/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <h3 className="text-center font-medium mb-2">Speed & Efficiency</h3>
            <p className="text-xs text-gray-400 text-center">
              AI reduces analysis time from days to hours, enabling faster clinical decisions and treatment initiation
            </p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg border border-green-900/40">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full bg-green-900/20 flex items-center justify-center">
                <Search className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <h3 className="text-center font-medium mb-2">Enhanced Detection</h3>
            <p className="text-xs text-gray-400 text-center">
              AI identifies subtle patterns and complex variant interactions that traditional methods often miss
            </p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg border border-green-900/40">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full bg-red-900/20 flex items-center justify-center">
                <Network className="h-6 w-6 text-red-500" />
              </div>
            </div>
            <h3 className="text-center font-medium mb-2">Comprehensive Integration</h3>
            <p className="text-xs text-gray-400 text-center">
              AI integrates multiple data sources and analyzes complex relationships between variants, phenotypes, and
              outcomes
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg border border-green-900/40">
            <div className="flex items-start gap-3">
              <div className="bg-yellow-900/20 p-2 rounded-full mt-1">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Limitations to Consider</h3>
                <ul className="text-xs text-gray-400 space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      AI models require extensive validation and are dependent on the quality of training data
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      "Black box" nature of some AI algorithms can make it difficult to explain specific predictions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Human expertise remains essential for complex cases and clinical context integration</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg border border-green-900/40">
            <div className="flex items-start gap-3">
              <div className="bg-green-900/20 p-2 rounded-full mt-1">
                <Layers className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Optimal Approach</h3>
                <p className="text-xs text-gray-400">
                  The most effective genomic analysis combines AI-powered methods with human expertise. AI accelerates
                  analysis, identifies patterns, and generates comprehensive insights, while clinical experts provide
                  critical oversight, interpret edge cases, and integrate patient-specific context. This hybrid approach
                  leverages the strengths of both methodologies while mitigating their respective limitations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
