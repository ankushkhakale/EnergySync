"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Search, Info, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/navbar"
import { useState } from "react"

// Complete list of all 17 SDGs with colors and icons
const allSdgGoals = [
  { id: 1, name: "No Poverty", color: "#E5243B", iconPath: "/placeholder.svg?height=60&width=60" },
  { id: 2, name: "Zero Hunger", color: "#DDA63A", iconPath: "/placeholder.svg?height=60&width=60" },
  { id: 3, name: "Good Health and Well-being", color: "#4C9F38", iconPath: "/placeholder.svg?height=60&width=60" },
  { id: 4, name: "Quality Education", color: "#C5192D", iconPath: "/placeholder.svg?height=60&width=60" },
  { id: 5, name: "Gender Equality", color: "#FF3A21", iconPath: "/placeholder.svg?height=60&width=60" },
  { id: 6, name: "Clean Water and Sanitation", color: "#26BDE2", iconPath: "/placeholder.svg?height=60&width=60" },
  { id: 7, name: "Affordable and Clean Energy", color: "#FCC30B", iconPath: "/placeholder.svg?height=60&width=60" },
  { id: 8, name: "Decent Work and Economic Growth", color: "#A21942", iconPath: "/placeholder.svg?height=60&width=60" },
  {
    id: 9,
    name: "Industry, Innovation and Infrastructure",
    color: "#FD6925",
    iconPath: "/placeholder.svg?height=60&width=60",
  },
  { id: 10, name: "Reduced Inequalities", color: "#DD1367", iconPath: "/placeholder.svg?height=60&width=60" },
  {
    id: 11,
    name: "Sustainable Cities and Communities",
    color: "#FD9D24",
    iconPath: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 12,
    name: "Responsible Consumption and Production",
    color: "#BF8B2E",
    iconPath: "/placeholder.svg?height=60&width=60",
  },
  { id: 13, name: "Climate Action", color: "#3F7E44", iconPath: "/placeholder.svg?height=60&width=60" },
  { id: 14, name: "Life Below Water", color: "#0A97D9", iconPath: "/placeholder.svg?height=60&width=60" },
  { id: 15, name: "Life on Land", color: "#56C02B", iconPath: "/placeholder.svg?height=60&width=60" },
  {
    id: 16,
    name: "Peace, Justice and Strong Institutions",
    color: "#00689D",
    iconPath: "/placeholder.svg?height=60&width=60",
  },
  { id: 17, name: "Partnerships for the Goals", color: "#19486A", iconPath: "/placeholder.svg?height=60&width=60" },
]

export default function GoalsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // Filter goals based on search query
  const filteredGoals = allSdgGoals.filter(
    (goal) => goal.name.toLowerCase().includes(searchQuery.toLowerCase()) || goal.id.toString().includes(searchQuery),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-20 mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">United Nations</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Sustainable Development Goals</h1>
            <p className="text-xl max-w-3xl mx-auto mb-12 text-white/90">
              Explore all 17 goals adopted by the United Nations as a universal call to action to end poverty, protect
              the planet, and ensure prosperity for all.
            </p>

            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search goals by name or number..."
                className="pl-10 py-6 bg-white text-gray-900 border-0 shadow-lg rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Goals Grid */}
        <section className="py-16">
          <div ref={ref} className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGoals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 1) }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="h-full"
                >
                  <Link href={`/goals/${goal.id}`} className="block h-full">
                    <Card
                      className="border-t-4 h-full shadow-md hover:shadow-lg transition-shadow"
                      style={{ borderTopColor: goal.color }}
                    >
                      <CardHeader className="pb-2 flex items-center">
                        <span
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3"
                          style={{ backgroundColor: goal.color }}
                        >
                          {goal.id}
                        </span>
                        <CardTitle className="text-lg">{goal.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <img
                            src={goal.iconPath || "/placeholder.svg"}
                            alt={goal.name}
                            className="w-16 h-16 object-contain"
                          />
                          <ArrowRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            {filteredGoals.length === 0 && (
              <div className="text-center py-12">
                <Info className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">No goals found</h3>
                <p className="text-gray-600">
                  We couldn't find any goals matching "{searchQuery}". Try a different search term.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* About SDGs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4">About the SDGs</Badge>
              <h2 className="text-3xl font-bold mb-6">What are the Sustainable Development Goals?</h2>
              <p className="text-lg text-gray-600 mb-8">
                The Sustainable Development Goals (SDGs), also known as the Global Goals, were adopted by the United
                Nations in 2015 as a universal call to action to end poverty, protect the planet, and ensure that by
                2030 all people enjoy peace and prosperity.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                The 17 SDGs are integrated—they recognize that action in one area will affect outcomes in others, and
                that development must balance social, economic and environmental sustainability.
              </p>
              <Link
                href="https://sdgs.un.org/goals"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
              >
                Learn more on the UN website
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">GlobalGoals</h3>
              <p className="text-gray-400">Educational platform for UN Sustainable Development Goals</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Explore</h3>
              <ul className="space-y-2">
                {["All Goals", "Resources", "Progress Tracker", "Get Involved"].map((item, index) => (
                  <li key={index}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                {["About Us", "Our Mission", "Partners", "Contact"].map((item, index) => (
                  <li key={index}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
                  <li key={index}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} GlobalGoals. Inspired by the UN Sustainable Development Goals.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

