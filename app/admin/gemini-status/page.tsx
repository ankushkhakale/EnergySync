"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Default API key
const DEFAULT_API_KEY = "AIzaSyDHMxOqv2ZbseVsUaOXJ5urJvyAXt9hAxQ"

export default function GeminiStatusPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error" | "idle">("idle")
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")
  const [apiKey, setApiKey] = useState(DEFAULT_API_KEY)
  const [apiKeyInput, setApiKeyInput] = useState(DEFAULT_API_KEY)
  const [useOfflineMode, setUseOfflineMode] = useState(false)

  const saveApiKey = () => {
    setApiKey(apiKeyInput)
  }

  const checkStatus = async () => {
    setStatus("loading")
    setMessage("")
    setResponse("")

    // If offline mode is enabled, simulate a successful response
    if (useOfflineMode) {
      setTimeout(() => {
        setStatus("success")
        setMessage("Simulated success in offline mode")
        setResponse("This is a simulated response. In offline mode, no actual API calls are made.")
      }, 1500)
      return
    }

    try {
      const res = await fetch("/api/test-gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus("success")
        setMessage("Gemini API is working correctly!")
        setResponse(data.response)
      } else {
        setStatus("error")
        setMessage(data.message || "Failed to connect to Gemini API")
      }
    } catch (err) {
      setStatus("error")
      setMessage("Failed to connect to the API")
    }
  }

  // Auto-check status on load
  useEffect(() => {
    checkStatus()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {status === "loading" && <Loader2 className="h-5 w-5 animate-spin text-blue-500" />}
            {status === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
            {status === "error" && <XCircle className="h-5 w-5 text-red-500" />}
            {status === "idle" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
            Gemini API Status
          </CardTitle>
          <CardDescription>Check if your Gemini API integration is working correctly</CardDescription>
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
                <CheckCircle className="h-4 w-4" />
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

          {status === "success" && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <h3 className="font-medium mb-1 text-green-700 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                {message}
              </h3>
              {response && (
                <div className="mt-2 pt-2 border-t border-green-200">
                  <p className="text-sm font-medium text-green-700">Test Response:</p>
                  <p className="text-sm text-green-600">{response}</p>
                </div>
              )}
            </div>
          )}

          {status === "error" && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <h3 className="font-medium mb-1 text-red-700 flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                Error
              </h3>
              <p className="text-sm text-red-600">{message}</p>
            </div>
          )}

          {status === "loading" && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h3 className="font-medium mb-1 text-blue-700 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking Gemini API status...
              </h3>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
            <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Important API Update
            </h3>
            <p className="text-sm text-blue-700 mb-2">We've updated the Gemini API configuration to use:</p>
            <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
              <li>
                API Version: <code className="bg-blue-100 px-1 rounded">v1</code> (instead of v1beta)
              </li>
              <li>
                Model: <code className="bg-blue-100 px-1 rounded">gemini-1.5-flash</code> (instead of gemini-pro)
              </li>
            </ul>
            <p className="text-sm text-blue-700 mt-2">
              This should resolve the 404 errors with the previous configuration.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={checkStatus} disabled={status === "loading"} className="w-full">
            {status === "loading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              "Check Gemini API Status"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

