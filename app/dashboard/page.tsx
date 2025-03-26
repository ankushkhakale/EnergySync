"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BarChart, Battery, Cloud, Download, LineChart, Settings, Sun, Wind } from "lucide-react"
import EnergyUsageChart from "@/app/dashboard/energy-usage-chart"
import CarbonEmissionsChart from "@/app/dashboard/carbon-emissions-chart"
import EnergySourcesChart from "@/app/dashboard/energy-sources-chart"
import RecommendationsPanel from "@/app/dashboard/recommendations-panel"
import Navbar from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import gsap from "gsap"

export default function DashboardPage() {
  useEffect(() => {
    // GSAP animations for dashboard elements
    const timeline = gsap.timeline()

    timeline.from(".dashboard-header", {
      y: -20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    })

    timeline.from(
      ".dashboard-title",
      {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      },
      "-=0.3",
    )

    timeline.from(
      ".dashboard-card",
      {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.3",
    )

    timeline.from(
      ".dashboard-tabs",
      {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      },
      "-=0.3",
    )

    return () => {
      timeline.kill()
    }
  }, [])

  // Card hover animation
  const cardVariants = {
    initial: { y: 0 },
    hover: {
      y: -5,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { type: "spring", stiffness: 300 },
    },
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container py-6 mt-20">
        <div className="flex flex-col gap-6">
          <div className="dashboard-header flex items-center justify-between">
            <div>
              <Badge className="mb-2">Dashboard</Badge>
              <h2 className="dashboard-title text-3xl font-bold tracking-tight">Energy Analytics</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm" className="bg-green-500 hover:bg-green-600 hover:scale-105 transition-transform">
                <Cloud className="mr-2 h-4 w-4" />
                Sync with Google Cloud
              </Button>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Total Energy Usage",
                value: "45,231 kWh",
                change: "-12%",
                icon: <Battery className="h-4 w-4 text-muted-foreground" />,
              },
              {
                title: "Renewable Energy",
                value: "68.2%",
                change: "+5.4%",
                icon: <Sun className="h-4 w-4 text-muted-foreground" />,
              },
              {
                title: "Carbon Emissions",
                value: "12.5 tons",
                change: "-8.1%",
                icon: <Wind className="h-4 w-4 text-muted-foreground" />,
              },
              {
                title: "Cost Savings",
                value: "$12,234",
                change: "+14.2%",
                icon: <LineChart className="h-4 w-4 text-muted-foreground" />,
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                className="dashboard-card"
                variants={cardVariants}
                initial="initial"
                whileHover="hover"
              >
                <Card className="border-none shadow-md overflow-hidden">
                  <div className="absolute h-1 top-0 left-0 right-0 bg-gradient-to-r from-green-400 to-teal-500"></div>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                    {card.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">{card.change}</span> from last month
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts and Analytics */}
          <Tabs defaultValue="usage" className="dashboard-tabs space-y-4">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger
                value="usage"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
              >
                Energy Usage
              </TabsTrigger>
              <TabsTrigger
                value="sources"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
              >
                Energy Sources
              </TabsTrigger>
              <TabsTrigger
                value="carbon"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
              >
                Carbon Emissions
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
              >
                AI Recommendations
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="usage" className="space-y-4 mt-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Energy Usage Over Time</CardTitle>
                      <CardDescription>Monitor your daily energy consumption patterns</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <EnergyUsageChart />
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="sources" className="space-y-4 mt-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Energy Sources Distribution</CardTitle>
                      <CardDescription>Breakdown of your energy sources</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <EnergySourcesChart />
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="carbon" className="space-y-4 mt-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Carbon Emissions Tracking</CardTitle>
                      <CardDescription>Monitor your carbon footprint over time</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <CarbonEmissionsChart />
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4 mt-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <RecommendationsPanel />
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>

          {/* Google Cloud Integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Google Cloud Services Integration</CardTitle>
                <CardDescription>Connected services and data pipelines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { name: "BigQuery", status: "Connected", icon: <BarChart className="h-5 w-5" /> },
                    { name: "Vertex AI", status: "Connected", icon: <Cloud className="h-5 w-5" /> },
                    { name: "IoT Core", status: "Connected", icon: <Settings className="h-5 w-5" /> },
                  ].map((service, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="flex items-center p-4 border rounded-lg hover:border-green-500 transition-colors">
                        <div className="mr-4 bg-green-100 p-2 rounded-full">{service.icon}</div>
                        <div>
                          <h3 className="font-medium">{service.name}</h3>
                          <p className="text-sm text-green-500">{service.status}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

function Zap({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}

