"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, GraduationCap, Download, ExternalLink, Users, BookOpen, Video } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/navbar"

export default function TeachingGuidesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLevel, setSelectedLevel] = useState<string>("all")
  const [selectedSubject, setSelectedSubject] = useState<string>("all")
  const { toast } = useToast()

  const educationLevels = ["Elementary", "Middle School", "High School", "Higher Education", "Professional"]

  const subjects = [
    "Energy Management",
    "Environmental Science",
    "Sustainability",
    "Renewable Energy",
    "Climate Change",
    "Business & Economics",
  ]

  const teachingGuides = [
    {
      title: "Introduction to Renewable Energy Systems",
      description: "Comprehensive curriculum for teaching renewable energy concepts to high school students.",
      level: "High School",
      subject: "Renewable Energy",
      format: "Curriculum",
      rating: 4.8,
      reviews: 124,
      downloadCount: 3250,
      timeRequired: "6-8 weeks",
      image: "/placeholder.svg?height=200&width=400",
      downloadLink: "#",
      icon: <GraduationCap className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Energy Audit Workshop Guide",
      description: "Step-by-step guide for conducting energy audits as a classroom project or workshop.",
      level: "Higher Education",
      subject: "Energy Management",
      format: "Workshop",
      rating: 4.9,
      reviews: 87,
      downloadCount: 1890,
      timeRequired: "2-3 days",
      image: "/placeholder.svg?height=200&width=400",
      downloadLink: "#",
      icon: <Users className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Carbon Footprint Calculator Activity",
      description: "Interactive classroom activity for teaching carbon footprint concepts and calculations.",
      level: "Middle School",
      subject: "Environmental Science",
      format: "Activity",
      rating: 4.7,
      reviews: 156,
      downloadCount: 4120,
      timeRequired: "1-2 hours",
      image: "/placeholder.svg?height=200&width=400",
      downloadLink: "#",
      icon: <BookOpen className="h-6 w-6 text-amber-500" />,
    },
    {
      title: "Sustainable Business Case Studies",
      description: "Collection of case studies and teaching notes on sustainable business practices.",
      level: "Higher Education",
      subject: "Business & Economics",
      format: "Case Studies",
      rating: 4.6,
      reviews: 98,
      downloadCount: 2460,
      timeRequired: "Variable",
      image: "/placeholder.svg?height=200&width=400",
      downloadLink: "#",
      icon: <BookOpen className="h-6 w-6 text-purple-500" />,
    },
    {
      title: "Climate Change Science Lesson Plans",
      description: "Comprehensive set of lesson plans covering climate science fundamentals.",
      level: "High School",
      subject: "Climate Change",
      format: "Lesson Plans",
      rating: 4.9,
      reviews: 212,
      downloadCount: 5680,
      timeRequired: "3-4 weeks",
      image: "/placeholder.svg?height=200&width=400",
      downloadLink: "#",
      icon: <GraduationCap className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Energy Conservation for Elementary Students",
      description: "Fun, interactive lessons teaching energy conservation basics to young learners.",
      level: "Elementary",
      subject: "Energy Management",
      format: "Lesson Plans",
      rating: 4.8,
      reviews: 183,
      downloadCount: 4920,
      timeRequired: "2-3 weeks",
      image: "/placeholder.svg?height=200&width=400",
      downloadLink: "#",
      icon: <GraduationCap className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Sustainable Development Goals Teaching Kit",
      description: "Comprehensive resources for teaching about the UN SDGs and sustainability.",
      level: "Professional",
      subject: "Sustainability",
      format: "Teaching Kit",
      rating: 4.7,
      reviews: 76,
      downloadCount: 1840,
      timeRequired: "Variable",
      image: "/placeholder.svg?height=200&width=400",
      downloadLink: "#",
      icon: <Users className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Renewable Energy Virtual Lab Guide",
      description: "Instructions and materials for conducting virtual renewable energy experiments.",
      level: "Higher Education",
      subject: "Renewable Energy",
      format: "Virtual Lab",
      rating: 4.5,
      reviews: 64,
      downloadCount: 1290,
      timeRequired: "3-6 hours",
      image: "/placeholder.svg?height=200&width=400",
      downloadLink: "#",
      icon: <Video className="h-6 w-6 text-red-500" />,
    },
  ]

  const handleDownload = (guide: any) => {
    toast({
      title: "Download Started",
      description: `${guide.title} is being downloaded.`,
    })
  }

  // Filter guides based on search query and selected filters
  const filteredGuides = teachingGuides.filter((guide) => {
    const matchesSearch =
      searchQuery === "" ||
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLevel = selectedLevel === "all" || guide.level === selectedLevel
    const matchesSubject = selectedSubject === "all" || guide.subject === selectedSubject

    return matchesSearch && matchesLevel && matchesSubject
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
          <h1 className="text-4xl font-bold mb-4">Teaching Guides</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access our library of curriculum materials, lesson plans, and teaching resources to educate others about
            renewable energy and sustainability.
          </p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search teaching guides..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Education Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {educationLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Subject Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {filteredGuides.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide, index) => (
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
                      src={guide.image || "/placeholder.svg"}
                      alt={guide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <div className="flex items-center text-sm">
                          <Badge className="bg-white/20 text-white mr-2">{guide.level}</Badge>
                          <Badge className="bg-white/20 text-white">{guide.format}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-start">
                      <div className="mr-2 mt-0.5">{guide.icon}</div>
                      <span>{guide.title}</span>
                    </CardTitle>
                    <CardDescription>{guide.subject}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-gray-600 mb-4">{guide.description}</p>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Time Required:</span>
                        <span className="font-medium">{guide.timeRequired}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Rating:</span>
                        <span className="font-medium">
                          {guide.rating}/5 ({guide.reviews} reviews)
                        </span>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Downloads:</span>
                          <span className="font-medium">{guide.downloadCount.toLocaleString()}</span>
                        </div>
                        <Progress value={Math.min((guide.downloadCount / 6000) * 100, 100)} className="h-1 mt-1" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex w-full gap-2">
                      <Button variant="outline" className="flex-1" onClick={() => handleDownload(guide)}>
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                      <Button variant="outline" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">No teaching guides found</h3>
            <p className="text-gray-600 mb-4">We couldn't find any teaching guides matching your search criteria.</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedLevel("all")
                setSelectedSubject("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

