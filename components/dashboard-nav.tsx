"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  Key,
  Settings,
  Bell,
  Menu,
  X,
  LogOut,
  HelpCircle,
  CuboidIcon as Cube,
  Repeat,
  Brain,
  Activity,
  ClipboardList,
  Clock,
} from "lucide-react"
import { useState } from "react"
import { AidenLogoAnimated } from "./aiden-logo-animated"
import { ClickableLogo } from "./clickable-logo"

export default function DashboardNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-green-900/40 bg-black">
      <div className="container mx-auto py-3 px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <ClickableLogo href="/" />

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-gray-400 hover:text-green-500 transition flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link href="/bots" className="text-gray-400 hover:text-green-500 transition flex items-center gap-2">
                <AidenLogoAnimated className="h-4 w-4" interactive={false} />
                Bots
              </Link>
              <Link href="/api-keys" className="text-gray-400 hover:text-green-500 transition flex items-center gap-2">
                <Key className="h-4 w-4" />
                API Keys
              </Link>
              <Link
                href="/agent-collaboration"
                className="text-gray-400 hover:text-green-500 transition flex items-center gap-2"
              >
                <Brain className="h-4 w-4" />
                Agent Collaboration
              </Link>
              <Link
                href="/genomic-visualization"
                className="text-gray-400 hover:text-green-500 transition flex items-center gap-2"
              >
                <Activity className="h-4 w-4" />
                Genomic Visualization
              </Link>
              <Link
                href="/patient-case-studies"
                className="text-gray-400 hover:text-green-500 transition flex items-center gap-2"
              >
                <ClipboardList className="h-4 w-4" />
                Patient Cases
              </Link>
              <Link
                href="/logo-showcase"
                className="text-gray-400 hover:text-green-500 transition flex items-center gap-2"
              >
                <Cube className="h-4 w-4" />
                Logo Showcase
              </Link>
              <Link
                href="/logo-transition"
                className="text-gray-400 hover:text-green-500 transition flex items-center gap-2"
              >
                <Repeat className="h-4 w-4" />
                Logo Transition
              </Link>
              <Link
                href="/comparative-genomics"
                className="text-gray-400 hover:text-green-500 transition flex items-center gap-2"
              >
                <Brain className="h-4 w-4" />
                Comparative Genomics
              </Link>
              <Link href="/settings" className="text-gray-400 hover:text-green-500 transition flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <Link
                href="/genomic-timeline"
                className="text-gray-400 hover:text-green-500 transition flex items-center gap-2"
              >
                <Clock className="h-4 w-4" />
                Genomic Timeline
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-green-500 hover:bg-green-900/10">
              <Bell className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-green-500 hover:bg-green-900/10 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback className="bg-green-900/20 text-green-500">UN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-900 border-green-900/40 text-white" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">username@example.com</p>
                    <p className="text-xs text-gray-400">Pro Plan</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-green-900/40" />
                <DropdownMenuItem className="hover:bg-green-900/20 hover:text-green-500 cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-green-900/20 hover:text-green-500 cursor-pointer">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-green-900/40" />
                <DropdownMenuItem className="hover:bg-green-900/20 hover:text-red-500 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-green-900/40 bg-gray-900">
          <nav className="flex flex-col py-4 px-6">
            <Link href="/dashboard" className="flex items-center gap-2 py-3 text-gray-400 hover:text-green-500">
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link href="/bots" className="flex items-center gap-2 py-3 text-gray-400 hover:text-green-500">
              <AidenLogoAnimated className="h-5 w-5" interactive={false} />
              Bots
            </Link>
            <Link href="/api-keys" className="flex items-center gap-2 py-3 text-gray-400 hover:text-green-500">
              <Key className="h-5 w-5" />
              API Keys
            </Link>
            <Link
              href="/agent-collaboration"
              className="flex items-center gap-2 py-3 text-gray-400 hover:text-green-500"
            >
              <Brain className="h-5 w-5" />
              Agent Collaboration
            </Link>
            <Link
              href="/genomic-visualization"
              className="flex items-center gap-2 py-3 text-gray-400 hover:text-green-500"
            >
              <Activity className="h-5 w-5" />
              Genomic Visualization
            </Link>
            <Link
              href="/patient-case-studies"
              className="flex items-center gap-2 py-3 text-gray-400 hover:text-green-500"
            >
              <ClipboardList className="h-5 w-5" />
              Patient Cases
            </Link>
            <Link href="/logo-showcase" className="flex items-center gap-2 py-3 text-gray-400 hover:text-green-500">
              <Cube className="h-5 w-5" />
              Logo Showcase
            </Link>
            <Link href="/logo-transition" className="flex items-center gap-2 py-3 text-gray-400 hover:text-green-500">
              <Repeat className="h-5 w-5" />
              Logo Transition
            </Link>
            <Link
              href="/comparative-genomics"
              className="flex items-center gap-2 py-3 text-gray-400 hover:text-green-500"
            >
              <Brain className="h-5 w-5" />
              Comparative Genomics
            </Link>
            <Link href="/settings" className="flex items-center gap-2 py-3 text-gray-400 hover:text-green-500">
              <Settings className="h-5 w-5" />
              Settings
            </Link>
            <Link href="/genomic-timeline" className="flex items-center gap-2 py-3 text-gray-400 hover:text-green-500">
              <Clock className="h-5 w-5" />
              Genomic Timeline
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
