"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, type Variants } from "framer-motion"

interface SplitTextProps {
  children: string
  className?: string
}

export function SplitText({ children, className = "" }: SplitTextProps) {
  const text = children.split(" ")
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  }

  useEffect(() => {
    controls.start("visible")
  }, [controls])

  return (
    <div ref={ref} className={className} aria-label={children}>
      {text.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em] last:mr-0"
          custom={i}
          variants={wordVariants}
          initial="hidden"
          animate={controls}
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

