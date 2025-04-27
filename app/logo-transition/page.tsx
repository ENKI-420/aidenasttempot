import { TransitioningLogo } from "@/components/transitioning-logo"
import DashboardNav from "@/components/dashboard-nav"

export default function LogoTransitionPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardNav />

      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">AIDEN Logo Transition</h1>
          <p className="text-gray-400 mb-8">
            Experience smooth transitions between 2D and 3D versions of the AIDEN logo. Use the controls below to switch
            between versions.
          </p>

          <div className="bg-gray-900 border border-green-900/40 rounded-lg p-8">
            <TransitioningLogo width={400} height={400} size={120} className="mx-auto" />
          </div>

          <div className="mt-8 bg-gray-900 border border-green-900/40 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 mb-4">
              This transitioning logo uses advanced animation techniques to create smooth transitions between the 2D and
              3D versions of the AIDEN logo:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Framer Motion for smooth, physics-based animations</li>
              <li>3D rotation effects that create a sense of depth during transitions</li>
              <li>Carefully timed component mounting and unmounting</li>
              <li>Optimized Three.js rendering for the 3D version</li>
              <li>Responsive design that works across all device sizes</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
