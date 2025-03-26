"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import {
  Car,
  Home,
  Utensils,
  Leaf,
  Download,
  RefreshCw,
  Calculator,
  Info,
  Check,
  ChevronDown,
  ChevronUp,
  Trash2,
  Plus,
} from "lucide-react"
import { useForm, useFieldArray } from "react-hook-form"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/navbar"

// Carbon calculator types
type CarbonFormData = {
  household: {
    electricityUsage: number
    electricityType: string
    naturalGas: number
    waterUsage: number
    wasteGeneration: number
    recycling: boolean
    composting: boolean
  }
  transportation: {
    carType: string
    carMileage: number
    publicTransport: number
    flights: {
      distance: number
      frequency: number
    }[]
  }
  lifestyle: {
    dietType: string
    shoppingHabits: string
    foodWaste: number
  }
}

type CarbonResult = {
  totalEmissions: number
  householdEmissions: number
  transportationEmissions: number
  lifestyleEmissions: number
  breakdown: {
    category: string
    subcategory: string
    emissions: number
    percentage: number
  }[]
  reductionPotential: {
    action: string
    category: string
    potentialSavings: number
    difficulty: string
    description: string
  }[]
  comparisonToAverage: number
  monthlyData: {
    month: string
    emissions: number
    target: number
  }[]
}

