"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calendar, Download, Filter, RefreshCw, BarChart2, PieChartIcon, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/navbar"

// Energy data types
type EnergyData = {
  timestamp: string
  consumption: number
  production: number
  grid: number
  battery: number
}

type EnergySourceData = {
  source: string
  percentage: number
  value: number
}

type PeakData = {
  hour: number
  day: string
  consumption: number
}

type WeatherData = {
  date: string
  temperature: number
  solarRadiation: number
  windSpeed: number
  precipitation: number
  consumption: number
}

export default function EnergyAnalyticsPage() {
  const [timeframe, setTimeframe] = useState("daily")
  const [dateRange, setDateRange] = useState("last30days")
  const [isLoading, setIsLoading] = useState(true)
  const [energyData, setEnergyData] = useState<EnergyData[]>([])
  const [energySources, setEnergySources] = useState<EnergySourceData[]>([])
  const [peakData, setPeakData] = useState<PeakData[]>([])
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [comparisonEnabled, setComparisonEnabled] = useState(false)
  const { toast } = useToast()

  // Intersection observer for animations
  const [overviewRef, overviewInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [detailsRef, detailsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [sourcesRef, sourcesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [weatherRef, weatherInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Fetch energy data
  useEffect(() => {
    // fetchEnergyData()
  }, [timeframe, dateRange])

  const fetchEnergyData = async () => {
    setIsLoading(true)

    try {
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate mock data based on timeframe and date range
      const data = generateMockEnergyData(timeframe, dateRange)
      setEnergyData(data.energyData)
      setEnergySources(data.energySources)
      setPeakData(data.peakData)
      setWeatherData(data.weatherData)
    } catch (error) {
      console.error("Error fetching energy data:", error)
      toast({
        title: "Error",
        description: "Failed to fetch energy data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Generate mock energy data
  const generateMockEnergyData = (timeframe: string, dateRange: string) => {
    const energyData: EnergyData[] = []
    const now = new Date()
    let dataPoints = 0

    // Determine number of data points based on timeframe and date range
    switch (timeframe) {
      case "hourly":
        dataPoints = 24
        break
      case "daily":
        dataPoints = dateRange === "last7days" ? 7 : dateRange === "last30days" ? 30 : 12
        break
      case "monthly":
        dataPoints = 12
        break
      default:
        dataPoints = 30
    }

    // Generate energy data
    for (let i = 0; i < dataPoints; i++) {
      const date = new Date(now)

      if (timeframe === "hourly") {
        date.setHours(i)
        date.setMinutes(0)
        date.setSeconds(0)
      } else if (timeframe === "daily") {
        date.setDate(date.getDate() - (dataPoints - i - 1))
      } else if (timeframe === "monthly") {
        date.setMonth(date.getMonth() - (dataPoints - i - 1))
        date.setDate(1)
      }

      // Base values with some randomization
      const baseConsumption = 30 + Math.random() * 20
      const baseProduction = timeframe === "hourly" && (i < 6 || i > 18) ? 0 : 20 + Math.random() * 30

      // Add time-of-day patterns for hourly data
      let consumption = baseConsumption
      let production = baseProduction

      if (timeframe === "hourly") {
        // Morning peak
        if (i >= 6 && i <= 9) {
          consumption += 15 + Math.random() * 10
        }
        // Evening peak
        if (i >= 17 && i <= 21) {
          consumption += 20 + Math.random() * 15
        }
        // Solar production peak during midday
        if (i >= 10 && i <= 15) {
          production += 15 + Math.random() * 10
        }
      }

      // Calculate grid and battery values
      const surplus = production - consumption
      const battery = Math.max(0, surplus * 0.7) // 70% of surplus goes to battery
      const grid = surplus < 0 ? Math.abs(surplus) : 0 // Draw from grid if consumption > production

      energyData.push({
        timestamp: date.toISOString(),
        consumption,
        production,
        grid,
        battery,
      })
    }

    // Generate energy sources data
    const energySources: EnergySourceData[] = [
      { source: "Solar", percentage: 65, value: 650 },
      { source: "Wind", percentage: 15, value: 150 },
      { source: "Grid", percentage: 15, value: 150 },
      { source: "Battery", percentage: 5, value: 50 },
    ]

    // Generate peak consumption data
    const peakData: PeakData[] = []
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

    for (let day = 0; day < 7; day++) {
      for (let hour = 0; hour < 24; hour += 2) {
        let consumption = 20 + Math.random() * 10

        // Add patterns
        if (hour >= 6 && hour <= 9) {
          consumption += 15 + Math.random() * 10 // Morning peak
        }
        if (hour >= 17 && hour <= 21) {
          consumption += 20 + Math.random() * 15 // Evening peak
        }
        if (day >= 5) {
          consumption -= 5 // Lower consumption on weekends
        }

        peakData.push({
          day: days[day],
          hour,
          consumption,
        })
      }
    }

    // Generate weather correlation data
    const weatherData: WeatherData[] = []

    for (let i = 0; i < 30; i++) {
      const date = new Date(now)
      date.setDate(date.getDate() - (30 - i - 1))

      const temperature = 60 + Math.random() * 30 // 60-90°F
      const solarRadiation = 200 + Math.random() * 600 // 200-800 W/m²
      const windSpeed = 2 + Math.random() * 18 // 2-20 mph
      const precipitation = Math.random() * 0.5 // 0-0.5 inches

      // Consumption correlates with temperature (higher in extreme temps)
      let consumption = 30 + Math.random() * 10

      // Higher consumption on hot days (AC usage)
      if (temperature > 80) {
        consumption += (temperature - 80) * 2
      }
      // Higher consumption on cold days (heating)
      if (temperature < 65) {
        consumption += (65 - temperature) * 1.5
      }
      // Lower solar production on rainy days
      if (precipitation > 0.2) {
        consumption += 5 // More grid usage on rainy days
      }

      weatherData.push({
        date: date.toISOString().split("T")[0],
        temperature,
        solarRadiation,
        windSpeed,
        precipitation,
        consumption,
      })
    }

    return { energyData, energySources, peakData, weatherData }
  }

  // Handle refresh
  const handleRefresh = () => {
    // fetchEnergyData()

    toast({
      title: "Data refreshed",
      description: "Energy analytics data has been updated.",
    })
  }

  // Handle export
  const handleExport = () => {
    // Create a downloadable JSON file
    const dataStr = JSON.stringify(
      {
        energyData,
        energySources,
        peakData,
        weatherData,
        timeframe,
        dateRange,
      },
      null,
      2,
    )
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportName = `energysync-analytics-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportName)
    linkElement.click()

    toast({
      title: "Export successful",
      description: "Energy analytics data has been exported successfully.",
    })
  }

  // Toggle comparison mode
  const toggleComparison = () => {
    setComparisonEnabled(!comparisonEnabled)
  }

  // Format timestamp based on timeframe
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)

    if (timeframe === "hourly") {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (timeframe === "daily") {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    } else if (timeframe === "monthly") {
      return date.toLocaleDateString([], { month: "short", year: "numeric" })
    }

    return timestamp
  }

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800">{label}</p>
          <div className="mt-2">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center mt-1">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                <span className="text-gray-600">{entry.name}: </span>
                <span className="ml-1 font-medium">{entry.value.toFixed(2)} kWh</span>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  // COLORS for charts
  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
        >
          <div>
            <Badge className="mb-2">Energy Analytics</Badge>
            <h1 className="text-3xl font-bold tracking-tight">Energy Usage Dashboard</h1>
            <p className="text-gray-500 mt-1">Detailed analysis of your energy consumption and production</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last7days">Last 7 days</SelectItem>
                <SelectItem value="last30days">Last 30 days</SelectItem>
                <SelectItem value="thisMonth">This month</SelectItem>
                <SelectItem value="lastMonth">Last month</SelectItem>
                <SelectItem value="thisYear">This year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </motion.div>

        <div className="space-y-8">
          {/* Overview Section */}
          <motion.div
            ref={overviewRef}
            initial={{ opacity: 0, y: 20 }}
            animate={overviewInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Consumption</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">1,245 kWh</div>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="text-green-500">-8.3%</span> from previous period
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Production</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">1,890 kWh</div>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="text-green-500">+12.5%</span> from previous period
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Grid Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600">320 kWh</div>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="text-green-500">-15.2%</span> from previous period
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Self-Sufficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-teal-600">85.2%</div>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="text-green-500">+5.8%</span> from previous period
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Main Chart */}
          <motion.div
            ref={detailsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={detailsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-none shadow-lg">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Energy Usage Trends</CardTitle>
                    <CardDescription>Visualize your energy consumption and production over time</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <Tabs defaultValue={timeframe} onValueChange={setTimeframe} className="w-full">
                      <TabsList>
                        <TabsTrigger value="hourly">Hourly</TabsTrigger>
                        <TabsTrigger value="daily">Daily</TabsTrigger>
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <Button variant="outline" size="sm" onClick={toggleComparison}>
                      {comparisonEnabled ? "Hide Comparison" : "Compare"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Energy usage chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Energy Sources */}
          <motion.div
            ref={sourcesRef}
            initial={{ opacity: 0, y: 20 }}
            animate={sourcesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <div className="flex items-center">
                    <PieChartIcon className="h-5 w-5 mr-2 text-teal-600" />
                    <CardTitle>Energy Sources</CardTitle>
                  </div>
                  <CardDescription>Breakdown of your energy sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Energy sources chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <div className="flex items-center">
                    <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
                    <CardTitle>Peak Usage Analysis</CardTitle>
                  </div>
                  <CardDescription>Identify peak energy consumption patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Peak usage chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Weather Correlation */}
          <motion.div
            ref={weatherRef}
            initial={{ opacity: 0, y: 20 }}
            animate={weatherInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-none shadow-lg">
              <CardHeader>
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                  <CardTitle>Weather Impact Analysis</CardTitle>
                </div>
                <CardDescription>Analyze how weather affects your energy usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Weather impact chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

