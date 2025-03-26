"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowLeft, ArrowRight, Globe, Target, Check, ExternalLink, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"

// SDG goals data
const sdgGoals = [
  {
    id: 1,
    name: "No Poverty",
    color: "#E5243B",
    description: "End poverty in all its forms everywhere.",
    longDescription:
      "Extreme poverty has been cut by more than half since 1990. However, more than 1 in 5 people still live on less than $3.20 a day. SDG 1 aims to eradicate extreme poverty and halve the proportion of people living in poverty according to national definitions.",
    targets: [
      "By 2030, eradicate extreme poverty for all people everywhere",
      "Reduce at least by half the proportion of men, women and children living in poverty",
      "Implement social protection systems for all",
      "Ensure equal rights to economic resources, access to basic services",
    ],
    stats: [
      { name: "People in extreme poverty", value: "9.2% of world population" },
      { name: "Children living in poverty", value: "356 million" },
      { name: "People without social protection", value: "4 billion" },
    ],
    progress: 42,
    image: "/placeholder.svg?height=400&width=600",
    resources: [
      { title: "Policy Brief on Poverty Reduction", type: "PDF", url: "#" },
      { title: "No Poverty Teaching Materials", type: "Lesson Plan", url: "#" },
      { title: "Interactive Poverty Map", type: "Web Tool", url: "#" },
    ],
  },
  {
    id: 4,
    name: "Quality Education",
    color: "#C5192D",
    description:
      "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
    longDescription:
      "Education enables upward socioeconomic mobility and is key to escaping poverty. SDG 4 aims to ensure that all girls and boys complete free primary and secondary schooling by 2030. It also calls for equal access to affordable vocational training and the elimination of gender and wealth disparities.",
    targets: [
      "Free, equitable and quality primary and secondary education for all",
      "Equal access to affordable technical, vocational and higher education",
      "Increase the number of people with relevant skills for employment",
      "Eliminate gender disparities in education and ensure equal access for the vulnerable",
    ],
    stats: [
      { name: "Children out of school", value: "258 million" },
      { name: "Youth unable to read", value: "617 million" },
      { name: "Digital access gap", value: "Two-thirds of children worldwide" },
    ],
    progress: 56,
    image: "/placeholder.svg?height=400&width=600",
    resources: [
      { title: "Education Policy Framework", type: "PDF", url: "#" },
      { title: "Teaching SDGs in Classrooms", type: "Lesson Plan", url: "#" },
      { title: "Global Education Monitoring Report", type: "Report", url: "#" },
    ],
  },
  {
    id: 7,
    name: "Affordable and Clean Energy",
    color: "#FCC30B",
    description: "Ensure access to affordable, reliable, sustainable and modern energy for all.",
    longDescription:
      "Energy is central to nearly every major challenge and opportunity the world faces today. SDG 7 aims to ensure universal access to affordable electricity by 2030, increase the share of renewable energy in the global energy mix, and double the global rate of improvement in energy efficiency.",
    targets: [
      "Universal access to affordable, reliable and modern energy services",
      "Increase the share of renewable energy in the global energy mix",
      "Double the global rate of improvement in energy efficiency",
      "Enhance international cooperation to facilitate access to clean energy",
    ],
    stats: [
      { name: "People without electricity", value: "789 million" },
      { name: "People relying on polluting fuels", value: "2.8 billion" },
      { name: "Renewable energy share", value: "17.3% of global consumption" },
    ],
    progress: 38,
    image: "/placeholder.svg?height=400&width=600",
    resources: [
      { title: "Clean Energy Transition Guide", type: "PDF", url: "#" },
      { title: "Renewable Energy Teaching Kit", type: "Lesson Plan", url: "#" },
      { title: "Energy Efficiency Calculator", type: "Web Tool", url: "#" },
    ],
  },
  {
    id: 13,
    name: "Climate Action",
    color: "#3F7E44",
    description: "Take urgent action to combat climate change and its impacts.",
    longDescription:
      "Climate change is affecting every country on every continent. It is disrupting national economies and affecting lives. SDG 13 aims to mobilize $100 billion annually to address the needs of developing countries and help mitigate climate-related disasters.",
    targets: [
      "Strengthen resilience and adaptive capacity to climate-related hazards",
      "Integrate climate change measures into national policies and planning",
      "Improve education, awareness-raising and capacity on climate change",
      "Implement the UN Framework Convention on Climate Change",
    ],
    stats: [
      { name: "Global temperature increase", value: "1.1°C above pre-industrial levels" },
      { name: "Annual climate funding gap", value: "$70 billion" },
      { name: "Climate disasters since 2000", value: "Over 7,000" },
    ],
    progress: 29,
    image: "/placeholder.svg?height=400&width=600",
    resources: [
      { title: "Climate Change Teaching Guide", type: "PDF", url: "#" },
      { title: "Carbon Footprint Calculator", type: "Web Tool", url: "#" },
      { title: "Climate Action Classroom Activities", type: "Lesson Plan", url: "#" },
    ],
  },
]

