import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Code, Database, FileText, Upload, Zap } from "lucide-react"
import Link from "next/link"
import DashboardNav from "@/components/dashboard-nav"

export default function CreateBot() {
  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardNav />

      <main className="container mx-auto py-6 px-4 md:px-6">
        <div className="mb-8">
          <Link href="/bots" className="text-gray-400 hover:text-green-500 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Bots
          </Link>
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Create New Bot</h1>
          <p className="text-gray-400 mb-8">Configure and deploy a new AI bot for your specific needs.</p>

          <Tabs defaultValue="basic" className="mb-8">
            <TabsList className="bg-gray-900 border border-green-900/40 mb-6">
              <TabsTrigger
                value="basic"
                className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500"
              >
                Basic Info
              </TabsTrigger>
              <TabsTrigger
                value="capabilities"
                className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500"
              >
                Capabilities
              </TabsTrigger>
              <TabsTrigger
                value="training"
                className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500"
              >
                Training
              </TabsTrigger>
              <TabsTrigger
                value="deployment"
                className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-500"
              >
                Deployment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <div className="grid gap-8 md:grid-cols-2">
                <Card className="bg-gray-900 border-green-900/40">
                  <CardHeader>
                    <CardTitle>Bot Information</CardTitle>
                    <CardDescription className="text-gray-400">Basic information about your AI bot.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="bot-name">Bot Name</Label>
                      <Input
                        id="bot-name"
                        placeholder="e.g., DataProcessor-1"
                        className="bg-black border-green-900/40 focus:border-green-500/40 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bot-type">Bot Type</Label>
                      <Select>
                        <SelectTrigger className="bg-black border-green-900/40 focus:border-green-500/40 text-white">
                          <SelectValue placeholder="Select bot type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-green-900/40 text-white">
                          <SelectItem value="data">Data Processing</SelectItem>
                          <SelectItem value="text">Text Analysis</SelectItem>
                          <SelectItem value="image">Image Generation</SelectItem>
                          <SelectItem value="code">Code Generation</SelectItem>
                          <SelectItem value="audio">Audio Processing</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what your bot does..."
                        className="bg-black border-green-900/40 focus:border-green-500/40 text-white min-h-[120px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="model">Base Model</Label>
                      <Select>
                        <SelectTrigger className="bg-black border-green-900/40 focus:border-green-500/40 text-white">
                          <SelectValue placeholder="Select base model" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-green-900/40 text-white">
                          <SelectItem value="nexus-1">Nexus-1 (General Purpose)</SelectItem>
                          <SelectItem value="nexus-2">Nexus-2 (Advanced)</SelectItem>
                          <SelectItem value="nexus-data">Nexus-Data (Data Specialized)</SelectItem>
                          <SelectItem value="nexus-code">Nexus-Code (Code Specialized)</SelectItem>
                          <SelectItem value="custom">Custom Model</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-green-900/40">
                  <CardHeader>
                    <CardTitle>Configuration</CardTitle>
                    <CardDescription className="text-gray-400">
                      Configure your bot's behavior and settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="max-tokens">Maximum Tokens</Label>
                      <Input
                        id="max-tokens"
                        type="number"
                        placeholder="e.g., 2048"
                        className="bg-black border-green-900/40 focus:border-green-500/40 text-white"
                      />
                      <p className="text-xs text-gray-400">
                        Maximum number of tokens the bot can process in a single request.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="temperature">Temperature</Label>
                      <Input id="temperature" type="range" min="0" max="1" step="0.1" className="accent-green-500" />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Precise (0)</span>
                        <span>Creative (1)</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="streaming" className="flex-1">
                          Enable Streaming
                        </Label>
                        <Switch id="streaming" defaultChecked />
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Stream responses in real-time instead of waiting for complete responses.
                      </p>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="logging" className="flex-1">
                          Enable Logging
                        </Label>
                        <Switch id="logging" defaultChecked />
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Log all requests and responses for monitoring and debugging.
                      </p>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="rate-limit" className="flex-1">
                          Rate Limiting
                        </Label>
                        <Switch id="rate-limit" />
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Limit the number of requests this bot can process per minute.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="capabilities">
              <div className="grid gap-8 md:grid-cols-2">
                <Card className="bg-gray-900 border-green-900/40">
                  <CardHeader>
                    <CardTitle>Bot Capabilities</CardTitle>
                    <CardDescription className="text-gray-400">Define what your bot can do.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-900/20 p-2 rounded-full">
                            <FileText className="h-4 w-4 text-green-500" />
                          </div>
                          <div>
                            <Label className="font-medium">Text Processing</Label>
                            <p className="text-xs text-gray-400">Process and analyze text data</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-900/20 p-2 rounded-full">
                            <Code className="h-4 w-4 text-green-500" />
                          </div>
                          <div>
                            <Label className="font-medium">Code Generation</Label>
                            <p className="text-xs text-gray-400">Generate and analyze code</p>
                          </div>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-900/20 p-2 rounded-full">
                            <Database className="h-4 w-4 text-green-500" />
                          </div>
                          <div>
                            <Label className="font-medium">Data Processing</Label>
                            <p className="text-xs text-gray-400">Process and analyze structured data</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-900/20 p-2 rounded-full">
                            <Upload className="h-4 w-4 text-green-500" />
                          </div>
                          <div>
                            <Label className="font-medium">File Handling</Label>
                            <p className="text-xs text-gray-400">Process and analyze files</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <div className="pt-4">
                      <Label htmlFor="max-file-size">Maximum File Size</Label>
                      <Select>
                        <SelectTrigger className="bg-black border-green-900/40 focus:border-green-500/40 text-white mt-2">
                          <SelectValue placeholder="Select maximum file size" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-green-900/40 text-white">
                          <SelectItem value="10mb">10 MB</SelectItem>
                          <SelectItem value="50mb">50 MB</SelectItem>
                          <SelectItem value="100mb">100 MB</SelectItem>
                          <SelectItem value="500mb">500 MB</SelectItem>
                          <SelectItem value="1gb">1 GB</SelectItem>
                          <SelectItem value="unlimited">Unlimited</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-400 mt-2">Maximum file size the bot can process.</p>
                    </div>

                    <div className="pt-4">
                      <Label htmlFor="supported-formats">Supported File Formats</Label>
                      <Textarea
                        id="supported-formats"
                        placeholder="e.g., .txt, .csv, .json, .pdf"
                        className="bg-black border-green-900/40 focus:border-green-500/40 text-white mt-2 min-h-[80px]"
                      />
                      <p className="text-xs text-gray-400 mt-2">
                        Comma-separated list of file formats the bot can process.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-green-900/40">
                  <CardHeader>
                    <CardTitle>Advanced Capabilities</CardTitle>
                    <CardDescription className="text-gray-400">
                      Configure advanced features for your bot.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="system-prompt">System Prompt</Label>
                      <Textarea
                        id="system-prompt"
                        placeholder="Enter system instructions for your bot..."
                        className="bg-black border-green-900/40 focus:border-green-500/40 text-white min-h-[120px]"
                      />
                      <p className="text-xs text-gray-400">
                        Instructions that define your bot's behavior and capabilities.
                      </p>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="memory" className="flex-1">
                          Conversation Memory
                        </Label>
                        <Switch id="memory" defaultChecked />
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Enable the bot to remember previous interactions in a conversation.
                      </p>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="tools" className="flex-1">
                          External Tools Access
                        </Label>
                        <Switch id="tools" />
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Allow the bot to use external tools and APIs.</p>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="web-search" className="flex-1">
                          Web Search
                        </Label>
                        <Switch id="web-search" />
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Allow the bot to search the web for information.</p>
                    </div>

                    <div className="pt-4">
                      <Label htmlFor="custom-functions">Custom Functions</Label>
                      <Textarea
                        id="custom-functions"
                        placeholder="Define custom functions in JSON format..."
                        className="bg-black border-green-900/40 focus:border-green-500/40 text-white mt-2 min-h-[120px] font-mono text-sm"
                      />
                      <p className="text-xs text-gray-400 mt-2">Define custom functions that your bot can call.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="training">
              <div className="grid gap-8 md:grid-cols-2">
                <Card className="bg-gray-900 border-green-900/40">
                  <CardHeader>
                    <CardTitle>Training Data</CardTitle>
                    <CardDescription className="text-gray-400">Provide data to train your bot.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border-2 border-dashed border-green-900/40 rounded-lg p-6 text-center hover:border-green-500/40 transition-all cursor-pointer">
                      <Upload className="h-8 w-8 text-green-500 mx-auto mb-4" />
                      <h3 className="font-medium mb-2">Upload Training Data</h3>
                      <p className="text-sm text-gray-400 mb-4">Drag and drop files or click to browse</p>
                      <Button
                        variant="outline"
                        className="border-green-900/40 hover:border-green-500/40 hover:bg-green-900/10 text-green-500"
                      >
                        Select Files
                      </Button>
                      <p className="text-xs text-gray-400 mt-4">
                        Supported formats: .txt, .csv, .json, .pdf, .zip (max 1GB)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="data-source">Data Source URL</Label>
                      <Input
                        id="data-source"
                        placeholder="https://example.com/data.json"
                        className="bg-black border-green-900/40 focus:border-green-500/40 text-white"
                      />
                      <p className="text-xs text-gray-400">URL to a data source for training your bot.</p>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="continuous-learning" className="flex-1">
                          Continuous Learning
                        </Label>
                        <Switch id="continuous-learning" />
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Allow the bot to learn from new interactions over time.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-green-900/40">
                  <CardHeader>
                    <CardTitle>Training Configuration</CardTitle>
                    <CardDescription className="text-gray-400">Configure how your bot will be trained.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="training-epochs">Training Epochs</Label>
                      <Input
                        id="training-epochs"
                        type="number"
                        placeholder="e.g., 3"
                        className="bg-black border-green-900/40 focus:border-green-500/40 text-white"
                      />
                      <p className="text-xs text-gray-400">
                        Number of training epochs. Higher values may improve performance but take longer.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="learning-rate">Learning Rate</Label>
                      <Input
                        id="learning-rate"
                        type="number"
                        placeholder="e.g., 0.0001"
                        className="bg-black border-green-900/40 focus:border-green-500/40 text-white"
                      />
                      <p className="text-xs text-gray-400">
                        Learning rate for training. Lower values are more stable but train slower.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="training-method">Training Method</Label>
                      <Select>
                        <SelectTrigger className="bg-black border-green-900/40 focus:border-green-500/40 text-white">
                          <SelectValue placeholder="Select training method" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-green-900/40 text-white">
                          <SelectItem value="fine-tuning">Fine-tuning</SelectItem>
                          <SelectItem value="rlhf">Reinforcement Learning from Human Feedback</SelectItem>
                          <SelectItem value="few-shot">Few-shot Learning</SelectItem>
                          <SelectItem value="zero-shot">Zero-shot Learning</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-400">Method used to train your bot.</p>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="advanced-training" className="flex-1">
                          Advanced Training Options
                        </Label>
                        <Switch id="advanced-training" />
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Enable advanced training options for more control.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="deployment">
              <div className="grid gap-8 md:grid-cols-2">
                <Card className="bg-gray-900 border-green-900/40">
                  <CardHeader>
                    <CardTitle>Deployment Options</CardTitle>
                    <CardDescription className="text-gray-400">
                      Configure how your bot will be deployed.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="deployment-environment">Deployment Environment</Label>
                      <Select>
                        <SelectTrigger className="bg-black border-green-900/40 focus:border-green-500/40 text-white">
                          <SelectValue placeholder="Select environment" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-green-900/40 text-white">
                          <SelectItem value="production">Production</SelectItem>
                          <SelectItem value="staging">Staging</SelectItem>
                          <SelectItem value="development">Development</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="scaling">Scaling</Label>
                      <Select>
                        <SelectTrigger className="bg-black border-green-900/40 focus:border-green-500/40 text-white">
                          <SelectValue placeholder="Select scaling option" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-green-900/40 text-white">
                          <SelectItem value="auto">Auto-scaling</SelectItem>
                          <SelectItem value="fixed">Fixed Instances</SelectItem>
                          <SelectItem value="manual">Manual Scaling</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="instances">Number of Instances</Label>
                      <Input
                        id="instances"
                        type="number"
                        placeholder="e.g., 3"
                        className="bg-black border-green-900/40 focus:border-green-500/40 text-white"
                      />
                      <p className="text-xs text-gray-400">Number of instances to deploy (for fixed scaling).</p>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-deploy" className="flex-1">
                          Auto-deploy Updates
                        </Label>
                        <Switch id="auto-deploy" defaultChecked />
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Automatically deploy updates when the bot is modified.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-green-900/40">
                  <CardHeader>
                    <CardTitle>Access Control</CardTitle>
                    <CardDescription className="text-gray-400">Configure who can access your bot.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="access-level">Access Level</Label>
                      <Select>
                        <SelectTrigger className="bg-black border-green-900/40 focus:border-green-500/40 text-white">
                          <SelectValue placeholder="Select access level" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-green-900/40 text-white">
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="restricted">Restricted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="api-auth">API Authentication</Label>
                      <Select>
                        <SelectTrigger className="bg-black border-green-900/40 focus:border-green-500/40 text-white">
                          <SelectValue placeholder="Select authentication method" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-green-900/40 text-white">
                          <SelectItem value="api-key">API Key</SelectItem>
                          <SelectItem value="oauth">OAuth</SelectItem>
                          <SelectItem value="jwt">JWT</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="rate-limiting" className="flex-1">
                          Rate Limiting
                        </Label>
                        <Switch id="rate-limiting" defaultChecked />
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Limit the number of requests per API key.</p>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="ip-restrictions" className="flex-1">
                          IP Restrictions
                        </Label>
                        <Switch id="ip-restrictions" />
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Restrict access to specific IP addresses.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              variant="outline"
              className="border-green-900/40 hover:border-green-500/40 hover:bg-green-900/10 text-white"
            >
              Save as Draft
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-black">
              <Zap className="mr-2 h-4 w-4" /> Create & Deploy Bot
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
