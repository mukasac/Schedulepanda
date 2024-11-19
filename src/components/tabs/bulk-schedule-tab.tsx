"use client"

import * as React from "react"
import { useScheduler } from "@/contexts/scheduler-context"
import { PLATFORM_INFO } from "@/lib/constants"
import { 
  Card,
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CalendarIcon, Sparkles, Clock, Hash } from "lucide-react"
import { cn, formatDate } from "@/lib/utils"
import { PlatformInfo } from "@/types/types"

interface PlatformSwitchProps {
  platform: string
  info: PlatformInfo
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

const PlatformSwitch = ({ platform, info, checked, onCheckedChange }: PlatformSwitchProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center space-x-2">
          <Switch
            id={`platform-${platform}`}
            checked={checked}
            onCheckedChange={onCheckedChange}
          />
          <Label htmlFor={`platform-${platform}`} className="flex items-center gap-2">
            <info.icon className="w-4 h-4" />
            <span className="capitalize">{platform}</span>
          </Label>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Best times: {info.bestTimes.join(", ")}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

const timeSlots = [
  "12:00 AM", "6:00 AM", "9:00 AM", "12:00 PM",
  "3:00 PM", "6:00 PM", "9:00 PM"
]

export function BulkScheduleTab() {
  const { bulkSchedule, setBulkSchedule, handleBulkSchedule } = useScheduler()
  const [posts, setPosts] = React.useState<string[]>([''])
  const [selectedTimes, setSelectedTimes] = React.useState<string[]>([])
  const [hashtags, setHashtags] = React.useState<string>('')
  const [frequency, setFrequency] = React.useState<'daily' | 'custom'>('daily')

  const addPost = () => setPosts([...posts, ''])
  const removePost = (index: number) => {
    const newPosts = posts.filter((_, i) => i !== index)
    setPosts(newPosts)
  }

  const updatePost = (index: number, value: string) => {
    const newPosts = [...posts]
    newPosts[index] = value
    setPosts(newPosts)
  }

  const handleScheduleCreate = () => {
    const schedule = {
      ...bulkSchedule,
      posts,
      times: selectedTimes,
      hashtags: hashtags.split(' ').filter(Boolean),
      frequency
    }
    handleBulkSchedule(schedule)
  }

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg">
        <CardTitle>Bulk Schedule</CardTitle>
        <CardDescription className="text-green-100">
          Create multiple posts across platforms
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="startDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !bulkSchedule.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {bulkSchedule.startDate ? formatDate(bulkSchedule.startDate) : <span>Pick a start date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={bulkSchedule.startDate ? new Date(bulkSchedule.startDate) : undefined}
                  onSelect={(date) => setBulkSchedule({
                    ...bulkSchedule,
                    startDate: date ? date.toISOString().split('T')[0] : ""
                  })}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="endDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !bulkSchedule.endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {bulkSchedule.endDate ? formatDate(bulkSchedule.endDate) : <span>Pick an end date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={bulkSchedule.endDate ? new Date(bulkSchedule.endDate) : undefined}
                  onSelect={(date) => setBulkSchedule({
                    ...bulkSchedule,
                    endDate: date ? date.toISOString().split('T')[0] : ""
                  })}
                  initialFocus
                  disabled={(date) => 
                    date < new Date() || 
                    (bulkSchedule.startDate && date < new Date(bulkSchedule.startDate))
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Platforms</Label>
          <div className="flex flex-wrap gap-4">
            {Object.entries(PLATFORM_INFO).map(([platform, info]) => (
              <PlatformSwitch
                key={platform}
                platform={platform}
                info={info}
                checked={bulkSchedule.platforms.includes(platform)}
                onCheckedChange={(checked) => {
                  const platforms = checked
                    ? [...bulkSchedule.platforms, platform]
                    : bulkSchedule.platforms.filter(p => p !== platform)
                  setBulkSchedule({ ...bulkSchedule, platforms })
                }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Posting Schedule</Label>
          <Select value={frequency} onValueChange={(value: 'daily' | 'custom') => setFrequency(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="custom">Custom Times</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Posting Times
          </Label>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTimes.includes(time) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedTimes(
                    selectedTimes.includes(time)
                      ? selectedTimes.filter(t => t !== time)
                      : [...selectedTimes, time]
                  )
                }}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label>Posts Content</Label>
          {posts.map((post, index) => (
            <div key={index} className="flex gap-2">
              <Textarea
                value={post}
                onChange={(e) => updatePost(index, e.target.value)}
                placeholder={`Post ${index + 1}`}
                className="min-h-[100px]"
              />
              {posts.length > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removePost(index)}
                  className="shrink-0"
                >
                  ×
                </Button>
              )}
            </div>
          ))}
          <Button onClick={addPost} variant="outline" className="w-full">
            Add Another Post
          </Button>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Hash className="w-4 h-4" />
            Hashtags
          </Label>
          <Input
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            placeholder="Add hashtags (space separated)"
          />
        </div>

        <Button
          onClick={handleScheduleCreate}
          className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
          disabled={
            !bulkSchedule.startDate ||
            !bulkSchedule.endDate ||
            !bulkSchedule.platforms.length ||
            !selectedTimes.length ||
            !posts.some(post => post.trim())
          }
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Create Bulk Schedule
        </Button>
      </CardContent>
    </Card>
  )
}