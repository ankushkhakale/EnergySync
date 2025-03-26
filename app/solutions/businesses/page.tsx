"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Check, BarChart3, LineChart, Zap, Building2, Users, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedButton } from "@/components/animated-button"
import Navbar from "@/components/navbar"

export default function BusinessSolutionsPage() {
  // Intersection observers for animations
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [casesRef, casesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const features = [
    {
      title: "Energy Cost Reduction",
      description: "Reduce operational costs by optimizing energy usage and identifying inefficiencies.",
      icon: <LineChart className="h-10 w-10 p-2 bg-teal-100 text-teal-600 rounded-lg" />,
    },
    {
      title: "Sustainability Reporting",
      description: "Generate comprehensive ESG reports to showcase your sustainability initiatives.",
      icon: <BarChart3 className="h-10 w-10 p-2 bg-teal-100 text-teal-600 rounded-lg" />,
    },
    {
      title: "Investment Planning",
      description: "Data-driven recommendations for renewable energy investments with ROI forecasting.",
      icon: <Zap className="h-10 w-10 p-2 bg-teal-100 text-teal-600 rounded-lg" />,
    },
    {
      title: "Regulatory Compliance",
      description: "Stay compliant with evolving energy regulations and carbon reporting requirements.",
      icon: <Building2 className="h-10 w-10 p-2 bg-teal-100 text-teal-600 rounded-lg" />,
    },
    {
      title: "Employee Engagement",
      description: "Tools to engage employees in sustainability initiatives and track collective impact.",
      icon: <Users className="h-10 w-10 p-2 bg-teal-100 text-teal-600 rounded-lg" />,
    },
  ]

  const caseStudies = [
    {
      company: "Global Manufacturing Corp",
      industry: "Manufacturing",
      challenge: "High energy costs across multiple production facilities",
      solution: "Implemented EnergySync to monitor and optimize energy usage in real-time",
      results: [
        "20% reduction in energy consumption",
        "Annual savings of $1.2 million",
        "15% decrease in carbon emissions",
      ],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      company: "TechForward Inc.",
      industry: "Technology",
      challenge: "Meeting ambitious sustainability goals while expanding operations",
      solution: "Deployed EnergySync with integration to existing building management systems",
      results: [
        "Achieved carbon neutrality 2 years ahead of schedule",
        "Optimized HVAC systems for 30% energy savings",
        "Enhanced sustainability reporting for investors",
      ],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      company: "Retail Chain Group",
      industry: "Retail",
      challenge: "Managing energy costs across 200+ store locations",
      solution: "Centralized energy management with EnergySync's multi-location dashboard",
      results: [
        "15% reduction in overall energy costs",
        "Standardized sustainability practices across all locations",
        "Improved store comfort while reducing energy usage",
      ],
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section ref={headerRef} className="pt-32 pb-16 bg-gradient-to-r from-teal-600 to-green-600 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-12">
            <div className="md:w-1/2">
              <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Business Solutions</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Transform Your Business Energy Strategy</h1>
              <p className="text-xl mb-8 text-white/90">
                EnergySync helps businesses of all sizes optimize energy usage, reduce costs, and meet sustainability
                goals with AI-powered insights and recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <AnimatedButton href="/demo-request" variant="demo">
                  Book a Demo
                </AnimatedButton>
                <AnimatedButton
                  href="/solutions"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  View All Solutions
                </AnimatedButton>
              </div>
            </div>
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={headerInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative rounded-lg overflow-hidden shadow-xl"
              >
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Business Energy Management Dashboard"
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Features</Badge>
            <h2 className="text-3xl font-bold mb-4">Designed for Business Needs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides comprehensive tools to help businesses manage energy usage, reduce costs, and
              achieve sustainability goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-none shadow-md h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                    <div className="mr-4 mt-1">{feature.icon}</div>
                    <div>
                      <CardTitle>{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Tabs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Solutions</Badge>
            <h2 className="text-3xl font-bold mb-4">Tailored for Your Industry</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore how EnergySync adapts to the unique energy challenges of different business sectors.
            </p>
          </motion.div>

          <Tabs defaultValue="manufacturing" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="manufacturing">Manufacturing</TabsTrigger>
              <TabsTrigger value="commercial">Commercial</TabsTrigger>
              <TabsTrigger value="retail">Retail</TabsTrigger>
              <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
            </TabsList>
            <div className="mt-8 bg-white p-1 rounded-lg shadow-md">
              <TabsContent value="manufacturing" className="mt-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2">
                    <img
                      src="/placeholder.svg?height=300&width=400"
                      alt="Manufacturing Energy Solutions"
                      className="w-full h-auto rounded-l-md"
                    />
                  </div>
                  <div className="p-6 md:w-1/2">
                    <h3 className="text-xl font-bold mb-4">Manufacturing Energy Optimization</h3>
                    <p className="text-gray-600 mb-4">
                      Optimize energy-intensive manufacturing processes, reduce operational costs, and meet
                      sustainability targets with EnergySync's specialized manufacturing solutions.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Production line energy efficiency analysis</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Equipment-specific energy monitoring</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Peak demand management and load balancing</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Predictive maintenance to prevent energy waste</span>
                      </li>
                    </ul>
                    <AnimatedButton href="/solutions/manufacturing" variant="primary">
                      Learn More
                    </AnimatedButton>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="commercial" className="mt-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2">
                    <img
                      src="/placeholder.svg?height=300&width=400"
                      alt="Commercial Real Estate Energy Solutions"
                      className="w-full h-auto rounded-l-md"
                    />
                  </div>
                  <div className="p-6 md:w-1/2">
                    <h3 className="text-xl font-bold mb-4">Commercial Building Optimization</h3>
                    <p className="text-gray-600 mb-4">
                      Enhance building performance, reduce operational costs, and improve tenant comfort with
                      EnergySync's commercial real estate solutions.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>HVAC optimization and scheduling</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Occupancy-based energy management</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Building certification support (LEED, ENERGY STAR)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Tenant billing and energy allocation</span>
                      </li>
                    </ul>
                    <AnimatedButton href="/solutions/commercial" variant="primary">
                      Learn More
                    </AnimatedButton>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="retail" className="mt-0">
                {/* Retail content similar to above */}
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2">
                    <img
                      src="/placeholder.svg?height=300&width=400"
                      alt="Retail Energy Solutions"
                      className="w-full h-auto rounded-l-md"
                    />
                  </div>
                  <div className="p-6 md:w-1/2">
                    <h3 className="text-xl font-bold mb-4">Retail Energy Management</h3>
                    <p className="text-gray-600 mb-4">
                      Manage energy costs across multiple locations, enhance customer comfort, and achieve
                      sustainability goals with EnergySync's retail solutions.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Multi-location energy monitoring and benchmarking</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Lighting and refrigeration optimization</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Store comfort and energy balance management</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Standardized energy policies across locations</span>
                      </li>
                    </ul>
                    <AnimatedButton href="/solutions/retail" variant="primary">
                      Learn More
                    </AnimatedButton>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="healthcare" className="mt-0">
                {/* Healthcare content similar to above */}
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2">
                    <img
                      src="/placeholder.svg?height=300&width=400"
                      alt="Healthcare Energy Solutions"
                      className="w-full h-auto rounded-l-md"
                    />
                  </div>
                  <div className="p-6 md:w-1/2">
                    <h3 className="text-xl font-bold mb-4">Healthcare Facility Optimization</h3>
                    <p className="text-gray-600 mb-4">
                      Balance 24/7 operational needs with energy efficiency, ensure patient comfort, and meet regulatory
                      requirements with EnergySync's healthcare solutions.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Critical systems energy monitoring</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Patient comfort and air quality optimization</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Backup power system management</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Healthcare-specific regulatory compliance</span>
                      </li>
                    </ul>
                    <AnimatedButton href="/solutions/healthcare" variant="primary">
                      Learn More
                    </AnimatedButton>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Case Studies */}
      <section ref={casesRef} className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={casesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Success Stories</Badge>
            <h2 className="text-3xl font-bold mb-4">Business Case Studies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how organizations like yours have transformed their energy management with EnergySync.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={casesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-none shadow-md overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={study.image || "/placeholder.svg"}
                      alt={study.company}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <Badge className="mb-1 self-start">{study.industry}</Badge>
                    <CardTitle>{study.company}</CardTitle>
                    <CardDescription>Challenge: {study.challenge}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      <span className="font-medium">Solution:</span> {study.solution}
                    </p>
                    <h4 className="font-medium mb-2">Results:</h4>
                    <ul className="space-y-1">
                      {study.results.map((result, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <a href="#" className="text-teal-600 font-medium text-sm flex items-center">
                        Read full case study
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 max-w-4xl text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business Energy Strategy?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of businesses that have optimized their energy usage and reduced costs with EnergySync.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton href="/demo-request" variant="demo" size="lg">
              Book a Demo
            </AnimatedButton>
            <AnimatedButton href="/solutions" variant="outline" size="lg">
              Explore All Solutions
            </AnimatedButton>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

