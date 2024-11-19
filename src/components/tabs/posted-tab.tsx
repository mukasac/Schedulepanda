"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useScheduler } from "@/contexts/scheduler-context"
import { formatDate } from "@/lib/utils"
import { Post } from "@/types/types"
import { PostAnalyticsView } from "@/components/post-analytics-view"
import { 
  Clock, 
  Share2, 
  ThumbsUp, 
  Eye, 
  Calendar as CalendarIcon,
  Filter,
  ArrowUp,
  ArrowDown
} from "lucide-react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function PostedTab() {
  const { posts } = useScheduler()
  const [selectedDate, setSelectedDate] = React.useState<Date>()
  const [selectedPlatform, setSelectedPlatform] = React.useState<string>("all")
  const [sortBy, setSortBy] = React.useState<"recent" | "engagement" | "views">("recent")

  const filteredPosts = React.useMemo(() => {
    let filtered = posts.filter(post => post.status === 'published')

    if (selectedDate) {
      filtered = filtered.filter(post => {
        const postDate = new Date(post.scheduledDate!).toDateString()
        return postDate === selectedDate.toDateString()
      })
    }

    if (selectedPlatform !== "all") {
      filtered = filtered.filter(post => post.platform === selectedPlatform)
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "engagement":
          return (b.analytics?.engagement || 0) - (a.analytics?.engagement || 0)
        case "views":
          return (b.analytics?.views || 0) - (a.analytics?.views || 0)
        default:
          return new Date(b.scheduledDate!).getTime() - new Date(a.scheduledDate!).getTime()
      }
    })
  }, [posts, selectedDate, selectedPlatform, sortBy])

  const stats = React.useMemo(() => {
    return filteredPosts.reduce((acc, post) => ({
      totalViews: acc.totalViews + (post.analytics?.views || 0),
      totalEngagement: acc.totalEngagement + (post.analytics?.engagement || 0),
      totalShares: acc.totalShares + (post.analytics?.shares || 0),
    }), {
      totalViews: 0,
      totalEngagement: 0,
      totalShares: 0,
    })
  }, [filteredPosts])

  const renderPostCard = (post: Post) => (
    <Card key={post.id} className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className="capitalize font-semibold"
            >
              {post.platform}
            </Badge>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Clock className="w-4 h-4" />
                  {formatDate(post.scheduledDate!)}
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Post Details</p>
                  <div className="text-sm text-muted-foreground">
                    Published on {new Date(post.scheduledDate!).toLocaleString()}
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <PostAnalyticsView post={post} />
        </div>
        
        <div className="space-y-4">
          <p className="text-sm">{post.content}</p>
          
          {post.media && post.media.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {post.media.map((url, i) => (
                <img 
                  key={i}
                  src={url}
                  alt={`Post media ${i + 1}`}
                  className="rounded-md w-full h-32 object-cover"
                />
              ))}
            </div>
          )}

          <div className="flex justify-between items-center pt-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.analytics?.views?.toLocaleString() || 0}
                <span className="text-xs ml-1">views</span>
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                {post.analytics?.engagement?.toLocaleString() || 0}
                <span className="text-xs ml-1">engagements</span>
              </span>
              <span className="flex items-center gap-1">
                <Share2 className="w-4 h-4" />
                {post.analytics?.shares?.toLocaleString() || 0}
                <span className="text-xs ml-1">shares</span>
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-normal">
                {((post.analytics?.engagement || 0) / (post.analytics?.views || 1) * 100).toFixed(1)}% engagement rate
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Filters & Sorting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Platform</label>
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="engagement">Highest Engagement</SelectItem>
                  <SelectItem value="views">Most Views</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Quick Stats
              <CalendarIcon className="w-4 h-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Posts</span>
                <span className="font-medium">{filteredPosts.length}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Views</span>
                <span className="font-medium">{stats.totalViews.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Engagement</span>
                <span className="font-medium">{stats.totalEngagement.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Shares</span>
                <span className="font-medium">{stats.totalShares.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <ScrollArea className="h-[800px] pr-4">
          {filteredPosts.length > 0 ? (
            <div className="space-y-4">
              {filteredPosts.map(renderPostCard)}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Filter className="w-8 h-8" />
                <p>No posted content found for the selected filters</p>
              </div>
            </Card>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}