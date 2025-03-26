"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Navbar from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, BarChart, Zap, Globe } from "lucide-react"

export default function AboutPage() {
  const [missionRef, missionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [teamRef, teamInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      bio: "Former renewable energy consultant with 15+ years of experience in the industry.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      bio: "AI researcher with a PhD in Machine Learning from Stanford University.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Data Science",
      bio: "Previously led data science teams at major energy companies.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Priya Patel",
      role: "VP of Product",
      bio: "Product leader with experience at leading cleantech startups.",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const stats = [
    { label: "Customers", value: "200+", icon: <Users className="h-8 w-8 text-teal-500" /> },
    { label: "Energy Saved", value: "1.2M kWh", icon: <Zap className="h-8 w-8 text-teal-500" /> },
    { label: "Carbon Reduced", value: "850 tons", icon: <Globe className="h-8 w-8 text-teal-500" /> },
    { label: "Awards", value: "12", icon: <Award className="h-8 w-8 text-teal-500" /> },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-green-500 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">Our Story</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About EnergySync</h1>
            <p className="text-xl max-w-3xl mx-auto text-white/90">
              We're on a mission to accelerate the transition to renewable energy through innovative AI-powered
              solutions.
            </p>
          </motion.div>
        </div>

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
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div ref={missionRef} className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="md:w-1/2"
            >
              <Badge className="mb-4">Our Mission</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Powering a Sustainable Future</h2>
              <p className="text-lg text-gray-600 mb-6">
                At EnergySync, we believe that the transition to renewable energy is one of the most important
                challenges of our time. Our mission is to accelerate this transition by making it easier for businesses
                and communities to optimize their energy usage and investments.
              </p>
              <p className="text-lg text-gray-600">
                Founded in 2020, we've been at the forefront of applying artificial intelligence to solve complex energy
                optimization problems. Our team combines expertise in renewable energy, data science, and software
                engineering to deliver solutions that make a real impact.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:w-1/2"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl blur-lg opacity-20"></div>
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="EnergySync Mission"
                  className="relative rounded-xl shadow-lg w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div ref={statsRef} className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Impact</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Making a Difference</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Since our founding, we've helped businesses and communities achieve significant energy savings and carbon
              reductions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-6 border-none shadow-md hover:shadow-xl transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">{stat.icon}</div>
                    <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div ref={teamRef} className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Team</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the Experts</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team brings together expertise in renewable energy, artificial intelligence, and software development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="border-none shadow-md overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white">
                        <p className="text-sm">{member.bio}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="text-center p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Values</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Drives Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values guide everything we do at EnergySync.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description: "We're constantly pushing the boundaries of what's possible with AI and renewable energy.",
                icon: <Zap className="h-10 w-10 text-teal-500" />,
              },
              {
                title: "Sustainability",
                description: "We're committed to creating a more sustainable future for generations to come.",
                icon: <Globe className="h-10 w-10 text-teal-500" />,
              },
              {
                title: "Impact",
                description:
                  "We measure our success by the real-world impact our solutions have on energy usage and carbon emissions.",
                icon: <BarChart className="h-10 w-10 text-teal-500" />,
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="border-none shadow-md h-full">
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 bg-teal-50 rounded-full">{value.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {["About Us", "Careers", "Blog", "Contact"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
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

