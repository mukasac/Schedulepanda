'use client'

import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DateTimePickerProps {
  value: Date | null
  onChange: (date: Date | null) => void
  timezone: string
}

export const DateTimePicker = ({ 
  value, 
  onChange,
  timezone 
}: DateTimePickerProps) => {
  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal w-full",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP HH:mm") : <span>Pick date and time</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div>
            <Calendar
              mode="single" 
              disabled={(date) => date < new Date()}
              selected={value}
              onSelect={onChange}
              className="rounded-md border"
            />
          </div>
          <div className="p-3 border-t">
            <input
              type="time"
              className="w-full border rounded p-1"
              value={value ? format(value, "HH:mm") : ""}
              onChange={(e) => {
                const newDate = value ? new Date(value) : new Date()
                const [hours, minutes] = e.target.value.split(':')
                newDate.setHours(parseInt(hours))
                newDate.setMinutes(parseInt(minutes))
                onChange(newDate)
              }}
            />
            <div className="text-sm text-muted-foreground mt-2">
              Timezone: {timezone}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}