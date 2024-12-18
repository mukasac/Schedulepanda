// src/components/tabs/create-post-tab.tsx
"use client"

import React, { useState } from 'react'
import { useScheduler } from "@/contexts/scheduler-context"
import { useDrafts } from '@/contexts/drafts-context'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { 
  AlertCircle, 
  Link, 
  AtSign, 
  Hash, 
  X, 
  Image as ImageIcon, 
  Smile,
  CalendarIcon,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Video,
  Plus,
  ExternalLink,
  Check,
  Settings,
} from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ImageUpload from "@/components/ui/image-upload"
import EmojiPicker from 'emoji-picker-react'
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import PlatformConnectionDialog from '../PlatformConnectionDialog/PlatformConnectionDialog'
import PlatformStatusSection from '../PlatfromStatusSection/PlatformStatusSection'

// Types and Interfaces
interface PostSettings {
  autoHashtags: boolean;
  firstComment: boolean;
  crossPost: boolean;
}

interface Post {
  content: string;
  platforms: string[];
  scheduledDate: Date | null;
  settings: {
    [key: string]: PostSettings;
  };
  hashtags?: string;
  mentions?: string;
  link?: string;
  media?: string[];
}

interface Platform {
  id: string;
  name: string;
  icon: any;
  connected: boolean;
  status: 'active' | 'expired' | 'disconnected';
  accountName?: string;
  lastSync?: string;
  settings?: {
    characterLimit?: number;
    mediaTypes?: string[];
    allowScheduling?: boolean;
    allowHashtags?: boolean;
    allowMentions?: boolean;
  };
}

interface CreatePostTabProps {}

interface UploadedFile {
  preview: string;
  type: string;
}
export const CreatePostTab: React.FC<CreatePostTabProps> = () => {
  // Context Hooks
  const {
    newPost,
    error,
    setNewPost,
    handleSubmit,
    selectedTimeZone,
    addScheduledPost
  } = useScheduler()

  const { addDraft } = useDrafts();
  const { toast } = useToast();

  // Local State
  const [mediaFiles, setMediaFiles] = useState<UploadedFile[]>([])
  const [activeTab, setActiveTab] = useState<"compose" | "settings">("compose")
  const [expandedInput, setExpandedInput] = useState<"hashtags" | "mentions" | "link" | "emoji" | "image" | null>(null)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [activePlatformPreview, setActivePlatformPreview] = useState<string>('')
  const [scheduleDate, setScheduleDate] = useState<Date | null>(null)
  const [scheduleTime, setScheduleTime] = useState<string>("")
  const [showPlatformConnect, setShowPlatformConnect] = useState(false);
  const [showPlatformSettings, setShowPlatformSettings] = useState(false);

  // Platform Configuration
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      connected: false,
      status: 'disconnected',
      settings: {
        characterLimit: 63206,
        mediaTypes: ['image', 'video', 'gif'],
        allowScheduling: true,
        allowHashtags: true,
        allowMentions: true
      }
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      connected: false,
      status: 'disconnected',
      settings: {
        characterLimit: 280,
        mediaTypes: ['image', 'video', 'gif'],
        allowScheduling: true,
        allowHashtags: true,
        allowMentions: true
      }
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      connected: false,
      status: 'disconnected',
      settings: {
        characterLimit: 2200,
        mediaTypes: ['image', 'video'],
        allowScheduling: true,
        allowHashtags: true,
        allowMentions: true
      }
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      connected: false,
      status: 'disconnected',
      settings: {
        characterLimit: 3000,
        mediaTypes: ['image', 'video'],
        allowScheduling: true,
        allowHashtags: true,
        allowMentions: true
      }
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: Video,
      connected: false,
      status: 'disconnected',
      settings: {
        characterLimit: 2200,
        mediaTypes: ['video'],
        allowScheduling: true,
        allowHashtags: true,
        allowMentions: true
      }
    }
  ]);

  // Time slots generation
  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2)
    const minute = i % 2 === 0 ? "00" : "30"
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${displayHour}:${minute} ${ampm}`
  })

  const resetForm = () => {
    setNewPost({
      content: '',
      platforms: [],
      scheduledDate: null,
      settings: {}
    });
    setMediaFiles([]);
    setSelectedPlatforms([]);
    setScheduleDate(null);
    setScheduleTime("");
    setExpandedInput(null);
  };

// Handlers
const handleConnectPlatform = (platformId: string) => {
  setPlatforms(platforms.map(p => 
    p.id === platformId
      ? { 
          ...p, 
          connected: true, 
          status: 'active', 
          lastSync: 'just now',
          accountName: `Demo Account (${p.name})`
        }
      : p
  ));

  if (!selectedPlatforms.includes(platformId)) {
    setSelectedPlatforms([...selectedPlatforms, platformId]);
  }

  toast({
    title: "Platform Connected",
    description: `Successfully connected to ${platforms.find(p => p.id === platformId)?.name}`,
  });
};

const handleDisconnectPlatform = (platformId: string) => {
  setPlatforms(platforms.map(p => 
    p.id === platformId
      ? { ...p, connected: false, status: 'disconnected', accountName: undefined, lastSync: undefined }
      : p
  ));

  setSelectedPlatforms(selectedPlatforms.filter(id => id !== platformId));
  
  toast({
    title: "Platform Disconnected",
    description: `Disconnected from ${platforms.find(p => p.id === platformId)?.name}`,
  });
};

const handleMediaUpload = (files: UploadedFile[]) => {
  const uploadedType = files[0]?.type?.split('/')[0] || 'image';
  const unsupportedPlatforms = selectedPlatforms.filter(platformId => {
    const platform = platforms.find(p => p.id === platformId);
    return !platform?.settings?.mediaTypes?.includes(uploadedType);
  });

  if (unsupportedPlatforms.length > 0) {
    toast({
      title: "Unsupported Media Type",
      description: `Some selected platforms don't support ${uploadedType} uploads`,
      variant: "destructive"
    });
    return;
  }

  setMediaFiles(files);
  setNewPost({ ...newPost, media: files.map(f => f.preview) });
};

