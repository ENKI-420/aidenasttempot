"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text, Html, Environment } from "@react-three/drei"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Dna, ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2, X, Activity } from "lucide-react"
import * as THREE from "three"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Real genomic variant data
const GENOMIC_VARIANTS = [
  {
    id: "var-1",
    gene: "BRCA1",
    position: "chr17:43,044,295",
    variant: "c.5266dupC (p.Gln1756Profs*74)",
    significance: "Pathogenic",
    condition: "Hereditary Breast and Ovarian Cancer",
    frequency: 0.0001,
    color: "#e11d48", // red
    position3D: [0.2, 0.3, 0.5],
    size: 0.08,
  },
  {
    id: "var-2",
    gene: "TP53",
    position: "chr17:7,673,802",
    variant: "c.818G>A (p.Arg273His)",
    significance: "Pathogenic",
    condition: "Li-Fraumeni Syndrome",
    frequency: 0.00005,
    color: "#e11d48", // red
    position3D: [-0.3, 0.2, 0.4],
    size: 0.07,
  },
  {
    id: "var-3",
    gene: "KRAS",
    position: "chr12:25,245,350",
    variant: "c.35G>T (p.Gly12Val)",
    significance: "Pathogenic",
    condition: "Somatic mutation in multiple cancers",
    frequency: 0.0008,
    color: "#e11d48", // red
    position3D: [0.4, -0.2, 0.3],
    size: 0.06,
  },
  {
    id: "var-4",
    gene: "BRAF",
    position: "chr7:140,753,336",
    variant: "c.1799T>A (p.Val600Glu)",
    significance: "Pathogenic",
    condition: "Melanoma susceptibility",
    frequency: 0.0005,
    color: "#e11d48", // red
    position3D: [-0.2, -0.3, 0.2],
    size: 0.06,
  },
  {
    id: "var-5",
    gene: "PTEN",
    position: "chr10:87,864,470",
    variant: "c.388C>T (p.Arg130*)",
    significance: "Pathogenic",
    condition: "PTEN Hamartoma Tumor Syndrome",
    frequency: 0.00003,
    color: "#e11d48", // red
    position3D: [0.1, 0.4, -0.3],
    size: 0.07,
  },
  {
    id: "var-6",
    gene: "APC",
    position: "chr5:112,839,627",
    variant: "c.3927_3931delAAAGA (p.Glu1309Aspfs*4)",
    significance: "Pathogenic",
    condition: "Familial Adenomatous Polyposis",
    frequency: 0.00002,
    color: "#e11d48", // red
    position3D: [-0.4, 0.1, -0.2],
    size: 0.07,
  },
  {
    id: "var-7",
    gene: "MLH1",
    position: "chr3:37,038,127",
    variant: "c.1852_1853delAAinsGC (p.Lys618Ala)",
    significance: "Pathogenic",
    condition: "Lynch Syndrome",
    frequency: 0.00001,
    color: "#e11d48", // red
    position3D: [0.3, -0.4, -0.1],
    size: 0.06,
  },
  {
    id: "var-8",
    gene: "EGFR",
    position: "chr7:55,249,071",
    variant: "c.2573T>G (p.Leu858Arg)",
    significance: "Pathogenic",
    condition: "Non-small cell lung cancer",
    frequency: 0.0003,
    color: "#e11d48", // red
    position3D: [-0.1, -0.2, -0.4],
    size: 0.06,
  },
  {
    id: "var-9",
    gene: "CFTR",
    position: "chr7:117,587,806",
    variant: "c.1521_1523delCTT (p.Phe508del)",
    significance: "Pathogenic",
    condition: "Cystic Fibrosis",
    frequency: 0.008,
    color: "#0284c7", // blue
    position3D: [0.5, 0.1, 0.1],
    size: 0.05,
  },
  {
    id: "var-10",
    gene: "APOE",
    position: "chr19:44,908,684",
    variant: "c.388T>C (p.Cys130Arg)",
    significance: "Risk factor",
    condition: "Alzheimer's disease",
    frequency: 0.14,
    color: "#eab308", // yellow
    position3D: [-0.5, 0.2, 0.1],
    size: 0.04,
  },
  {
    id: "var-11",
    gene: "HFE",
    position: "chr6:26,092,913",
    variant: "c.845G>A (p.Cys282Tyr)",
    significance: "Pathogenic",
    condition: "Hereditary Hemochromatosis",
    frequency: 0.06,
    color: "#0284c7", // blue
    position3D: [0.2, -0.5, 0.2],
    size: 0.05,
  },
  {
    id: "var-12",
    gene: "LDLR",
    position: "chr19:11,206,293",
    variant: "c.1646G>A (p.Gly549Asp)",
    significance: "Pathogenic",
    condition: "Familial Hypercholesterolemia",
    frequency: 0.0002,
    color: "#e11d48", // red
    position3D: [-0.2, 0.5, -0.2],
    size: 0.06,
  },
  {
    id: "var-13",
    gene: "MTHFR",
    position: "chr1:11,850,927",
    variant: "c.665C>T (p.Ala222Val)",
    significance: "Risk factor",
    condition: "Cardiovascular disease risk",
    frequency: 0.31,
    color: "#eab308", // yellow
    position3D: [0.1, 0.1, 0.6],
    size: 0.04,
  },
  {
    id: "var-14",
    gene: "F5",
    position: "chr1:169,519,049",
    variant: "c.1601G>A (p.Arg534Gln)",
    significance: "Risk factor",
    condition: "Factor V Leiden thrombophilia",
    frequency: 0.02,
    color: "#eab308", // yellow
    position3D: [-0.1, -0.1, -0.6],
    size: 0.04,
  },
  {
    id: "var-15",
    gene: "TGFBI",
    position: "chr5:136,145,909",
    variant: "c.1663C>T (p.Arg555Trp)",
    significance: "Pathogenic",
    condition: "Corneal Dystrophy",
    frequency: 0.00005,
    color: "#e11d48", // red
    position3D: [0.6, -0.3, -0.3],
    size: 0.05,
  },
]

