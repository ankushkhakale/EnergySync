"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Zap, Send, X, MessageCircle, Loader2, AlertCircle, Settings, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Message = {
  role: "user" | "assistant" | "error" | "system"
  content: string
}

// Fallback responses when the API is unavailable
const FALLBACK_RESPONSES = [
  "I can help you understand renewable energy solutions and how EnergySync can optimize your energy usage.",
  "EnergySync offers AI-powered analytics to reduce your carbon footprint and optimize energy investments.",
  "Our platform provides real-time monitoring of energy consumption and recommendations for improvement.",
  "EnergySync helps businesses and communities transition to sustainable energy sources with data-driven insights.",
  "Our AI algorithms analyze your energy consumption patterns to identify optimization opportunities.",
  "EnergySync's dashboard gives you real-time visibility into your energy usage and carbon footprint.",
  "We can help you set and track sustainability goals with our comprehensive reporting tools.",
]

// Default API key - this will be used if no environment variable is set
const DEFAULT_API_KEY = "AIzaSyDHMxOqv2ZbseVsUaOXJ5urJvyAXt9hAxQ"

export function VoltaAIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I'm VoltaAI, your renewable energy assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [useOfflineMode, setUseOfflineMode] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [apiKey, setApiKey] = useState(DEFAULT_API_KEY)
  const [apiKeyInput, setApiKeyInput] = useState(DEFAULT_API_KEY)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [errorCount, setErrorCount] = useState(0)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Get a random fallback response
  const getFallbackResponse = () => {
    return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)]
  }

  // Save API key
  const saveApiKey = () => {
    setApiKey(apiKeyInput)
    setShowSettings(false)
    setUseOfflineMode(false) // Reset offline mode when API key is updated
    setErrorCount(0) // Reset error count
    setMessages((prev) => [
      ...prev,
      {
        role: "system",
        content: "API key updated. You can now ask questions about renewable energy.",
      },
    ])
  }

  // Toggle offline mode
  const toggleOfflineMode = () => {
    setUseOfflineMode(!useOfflineMode)
    setMessages((prev) => [
      ...prev,
      {
        role: "system",
        content: !useOfflineMode
          ? "Switched to offline mode. Using pre-programmed responses."
          : "Switched to online mode. Attempting to use Gemini API.",
      },
    ])
  }

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    // Add user message to chat
    const userMessage = input.trim()
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setInput("")
    setIsLoading(true)

    // If offline mode is enabled, use fallback responses
    if (useOfflineMode) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "assistant", content: getFallbackResponse() }])
        setIsLoading(false)
      }, 1000)
      return
    }

    try {
      // API call with the current message and API key
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          apiKey: apiKey,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("API error:", data.error)
        throw new Error(data.error || "Failed to get response")
      }

      // Add assistant response to chat
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }])

      // Reset error count on successful response
      setErrorCount(0)
    } catch (error) {
      console.error("Error sending message:", error)

      // Increment error count
      const newErrorCount = errorCount + 1
      setErrorCount(newErrorCount)

      // Switch to offline mode after 3 consecutive errors
      if (newErrorCount >= 3 && !useOfflineMode) {
        setUseOfflineMode(true)
        setMessages((prev) => [
          ...prev,
          {
            role: "error",
            content: "I'm having trouble connecting to my knowledge base. Switching to offline mode.",
          },
          {
            role: "assistant",
            content: getFallbackResponse(),
          },
        ])
      } else {
        // Add an error message and a fallback response
        setMessages((prev) => [
          ...prev,
          {
            role: "error",
            content: "I'm having trouble connecting to my knowledge base right now.",
          },
          {
            role: "assistant",
            content: getFallbackResponse(),
          },
        ])
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Handle pressing Enter to send
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating button */}
      <div className={cn("fixed bottom-6 right-6 z-50", isOpen ? "hidden" : "block")}>
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-teal-500 to-green-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:from-teal-600 hover:to-green-600 flex items-center justify-center"
        >
          <div className="relative">
            <MessageCircle className="h-6 w-6 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
        </Button>
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-green-500 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">VoltaAI</h3>
                <p className="text-white/80 text-xs">
                  {useOfflineMode ? "Offline Mode" : "Renewable Energy Assistant"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(!showSettings)}
                className="text-white hover:bg-white/20 rounded-full h-8 w-8"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full h-8 w-8"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="p-4 border-b bg-gray-50">
              <h4 className="font-medium text-sm mb-2">Settings</h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-700">API Key</label>
                  <div className="flex gap-2">
                    <Input
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      placeholder="Enter Gemini API Key"
                      className="flex-1 text-xs"
                    />
                    <Button onClick={saveApiKey} className="bg-teal-500 hover:bg-teal-600 text-white" size="sm">
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-700">Offline Mode</span>
                  <Button
                    onClick={toggleOfflineMode}
                    variant={useOfflineMode ? "destructive" : "outline"}
                    size="sm"
                    className="h-8"
                  >
                    {useOfflineMode ? "Disable" : "Enable"}
                  </Button>
                </div>

                <p className="text-xs text-gray-500 pt-2 border-t">
                  {useOfflineMode
                    ? "Using pre-programmed responses (no API calls)"
                    : `Using API Key: ${apiKey ? `${apiKey.substring(0, 5)}...` : "Not set"}`}
                </p>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl p-3",
                      message.role === "user"
                        ? "bg-teal-500 text-white rounded-tr-none"
                        : message.role === "error"
                          ? "bg-red-50 border border-red-200 text-red-700 rounded-tl-none"
                          : message.role === "system"
                            ? "bg-blue-50 border border-blue-200 text-blue-700 rounded-tl-none"
                            : "bg-white shadow-md rounded-tl-none",
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-1">
                        <div className="h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center">
                          <Zap className="h-3 w-3 text-teal-600" />
                        </div>
                        <span className="text-xs font-medium text-teal-600">VoltaAI</span>
                      </div>
                    )}
                    {message.role === "error" && (
                      <div className="flex items-center gap-2 mb-1">
                        <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                          <AlertCircle className="h-3 w-3 text-red-600" />
                        </div>
                        <span className="text-xs font-medium text-red-600">System</span>
                      </div>
                    )}
                    {message.role === "system" && (
                      <div className="flex items-center gap-2 mb-1">
                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                          <Settings className="h-3 w-3 text-blue-600" />
                        </div>
                        <span className="text-xs font-medium text-blue-600">System</span>
                      </div>
                    )}
                    <p
                      className={cn(
                        "text-sm",
                        message.role === "user"
                          ? "text-white"
                          : message.role === "error"
                            ? "text-red-700"
                            : message.role === "system"
                              ? "text-blue-700"
                              : "text-gray-700",
                      )}
                    >
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white shadow-md rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center">
                        <Zap className="h-3 w-3 text-teal-600" />
                      </div>
                      <span className="text-xs font-medium text-teal-600">VoltaAI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-teal-500" />
                      <p className="text-sm text-gray-500">Thinking...</p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t">
            <div className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about renewable energy..."
                className="flex-1 focus-visible:ring-teal-500"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-teal-500 hover:bg-teal-600 text-white rounded-full h-10 w-10 p-0 flex items-center justify-center"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-1 text-center">
              {useOfflineMode ? "Using offline responses" : "Powered by Google Gemini AI"}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

