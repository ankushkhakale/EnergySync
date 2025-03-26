"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, HelpCircle, Zap } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Navbar from "@/components/navbar"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly")

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses just getting started with renewable energy.",
      monthlyPrice: 49,
      yearlyPrice: 490,
      features: [
        "Energy usage monitoring",
        "Basic analytics dashboard",
        "Email support",
        "1 user account",
        "Data retention: 3 months",
      ],
      limitations: ["No AI recommendations", "No custom reporting", "No API access"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses looking to optimize their energy usage.",
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        "Everything in Starter",
        "AI-powered recommendations",
        "Custom reporting",
        "Priority email support",
        "5 user accounts",
        "Data retention: 1 year",
        "API access",
      ],
      limitations: ["Limited integrations", "No white-labeling"],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For organizations with complex energy needs and multiple locations.",
      monthlyPrice: 249,
      yearlyPrice: 2490,
      features: [
        "Everything in Professional",
        "Unlimited user accounts",
        "Dedicated account manager",
        "Phone support",
        "Custom integrations",
        "White-labeling options",
        "Data retention: Unlimited",
        "Advanced AI forecasting",
        "Multi-location support",
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4">Pricing</Badge>
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for your business and start optimizing your renewable energy today.
          </p>

          <div className="flex items-center justify-center mt-8">
            <span className={`mr-2 ${billingCycle === "monthly" ? "text-gray-900 font-medium" : "text-gray-500"}`}>
              Monthly
            </span>
            <Switch
              checked={billingCycle === "yearly"}
              onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
            />
            <span className={`ml-2 ${billingCycle === "yearly" ? "text-gray-900 font-medium" : "text-gray-500"}`}>
              Yearly
            </span>
            {billingCycle === "yearly" && (
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 border-green-200">
                Save 20%
              </Badge>
            )}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex"
            >
              <Card
                className={`border flex flex-col w-full relative ${
                  plan.popular ? "border-teal-500 shadow-lg" : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                    <Badge className="bg-teal-500">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      ${billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="text-gray-500 ml-2">/{billingCycle === "monthly" ? "month" : "year"}</span>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Features included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.limitations.length > 0 && (
                      <>
                        <h4 className="font-medium pt-2">Limitations:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, i) => (
                            <li key={i} className="flex items-start text-gray-500">
                              <span className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0 mt-0.5">✕</span>
                              <span>{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-teal-600 hover:bg-teal-700"
                        : plan.name === "Enterprise"
                          ? "bg-gray-800 hover:bg-gray-900"
                          : ""
                    }`}
                    asChild
                  >
                    <Link href={plan.name === "Enterprise" ? "/contact" : "/signup"}>{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20"
        >
          <Card className="border-none shadow-lg max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              {[
                {
                  question: "Can I change plans later?",
                  answer:
                    "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
                },
                {
                  question: "Is there a free trial?",
                  answer: "We offer a 14-day free trial on all plans. No credit card required to start your trial.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
                },
                {
                  question: "Can I cancel my subscription?",
                  answer:
                    "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period.",
                },
                {
                  question: "Do you offer discounts for non-profits?",
                  answer:
                    "Yes, we offer special pricing for non-profit organizations. Please contact our sales team for more information.",
                },
                {
                  question: "How secure is my data?",
                  answer:
                    "We use industry-standard encryption and security practices to protect your data. Your information is never shared with third parties without your consent.",
                },
              ].map((faq, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-medium flex items-center">
                    {faq.question}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 ml-2 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">{faq.answer}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-xl p-12 max-w-4xl mx-auto">
            <Zap className="h-12 w-12 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Need a custom solution?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our enterprise plans can be tailored to your specific needs. Talk to our experts today.
            </p>
            <Button size="lg" variant="outline" className="bg-white text-teal-600 hover:bg-white/90" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