// Clinical outcome data
const CLINICAL_OUTCOMES = [
  {
    id: "outcome-1",
    name: "Targeted Therapy Response",
    description: "Predicted response to PARP inhibitors based on BRCA1 mutation status",
    probability: 0.85,
    color: "#10b981", // green
    position3D: [0.7, 0.2, 0.2],
    size: 0.08,
    relatedVariants: ["var-1"],
  },
  {
    id: "outcome-2",
    name: "Chemotherapy Resistance",
    description: "Potential resistance to platinum-based chemotherapy due to TP53 mutation",
    probability: 0.72,
    color: "#f97316", // orange
    position3D: [-0.7, 0.3, 0.1],
    size: 0.07,
    relatedVariants: ["var-2"],
  },
  {
    id: "outcome-3",
    name: "Immunotherapy Efficacy",
    description: "Predicted response to immune checkpoint inhibitors",
    probability: 0.63,
    color: "#10b981", // green
    position3D: [0.3, -0.7, 0.2],
    size: 0.07,
    relatedVariants: ["var-3", "var-4"],
  },
  {
    id: "outcome-4",
    name: "Disease Progression Risk",
    description: "Estimated 5-year disease progression risk based on genomic profile",
    probability: 0.41,
    color: "#f97316", // orange
    position3D: [-0.2, 0.2, -0.7],
    size: 0.08,
    relatedVariants: ["var-5", "var-6", "var-7"],
  },
  {
    id: "outcome-5",
    name: "Recurrence Prediction",
    description: "Likelihood of disease recurrence within 10 years",
    probability: 0.28,
    color: "#10b981", // green
    position3D: [0.4, 0.4, -0.6],
    size: 0.07,
    relatedVariants: ["var-8"],
  },
]

// DNA helix parameters
const DNA_PARAMS = {
  radius: 0.5,
  height: 3,
  turns: 10,
  basePairs: 20,
  backboneWidth: 0.03,
  backboneColor1: "#22c55e", // green
  backboneColor2: "#3b82f6", // blue
  baseWidth: 0.2,
  baseHeight: 0.02,
  baseColor1: "#f43f5e", // red
  baseColor2: "#eab308", // yellow
}

