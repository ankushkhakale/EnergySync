import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { apiKey } = body

    // Use provided API key or fall back to environment variable
    const genAIKey = apiKey || process.env.GEMINI_API_KEY || ""

    if (!genAIKey) {
      return NextResponse.json({
        success: false,
        message: "API key is not provided",
      })
    }

    try {
      // Initialize the Google Generative AI with the API key and explicitly set the API version
      const genAI = new GoogleGenerativeAI(genAIKey, {
        apiVersion: "v1", // Use v1 instead of v1beta
      })

      // Use gemini-1.5-flash model instead of gemini-pro
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

      // Simple test prompt
      const prompt = "What is renewable energy? Keep it short."

      // Generate content
      const result = await model.generateContent(prompt)
      const response = result.response.text()

      return NextResponse.json({
        success: true,
        message: "Gemini API is working correctly",
        response,
      })
    } catch (generativeError: any) {
      console.error("Generative AI Error details:", generativeError)

      return NextResponse.json({
        success: false,
        message: generativeError.message || "Failed to generate response",
      })
    }
  } catch (error) {
    console.error("Error in test API:", error)

    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

