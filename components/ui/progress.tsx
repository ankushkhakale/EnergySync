// Add a custom Progress component to avoid context provider conflicts

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  indicatorClassName?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, indicatorClassName, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={cn("relative h-2 w-full overflow-hidden rounded-full bg-gray-200", className)}
        {...props}
      >
        <div
          className={cn("h-full w-full flex-1 bg-blue-600 transition-all", indicatorClassName)}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    )
  },
)
Progress.displayName = "Progress"

export { Progress }

