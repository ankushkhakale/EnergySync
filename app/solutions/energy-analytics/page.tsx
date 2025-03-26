"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Check, BarChart, PieChart, LineChart, TrendingUp, Server, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedButton } from "@/components/animated-button"
import Navbar from "@/components/navbar"

export default function EnergyAnalyticsPage() {
  // Intersection observers for animations
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [platformRef, platformInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [casesRef, casesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const features = [
    {
      title: "Real-time Monitoring",
      description: "Track energy consumption and production in real-time with comprehensive dashboards.",
      icon: <LineChart className="h-10 w-10 p-2 bg-blue-100 text-blue-600 rounded-lg" />,
    },
    {
      title: "Advanced Analytics",
      description: "Leverage AI to identify patterns, anomalies, and optimization opportunities.",
      icon: <BarChart className="h-10 w-10 p-2 bg-blue-100 text-blue-600 rounded-lg" />,
    },
    {
      title: "Usage Forecasting",
      description: "Predict future energy needs with machine learning models trained on your data.",
      icon: <TrendingUp className="h-10 w-10 p-2 bg-blue-100 text-blue-600 rounded-lg" />,
    },
    {
      title: "Custom Reports",
      description: "Generate tailored reports for different stakeholders and compliance requirements.",
      icon: <PieChart className="h-10 w-10 p-2 bg-blue-100 text-blue-600 rounded-lg" />,
    },
    {
      title: "Data Integration",
      description: "Connect with your existing energy management systems, meters, and IoT devices.",
      icon: <Server className="h-10 w-10 p-2 bg-blue-100 text-blue-600 rounded-lg" />,
    },
    {
      title: "Secure & Compliant",
      description: "Enterprise-grade security with role-based access control and audit logging.",
      icon: <Shield className="h-10 w-10 p-2 bg-blue-100 text-blue-600 rounded-lg" />,
    },
  ]

  const caseStudies = [
    {
      company: "Global Manufacturing Corp",
      industry: "Manufacturing",
      challenge: "High energy costs and carbon emissions across multiple production facilities",
      solution: "Implemented EnergySync Analytics to monitor and optimize energy usage in real-time",
      results: [
        "20% reduction in energy consumption",
        "Annual savings of $1.2 million",
        "15% decrease in carbon emissions",
      ],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      company: "Metro Office Park",
      industry: "Commercial Real Estate",
      challenge: "Inefficient building management systems and rising tenant energy costs",
      solution: "Deployed EnergySync with integration to existing BMS and smart meters",
      results: [
        "32% improved HVAC efficiency",
        "Reduced tenant energy bills by 18%",
        "Enhanced building sustainability rating",
      ],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      company: "State University",
      industry: "Education",
      challenge: "Meeting sustainability goals while managing tight operational budgets",
      solution: "Campus-wide EnergySync deployment with student engagement features",
      results: [
        "25% energy reduction across campus",
        "$850,000 annual utility savings",
        "Achieved carbon neutrality goals 2 years ahead of schedule",
      ],
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section ref={headerRef} className="pt-32 pb-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-12">
            <div className="md:w-1/2">
              <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Energy Analytics</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Intelligent Energy Analytics Platform</h1>
              <p className="text-xl mb-8 text-white/90">
                Transform your energy data into actionable insights with our AI-powered analytics platform. Identify
                optimization opportunities, reduce costs, and achieve your sustainability goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <AnimatedButton href="/demo-request" variant="demo">
                  Book a Demo
                </AnimatedButton>
                <AnimatedButton
                  href="/get-started"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Get Started
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
                  alt="Energy Analytics Dashboard"
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
            <h2 className="text-3xl font-bold mb-4">Powerful Analytics Capabilities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides comprehensive energy analytics tools to help you understand and optimize your energy
              usage like never before.
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

      {/* Platform Overview */}
      <section ref={platformRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={platformInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Platform</Badge>
            <h2 className="text-3xl font-bold mb-4">Explore the Analytics Platform</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our intuitive interface makes energy analytics accessible to everyone in your organization.
            </p>
          </motion.div>

          <Tabs defaultValue="dashboard" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
            </TabsList>
            <div className="mt-8 bg-white p-1 rounded-lg shadow-md">
              <TabsContent value="dashboard" className="mt-0">
                <img
                  src="/placeholder.svg?height=500&width=900"
                  alt="Dashboard View"
                  className="w-full h-auto rounded-md"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Intuitive Dashboard</h3>
                  <p className="text-gray-600">
                    Our customizable dashboard provides a real-time overview of your energy usage, production, and key
                    performance indicators. Configure widgets to display the metrics that matter most to your
                    organization.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="reports" className="mt-0">
                <img
                  src="/placeholder.svg?height=500&width=900"
                  alt="Reports View"
                  className="w-full h-auto rounded-md"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Comprehensive Reporting</h3>
                  <p className="text-gray-600">
                    Generate detailed reports with just a few clicks. Analyze historical data, track progress toward
                    goals, and create customized reports for different stakeholders. Export in multiple formats or
                    schedule automated distribution.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="forecasting" className="mt-0">
                <img
                  src="/placeholder.svg?height=500&width=900"
                  alt="Forecasting View"
                  className="w-full h-auto rounded-md"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Predictive Forecasting</h3>
                  <p className="text-gray-600">
                    Our AI-powered forecasting tools help you predict future energy needs based on historical patterns,
                    weather data, and planned operations. Make informed decisions about energy procurement and usage to
                    optimize costs.
                  </p>
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
            <h2 className="text-3xl font-bold mb-4">Customer Case Studies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how organizations like yours have transformed their energy management with EnergySync Analytics.
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
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Energy Management?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of organizations that have optimized their energy usage and reduced costs with EnergySync
            Analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton href="/demo-request" variant="demo" size="lg">
              Book a Demo
            </AnimatedButton>
            <AnimatedButton href="/get-started" variant="outline" size="lg">
              Get Started
            </AnimatedButton>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

