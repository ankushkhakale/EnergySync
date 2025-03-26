"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X, Zap, BarChart3, LineChart, Users, FileText, LogOut, User, Settings } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AnimatedButton } from "@/components/animated-button"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Initialize auth state
  const auth = useAuth()
  let user = null
  let isAuthenticated = false
  let logout = () => {}

  if (auth) {
    user = auth.user
    isAuthenticated = auth.isAuthenticated
    logout = auth.logout
  }

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("scroll", handleResize)
    }
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const isHomePage = pathname === "/"
  const isDashboardPage = pathname?.startsWith("/dashboard")

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled || !isHomePage || isDashboardPage ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
  }`

  const logoTextClasses = `font-bold text-xl ${
    isScrolled || isMobileMenuOpen || !isHomePage || isDashboardPage ? "text-teal-600" : "text-white"
  }`

  const navLinkClasses = `relative font-medium text-sm transition-colors duration-200 ${
    isScrolled || !isHomePage || isDashboardPage
      ? "text-gray-700 hover:text-teal-600"
      : "text-white/90 hover:text-white"
  }`

  const mobileNavLinkClasses = "font-medium text-lg text-gray-800 hover:text-teal-600 transition-colors"

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname?.startsWith(path)
  }

  const navItems = [
    {
      name: "Products",
      href: "/products",
      hasDropdown: true,
      dropdownItems: [
        { name: "Energy Analytics", href: "/products/energy-analytics", icon: <BarChart3 className="h-4 w-4 mr-2" /> },
        { name: "Carbon Tracking", href: "/products/carbon-tracking", icon: <LineChart className="h-4 w-4 mr-2" /> },
        {
          name: "Investment Optimizer",
          href: "/products/investment-optimizer",
          icon: <Zap className="h-4 w-4 mr-2" />,
        },
      ],
    },
    {
      name: "Solutions",
      href: "/solutions",
      hasDropdown: true,
      dropdownItems: [
        { name: "For Businesses", href: "/solutions/businesses", icon: <Users className="h-4 w-4 mr-2" /> },
        { name: "For Communities", href: "/solutions/communities", icon: <Users className="h-4 w-4 mr-2" /> },
        { name: "For Utilities", href: "/solutions/utilities", icon: <Zap className="h-4 w-4 mr-2" /> },
      ],
    },
    { name: "Pricing", href: "/pricing", hasDropdown: false },
    {
      name: "Resources",
      href: "/resources",
      hasDropdown: true,
      dropdownItems: [
        { name: "Blog", href: "/resources/blog", icon: <FileText className="h-4 w-4 mr-2" /> },
        { name: "Case Studies", href: "/resources/case-studies", icon: <FileText className="h-4 w-4 mr-2" /> },
        { name: "Documentation", href: "/resources/documentation", icon: <FileText className="h-4 w-4 mr-2" /> },
      ],
    },
    { name: "Contact", href: "/contact", hasDropdown: false },
  ]

  return (
    <>
      <nav className={navbarClasses}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div
                className={`p-1.5 rounded-md ${isScrolled || !isHomePage || isDashboardPage ? "bg-teal-600" : "bg-white"}`}
              >
                <Zap
                  className={`h-5 w-5 ${isScrolled || !isHomePage || isDashboardPage ? "text-white" : "text-teal-600"}`}
                />
              </div>
              <span className={logoTextClasses}>EnergySync</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  {item.hasDropdown ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className={`${navLinkClasses} flex items-center ${isActive(item.href) ? "text-teal-600 font-semibold" : ""}`}
                        >
                          {item.name}
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center" className="w-48 mt-1">
                        {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                          <DropdownMenuItem key={dropdownIndex} className="cursor-pointer">
                            <Link href={dropdownItem.href} className="flex items-center w-full">
                              {dropdownItem.icon}
                              {dropdownItem.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      href={item.href}
                      className={`${navLinkClasses} ${isActive(item.href) ? "text-teal-600 font-semibold" : ""}`}
                    >
                      {item.name}
                      <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className={isScrolled || !isHomePage || isDashboardPage ? "text-gray-700" : "text-white"}>
                        {user?.name}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>
                      <Link href="/dashboard" className="flex items-center w-full">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/profile" className="flex items-center w-full">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/settings" className="flex items-center w-full">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <AnimatedButton
                    href="/login"
                    variant="ghost"
                    className={
                      isScrolled || !isHomePage || isDashboardPage
                        ? "text-gray-700 hover:text-teal-600"
                        : "text-white hover:text-white/80"
                    }
                  >
                    Log in
                  </AnimatedButton>
                  <AnimatedButton href="/demo-request" variant="demo" className="hover:scale-105 transition-transform">
                    Book a Demo
                  </AnimatedButton>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X
                  className={
                    isScrolled || !isHomePage || isDashboardPage ? "h-6 w-6 text-gray-800" : "h-6 w-6 text-white"
                  }
                />
              ) : (
                <Menu
                  className={
                    isScrolled || !isHomePage || isDashboardPage ? "h-6 w-6 text-gray-800" : "h-6 w-6 text-white"
                  }
                />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-20 px-4 overflow-y-auto"
          >
            <div className="container mx-auto py-8">
              <div className="flex flex-col space-y-6">
                {navItems.map((item, index) => (
                  <div key={index} className="py-2 border-b border-gray-100">
                    {item.hasDropdown ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Link href={item.href} className={mobileNavLinkClasses}>
                            {item.name}
                          </Link>
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="pl-4 space-y-3">
                          {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                            <Link
                              key={dropdownIndex}
                              href={dropdownItem.href}
                              className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {dropdownItem.icon}
                              <span>{dropdownItem.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={mobileNavLinkClasses}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-4 space-y-4">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user?.avatar} alt={user?.name} />
                          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user?.name}</p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                      <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-center">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Dashboard
                        </Button>
                      </Link>
                      <Button
                        className="w-full justify-center bg-teal-600 hover:bg-teal-700"
                        onClick={() => {
                          logout()
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <AnimatedButton
                        href="/login"
                        variant="outline"
                        className="w-full justify-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Log in
                      </AnimatedButton>
                      <AnimatedButton
                        href="/demo-request"
                        variant="demo"
                        className="w-full justify-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Book a Demo
                      </AnimatedButton>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

