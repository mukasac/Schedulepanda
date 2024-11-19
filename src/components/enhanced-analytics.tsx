// src/components/enhanced-analytics.tsx
'use client'

import * as React from "react"
import { FileText as FileSparkles } from 'lucide-react'
import { 
  Card as UICard,
  CardContent as UICardContent,
  CardHeader as UICardHeader,
  CardTitle as UICardTitle 
} from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { Label } from "../components/ui/label"
import { PLATFORM_INFO } from "@/lib/constants"
import { Post } from "../types/types"

interface EnhancedAnalyticsProps {
  post: Post
}

interface AnalyticsInsights {
  contentScore: number
  estimatedReach: number
  hashtagScore: number
  bestTime: string
  engagement: {
    likes: number
    comments: number
    shares: number
  }
}

export function EnhancedAnalytics({ post }: EnhancedAnalyticsProps) {
  const [insights, setInsights] = React.useState<AnalyticsInsights | null>(null)
  const platform = React.useMemo(() => PLATFORM_INFO[post.platform], [post.platform])

  React.useEffect(() => {
    if (!post.content) return
    
    const contentScore = Math.min(100, 60 + (post.content.length / platform.charLimit) * 40)
    const estimatedReach = Math.floor(platform.baseReach * (contentScore / 100) * 
      (1 + Math.random() * 0.5))
    
    const hashtags = post.hashtags.split(',').length
    const hashtagScore = Math.min(100, (hashtags / platform.maxHashtags) * 100)

    setInsights({
      contentScore: Math.floor(contentScore),
      estimatedReach,
      hashtagScore: Math.floor(hashtagScore),
      bestTime: platform.bestTimes[Math.floor(Math.random() * platform.bestTimes.length)],
      engagement: {
        likes: Math.floor(estimatedReach * 0.1),
        comments: Math.floor(estimatedReach * 0.05),
        shares: Math.floor(estimatedReach * 0.03)
      }
    })
  }, [post.content, post.platform, post.hashtags, platform])

  if (!insights) return null

  return (
    <UICard className="bg-white dark:bg-gray-800">
      <UICardHeader className="pb-2">
        <UICardTitle className="text-lg flex items-center gap-2">
          <FileSparkles className="w-5 h-5 text-purple-500" />
          Content Analysis
        </UICardTitle>
      </UICardHeader>
      <UICardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Content Quality</span>
            <span className="font-medium">{insights.contentScore}%</span>
          </div>
          <Progress value={insights.contentScore} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <UICard className="border-0 shadow-none bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <UICardHeader className="pb-2">
              <UICardTitle className="text-sm">Estimated Reach</UICardTitle>
            </UICardHeader>
            <UICardContent>
              <div className="text-2xl font-bold">{insights.estimatedReach.toLocaleString()}</div>
            </UICardContent>
          </UICard>

          <UICard className="border-0 shadow-none bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            <UICardHeader className="pb-2">
              <UICardTitle className="text-sm">Best Time to Post</UICardTitle>
            </UICardHeader>
            <UICardContent>
              <div className="text-2xl font-bold">{insights.bestTime}</div>
            </UICardContent>
          </UICard>
        </div>

        <div className="space-y-3">
          <Label className="text-sm">Predicted Engagement</Label>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="text-lg font-semibold">{insights.engagement.likes}</div>
              <div className="text-xs text-muted-foreground">Likes</div>
            </div>
            <div className="text-center p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="text-lg font-semibold">{insights.engagement.comments}</div>
              <div className="text-xs text-muted-foreground">Comments</div>
            </div>
            <div className="text-center p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="text-lg font-semibold">{insights.engagement.shares}</div>
              <div className="text-xs text-muted-foreground">Shares</div>
            </div>
          </div>
        </div>
      </UICardContent>
    </UICard>
  )
}