'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { useScheduler } from "@/contexts/scheduler-context"
import { PLATFORM_INFO } from "@/constants/platforms"
import { 
  Card as UICard,
  CardContent as UICardContent,
  CardHeader as UICardHeader,
  CardTitle as UICardTitle,
  CardDescription as UICardDescription 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CalendarIcon, Clock, Globe, ChevronDown, Eye, Copy, Trash2, Plus } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"

export function ScheduledPostsTab() {
  const router = useRouter()
  const { posts, addScheduledPost, removeScheduledPost } = useScheduler()
  const { toast } = useToast()
  const [previewPost, setPreviewPost] = React.useState<any | null>(null)
  const [postToDelete, setPostToDelete] = React.useState<string | null>(null)

  const handleCreatePost = () => {
    router.push('/?tab=create')
  }

  const handlePreview = (post: any) => {
    setPreviewPost(post)
  }

  const handleDuplicate = (post: any) => {
    const duplicatedPost = {
      ...post,
      id: `post-${Date.now()}`,
      scheduledDate: new Date(post.scheduledDate),
    }
    addScheduledPost(duplicatedPost)
    toast({
      title: "Post Duplicated",
      description: "The post has been duplicated successfully.",
    })
  }

  const handleDelete = (postId: string) => {
    setPostToDelete(postId)
  }

  const confirmDelete = () => {
    if (postToDelete) {
      removeScheduledPost(postToDelete)
      setPostToDelete(null)
      toast({
        title: "Post Deleted",
        description: "The scheduled post has been deleted.",
      })
    }
  }

  const getPrimaryPlatform = (platforms: string[]) => {
    return platforms[0] || 'unknown'
  }

  return (
    <UICard>
      <UICardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
        <UICardTitle>Scheduled Posts</UICardTitle>
        <UICardDescription className="text-purple-100">
          Manage your upcoming social media posts
        </UICardDescription>
      </UICardHeader>
      <UICardContent className="pt-6">
        {posts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No posts scheduled yet</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={handleCreatePost}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Post
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => {
              const primaryPlatform = getPrimaryPlatform(post.platforms)
              const platform = PLATFORM_INFO[primaryPlatform]
              const PlatformIcon = platform?.Component || Plus
              
              return (
                <UICard key={post.id} className="bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                  <UICardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8 bg-white bg-opacity-20">
                        <AvatarFallback>
                          <PlatformIcon className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <UICardTitle className="text-sm font-medium capitalize">
                          {primaryPlatform}
                          {post.platforms.length > 1 && (
                            <span className="text-xs ml-1">
                              +{post.platforms.length - 1}
                            </span>
                          )}
                        </UICardTitle>
                        <UICardDescription className="text-xs text-white text-opacity-80">
                          Scheduled
                        </UICardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-white hover:bg-white hover:bg-opacity-20">
                          <span className="sr-only">Open menu</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handlePreview(post)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(post)}>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </UICardHeader>
                  <UICardContent className="pt-4">
                    <p className="text-sm line-clamp-3">{post.content}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        {format(new Date(post.scheduledDate), 'PP')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {format(new Date(post.scheduledDate), 'p')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {post.timeZone}
                      </span>
                    </div>
                    {post.hashtags && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {post.hashtags.split(' ').map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {post.media && post.media.length > 0 && (
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {post.media.slice(0, 2).map((url: string, index: number) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Media ${index + 1}`}
                            className="w-full h-20 object-cover rounded-md"
                          />
                        ))}
                      </div>
                    )}
                  </UICardContent>
                </UICard>
              )
            })}
          </div>
        )}
      </UICardContent>

      {/* Preview Dialog */}
      <Dialog open={!!previewPost} onOpenChange={() => setPreviewPost(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Post Preview</DialogTitle>
            <DialogDescription>
              Preview your scheduled post
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {previewPost && (
              <>
                <p className="whitespace-pre-wrap">{previewPost.content}</p>
                {previewPost.media && previewPost.media.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {previewPost.media.map((url: string, index: number) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {previewPost.platforms.map((platform: string) => (
                    <Badge key={platform} variant="outline">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!postToDelete} onOpenChange={() => setPostToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this scheduled post. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </UICard>
  )
}

export default ScheduledPostsTab