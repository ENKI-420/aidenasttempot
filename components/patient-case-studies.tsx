"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GenomicVisualization3D } from "@/components/genomic-visualization-3d"
import {
  ChevronRight,
  ChevronLeft,
  DnaIcon as DNA,
  Activity,
  Pill,
  ClipboardList,
  User,
  Calendar,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react"

// Define the patient case study types
interface GenomicVariant {
  id: string
  name: string
  chromosome: string
  position: string
  reference: string
  alternate: string
  zygosity: "Heterozygous" | "Homozygous"
  significance: "Pathogenic" | "Likely Pathogenic" | "Uncertain Significance" | "Likely Benign" | "Benign"
  description: string
}

interface ClinicalFinding {
  id: string
  category: "Cardiovascular" | "Oncology" | "Neurology" | "Metabolism" | "Pharmacogenomics" | "Other"
  finding: string
  description: string
  aiConfidence: number
  relatedVariants: string[]
}

interface TreatmentRecommendation {
  id: string
  type: "Medication" | "Monitoring" | "Lifestyle" | "Procedure" | "Referral"
  recommendation: string
  description: string
  evidenceLevel: "Strong" | "Moderate" | "Limited"
  relatedFindings: string[]
}

interface PatientCase {
  id: string
  name: string
  age: number
  sex: "Male" | "Female" | "Other"
  ethnicity: string
  clinicalSummary: string
  genomicVariants: GenomicVariant[]
  clinicalFindings: ClinicalFinding[]
  treatmentRecommendations: TreatmentRecommendation[]
  outcomeDescription: string
}

// Sample patient case studies
const patientCases: PatientCase[] = [
  {
    id: "case-001",
    name: "Patient A",
    age: 42,
    sex: "Female",
    ethnicity: "European",
    clinicalSummary:
      "42-year-old female presenting with recurrent venous thromboembolism despite no family history or traditional risk factors. Genomic analysis was ordered to investigate potential hereditary thrombophilia.",
    genomicVariants: [
      {
        id: "var-001",
        name: "F5 c.1601G>A (Factor V Leiden)",
        chromosome: "1",
        position: "169519049",
        reference: "G",
        alternate: "A",
        zygosity: "Heterozygous",
        significance: "Pathogenic",
        description:
          "This variant causes activated protein C resistance, increasing thrombosis risk 3-7 fold in heterozygotes. It's the most common hereditary thrombophilia in European populations.",
      },
      {
        id: "var-002",
        name: "MTHFR c.665C>T (C677T)",
        chromosome: "1",
        position: "11856378",
        reference: "C",
        alternate: "T",
        zygosity: "Homozygous",
        significance: "Uncertain Significance",
        description:
          "This variant reduces MTHFR enzyme activity, potentially leading to elevated homocysteine levels. While associated with various conditions, its clinical significance remains uncertain.",
      },
    ],
    clinicalFindings: [
      {
        id: "find-001",
        category: "Cardiovascular",
        finding: "Increased Thrombosis Risk",
        description:
          "The Factor V Leiden mutation significantly increases the risk of venous thromboembolism, explaining the patient's recurrent events despite absence of other risk factors.",
        aiConfidence: 92,
        relatedVariants: ["var-001"],
      },
      {
        id: "find-002",
        category: "Metabolism",
        finding: "Potential Hyperhomocysteinemia",
        description:
          "The homozygous MTHFR variant may contribute to elevated homocysteine levels, which could further increase cardiovascular risk, though this connection is less established.",
        aiConfidence: 68,
        relatedVariants: ["var-002"],
      },
      {
        id: "find-003",
        category: "Pharmacogenomics",
        finding: "Increased Warfarin Sensitivity",
        description:
          "Patients with Factor V Leiden may require careful warfarin dosing and monitoring due to the complex interaction between the medication and the patient's thrombophilic state.",
        aiConfidence: 75,
        relatedVariants: ["var-001"],
      },
    ],
    treatmentRecommendations: [
      {
        id: "treat-001",
        type: "Medication",
        recommendation: "Long-term Anticoagulation",
        description:
          "Given the recurrent thrombotic events and confirmed Factor V Leiden mutation, extended anticoagulation therapy is recommended. Consider direct oral anticoagulants (DOACs) as an alternative to warfarin.",
        evidenceLevel: "Strong",
        relatedFindings: ["find-001"],
      },
      {
        id: "treat-002",
        type: "Monitoring",
        recommendation: "Homocysteine Level Testing",
        description:
          "Monitor homocysteine levels to assess if the MTHFR variant is causing hyperhomocysteinemia. If elevated, consider folate, B6, and B12 supplementation.",
        evidenceLevel: "Moderate",
        relatedFindings: ["find-002"],
      },
      {
        id: "treat-003",
        type: "Lifestyle",
        recommendation: "Thrombosis Risk Reduction",
        description:
          "Advise on lifestyle modifications to reduce thrombosis risk: maintain healthy weight, stay hydrated, avoid prolonged immobility during travel, and consider compression stockings.",
        evidenceLevel: "Moderate",
        relatedFindings: ["find-001"],
      },
      {
        id: "treat-004",
        type: "Referral",
        recommendation: "Hematology Consultation",
        description:
          "Refer to hematology for specialized management of hereditary thrombophilia and to discuss implications for family members who may benefit from testing.",
        evidenceLevel: "Strong",
        relatedFindings: ["find-001", "find-003"],
      },
    ],
    outcomeDescription:
      "After implementing long-term anticoagulation therapy and lifestyle modifications, the patient has remained free of thrombotic events for 18 months. Family screening identified the Factor V Leiden mutation in two first-degree relatives who are now receiving appropriate preventive care.",
  },
  {
    id: "case-002",
    name: "Patient B",
    age: 35,
    sex: "Male",
    ethnicity: "East Asian",
    clinicalSummary:
      "35-year-old male with recurrent severe adverse reactions to multiple medications. Pharmacogenomic testing was ordered to guide future medication selection and dosing.",
    genomicVariants: [
      {
        id: "var-003",
        name: "CYP2C19*2 (c.681G>A)",
        chromosome: "10",
        position: "96541616",
        reference: "G",
        alternate: "A",
        zygosity: "Homozygous",
        significance: "Pathogenic",
        description:
          "This variant results in a non-functional CYP2C19 enzyme, classifying the patient as a poor metabolizer. Affects metabolism of many drugs including clopidogrel, proton pump inhibitors, and certain antidepressants.",
      },
      {
        id: "var-004",
        name: "SLCO1B1 c.521T>C",
        chromosome: "12",
        position: "21331549",
        reference: "T",
        alternate: "C",
        zygosity: "Heterozygous",
        significance: "Likely Pathogenic",
        description:
          "This variant reduces the transport function of SLCO1B1, which is involved in the hepatic uptake of statins. Associated with increased risk of statin-induced myopathy, particularly with simvastatin.",
      },
      {
        id: "var-005",
        name: "HLA-B*15:02",
        chromosome: "6",
        position: "31353875",
        reference: "Complex",
        alternate: "Complex",
        zygosity: "Heterozygous",
        significance: "Pathogenic",
        description:
          "This HLA allele is strongly associated with severe cutaneous adverse reactions (SCAR) including Stevens-Johnson syndrome and toxic epidermal necrolysis when exposed to carbamazepine and other aromatic antiepileptic drugs.",
      },
    ],
    clinicalFindings: [
      {
        id: "find-004",
        category: "Pharmacogenomics",
        finding: "Clopidogrel Resistance",
        description:
          "The homozygous CYP2C19*2 variant indicates the patient is a poor metabolizer of clopidogrel, significantly reducing its antiplatelet effectiveness and increasing cardiovascular risk if prescribed.",
        aiConfidence: 95,
        relatedVariants: ["var-003"],
      },
      {
        id: "find-005",
        category: "Pharmacogenomics",
        finding: "Statin-Induced Myopathy Risk",
        description:
          "The SLCO1B1 variant increases risk of muscle-related adverse effects with statin therapy, particularly at higher doses of simvastatin.",
        aiConfidence: 88,
        relatedVariants: ["var-004"],
      },
      {
        id: "find-006",
        category: "Pharmacogenomics",
        finding: "Severe Cutaneous Adverse Reaction Risk",
        description:
          "The presence of HLA-B*15:02 allele significantly increases risk of life-threatening skin reactions with certain antiepileptic medications.",
        aiConfidence: 98,
        relatedVariants: ["var-005"],
      },
    ],
    treatmentRecommendations: [
      {
        id: "treat-005",
        type: "Medication",
        recommendation: "Avoid Carbamazepine and Related Drugs",
        description:
          "Absolutely contraindicate carbamazepine, oxcarbazepine, phenytoin, and lamotrigine due to high risk of severe cutaneous adverse reactions with HLA-B*15:02.",
        evidenceLevel: "Strong",
        relatedFindings: ["find-006"],
      },
      {
        id: "treat-006",
        type: "Medication",
        recommendation: "Alternative to Clopidogrel",
        description:
          "If antiplatelet therapy is needed, use prasugrel or ticagrelor instead of clopidogrel, as their effectiveness is not significantly impacted by CYP2C19 status.",
        evidenceLevel: "Strong",
        relatedFindings: ["find-004"],
      },
      {
        id: "treat-007",
        type: "Medication",
        recommendation: "Statin Selection and Dosing",
        description:
          "If statin therapy is indicated, avoid high-dose simvastatin. Consider lower doses of simvastatin or alternative statins like rosuvastatin with careful monitoring for muscle symptoms.",
        evidenceLevel: "Moderate",
        relatedFindings: ["find-005"],
      },
      {
        id: "treat-008",
        type: "Monitoring",
        recommendation: "Medication Alert System",
        description:
          "Implement alerts in the electronic health record to flag high-risk medications based on the patient's pharmacogenomic profile.",
        evidenceLevel: "Moderate",
        relatedFindings: ["find-004", "find-005", "find-006"],
      },
    ],
    outcomeDescription:
      "Implementation of pharmacogenomic-guided medication selection has prevented further adverse drug reactions. The patient was successfully treated with rosuvastatin for hyperlipidemia without myopathy and received ticagrelor following a cardiac stent placement with good clinical response.",
  },
  {
    id: "case-003",
    name: "Patient C",
    age: 28,
    sex: "Female",
    ethnicity: "African",
    clinicalSummary:
      "28-year-old female with family history of breast cancer. Genetic testing was performed to assess hereditary cancer risk and guide preventive measures.",
    genomicVariants: [
      {
        id: "var-006",
        name: "BRCA2 c.5946delT (6174delT)",
        chromosome: "13",
        position: "32914437",
        reference: "CT",
        alternate: "C",
        zygosity: "Heterozygous",
        significance: "Pathogenic",
        description:
          "This frameshift variant in BRCA2 is a founder mutation associated with increased risk of breast, ovarian, pancreatic, and prostate cancers. It results in a truncated, non-functional protein.",
      },
      {
        id: "var-007",
        name: "CHEK2 c.1100delC",
        chromosome: "22",
        position: "29091857",
        reference: "GC",
        alternate: "G",
        zygosity: "Heterozygous",
        significance: "Pathogenic",
        description:
          "This variant causes a frameshift in the CHEK2 gene, which is involved in DNA repair and cell cycle regulation. It is associated with a moderate increase in breast cancer risk.",
      },
    ],
    clinicalFindings: [
      {
        id: "find-007",
        category: "Oncology",
        finding: "High Breast Cancer Risk",
        description:
          "The pathogenic BRCA2 variant confers a lifetime breast cancer risk of 45-69%, significantly higher than the general population risk of 12%.",
        aiConfidence: 96,
        relatedVariants: ["var-006"],
      },
      {
        id: "find-008",
        category: "Oncology",
        finding: "Elevated Ovarian Cancer Risk",
        description:
          "The BRCA2 mutation is associated with a 10-20% lifetime risk of ovarian cancer, compared to about 1-2% in the general population.",
        aiConfidence: 94,
        relatedVariants: ["var-006"],
      },
      {
        id: "find-009",
        category: "Oncology",
        finding: "Compounded Breast Cancer Risk",
        description:
          "The presence of both BRCA2 and CHEK2 pathogenic variants may have an additive or synergistic effect on breast cancer risk, though exact risk quantification for this combination is limited.",
        aiConfidence: 78,
        relatedVariants: ["var-006", "var-007"],
      },
    ],
    treatmentRecommendations: [
      {
        id: "treat-009",
        type: "Monitoring",
        recommendation: "Enhanced Breast Cancer Screening",
        description:
          "Begin annual breast MRI at age 25 and annual mammography at age 30, alternating every 6 months. Consider contrast-enhanced mammography as an alternative if MRI is contraindicated.",
        evidenceLevel: "Strong",
        relatedFindings: ["find-007", "find-009"],
      },
      {
        id: "treat-010",
        type: "Monitoring",
        recommendation: "Ovarian Cancer Surveillance",
        description:
          "Consider transvaginal ultrasound and CA-125 testing every 6 months beginning at age 30, though evidence for effectiveness is limited.",
        evidenceLevel: "Limited",
        relatedFindings: ["find-008"],
      },
      {
        id: "treat-011",
        type: "Procedure",
        recommendation: "Risk-Reducing Surgeries",
        description:
          "Discuss option of prophylactic bilateral mastectomy (reduces breast cancer risk by >90%) and bilateral salpingo-oophorectomy after completion of childbearing or by age 40-45 (reduces ovarian cancer risk by >80%).",
        evidenceLevel: "Strong",
        relatedFindings: ["find-007", "find-008"],
      },
      {
        id: "treat-012",
        type: "Medication",
        recommendation: "Chemoprevention Consideration",
        description:
          "Discuss selective estrogen receptor modulators (SERMs) like tamoxifen or aromatase inhibitors as chemoprevention options, though data specifically in BRCA carriers is limited.",
        evidenceLevel: "Limited",
        relatedFindings: ["find-007", "find-009"],
      },
      {
        id: "treat-013",
        type: "Referral",
        recommendation: "Genetic Counseling for Family",
        description:
          "Refer first-degree relatives for genetic counseling and consideration of testing for the identified BRCA2 and CHEK2 variants.",
        evidenceLevel: "Strong",
        relatedFindings: ["find-007", "find-008", "find-009"],
      },
    ],
    outcomeDescription:
      "The patient opted for intensive surveillance with alternating MRI and mammography. She completed childbearing at age 32 and underwent prophylactic bilateral salpingo-oophorectomy at age 35. She continues to consider risk-reducing mastectomy. Cascade testing identified the BRCA2 variant in her sister and paternal aunt, who have now implemented appropriate cancer surveillance.",
  },
]

export function PatientCaseStudies() {
  const [activeCase, setActiveCase] = useState<PatientCase>(patientCases[0])
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedVariants, setExpandedVariants] = useState<string[]>([])
  const [expandedFindings, setExpandedFindings] = useState<string[]>([])
  const [expandedTreatments, setExpandedTreatments] = useState<string[]>([])
  const [showPathway, setShowPathway] = useState(false)

  // Handle case navigation
  const navigateCase = (direction: "next" | "prev") => {
    const currentIndex = patientCases.findIndex((c) => c.id === activeCase.id)
    if (direction === "next" && currentIndex < patientCases.length - 1) {
      setActiveCase(patientCases[currentIndex + 1])
    } else if (direction === "prev" && currentIndex > 0) {
      setActiveCase(patientCases[currentIndex - 1])
    }
    // Reset expanded states when changing cases
    setExpandedVariants([])
    setExpandedFindings([])
    setExpandedTreatments([])
  }

  // Toggle expanded state for items
  const toggleExpanded = (id: string, type: "variant" | "finding" | "treatment") => {
    if (type === "variant") {
      setExpandedVariants((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    } else if (type === "finding") {
      setExpandedFindings((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    } else if (type === "treatment") {
      setExpandedTreatments((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    }
  }

  // Get significance color
  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case "Pathogenic":
        return "bg-red-500"
      case "Likely Pathogenic":
        return "bg-orange-500"
      case "Uncertain Significance":
        return "bg-yellow-500"
      case "Likely Benign":
        return "bg-blue-500"
      case "Benign":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Cardiovascular":
        return "bg-red-500"
      case "Oncology":
        return "bg-purple-500"
      case "Neurology":
        return "bg-blue-500"
      case "Metabolism":
        return "bg-green-500"
      case "Pharmacogenomics":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get evidence level color
  const getEvidenceLevelColor = (level: string) => {
    switch (level) {
      case "Strong":
        return "bg-green-500"
      case "Moderate":
        return "bg-blue-500"
      case "Limited":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get recommendation type icon
  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "Medication":
        return <Pill className="h-4 w-4" />
      case "Monitoring":
        return <Activity className="h-4 w-4" />
      case "Lifestyle":
        return <User className="h-4 w-4" />
      case "Procedure":
        return <ClipboardList className="h-4 w-4" />
      case "Referral":
        return <ExternalLink className="h-4 w-4" />
      default:
        return <HelpCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Patient Case Studies</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateCase("prev")}
            disabled={activeCase.id === patientCases[0].id}
            className="border-green-900/40 text-green-500 hover:bg-green-900/20"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous Case
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateCase("next")}
            disabled={activeCase.id === patientCases[patientCases.length - 1].id}
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
              <CardTitle className="text-xl flex items-center">
                {activeCase.name}
                <Badge className="ml-2 bg-green-600 hover:bg-green-700">{activeCase.id}</Badge>
              </CardTitle>
              <CardDescription>
                {activeCase.age} year old {activeCase.sex.toLowerCase()}, {activeCase.ethnicity} ethnicity
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPathway(!showPathway)}
              className="border-green-900/40 text-green-500 hover:bg-green-900/20"
            >
              {showPathway ? "Hide Pathway" : "Show Genomic Pathway"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {showPathway ? (
              <motion.div
                key="pathway"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-[400px] flex justify-center"
              >
                <GenomicVisualization3D
                  width={600}
                  height={400}
                  autoRotate={true}
                  showLabels={true}
                  showClinicalOutcomes={true}
                />
              </motion.div>
            ) : (
              <motion.div key="tabs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-gray-800 border border-green-900/40">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="genomic"
                      className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500"
                    >
                      Genomic Variants
                    </TabsTrigger>
                    <TabsTrigger
                      value="clinical"
                      className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500"
                    >
                      Clinical Findings
                    </TabsTrigger>
                    <TabsTrigger
                      value="treatment"
                      className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500"
                    >
                      Treatment Plan
                    </TabsTrigger>
                    <TabsTrigger
                      value="outcome"
                      className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500"
                    >
                      Outcome
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Clinical Summary</h3>
                        <p className="text-gray-400">{activeCase.clinicalSummary}</p>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mt-6">
                        <Card className="bg-gray-800 border-green-900/40">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-md flex items-center">
                              <DNA className="h-4 w-4 mr-2 text-green-500" />
                              Genomic Profile
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {activeCase.genomicVariants.map((variant) => (
                                <li key={variant.id} className="text-sm">
                                  <span
                                    className={`inline-block w-2 h-2 rounded-full ${getSignificanceColor(
                                      variant.significance,
                                    )} mr-2`}
                                  ></span>
                                  {variant.name}
                                </li>
                              ))}
                            </ul>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setActiveTab("genomic")}
                              className="mt-2 text-green-500 hover:text-green-400 p-0 h-auto"
                            >
                              View details
                            </Button>
                          </CardContent>
                        </Card>

                        <Card className="bg-gray-800 border-green-900/40">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-md flex items-center">
                              <Activity className="h-4 w-4 mr-2 text-blue-500" />
                              Key Clinical Findings
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {activeCase.clinicalFindings.map((finding) => (
                                <li key={finding.id} className="text-sm">
                                  <span
                                    className={`inline-block w-2 h-2 rounded-full ${getCategoryColor(
                                      finding.category,
                                    )} mr-2`}
                                  ></span>
                                  {finding.finding}
                                </li>
                              ))}
                            </ul>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setActiveTab("clinical")}
                              className="mt-2 text-green-500 hover:text-green-400 p-0 h-auto"
                            >
                              View details
                            </Button>
                          </CardContent>
                        </Card>

                        <Card className="bg-gray-800 border-green-900/40">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-md flex items-center">
                              <ClipboardList className="h-4 w-4 mr-2 text-yellow-500" />
                              Treatment Recommendations
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {activeCase.treatmentRecommendations.map((treatment) => (
                                <li key={treatment.id} className="text-sm">
                                  <span className="inline-flex items-center">
                                    {getRecommendationIcon(treatment.type)}
                                    <span className="ml-2">{treatment.recommendation}</span>
                                  </span>
                                </li>
                              ))}
                            </ul>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setActiveTab("treatment")}
                              className="mt-2 text-green-500 hover:text-green-400 p-0 h-auto"
                            >
                              View details
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="genomic" className="mt-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-2">Genomic Variants</h3>
                      <p className="text-gray-400 mb-4">
                        The following genomic variants were identified in this patient and are relevant to their
                        clinical presentation and management.
                      </p>

                      <div className="space-y-3">
                        {activeCase.genomicVariants.map((variant) => (
                          <Card key={variant.id} className="bg-gray-800 border-green-900/40">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-md flex items-center justify-between">
                                <div className="flex items-center">
                                  <DNA className="h-4 w-4 mr-2 text-green-500" />
                                  {variant.name}
                                </div>
                                <Badge
                                  className={`${getSignificanceColor(variant.significance)} hover:${getSignificanceColor(
                                    variant.significance,
                                  )}`}
                                >
                                  {variant.significance}
                                </Badge>
                              </CardTitle>
                              <CardDescription>
                                Chr {variant.chromosome}, Position {variant.position}, {variant.reference} &gt;{" "}
                                {variant.alternate}, {variant.zygosity}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-400">
                                  {expandedVariants.includes(variant.id)
                                    ? variant.description
                                    : `${variant.description.substring(0, 100)}...`}
                                </p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleExpanded(variant.id, "variant")}
                                  className="ml-2 text-green-500 hover:text-green-400"
                                >
                                  {expandedVariants.includes(variant.id) ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="clinical" className="mt-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-2">Clinical Findings</h3>
                      <p className="text-gray-400 mb-4">
                        Based on the genomic analysis, the following clinical implications were identified.
                      </p>

                      <div className="space-y-3">
                        {activeCase.clinicalFindings.map((finding) => (
                          <Card key={finding.id} className="bg-gray-800 border-green-900/40">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-md flex items-center justify-between">
                                <div className="flex items-center">
                                  <Activity className="h-4 w-4 mr-2 text-blue-500" />
                                  {finding.finding}
                                </div>
                                <Badge className={`${getCategoryColor(finding.category)}`}>{finding.category}</Badge>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <p className="text-sm text-gray-400 mb-3">
                                    {expandedFindings.includes(finding.id)
                                      ? finding.description
                                      : `${finding.description.substring(0, 100)}...`}
                                  </p>
                                  {expandedFindings.includes(finding.id) && (
                                    <div className="mt-3">
                                      <p className="text-xs text-gray-500 mb-1">Related Genomic Variants:</p>
                                      <div className="flex flex-wrap gap-2">
                                        {finding.relatedVariants.map((varId) => {
                                          const variant = activeCase.genomicVariants.find((v) => v.id === varId)
                                          return (
                                            variant && (
                                              <Badge key={varId} className="bg-gray-700 hover:bg-gray-600 text-white">
                                                {variant.name}
                                              </Badge>
                                            )
                                          )
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="flex flex-col items-end ml-4">
                                  <div className="flex items-center mb-2">
                                    <span className="text-xs text-gray-400 mr-2">AI Confidence:</span>
                                    <Badge
                                      className={`${
                                        finding.aiConfidence > 80
                                          ? "bg-green-600"
                                          : finding.aiConfidence > 60
                                            ? "bg-yellow-600"
                                            : "bg-red-600"
                                      }`}
                                    >
                                      {finding.aiConfidence}%
                                    </Badge>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleExpanded(finding.id, "finding")}
                                    className="text-green-500 hover:text-green-400"
                                  >
                                    {expandedFindings.includes(finding.id) ? (
                                      <ChevronUp className="h-4 w-4" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="treatment" className="mt-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-2">Treatment Recommendations</h3>
                      <p className="text-gray-400 mb-4">
                        Based on the genomic findings and clinical implications, the following treatment recommendations
                        were made.
                      </p>

                      <div className="space-y-3">
                        {activeCase.treatmentRecommendations.map((treatment) => (
                          <Card key={treatment.id} className="bg-gray-800 border-green-900/40">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-md flex items-center justify-between">
                                <div className="flex items-center">
                                  {getRecommendationIcon(treatment.type)}
                                  <span className="ml-2">{treatment.recommendation}</span>
                                </div>
                                <Badge className={`${getEvidenceLevelColor(treatment.evidenceLevel)}`}>
                                  {treatment.evidenceLevel} Evidence
                                </Badge>
                              </CardTitle>
                              <CardDescription>{treatment.type}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <p className="text-sm text-gray-400 mb-3">
                                    {expandedTreatments.includes(treatment.id)
                                      ? treatment.description
                                      : `${treatment.description.substring(0, 100)}...`}
                                  </p>
                                  {expandedTreatments.includes(treatment.id) && (
                                    <div className="mt-3">
                                      <p className="text-xs text-gray-500 mb-1">Based on Clinical Findings:</p>
                                      <div className="flex flex-wrap gap-2">
                                        {treatment.relatedFindings.map((findId) => {
                                          const finding = activeCase.clinicalFindings.find((f) => f.id === findId)
                                          return (
                                            finding && (
                                              <Badge
                                                key={findId}
                                                className={`${getCategoryColor(finding.category)} bg-opacity-70`}
                                              >
                                                {finding.finding}
                                              </Badge>
                                            )
                                          )
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleExpanded(treatment.id, "treatment")}
                                  className="ml-2 text-green-500 hover:text-green-400"
                                >
                                  {expandedTreatments.includes(treatment.id) ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="outcome" className="mt-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-2">Clinical Outcome</h3>
                      <Card className="bg-gray-800 border-green-900/40">
                        <CardHeader>
                          <CardTitle className="text-md flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                            Patient Outcome
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-400">{activeCase.outcomeDescription}</p>
                        </CardContent>
                      </Card>

                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Genomic-to-Clinical Pathway</h3>
                        <Card className="bg-gray-800 border-green-900/40">
                          <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                              <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-green-900/20 flex items-center justify-center mb-2">
                                  <DNA className="h-8 w-8 text-green-500" />
                                </div>
                                <p className="text-sm font-medium">Genomic Variants</p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {activeCase.genomicVariants.length} identified
                                </p>
                              </div>

                              <div className="hidden md:block">
                                <ChevronRight className="h-8 w-8 text-gray-600" />
                              </div>
                              <div className="block md:hidden">
                                <ChevronDown className="h-8 w-8 text-gray-600" />
                              </div>

                              <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-blue-900/20 flex items-center justify-center mb-2">
                                  <Activity className="h-8 w-8 text-blue-500" />
                                </div>
                                <p className="text-sm font-medium">Clinical Implications</p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {activeCase.clinicalFindings.length} findings
                                </p>
                              </div>

                              <div className="hidden md:block">
                                <ChevronRight className="h-8 w-8 text-gray-600" />
                              </div>
                              <div className="block md:hidden">
                                <ChevronDown className="h-8 w-8 text-gray-600" />
                              </div>

                              <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-yellow-900/20 flex items-center justify-center mb-2">
                                  <ClipboardList className="h-8 w-8 text-yellow-500" />
                                </div>
                                <p className="text-sm font-medium">Treatment Plan</p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {activeCase.treatmentRecommendations.length} recommendations
                                </p>
                              </div>

                              <div className="hidden md:block">
                                <ChevronRight className="h-8 w-8 text-gray-600" />
                              </div>
                              <div className="block md:hidden">
                                <ChevronDown className="h-8 w-8 text-gray-600" />
                              </div>

                              <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-purple-900/20 flex items-center justify-center mb-2">
                                  <User className="h-8 w-8 text-purple-500" />
                                </div>
                                <p className="text-sm font-medium">Patient Outcome</p>
                                <p className="text-xs text-gray-400 mt-1">Personalized care</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="border-t border-green-900/40 pt-4">
          <div className="flex items-center text-sm text-gray-400">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Last updated: April 15, 2025</span>
          </div>
        </CardFooter>
      </Card>

      <div className="bg-gray-900 border border-green-900/40 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <div className="bg-yellow-900/20 p-2 rounded-full mt-1">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Educational Note</h3>
            <p className="text-gray-400 text-sm">
              These case studies demonstrate how genomic data is translated into clinical decisions through AI analysis.
              Each case illustrates the pathway from genetic variants to clinical implications and treatment
              recommendations. The cases are based on real scientific knowledge but are fictional and do not represent
              actual patients.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
