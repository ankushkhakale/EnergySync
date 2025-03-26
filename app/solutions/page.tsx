"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedButton } from "@/components/animated-button"
import Navbar from "@/components/navbar"

export default function SolutionsPage() {
  const solutions = [
    {
      id: "energy-analytics",
      title: "Energy Analytics",
      description: "Gain deep insights into your energy usage patterns with AI-powered analytics.",
      image: "/placeholder.svg?height=300&width=500",
      color: "from-blue-500 to-sky-700",
      features: [
        "Real-time energy consumption monitoring",
        "Usage pattern identification and anomaly detection",
        "Automated reporting and data visualization",
        "Integration with major energy management systems",
        "Custom alerts and notifications",
      ],
      href: "/solutions/energy-analytics",
    },
    {
      id: "carbon-tracking",
      title: "Carbon Tracking",
      description: "Comprehensive carbon footprint monitoring and reduction planning tools.",
      image: "/placeholder.svg?height=300&width=500",
      color: "from-green-500 to-teal-700",
      features: [
        "Scope 1, 2, and 3 emissions tracking",
        "Regulatory compliance reporting",
        "Carbon reduction strategy generator",
        "Emission benchmarking against industry standards",
        "Offset program integration and management",
      ],
      href: "/solutions/carbon-tracking",
    },
    {
      id: "investment-optimizer",
      title: "Investment Optimizer",
      description: "Maximize ROI on renewable energy investments with data-driven decision support.",
      image: "/placeholder.svg?height=300&width=500",
      color: "from-amber-500 to-orange-700",
      features: [
        "Scenario modeling and financial projections",
        "Risk assessment and sensitivity analysis",
        "Incentive and rebate opportunity finder",
        "Technology comparison tools",
        "Custom ROI calculators and visualization",
      ],
      href: "/solutions/investment-optimizer",
    },
    {
      id: "energy-procurement",
      title: "Energy Procurement",
      description: "Optimize energy purchasing decisions and contracts for better rates and terms.",
      image: "/placeholder.svg?height=300&width=500",
      color: "from-purple-500 to-indigo-700",
      features: [
        "Market rate monitoring and forecasting",
        "Contract analysis and comparison tools",
        "RFP generation and management",
        "Supplier performance tracking",
        "Budget forecasting and optimization",
      ],
      href: "/solutions/energy-procurement",
    },
    {
      id: "demand-response",
      title: "Demand Response",
      description: "Participate in utility demand response programs to reduce costs and increase grid resilience.",
      image: "/placeholder.svg?height=300&width=500",
      color: "from-rose-500 to-red-700",
      features: [
        "Automated demand response implementation",
        "Load shedding optimization",
        "Program eligibility assessment",
        "Event notification and management",
        "Performance reporting and verification",
      ],
      href: "/solutions/demand-response",
    },
    {
      id: "microgrid-management",
      title: "Microgrid Management",
      description: "Optimize and control your on-site energy generation, storage, and distribution.",
      image: "/placeholder.svg?height=300&width=500",
      color: "from-yellow-500 to-amber-700",
      features: [
        "Distributed energy resource management",
        "Storage optimization algorithms",
        "islanding and reconnection control",
        "Generation mix optimization",
        "Advanced energy forecasting",
      ],
      href: "/solutions/microgrid-management",
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
          className="text-center mb-16"
        >
          <Badge className="mb-4">Solutions</Badge>
          <h1 className="text-4xl font-bold mb-4">Comprehensive Energy Management Solutions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            EnergySync offers a suite of solutions designed to optimize your renewable energy investments, reduce your
            carbon footprint, and transform your organization's energy management.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="border-none shadow-lg h-full overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${solution.color}`}></div>
                <div className="relative">
                  <img
                    src={solution.image || "/placeholder.svg"}
                    alt={solution.title}
                    className="w-full object-cover h-48"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{solution.title}</CardTitle>
                  <CardDescription>{solution.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="font-medium mb-2">Key Features</h3>
                  <ul className="space-y-2">
                    {solution.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <AnimatedButton href={solution.href} className="w-full">
                      Learn More
                    </AnimatedButton>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl p-10 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-4">Not Sure Which Solution Is Right For You?</h2>
          <p className="mb-6">
            Our energy experts can help you identify the perfect combination of solutions for your specific needs.
          </p>
          <AnimatedButton href="/demo-request" variant="demo">
            Book a Consultation
          </AnimatedButton>
        </motion.div>
      </div>
    </div>
  )
}

