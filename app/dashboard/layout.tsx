"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { BarChart3, Settings, Users, Bell, FileText, Home, Zap, ChevronRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const sidebarLinks = [
    { name: "Dashboard", href: "/dashboard", icon: <Home className="h-4 w-4" /> },
    { name: "Analytics", href: "/dashboard/analytics", icon: <BarChart3 className="h-4 w-4" /> },
    { name: "Energy Sources", href: "/dashboard/energy-sources", icon: <Zap className="h-4 w-4" /> },
    { name: "Reports", href: "/dashboard/reports", icon: <FileText className="h-4 w-4" /> },
    { name: "Team", href: "/dashboard/team", icon: <Users className="h-4 w-4" /> },
    { name: "Notifications", href: "/dashboard/notifications", icon: <Bell className="h-4 w-4" /> },
    { name: "Settings", href: "/settings", icon: <Settings className="h-4 w-4" /> },
  ]

  const isActive = (path) => pathname === path

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex">
          <SidebarHeader className="flex flex-col items-center justify-center py-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-1.5 rounded-md bg-teal-600">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">EnergySync</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {sidebarLinks.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton asChild isActive={isActive(link.href)}>
                    <Link href={link.href} className="flex items-center">
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={logout} className="text-gray-500 hover:text-gray-700">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Mobile Sidebar */}
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          style={{ opacity: isMobileSidebarOpen ? 1 : 0, pointerEvents: isMobileSidebarOpen ? "auto" : "none" }}
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: isMobileSidebarOpen ? 0 : -300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-md bg-teal-600">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold text-xl">EnergySync</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileSidebarOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <nav className="space-y-1">
                  {sidebarLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive(link.href) ? "bg-teal-50 text-teal-600" : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsMobileSidebarOpen(false)}
                    >
                      <span className="mr-3">{link.icon}</span>
                      {link.name}
                      {isActive(link.href) && <ChevronRight className="ml-auto h-4 w-4" />}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="p-4 border-t">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={logout} className="text-gray-500 hover:text-gray-700">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <header className="md:hidden sticky top-0 z-10 bg-white border-b shadow-sm">
            <div className="flex items-center justify-between p-4">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <Link href="/" className="flex items-center space-x-2">
                <div className="p-1.5 rounded-md bg-teal-600">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl">EnergySync</span>
              </Link>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

