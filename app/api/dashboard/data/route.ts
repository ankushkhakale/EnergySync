import { NextResponse } from "next/server"

// Generate mock data for the dashboard
function generateMockData() {
  // Energy usage data
  const energyUsage = Array.from({ length: 30 }, (_, i) => ({
    date: `2025-03-${(i + 1).toString().padStart(2, "0")}`,
    consumption: Math.floor(Math.random() * 50) + 100,
    production: Math.floor(Math.random() * 70) + 50,
    savings: Math.floor(Math.random() * 30) + 20,
  }))

  // Energy sources data
  const energySources = [
    { name: "Solar", value: 45 },
    { name: "Wind", value: 23 },
    { name: "Hydro", value: 8 },
    { name: "Natural Gas", value: 15 },
    { name: "Grid Power", value: 9 },
  ]

  // Carbon emissions data
  const carbonEmissions = Array.from({ length: 12 }, (_, i) => {
    const baseValue = 25 - i * 1.2
    return {
      month: new Date(2025, i, 1).toLocaleString("default", { month: "short" }),
      emissions: Math.max(10, baseValue + (Math.random() * 3 - 1.5)),
      target: 12 - i * 0.2,
    }
  })

  // Recommendations
  const recommendations = [
    {
      title: "Increase Solar Panel Capacity",
      description:
        "Adding 20kW of solar capacity could reduce grid dependency by 15% and save approximately $8,500 annually.",
      impact: "High",
      roi: "24 months",
      category: "Investment",
    },
    {
      title: "Implement Smart Energy Storage",
      description:
        "Installing a 50kWh battery system would optimize energy usage during peak hours and provide backup power.",
      impact: "Medium",
      roi: "36 months",
      category: "Investment",
    },
    {
      title: "Optimize HVAC Schedule",
      description: "Adjusting your HVAC schedule based on occupancy patterns could reduce energy consumption by 12%.",
      impact: "Medium",
      roi: "3 months",
      category: "Optimization",
    },
    {
      title: "Upgrade to LED Lighting",
      description: "Replacing remaining non-LED lighting could reduce lighting energy consumption by up to 75%.",
      impact: "Low",
      roi: "12 months",
      category: "Upgrade",
    },
    {
      title: "Address Energy Anomalies",
      description:
        "Our AI has detected unusual energy consumption patterns on weekends. Investigating could save 5-8% on monthly bills.",
      impact: "Medium",
      roi: "Immediate",
      category: "Alert",
    },
  ]

  return {
    energyUsage,
    energySources,
    carbonEmissions,
    recommendations,
    summary: {
      totalConsumption: 45231,
      totalProduction: 32891,
      costSavings: 5842,
      carbonReduction: 12.5,
    },
  }
}

export async function GET() {
  try {
    // In a real app, you would fetch this data from a database or external API
    const data = generateMockData()

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error("Dashboard data error:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while fetching dashboard data" },
      { status: 500 },
    )
  }
}

