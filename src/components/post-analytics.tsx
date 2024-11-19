"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Post } from "@/types/types"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'
import { 
  Eye, 
  ThumbsUp, 
  Share2, 
  TrendingUp, 
  Clock,
  BarChart2,
  Activity,
  Users,
  ArrowUp,
  ArrowDown
} from "lucide-react"
import { cn } from "@/lib/utils"

interface PostAnalyticsProps {
  post: Post
  showDialog?: boolean
  className?: string
}

export function PostAnalyticsView({ post, showDialog = true, className }: PostAnalyticsProps) {
  const [selectedTimeframe, setSelectedTimeframe] = React.useState<'24h' | '7d' | '30d'>('24h')
  
  // Generate analytics data based on timeframe
  const analyticsData = React.useMemo(() => {
    const dataPoints = selectedTimeframe === '24h' ? 24 : selectedTimeframe === '7d' ? 7 : 30
    const data = []
    const baseViews = post.analytics?.views || 100
    const baseEngagement = post.analytics?.engagement || 50
    const baseShares = post.analytics?.shares || 20

    for (let i = 0; i < dataPoints; i++) {
      const timestamp = new Date()
      timestamp.setHours(timestamp.getHours() - (dataPoints - i))
      
      data.push({
        timestamp: timestamp.toISOString(),
        views: Math.floor(baseViews / dataPoints * (1 + Math.random() * 0.5)),
        engagement: Math.floor(baseEngagement / dataPoints * (1 + Math.random() * 0.5)),
        shares: Math.floor(baseShares / dataPoints * (1 + Math.random() * 0.5))
      })
    }
    return data
  }, [post.analytics, selectedTimeframe])

  const StatCard = ({ title, value, change, icon: Icon }: any) => (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-2">{value.toLocaleString()}</h3>
          </div>
          <div className="p-3 bg-primary/10 rounded-full">
            <Icon className="w-5 h-5 text-primary" />
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
              {Math.abs(change)}% from previous period
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const AnalyticsContent = () => (
    <div className="space-y-6">
      <Tabs value={selectedTimeframe} onValueChange={(v: any) => setSelectedTimeframe(v)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="24h">Last 24 Hours</TabsTrigger>
          <TabsTrigger value="7d">Last 7 Days</TabsTrigger>
          <TabsTrigger value="30d">Last 30 Days</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Views"
          value={post.analytics?.views || 0}
          change={15}
          icon={Eye}
        />
        <StatCard
          title="Total Engagement"
          value={post.analytics?.engagement || 0}
          change={8}
          icon={ThumbsUp}
        />
        <StatCard
          title="Total Shares"
          value={post.analytics?.shares || 0}
          change={-5}
          icon={Share2}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Performance Over Time
          </CardTitle>
          <CardDescription>
            Detailed view of post performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="timestamp"
                tickFormatter={(timestamp) => {
                  const date = new Date(timestamp)
                  return selectedTimeframe === '24h' 
                    ? date.toLocaleTimeString([], { hour: '2-digit' })
                    : date.toLocaleDateString([], { month: 'short', day: 'numeric' })
                }}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(timestamp) => {
                  const date = new Date(timestamp)
                  return selectedTimeframe === '24h'
                    ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : date.toLocaleDateString([], { month: 'long', day: 'numeric' })
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="views" 
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.1}
                name="Views"
              />
              <Area 
                type="monotone" 
                dataKey="engagement" 
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.1}
                name="Engagement"
              />
              <Area 
                type="monotone" 
                dataKey="shares" 
                stroke="#ffc658"
                fill="#ffc658"
                fillOpacity={0.1}
                name="Shares"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Audience Insights
          </CardTitle>
          <CardDescription>
            Understanding your post's reach and impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Engagement Rate</span>
              <span className="text-sm">
                {((post.analytics?.engagement || 0) / (post.analytics?.views || 1) * 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Share Rate</span>
              <span className="text-sm">
                {((post.analytics?.shares || 0) / (post.analytics?.views || 1) * 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Peak Performance Time</span>
              <span className="text-sm">
                {new Date(post.scheduledDate!).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return showDialog ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <BarChart2 className="w-4 h-4" />
          View Analytics
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Post Performance Analytics
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-100px)] pr-4">
          <AnalyticsContent />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  ) : (
    <AnalyticsContent />
  )
}