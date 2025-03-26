"use client"

import { useEffect, useState, useRef } from "react"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Sector } from "recharts"
import { motion } from "framer-motion"

// Mock data for energy sources
const generateMockData = () => {
  return [
    { name: "Solar", value: 45 },
    { name: "Wind", value: 23 },
    { name: "Hydro", value: 8 },
    { name: "Natural Gas", value: 15 },
    { name: "Grid Power", value: 9 },
  ]
}

const COLORS = ["#22c55e", "#0ea5e9", "#6366f1", "#f59e0b", "#64748b"]

export default function EnergySourcesChart() {
  const [data, setData] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
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
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: payload[0].payload.fill }} />
            <span className="font-medium text-gray-800">{payload[0].name}</span>
          </div>
          <p className="mt-1 text-xl font-bold">{payload[0].value}%</p>
        </div>
      )
    }
    return null
  }

  // Active shape for hover effect
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    )
  }

  const onPieEnter = (_, index) => {
    setActiveIndex(index)
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
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={150}
              dataKey="value"
              onMouseEnter={onPieEnter}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                paddingTop: "20px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      )}
    </motion.div>
  )
}

