"use client"

import { useEffect, useState, useRef } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"

// Mock data for energy usage
const generateMockData = () => {
  const data = []
  const now = new Date()

  for (let i = 1; i <= 15; i++) {
    const peakHours = Math.random() * 30 + 70
    const offPeakHours = Math.random() * 20 + 30

    data.push({
      date: `Mar ${i}`,
      "Peak Hours": peakHours,
      "Off-Peak Hours": offPeakHours,
      Total: peakHours + offPeakHours,
    })
  }

  return data
}

export default function EnergyUsageChart() {
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

  // Custom tooltip styles
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
                <span className="ml-1 font-medium">{entry.value.toFixed(1)} kWh</span>
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
            <XAxis dataKey="date" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
            <YAxis unit=" kWh" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                paddingTop: "10px",
                borderTop: "1px solid #e5e7eb",
              }}
            />
            <Line
              type="monotone"
              dataKey="Peak Hours"
              stroke="#0ea5e9"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 8, strokeWidth: 0, fill: "#0ea5e9" }}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Line
              type="monotone"
              dataKey="Off-Peak Hours"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 8, strokeWidth: 0, fill: "#22c55e" }}
              animationDuration={1500}
              animationEasing="ease-out"
              animationBegin={300}
            />
            <Line
              type="monotone"
              dataKey="Total"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 8, strokeWidth: 0, fill: "#6366f1" }}
              animationDuration={1500}
              animationEasing="ease-out"
              animationBegin={600}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      )}
    </motion.div>
  )
}

