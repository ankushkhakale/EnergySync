"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Calendar, Clock, Users, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/navbar"
import { AnimatedButton } from "@/components/animated-button"

export default function DemoRequestPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [message, setMessage] = useState("")
  const [preferredDate, setPreferredDate] = useState("")
  const [preferredTime, setPreferredTime] = useState("")
  const [industry, setIndustry] = useState("")
  const [companySize, setCompanySize] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)
    toast({
      title: "Demo request submitted",
      description: "Our team will contact you shortly to schedule your demo.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        {!isSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Schedule Your EnergySync Demo</h1>
              <p className="text-xl text-gray-600">
                See how EnergySync can optimize your renewable energy investments and reduce your carbon footprint.
              </p>
            </div>

            <Card className="border-none shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-5">
                  <div className="p-8 bg-gradient-to-b from-teal-600 to-green-600 text-white md:col-span-2">
                    <h2 className="text-2xl font-bold mb-6">What to expect</h2>

                    <ul className="space-y-6">
                      {[
                        {
                          title: "Personalized walkthrough",
                          description: "Our experts will customize the demo to your organization's specific needs",
                          icon: <Users className="h-6 w-6" />,
                        },
                        {
                          title: "Discover key features",
                          description: "Learn how AI-powered analytics can transform your energy management",
                          icon: <Zap className="h-6 w-6" />,
                        },
                        {
                          title: "Implementation roadmap",
                          description: "Get a clear view of how EnergySync can be integrated into your operations",
                          icon: <Calendar className="h-6 w-6" />,
                        },
                        {
                          title: "Q&A session",
                          description: "We'll address all your questions and provide tailored solutions",
                          icon: <Clock className="h-6 w-6" />,
                        },
                      ].map((item, index) => (
                        <li key={index} className="flex">
                          <div className="mr-4 mt-1">{item.icon}</div>
                          <div>
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-white/80 text-sm">{item.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-8 md:col-span-3">
                    <h2 className="text-2xl font-bold mb-6">Tell us about yourself</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name*</Label>
                          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address*</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company*</Label>
                          <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number*</Label>
                          <Input
                            id="phone"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="industry">Industry</Label>
                          <Select value={industry} onValueChange={setIndustry}>
                            <SelectTrigger id="industry">
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="energy">Energy</SelectItem>
                              <SelectItem value="manufacturing">Manufacturing</SelectItem>
                              <SelectItem value="commercial">Commercial Real Estate</SelectItem>
                              <SelectItem value="government">Government</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company-size">Company Size</Label>
                          <Select value={companySize} onValueChange={setCompanySize}>
                            <SelectTrigger id="company-size">
                              <SelectValue placeholder="Select company size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-50">1-50 employees</SelectItem>
                              <SelectItem value="51-200">51-200 employees</SelectItem>
                              <SelectItem value="201-500">201-500 employees</SelectItem>
                              <SelectItem value="501-1000">501-1000 employees</SelectItem>
                              <SelectItem value="1000+">1000+ employees</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="preferred-date">Preferred Date</Label>
                          <Input
                            id="preferred-date"
                            type="date"
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="preferred-time">Preferred Time</Label>
                          <Select value={preferredTime} onValueChange={setPreferredTime}>
                            <SelectTrigger id="preferred-time">
                              <SelectValue placeholder="Select time slot" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                              <SelectItem value="afternoon">Afternoon (1PM - 5PM)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Additional Information</Label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell us about your specific needs or questions"
                          rows={4}
                        />
                      </div>

                      <AnimatedButton type="submit" className="w-full" variant="demo" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Schedule Demo"}
                      </AnimatedButton>

                      <p className="text-xs text-gray-500 text-center">
                        By submitting this form, you agree to our privacy policy and terms of service.
                      </p>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto text-center bg-white rounded-lg shadow-lg p-10"
          >
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Your demo request has been successfully submitted. Our team will reach out to you shortly to confirm your
              appointment.
            </p>
            <AnimatedButton href="/" variant="primary">
              Return to Home
            </AnimatedButton>
          </motion.div>
        )}
      </div>
    </div>
  )
}

