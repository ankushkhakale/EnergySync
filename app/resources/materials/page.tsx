"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, BookOpen, Download, FileText, Video, Filter, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/navbar"

export default function EducationalMaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const { toast } = useToast()

  const categories = [
    "Energy Analytics",
    "Carbon Tracking",
    "Investment Optimization",
    "Sustainability",
    "Renewable Energy",
    "Compliance",
  ]

  const resourceTypes = ["Whitepaper", "Case Study", "eBook", "Infographic", "Video", "Webinar Recording"]

  const resources = [
    {
      title: "The Complete Guide to Energy Analytics",
      description: "Learn how advanced analytics can transform your organization's energy management.",
      type: "Whitepaper",
      category: "Energy Analytics",
      downloadLink: "#",
      image: "/placeholder.svg?height=200&width=400",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Carbon Tracking Best Practices",
      description: "A comprehensive overview of carbon measurement and reporting methodologies.",
      type: "eBook",
      category: "Carbon Tracking",
      downloadLink: "#",
      image: "/placeholder.svg?height=200&width=400",
      icon: <BookOpen className="h-6 w-6 text-green-500" />,
    },
    {
      title: "ROI Calculator for Renewable Investments",
      description: "Interactive tool to calculate returns on various renewable energy investments.",
      type: "Infographic",
      category: "Investment Optimization",
      downloadLink: "#",
      image: "/placeholder.svg?height=200&width=400",
      icon: <FileText className="h-6 w-6 text-amber-500" />,
    },
    {
      title: "Global Manufacturing Corp: Energy Efficiency Case Study",
      description: "How a leading manufacturer reduced energy costs by 20% using EnergySync.",
      type: "Case Study",
      category: "Energy Analytics",
      downloadLink: "#",
      image: "/placeholder.svg?height=200&width=400",
      icon: <FileText className="h-6 w-6 text-purple-500" />,
    },
    {
      title: "Optimizing Battery Storage Systems",
      description: "Technical guide to maximizing ROI from battery storage installations.",
      type: "Whitepaper",
      category: "Renewable Energy",
      downloadLink: "#",
      image: "/placeholder.svg?height=200&width=400",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Future of Energy Management Webinar",
      description: "Expert panel discusses emerging trends in energy optimization and sustainability.",
      type: "Webinar Recording",
      category: "Sustainability",
      downloadLink: "#",
      image: "/placeholder.svg?height=200&width=400",
      icon: <Video className="h-6 w-6 text-red-500" />,
    },
    {
      title: "Regulatory Compliance Framework",
      description: "Stay compliant with evolving energy and carbon regulations in your region.",
      type: "eBook",
      category: "Compliance",
      downloadLink: "#",
      image: "/placeholder.svg?height=200&width=400",
      icon: <BookOpen className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Understanding Scope 3 Emissions",
      description: "Comprehensive guide to measuring and reporting Scope 3 emissions.",
      type: "Whitepaper",
      category: "Carbon Tracking",
      downloadLink: "#",
      image: "/placeholder.svg?height=200&width=400",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Renewable Energy Investment Strategies",
      description: "Financial models and approaches for optimizing renewable energy investments.",
      type: "Video",
      category: "Investment Optimization",
      downloadLink: "#",
      image: "/placeholder.svg?height=200&width=400",
      icon: <Video className="h-6 w-6 text-red-500" />,
    },
  ]

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const handleDownload = (resource: any) => {
    toast({
      title: "Download Started",
      description: `${resource.title} is being downloaded.`,
    })
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedTypes([])
    setSearchQuery("")
  }

  // Filter resources based on search query and selected filters
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      searchQuery === "" ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(resource.category)
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(resource.type)

    return matchesSearch && matchesCategory && matchesType
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4">Resources</Badge>
          <h1 className="text-4xl font-bold mb-4">Educational Materials</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access our library of free resources to learn more about energy management, carbon tracking, and renewable
            energy optimization.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/4"
          >
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Filters</h2>
                {(selectedCategories.length > 0 || selectedTypes.length > 0) && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2">
                    <X className="h-4 w-4 mr-1" /> Clear
                  </Button>
                )}
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3 flex items-center">
                  <Filter className="h-4 w-4 mr-2" /> Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryToggle(category)}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <Filter className="h-4 w-4 mr-2" /> Resource Types
                </h3>
                <div className="space-y-2">
                  {resourceTypes.map((type) => (
                    <div key={type} className="flex items-center">
                      <Checkbox
                        id={`type-${type}`}
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={() => handleTypeToggle(type)}
                      />
                      <label
                        htmlFor={`type-${type}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Resources Grid */}
          <div className="lg:w-3/4">
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search resources..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {filteredResources.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="border-none shadow-md overflow-hidden h-full">
                      <div className="relative h-40">
                        <img
                          src={resource.image || "/placeholder.svg"}
                          alt={resource.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm">
                            {resource.type}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-start">
                          <div className="mr-2 mt-1">{resource.icon}</div>
                          <span>{resource.title}</span>
                        </CardTitle>
                        <CardDescription>{resource.category}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col h-full">
                        <p className="text-sm text-gray-600 mb-4 flex-grow">{resource.description}</p>
                        <Button variant="outline" className="w-full" onClick={() => handleDownload(resource)}>
                          <Download className="mr-2 h-4 w-4" /> Download
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">No resources found</h3>
                <p className="text-gray-600 mb-4">We couldn't find any resources matching your search criteria.</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

