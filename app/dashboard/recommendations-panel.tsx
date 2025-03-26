"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, ArrowRight, Battery, Lightbulb, Sun, Zap } from "lucide-react"

export default function RecommendationsPanel() {
  const [expandedCard, setExpandedCard] = useState(null)

  const recommendations = [
    {
      title: "Increase Solar Panel Capacity",
      description:
        "Adding 20kW of solar capacity could reduce grid dependency by 15% and save approximately $8,500 annually.",
      impact: "High",
      roi: "24 months",
      category: "Investment",
      icon: <Sun className="h-10 w-10 text-yellow-500" />,
      details:
        "Our AI analysis shows that your facility has optimal roof space and sun exposure for additional solar panels. The 20kW expansion would generate approximately 28,000 kWh annually, offsetting your current grid usage during peak daylight hours. Installation costs are estimated at $42,000 before incentives, with potential tax credits reducing this by up to 30%.",
    },
    {
      title: "Implement Smart Energy Storage",
      description:
        "Installing a 50kWh battery system would optimize energy usage during peak hours and provide backup power.",
      impact: "Medium",
      roi: "36 months",
      category: "Investment",
      icon: <Battery className="h-10 w-10 text-blue-500" />,
      details:
        "Battery storage would allow you to store excess solar energy produced during the day for use during evening peak rate periods. Our analysis of your usage patterns indicates you could shift approximately 30% of your peak consumption to off-peak hours, resulting in significant cost savings. The recommended system includes smart controls that automatically optimize charging and discharging based on energy prices and usage forecasts.",
    },
    {
      title: "Optimize HVAC Schedule",
      description: "Adjusting your HVAC schedule based on occupancy patterns could reduce energy consumption by 12%.",
      impact: "Medium",
      roi: "3 months",
      category: "Optimization",
      icon: <Zap className="h-10 w-10 text-green-500" />,
      details:
        "Our AI has analyzed your building occupancy patterns and identified opportunities to adjust HVAC operation. The current system runs at full capacity from 6AM to 8PM, but occupancy data shows the building doesn't reach 50% capacity until 8:30AM and begins emptying at 5:30PM. Implementing a more dynamic schedule with pre-cooling/heating strategies could save approximately 12% on HVAC energy costs with minimal impact on comfort.",
    },
    {
      title: "Upgrade to LED Lighting",
      description: "Replacing remaining non-LED lighting could reduce lighting energy consumption by up to 75%.",
      impact: "Low",
      roi: "12 months",
      category: "Upgrade",
      icon: <Lightbulb className="h-10 w-10 text-amber-500" />,
      details:
        "While 65% of your facility already uses LED lighting, replacing the remaining conventional fixtures would yield additional savings. The areas with the highest potential impact are the warehouse (32 metal halide fixtures) and parking garage (48 fluorescent fixtures). Modern LED replacements would not only reduce energy consumption but also improve light quality and reduce maintenance costs due to longer lifespans.",
    },
    {
      title: "Address Energy Anomalies",
      description:
        "Our AI has detected unusual energy consumption patterns on weekends. Investigating could save 5-8% on monthly bills.",
      impact: "Medium",
      roi: "Immediate",
      category: "Alert",
      icon: <AlertCircle className="h-10 w-10 text-red-500" />,
      details:
        "Energy consumption data shows consistent spikes between 2AM and 4AM on weekends when the facility should be unoccupied. This pattern has occurred for the past 6 weekends and doesn't correlate with weather changes or scheduled maintenance. The most likely causes are equipment left running, HVAC scheduling errors, or security lighting that remains on unnecessarily. A targeted investigation could identify and resolve these issues quickly.",
    },
  ]

  const toggleCard = (index) => {
    if (expandedCard === index) {
      setExpandedCard(null)
    } else {
      setExpandedCard(index)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Recommendations</CardTitle>
          <CardDescription>
            Based on your energy usage patterns and business goals, our AI has generated the following recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {recommendations.map((recommendation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="h-full"
              >
                <Card
                  className={`border-l-4 h-full transition-all duration-300 ${expandedCard === index ? "shadow-lg" : ""}`}
                  style={{ borderLeftColor: getImpactColor(recommendation.impact) }}
                >
                  <CardHeader className="flex flex-row items-start gap-4 pb-2">
                    <div className="mt-1 transition-transform duration-300 hover:scale-110">{recommendation.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant={getImpactVariant(recommendation.impact)}>{recommendation.impact} Impact</Badge>
                        <Badge variant="outline">ROI: {recommendation.roi}</Badge>
                        <Badge variant="secondary">{recommendation.category}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{recommendation.description}</p>

                    <AnimatePresence>
                      {expandedCard === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t"
                        >
                          <p className="text-sm text-gray-700">{recommendation.details}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto hover:bg-gray-100 transition-colors"
                      onClick={() => toggleCard(index)}
                    >
                      {expandedCard === index ? "Show Less" : "View Details"}
                      <ArrowRight
                        className={`ml-2 h-4 w-4 transition-transform duration-300 ${expandedCard === index ? "rotate-90" : ""}`}
                      />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function getImpactColor(impact) {
  switch (impact) {
    case "High":
      return "#22c55e" // green-500
    case "Medium":
      return "#f59e0b" // amber-500
    case "Low":
      return "#64748b" // slate-500
    default:
      return "#6366f1" // indigo-500
  }
}

function getImpactVariant(impact) {
  switch (impact) {
    case "High":
      return "success"
    case "Medium":
      return "warning"
    case "Low":
      return "secondary"
    default:
      return "default"
  }
}

