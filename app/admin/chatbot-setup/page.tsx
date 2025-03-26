"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ChatbotSetup() {
  const [apiKey, setApiKey] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSaveKey = async () => {
    if (!apiKey.trim()) {
      setStatus("error")
      setMessage("Please enter a valid API key")
      return
    }

    try {
      // In a real application, you would save this to your environment variables
      // This is just a demonstration
      setStatus("success")
      setMessage(
        "API key saved successfully! In a production environment, this would be securely stored in your environment variables.",
      )

      // Clear the input after successful save
      setApiKey("")
    } catch (error) {
      setStatus("error")
      setMessage("Failed to save API key")
    }
  }

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">VoltaAI Chatbot Setup</CardTitle>
          <CardDescription>Configure your Google Gemini API key to enable the VoltaAI chatbot</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                To use VoltaAI, you need to obtain a Google Gemini API key from the Google AI Studio.
              </AlertDescription>
            </Alert>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Setup Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Visit{" "}
                <a
                  href="https://ai.google.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:underline"
                >
                  Google AI Studio
                </a>{" "}
                and create an account
              </li>
              <li>Generate a new API key from the API section</li>
              <li>Copy the API key and paste it below</li>
              <li>
                Add the API key to your environment variables as{" "}
                <code className="bg-gray-100 px-1 py-0.5 rounded">GEMINI_API_KEY</code>
              </li>
            </ol>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">Google Gemini API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              This key will be stored in your environment variables and never exposed to clients.
            </p>
          </div>

          {status === "success" && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Success</AlertTitle>
              <AlertDescription className="text-green-700">{message}</AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveKey} className="bg-teal-600 hover:bg-teal-700">
            Save API Key
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

