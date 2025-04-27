"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text, MeshTransmissionMaterial, Environment } from "@react-three/drei"
import * as THREE from "three"
import { useRouter } from "next/navigation"

interface AidenLogo3DProps {
  className?: string
  width?: number
  height?: number
  autoRotate?: boolean
  interactive?: boolean
  showText?: boolean
  href?: string
  onClick?: () => void
}

// Main component that sets up the Canvas
export function AidenLogo3D({
  className = "",
  width = 300,
  height = 300,
  autoRotate = true,
  interactive = true,
  showText = true,
  href = "/",
  onClick,
}: AidenLogo3DProps) {
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (href) {
      router.push(href)
    }
  }

  return (
    <div
      className={`${className} relative cursor-pointer`}
      style={{ width, height }}
      onClick={interactive ? handleClick : undefined}
      role={interactive ? "button" : "presentation"}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleClick()
              }
            }
          : undefined
      }
    >
      <Canvas
        ref={canvasRef}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 15], fov: 35 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <LogoModel autoRotate={autoRotate} interactive={interactive} showText={showText} />
        <Environment preset="city" />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2 - 0.5}
          maxPolarAngle={Math.PI / 2 + 0.5}
        />
      </Canvas>
    </div>
  )
}

// The actual 3D model of the logo
function LogoModel({
  autoRotate,
  interactive,
  showText,
}: { autoRotate: boolean; interactive: boolean; showText: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const { clock } = useThree()

  // Handle hover and click states
  const handlePointerOver = () => interactive && setHovered(true)
  const handlePointerOut = () => {
    interactive && setHovered(false)
    interactive && setClicked(false)
  }
  const handlePointerDown = () => interactive && setClicked(true)
  const handlePointerUp = () => interactive && setClicked(false)

  // Animation loop
  useFrame(() => {
    if (!groupRef.current) return

    // Auto-rotation
    if (autoRotate) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.15
    }

    // Hover and click animations
    if (interactive) {
      // Scale up slightly when hovered
      groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, hovered ? 1.1 : 1, 0.1)
      groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, hovered ? 1.1 : 1, 0.1)
      groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, hovered ? 1.1 : 1, 0.1)

      // Scale down when clicked
      if (clicked) {
        groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, 0.95, 0.1)
        groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, 0.95, 0.1)
        groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, 0.95, 0.1)
      }
    }
  })

  return (
    <group
      ref={groupRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* Brain sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshStandardMaterial color="#0D1117" />
      </mesh>

      {/* Circuit overlay */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[3.05, 32, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          roughness={0.1}
          clearcoat={0.1}
          clearcoatRoughness={0.1}
          transmission={1}
          chromaticAberration={0.1}
          anisotropy={0.5}
          color="#10B981"
          opacity={0.1}
          transparent
        />
      </mesh>

      {/* Circuit lines */}
      <CircuitLines hovered={hovered} />

      {/* A letter */}
      <ALetter hovered={hovered} clicked={clicked} />

      {/* Digital nodes */}
      <Nodes hovered={hovered} clicked={clicked} />

      {/* AIDEN text */}
      {showText && <AidenText hovered={hovered} clicked={clicked} />}

      {/* Pulse effect */}
      <PulseEffect />
    </group>
  )
}

// Circuit lines component
function CircuitLines({ hovered }: { hovered: boolean }) {
  const linesRef = useRef<THREE.Group>(null)
  const { clock } = useThree()

  useFrame(() => {
    if (!linesRef.current) return

    // Pulse the opacity of the lines
    const lines = linesRef.current.children
    const t = clock.getElapsedTime()

    lines.forEach((line, i) => {
      const material = (line as THREE.Mesh).material as THREE.MeshStandardMaterial
      const pulseSpeed = 0.5 + i * 0.1
      const pulseIntensity = hovered ? 0.8 : 0.5
      material.opacity = 0.5 + Math.sin(t * pulseSpeed) * 0.2 * pulseIntensity
    })
  })

  return (
    <group ref={linesRef}>
      {/* Vertical lines */}
      <mesh position={[0, 3.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
        <meshStandardMaterial color="#10B981" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, -3.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
        <meshStandardMaterial color="#10B981" transparent opacity={0.7} />
      </mesh>

      {/* Horizontal lines */}
      <mesh position={[3.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
        <meshStandardMaterial color="#10B981" transparent opacity={0.7} />
      </mesh>
      <mesh position={[-3.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
        <meshStandardMaterial color="#10B981" transparent opacity={0.7} />
      </mesh>

      {/* Diagonal lines */}
      <mesh position={[2.5, 2.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
        <meshStandardMaterial color="#10B981" transparent opacity={0.7} />
      </mesh>
      <mesh position={[-2.5, 2.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
        <meshStandardMaterial color="#10B981" transparent opacity={0.7} />
      </mesh>
      <mesh position={[2.5, -2.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
        <meshStandardMaterial color="#10B981" transparent opacity={0.7} />
      </mesh>
      <mesh position={[-2.5, -2.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
        <meshStandardMaterial color="#10B981" transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

// A letter component
function ALetter({ hovered, clicked }: { hovered: boolean; clicked: boolean }) {
  const aRef = useRef<THREE.Group>(null)
  const { clock } = useThree()

  useFrame(() => {
    if (!aRef.current) return

    // Subtle floating animation
    const t = clock.getElapsedTime()
    aRef.current.position.y = Math.sin(t * 0.5) * 0.1

    // Update material color based on interaction state
    const material = (aRef.current.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial

    if (clicked) {
      material.color.set("#0ea5e9") // Blue when clicked
      material.emissive.set("#0ea5e9")
      material.emissiveIntensity = 0.5
    } else if (hovered) {
      material.color.set("#10B981") // Green when hovered
      material.emissive.set("#10B981")
      material.emissiveIntensity = 0.3
    } else {
      material.color.set("#10B981") // Default green
      material.emissive.set("#10B981")
      material.emissiveIntensity = 0.1
    }
  })

  return (
    <group ref={aRef} position={[0, 0, 0.1]}>
      {/* A letter main shape */}
      <mesh>
        <torusGeometry args={[1.5, 0.15, 16, 100, Math.PI]} />
        <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.1} />
      </mesh>

      {/* A letter crossbar */}
      <mesh position={[0, -0.5, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.15, 0.15]} />
        <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.1} />
      </mesh>
    </group>
  )
}

// Digital nodes component
function Nodes({ hovered, clicked }: { hovered: boolean; clicked: boolean }) {
  const nodesRef = useRef<THREE.Group>(null)
  const { clock } = useThree()

  useFrame(() => {
    if (!nodesRef.current) return

    const t = clock.getElapsedTime()

    // Animate each node
    nodesRef.current.children.forEach((node, i) => {
      const mesh = node as THREE.Mesh
      const material = mesh.material as THREE.MeshStandardMaterial

      // Pulse scale
      const scale = 1 + Math.sin(t * 0.5 + i * 0.5) * 0.1
      mesh.scale.set(scale, scale, scale)

      // Update color based on interaction
      if (clicked) {
        material.color.set("#0ea5e9") // Blue when clicked
        material.emissive.set("#0ea5e9")
        material.emissiveIntensity = 0.5
      } else if (hovered) {
        material.color.set("#10B981") // Green when hovered
        material.emissive.set("#10B981")
        material.emissiveIntensity = 0.3
      } else {
        material.color.set("#10B981") // Default green
        material.emissive.set("#10B981")
        material.emissiveIntensity = 0.1
      }
    })
  })

  return (
    <group ref={nodesRef}>
      {/* Top node */}
      <mesh position={[0, 1.5, 0.2]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.1} />
      </mesh>

      {/* Bottom left node */}
      <mesh position={[-1.3, -1.3, 0.2]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.1} />
      </mesh>

      {/* Bottom right node */}
      <mesh position={[1.3, -1.3, 0.2]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.1} />
      </mesh>

      {/* Crossbar left node */}
      <mesh position={[-0.6, -0.5, 0.2]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.1} />
      </mesh>

      {/* Crossbar right node */}
      <mesh position={[0.6, -0.5, 0.2]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.1} />
      </mesh>
    </group>
  )
}

// AIDEN text component
function AidenText({ hovered, clicked }: { hovered: boolean; clicked: boolean }) {
  const textRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!textRef.current) return

    // Move text position based on interaction
    if (clicked) {
      textRef.current.position.y = -4.2
    } else if (hovered) {
      textRef.current.position.y = -4.1
    } else {
      textRef.current.position.y = -4
    }
  })

  return (
    <group ref={textRef} position={[0, -4, 0]}>
      <Text
        position={[0, 0, 0]}
        fontSize={1}
        color={clicked ? "#0ea5e9" : hovered ? "#10B981" : "#10B981"}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        AIDEN
      </Text>
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.3}
        color="#8B949E"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Regular.woff"
      >
        Advanced AI Platform
      </Text>
    </group>
  )
}

// Pulse effect component
function PulseEffect() {
  const pulseRef = useRef<THREE.Mesh>(null)
  const { clock } = useThree()

  useFrame(() => {
    if (!pulseRef.current) return

    const t = clock.getElapsedTime()
    const scale = 1 + Math.sin(t * 0.5) * 0.05

    pulseRef.current.scale.set(scale, scale, scale)

    const material = pulseRef.current.material as THREE.MeshStandardMaterial
    material.opacity = 0.1 + Math.sin(t * 0.5) * 0.05
  })

  return (
    <mesh ref={pulseRef} position={[0, 0, 0]}>
      <sphereGeometry args={[3.2, 32, 32]} />
      <meshStandardMaterial color="#10B981" transparent opacity={0.1} />
    </mesh>
  )
}
