// src/components/ui/placeholder-image.tsx
import React from 'react'

interface PlaceholderImageProps {
  width: number
  height: number
  className?: string
}

export function PlaceholderImage({ width, height, className = '' }: PlaceholderImageProps) {
  return (
    <div 
      className={`bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <span className="text-gray-400 dark:text-gray-500 text-sm">
        {width} x {height}
      </span>
    </div>
  )
}