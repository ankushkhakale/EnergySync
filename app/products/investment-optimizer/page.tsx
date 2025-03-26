"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts"
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  Download,
  Info,
  Lightbulb,
  RefreshCw,
  SunMedium,
  Wind,
  Zap,
} from "lucide-react"
import { useForm } from "react-hook-form"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/navbar"

// Investment calculator types
type InvestmentFormData = {
  investmentAmount: number
  energyType: string
  location: string
  electricityRate: number
  annualConsumption: number
  incentives: number
  financingRate: number
  financingTerm: number
}

type InvestmentResult = {
  annualSavings: number
  paybackPeriod: number
  roi: number
  npv: number
  irr: number
  totalSavings: number
  co2Reduction: number
  yearlyData: Array<{
    year: number
    savings: number
    cumulativeSavings: number
    remainingInvestment: number
  }>
}

export default function InvestmentOptimizerPage() {
  const [activeTab, setActiveTab] = useState("calculator")
  const [isCalculating, setIsCalculating] = useState(false)
  const [investmentResult, setInvestmentResult] = useState<InvestmentResult | null>(null)
  const [comparisonData, setComparisonData] = useState<any[]>([])
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const { toast } = useToast()

  // Intersection observer for animations
  const [calculatorRef, calculatorInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [resultsRef, resultsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [comparisonRef, comparisonInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Form setup
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<InvestmentFormData>({
    defaultValues: {
      investmentAmount: 50000,
      energyType: "solar",
      location: "southwest",
      electricityRate: 0.15,
      annualConsumption: 12000,
      incentives: 30,
      financingRate: 4.5,
      financingTerm: 10,
    },
  })

  // Watch form values for real-time updates
  const watchedValues = watch()

  // Energy type options with efficiency and lifespan data
  const energyTypes = [
    { value: "solar", label: "Solar Panels", efficiency: 0.2, lifespan: 25, icon: <SunMedium className="h-5 w-5" /> },
    { value: "wind", label: "Wind Turbine", efficiency: 0.35, lifespan: 20, icon: <Wind className="h-5 w-5" /> },
    { value: "battery", label: "Battery Storage", efficiency: 0.9, lifespan: 15, icon: <Zap className="h-5 w-5" /> },
    { value: "hybrid", label: "Hybrid System", efficiency: 0.4, lifespan: 20, icon: <Lightbulb className="h-5 w-5" /> },
  ]

  // Location options with solar/wind potential data
  const locations = [
    { value: "southwest", label: "Southwest", solarFactor: 1.3, windFactor: 0.8 },
    { value: "southeast", label: "Southeast", solarFactor: 1.1, windFactor: 0.7 },
    { value: "midwest", label: "Midwest", solarFactor: 0.9, windFactor: 1.2 },
    { value: "northeast", label: "Northeast", solarFactor: 0.8, windFactor: 0.9 },
    { value: "northwest", label: "Northwest", solarFactor: 0.7, windFactor: 1.3 },
    { value: "custom", label: "Custom Location", solarFactor: 1.0, windFactor: 1.0 },
  ]

  // Calculate investment results
  const calculateInvestment = (data: InvestmentFormData) => {
    setIsCalculating(true)

    // Simulate API call with delay
    setTimeout(() => {
      try {
        // Get energy type details
        const energyType = energyTypes.find((type) => type.value === data.energyType)
        const location = locations.find((loc) => loc.value === data.location)

        if (!energyType || !location) {
          throw new Error("Invalid energy type or location")
        }

        // Calculate efficiency factor based on energy type and location
        let efficiencyFactor = energyType.efficiency
        if (data.energyType === "solar") {
          efficiencyFactor *= location.solarFactor
        } else if (data.energyType === "wind") {
          efficiencyFactor *= location.windFactor
        } else if (data.energyType === "hybrid") {
          efficiencyFactor *= (location.solarFactor + location.windFactor) / 2
        }

        // Calculate net investment after incentives
        const netInvestment = data.investmentAmount * (1 - data.incentives / 100)

        // Calculate annual energy production (kWh)
        let annualProduction = 0
        if (data.energyType === "solar") {
          // Assume $3 per watt, so investment amount / 3 = watts
          const systemSizeWatts = data.investmentAmount / 3
          // Average 1,400 kWh per kW per year with adjustment for location
          annualProduction = (systemSizeWatts / 1000) * 1400 * location.solarFactor
        } else if (data.energyType === "wind") {
          // Simplified calculation for wind
          const systemSizeKW = data.investmentAmount / 5000 // Assume $5000 per kW
          annualProduction = systemSizeKW * 2200 * location.windFactor
        } else if (data.energyType === "battery") {
          // Battery doesn't generate but can save by load shifting
          // Assume 10% savings on consumption through load shifting
          annualProduction = data.annualConsumption * 0.1
        } else if (data.energyType === "hybrid") {
          // Combination of solar and battery benefits
          const solarSystemWatts = (data.investmentAmount * 0.7) / 3 // 70% to solar
          const solarProduction = (solarSystemWatts / 1000) * 1400 * location.solarFactor
          const batteryBenefit = data.annualConsumption * 0.05 // 5% from battery
          annualProduction = solarProduction + batteryBenefit
        }

        // Calculate annual savings
        const annualSavings = annualProduction * data.electricityRate

        // Calculate simple payback period
        const simplePaybackPeriod = netInvestment / annualSavings

        // Calculate ROI (over system lifetime)
        const roi = ((annualSavings * energyType.lifespan - netInvestment) / netInvestment) * 100

        // Calculate NPV
        const discountRate = data.financingRate / 100
        let npv = -netInvestment
        for (let year = 1; year <= energyType.lifespan; year++) {
          npv += annualSavings / Math.pow(1 + discountRate, year)
        }

        // Calculate IRR (simplified approximation)
        const irr = (annualSavings / netInvestment) * 100

        // Calculate total savings over system lifetime
        const totalSavings = annualSavings * energyType.lifespan

        // Calculate CO2 reduction (assume 0.85 lbs CO2 per kWh)
        const co2Reduction = (annualProduction * 0.85 * energyType.lifespan) / 2000 // Convert to tons

        // Generate yearly data for charts
        const yearlyData = []
        let remainingInvestment = netInvestment
        let cumulativeSavings = 0

        for (let year = 1; year <= Math.max(energyType.lifespan, 25); year++) {
          cumulativeSavings += annualSavings
          remainingInvestment = Math.max(0, remainingInvestment - annualSavings)

          yearlyData.push({
            year,
            savings: annualSavings,
            cumulativeSavings,
            remainingInvestment,
          })
        }

        // Set results
        const result: InvestmentResult = {
          annualSavings,
          paybackPeriod: simplePaybackPeriod,
          roi,
          npv,
          irr,
          totalSavings,
          co2Reduction,
          yearlyData,
        }

        setInvestmentResult(result)

        // Generate comparison data for different energy types
        const comparisonResults = energyTypes.map((type) => {
          // Simplified calculation for comparison
          const typeEfficiency = type.efficiency
          let typeFactor = 1.0

          if (type.value === "solar") {
            typeFactor = location.solarFactor
          } else if (type.value === "wind") {
            typeFactor = location.windFactor
          } else if (type.value === "hybrid") {
            typeFactor = (location.solarFactor + location.windFactor) / 2
          }

          const typeAnnualSavings = data.investmentAmount * typeEfficiency * typeFactor * 0.0001 * data.electricityRate
          const typePayback = (data.investmentAmount * (1 - data.incentives / 100)) / typeAnnualSavings
          const typeROI =
            ((typeAnnualSavings * type.lifespan - data.investmentAmount * (1 - data.incentives / 100)) /
              (data.investmentAmount * (1 - data.incentives / 100))) *
            100

          return {
            name: type.label,
            value: type.value,
            annualSavings: typeAnnualSavings,
            paybackPeriod: typePayback,
            roi: typeROI,
            lifespan: type.lifespan,
          }
        })

        setComparisonData(comparisonResults)

        // Show success toast
        toast({
          title: "Calculation complete",
          description: "Your investment analysis has been generated successfully.",
        })

        // Switch to results tab
        setActiveTab("results")
      } catch (error) {
        console.error("Calculation error:", error)
        toast({
          title: "Calculation error",
          description: "There was an error calculating your investment results. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsCalculating(false)
      }
    }, 1500)
  }

  // Reset form and results
  const handleReset = () => {
    reset()
    setInvestmentResult(null)
    setComparisonData([])
    setActiveTab("calculator")

    toast({
      title: "Form reset",
      description: "All values have been reset to defaults.",
    })
  }

  // Save/export results
  const handleExport = () => {
    if (!investmentResult) return

    // Create a downloadable JSON file
    const dataStr = JSON.stringify(
      {
        inputs: watchedValues,
        results: investmentResult,
      },
      null,
      2,
    )
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportName = `energysync-investment-analysis-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportName)
    linkElement.click()

    toast({
      title: "Export successful",
      description: "Your investment analysis has been exported successfully.",
    })
  }

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800">{`Year ${label}`}</p>
          <div className="mt-2">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center mt-1">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                <span className="text-gray-600">{entry.name}: </span>
                <span className="ml-1 font-medium">
                  {entry.name.includes("Investment")
                    ? `$${entry.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                    : entry.name.includes("Savings")
                      ? `$${entry.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                      : entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

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
          <Badge className="mb-4">Investment Optimizer</Badge>
          <h1 className="text-4xl font-bold mb-4">Maximize Your Renewable Energy ROI</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our advanced calculator helps you analyze and optimize your renewable energy investments with accurate ROI
            projections, payback periods, and comparison tools.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="results" disabled={!investmentResult}>
              Results
            </TabsTrigger>
            <TabsTrigger value="comparison" disabled={!investmentResult}>
              Comparison
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator">
            <motion.div
              ref={calculatorRef}
              initial={{ opacity: 0 }}
              animate={calculatorInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <div className="flex items-center">
                    <Calculator className="h-6 w-6 mr-2 text-teal-600" />
                    <CardTitle>Investment Calculator</CardTitle>
                  </div>
                  <CardDescription>
                    Enter your investment details to calculate potential returns and savings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(calculateInvestment)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="investmentAmount" className="flex items-center">
                            Investment Amount ($)
                            <TooltipProvider>
                              <UITooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 ml-2 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="w-80">
                                    The total amount you plan to invest in renewable energy technology.
                                  </p>
                                </TooltipContent>
                              </UITooltip>
                            </TooltipProvider>
                          </Label>
                          <Input
                            id="investmentAmount"
                            type="number"
                            {...register("investmentAmount", {
                              required: "Investment amount is required",
                              min: { value: 1000, message: "Minimum investment is $1,000" },
                              max: { value: 1000000, message: "Maximum investment is $1,000,000" },
                            })}
                            className="mt-1"
                          />
                          {errors.investmentAmount && (
                            <p className="text-red-500 text-sm mt-1">{errors.investmentAmount.message}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="energyType" className="flex items-center">
                            Energy Technology
                            <TooltipProvider>
                              <UITooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 ml-2 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="w-80">The type of renewable energy technology you plan to invest in.</p>
                                </TooltipContent>
                              </UITooltip>
                            </TooltipProvider>
                          </Label>
                          <Select
                            value={watchedValues.energyType}
                            onValueChange={(value) => setValue("energyType", value)}
                          >
                            <SelectTrigger id="energyType" className="mt-1">
                              <SelectValue placeholder="Select energy type" />
                            </SelectTrigger>
                            <SelectContent>
                              {energyTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value} className="flex items-center">
                                  <div className="flex items-center">
                                    {type.icon}
                                    <span className="ml-2">{type.label}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="location" className="flex items-center">
                            Location
                            <TooltipProvider>
                              <UITooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 ml-2 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="w-80">Your geographical location affects solar and wind potential.</p>
                                </TooltipContent>
                              </UITooltip>
                            </TooltipProvider>
                          </Label>
                          <Select value={watchedValues.location} onValueChange={(value) => setValue("location", value)}>
                            <SelectTrigger id="location" className="mt-1">
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              {locations.map((location) => (
                                <SelectItem key={location.value} value={location.value}>
                                  {location.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="electricityRate" className="flex items-center">
                            Electricity Rate ($/kWh)
                            <TooltipProvider>
                              <UITooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 ml-2 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="w-80">Your current electricity rate per kilowatt-hour.</p>
                                </TooltipContent>
                              </UITooltip>
                            </TooltipProvider>
                          </Label>
                          <Input
                            id="electricityRate"
                            type="number"
                            step="0.01"
                            {...register("electricityRate", {
                              required: "Electricity rate is required",
                              min: { value: 0.05, message: "Minimum rate is $0.05/kWh" },
                              max: { value: 0.5, message: "Maximum rate is $0.50/kWh" },
                            })}
                            className="mt-1"
                          />
                          {errors.electricityRate && (
                            <p className="text-red-500 text-sm mt-1">{errors.electricityRate.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="annualConsumption" className="flex items-center">
                            Annual Consumption (kWh)
                            <TooltipProvider>
                              <UITooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 ml-2 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="w-80">Your annual electricity consumption in kilowatt-hours.</p>
                                </TooltipContent>
                              </UITooltip>
                            </TooltipProvider>
                          </Label>
                          <Input
                            id="annualConsumption"
                            type="number"
                            {...register("annualConsumption", {
                              required: "Annual consumption is required",
                              min: { value: 1000, message: "Minimum consumption is 1,000 kWh" },
                              max: { value: 100000, message: "Maximum consumption is 100,000 kWh" },
                            })}
                            className="mt-1"
                          />
                          {errors.annualConsumption && (
                            <p className="text-red-500 text-sm mt-1">{errors.annualConsumption.message}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="incentives" className="flex items-center">
                            Incentives & Tax Credits (%)
                            <TooltipProvider>
                              <UITooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 ml-2 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="w-80">
                                    Available tax credits, rebates, and incentives as a percentage of total cost.
                                  </p>
                                </TooltipContent>
                              </UITooltip>
                            </TooltipProvider>
                          </Label>
                          <div className="flex items-center mt-1">
                            <Slider
                              id="incentives"
                              min={0}
                              max={50}
                              step={1}
                              value={[watchedValues.incentives]}
                              onValueChange={(value) => setValue("incentives", value[0])}
                              className="flex-1 mr-4"
                            />
                            <span className="w-12 text-right">{watchedValues.incentives}%</span>
                          </div>
                        </div>

                        <div className="pt-4">
                          <button
                            type="button"
                            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                            className="flex items-center text-teal-600 hover:text-teal-700 text-sm font-medium"
                          >
                            {showAdvancedOptions ? (
                              <>
                                <ChevronUp className="h-4 w-4 mr-1" />
                                Hide Advanced Options
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4 mr-1" />
                                Show Advanced Options
                              </>
                            )}
                          </button>
                        </div>

                        <AnimatePresence>
                          {showAdvancedOptions && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="space-y-4 pt-2"
                            >
                              <div>
                                <Label htmlFor="financingRate" className="flex items-center">
                                  Financing Rate (%)
                                  <TooltipProvider>
                                    <UITooltip>
                                      <TooltipTrigger asChild>
                                        <Info className="h-4 w-4 ml-2 text-gray-400" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="w-80">Annual interest rate if financing the investment.</p>
                                      </TooltipContent>
                                    </UITooltip>
                                  </TooltipProvider>
                                </Label>
                                <Input
                                  id="financingRate"
                                  type="number"
                                  step="0.1"
                                  {...register("financingRate", {
                                    min: { value: 0, message: "Minimum rate is 0%" },
                                    max: { value: 20, message: "Maximum rate is 20%" },
                                  })}
                                  className="mt-1"
                                />
                                {errors.financingRate && (
                                  <p className="text-red-500 text-sm mt-1">{errors.financingRate.message}</p>
                                )}
                              </div>

                              <div>
                                <Label htmlFor="financingTerm" className="flex items-center">
                                  Financing Term (years)
                                  <TooltipProvider>
                                    <UITooltip>
                                      <TooltipTrigger asChild>
                                        <Info className="h-4 w-4 ml-2 text-gray-400" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="w-80">Length of financing term in years.</p>
                                      </TooltipContent>
                                    </UITooltip>
                                  </TooltipProvider>
                                </Label>
                                <Input
                                  id="financingTerm"
                                  type="number"
                                  {...register("financingTerm", {
                                    min: { value: 1, message: "Minimum term is 1 year" },
                                    max: { value: 30, message: "Maximum term is 30 years" },
                                  })}
                                  className="mt-1"
                                />
                                {errors.financingTerm && (
                                  <p className="text-red-500 text-sm mt-1">{errors.financingTerm.message}</p>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700" disabled={isCalculating}>
                        {isCalculating ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Calculating...
                          </>
                        ) : (
                          <>
                            <Calculator className="mr-2 h-4 w-4" />
                            Calculate Investment
                          </>
                        )}
                      </Button>
                      <Button type="button" variant="outline" onClick={handleReset} disabled={isCalculating}>
                        Reset
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="results">
            {investmentResult && (
              <motion.div
                ref={resultsRef}
                initial={{ opacity: 0 }}
                animate={resultsInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Annual Savings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-teal-600">
                        ${investmentResult.annualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Per year</p>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Payback Period</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-teal-600">
                        {investmentResult.paybackPeriod.toFixed(1)} years
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Return on investment</p>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">ROI</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-teal-600">{investmentResult.roi.toFixed(1)}%</div>
                      <p className="text-sm text-gray-500 mt-1">Over system lifetime</p>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">CO₂ Reduction</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-teal-600">
                        {investmentResult.co2Reduction.toFixed(1)} tons
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Lifetime carbon savings</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Investment Analysis</CardTitle>
                    <CardDescription>Projected savings and payback period over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={investmentResult.yearlyData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="year" label={{ value: "Year", position: "insideBottomRight", offset: -10 }} />
                          <YAxis
                            label={{ value: "Amount ($)", angle: -90, position: "insideLeft" }}
                            tickFormatter={(value) => `$${value.toLocaleString()}`}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <ReferenceLine
                            y={watchedValues.investmentAmount * (1 - watchedValues.incentives / 100)}
                            label="Initial Investment"
                            stroke="#ff7300"
                            strokeDasharray="3 3"
                          />
                          <Area
                            type="monotone"
                            dataKey="cumulativeSavings"
                            name="Cumulative Savings"
                            stroke="#10b981"
                            fill="#10b981"
                            fillOpacity={0.3}
                          />
                          <Area
                            type="monotone"
                            dataKey="remainingInvestment"
                            name="Remaining Investment"
                            stroke="#ef4444"
                            fill="#ef4444"
                            fillOpacity={0.3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-none shadow-lg">
                    <CardHeader>
                      <CardTitle>Financial Metrics</CardTitle>
                      <CardDescription>Detailed financial analysis of your investment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">Net Present Value (NPV)</span>
                          <span className="font-bold text-teal-600">
                            ${investmentResult.npv.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">Internal Rate of Return (IRR)</span>
                          <span className="font-bold text-teal-600">{investmentResult.irr.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">Total Lifetime Savings</span>
                          <span className="font-bold text-teal-600">
                            ${investmentResult.totalSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">Payback Period</span>
                          <span className="font-bold text-teal-600">
                            {investmentResult.paybackPeriod.toFixed(1)} years
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Annual Return</span>
                          <span className="font-bold text-teal-600">
                            {(
                              (investmentResult.annualSavings /
                                (watchedValues.investmentAmount * (1 - watchedValues.incentives / 100))) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-lg">
                    <CardHeader>
                      <CardTitle>Environmental Impact</CardTitle>
                      <CardDescription>Environmental benefits of your renewable energy investment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">CO₂ Emissions Avoided</span>
                          <span className="font-bold text-green-600">
                            {investmentResult.co2Reduction.toFixed(1)} tons
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">Equivalent Trees Planted</span>
                          <span className="font-bold text-green-600">
                            {Math.round(investmentResult.co2Reduction * 45)} trees
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">Equivalent Car Miles Avoided</span>
                          <span className="font-bold text-green-600">
                            {Math.round(investmentResult.co2Reduction * 2500).toLocaleString()} miles
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Homes Powered (Equivalent)</span>
                          <span className="font-bold text-green-600">
                            {Math.max(
                              1,
                              Math.round(investmentResult.annualSavings / watchedValues.electricityRate / 10000),
                            )}{" "}
                            homes
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setActiveTab("calculator")}>
                    Back to Calculator
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("comparison")}>
                    View Comparison
                  </Button>
                  <Button onClick={handleExport} className="bg-teal-600 hover:bg-teal-700">
                    <Download className="mr-2 h-4 w-4" />
                    Export Results
                  </Button>
                </div>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="comparison">
            {investmentResult && comparisonData.length > 0 && (
              <motion.div
                ref={comparisonRef}
                initial={{ opacity: 0 }}
                animate={comparisonInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Technology Comparison</CardTitle>
                    <CardDescription>
                      Compare different renewable energy technologies based on your investment amount
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="name" />
                          <YAxis
                            yAxisId="left"
                            label={{ value: "Annual Savings ($)", angle: -90, position: "insideLeft" }}
                            tickFormatter={(value) => `$${value.toLocaleString()}`}
                          />
                          <YAxis
                            yAxisId="right"
                            orientation="right"
                            label={{ value: "ROI (%)", angle: 90, position: "insideRight" }}
                          />
                          <Tooltip />
                          <Legend />
                          <Bar
                            yAxisId="left"
                            dataKey="annualSavings"
                            name="Annual Savings"
                            fill="#10b981"
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar yAxisId="right" dataKey="roi" name="ROI (%)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Payback Period Comparison</CardTitle>
                    <CardDescription>Compare payback periods across different technologies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={comparisonData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis type="number" label={{ value: "Years", position: "insideBottom", offset: -10 }} />
                          <YAxis type="category" dataKey="name" width={100} />
                          <Tooltip />
                          <Legend />
                          <Bar
                            dataKey="paybackPeriod"
                            name="Payback Period (Years)"
                            fill="#f59e0b"
                            radius={[0, 4, 4, 0]}
                          />
                          <ReferenceLine x={5} stroke="#10b981" label="Excellent" strokeDasharray="3 3" />
                          <ReferenceLine x={10} stroke="#3b82f6" label="Good" strokeDasharray="3 3" />
                          <ReferenceLine x={15} stroke="#ef4444" label="Fair" strokeDasharray="3 3" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Detailed Comparison</CardTitle>
                    <CardDescription>
                      Side-by-side comparison of different renewable energy technologies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="px-4 py-3 text-left font-medium text-gray-600">Technology</th>
                            <th className="px-4 py-3 text-right font-medium text-gray-600">Annual Savings</th>
                            <th className="px-4 py-3 text-right font-medium text-gray-600">Payback Period</th>
                            <th className="px-4 py-3 text-right font-medium text-gray-600">ROI</th>
                            <th className="px-4 py-3 text-right font-medium text-gray-600">Lifespan</th>
                            <th className="px-4 py-3 text-right font-medium text-gray-600">Lifetime Savings</th>
                          </tr>
                        </thead>
                        <tbody>
                          {comparisonData.map((item, index) => (
                            <tr
                              key={item.value}
                              className={`border-b ${item.value === watchedValues.energyType ? "bg-teal-50" : ""}`}
                            >
                              <td className="px-4 py-3">
                                <div className="flex items-center">
                                  {item.value === watchedValues.energyType && (
                                    <Badge className="mr-2 bg-teal-500">Selected</Badge>
                                  )}
                                  {item.name}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-right font-medium">
                                ${item.annualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </td>
                              <td className="px-4 py-3 text-right font-medium">
                                {item.paybackPeriod.toFixed(1)} years
                              </td>
                              <td className="px-4 py-3 text-right font-medium">{item.roi.toFixed(1)}%</td>
                              <td className="px-4 py-3 text-right font-medium">{item.lifespan} years</td>
                              <td className="px-4 py-3 text-right font-medium">
                                $
                                {(item.annualSavings * item.lifespan).toLocaleString(undefined, {
                                  maximumFractionDigits: 0,
                                })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setActiveTab("calculator")}>
                    Back to Calculator
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("results")}>
                    View Results
                  </Button>
                  <Button onClick={handleExport} className="bg-teal-600 hover:bg-teal-700">
                    <Download className="mr-2 h-4 w-4" />
                    Export Comparison
                  </Button>
                </div>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <Accordion type="single" collapsible className="max-w-4xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger>How is the ROI calculated?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  Return on Investment (ROI) is calculated by dividing the net profit (lifetime savings minus initial
                  investment) by the initial investment, then multiplying by 100 to get a percentage. We account for the
                  system lifespan, incentives, and the time value of money in our calculations.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What factors affect payback period?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  The payback period is affected by several factors including: initial investment amount, available
                  incentives and tax credits, your current electricity rate, your location's solar or wind potential,
                  system efficiency, and annual energy consumption. Higher electricity rates and better renewable
                  resources in your area will generally result in shorter payback periods.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How accurate are these calculations?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  Our calculator provides estimates based on industry standards and averages. Actual results may vary
                  based on specific equipment chosen, installation quality, weather patterns, and changes in electricity
                  rates over time. For a more precise analysis tailored to your specific situation, we recommend
                  consulting with a renewable energy professional.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What incentives are available?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  Incentives vary by location but may include federal tax credits (currently 30% in the US for solar,
                  wind, and battery storage), state tax credits, utility rebates, performance-based incentives, and net
                  metering programs. The calculator allows you to input the total percentage of incentives available to
                  you.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </div>
  )
}

