"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  href?: string
  variant?: "primary" | "secondary" | "outline" | "ghost" | "demo"
  size?: "default" | "sm" | "lg"
  icon?: React.ReactNode
  className?: string
}

export function AnimatedButton({
  children,
  className,
  href,
  variant = "primary",
  size = "default",
  icon,
  ...props
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const buttonVariants = {
    primary: "bg-teal-600 text-white hover:bg-teal-700",
    secondary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "bg-transparent border border-teal-600 text-teal-600 hover:bg-teal-50",
    ghost: "bg-transparent text-teal-600 hover:bg-teal-50",
    demo: "bg-gradient-to-r from-teal-500 to-green-500 text-white shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-green-600",
  }

  const buttonSizes = {
    default: "px-4 py-2 text-sm",
    sm: "px-3 py-1 text-xs",
    lg: "px-6 py-3 text-base",
  }

  const buttonClasses = cn(
    "rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2",
    buttonVariants[variant],
    buttonSizes[size],
    className,
  )

  const content = (
    <motion.div
      className="flex items-center justify-center"
      initial={{ scale: 1 }}
      animate={{ scale: isHovered ? 1.05 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <span>{children}</span>
      {icon || (variant === "primary" && <ArrowRight className="ml-2 h-4 w-4" />)}
      <motion.div
        className="absolute inset-0 rounded-md bg-white opacity-0"
        animate={{ opacity: isHovered ? 0.2 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={buttonClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      className={buttonClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {content}
    </button>
  )
}

