"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, FileText, Book, Video, ChevronRight, ExternalLink, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AnimatedButton } from "@/components/animated-button"
import { Button } from "@/components/ui/button" // Added missing import
import Navbar from "@/components/navbar"

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample documentation categories
  const categories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <Book className="h-5 w-5 text-teal-600" />,
      items: [
        { title: "Platform Overview", link: "#", type: "guide" },
        { title: "Quick Start Guide", link: "#", type: "guide" },
        { title: "Account Setup", link: "#", type: "guide" },
        { title: "User Roles and Permissions", link: "#", type: "guide" },
        { title: "Dashboard Navigation", link: "#", type: "video" },
      ],
    },
    {
      id: "energy-analytics",
      title: "Energy Analytics",
      icon: <FileText className="h-5 w-5 text-teal-600" />,
      items: [
        { title: "Data Integration Guide", link: "#", type: "guide" },
        { title: "Creating Custom Reports", link: "#", type: "guide" },
        { title: "Setting Up Alerts", link: "#", type: "guide" },
        { title: "Advanced Analytics Features", link: "#", type: "video" },
        { title: "API Documentation", link: "#", type: "api" },
      ],
    },
    {
      id: "carbon-tracking",
      title: "Carbon Tracking",
      icon: <FileText className="h-5 w-5 text-teal-600" />,
      items: [
        { title: "Emissions Calculation Methodology", link: "#", type: "guide" },
        { title: "Scope 1, 2, and 3 Tracking", link: "#", type: "guide" },
        { title: "Regulatory Reporting", link: "#", type: "guide" },
        { title: "Carbon Reduction Planning", link: "#", type: "video" },
        { title: "Carbon API Reference", link: "#", type: "api" },
      ],
    },
    {
      id: "investment-optimizer",
      title: "Investment Optimizer",
      icon: <FileText className="h-5 w-5 text-teal-600" />,
      items: [
        { title: "Financial Modeling Guide", link: "#", type: "guide" },
        { title: "ROI Calculator Usage", link: "#", type: "guide" },
        { title: "Scenario Planning", link: "#", type: "guide" },
        { title: "Investment Comparison Tool", link: "#", type: "video" },
        { title: "Financial API Reference", link: "#", type: "api" },
      ],
    },
    {
      id: "api-reference",
      title: "API Reference",
      icon: <FileText className="h-5 w-5 text-teal-600" />,
      items: [
        { title: "Authentication", link: "#", type: "api" },
        { title: "Energy Data Endpoints", link: "#", type: "api" },
        { title: "Carbon Data Endpoints", link: "#", type: "api" },
        { title: "Financial Endpoints", link: "#", type: "api" },
        { title: "Webhooks and Events", link: "#", type: "api" },
      ],
    },
  ]

  // Popular documentation
  const popularDocs = [
    {
      title: "Getting Started with EnergySync",
      description: "A comprehensive guide to setting up your EnergySync account and navigating the platform.",
      category: "Getting Started",
      type: "guide",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Data Integration Guide",
      description: "Learn how to connect your energy data sources to the EnergySync platform.",
      category: "Energy Analytics",
      type: "guide",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Carbon Reporting Tutorial",
      description: "Step-by-step tutorial for generating carbon emissions reports for regulatory compliance.",
      category: "Carbon Tracking",
      type: "video",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "API Authentication",
      description: "Technical documentation for authenticating with the EnergySync API.",
      category: "API Reference",
      type: "api",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  // Filter documentation based on search
  const filteredCategories = categories
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          searchQuery === "" ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.items.length > 0)

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
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive guides, tutorials, and API references to help you get the most out of EnergySync.
          </p>
        </motion.div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search documentation..."
              className="pl-10 py-6 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Popular Documentation */}
        {searchQuery === "" && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Popular Documentation</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularDocs.map((doc, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="border-none shadow-md overflow-hidden h-full">
                    <div className="relative h-40">
                      <img
                        src={doc.image || "/placeholder.svg"}
                        alt={doc.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-4 text-white">
                          <Badge
                            className={`${
                              doc.type === "guide" ? "bg-teal-600" : doc.type === "video" ? "bg-red-600" : "bg-blue-600"
                            }`}
                          >
                            {doc.type === "guide" ? "Guide" : doc.type === "video" ? "Video" : "API"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      <CardDescription>{doc.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 line-clamp-2">{doc.description}</p>
                      <a
                        href="#"
                        className="mt-4 inline-flex items-center text-teal-600 hover:text-teal-700 font-medium text-sm"
                      >
                        Read more
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Documentation Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Documentation</h2>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="w-full max-w-md mx-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="api">API Reference</TabsTrigger>
            </TabsList>
          </Tabs>

          {filteredCategories.length > 0 ? (
            <div className="grid gap-6">
              {filteredCategories.map((category) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Accordion type="single" collapsible className="bg-white rounded-lg shadow-md">
                    <AccordionItem value={category.id} className="border-none">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex items-center">
                          {category.icon}
                          <span className="ml-2 font-bold">{category.title}</span>
                          <Badge className="ml-3 bg-gray-200 text-gray-700">{category.items.length}</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <ul className="space-y-3">
                          {category.items.map((item, index) => (
                            <li key={index}>
                              <a
                                href={item.link}
                                className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                              >
                                {item.type === "guide" ? (
                                  <Book className="h-4 w-4 text-teal-600 mr-3" />
                                ) : item.type === "video" ? (
                                  <Video className="h-4 w-4 text-red-600 mr-3" />
                                ) : (
                                  <FileText className="h-4 w-4 text-blue-600 mr-3" />
                                )}
                                <span>{item.title}</span>
                                <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">No documentation found</h3>
              <p className="text-gray-600 mb-4">We couldn't find any documentation matching your search criteria.</p>
              <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
            </div>
          )}
        </div>

        {/* Developer Resources */}
        {searchQuery === "" && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Developer Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "API Reference",
                  description: "Complete reference documentation for the EnergySync API.",
                  icon: <FileText className="h-10 w-10 p-2 bg-blue-100 text-blue-600 rounded-lg" />,
                  link: "#",
                },
                {
                  title: "SDKs & Libraries",
                  description: "Official client libraries for various programming languages.",
                  icon: <Book className="h-10 w-10 p-2 bg-purple-100 text-purple-600 rounded-lg" />,
                  link: "#",
                },
                {
                  title: "Developer Community",
                  description: "Join our community forum to connect with other developers.",
                  icon: <Users className="h-10 w-10 p-2 bg-green-100 text-green-600 rounded-lg" />,
                  link: "#",
                },
              ].map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-none shadow-md h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                      <div className="mr-4 mt-1">{resource.icon}</div>
                      <div>
                        <CardTitle>{resource.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{resource.description}</p>
                      <a
                        href={resource.link}
                        className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
                      >
                        Explore
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Need Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 bg-gradient-to-r from-teal-600 to-green-600 rounded-xl p-10 text-white"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Need Additional Help?</h2>
            <p className="mb-6">Our support team is ready to assist you with any questions or issues you may have.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton href="/contact" variant="primary" className="bg-white text-teal-600 hover:bg-white/90">
                Contact Support
              </AnimatedButton>
              <AnimatedButton href="#" variant="outline" className="border-white text-white hover:bg-white/10">
                Join Community Forum
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

