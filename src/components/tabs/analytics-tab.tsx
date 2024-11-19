"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useScheduler } from "@/contexts/scheduler-context"
import { formatDateStr } from "@/lib/utils"
import { Post } from "@/types/types"
import { PostAnalyticsView } from "@/components/post-analytics-view"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { 
  TrendingUp, 
  Users, 
  Share2, 
  Eye, 
  ThumbsUp,
  BarChart2,
  ArrowUp,
  ArrowDown,
  Calendar,
  Filter
} from "lucide-react"

const PLATFORMS = ['twitter', 'facebook', 'instagram', 'linkedin']

export function AnalyticsTab() {
  const { posts } = useScheduler()
  const [timeRange, setTimeRange] = React.useState<'day' | 'week' | 'month'>('week')
  const [selectedPlatform, setSelectedPlatform] = React.useState<string>("all")

  const getTimeFilteredPosts = React.useCallback((posts: Post[], range: 'day' | 'week' | 'month') => {
    const now = new Date()
    const filterDate = new Date()
    
    switch(range) {
      case 'day':
        filterDate.setDate(now.getDate() - 1)
        break
      case 'week':
        filterDate.setDate(now.getDate() - 7)
        break
      case 'month':
        filterDate.setMonth(now.getMonth() - 1)
        break
    }

    return posts.filter(post => 
      post.status === 'published' && 
      post.scheduledDate && 
      new Date(post.scheduledDate) > filterDate &&
      (selectedPlatform === 'all' || post.platform === selectedPlatform)
    )
  }, [selectedPlatform])

  const filteredPosts = React.useMemo(() => 
    getTimeFilteredPosts(posts, timeRange), 
    [posts, timeRange, getTimeFilteredPosts]
  )

  const getAnalyticsSummary = React.useCallback(() => {
    return filteredPosts.reduce((acc, post) => ({
      views: acc.views + (post.analytics?.views || 0),
      engagement: acc.engagement + (post.analytics?.engagement || 0),
      shares: acc.shares + (post.analytics?.shares || 0),
      engagementRate: (acc.engagement / acc.views) * 100
    }), { views: 0, engagement: 0, shares: 0, engagementRate: 0 })
  }, [filteredPosts])

  const getPerformanceByPlatform = React.useCallback(() => {
    return PLATFORMS.map(platform => {
      const platformPosts = filteredPosts.filter(post => post.platform === platform)
      return {
        name: platform,
        posts: platformPosts.length,
        engagement: platformPosts.reduce((sum, post) => sum + (post.analytics?.engagement || 0), 0),
        views: platformPosts.reduce((sum, post) => sum + (post.analytics?.views || 0), 0),
        shares: platformPosts.reduce((sum, post) => sum + (post.analytics?.shares || 0), 0)
      }
    })
  }, [filteredPosts])

  const getPeriodPerformance = React.useCallback(() => {
    const periods = timeRange === 'day' ? 24 : timeRange === 'week' ? 7 : 30
    const data = []
    const endDate = new Date()
    const startDate = new Date()
    
    if (timeRange === 'day') startDate.setHours(endDate.getHours() - 24)
    else if (timeRange === 'week') startDate.setDate(endDate.getDate() - 7)
    else startDate.setMonth(endDate.getMonth() - 1)

    for (let i = 0; i < periods; i++) {
      const periodStart = new Date(startDate)
      if (timeRange === 'day') periodStart.setHours(startDate.getHours() + i)
      else periodStart.setDate(startDate.getDate() + i)

      const periodPosts = filteredPosts.filter(post => {
        const postDate = new Date(post.scheduledDate!)
        return postDate >= periodStart && 
               postDate < new Date(periodStart.getTime() + (timeRange === 'day' ? 3600000 : 86400000))
      })

      data.push({
        period: timeRange === 'day' 
          ? periodStart.toLocaleTimeString([], { hour: '2-digit' })
          : periodStart.toLocaleDateString([], { month: 'short', day: 'numeric' }),
        views: periodPosts.reduce((sum, post) => sum + (post.analytics?.views || 0), 0),
        engagement: periodPosts.reduce((sum, post) => sum + (post.analytics?.engagement || 0), 0),
        shares: periodPosts.reduce((sum, post) => sum + (post.analytics?.shares || 0), 0)
      })
    }

    return data
  }, [filteredPosts, timeRange])

  const summary = getAnalyticsSummary()
  const platformData = getPerformanceByPlatform()
  const periodData = getPeriodPerformance()

  const StatCard = ({ title, value, prevValue, icon: Icon }: {
    title: string;
    value: number;
    prevValue?: number;
    icon: React.ElementType;
  }) => {
    const change = prevValue ? ((value - prevValue) / prevValue) * 100 : undefined

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <h3 className="text-2xl font-bold mt-2">{value.toLocaleString()}</h3>
            </div>
            <div className="p-4 rounded-full bg-primary/10">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          </div>
          {typeof change !== 'undefined' && (
            <div className="mt-4 flex items-center text-sm">
              {change >= 0 ? (
                <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={change >= 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(change).toFixed(1)}% from previous period
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
        <div className="flex gap-4">
          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              {PLATFORMS.map(platform => (
                <SelectItem key={platform} value={platform} className="capitalize">
                  {platform}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Tabs value={timeRange} onValueChange={(v: 'day' | 'week' | 'month') => setTimeRange(v)}>
            <TabsList>
              <TabsTrigger value="day">24h</TabsTrigger>
              <TabsTrigger value="week">7 Days</TabsTrigger>
              <TabsTrigger value="month">30 Days</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          title="Total Views" 
          value={summary.views}
          icon={Eye}
        />
        <StatCard 
          title="Total Engagement" 
          value={summary.engagement}
          icon={ThumbsUp}
        />
        <StatCard 
          title="Total Shares" 
          value={summary.shares}
          icon={Share2}
        />
        <StatCard 
          title="Posts Published" 
          value={filteredPosts.length}
          icon={BarChart2}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
            <CardDescription>Trends across {timeRange}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={periodData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#8884d8" name="Views" />
                <Line type="monotone" dataKey="engagement" stroke="#82ca9d" name="Engagement" />
                <Line type="monotone" dataKey="shares" stroke="#ffc658" name="Shares" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Performance</CardTitle>
            <CardDescription>Comparison across networks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" fill="#8884d8" name="Views" />
                <Bar dataKey="engagement" fill="#82ca9d" name="Engagement" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Posts</CardTitle>
          <CardDescription>Your best content from this period</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {filteredPosts
                .sort((a, b) => (b.analytics?.engagement || 0) - (a.analytics?.engagement || 0))
                .slice(0, 5)
                .map((post, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-medium mb-1">{post.content.slice(0, 100)}...</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="capitalize">
                            {post.platform}
                          </Badge>
                          <span>{formatDateStr(post.scheduledDate!)}</span>
                        </div>
                      </div>
                    </div>
                    <PostAnalyticsView post={post} showDialog={false} />
                  </Card>
                ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}