export default function GoalPage() {
  const params = useParams()
  const goalId = Number.parseInt(params.id as string)

  // Find the goal data based on the ID
  const goalData = sdgGoals.find((goal) => goal.id === goalId) || sdgGoals[0]

  // Intersection observers for animations
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [infoRef, infoInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [resourcesRef, resourcesInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <header className="py-20 mt-16" style={{ backgroundColor: goalData.color }} ref={headerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 text-white"
        >
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all goals
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="md:w-2/3">
              <div className="flex items-center mb-4">
                <span className="bg-white text-gray-800 w-12 h-12 rounded-full inline-flex justify-center items-center mr-3 text-xl font-bold">
                  {goalData.id}
                </span>
                <Badge className="bg-white/20 text-white hover:bg-white/30">SDG {goalData.id}</Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">{goalData.name}</h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">{goalData.description}</p>

              <div className="flex items-center">
                <div className="mr-4">
                  <div className="text-sm font-medium mb-1">Current Progress</div>
                  <div className="text-2xl font-bold">{goalData.progress}%</div>
                </div>
                <div className="flex-1">
                  <Progress
                    value={goalData.progress}
                    className="h-3 bg-white/20"
                    indicatorClassName="bg-white transition-all duration-1000 ease-in-out"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={headerInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative rounded-lg overflow-hidden shadow-xl"
              >
                <img
                  src={goalData.image || "/placeholder.svg"}
                  alt={goalData.name}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="targets">Targets</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <motion.div
                    ref={infoRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={infoInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="border-none shadow-md mb-8">
                      <CardHeader>
                        <CardTitle>About SDG {goalData.id}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 leading-relaxed">{goalData.longDescription}</p>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-md">
                      <CardHeader className="flex flex-row items-center">
                        <Target className="h-5 w-5 mr-2 text-blue-600" />
                        <CardTitle>Key Targets</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          {goalData.targets.map((target, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={infoInView ? { opacity: 1, x: 0 } : {}}
                              transition={{ duration: 0.5, delay: 0.1 * index }}
                              className="flex items-start"
                            >
                              <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{target}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                <div>
                  <motion.div
                    ref={statsRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={statsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="border-none shadow-md mb-8">
                      <CardHeader className="flex flex-row items-center">
                        <Globe className="h-5 w-5 mr-2 text-blue-600" />
                        <CardTitle>Key Statistics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {goalData.stats.map((stat, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0 }}
                              animate={statsInView ? { opacity: 1 } : {}}
                              transition={{ duration: 0.5, delay: 0.1 * index }}
                              className="p-4 bg-gray-50 rounded-lg"
                            >
                              <div className="text-sm text-gray-500">{stat.name}</div>
                              <div className="text-lg font-bold mt-1">{stat.value}</div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-md">
                      <CardHeader>
                        <CardTitle>Get Involved</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          You can contribute to this goal in your daily life. Here are some ways to get started:
                        </p>
                        <Button className="w-full mb-2" style={{ backgroundColor: goalData.color }}>
                          Take Action Now
                        </Button>
                        <Button variant="outline" className="w-full">
                          Share with Others
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="targets">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>SDG {goalData.id} Targets and Indicators</CardTitle>
                  <CardDescription>
                    The targets for SDG {goalData.id} are monitored using specific indicators to measure progress.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {goalData.targets.map((target, index) => (
                      <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
                        <h3 className="text-lg font-semibold mb-3 flex items-start">
                          <span
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 flex-shrink-0"
                            style={{ backgroundColor: goalData.color }}
                          >
                            {index + 1}
                          </span>
                          {target}
                        </h3>
                        <div className="flex items-center justify-between pl-11 text-sm">
                          <div className="flex items-center">
                            <span className="text-gray-500">Progress Status:</span>
                            <Badge className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-200">In Progress</Badge>
                          </div>
                          <div>
                            <Button variant="link" className="text-blue-600 p-0">
                              View Detailed Data <ExternalLink className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources">
              <motion.div
                ref={resourcesRef}
                initial={{ opacity: 0, y: 20 }}
                animate={resourcesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <Card className="border-none shadow-md">
                    <CardHeader>
                      <CardTitle>Educational Resources</CardTitle>
                      <CardDescription>Access free educational materials about SDG {goalData.id}.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {goalData.resources.map((resource, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={resourcesInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.3, delay: 0.1 * index }}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div>
                              <div className="font-medium">{resource.title}</div>
                              <div className="text-sm text-gray-500">{resource.type}</div>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={resource.url}>
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Link>
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-md">
                    <CardHeader>
                      <CardTitle>Teaching Materials</CardTitle>
                      <CardDescription>Lesson plans and activities for educators.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg border border-gray-200">
                          <h3 className="font-medium mb-2">Curriculum Integration</h3>
                          <p className="text-sm text-gray-600 mb-3">
                            Guide for integrating SDG {goalData.id} into classroom lessons across subjects.
                          </p>
                          <Button className="w-full" style={{ backgroundColor: goalData.color }}>
                            Access Educator Guides
                          </Button>
                        </div>

                        <div className="p-4 rounded-lg border border-gray-200">
                          <h3 className="font-medium mb-2">Student Activities</h3>
                          <p className="text-sm text-gray-600 mb-3">
                            Hands-on activities and projects for students to learn about and contribute to SDG{" "}
                            {goalData.id}.
                          </p>
                          <Button
                            variant="outline"
                            className="w-full"
                            style={{ borderColor: goalData.color, color: goalData.color }}
                          >
                            Browse Activities
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">Looking for more resources?</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Visit the UN Sustainable Development Goals Knowledge Platform for the most comprehensive collection
                    of resources.
                  </p>
                  <Button>
                    Visit UN SDG Platform
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Navigation between goals */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            {goalData.id > 1 && (
              <Link
                href={`/goals/${goalData.id - 1}`}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-4 sm:mb-0"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Goal
              </Link>
            )}

            <Button variant="outline" asChild>
              <Link href="/">View All SDGs</Link>
            </Button>

            {goalData.id < 17 && (
              <Link
                href={`/goals/${goalData.id + 1}`}
                className="flex items-center text-blue-600 hover:text-blue-800 mt-4 sm:mt-0"
              >
                Next Goal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

