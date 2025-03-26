"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, Filter, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

// Mock data for energy analytics
const generateDailyData = () => {
  const data = []
  for (let i = 1; i <= 30; i++) {
    data.push({
      day: `Day ${i}`,
      consumption: Math.floor(Math.random() * 50) + 100,
      production: Math.floor(Math.random() * 70) + 50,
      savings: Math.floor(Math.random() * 30) + 20,
    })
  }
  return data
}

const generateMonthlyData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return months.map((month) => ({
    month,
    consumption: Math.floor(Math.random() * 500) + 1000,
    production: Math.floor(Math.random() * 700) + 500,
    savings: Math.floor(Math.random() * 300) + 200,
  }))
}

const generateHourlyData = () => {
  const data = []
  for (let i = 0; i < 24; i++) {
    data.push({
      hour: `${i}:00`,
      consumption: Math.floor(Math.random() * 20) + 10,
      production: i > 6 && i < 19 ? Math.floor(Math.random() * 30) + 15 : Math.floor(Math.random() * 5),
    })
  }
  return data
}

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("daily")
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      switch (timeframe) {
        case "hourly":
          setData(generateHourlyData())
          break
        case "monthly":
          setData(generateMonthlyData())
          break
        default:
          setData(generateDailyData())
      }
      setIsLoading(false)
    }, 800)
  }, [timeframe])

  const handleRefresh = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      switch (timeframe) {
        case "hourly":
          setData(generateHourlyData())
          break
        case "monthly":
          setData(generateMonthlyData())
          break
        default:
          setData(generateDailyData())
      }
      setIsLoading(false)
    }, 800)
  }

  const xAxisKey = timeframe === "monthly" ? "month" : timeframe === "hourly" ? "hour" : "day"

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Badge className="mb-2">Analytics</Badge>
          <h1 className="text-3xl font-bold tracking-tight">Energy Analytics</h1>
          <p className="text-gray-500 mt-1">Detailed analysis of your energy consumption and production</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select defaultValue="last30days">
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
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231 kWh</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">-12%</span> from previous period
            </p>
            <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: "65%" }}></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Energy Production</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32,891 kWh</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">+8.4%</span> from previous period
            </p>
            <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full" style={{ width: "78%" }}></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,842</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">+15.2%</span> from previous period
            </p>
            <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="bg-teal-500 h-full rounded-full" style={{ width: "85%" }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Energy Trends</CardTitle>
              <CardDescription>Visualize your energy consumption and production over time</CardDescription>
            </div>
            <div className="flex">
              <Tabs defaultValue="daily" onValueChange={setTimeframe} className="w-full">
                <TabsList>
                  <TabsTrigger value="hourly">Hourly</TabsTrigger>
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            {isLoading ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey={xAxisKey} tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
                  <YAxis unit=" kWh" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="consumption"
                    name="Consumption"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="production"
                    name="Production"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                  />
                  {timeframe !== "hourly" && (
                    <Line
                      type="monotone"
                      dataKey="savings"
                      name="Savings"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 8, strokeWidth: 0 }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Consumption by Source</CardTitle>
            <CardDescription>Breakdown of energy consumption by source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {isLoading ? (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "HVAC", value: 35 },
                      { name: "Lighting", value: 25 },
                      { name: "Equipment", value: 20 },
                      { name: "Data Center", value: 15 },
                      { name: "Other", value: 5 },
                    ]}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis unit="%" />
                    <Tooltip />
                    <Bar dataKey="value" name="Percentage" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Production by Source</CardTitle>
            <CardDescription>Breakdown of energy production by source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {isLoading ? (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Solar", value: 60 },
                      { name: "Wind", value: 25 },
                      { name: "Hydro", value: 10 },
                      { name: "Biomass", value: 5 },
                    ]}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis unit="%" />
                    <Tooltip />
                    <Bar dataKey="value" name="Percentage" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