const handleEmojiClick = (emojiObject: { emoji: string }) => {
  const platform = platforms.find(p => p.id === activePlatformPreview);
  const newContent = newPost.content + emojiObject.emoji;

  if (platform?.settings?.characterLimit && newContent.length > platform.settings.characterLimit) {
    toast({
      title: "Character Limit Exceeded",
      description: `${platform.name} has a limit of ${platform.settings.characterLimit} characters`,
      variant: "destructive"
    });
    return;
  }

  setNewPost({
    ...newPost,
    content: newContent
  });
};

const handleSchedulePost = () => {
  if (!selectedPlatforms.length || !newPost.content || !scheduleDate || !scheduleTime) {
    toast({
      title: "Error",
      description: "Please fill in all required fields",
      variant: "destructive"
    });
    return;
  }

  const [time, meridiem] = scheduleTime.split(' ');
  const [hours, minutes] = time.split(':');
  const scheduledDateTime = new Date(scheduleDate);
  let hour = parseInt(hours);
  
  if (meridiem === 'PM' && hour !== 12) hour += 12;
  if (meridiem === 'AM' && hour === 12) hour = 0;
  
  scheduledDateTime.setHours(hour, parseInt(minutes));

  const scheduledPost: Post = {
    content: newPost.content,
    platforms: selectedPlatforms,
    scheduledDate: scheduledDateTime,
    settings: newPost.settings,
    hashtags: newPost.hashtags,
    mentions: newPost.mentions,
    link: newPost.link,
    media: mediaFiles.map(file => file.preview)
  };

  addScheduledPost(scheduledPost);
  resetForm();
  
  toast({
    title: "Success",
    description: "Post scheduled successfully",
  });
};

const handleSaveDraft = () => {
  if (!selectedPlatforms.length || !newPost.content) {
    toast({
      title: "Error",
      description: "Please select platforms and add content",
      variant: "destructive"
    });
    return;
  }

  addDraft(newPost);
  resetForm();
  
  toast({
    title: "Success",
    description: "Draft saved successfully",
  });
};

