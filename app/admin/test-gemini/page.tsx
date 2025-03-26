"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Check, AlertTriangle } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Default API key
const DEFAULT_API_KEY = "AIzaSyDHMxOqv2ZbseVsUaOXJ5urJvyAXt9hAxQ"

export default function TestGeminiPage() {
  const [prompt, setPrompt] = useState("What is renewable energy?")
  const [response, setResponse] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [apiKey, setApiKey] = useState(DEFAULT_API_KEY)
  const [apiKeyInput, setApiKeyInput] = useState(DEFAULT_API_KEY)
  const [useOfflineMode, setUseOfflineMode] = useState(false)

  const saveApiKey = () => {
    setApiKey(apiKeyInput)
  }

  const testGemini = async () => {
    setIsLoading(true)
    setResponse("")
    setError("")

    // If offline mode is enabled, return a mock response
    if (useOfflineMode) {
      setTimeout(() => {
        setResponse(
          "This is a simulated response in offline mode. Renewable energy comes from sources that are naturally replenishing but flow-limited. They are virtually inexhaustible in duration but limited in the amount of energy that is available per unit of time.",
        )
        setIsLoading(false)
      }, 1500)
      return
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: prompt,
          apiKey: apiKey,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setResponse(data.response)
      } else {
        setError(data.error || "Unknown error occurred")
      }
    } catch (err) {
      setError("Failed to connect to the API")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Test Gemini API</CardTitle>
          <CardDescription>Use this page to test if your Gemini API integration is working correctly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">API Key</label>
            <div className="flex gap-2">
              <Input
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="Enter your Gemini API Key"
                className="flex-1"
              />
              <Button onClick={saveApiKey} className="bg-green-600 hover:bg-green-700">
                <Check className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Current API Key: {apiKey ? `${apiKey.substring(0, 5)}...` : "Not set"}
            </p>
          </div>

          <div className="flex items-center space-x-2 py-2">
            <Switch id="offline-mode" checked={useOfflineMode} onCheckedChange={setUseOfflineMode} />
            <Label htmlFor="offline-mode">Use Offline Mode (Simulated Responses)</Label>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Test Prompt</label>
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a test prompt"
              className="w-full"
            />
          </div>

          <Button
            onClick={testGemini}
            disabled={isLoading || !prompt.trim() || (!apiKey && !useOfflineMode)}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {useOfflineMode ? "Simulating Response..." : "Testing..."}
              </>
            ) : useOfflineMode ? (
              "Generate Offline Response"
            ) : (
              "Test Gemini API"
            )}
          </Button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
              <h3 className="font-medium mb-1">Error:</h3>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {response && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <h3 className="font-medium mb-1 text-green-700">Response:</h3>
              <p className="text-sm whitespace-pre-wrap">{response}</p>
            </div>
          )}

          {!useOfflineMode && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
              <h3 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Important API Information
              </h3>
              <ul className="text-sm text-yellow-700 space-y-2 list-disc pl-5">
                <li>
                  We're now using <code className="bg-yellow-100 px-1 rounded">gemini-1.5-flash</code> model with API
                  version <code className="bg-yellow-100 px-1 rounded">v1</code>
                </li>
                <li>Make sure your API key has access to the Gemini API</li>
                <li>If you continue to have issues, enable "Offline Mode" to use simulated responses</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

