"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Leaf, ArrowRight, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AnimatedButton } from "@/components/animated-button"
import Navbar from "@/components/navbar"

export default function CaseStudiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("all")
  const [selectedSolution, setSelectedSolution] = useState("all")
  const [featuredOnly, setFeaturedOnly] = useState(false)

  // Sample case studies data
  const caseStudies = [
    {
      id: 1,
      title: "Global Manufacturing Corp: 30% Energy Reduction",
      excerpt: "How a multinational manufacturing company reduced energy costs and carbon emissions with EnergySync.",
      industry: "Manufacturing",
      solution: "Energy Analytics",
      results: [
        "30% reduction in energy consumption",
        "Annual savings of $1.2 million",
        "15% decrease in carbon emissions",
      ],
      image: "/placeholder.svg?height=300&width=600",
      featured: true,
      downloadLink: "#",
    },
    {
      id: 2,
      title: "Coastal Haven City: Building Energy Resilience",
      excerpt: "A coastal city's journey to energy resilience through microgrids and renewable integration.",
      industry: "Government",
      solution: "Community Solutions",
      results: [
        "Critical facilities maintained power during 3 major storms",
        "Reduced outage time by 60% for residential areas",
        "Integrated 5MW of distributed solar + storage",
      ],
      image: "/placeholder.svg?height=300&width=600",
      featured: true,
      downloadLink: "#",
    },
    {
      id: 3,
      title: "TechForward Inc: Carbon Neutral Operations",
      excerpt: "How a technology company achieved carbon neutrality ahead of schedule with EnergySync.",
      industry: "Technology",
      solution: "Carbon Tracking",
      results: [
        "Achieved carbon neutrality 2 years ahead of schedule",
        "Optimized HVAC systems for 30% energy savings",
        "Enhanced sustainability reporting for investors",
      ],
      image: "/placeholder.svg?height=300&width=600",
      featured: false,
      downloadLink: "#",
    },
    {
      id: 4,
      title: "Retail Chain Group: Multi-Location Energy Management",
      excerpt: "How a retail chain standardized energy management across 200+ locations nationwide.",
      industry: "Retail",
      solution: "Energy Analytics",
      results: [
        "15% reduction in overall energy costs",
        "Standardized sustainability practices across all locations",
        "Improved store comfort while reducing energy usage",
      ],
      image: "/placeholder.svg?height=300&width=600",
      featured: false,
      downloadLink: "#",
    },
    {
      id: 5,
      title: "Mountain Valley Hospital: Healthcare Energy Optimization",
      excerpt: "A hospital's journey to balance 24/7 operational needs with energy efficiency goals.",
      industry: "Healthcare",
      solution: "Energy Analytics",
      results: [
        "22% reduction in energy costs while maintaining patient comfort",
        "Improved backup power system reliability",
        "Achieved healthcare sustainability certification",
      ],
      image: "/placeholder.svg?height=300&width=600",
      featured: false,
      downloadLink: "#",
    },
    {
      id: 6,
      title: "Westside University: Campus-Wide Sustainability",
      excerpt: "How a university engaged students and faculty in energy conservation initiatives.",
      industry: "Education",
      solution: "Community Solutions",
      results: [
        "25% energy reduction across campus",
        "$850,000 annual utility savings",
        "Created student-led sustainability programs",
      ],
      image: "/placeholder.svg?height=300&width=600",
      featured: false,
      downloadLink: "#",
    },
    {
      id: 7,
      title: "Sunrise Solar Farm: Optimizing Renewable Production",
      excerpt: "How AI-powered analytics helped maximize output from a 50MW solar installation.",
      industry: "Energy",
      solution: "Investment Optimizer",
      results: [
        "12% increase in energy production",
        "Predictive maintenance reduced downtime by 30%",
        "ROI on analytics platform achieved in 8 months",
      ],
      image: "/placeholder.svg?height=300&width=600",
      featured: false,
      downloadLink: "#",
    },
    {
      id: 8,
      title: "Highland Office Park: Commercial Building Efficiency",
      excerpt: "A commercial real estate company's approach to modernizing energy systems in older buildings.",
      industry: "Real Estate",
      solution: "Energy Analytics",
      results: [
        "32% improved HVAC efficiency",
        "Reduced tenant energy bills by 18%",
        "Enhanced building sustainability rating",
      ],
      image: "/placeholder.svg?height=300&width=600",
      featured: false,
      downloadLink: "#",
    },
  ]

  // Filter case studies based on search and filters
  const filteredCaseStudies = caseStudies.filter((study) => {
    const matchesSearch =
      searchQuery === "" ||
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.solution.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesIndustry = selectedIndustry === "all" || study.industry === selectedIndustry
    const matchesSolution = selectedSolution === "all" || study.solution === selectedSolution
    const matchesFeatured = !featuredOnly || study.featured

    return matchesSearch && matchesIndustry && matchesSolution && matchesFeatured
  })

  // Get unique industries and solutions for filters
  const industries = ["all", ...new Set(caseStudies.map((study) => study.industry))]
  const solutions = ["all", ...new Set(caseStudies.map((study) => study.solution))]

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
          <h1 className="text-4xl font-bold mb-4">Case Studies</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore how organizations across industries have transformed their energy management with EnergySync.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search case studies..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry === "all" ? "All Industries" : industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={selectedSolution} onValueChange={setSelectedSolution}>
                  <SelectTrigger>
                    <SelectValue placeholder="Solution" />
                  </SelectTrigger>
                  <SelectContent>
                    {solutions.map((solution) => (
                      <SelectItem key={solution} value={solution}>
                        {solution === "all" ? "All Solutions" : solution}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Checkbox
                id="featured"
                checked={featuredOnly}
                onCheckedChange={(checked) => setFeaturedOnly(checked as boolean)}
              />
              <label
                htmlFor="featured"
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Featured case studies only
              </label>
            </div>
          </div>
        </div>

        {/* Featured Case Studies */}
        {filteredCaseStudies.some((study) => study.featured) && !featuredOnly && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Badge className="mr-2 bg-teal-600">Featured</Badge> Case Studies
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {filteredCaseStudies
                .filter((study) => study.featured)
                .map((study) => (
                  <motion.div
                    key={study.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="border-none shadow-lg overflow-hidden h-full">
                      <div className="relative h-60">
                        <img
                          src={study.image || "/placeholder.svg"}
                          alt={study.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-teal-600 hover:bg-teal-700">Featured</Badge>
                        </div>
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
                            {study.industry}
                          </Badge>
                          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
                            {study.solution}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-2xl">{study.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{study.excerpt}</p>
                        <h4 className="font-medium mb-2">Key Results:</h4>
                        <ul className="space-y-1 mb-4">
                          {study.results.map((result, i) => (
                            <li key={i} className="flex items-start text-sm">
                              <Leaf className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>{result}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <AnimatedButton href={`/resources/case-studies/${study.id}`} variant="primary">
                          Read Full Case Study
                        </AnimatedButton>
                        <Button variant="outline" size="icon" asChild>
                          <a href={study.downloadLink} download>
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* All Case Studies */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{featuredOnly ? "Featured Case Studies" : "All Case Studies"}</h2>
          {filteredCaseStudies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCaseStudies
                .filter((study) => !study.featured || featuredOnly)
                .map((study) => (
                  <motion.div
                    key={study.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="border-none shadow-md overflow-hidden h-full">
                      <div className="relative h-48">
                        <img
                          src={study.image || "/placeholder.svg"}
                          alt={study.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
                            {study.industry}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle>{study.title}</CardTitle>
                        <CardDescription>{study.solution}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4 line-clamp-2">{study.excerpt}</p>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Key result: </span>
                          {study.results[0]}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <a
                          href={`/resources/case-studies/${study.id}`}
                          className="text-teal-600 font-medium flex items-center hover:text-teal-700 transition-colors"
                        >
                          Read more
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                        <Button variant="ghost" size="icon" asChild>
                          <a href={study.downloadLink} download>
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">No case studies found</h3>
              <p className="text-gray-600 mb-4">We couldn't find any case studies matching your search criteria.</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedIndustry("all")
                  setSelectedSolution("all")
                  setFeaturedOnly(false)
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 bg-gradient-to-r from-teal-600 to-green-600 rounded-xl p-10 text-white"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Want to Be Our Next Success Story?</h2>
            <p className="mb-6">
              Discover how EnergySync can help your organization optimize energy usage, reduce costs, and achieve
              sustainability goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton href="/demo-request" variant="demo" className="bg-white text-teal-600 hover:bg-white/90">
                Book a Demo
              </AnimatedButton>
              <AnimatedButton href="/contact" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Sales
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

