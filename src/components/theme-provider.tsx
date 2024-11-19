"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { cn } from "@/lib/utils"

interface Props extends ThemeProviderProps {
  className?: string
}

export function ThemeProvider({ 
  children,
  className,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = true,
  ...props
}: Props) {
  const [mounted, setMounted] = React.useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Prevent theme flash by not rendering until mounted
    return null
  }

  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      {...props}
    >
      <div 
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          "transition-colors duration-300",
          "selection:bg-primary selection:text-primary-foreground",
          className
        )}
      >
        {children}
      </div>
    </NextThemesProvider>
  )
}

// For backwards compatibility and easier imports
export default ThemeProvider