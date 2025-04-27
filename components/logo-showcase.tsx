"use client"

import { useState } from "react"
import { AidenLogo3D } from "./aiden-logo-3d"
import { AidenLogoAnimated } from "./aiden-logo-animated"
import { AidenLogoLargeAnimated } from "./aiden-logo-large-animated"
import { TransitioningLogo } from "./transitioning-logo"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { CuboidIcon as Cube, RotateCcw, Maximize2, Minimize2, Repeat } from "lucide-react"

export function LogoShowcase() {
  const [size, setSize] = useState(300)
  const [autoRotate, setAutoRotate] = useState(true)
  const [showText, setShowText] = useState(true)
  const [fullscreen, setFullscreen] = useState(false)

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen)
    if (!fullscreen) {
      setSize(window.innerWidth > 768 ? 600 : 350)
    } else {
      setSize(300)
    }
  }

  return (
    <div className="w-full">
      <Tabs defaultValue="transition" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">AIDEN Logo Showcase</h2>
          <TabsList className="bg-gray-900 border border-green-900/40">
            <TabsTrigger
              value="transition"
              className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500"
            >
              <Repeat className="mr-2 h-4 w-4" />
              Transition
            </TabsTrigger>
            <TabsTrigger value="3d" className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500">
              <Cube className="mr-2 h-4 w-4" />
              3D Logo
            </TabsTrigger>
            <TabsTrigger value="2d" className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500">
              2D Logos
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="transition" className="mt-0">
          <div className="bg-gray-900 border border-green-900/40 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Transitioning Logo</h3>
            <p className="text-gray-400 mb-6">
              Experience smooth transitions between 2D and 3D versions of the AIDEN logo. Use the controls below to
              switch between versions.
            </p>

            <div className="flex flex-col items-center justify-center">
              <TransitioningLogo
                width={size}
                height={size}
                size={size / 3}
                autoRotate={autoRotate}
                showText={showText}
                className="mb-6"
              />

              <div className="w-full max-w-md space-y-6 mt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="transition-size-slider">Size</Label>
                    <span className="text-sm text-gray-400">{size}px</span>
                  </div>
                  <Slider
                    id="transition-size-slider"
                    min={200}
                    max={500}
                    step={10}
                    value={[size]}
                    onValueChange={(value) => setSize(value[0])}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4 text-green-500" />
                    <Label htmlFor="transition-auto-rotate">Auto Rotate (3D)</Label>
                  </div>
                  <Switch id="transition-auto-rotate" checked={autoRotate} onCheckedChange={setAutoRotate} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="transition-show-text">Show Text (3D)</Label>
                  <Switch id="transition-show-text" checked={showText} onCheckedChange={setShowText} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gray-900 border border-green-900/40 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">About the Transitioning Logo</h3>
            <p className="text-gray-400 mb-4">
              This component demonstrates smooth transitions between 2D and 3D versions of the AIDEN logo. It features:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
              <li>Smooth animations using Framer Motion</li>
              <li>3D rotation effects during transitions</li>
              <li>Seamless switching between different logo versions</li>
              <li>Responsive design that adapts to different screen sizes</li>
              <li>Interactive controls for customizing the experience</li>
            </ul>
            <p className="text-gray-400">
              The transitions maintain visual continuity while showcasing both the simplicity of the 2D logo and the
              depth of the 3D version.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="3d" className="mt-0">
          <div
            className={`bg-gray-900 border border-green-900/40 rounded-lg p-6 ${fullscreen ? "fixed inset-0 z-50 flex flex-col justify-center items-center" : ""}`}
          >
            <div className="flex justify-end mb-4">
              <Button
                variant="outline"
                size="sm"
                className="border-green-900/40 text-green-500 hover:bg-green-900/20"
                onClick={toggleFullscreen}
              >
                {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                <span className="ml-2">{fullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
              </Button>
            </div>

            <div className="flex flex-col items-center justify-center">
              <AidenLogo3D width={size} height={size} autoRotate={autoRotate} showText={showText} className="mb-6" />

              {!fullscreen && (
                <div className="w-full max-w-md space-y-6 mt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="size-slider">Size</Label>
                      <span className="text-sm text-gray-400">{size}px</span>
                    </div>
                    <Slider
                      id="size-slider"
                      min={100}
                      max={500}
                      step={10}
                      value={[size]}
                      onValueChange={(value) => setSize(value[0])}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <RotateCcw className="h-4 w-4 text-green-500" />
                      <Label htmlFor="auto-rotate">Auto Rotate</Label>
                    </div>
                    <Switch id="auto-rotate" checked={autoRotate} onCheckedChange={setAutoRotate} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-text">Show Text</Label>
                    <Switch id="show-text" checked={showText} onCheckedChange={setShowText} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 bg-gray-900 border border-green-900/40 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">About the 3D Logo</h3>
            <p className="text-gray-400 mb-4">
              This 3D version of the AIDEN logo was created using Three.js and React Three Fiber. It features:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
              <li>Interactive 3D rendering with WebGL</li>
              <li>Responsive design that adapts to different screen sizes</li>
              <li>Hover and click animations for enhanced user experience</li>
              <li>Customizable parameters for size, rotation, and text display</li>
              <li>Optimized performance with efficient rendering techniques</li>
            </ul>
            <p className="text-gray-400">
              The 3D logo maintains the key visual elements of the 2D version while adding depth, perspective, and
              immersive animations.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="2d" className="mt-0">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-green-900/40 rounded-lg p-6 flex flex-col items-center">
              <h3 className="text-xl font-bold mb-4">Standard Logo</h3>
              <div className="bg-black p-8 rounded-lg mb-4 flex items-center justify-center">
                <AidenLogoAnimated size={64} />
              </div>
              <p className="text-gray-400 text-center">
                The standard animated AIDEN logo with interactive hover and click effects.
              </p>
            </div>

            <div className="bg-gray-900 border border-green-900/40 rounded-lg p-6 flex flex-col items-center">
              <h3 className="text-xl font-bold mb-4">Large Logo with Text</h3>
              <div className="bg-black p-8 rounded-lg mb-4 flex items-center justify-center">
                <AidenLogoLargeAnimated width={200} height={80} />
              </div>
              <p className="text-gray-400 text-center">The large version of the AIDEN logo with text and tagline.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
