import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bot, Key, BarChart3, Clock, Zap, Plus, Settings, Users } from "lucide-react"
import Link from "next/link"
import DashboardNav from "@/components/dashboard-nav"
import BotUsageChart from "@/components/bot-usage-chart"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardNav />

      <main className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-gray-400 mt-1">Monitor and manage your AI bots and API usage.</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Link href="/bots/create">
              <Button className="bg-green-600 hover:bg-green-700 text-black">
                <Plus className="mr-2 h-4 w-4" /> New Bot
              </Button>
            </Link>
            <Link href="/api-keys/create">
              <Button variant="outline" className="border-green-700 text-green-500 hover:bg-green-900/20">
                <Key className="mr-2 h-4 w-4" /> Generate API Key
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="bg-gray-900 border-green-900/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Bots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">12</div>
                <Bot className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-xs text-gray-400 mt-2">+2 from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-green-900/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">API Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">1.2M</div>
                <Zap className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-xs text-gray-400 mt-2">+15% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-green-900/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Active API Keys</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">8</div>
                <Key className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-xs text-gray-400 mt-2">3 keys expiring soon</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="usage" className="mb-8">
          <TabsList className="bg-gray-900 border border-green-900/40">
            <TabsTrigger
              value="usage"
              className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Usage
            </TabsTrigger>
            <TabsTrigger
              value="bots"
              className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500"
            >
              <Bot className="h-4 w-4 mr-2" />
              Bots
            </TabsTrigger>
            <TabsTrigger
              value="keys"
              className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500"
            >
              <Key className="h-4 w-4 mr-2" />
              API Keys
            </TabsTrigger>
          </TabsList>

          <TabsContent value="usage" className="mt-6">
            <Card className="bg-gray-900 border-green-900/40">
              <CardHeader>
                <CardTitle>API Usage</CardTitle>
                <CardDescription className="text-gray-400">Your API usage over the last 30 days.</CardDescription>
              </CardHeader>
              <CardContent>
                <BotUsageChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bots" className="mt-6">
            <Card className="bg-gray-900 border-green-900/40">
              <CardHeader>
                <CardTitle>Your Bots</CardTitle>
                <CardDescription className="text-gray-400">Manage and monitor your AI bots.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((bot) => (
                    <div
                      key={bot}
                      className="flex items-center justify-between p-4 bg-black rounded-lg border border-green-900/40"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-green-900/20 p-2 rounded-full">
                          <Bot className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">DataProcessor-{bot}</h3>
                          <p className="text-sm text-gray-400">Last active: 2h ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-green-900/40 hover:border-green-500/40 text-gray-400 hover:text-green-500"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Link href={`/bots/${bot}`}>
                          <Button size="sm" className="h-8 bg-green-900/20 hover:bg-green-900/40 text-green-500">
                            Manage
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link href="/bots">
                    <Button variant="link" className="text-green-500 hover:text-green-400">
                      View all bots
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keys" className="mt-6">
            <Card className="bg-gray-900 border-green-900/40">
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription className="text-gray-400">Manage your API keys and permissions.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((key) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 bg-black rounded-lg border border-green-900/40"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-green-900/20 p-2 rounded-full">
                          <Key className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">API Key {key}</h3>
                          <p className="text-sm text-gray-400">
                            Created: {key === 1 ? "2 days ago" : key === 2 ? "1 week ago" : "1 month ago"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-green-900/40 hover:border-green-500/40 text-gray-400 hover:text-green-500"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Link href={`/api-keys/${key}`}>
                          <Button size="sm" className="h-8 bg-green-900/20 hover:bg-green-900/40 text-green-500">
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link href="/api-keys">
                    <Button variant="link" className="text-green-500 hover:text-green-400">
                      View all API keys
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-gray-900 border-green-900/40">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription className="text-gray-400">Your recent bot and API activity.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { icon: Bot, text: "DataProcessor-1 processed 2.5GB file", time: "2 hours ago" },
                  { icon: Key, text: "New API key generated", time: "Yesterday" },
                  { icon: Users, text: "Added team member to project", time: "2 days ago" },
                  { icon: Bot, text: "TextAnalyzer-3 updated to v2.1", time: "3 days ago" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="bg-green-900/20 p-2 rounded-full mt-0.5">
                      <activity.icon className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm">{activity.text}</p>
                      <p className="text-xs text-gray-400 mt-1 flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-green-900/40">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription className="text-gray-400">Common tasks and shortcuts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/bots/create">
                  <Button
                    variant="outline"
                    className="w-full h-auto py-4 flex flex-col items-center justify-center gap-2 border-green-900/40 hover:border-green-500/40 hover:bg-green-900/10"
                  >
                    <Bot className="h-5 w-5 text-green-500" />
                    <span>Create Bot</span>
                  </Button>
                </Link>
                <Link href="/api-keys/create">
                  <Button
                    variant="outline"
                    className="w-full h-auto py-4 flex flex-col items-center justify-center gap-2 border-green-900/40 hover:border-green-500/40 hover:bg-green-900/10"
                  >
                    <Key className="h-5 w-5 text-green-500" />
                    <span>Generate Key</span>
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button
                    variant="outline"
                    className="w-full h-auto py-4 flex flex-col items-center justify-center gap-2 border-green-900/40 hover:border-green-500/40 hover:bg-green-900/10"
                  >
                    <BarChart3 className="h-5 w-5 text-green-500" />
                    <span>View Docs</span>
                  </Button>
                </Link>
                <Link href="/settings">
                  <Button
                    variant="outline"
                    className="w-full h-auto py-4 flex flex-col items-center justify-center gap-2 border-green-900/40 hover:border-green-500/40 hover:bg-green-900/10"
                  >
                    <Settings className="h-5 w-5 text-green-500" />
                    <span>Settings</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
