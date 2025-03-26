"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

type User = {
  id: string
  name: string
  email: string
  role: string
  company?: string
  avatar?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Protect routes that require authentication
  useEffect(() => {
    const protectedRoutes = ["/dashboard", "/settings", "/profile"]

    const isProtectedRoute = protectedRoutes.some((route) => pathname?.startsWith(route))

    if (isProtectedRoute && !isLoading && !user) {
      toast({
        title: "Authentication required",
        description: "Please log in to access this page",
        variant: "destructive",
      })
      router.push("/login?redirect=" + encodeURIComponent(pathname || "/dashboard"))
    }
  }, [pathname, user, isLoading, router, toast])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication - in a real app, this would be an API call
      if (email === "demo@energysync.com" && password === "password") {
        const userData: User = {
          id: "user-1",
          name: "Demo User",
          email: "demo@energysync.com",
          role: "admin",
          company: "Acme Inc",
          avatar: "/placeholder.svg?height=40&width=40",
        }

        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))

        toast({
          title: "Login successful",
          description: "Welcome back to EnergySync!",
        })

        return true
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Try demo@energysync.com / password",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred during login",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock signup - in a real app, this would be an API call
      const userData: User = {
        id: "user-" + Date.now(),
        name,
        email,
        role: "user",
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))

      toast({
        title: "Account created",
        description: "Welcome to EnergySync!",
      })

      return true
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "An error occurred during signup",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

