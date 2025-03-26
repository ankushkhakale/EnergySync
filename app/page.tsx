"use client"

import Link from "next/link"
import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { BarChart3, Cloud, LineChart, Zap, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import { useInView } from "react-intersection-observer"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "@/components/split-text"
import { Badge } from "@/components/ui/badge"
import { HeroParticles } from "@/components/hero-particles"
import { AnimatedButton } from "@/components/animated-button"
import { useRouter } from "next/navigation"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const router = useRouter()
  const { scrollY } = useScroll()
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const dashboardRef = useRef(null)
  const cloudRef = useRef(null)
  const ctaRef = useRef(null)

  // Parallax effect for hero section
  const heroY = useTransform(scrollY, [0, 500], [0, 150])

  // Intersection observers for scroll animations
  const [featuresInViewRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [dashboardInViewRef, dashboardInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [cloudInViewRef, cloudInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [ctaInViewRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // GSAP animations
  useEffect(() => {
    // Hero section animation
    const heroTimeline = gsap.timeline()
    heroTimeline.from(".hero-title", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    heroTimeline.from(
      ".hero-description",
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6",
    )
    heroTimeline.from(
      ".hero-buttons",
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6",
    )

    // Clean up
    return () => {
      heroTimeline.kill()
    }
  }, [])

  // Card hover animations
  const cardVariants = {
    initial: { y: 0 },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 300 },
    },
  }

  // Handle Get Started button click
  const handleGetStarted = () => {
    router.push("/signup")
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-green-500 to-teal-600 text-white">
        <HeroParticles />
        <motion.div ref={heroRef} style={{ y: heroY }} className="container relative z-10 mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
                AI-Powered Energy Optimization
              </Badge>
            </motion.div>
            <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <SplitText>Optimize Your Renewable Energy with AI</SplitText>
            </h1>
            <p className="hero-description text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              EnergySync helps businesses and communities maximize renewable energy investments, optimize usage
              patterns, and implement effective carbon reduction strategies.
            </p>
            <div className="hero-buttons flex flex-col sm:flex-row gap-4">
              <AnimatedButton
                size="lg"
                variant="primary"
                onClick={handleGetStarted}
                className="bg-white text-teal-600 hover:bg-white/90"
              >
                Get Started
              </AnimatedButton>
              <AnimatedButton size="lg" variant="demo" href="/demo-request" className="border-white hover:bg-white/10">
                Book a Demo
              </AnimatedButton>
            </div>
          </div>
        </motion.div>

        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </header>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-gray-50">
        <div ref={featuresInViewRef} className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Advanced Technology</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powered by Advanced AI</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform leverages Google Cloud Services and machine learning to deliver actionable insights for your
              renewable energy strategy.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <LineChart className="h-10 w-10 text-green-500" />,
                title: "Energy Usage Analytics",
                description:
                  "Track and analyze your energy consumption patterns to identify optimization opportunities.",
              },
              {
                icon: <Zap className="h-10 w-10 text-green-500" />,
                title: "Investment Optimization",
                description: "AI-powered recommendations for renewable energy investments with ROI forecasting.",
              },
              {
                icon: <BarChart3 className="h-10 w-10 text-green-500" />,
                title: "Carbon Footprint Tracking",
                description: "Monitor your carbon emissions and track progress toward reduction goals.",
              },
              {
                icon: <Cloud className="h-10 w-10 text-green-500" />,
                title: "Google Cloud Integration",
                description: "Seamless integration with Google Cloud for powerful data processing and AI capabilities.",
              },
              {
                icon: <Zap className="h-10 w-10 text-green-500" />,
                title: "Real-time Monitoring",
                description: "Get real-time insights into your energy production and consumption.",
              },
              {
                icon: <LineChart className="h-10 w-10 text-green-500" />,
                title: "Predictive Maintenance",
                description: "AI-powered predictions to prevent equipment failures and optimize maintenance schedules.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              >
                <motion.div variants={cardVariants} initial="initial" whileHover="hover" className="h-full">
                  <Card className="border-none shadow-md h-full bg-white hover:bg-gradient-to-br hover:from-white hover:to-green-50 transition-all duration-300">
                    <CardHeader>
                      <div className="mb-4 p-3 bg-green-50 rounded-lg inline-block">{feature.icon}</div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                      <div className="mt-4 flex items-center text-green-600 font-medium text-sm">
                        <span>Learn more</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section ref={dashboardRef} className="py-20">
        <div ref={dashboardInViewRef} className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={dashboardInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:w-1/2"
            >
              <Badge className="mb-4">Interactive Dashboard</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Powerful Analytics Dashboard</h2>
              <p className="text-xl text-gray-600 mb-8">
                Our intuitive dashboard provides a comprehensive view of your energy data, with customizable widgets and
                real-time updates.
              </p>
              <ul className="space-y-4">
                {[
                  "Energy production and consumption metrics",
                  "Cost savings and ROI calculations",
                  "Carbon emission reduction tracking",
                  "AI-powered recommendations",
                  "Custom alerts and notifications",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={dashboardInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                    className="flex items-start"
                  >
                    <div className="mr-3 mt-1 bg-green-500 rounded-full p-1">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <AnimatedButton className="mt-8" variant="primary" href="/dashboard">
                Explore Dashboard
              </AnimatedButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={dashboardInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:w-1/2 mt-8 lg:mt-0"
            >
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="text-gray-400 text-sm ml-2">EnergySync Dashboard</div>
                </div>
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="EnergySync Dashboard Preview"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Cloud Integration */}
      <section ref={cloudRef} className="py-20 bg-gray-50">
        <div ref={cloudInViewRef} className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={cloudInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Cloud Integration</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Google Cloud Services Integration</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              EnergySync leverages the power of Google Cloud to deliver advanced analytics and AI capabilities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "BigQuery",
                description: "Process and analyze massive datasets to extract valuable energy insights.",
              },
              {
                title: "Vertex AI",
                description: "Custom machine learning models to predict energy usage and optimize consumption.",
              },
              {
                title: "Cloud IoT Core",
                description: "Connect and manage IoT devices for real-time energy monitoring.",
              },
              {
                title: "Data Studio",
                description: "Create beautiful, interactive dashboards to visualize your energy data.",
              },
              {
                title: "Cloud Functions",
                description: "Serverless compute for real-time data processing and alerts.",
              },
              {
                title: "Cloud Storage",
                description: "Secure, scalable storage for your historical energy data.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={cloudInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              >
                <motion.div variants={cardVariants} initial="initial" whileHover="hover" className="h-full">
                  <Card className="border-none shadow-md h-full bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Cloud className="h-5 w-5 mr-2 text-blue-500" />
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                      <div className="mt-4 flex items-center text-blue-600 font-medium text-sm">
                        <span>Learn more</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-green-500"></div>
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {[...Array(10)].map((_, i) => (
              <path
                key={i}
                d={`M${i * 10},100 Q${i * 10 + 5},${80 + Math.random() * 20} ${i * 10 + 10},100`}
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="0.5"
              />
            ))}
          </svg>
        </div>
        <div ref={ctaInViewRef} className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">Get Started Today</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Optimize Your Energy Strategy?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Join businesses and communities that are already saving money and reducing their carbon footprint with
              EnergySync.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <AnimatedButton
                size="lg"
                variant="primary"
                onClick={handleGetStarted}
                className="bg-white text-teal-600 hover:bg-white/90"
              >
                Get Started Now
              </AnimatedButton>
              <AnimatedButton size="lg" variant="demo" href="/demo-request" className="border-white hover:bg-white/10">
                Book a Demo
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">EnergySync</h3>
              <p className="text-gray-400">AI-Powered Renewable Energy Optimization Platform</p>
              <div className="flex space-x-4 mt-4">
                {["twitter", "facebook", "linkedin", "github"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={`${social} link`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                      <i className={`fab fa-${social}`}></i>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                {["Features", "Pricing", "Case Studies", "Resources"].map((item, index) => (
                  <li key={index}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {["About Us", "Careers", "Blog", "Contact"].map((item, index) => (
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
            <p>© {new Date().getFullYear()} EnergySync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