// Create DNA helix geometry
function createDNAGeometry() {
  const { radius, height, turns, basePairs, backboneWidth, baseWidth, baseHeight } = DNA_PARAMS

  // Create backbone geometries
  const backbone1 = new THREE.BufferGeometry()
  const backbone2 = new THREE.BufferGeometry()

  // Create base pair geometries
  const bases = new THREE.BufferGeometry()

  const backbone1Points = []
  const backbone2Points = []
  const baseVertices = []
  const baseIndices = []

  // Generate points for the DNA structure
  for (let i = 0; i <= basePairs; i++) {
    const t = i / basePairs
    const angle1 = 2 * Math.PI * turns * t
    const angle2 = angle1 + Math.PI

    const y = height * (0.5 - t)

    const x1 = radius * Math.cos(angle1)
    const z1 = radius * Math.sin(angle1)

    const x2 = radius * Math.cos(angle2)
    const z2 = radius * Math.sin(angle2)

    backbone1Points.push(new THREE.Vector3(x1, y, z1))
    backbone2Points.push(new THREE.Vector3(x2, y, z2))

    // Add base pairs every few steps
    if (i < basePairs && i % 2 === 0) {
      // Create a base pair connecting the backbones
      const baseIndex = baseVertices.length / 3

      // Base pair vertices (rectangular shape)
      const halfWidth = baseWidth / 2
      const halfHeight = baseHeight / 2

      // Direction vector from backbone1 to backbone2
      const dir = new THREE.Vector3(x2 - x1, 0, z2 - z1).normalize()
      const perpDir = new THREE.Vector3(-dir.z, 0, dir.x)

      // Four corners of the base pair rectangle
      const c1 = new THREE.Vector3(
        x1 + dir.x * halfWidth + perpDir.x * halfHeight,
        y,
        z1 + dir.z * halfWidth + perpDir.z * halfHeight,
      )
      const c2 = new THREE.Vector3(
        x1 + dir.x * halfWidth - perpDir.x * halfHeight,
        y,
        z1 + dir.z * halfWidth - perpDir.z * halfHeight,
      )
      const c3 = new THREE.Vector3(
        x2 - dir.x * halfWidth - perpDir.x * halfHeight,
        y,
        z2 - dir.z * halfWidth - perpDir.z * halfHeight,
      )
      const c4 = new THREE.Vector3(
        x2 - dir.x * halfWidth + perpDir.x * halfHeight,
        y,
        z2 - dir.z * halfWidth + perpDir.z * halfHeight,
      )

      // Add vertices
      baseVertices.push(c1.x, c1.y, c1.z, c2.x, c2.y, c2.z, c3.x, c3.y, c3.z, c4.x, c4.y, c4.z)

      // Add indices for two triangles forming the rectangle
      baseIndices.push(baseIndex, baseIndex + 1, baseIndex + 2, baseIndex, baseIndex + 2, baseIndex + 3)
    }
  }

  // Create curve from points
  const backbone1Curve = new THREE.CatmullRomCurve3(backbone1Points)
  const backbone2Curve = new THREE.CatmullRomCurve3(backbone2Points)

  // Sample points along the curve for smoother appearance
  const backbone1Positions = backbone1Curve.getPoints(basePairs * 10)
  const backbone2Positions = backbone2Curve.getPoints(basePairs * 10)

  // Set base geometry
  bases.setAttribute("position", new THREE.Float32BufferAttribute(baseVertices, 3))
  bases.setIndex(baseIndices)
  bases.computeVertexNormals()

  return {
    backbone1Positions,
    backbone2Positions,
    bases,
  }
}