const updatePlatformSettings = (platformId: string, setting: keyof PostSettings, value: boolean) => {
  setNewPost({
    ...newPost,
    settings: {
      ...newPost.settings,
      [platformId]: {
        ...newPost.settings?.[platformId],
        [setting]: value
      }
    }
  });
};

const toggleInput = (input: "hashtags" | "mentions" | "link" | "emoji" | "image") => {
  setExpandedInput(expandedInput === input ? null : input);
};





const PlatformSettingsDialog = () => (
  <Dialog open={showPlatformSettings} onOpenChange={setShowPlatformSettings}>
    <DialogContent className="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>Platform Settings</DialogTitle>
        <DialogDescription>
          Configure global settings for each platform
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        {platforms.filter(p => p.connected).map((platform) => (
          <div key={platform.id} className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <platform.icon className="w-5 h-5" />
              <h3 className="font-medium">{platform.name}</h3>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Character Limit</label>
                  <p className="text-sm text-muted-foreground">
                    Maximum characters per post
                  </p>
                </div>
                <span className="text-sm font-mono">
                  {platform.settings?.characterLimit}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Media Types</label>
                  <p className="text-sm text-muted-foreground">
                    Supported media formats
                  </p>
                </div>
                <div className="flex gap-2">
                  {platform.settings?.mediaTypes?.map(type => (
                    <Badge key={type} variant="secondary" className="capitalize">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Features</label>
                  <p className="text-sm text-muted-foreground">
                    Available platform features
                  </p>
                </div>
                <div className="flex gap-2">
                  {platform.settings?.allowHashtags && (
                    <Badge variant="secondary">Hashtags</Badge>
                  )}
                  {platform.settings?.allowMentions && (
                    <Badge variant="secondary">Mentions</Badge>
                  )}
                  {platform.settings?.allowScheduling && (
                    <Badge variant="secondary">Scheduling</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <DialogFooter>
        <Button onClick={() => setShowPlatformSettings(false)}>
          Close
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
// Main Return
return (
  <Card className="border-none shadow-none bg-background">
    <CardContent className="p-0">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }} className="space-y-6">
        <PlatformStatusSection
          showPlatformConnect={()=> setShowPlatformConnect(true)}
          handleDisconnectPlatform={()=>{}}
          setShowPlatformSettings={()=>{}}
         />
        
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {platforms.filter(p => p.connected).map((platform) => (
              <Button
                key={platform.id}
                variant={selectedPlatforms.includes(platform.id) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  if (selectedPlatforms.includes(platform.id)) {
                    setSelectedPlatforms(selectedPlatforms.filter(id => id !== platform.id));
                    if (activePlatformPreview === platform.id) {
                      setActivePlatformPreview(selectedPlatforms[0] || '');
                    }
                  } else {
                    setSelectedPlatforms([...selectedPlatforms, platform.id]);
                    if (!activePlatformPreview) {
                      setActivePlatformPreview(platform.id);
                    }
                  }
                }}
                className="gap-2"
              >
                <platform.icon className="w-4 h-4" />
                {platform.name}
                {platform.settings?.characterLimit && (
                  <span className="text-xs text-muted-foreground">
                    ({newPost.content.length}/{platform.settings.characterLimit})
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-[240px] mb-6">
                <TabsTrigger value="compose" className="flex-1">Compose</TabsTrigger>
                <TabsTrigger value="settings" className="flex-1">Advanced Settings</TabsTrigger>
              </TabsList>

              {activeTab === "compose" && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Textarea
                      placeholder="What's on your mind?"
                      value={newPost.content}
                      onChange={(e) => {
                        const newContent = e.target.value;
                        const exceedsPlatforms = selectedPlatforms
                          .map(id => platforms.find(p => p.id === id))
                          .filter(platform => 
                            platform?.settings?.characterLimit && 
                            newContent.length > platform.settings.characterLimit
                          );

                        if (exceedsPlatforms.length > 0) {
                          toast({
                            title: "Character Limit Exceeded",
                            description: `Content exceeds limit for ${exceedsPlatforms[0]?.name}`,
                            variant: "destructive"
                          });
                          return;
                        }

                        setNewPost({ ...newPost, content: newContent });
                      }}
                      className="min-h-[120px] text-base resize-none"
                    />

                    <div className="flex items-center gap-2 border-t pt-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleInput("hashtags")}
                        className={`p-2 ${expandedInput === "hashtags" ? "bg-muted" : ""}`}
                        disabled={!selectedPlatforms.some(id => 
                          platforms.find(p => p.id === id)?.settings?.allowHashtags
                        )}
                      >
                        <Hash className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleInput("mentions")}
                        className={`p-2 ${expandedInput === "mentions" ? "bg-muted" : ""}`}
                        disabled={!selectedPlatforms.some(id => 
                          platforms.find(p => p.id === id)?.settings?.allowMentions
                        )}
                      >
                        <AtSign className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleInput("link")}
                        className={`p-2 ${expandedInput === "link" ? "bg-muted" : ""}`}
                      >
                        <Link className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleInput("emoji")}
                        className={`p-2 ${expandedInput === "emoji" ? "bg-muted" : ""}`}
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleInput("image")}
                        className={`p-2 ${expandedInput === "image" ? "bg-muted" : ""}`}
                        disabled={!selectedPlatforms.some(id => {
                          const platform = platforms.find(p => p.id === id);
                          return platform?.settings?.mediaTypes?.length > 0;
                        })}
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>

                    {expandedInput && (
                      <div className="mt-2">
                        {expandedInput === "emoji" ? (
                          <div className="relative">
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => setExpandedInput(null)}
                              className="absolute top-2 right-2"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : expandedInput === "image" ? (
                          <div className="relative">
                            <ImageUpload
                              onUpload={handleMediaUpload}
                              maxFiles={4}
                              accept={selectedPlatforms
                                .map(id => platforms.find(p => p.id === id)?.settings?.mediaTypes)
                                .flat()
                                .filter((type): type is string => !!type)
                                .map(type => `${type}/*`)
                                .join(',')}
                              className="border-2 border-dashed rounded-lg p-8 bg-muted/50 hover:bg-muted/70 transition-colors"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => setExpandedInput(null)}
                              className="absolute top-2 right-2"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Input
                              placeholder={
                                expandedInput === "hashtags"
                                  ? "Add hashtags"
                                  : expandedInput === "mentions"
                                  ? "Tag accounts"
                                  : "Add link"
                              }
                              value={
                                expandedInput === "hashtags"
                                  ? newPost.hashtags
                                  : expandedInput === "mentions"
                                  ? newPost.mentions
                                  : newPost.link || ''
                              }
                              onChange={(e) =>
                                setNewPost({
                                  ...newPost,
                                  [expandedInput]: e.target.value
                                })
                              }
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => setExpandedInput(null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {mediaFiles.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      {mediaFiles.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={file.preview}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              const newFiles = mediaFiles.filter((_, i) => i !== index);
                              setMediaFiles(newFiles);
                              setNewPost({ ...newPost, media: newFiles.map(f => f.preview) });
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="text-sm font-medium mb-4">Schedule Post</h3>
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex flex-col space-y-2">
                          <label className="text-sm font-medium">Date</label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !scheduleDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {scheduleDate ? format(scheduleDate, "PPP") : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={scheduleDate}
                                onSelect={setScheduleDate}
                                initialFocus
                                disabled={(date) => date < new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                          <label className="text-sm font-medium">Time</label>
                          <Select value={scheduleTime} onValueChange={setScheduleTime}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time">
                                {scheduleTime || (
                                  <span className="text-muted-foreground flex items-center">
                                    <Clock className="mr-2 h-4 w-4" />
                                    Pick a time
                                  </span>
                                )}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                    <h3 className="text-sm font-medium mb-4">Platform-Specific Settings</h3>
                    {selectedPlatforms.length > 0 ? (
                      <div className="space-y-6">
                        {selectedPlatforms.map((platformId) => {
                          const platform = platforms.find(p => p.id === platformId);
                          if (!platform) return null;
                          
                          return (
                            <div key={platform.id} className="space-y-3 pb-3 border-b last:border-0">
                              <div className="flex items-center gap-2">
                                <platform.icon className="w-5 h-5" />
                                <h4 className="font-medium">{platform.name}</h4>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <label htmlFor={`autoHashtags-${platform.id}`} className="text-sm">
                                    Auto-generate hashtags
                                  </label>
                                  <Switch
                                    id={`autoHashtags-${platform.id}`}
                                    checked={newPost.settings?.[platform.id]?.autoHashtags ?? false}
                                    onCheckedChange={(checked) => 
                                      updatePlatformSettings(platform.id, 'autoHashtags', checked)
                                    }
                                    disabled={!platform.settings?.allowHashtags}
                                  />
                                </div>
                                <div className="flex items-center justify-between">
                                  <label htmlFor={`firstComment-${platform.id}`} className="text-sm">
                                    Post hashtags as first comment
                                  </label>
                                  <Switch
                                    id={`firstComment-${platform.id}`}
                                    checked={newPost.settings?.[platform.id]?.firstComment ?? false}
                                    onCheckedChange={(checked) => 
                                      updatePlatformSettings(platform.id, 'firstComment', checked)
                                    }
                                    disabled={!platform.settings?.allowHashtags}
                                  />
                                </div>
                                <div className="flex items-center justify-between">
                                  <label htmlFor={`crossPost-${platform.id}`} className="text-sm">
                                    Enable cross-posting
                                  </label>
                                  <Switch
                                    id={`crossPost-${platform.id}`}
                                    checked={newPost.settings?.[platform.id]?.crossPost ?? false}
                                    onCheckedChange={(checked) => 
                                      updatePlatformSettings(platform.id, 'crossPost', checked)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        Select platforms to configure platform-specific settings
                      </p>
                    )}
                  </div>
                </div>
              )}
            </Tabs>
          </div>

          <div className="sticky top-0">
            <div className="bg-background border rounded-lg p-6 h-full">
              {selectedPlatforms.length > 0 ? (
                <>
                  <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
                  {selectedPlatforms.map((platformId) => {
                        const platform = platforms.find(p => p.id === platformId);
                        return platform ? (
                          <Button
                            key={platformId}
                            variant={platformId === activePlatformPreview ? "default" : "outline"}
                            size="sm"
                            onClick={() => setActivePlatformPreview(platformId)}
                            className="whitespace-nowrap gap-2"
                          >
                            <platform.icon className="w-4 h-4" />
                            {platform.name}
                          </Button>
                        ) : null;
                      })}
                    </div>
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <div className={`preview-${activePlatformPreview.toLowerCase()} min-h-[200px] bg-muted/50 rounded-lg p-4`}>
                        <p className="text-foreground whitespace-pre-wrap">{newPost.content}</p>
                        {mediaFiles.length > 0 && (
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            {mediaFiles.map((file, index) => (
                              <img
                                key={index}
                                src={file.preview}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border"
                              />
                            ))}
                          </div>
                        )}
                        {newPost.link && (
                          <div className="mt-4 text-primary break-all">
                            {newPost.link}
                          </div>
                        )}
                        {newPost.hashtags && (
                          <div className="mt-2 text-primary">
                            {newPost.hashtags}
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-[200px] bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground">Select platforms to see preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <p>{error}</p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveDraft}
              disabled={!selectedPlatforms.length || !newPost.content}
            >
              Save Draft
            </Button>
            <Button
              type="button"
              variant="default"
              onClick={handleSchedulePost}
              disabled={!selectedPlatforms.length || !newPost.content || !scheduleDate || !scheduleTime}
            >
              Schedule Post
            </Button>
            <Button 
              type="submit"
              disabled={!selectedPlatforms.length || !newPost.content}
            >
              Post Now
            </Button>
          </div>
        </form>

        <PlatformConnectionDialog
              open={showPlatformConnect}
              close={()=> setShowPlatformConnect(false)}
         />
        <PlatformSettingsDialog />
      </CardContent>
    </Card>
  );
};

export default CreatePostTab;
