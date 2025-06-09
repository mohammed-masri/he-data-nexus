

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  const progressValue = value || 0;
  
  // Determine color based on progress percentage
  const getProgressColor = (progress: number) => {
    if (progress < 30) {
      return "bg-gradient-to-r from-red-500 to-red-600";
    } else if (progress < 70) {
      return "bg-gradient-to-r from-orange-500 to-yellow-500";
    } else {
      return "bg-gradient-to-r from-green-500 to-green-600";
    }
  };

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full bg-gray-200",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all duration-300 ease-in-out rounded-full",
          getProgressColor(progressValue)
        )}
        style={{ transform: `translateX(-${100 - progressValue}%)` }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

