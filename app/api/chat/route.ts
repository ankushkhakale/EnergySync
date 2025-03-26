import { NextResponse } from "next/server"
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, apiKey } = body

    // Use provided API key or fall back to environment variable
    const genAIKey = apiKey || process.env.GEMINI_API_KEY || ""

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    if (!genAIKey) {
      return NextResponse.json({ error: "API key is not provided" }, { status: 400 })
    }

    console.log("Using API Key (first 5 chars):", genAIKey.substring(0, 5))

    try {
      // Initialize the Google Generative AI with the API key and explicitly set the API version
      const genAI = new GoogleGenerativeAI(genAIKey, {
        apiVersion: "v1", // Use v1 instead of v1beta
      })

      // Use gemini-1.5-flash model instead of gemini-pro
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ],
      })

      // Simple prompt with minimal context
      const prompt = `You are VoltaAI, a helpful assistant for EnergySync, a renewable energy platform. 
      Answer this question about renewable energy or the EnergySync platform: ${message}`

      // Generate content
      const result = await model.generateContent(prompt)
      const response = result.response.text()

      return NextResponse.json({ response })
    } catch (generativeError: any) {
      console.error("Generative AI Error details:", generativeError)

      // Provide a more helpful error message
      let errorMessage = "Failed to generate response"
      if (generativeError.message) {
        errorMessage = generativeError.message
      }

      // Return a structured error response
      return NextResponse.json(
        {
          error: errorMessage,
          details: generativeError.message || "Unknown error",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error in chat API:", error)

    // Return a more detailed error message
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

