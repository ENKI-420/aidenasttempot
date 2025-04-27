import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bot, Plus, Search, Settings, Zap, ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import DashboardNav from "@/components/dashboard-nav"

export default function Bots() {
  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardNav />

      <main className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Bots</h1>
            <p className="text-gray-400 mt-1">Create and manage your AI bots.</p>
          </div>
          <Link href="/bots/create" className="mt-4 md:mt-0">
            <Button className="bg-green-600 hover:bg-green-700 text-black">
              <Plus className="mr-2 h-4 w-4" /> Create New Bot
            </Button>
          </Link>
        </div>

        <div className="flex items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search bots..."
              className="pl-10 bg-black border-green-900/40 focus:border-green-500/40 text-white"
            />
          </div>
          <Button
            variant="outline"
            className="ml-4 border-green-900/40 text-gray-400 hover:text-green-500 hover:border-green-500/40"
          >
            <ArrowUpDown className="h-4 w-4 mr-2" /> Sort
          </Button>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-gray-900 border border-green-900/40">
            <TabsTrigger value="all" className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500">
              All Bots
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="inactive"
              className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500"
            >
              Inactive
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "DataProcessor-1",
                  type: "Data Processing",
                  status: "Active",
                  requests: "1.2M",
                  lastActive: "2h ago",
                },
                {
                  name: "TextAnalyzer-3",
                  type: "Text Analysis",
                  status: "Active",
                  requests: "850K",
                  lastActive: "1d ago",
                },
                {
                  name: "ImageGen-2",
                  type: "Image Generation",
                  status: "Active",
                  requests: "450K",
                  lastActive: "5h ago",
                },
                {
                  name: "CodeAssistant",
                  type: "Code Generation",
                  status: "Inactive",
                  requests: "320K",
                  lastActive: "5d ago",
                },
                {
                  name: "AudioTranscriber",
                  type: "Audio Processing",
                  status: "Active",
                  requests: "210K",
                  lastActive: "12h ago",
                },
                {
                  name: "SentimentAnalyzer",
                  type: "Text Analysis",
                  status: "Inactive",
                  requests: "180K",
                  lastActive: "2w ago",
                },
              ].map((bot, i) => (
                <Card key={i} className="bg-gray-900 border-green-900/40 hover:border-green-500/40 transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-2 rounded-full ${bot.status === "Active" ? "bg-green-900/20" : "bg-gray-800"}`}
                        >
                          <Bot className={`h-5 w-5 ${bot.status === "Active" ? "text-green-500" : "text-gray-400"}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{bot.name}</CardTitle>
                          <CardDescription className="text-gray-400">{bot.type}</CardDescription>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-green-500">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Status</p>
                          <p className={`font-medium ${bot.status === "Active" ? "text-green-500" : "text-gray-400"}`}>
                            {bot.status}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">Requests</p>
                          <p className="font-medium">{bot.requests}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Last Active</p>
                          <p className="font-medium">{bot.lastActive}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Version</p>
                          <p className="font-medium">v1.{i + 1}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Link href={`/bots/${i}`} className="flex-1">
                          <Button
                            variant="outline"
                            className="w-full border-green-900/40 hover:border-green-500/40 hover:bg-green-900/10 text-green-500"
                          >
                            Manage
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-gray-400 hover:text-green-500 hover:bg-green-900/10"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-gray-900 border-green-900/40 border-dashed hover:border-green-500/40 transition-all">
                <CardContent className="flex flex-col items-center justify-center h-full py-10">
                  <div className="bg-green-900/10 p-3 rounded-full mb-4">
                    <Plus className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="font-medium mb-2">Create New Bot</h3>
                  <p className="text-gray-400 text-sm text-center mb-4">
                    Build a custom AI bot for your specific needs
                  </p>
                  <Link href="/bots/create">
                    <Button className="bg-green-600 hover:bg-green-700 text-black">Get Started</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="active" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "DataProcessor-1",
                  type: "Data Processing",
                  status: "Active",
                  requests: "1.2M",
                  lastActive: "2h ago",
                },
                {
                  name: "TextAnalyzer-3",
                  type: "Text Analysis",
                  status: "Active",
                  requests: "850K",
                  lastActive: "1d ago",
                },
                {
                  name: "ImageGen-2",
                  type: "Image Generation",
                  status: "Active",
                  requests: "450K",
                  lastActive: "5h ago",
                },
                {
                  name: "AudioTranscriber",
                  type: "Audio Processing",
                  status: "Active",
                  requests: "210K",
                  lastActive: "12h ago",
                },
              ].map((bot, i) => (
                <Card key={i} className="bg-gray-900 border-green-900/40 hover:border-green-500/40 transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="bg-green-900/20 p-2 rounded-full">
                          <Bot className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{bot.name}</CardTitle>
                          <CardDescription className="text-gray-400">{bot.type}</CardDescription>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-green-500">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Status</p>
                          <p className="font-medium text-green-500">{bot.status}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Requests</p>
                          <p className="font-medium">{bot.requests}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Last Active</p>
                          <p className="font-medium">{bot.lastActive}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Version</p>
                          <p className="font-medium">v1.{i + 1}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Link href={`/bots/${i}`} className="flex-1">
                          <Button
                            variant="outline"
                            className="w-full border-green-900/40 hover:border-green-500/40 hover:bg-green-900/10 text-green-500"
                          >
                            Manage
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-gray-400 hover:text-green-500 hover:bg-green-900/10"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inactive" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "CodeAssistant",
                  type: "Code Generation",
                  status: "Inactive",
                  requests: "320K",
                  lastActive: "5d ago",
                },
                {
                  name: "SentimentAnalyzer",
                  type: "Text Analysis",
                  status: "Inactive",
                  requests: "180K",
                  lastActive: "2w ago",
                },
              ].map((bot, i) => (
                <Card key={i} className="bg-gray-900 border-green-900/40 hover:border-green-500/40 transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-800 p-2 rounded-full">
                          <Bot className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{bot.name}</CardTitle>
                          <CardDescription className="text-gray-400">{bot.type}</CardDescription>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-green-500">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Status</p>
                          <p className="font-medium text-gray-400">{bot.status}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Requests</p>
                          <p className="font-medium">{bot.requests}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Last Active</p>
                          <p className="font-medium">{bot.lastActive}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Version</p>
                          <p className="font-medium">v1.{i + 1}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1 bg-green-900/20 hover:bg-green-900/40 text-green-500">
                          <Zap className="mr-2 h-4 w-4" /> Activate
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-gray-400 hover:text-green-500 hover:bg-green-900/10"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
