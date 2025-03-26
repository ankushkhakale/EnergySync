"use client"

import { useEffect, useState, useRef } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"

// Mock data for carbon emissions
const generateMockData = () => {
  const data = []
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // Start with higher values and gradually decrease to show improvement
  let baseValue = 25

  for (let i = 0; i < 12; i++) {
    // Decrease by a small random amount each month
    baseValue = baseValue - Math.random() * 1.5
    if (baseValue < 10) baseValue = 10 // Set a floor

    data.push({
      month: months[i],
      emissions: baseValue + (Math.random() * 3 - 1.5), // Add some variance
      target: 12 - i * 0.2, // Decreasing target line
    })
  }

  return data
}

export default function CarbonEmissionsChart() {
  const [data, setData] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const chartRef = useRef(null)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setData(generateMockData())
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800">{label}</p>
          <div className="mt-2">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center mt-1">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                <span className="text-gray-600">{entry.name}: </span>
                <span className="ml-1 font-medium">{entry.value.toFixed(1)} tons</span>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <motion.div
      ref={chartRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      {isLoaded ? (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
            <YAxis unit=" tons" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                paddingTop: "10px",
                borderTop: "1px solid #e5e7eb",
              }}
            />
            <defs>
              <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="emissions"
              stroke="#ef4444"
              fill="url(#colorEmissions)"
              fillOpacity={0.6}
              name="Carbon Emissions"
              stroke
              fillOpacity={0.6}
              name="Carbon Emissions"
              strokeWidth={3}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="#22c55e"
              fill="none"
              strokeDasharray="5 5"
              name="Reduction Target"
              strokeWidth={2}
              animationDuration={1500}
              animationEasing="ease-out"
              animationBegin={300}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      )}
    </motion.div>
  )
}

