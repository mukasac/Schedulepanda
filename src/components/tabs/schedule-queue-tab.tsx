"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CreatePostTab } from "./create-post-tab"
import { useScheduler } from "@/contexts/scheduler-context"
import { formatDate } from "@/lib/utils"
import { Clock, Plus } from "lucide-react"
import { Post } from "@/types/types"

interface ScheduleQueueProps {
  initialDate?: Date;
  initialTime?: string;
  onScheduled?: () => void;
}

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0')
  return `${hour}:00`
})

export function ScheduleQueueTab({ initialDate, initialTime, onScheduled }: ScheduleQueueProps) {
  const { posts } = useScheduler()
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(initialDate)
  const [selectedTime, setSelectedTime] = React.useState<string | undefined>(initialTime)
  const [showCreatePost, setShowCreatePost] = React.useState(false)

  const postsForDate = React.useMemo(() => {
    if (!selectedDate) return {}
    const dateStr = selectedDate.toISOString().split('T')[0]
    return posts.reduce((acc: Record<string, Post[]>, post: Post) => {
      if (post.scheduledDate) {
        const postDate = new Date(post.scheduledDate).toISOString().split('T')[0]
        if (postDate === dateStr) {
          const time = new Date(post.scheduledDate).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
          })
          if (!acc[time]) acc[time] = []
          acc[time].push(post)
        }
      }
      return acc
    }, {})
  }, [selectedDate, posts])

  const handleClose = () => {
    setShowCreatePost(false)
    onScheduled?.()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="md:col-span-1">
        <CardContent className="p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardContent className="p-4">
          {selectedDate ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Schedule for {formatDate(selectedDate)}
              </h3>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-2">
                  {timeSlots.map((time) => (
                    <div
                      key={time}
                      className="flex items-start gap-4 p-2 rounded hover:bg-slate-50"
                    >
                      <div className="w-16 font-medium">
                        <Clock className="w-4 h-4 inline-block mr-1" />
                        {time}
                      </div>
                      <div className="flex-1 space-y-2">
                        {postsForDate[time]?.map((post: Post, i: number) => (
                          <div
                            key={i}
                            className="p-2 rounded border bg-white shadow-sm"
                          >
                            <p className="text-sm">{post.content}</p>
                            <div className="mt-1 flex gap-1">
                              <span
                                className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800"
                              >
                                {post.platform}
                              </span>
                            </div>
                          </div>
                        ))}
                        <Dialog open={showCreatePost && selectedTime === time} 
                               onOpenChange={handleClose}>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start text-muted-foreground"
                              onClick={() => {
                                setSelectedTime(time)
                                setShowCreatePost(true)
                              }}
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Add post
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <CreatePostTab 
                              defaultDate={selectedDate}
                              defaultTime={time}
                              onComplete={handleClose}
                            />
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Select a date to view and schedule posts
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}