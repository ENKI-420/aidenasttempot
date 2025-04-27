import { LogoShowcase } from "@/components/logo-showcase"
import DashboardNav from "@/components/dashboard-nav"

export default function LogoShowcasePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardNav />

      <main className="container mx-auto py-8 px-4 md:px-6">
        <LogoShowcase />
      </main>
    </div>
  )
}