export default function CarbonTrackingPage() {
  const [activeTab, setActiveTab] = useState("calculator")
  const [isCalculating, setIsCalculating] = useState(false)
  const [carbonResult, setCarbonResult] = useState<CarbonResult | null>(null)
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

  const [reductionsRef, reductionsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Form setup
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<CarbonFormData>({
    defaultValues: {
      household: {
        electricityUsage: 900,
        electricityType: "grid",
        naturalGas: 50,
        waterUsage: 4000,
        wasteGeneration: 30,
        recycling: true,
        composting: false,
      },
      transportation: {
        carType: "gasoline",
        carMileage: 12000,
        publicTransport: 500,
        flights: [{ distance: 2000, frequency: 2 }],
      },
      lifestyle: {
        dietType: "omnivore",
        shoppingHabits: "moderate",
        foodWaste: 20,
      },
    },
  })

  // Field array for flights
  const { fields, append, remove } = useFieldArray({
    control,
    name: "transportation.flights",
  })

  // Watch form values for real-time updates
  const watchedValues = watch()

  // Diet type options with emissions factors
  const dietTypes = [
    { value: "vegan", label: "Vegan", factor: 0.5 },
    { value: "vegetarian", label: "Vegetarian", factor: 0.7 },
    { value: "pescatarian", label: "Pescatarian", factor: 0.8 },
    { value: "omnivore", label: "Omnivore", factor: 1.0 },
    { value: "high_meat", label: "High Meat Consumption", factor: 1.3 },
  ]

  // Car type options with emissions factors
  const carTypes = [
    { value: "electric", label: "Electric Vehicle", factor: 0.2 },
    { value: "hybrid", label: "Hybrid", factor: 0.6 },
    { value: "gasoline", label: "Gasoline", factor: 1.0 },
    { value: "diesel", label: "Diesel", factor: 1.1 },
    { value: "suv", label: "SUV/Truck", factor: 1.5 },
  ]

  // Electricity type options with emissions factors
  const electricityTypes = [
    { value: "renewable", label: "100% Renewable", factor: 0.1 },
    { value: "partial_renewable", label: "Partial Renewable", factor: 0.6 },
    { value: "grid", label: "Standard Grid", factor: 1.0 },
    { value: "coal", label: "Coal Heavy", factor: 1.5 },
  ]

  // Shopping habits options with emissions factors
  const shoppingHabits = [
    { value: "minimal", label: "Minimal/Second-hand", factor: 0.3 },
    { value: "conscious", label: "Environmentally Conscious", factor: 0.7 },
    { value: "moderate", label: "Moderate Consumer", factor: 1.0 },
    { value: "frequent", label: "Frequent Shopper", factor: 1.5 },
  ]

  // Calculate carbon footprint
  const calculateCarbonFootprint = (data: CarbonFormData) => {
    setIsCalculating(true)

    // Simulate API call with delay
    setTimeout(() => {
      try {
        // Get factors for selected options
        const dietFactor = dietTypes.find((type) => type.value === data.lifestyle.dietType)?.factor || 1.0
        const carFactor = carTypes.find((type) => type.value === data.transportation.carType)?.factor || 1.0
        const electricityFactor =
          electricityTypes.find((type) => type.value === data.household.electricityType)?.factor || 1.0
        const shoppingFactor =
          shoppingHabits.find((type) => type.value === data.lifestyle.shoppingHabits)?.factor || 1.0

        // Calculate household emissions
        const electricityEmissions = data.household.electricityUsage * 0.0005 * electricityFactor
        const naturalGasEmissions = data.household.naturalGas * 0.005
        const waterEmissions = data.household.waterUsage * 0.0001
        const wasteEmissions =
          data.household.wasteGeneration *
          0.02 *
          (data.household.recycling ? 0.7 : 1.0) *
          (data.household.composting ? 0.9 : 1.0)
        const householdEmissions = electricityEmissions + naturalGasEmissions + waterEmissions + wasteEmissions

        // Calculate transportation emissions
        const carEmissions = data.transportation.carMileage * 0.0004 * carFactor
        const publicTransportEmissions = data.transportation.publicTransport * 0.0002

        // Calculate flight emissions
        let flightEmissions = 0
        data.transportation.flights.forEach((flight) => {
          flightEmissions += flight.distance * flight.frequency * 0.0002
        })

        const transportationEmissions = carEmissions + publicTransportEmissions + flightEmissions

        // Calculate lifestyle emissions
        const dietEmissions = 2.0 * dietFactor
        const shoppingEmissions = 1.5 * shoppingFactor
        const foodWasteEmissions = data.lifestyle.foodWaste * 0.01
        const lifestyleEmissions = dietEmissions + shoppingEmissions + foodWasteEmissions

        // Calculate total emissions
        const totalEmissions = householdEmissions + transportationEmissions + lifestyleEmissions

        // Create breakdown
        const breakdown = [
          {
            category: "Household",
            subcategory: "Electricity",
            emissions: electricityEmissions,
            percentage: (electricityEmissions / totalEmissions) * 100,
          },
          {
            category: "Household",
            subcategory: "Natural Gas",
            emissions: naturalGasEmissions,
            percentage: (naturalGasEmissions / totalEmissions) * 100,
          },
          {
            category: "Household",
            subcategory: "Water",
            emissions: waterEmissions,
            percentage: (waterEmissions / totalEmissions) * 100,
          },
          {
            category: "Household",
            subcategory: "Waste",
            emissions: wasteEmissions,
            percentage: (wasteEmissions / totalEmissions) * 100,
          },
          {
            category: "Transportation",
            subcategory: "Car",
            emissions: carEmissions,
            percentage: (carEmissions / totalEmissions) * 100,
          },
          {
            category: "Transportation",
            subcategory: "Public Transport",
            emissions: publicTransportEmissions,
            percentage: (publicTransportEmissions / totalEmissions) * 100,
          },
          {
            category: "Transportation",
            subcategory: "Flights",
            emissions: flightEmissions,
            percentage: (flightEmissions / totalEmissions) * 100,
          },
          {
            category: "Lifestyle",
            subcategory: "Diet",
            emissions: dietEmissions,
            percentage: (dietEmissions / totalEmissions) * 100,
          },
          {
            category: "Lifestyle",
            subcategory: "Shopping",
            emissions: shoppingEmissions,
            percentage: (shoppingEmissions / totalEmissions) * 100,
          },
          {
            category: "Lifestyle",
            subcategory: "Food Waste",
            emissions: foodWasteEmissions,
            percentage: (foodWasteEmissions / totalEmissions) * 100,
          },
        ]

        // Generate reduction potential actions
        const reductionPotential = [
          {
            action: "Switch to renewable energy",
            category: "Household",
            potentialSavings: electricityEmissions * 0.9,
            difficulty: "Medium",
            description: "Switch to a renewable energy provider or install solar panels.",
          },
          {
            action: "Improve home insulation",
            category: "Household",
            potentialSavings: naturalGasEmissions * 0.3,
            difficulty: "Medium",
            description: "Better insulation reduces heating and cooling needs.",
          },
          {
            action: "Install water-efficient fixtures",
            category: "Household",
            potentialSavings: waterEmissions * 0.4,
            difficulty: "Easy",
            description: "Low-flow showerheads and faucets reduce water consumption.",
          },
          {
            action: "Start composting",
            category: "Household",
            potentialSavings: wasteEmissions * 0.2,
            difficulty: "Easy",
            description: "Composting food waste reduces methane emissions from landfills.",
          },
          {
            action: data.transportation.carType !== "electric" ? "Switch to an electric vehicle" : "Reduce car usage",
            category: "Transportation",
            potentialSavings: data.transportation.carType !== "electric" ? carEmissions * 0.8 : carEmissions * 0.3,
            difficulty: data.transportation.carType !== "electric" ? "Hard" : "Medium",
            description:
              data.transportation.carType !== "electric"
                ? "Electric vehicles produce significantly fewer emissions."
                : "Use public transport, bike, or walk more often.",
          },
          {
            action: "Reduce air travel",
            category: "Transportation",
            potentialSavings: flightEmissions * 0.5,
            difficulty: "Medium",
            description: "Consider alternatives like trains or virtual meetings.",
          },
          {
            action:
              data.lifestyle.dietType === "high_meat" || data.lifestyle.dietType === "omnivore"
                ? "Reduce meat consumption"
                : "Optimize plant-based diet",
            category: "Lifestyle",
            potentialSavings:
              dietEmissions *
              (data.lifestyle.dietType === "high_meat" || data.lifestyle.dietType === "omnivore" ? 0.4 : 0.2),
            difficulty: "Medium",
            description:
              data.lifestyle.dietType === "high_meat" || data.lifestyle.dietType === "omnivore"
                ? "Even reducing meat consumption by a few days a week makes a big difference."
                : "Focus on local, seasonal produce to further reduce your footprint.",
          },
          {
            action: "Buy less, choose better",
            category: "Lifestyle",
            potentialSavings: shoppingEmissions * 0.5,
            difficulty: "Medium",
            description: "Focus on quality over quantity and consider second-hand items.",
          },
          {
            action: "Reduce food waste",
            category: "Lifestyle",
            potentialSavings: foodWasteEmissions * 0.7,
            difficulty: "Easy",
            description: "Plan meals, store food properly, and use leftovers creatively.",
          },
        ]

        // Sort reduction potential by savings (highest first)
        reductionPotential.sort((a, b) => b.potentialSavings - a.potentialSavings)

        // Generate monthly data for charts (simulated historical and target)
        const monthlyData = []
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        // Start with slightly higher emissions and gradually decrease to current
        let startingEmissions = totalEmissions * 1.2
        const targetEmissions = totalEmissions * 0.5 // 50% reduction target

        for (let i = 0; i < 12; i++) {
          // Simulate some random variation
          const randomFactor = 0.9 + Math.random() * 0.2
          const monthEmissions = i < 11 ? startingEmissions * (1 - i * 0.02) * randomFactor : totalEmissions // Last month is current

          monthlyData.push({
            month: months[i],
            emissions: monthEmissions,
            target: targetEmissions,
          })

          startingEmissions = monthEmissions
        }

        // Set results
        const result: CarbonResult = {
          totalEmissions,
          householdEmissions,
          transportationEmissions,
          lifestyleEmissions,
          breakdown,
          reductionPotential,
          comparisonToAverage: totalEmissions / 12, // Compared to average of 12 tons per year
          monthlyData,
        }

        setCarbonResult(result)

        // Show success toast
        toast({
          title: "Calculation complete",
          description: "Your carbon footprint analysis has been generated successfully.",
        })

        // Switch to results tab
        setActiveTab("results")
      } catch (error) {
        console.error("Calculation error:", error)
        toast({
          title: "Calculation error",
          description: "There was an error calculating your carbon footprint. Please try again.",
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
    setCarbonResult(null)
    setActiveTab("calculator")

    toast({
      title: "Form reset",
      description: "All values have been reset to defaults.",
    })
  }

  // Export results
  const handleExport = () => {
    if (!carbonResult) return

    // Create a downloadable JSON file
    const dataStr = JSON.stringify(
      {
        inputs: watchedValues,
        results: carbonResult,
      },
      null,
      2,
    )
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportName = `energysync-carbon-footprint-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportName)
    linkElement.click()

    toast({
      title: "Export successful",
      description: "Your carbon footprint analysis has been exported successfully.",
    })
  }

  // Add new flight
  const handleAddFlight = () => {
    append({ distance: 1000, frequency: 1 })
  }

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800">{label}</p>
          <div className="mt-2">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center mt-1">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                <span className="text-gray-600">{entry.name}: </span>
                <span className="ml-1 font-medium">{entry.value.toFixed(2)} tons CO₂e</span>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  // COLORS for charts
  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"]
  const CATEGORY_COLORS = {
    Household: "#10b981",
    Transportation: "#3b82f6",
    Lifestyle: "#f59e0b",
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
          <Badge className="mb-4">Carbon Tracking</Badge>
          <h1 className="text-4xl font-bold mb-4">Calculate Your Carbon Footprint</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understand your environmental impact and discover personalized strategies to reduce your carbon emissions.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="results" disabled={!carbonResult}>
              Results
            </TabsTrigger>
            <TabsTrigger value="reduction" disabled={!carbonResult}>
              Reduction Plan
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
                    <CardTitle>Carbon Footprint Calculator</CardTitle>
                  </div>
                  <CardDescription>Enter your lifestyle details to calculate your carbon footprint</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(calculateCarbonFootprint)} className="space-y-8">
                    {/* Household Section */}
                    <div>
                      <h3 className="text-lg font-medium flex items-center mb-4">
                        <Home className="h-5 w-5 mr-2 text-teal-600" />
                        Household Emissions
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="electricityUsage" className="flex items-center">
                              Monthly Electricity Usage (kWh)
                              <TooltipProvider>
                                <UITooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 ml-2 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="w-80">
                                      Check your electricity bill for monthly usage in kilowatt-hours (kWh).
                                    </p>
                                  </TooltipContent>
                                </UITooltip>
                              </TooltipProvider>
                            </Label>
                            <Input
                              id="electricityUsage"
                              type="number"
                              {...register("household.electricityUsage", {
                                required: "Electricity usage is required",
                                min: { value: 0, message: "Value must be positive" },
                              })}
                              className="mt-1"
                            />
                            {errors.household?.electricityUsage && (
                              <p className="text-red-500 text-sm mt-1">{errors.household.electricityUsage.message}</p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="electricityType" className="flex items-center">
                              Electricity Source
                              <TooltipProvider>
                                <UITooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 ml-2 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="w-80">
                                      The source of your electricity affects your carbon footprint.
                                    </p>
                                  </TooltipContent>
                                </UITooltip>
                              </TooltipProvider>
                            </Label>
                            <Select
                              value={watchedValues.household.electricityType}
                              onValueChange={(value) => setValue("household.electricityType", value)}
                            >
                              <SelectTrigger id="electricityType" className="mt-1">
                                <SelectValue placeholder="Select electricity source" />
                              </SelectTrigger>
                              <SelectContent>
                                {electricityTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="naturalGas" className="flex items-center">
                              Monthly Natural Gas Usage (therms)
                              <TooltipProvider>
                                <UITooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 ml-2 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="w-80">Check your gas bill for monthly usage in therms or CCF.</p>
                                  </TooltipContent>
                                </UITooltip>
                              </TooltipProvider>
                            </Label>
                            <Input
                              id="naturalGas"
                              type="number"
                              {...register("household.naturalGas", {
                                required: "Natural gas usage is required",
                                min: { value: 0, message: "Value must be positive" },
                              })}
                              className="mt-1"
                            />
                            {errors.household?.naturalGas && (
                              <p className="text-red-500 text-sm mt-1">{errors.household.naturalGas.message}</p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="waterUsage" className="flex items-center">
                              Monthly Water Usage (gallons)
                              <TooltipProvider>
                                <UITooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 ml-2 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="w-80">Check your water bill for monthly usage in gallons.</p>
                                  </TooltipContent>
                                </UITooltip>
                              </TooltipProvider>
                            </Label>
                            <Input
                              id="waterUsage"
                              type="number"
                              {...register("household.waterUsage", {
                                required: "Water usage is required",
                                min: { value: 0, message: "Value must be positive" },
                              })}
                              className="mt-1"
                            />
                            {errors.household?.waterUsage && (
                              <p className="text-red-500 text-sm mt-1">{errors.household.waterUsage.message}</p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="wasteGeneration" className="flex items-center">
                              Monthly Waste Generation (lbs)
                              <TooltipProvider>
                                <UITooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 ml-2 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="w-80">Estimate how many pounds of trash you generate each month.</p>
                                  </TooltipContent>
                                </UITooltip>
                              </TooltipProvider>
                            </Label>
                            <Input
                              id="wasteGeneration"
                              type="number"
                              {...register("household.wasteGeneration", {
                                required: "Waste generation is required",
                                min: { value: 0, message: "Value must be positive" },
                              })}
                              className="mt-1"
                            />
                            {errors.household?.wasteGeneration && (
                              <p className="text-red-500 text-sm mt-1">{errors.household.wasteGeneration.message}</p>
                            )}
                          </div>

                          <div className="flex space-x-6 pt-2">
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="recycling"
                                {...register("household.recycling")}
                                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                              />
                              <Label htmlFor="recycling" className="text-sm font-medium">
                                I recycle regularly
                              </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="composting"
                                {...register("household.composting")}
                                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                              />
                              <Label htmlFor="composting" className="text-sm font-medium">
                                I compost food waste
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Transportation Section */}
                    <div>
                      <h3 className="text-lg font-medium flex items-center mb-4">
                        <Car className="h-5 w-5 mr-2 text-blue-600" />
                        Transportation Emissions
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="carType" className="flex items-center">
                              Primary Vehicle Type
                              <TooltipProvider>
                                <UITooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 ml-2 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="w-80">The type of vehicle you use most frequently.</p>
                                  </TooltipContent>
                                </UITooltip>
                              </TooltipProvider>
                            </Label>
                            <Select
                              value={watchedValues.transportation.carType}
                              onValueChange={(value) => setValue("transportation.carType", value)}
                            >
                              <SelectTrigger id="carType" className="mt-1">
                                <SelectValue placeholder="Select vehicle type" />
                              </SelectTrigger>
                              <SelectContent>
                                {carTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="carMileage" className="flex items-center">
                              Annual Car Mileage
                              <TooltipProvider>
                                <UITooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 ml-2 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="w-80">Estimate how many miles you drive per year.</p>
                                  </TooltipContent>
                                </UITooltip>
                              </TooltipProvider>
                            </Label>
                            <Input
                              id="carMileage"
                              type="number"
                              {...register("transportation.carMileage", {
                                required: "Car mileage is required",
                                min: { value: 0, message: "Value must be positive" },
                              })}
                              className="mt-1"
                            />
                            {errors.transportation?.carMileage && (
                              <p className="text-red-500 text-sm mt-1">{errors.transportation.carMileage.message}</p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="publicTransport" className="flex items-center">
                              Annual Public Transport Miles
                              <TooltipProvider>
                                <UITooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 ml-2 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="w-80">
                                      Estimate how many miles you travel by bus, train, etc. per year.
                                    </p>
                                  </TooltipContent>
                                </UITooltip>
                              </TooltipProvider>
                            </Label>
                            <Input
                              id="publicTransport"
                              type="number"
                              {...register("transportation.publicTransport", {
                                required: "Public transport mileage is required",
                                min: { value: 0, message: "Value must be positive" },
                              })}
                              className="mt-1"
                            />
                            {errors.transportation?.publicTransport && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.transportation.publicTransport.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Label className="flex items-center">
                                Air Travel
                                <TooltipProvider>
                                  <UITooltip>
                                    <TooltipTrigger asChild>
                                      <Info className="h-4 w-4 ml-2 text-gray-400" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="w-80">
                                        Add your flights with approximate distances and frequency per year.
                                      </p>
                                    </TooltipContent>
                                  </UITooltip>
                                </TooltipProvider>
                              </Label>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleAddFlight}
                                className="flex items-center text-xs"
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Add Flight
                              </Button>
                            </div>

                            <div className="space-y-3">
                              {fields.map((field, index) => (
                                <div key={field.id} className="flex items-center space-x-2">
                                  <div className="flex-1">
                                    <Input
                                      type="number"
                                      placeholder="Distance (miles)"
                                      {...register(`transportation.flights.${index}.distance` as const, {
                                        required: "Required",
                                        min: { value: 0, message: "Must be positive" },
                                      })}
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <Input
                                      type="number"
                                      placeholder="Trips per year"
                                      {...register(`transportation.flights.${index}.frequency` as const, {
                                        required: "Required",
                                        min: { value: 0, message: "Must be positive" },
                                      })}
                                    />
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => remove(index)}
                                    className="text-gray-500 hover:text-red-500"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Lifestyle Section */}
                    <div>
                      <h3 className="text-lg font-medium flex items-center mb-4">
                        <Utensils className="h-5 w-5 mr-2 text-amber-600" />
                        Lifestyle Emissions
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="dietType" className="flex items-center">
                              Diet Type
                              <TooltipProvider>
                                <UITooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 ml-2 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="w-80">Your diet has a significant impact on your carbon footprint.</p>
                                  </TooltipContent>
                                </UITooltip>
                              </TooltipProvider>
                            </Label>
                            <Select
                              value={watchedValues.lifestyle.dietType}
                              onValueChange={(value) => setValue("lifestyle.dietType", value)}
                            >
                              <SelectTrigger id="dietType" className="mt-1">
                                <SelectValue placeholder="Select diet type" />
                              </SelectTrigger>
                              <SelectContent>
                                {dietTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="foodWaste" className="flex items-center">
                              Food Waste Percentage
                              <TooltipProvider>
                                <UITooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 ml-2 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="w-80">Estimate what percentage of your food is wasted.</p>
                                  </TooltipContent>
                                </UITooltip>
                              </TooltipProvider>
                            </Label>
                            <div className="flex items-center mt-1">
                              <Slider
                                id="foodWaste"
                                min={0}
                                max={50}
                                step={5}
                                value={[watchedValues.lifestyle.foodWaste]}
                                onValueChange={(value) => setValue("lifestyle.foodWaste", value[0])}
                                className="flex-1 mr-4"
                              />
                              <span className="w-12 text-right">{watchedValues.lifestyle.foodWaste}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="shoppingHabits" className="flex items-center">
                              Shopping Habits
                              <TooltipProvider>
                                <UITooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 ml-2 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="w-80">Your consumption patterns affect your carbon footprint.</p>
                                  </TooltipContent>
                                </UITooltip>
                              </TooltipProvider>
                            </Label>
                            <Select
                              value={watchedValues.lifestyle.shoppingHabits}
                              onValueChange={(value) => setValue("lifestyle.shoppingHabits", value)}
                            >
                              <SelectTrigger id="shoppingHabits" className="mt-1">
                                <SelectValue placeholder="Select shopping habits" />
                              </SelectTrigger>
                              <SelectContent>
                                {shoppingHabits.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
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
                                {/* Additional lifestyle options could go here */}
                                <div className="text-sm text-gray-500">
                                  Advanced options will be available in a future update.
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
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
                            Calculate Footprint
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
            {carbonResult && (
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
                      <CardTitle className="text-sm font-medium">Total Carbon Footprint</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-teal-600">
                        {carbonResult.totalEmissions.toFixed(2)} tons CO₂e
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Per year</p>
                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Compared to average</span>
                          <span>{(carbonResult.comparisonToAverage * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={carbonResult.comparisonToAverage * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Household Emissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-teal-600">
                        {carbonResult.householdEmissions.toFixed(2)} tons CO₂e
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {((carbonResult.householdEmissions / carbonResult.totalEmissions) * 100).toFixed(0)}% of total
                      </p>
                      <div className="mt-4">
                        <Progress
                          value={(carbonResult.householdEmissions / carbonResult.totalEmissions) * 100}
                          className="h-2 bg-gray-100"
                          indicatorClassName="bg-teal-600"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Transportation Emissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600">
                        {carbonResult.transportationEmissions.toFixed(2)} tons CO₂e
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {((carbonResult.transportationEmissions / carbonResult.totalEmissions) * 100).toFixed(0)}% of
                        total
                      </p>
                      <div className="mt-4">
                        <Progress
                          value={(carbonResult.transportationEmissions / carbonResult.totalEmissions) * 100}
                          className="h-2 bg-gray-100"
                          indicatorClassName="bg-blue-600"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Lifestyle Emissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-amber-600">
                        {carbonResult.lifestyleEmissions.toFixed(2)} tons CO₂e
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {((carbonResult.lifestyleEmissions / carbonResult.totalEmissions) * 100).toFixed(0)}% of total
                      </p>
                      <div className="mt-4">
                        <Progress
                          value={(carbonResult.lifestyleEmissions / carbonResult.totalEmissions) * 100}
                          className="h-2 bg-gray-100"
                          indicatorClassName="bg-amber-600"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-none shadow-lg">
                    <CardHeader>
                      <CardTitle>Emissions Breakdown</CardTitle>
                      <CardDescription>Detailed breakdown of your carbon footprint by category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={carbonResult.breakdown}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={150}
                              fill="#8884d8"
                              dataKey="emissions"
                              nameKey="subcategory"
                              label={({ subcategory, percentage }) => `${subcategory}: ${percentage.toFixed(1)}%`}
                            >
                              {carbonResult.breakdown.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={CATEGORY_COLORS[entry.category] || COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-lg">
                    <CardHeader>
                      <CardTitle>Emissions Over Time</CardTitle>
                      <CardDescription>Your carbon footprint trend and reduction target</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={carbonResult.monthlyData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" />
                            <YAxis label={{ value: "CO₂e (tons)", angle: -90, position: "insideLeft" }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Area
                              type="monotone"
                              dataKey="emissions"
                              name="Your Emissions"
                              stroke="#3b82f6"
                              fill="#3b82f6"
                              fillOpacity={0.3}
                            />
                            <Area
                              type="monotone"
                              dataKey="target"
                              name="Reduction Target"
                              stroke="#10b981"
                              fill="#10b981"
                              fillOpacity={0.3}
                              strokeDasharray="5 5"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Detailed Breakdown</CardTitle>
                    <CardDescription>Breakdown of your carbon footprint by source</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="px-4 py-3 text-left font-medium text-gray-600">Category</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-600">Source</th>
                            <th className="px-4 py-3 text-right font-medium text-gray-600">Emissions (tons CO₂e)</th>
                            <th className="px-4 py-3 text-right font-medium text-gray-600">Percentage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {carbonResult.breakdown.map((item, index) => (
                            <tr key={index} className="border-b">
                              <td className="px-4 py-3">
                                <div className="flex items-center">
                                  <div
                                    className="w-3 h-3 rounded-full mr-2"
                                    style={{
                                      backgroundColor: CATEGORY_COLORS[item.category] || COLORS[index % COLORS.length],
                                    }}
                                  ></div>
                                  {item.category}
                                </div>
                              </td>
                              <td className="px-4 py-3">{item.subcategory}</td>
                              <td className="px-4 py-3 text-right font-medium">{item.emissions.toFixed(2)}</td>
                              <td className="px-4 py-3 text-right font-medium">{item.percentage.toFixed(1)}%</td>
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
                  <Button variant="outline" onClick={() => setActiveTab("reduction")}>
                    View Reduction Plan
                  </Button>
                  <Button onClick={handleExport} className="bg-teal-600 hover:bg-teal-700">
                    <Download className="mr-2 h-4 w-4" />
                    Export Results
                  </Button>
                </div>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="reduction">
            {carbonResult && (
              <motion.div
                ref={reductionsRef}
                initial={{ opacity: 0 }}
                animate={reductionsInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <div className="flex items-center">
                      <Leaf className="h-6 w-6 mr-2 text-green-600" />
                      <CardTitle>Your Carbon Reduction Plan</CardTitle>
                    </div>
                    <CardDescription>Personalized recommendations to reduce your carbon footprint</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {carbonResult.reductionPotential.slice(0, 5).map((action, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-lg border border-gray-100 hover:border-green-100 hover:bg-green-50/30 transition-colors"
                        >
                          <div className="flex items-start">
                            <div
                              className={`p-2 rounded-full mr-4 ${
                                action.category === "Household"
                                  ? "bg-teal-100 text-teal-600"
                                  : action.category === "Transportation"
                                    ? "bg-blue-100 text-blue-600"
                                    : "bg-amber-100 text-amber-600"
                              }`}
                            >
                              {action.category === "Household" ? (
                                <Home className="h-5 w-5" />
                              ) : action.category === "Transportation" ? (
                                <Car className="h-5 w-5" />
                              ) : (
                                <Utensils className="h-5 w-5" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-medium mb-1">{action.action}</h4>
                              <p className="text-gray-600 mb-3">{action.description}</p>
                              <div className="flex flex-wrap items-center gap-3">
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                                  {action.potentialSavings.toFixed(2)} tons CO₂e savings
                                </Badge>
                                <Badge
                                  className={`
                                  ${
                                    action.difficulty === "Easy"
                                      ? "bg-teal-100 text-teal-800 hover:bg-teal-200"
                                      : action.difficulty === "Medium"
                                        ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                        : "bg-red-100 text-red-800 hover:bg-red-200"
                                  }
                                `}
                                >
                                  {action.difficulty} difficulty
                                </Badge>
                                <span className="text-sm text-gray-500">
                                  {((action.potentialSavings / carbonResult.totalEmissions) * 100).toFixed(1)}%
                                  reduction
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-none shadow-lg">
                    <CardHeader>
                      <CardTitle>Potential Impact</CardTitle>
                      <CardDescription>Visualize your potential carbon footprint reduction</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { name: "Current", value: carbonResult.totalEmissions },
                              {
                                name: "Potential",
                                value:
                                  carbonResult.totalEmissions -
                                  carbonResult.reductionPotential.reduce(
                                    (sum, action) => sum + action.potentialSavings,
                                    0,
                                  ),
                              },
                              { name: "Target", value: carbonResult.totalEmissions * 0.5 },
                            ]}
                            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" />
                            <YAxis label={{ value: "CO₂e (tons)", angle: -90, position: "insideLeft" }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" name="Carbon Footprint" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-lg">
                    <CardHeader>
                      <CardTitle>Reduction by Category</CardTitle>
                      <CardDescription>Potential carbon savings by category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart
                            outerRadius={150}
                            data={[
                              {
                                category: "Household",
                                current: carbonResult.householdEmissions,
                                potential:
                                  carbonResult.householdEmissions -
                                  carbonResult.reductionPotential
                                    .filter((action) => action.category === "Household")
                                    .reduce((sum, action) => sum + action.potentialSavings, 0),
                              },
                              {
                                category: "Transportation",
                                current: carbonResult.transportationEmissions,
                                potential:
                                  carbonResult.transportationEmissions -
                                  carbonResult.reductionPotential
                                    .filter((action) => action.category === "Transportation")
                                    .reduce((sum, action) => sum + action.potentialSavings, 0),
                              },
                              {
                                category: "Lifestyle",
                                current: carbonResult.lifestyleEmissions,
                                potential:
                                  carbonResult.lifestyleEmissions -
                                  carbonResult.reductionPotential
                                    .filter((action) => action.category === "Lifestyle")
                                    .reduce((sum, action) => sum + action.potentialSavings, 0),
                              },
                            ]}
                          >
                            <PolarGrid />
                            <PolarAngleAxis dataKey="category" />
                            <PolarRadiusAxis angle={30} domain={[0, "auto"]} />
                            <Radar
                              name="Current Emissions"
                              dataKey="current"
                              stroke="#ef4444"
                              fill="#ef4444"
                              fillOpacity={0.5}
                            />
                            <Radar
                              name="Potential Emissions"
                              dataKey="potential"
                              stroke="#10b981"
                              fill="#10b981"
                              fillOpacity={0.5}
                            />
                            <Legend />
                            <Tooltip />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Additional Reduction Strategies</CardTitle>
                    <CardDescription>More ways to reduce your carbon footprint</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Household Strategies</AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Install programmable thermostats to optimize heating and cooling.</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Replace incandescent bulbs with LED lighting throughout your home.</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Unplug electronics when not in use to eliminate phantom energy usage.</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Install low-flow showerheads and faucet aerators to reduce water usage.</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Wash clothes in cold water and hang dry when possible.</span>
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Transportation Strategies</AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Combine errands to reduce the number of trips you take.</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Consider carpooling or using public transportation for your commute.</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Keep your vehicle properly maintained for optimal fuel efficiency.</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Consider video conferencing instead of traveling for meetings.</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Bike or walk for short trips when possible.</span>
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>Lifestyle Strategies</AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Eat locally grown, seasonal foods to reduce transportation emissions.</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Reduce food waste by planning meals and properly storing leftovers.</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>
                                Choose products with minimal packaging or packaging made from recycled materials.
                              </span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Repair items instead of replacing them when possible.</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Consider the environmental impact when making purchasing decisions.</span>
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
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
                    Export Plan
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
              <AccordionTrigger>How is my carbon footprint calculated?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  Your carbon footprint is calculated using emission factors for different activities. For example,
                  electricity usage is converted to carbon emissions based on your electricity source, and
                  transportation emissions are calculated based on vehicle type and mileage. We use internationally
                  recognized methodologies and emission factors from sources like the EPA and IPCC.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What is a "good" carbon footprint?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  The global average carbon footprint is about 4 tons CO₂e per person annually, while in the United
                  States, it's closer to 16 tons per person. To avoid the worst effects of climate change, the average
                  global carbon footprint needs to drop to under 2 tons by 2050. Any reduction in your carbon footprint
                  is beneficial, and even small changes can make a significant difference when adopted by many people.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How accurate is this calculator?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  This calculator provides an estimate of your carbon footprint based on the information you provide.
                  While we use standard emission factors and methodologies, the actual environmental impact may vary
                  based on specific circumstances not captured in the calculator. For a more precise analysis, consider
                  working with a sustainability consultant or using more detailed tracking tools.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What are carbon offsets?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  Carbon offsets are investments in projects that reduce greenhouse gas emissions to compensate for
                  emissions produced elsewhere. These projects might include renewable energy, reforestation, or methane
                  capture. While reducing your direct emissions should be the priority, carbon offsets can help mitigate
                  the impact of emissions that are difficult to eliminate completely.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </div>
  )
}

