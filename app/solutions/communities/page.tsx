"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Check, Home, Users, Leaf, Globe, Building, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedButton } from "@/components/animated-button"
import Navbar from "@/components/navbar"

export default function CommunitySolutionsPage() {
  // Intersection observers for animations
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [programsRef, programsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [casesRef, casesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const features = [
    {
      title: "Community Energy Planning",
      description: "Develop comprehensive energy plans that align with community goals and values.",
      icon: <Home className="h-10 w-10 p-2 bg-green-100 text-green-600 rounded-lg" />,
    },
    {
      title: "Renewable Integration",
      description: "Optimize the integration of renewable energy sources into community infrastructure.",
      icon: <Leaf className="h-10 w-10 p-2 bg-green-100 text-green-600 rounded-lg" />,
    },
    {
      title: "Community Engagement",
      description: "Tools to engage residents in energy conservation and sustainability initiatives.",
      icon: <Users className="h-10 w-10 p-2 bg-green-100 text-green-600 rounded-lg" />,
    },
    {
      title: "Climate Action Planning",
      description: "Develop and track progress on community climate action plans and carbon reduction goals.",
      icon: <Globe className="h-10 w-10 p-2 bg-green-100 text-green-600 rounded-lg" />,
    },
    {
      title: "Municipal Building Efficiency",
      description: "Optimize energy usage in municipal buildings and public infrastructure.",
      icon: <Building className="h-10 w-10 p-2 bg-green-100 text-green-600 rounded-lg" />,
    },
  ]

  const programs = [
    {
      title: "Community Solar Programs",
      description:
        "Implement and manage community solar projects that provide clean energy and cost savings to residents.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Energy Efficiency Initiatives",
      description: "Community-wide programs to reduce energy consumption through education and incentives.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Microgrids & Resilience",
      description: "Develop community microgrids to enhance energy resilience and provide backup during outages.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "EV Charging Infrastructure",
      description: "Plan and implement electric vehicle charging networks throughout the community.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const caseStudies = [
    {
      community: "Greenville Township",
      population: "25,000",
      challenge: "High energy costs and aging infrastructure",
      solution: "Implemented EnergySync Community platform with solar integration",
      results: [
        "30% reduction in municipal energy costs",
        "Community solar program serving 500+ households",
        "Carbon emissions reduced by 45% over 3 years",
      ],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      community: "Coastal Haven City",
      population: "120,000",
      challenge: "Frequent power outages during storm seasons",
      solution: "Deployed EnergySync with microgrid management and resilience planning",
      results: [
        "Critical facilities maintained power during 3 major storms",
        "Reduced outage time by 60% for residential areas",
        "Integrated 5MW of distributed solar + storage",
      ],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      community: "Mountain Valley Region",
      population: "75,000",
      challenge: "Meeting ambitious climate action goals",
      solution: "Comprehensive EnergySync deployment with community engagement tools",
      results: [
        "On track to meet 2030 carbon reduction targets",
        "10,000+ residents actively participating in energy programs",
        "Recognized as state leader in community energy planning",
      ],
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section ref={headerRef} className="pt-32 pb-16 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-12">
            <div className="md:w-1/2">
              <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Community Solutions</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Empowering Sustainable Communities</h1>
              <p className="text-xl mb-8 text-white/90">
                EnergySync helps communities develop and implement comprehensive energy strategies that reduce costs,
                increase resilience, and achieve sustainability goals.
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
                  alt="Community Energy Management"
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
            <h2 className="text-3xl font-bold mb-4">Comprehensive Community Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides tools and insights to help communities plan, implement, and manage sustainable
              energy initiatives.
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

      {/* Programs Section */}
      <section ref={programsRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={programsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Programs</Badge>
            <h2 className="text-3xl font-bold mb-4">Community Energy Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              EnergySync helps communities implement and manage a variety of energy programs to meet local needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={programsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-none shadow-md overflow-hidden h-full">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-2/5">
                      <img
                        src={program.image || "/placeholder.svg"}
                        alt={program.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="md:w-3/5 p-6 flex flex-col">
                      <CardTitle className="mb-2">{program.title}</CardTitle>
                      <CardDescription className="text-base flex-grow">{program.description}</CardDescription>
                      <div className="mt-4">
                        <a href="#" className="text-teal-600 font-medium text-sm flex items-center">
                          Learn more
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-3xl font-bold mb-4">Community Case Studies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how communities have transformed their energy landscape with EnergySync.
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
                      alt={study.community}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <Badge className="mb-1 self-start">Population: {study.population}</Badge>
                    <CardTitle>{study.community}</CardTitle>
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
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Community's Energy Future?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join communities across the country that are creating more sustainable, resilient, and cost-effective energy
            systems with EnergySync.
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

