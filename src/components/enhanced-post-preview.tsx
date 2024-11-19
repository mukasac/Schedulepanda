// src/components/enhanced-post-preview.tsx
'use client'

import * as React from "react"
import { 
  Card as UICard,
  CardContent as UICardContent, 
  CardHeader as UICardHeader,
  CardTitle as UICardTitle 
} from "../components/ui/card"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react"
import { PLATFORM_INFO } from "@/lib/constants"
import { Post } from "../types/types"

interface EnhancedPostPreviewProps {
  post: Post
}

export function EnhancedPostPreview({ post }: EnhancedPostPreviewProps) {
  const platform = PLATFORM_INFO[post.platform]
  const PlatformIcon = platform.icon

  return (
    <UICard className={`bg-gradient-to-br ${platform.gradient} text-white`}>
      <UICardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <PlatformIcon className="w-5 h-5" />
          <UICardTitle className="capitalize">{post.platform} Preview</UICardTitle>
        </div>
      </UICardHeader>
      <UICardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">Your Business</div>
            <div className="text-sm opacity-80">@yourbusiness</div>
          </div>
        </div>

        <div className="text-sm">
          {post.content || <span className="opacity-60">Your post will appear here...</span>}
        </div>

        {post.hashtags && (
          <div className="flex flex-wrap gap-1">
            {post.hashtags.split(',').map((tag, index) => (
              <Badge key={index} className="bg-white bg-opacity-20">
                {tag.trim().startsWith('#') ? tag.trim() : `#${tag.trim()}`}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex justify-between text-sm opacity-80">
          <button className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            Like
          </button>
          <button className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            Comment
          </button>
          <button className="flex items-center gap-1">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </UICardContent>
    </UICard>
  )
}