"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedButton } from "@/components/animated-button"
import Navbar from "@/components/navbar"

export default function GetStartedPage() {
  const [activeStep, setActiveStep] = useState(1)

  const steps = [
    {
      number: 1,
      title: "Choose Your Path",
      description: "Select the solution that fits your needs and goals",
    },
    {
      number: 2,
      title: "Setup Account",
      description: "Create your account and configure your profile",
    },
    {
      number: 3,
      title: "Integration",
      description: "Connect your energy data sources and systems",
    },
    {
      number: 4,
      title: "Start Optimizing",
      description: "Begin using EnergySync to transform your energy usage",
    },
  ]

  const solutions = [
    {
      title: "Energy Analytics",
      description: "Gain insights into energy consumption patterns and identify optimization opportunities.",
      features: [
        "Real-time energy monitoring dashboard",
        "Historical usage analysis and trend detection",
        "AI-powered consumption predictions",
        "Custom alert system and notifications",
      ],
      icon: "📊",
      href: "/products/energy-analytics",
      color: "from-blue-500 to-sky-700",
    },
    {
      title: "Carbon Tracking",
      description: "Monitor, report, and reduce your carbon footprint with comprehensive tracking tools.",
      features: [
        "Carbon emissions calculator",
        "Regulatory compliance reporting",
        "Reduction strategy recommendations",
        "Scope 1, 2, and 3 emissions tracking",
      ],
      icon: "🌿",
      href: "/products/carbon-tracking",
      color: "from-green-500 to-teal-700",
    },
    {
      title: "Investment Optimizer",
      description: "Maximize ROI on renewable energy investments with data-driven decision support.",
      features: [
        "Investment scenario modeling",
        "Financial analysis and projections",
        "Risk assessment tools",
        "Incentive and rebate opportunity finder",
      ],
      icon: "💰",
      href: "/products/investment-optimizer",
      color: "from-amber-500 to-orange-700",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Get Started with EnergySync</h1>
          <p className="text-xl text-gray-600">
            Follow these simple steps to begin optimizing your renewable energy investments and reducing your carbon
            footprint.
          </p>
        </motion.div>

        <div className="mb-16">
          <div className="flex flex-wrap justify-center mb-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div
                  className={`flex flex-col items-center mx-4 mb-6 md:mb-0 ${
                    step.number < activeStep ? "opacity-100" : step.number === activeStep ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                      step.number < activeStep
                        ? "bg-green-500 text-white"
                        : step.number === activeStep
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step.number < activeStep ? <CheckCircle className="h-6 w-6" /> : step.number}
                  </div>
                  <h3 className="mt-2 font-semibold">{step.title}</h3>
                  <p className="text-sm text-gray-600 max-w-[150px] text-center">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(100%-1rem)] w-8 h-0.5 bg-gray-300">
                    <ChevronRight className="absolute -right-2 -top-2 h-5 w-5 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                onClick={() => setActiveStep(Math.min(activeStep + 1, 4))}
                className="mx-2 bg-blue-600 hover:bg-blue-700"
                disabled={activeStep === 4}
              >
                Next Step
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveStep(Math.max(activeStep - 1, 1))}
                className="mx-2"
                disabled={activeStep === 1}
              >
                Previous Step
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Choose Your Solution</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="border-none shadow-lg h-full overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${solution.color}`}></div>
                  <CardHeader>
                    <div className="text-3xl mb-2">{solution.icon}</div>
                    <CardTitle>{solution.title}</CardTitle>
                    <CardDescription>{solution.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <ul className="mb-6 space-y-2">
                      {solution.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      <AnimatedButton href={solution.href} variant="primary" className="w-full">
                        Explore {solution.title}
                      </AnimatedButton>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl p-10 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-4">Not Sure Where to Start?</h2>
          <p className="mb-6">
            Schedule a personalized consultation with our energy experts to find the perfect solution for your
            organization.
          </p>
          <AnimatedButton href="/demo-request" variant="demo">
            Book a Consultation
          </AnimatedButton>
        </motion.div>
      </div>
    </div>
  )
}

