"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedButton } from "@/components/animated-button"
import Navbar from "@/components/navbar"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Renewable Energy: Trends to Watch in 2023",
      excerpt:
        "Explore the emerging trends in renewable energy that are shaping the future of sustainability and energy management.",
      category: "Industry Trends",
      author: "Sarah Johnson",
      date: "June 15, 2023",
      image: "/placeholder.svg?height=300&width=600",
      featured: true,
    },
    {
      id: 2,
      title: "How AI is Revolutionizing Energy Management",
      excerpt:
        "Artificial intelligence is transforming how businesses and communities manage their energy usage. Learn about the latest innovations.",
      category: "Technology",
      author: "Michael Chen",
      date: "May 28, 2023",
      image: "/placeholder.svg?height=300&width=600",
      featured: true,
    },
    {
      id: 3,
      title: "Case Study: Manufacturing Company Reduces Energy Costs by 30%",
      excerpt:
        "Learn how a leading manufacturing company implemented EnergySync to significantly reduce their operational energy costs.",
      category: "Case Studies",
      author: "David Wilson",
      date: "May 10, 2023",
      image: "/placeholder.svg?height=300&width=600",
      featured: false,
    },
    {
      id: 4,
      title: "Understanding Carbon Credits and Offsets",
      excerpt:
        "A comprehensive guide to carbon credits and offsets, and how they fit into your organization's sustainability strategy.",
      category: "Sustainability",
      author: "Emily Rodriguez",
      date: "April 22, 2023",
      image: "/placeholder.svg?height=300&width=600",
      featured: false,
    },
    {
      id: 5,
      title: "The ROI of Renewable Energy Investments",
      excerpt:
        "Breaking down the financial returns of various renewable energy investments and how to maximize your ROI.",
      category: "Finance",
      author: "James Peterson",
      date: "April 15, 2023",
      image: "/placeholder.svg?height=300&width=600",
      featured: false,
    },
    {
      id: 6,
      title: "Community Solar Programs: Benefits and Implementation",
      excerpt:
        "Explore how community solar programs work and the benefits they provide to residents and local governments.",
      category: "Community",
      author: "Lisa Thompson",
      date: "March 30, 2023",
      image: "/placeholder.svg?height=300&width=600",
      featured: false,
    },
    {
      id: 7,
      title: "Energy Policy Updates: What You Need to Know",
      excerpt:
        "Stay informed about the latest energy policy changes and how they might impact your organization's energy strategy.",
      category: "Policy",
      author: "Robert Garcia",
      date: "March 18, 2023",
      image: "/placeholder.svg?height=300&width=600",
      featured: false,
    },
    {
      id: 8,
      title: "Optimizing HVAC Systems for Energy Efficiency",
      excerpt: "Practical tips and strategies for improving the energy efficiency of your building's HVAC systems.",
      category: "Efficiency",
      author: "Jennifer Lee",
      date: "March 5, 2023",
      image: "/placeholder.svg?height=300&width=600",
      featured: false,
    },
  ]

  // Filter posts based on search query
  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get featured posts
  const featuredPosts = filteredPosts.filter((post) => post.featured)

  // Get regular posts (paginated)
  const regularPosts = filteredPosts.filter((post) => !post.featured)
  const postsPerPage = 6
  const totalPages = Math.ceil(regularPosts.length / postsPerPage)
  const currentPosts = regularPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  // Categories for filtering
  const categories = [
    "All",
    "Industry Trends",
    "Technology",
    "Case Studies",
    "Sustainability",
    "Finance",
    "Community",
    "Policy",
    "Efficiency",
  ]

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
          <h1 className="text-4xl font-bold mb-4">EnergySync Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, trends, and best practices in renewable energy optimization and sustainability.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-2/3 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="md:w-1/3">
                <Tabs defaultValue="All" className="w-full">
                  <TabsList className="w-full h-auto flex flex-wrap">
                    {categories.slice(0, 5).map((category) => (
                      <TabsTrigger key={category} value={category} className="flex-grow">
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="border-none shadow-lg overflow-hidden h-full">
                    <div className="relative h-60">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-teal-600 hover:bg-teal-700">Featured</Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl">{post.title}</CardTitle>
                      <CardDescription className="flex items-center text-sm space-x-4">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {post.date}
                        </span>
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter>
                      <AnimatedButton href={`/resources/blog/${post.id}`} variant="primary">
                        Read Article
                      </AnimatedButton>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card className="border-none shadow-md overflow-hidden h-full">
                  <div className="relative h-48">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription className="flex items-center text-sm space-x-4">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </span>
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <a
                      href={`/resources/blog/${post.id}`}
                      className="text-teal-600 font-medium flex items-center hover:text-teal-700 transition-colors"
                    >
                      Read more
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  className={currentPage === page ? "bg-teal-600 hover:bg-teal-700" : ""}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 bg-gradient-to-r from-teal-600 to-green-600 rounded-xl p-10 text-white"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated with EnergySync Insights</h2>
            <p className="mb-6">
              Subscribe to our newsletter to receive the latest articles, case studies, and industry updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <AnimatedButton variant="primary" className="bg-white text-teal-600 hover:bg-white/90">
                Subscribe
              </AnimatedButton>
            </div>
            <p className="text-sm mt-4 text-white/80">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

