import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Copy, Key } from "lucide-react"
import Link from "next/link"
import DashboardNav from "@/components/dashboard-nav"

export default function CreateApiKey() {
  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardNav />

      <main className="container mx-auto py-6 px-4 md:px-6">
        <div className="mb-8">
          <Link href="/api-keys" className="text-gray-400 hover:text-green-500 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to API Keys
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Generate New API Key</h1>

            <Card className="bg-gray-900 border-green-900/40 mb-6">
              <CardHeader>
                <CardTitle>Key Details</CardTitle>
                <CardDescription className="text-gray-400">Configure your new API key settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="key-name">Key Name</Label>
                  <Input
                    id="key-name"
                    placeholder="e.g., Production API Key"
                    className="bg-black border-green-900/40 focus:border-green-500/40 text-white"
                  />
                  <p className="text-sm text-gray-400">Give your key a descriptive name to identify its purpose.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiration">Expiration</Label>
                  <Select>
                    <SelectTrigger className="bg-black border-green-900/40 focus:border-green-500/40 text-white">
                      <SelectValue placeholder="Select expiration time" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-green-900/40 text-white">
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="30days">30 days</SelectItem>
                      <SelectItem value="90days">90 days</SelectItem>
                      <SelectItem value="1year">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-400">Set an expiration date for automatic key rotation.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="permissions">Permissions</Label>
                  <Select>
                    <SelectTrigger className="bg-black border-green-900/40 focus:border-green-500/40 text-white">
                      <SelectValue placeholder="Select permission level" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-green-900/40 text-white">
                      <SelectItem value="readonly">Read Only</SelectItem>
                      <SelectItem value="readwrite">Read & Write</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-400">Control what actions this API key can perform.</p>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="rate-limit" className="flex-1">
                      Enable Rate Limiting
                    </Label>
                    <Switch id="rate-limit" />
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Limit the number of requests this key can make per minute.
                  </p>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ip-restrict" className="flex-1">
                      IP Restrictions
                    </Label>
                    <Switch id="ip-restrict" />
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Restrict API key usage to specific IP addresses.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-black">
                  <Key className="mr-2 h-4 w-4" /> Generate API Key
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold mb-6">Preview</h2>

            <Card className="bg-gray-900 border-green-900/40 mb-6">
              <CardHeader>
                <CardTitle>Your New API Key</CardTitle>
                <CardDescription className="text-gray-400">
                  This will be your only chance to view this API key.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-black rounded-md border border-green-900/40">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-gray-400">API Key</Label>
                    <Button variant="ghost" size="sm" className="h-8 text-gray-400 hover:text-green-500">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="font-mono text-green-500 break-all">nexus_sk_••••••••••••••••••••••••••••••</div>
                  <p className="text-xs text-gray-400 mt-2">Your API key will be displayed here after generation.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span>Not set</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created:</span>
                    <span>Not created yet</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Expires:</span>
                    <span>Not set</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Permissions:</span>
                    <span>Not set</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="bg-green-900/20 p-4 rounded-md border border-green-900/40 w-full">
                  <h3 className="font-medium text-green-500 mb-2 flex items-center">
                    <Key className="h-4 w-4 mr-2" /> Important Security Notice
                  </h3>
                  <p className="text-sm text-gray-400">
                    This API key will only be displayed once. Make sure to copy it and store it securely. For security
                    reasons, we cannot show it again.
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