// DNA Helix Component
function DNAHelix({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  const { backbone1Positions, backbone2Positions, bases } = useMemo(() => createDNAGeometry(), [])

  // Create refs for animation
  const groupRef = useRef()
  const basesRef = useRef()

  // Animate rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Backbone 1 */}
      <line>
        <bufferGeometry>
          <float32BufferAttribute
            attach="attributes-position"
            array={new Float32Array(backbone1Positions.flatMap((p) => [p.x, p.y, p.z]))}
            count={backbone1Positions.length}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={DNA_PARAMS.backboneColor1} linewidth={DNA_PARAMS.backboneWidth} />
      </line>

      {/* Backbone 2 */}
      <line>
        <bufferGeometry>
          <float32BufferAttribute
            attach="attributes-position"
            array={new Float32Array(backbone2Positions.flatMap((p) => [p.x, p.y, p.z]))}
            count={backbone2Positions.length}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={DNA_PARAMS.backboneColor2} linewidth={DNA_PARAMS.backboneWidth} />
      </line>

      {/* Base pairs */}
      <mesh ref={basesRef} geometry={bases}>
        <meshStandardMaterial color={DNA_PARAMS.baseColor1} side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>

      {/* Add small spheres at backbone joints for visual appeal */}
      {backbone1Positions
        .filter((_, i) => i % 10 === 0)
        .map((pos, idx) => (
          <mesh key={`bb1-${idx}`} position={[pos.x, pos.y, pos.z]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color={DNA_PARAMS.backboneColor1} />
          </mesh>
        ))}

      {backbone2Positions
        .filter((_, i) => i % 10 === 0)
        .map((pos, idx) => (
          <mesh key={`bb2-${idx}`} position={[pos.x, pos.y, pos.z]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color={DNA_PARAMS.backboneColor2} />
          </mesh>
        ))}
    </group>
  )
}

// Variant Sphere Component
function VariantSphere({ variant, onClick, isHighlighted }) {
  const [hovered, setHovered] = useState(false)
  const { position3D, size, color, gene } = variant

  // Pulse animation for highlighted variants
  const pulseScale = isHighlighted ? [1, 1.2, 1] : 1
  const pulseSpeed = { duration: 2, repeat: Number.POSITIVE_INFINITY }

  return (
    <group position={position3D}>
      <motion.mesh
        scale={pulseScale}
        animate={isHighlighted ? { scale: pulseScale } : {}}
        transition={isHighlighted ? pulseSpeed : {}}
        onClick={() => onClick(variant)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          emissive={color}
          emissiveIntensity={hovered || isHighlighted ? 0.5 : 0.2}
        />
      </motion.mesh>

      {/* Label */}
      {(hovered || isHighlighted) && (
        <Html distanceFactor={10}>
          <div className="bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white whitespace-nowrap">
            {gene}
          </div>
        </Html>
      )}
    </group>
  )
}

// Clinical Outcome Component
function ClinicalOutcome({ outcome, onClick, isHighlighted, showConnections, activeVariantId }) {
  const [hovered, setHovered] = useState(false)
  const { position3D, size, color, name, probability, relatedVariants } = outcome

  // Check if this outcome is related to the active variant
  const isRelatedToActive = activeVariantId && relatedVariants.includes(activeVariantId)

  // Determine if this outcome should be highlighted
  const shouldHighlight = isHighlighted || isRelatedToActive

  // Pulse animation for highlighted outcomes
  const pulseScale = shouldHighlight ? [1, 1.2, 1] : 1
  const pulseSpeed = { duration: 2, repeat: Number.POSITIVE_INFINITY }

  return (
    <group position={position3D}>
      <motion.mesh
        scale={pulseScale}
        animate={shouldHighlight ? { scale: pulseScale } : {}}
        transition={shouldHighlight ? pulseSpeed : {}}
        onClick={() => onClick(outcome)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <octahedronGeometry args={[size, 0]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          emissive={color}
          emissiveIntensity={hovered || shouldHighlight ? 0.5 : 0.2}
          wireframe={true}
        />
      </motion.mesh>

      {/* Label */}
      {(hovered || shouldHighlight) && (
        <Html distanceFactor={10}>
          <div className="bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white whitespace-nowrap">
            {name} ({Math.round(probability * 100)}%)
          </div>
        </Html>
      )}

      {/* Connection lines to related variants */}
      {showConnections &&
        shouldHighlight &&
        relatedVariants.map((varId) => {
          const relatedVariant = GENOMIC_VARIANTS.find((v) => v.id === varId)
          if (!relatedVariant) return null

          return (
            <line key={`${outcome.id}-${varId}`}>
              <bufferGeometry>
                <float32BufferAttribute
                  attach="attributes-position"
                  array={new Float32Array([...position3D, ...relatedVariant.position3D])}
                  count={2}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color={color} transparent opacity={0.4} linewidth={1} />
            </line>
          )
        })}
    </group>
  )
}

// Connection Lines Component
function ConnectionLines({ activeVariant, activeOutcome }) {
  // If no active elements, don't render connections
  if (!activeVariant && !activeOutcome) return null

  // If active variant, show connections to related outcomes
  if (activeVariant) {
    const relatedOutcomes = CLINICAL_OUTCOMES.filter((o) => o.relatedVariants.includes(activeVariant.id))

    return (
      <>
        {relatedOutcomes.map((outcome) => (
          <line key={`${activeVariant.id}-${outcome.id}`}>
            <bufferGeometry>
              <float32BufferAttribute
                attach="attributes-position"
                array={new Float32Array([...activeVariant.position3D, ...outcome.position3D])}
                count={2}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#10b981" transparent opacity={0.6} linewidth={2} />
          </line>
        ))}
      </>
    )
  }

  // If active outcome, show connections to related variants
  if (activeOutcome) {
    return (
      <>
        {activeOutcome.relatedVariants.map((varId) => {
          const variant = GENOMIC_VARIANTS.find((v) => v.id === varId)
          if (!variant) return null

          return (
            <line key={`${activeOutcome.id}-${varId}`}>
              <bufferGeometry>
                <float32BufferAttribute
                  attach="attributes-position"
                  array={new Float32Array([...activeOutcome.position3D, ...variant.position3D])}
                  count={2}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#10b981" transparent opacity={0.6} linewidth={2} />
            </line>
          )
        })}
      </>
    )
  }

  return null
}

// Scene Component
function Scene({
  showLabels = false,
  showClinicalOutcomes = false,
  onSelectVariant,
  onSelectOutcome,
  activeVariantId,
  activeOutcomeId,
  showConnections = true,
}) {
  const [activeVariant, setActiveVariant] = useState(null)
  const [activeOutcome, setActiveOutcome] = useState(null)
  const { camera } = useThree()

  // Update active elements when IDs change
  useEffect(() => {
    if (activeVariantId) {
      const variant = GENOMIC_VARIANTS.find((v) => v.id === activeVariantId)
      setActiveVariant(variant || null)
      setActiveOutcome(null)
    } else if (activeOutcomeId) {
      const outcome = CLINICAL_OUTCOMES.find((o) => o.id === activeOutcomeId)
      setActiveOutcome(outcome || null)
      setActiveVariant(null)
    } else {
      setActiveVariant(null)
      setActiveOutcome(null)
    }
  }, [activeVariantId, activeOutcomeId])

  // Handle variant click
  const handleVariantClick = (variant) => {
    setActiveVariant(variant)
    setActiveOutcome(null)
    if (onSelectVariant) onSelectVariant(variant)
  }

  // Handle outcome click
  const handleOutcomeClick = (outcome) => {
    setActiveOutcome(outcome)
    setActiveVariant(null)
    if (onSelectOutcome) onSelectOutcome(outcome)
  }

  return (
    <>
      {/* Environment lighting */}
      <Environment preset="city" />

      {/* Ambient light */}
      <ambientLight intensity={0.5} />

      {/* Directional light */}
      <directionalLight position={[5, 5, 5]} intensity={0.5} />

      {/* DNA Helix */}
      <DNAHelix position={[0, 0, 0]} scale={0.8} />

      {/* Genomic Variants */}
      {GENOMIC_VARIANTS.map((variant) => (
        <VariantSphere
          key={variant.id}
          variant={variant}
          onClick={handleVariantClick}
          isHighlighted={activeVariant?.id === variant.id}
        />
      ))}

      {/* Clinical Outcomes */}
      {showClinicalOutcomes &&
        CLINICAL_OUTCOMES.map((outcome) => (
          <ClinicalOutcome
            key={outcome.id}
            outcome={outcome}
            onClick={handleOutcomeClick}
            isHighlighted={activeOutcome?.id === outcome.id}
            showConnections={showConnections}
            activeVariantId={activeVariant?.id}
          />
        ))}

      {/* Connection Lines */}
      {showConnections && <ConnectionLines activeVariant={activeVariant} activeOutcome={activeOutcome} />}

      {/* Labels */}
      {showLabels && (
        <>
          <Text position={[0, 1.8, 0]} color="#ffffff" fontSize={0.15} anchorX="center" anchorY="middle">
            Genomic Variants
          </Text>

          {showClinicalOutcomes && (
            <Text position={[0, -1.8, 0]} color="#ffffff" fontSize={0.15} anchorX="center" anchorY="middle">
              Clinical Outcomes
            </Text>
          )}
        </>
      )}
    </>
  )
}

// Main Component
export function GenomicVisualization3D({
  width = 800,
  height = 600,
  autoRotate = false,
  showLabels = false,
  showClinicalOutcomes = false,
  className = "",
}) {
  const [activeVariantId, setActiveVariantId] = useState(null)
  const [activeOutcomeId, setActiveOutcomeId] = useState(null)
  const [showInfo, setShowInfo] = useState(false)
  const [selectedElement, setSelectedElement] = useState(null)
  const [cameraPosition, setCameraPosition] = useState([0, 0, 3])
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showConnections, setShowConnections] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Handle variant selection
  const handleSelectVariant = (variant) => {
    setActiveVariantId(variant.id)
    setActiveOutcomeId(null)
    setSelectedElement(variant)
    setShowInfo(true)
  }

  // Handle outcome selection
  const handleSelectOutcome = (outcome) => {
    setActiveOutcomeId(outcome.id)
    setActiveVariantId(null)
    setSelectedElement(outcome)
    setShowInfo(true)
  }

  // Handle zoom
  const handleZoom = (direction) => {
    setZoomLevel((prev) => {
      const newZoom = direction === "in" ? Math.min(prev + 0.2, 2.5) : Math.max(prev - 0.2, 0.5)
      return newZoom
    })
  }

  // Handle reset view
  const handleResetView = () => {
    setCameraPosition([0, 0, 3])
    setZoomLevel(1)
  }

  // Handle fullscreen toggle
  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Close info panel
  const handleCloseInfo = () => {
    setShowInfo(false)
    setSelectedElement(null)
    setActiveVariantId(null)
    setActiveOutcomeId(null)
  }

  // Get significance badge color
  const getSignificanceBadgeColor = (significance) => {
    switch (significance) {
      case "Pathogenic":
        return "bg-red-500"
      case "Likely Pathogenic":
        return "bg-orange-500"
      case "Risk factor":
        return "bg-yellow-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <div
      className={`relative ${isFullscreen ? "fixed inset-0 z-50 bg-black" : ""} ${className}`}
      style={{ width: isFullscreen ? "100%" : width, height: isFullscreen ? "100%" : height }}
    >
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-gray-900/50 border-gray-700 text-white hover:bg-gray-800"
          onClick={() => handleZoom("in")}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-gray-900/50 border-gray-700 text-white hover:bg-gray-800"
          onClick={() => handleZoom("out")}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-gray-900/50 border-gray-700 text-white hover:bg-gray-800"
          onClick={handleResetView}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-gray-900/50 border-gray-700 text-white hover:bg-gray-800"
          onClick={handleFullscreenToggle}
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-gray-900/50 backdrop-blur-sm p-2 rounded border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-white">Pathogenic Variant</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs text-white">Risk Factor</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs text-white">Common Variant</span>
          </div>
          {showClinicalOutcomes && (
            <>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 transform rotate-45 bg-green-500"></div>
                <span className="text-xs text-white">Positive Outcome</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 transform rotate-45 bg-orange-500"></div>
                <span className="text-xs text-white">Negative Outcome</span>
              </div>
            </>
          )}
        </div>

        {/* Connection toggle */}
        {showClinicalOutcomes && (
          <div className="mt-2 bg-gray-900/50 backdrop-blur-sm p-2 rounded border border-gray-700">
            <div className="flex items-center gap-2">
              <Switch id="show-connections" checked={showConnections} onCheckedChange={setShowConnections} />
              <Label htmlFor="show-connections" className="text-xs text-white">
                Show Connections
              </Label>
            </div>
          </div>
        )}
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <Scene
          showLabels={showLabels}
          showClinicalOutcomes={showClinicalOutcomes}
          onSelectVariant={handleSelectVariant}
          onSelectOutcome={handleSelectOutcome}
          activeVariantId={activeVariantId}
          activeOutcomeId={activeOutcomeId}
          showConnections={showConnections}
        />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          minDistance={1.5 * zoomLevel}
          maxDistance={5 * zoomLevel}
        />
      </Canvas>

      {/* Info Panel */}
      {showInfo && selectedElement && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg border border-gray-700 max-w-md mx-auto"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-medium flex items-center">
                {"gene" in selectedElement ? (
                  <>
                    <Dna className="h-5 w-5 mr-2 text-green-500" />
                    {selectedElement.gene}
                  </>
                ) : (
                  <>
                    <Activity className="h-5 w-5 mr-2 text-blue-500" />
                    {selectedElement.name}
                  </>
                )}
              </h3>
              {"variant" in selectedElement && <p className="text-sm text-gray-300">{selectedElement.variant}</p>}
            </div>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" onClick={handleCloseInfo}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {"gene" in selectedElement ? (
            // Variant info
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Significance:</span>
                <Badge className={getSignificanceBadgeColor(selectedElement.significance)}>
                  {selectedElement.significance}
                </Badge>
              </div>
              <div>
                <span className="text-sm text-gray-400">Position:</span>
                <p className="text-sm">{selectedElement.position}</p>
              </div>
              <div>
                <span className="text-sm text-gray-400">Condition:</span>
                <p className="text-sm">{selectedElement.condition}</p>
              </div>
              <div>
                <span className="text-sm text-gray-400">Population Frequency:</span>
                <p className="text-sm">{(selectedElement.frequency * 100).toFixed(4)}%</p>
              </div>

              {/* Related outcomes */}
              {showClinicalOutcomes && (
                <div>
                  <span className="text-sm text-gray-400">Related Clinical Outcomes:</span>
                  <div className="mt-1 space-y-1">
                    {CLINICAL_OUTCOMES.filter((o) => o.relatedVariants.includes(selectedElement.id)).map((outcome) => (
                      <div
                        key={outcome.id}
                        className="flex justify-between items-center p-2 bg-gray-800 rounded cursor-pointer hover:bg-gray-700"
                        onClick={() => handleSelectOutcome(outcome)}
                      >
                        <span className="text-xs">{outcome.name}</span>
                        <Badge className={outcome.probability > 0.5 ? "bg-green-500" : "bg-orange-500"}>
                          {Math.round(outcome.probability * 100)}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Outcome info
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-400">Description:</span>
                <p className="text-sm">{selectedElement.description}</p>
              </div>
              <div>
                <span className="text-sm text-gray-400">Probability:</span>
                <div className="flex items-center gap-2">
                  <Slider value={[selectedElement.probability * 100]} max={100} step={1} disabled className="w-full" />
                  <span className="text-sm font-medium">{Math.round(selectedElement.probability * 100)}%</span>
                </div>
              </div>

              {/* Related variants */}
              <div>
                <span className="text-sm text-gray-400">Related Genomic Variants:</span>
                <div className="mt-1 space-y-1">
                  {selectedElement.relatedVariants.map((varId) => {
                    const variant = GENOMIC_VARIANTS.find((v) => v.id === varId)
                    if (!variant) return null

                    return (
                      <div
                        key={variant.id}
                        className="flex justify-between items-center p-2 bg-gray-800 rounded cursor-pointer hover:bg-gray-700"
                        onClick={() => handleSelectVariant(variant)}
                      >
                        <div>
                          <span className="text-xs font-medium">{variant.gene}</span>
                          <p className="text-xs text-gray-400">{variant.variant}</p>
                        </div>
                        <Badge className={getSignificanceBadgeColor(variant.significance)}>
                          {variant.significance}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
