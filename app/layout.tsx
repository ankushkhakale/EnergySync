import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { VoltaAIChatbot } from "@/components/volta-ai-chatbot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EnergySync - AI-Powered Renewable Energy Optimization",
  description: "Optimize your renewable energy investments, usage patterns, and carbon reduction strategies with AI.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <VoltaAIChatbot />
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'