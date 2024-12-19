// src/types/types.ts

import { LucideIcon } from 'lucide-react';

// Platform and System Status Types
export interface SystemStatus {
  platforms: Record<string, PlatformStatus>;
  queue: QueueStatus;
  maintenance: boolean;
  lastUpdate: string;
  errors: SystemError[];
}

export interface PlatformStatus {
  connected: boolean;
  rateLimitRemaining: number;
  lastSync?: string;
  status: 'active' | 'warning' | 'error';
  errorCount: number;
  successRate: number;
  apiHealth: {
    status: 'healthy' | 'degraded' | 'down';
    latency: number;
    errorRate: number;
  };
}

export interface QueueStatus {
  pending: number;
  processing: number;
  failed: number;
  completed: number;
  retrying: number;
  totalProcessed: number;
  averageProcessingTime: number;
}

export interface SystemError {
  id: string;
  timestamp: string;
  type: 'api' | 'platform' | 'system' | 'queue';
  message: string;
  platform?: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  resolved: boolean;
}

// Enhanced Post Interface
export interface Post {
  id?: number;
  content: string;
  date?: string;
  time?: string;
  platform: string;
  hashtags?: string;
  category: string;
  tags?: string[];
  status?: PostStatus;
  timeZone?: string;
  customTime?: string;
  scheduledDate: Date | null;
  media: MediaItem[];
  isDraft: boolean;
  mentions?: string[];
  link?: string;
  settings?: PostSettings;
  analytics?: PostAnalytics;
  metadata?: PostMetadata;
  history?: PostHistory[];
  approvalStatus?: ApprovalStatus;
  priority?: 'low' | 'normal' | 'high';
}

export interface MediaItem {
  id: string;
  url: string;
  type: MediaType;
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
  thumbnail?: string;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  errorMessage?: string;
  uploadProgress?: number;
  metadata?: {
    fileName: string;
    fileType: string;
    lastModified: string;
  };
}

export interface PostSettings {
  autoHashtags: boolean;
  firstComment: boolean;
  crossPost: boolean;
  autoSchedule?: boolean;
  reuseMedia?: boolean;
  ageRestricted?: boolean;
  sensitiveContent?: boolean;
  geolocation?: {
    enabled: boolean;
    location?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
}

export interface PostAnalytics {
  views: number;
  engagement: number;
  clicks?: number;
  shares?: number;
  impressions?: number;
  reach?: number;
  saves?: number;
  comments?: number;
  demographicData?: {
    ageRanges: Record<string, number>;
    genders: Record<string, number>;
    locations: Record<string, number>;
  };
  engagementRate?: number;
  bestPerformingMedia?: string;
}

export interface PostMetadata {
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  version: number;
  source: 'web' | 'mobile' | 'api';
  campaign?: string;
  labels?: string[];
}

export interface PostHistory {
  timestamp: string;
  action: 'created' | 'updated' | 'scheduled' | 'published' | 'failed' | 'retried';
  user: string;
  changes?: Record<string, any>;
  status: PostStatus;
  notes?: string;
}

// Enhanced Platform Information
export interface PlatformInfo {
  icon: LucideIcon;
  charLimit: number;
  color: string;
  gradient: string;
  bestTimes: string[];
  maxHashtags: number;
  mediaTypes: MediaType[];
  features: PlatformFeature[];
  baseReach: number;
  supportedContentTypes: ContentTypes;
  postRequirements: PostRequirements;
  apiLimits: {
    hourly: number;
    daily: number;
    remaining: number;
    resetTime: string;
  };
  recommendedSettings: {
    optimalPostTimes: string[];
    hashtagCount: number;
    mediaRatio: number;
    captionLength: number;
  };
}

export interface ContentTypes {
  text: boolean;
  images: boolean;
  videos: boolean;
  links: boolean;
  polls: boolean;
  stories?: boolean;
  reels?: boolean;
  carousels?: boolean;
}

export interface PostRequirements {
  minLength?: number;
  maxLength: number;
  allowedMediaTypes: MediaType[];
  maxMediaCount: number;
  maxHashtagLength?: number;
  mediaRequirements?: {
    maxSize: number;
    aspectRatios: string[];
    formats: string[];
    minDuration?: number;
    maxDuration?: number;
  };
}

// Enhanced Bulk Schedule
export interface BulkSchedule {
  id?: number;
  startDate: string;
  endDate: string;
  times: string[];
  platforms: string[];
  content?: string[];
  frequency?: PostFrequency;
  interval?: number;
  excludeDates?: string[];
  categories?: string[];
  hashtags?: string[];
  mediaRotation?: string[];
  settings?: {
    distributeEvenly: boolean;
    avoidDuplicates: boolean;
    respectRateLimits: boolean;
    optimizePostTimes: boolean;
  };
  status?: 'draft' | 'active' | 'completed' | 'paused';
  analytics?: {
    totalPosts: number;
    successfulPosts: number;
    failedPosts: number;
    averageEngagement: number;
  };
}

// File Upload Types
export interface UploadedFile extends File {
  preview: string;
  uploadProgress?: number;
  status?: 'uploading' | 'processing' | 'done' | 'error';
  errorMessage?: string;
  metadata?: {
    dimensions?: {
      width: number;
      height: number;
    };
    duration?: number;
    format?: string;
  };
}

export interface ImageUploadProps {
  onUpload: (files: UploadedFile[]) => void;
  maxFiles?: number;
  accept?: string;
  maxSize?: number;
  onError?: (error: string) => void;
  showProgress?: boolean;
  allowedTypes?: string[];
  validateDimensions?: boolean;
  crop?: boolean;
  compress?: boolean;
}

// Context Types
export interface SchedulerContextType {
  posts: Post[];
  drafts: Post[];
  schedules: BulkSchedule[];
  platforms: Record<string, PlatformInfo>;
  selectedTimeZone: string;
  currentPost: Post | null;
  systemStatus: SystemStatus;
  
  // Post Management
  setCurrentPost: (post: Post | null) => void;
  addPost: (post: Post) => Promise<void>;
  updatePost: (id: number, post: Post) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  saveDraft: (post: Post) => Promise<void>;
  scheduleBulk: (schedule: BulkSchedule) => Promise<void>;
  
  // Platform Management
  connectPlatform: (platformId: string) => Promise<void>;
  disconnectPlatform: (platformId: string) => Promise<void>;
  refreshPlatformStatus: () => Promise<void>;
  
  // Queue Management
  retryFailedPosts: (postIds?: number[]) => Promise<void>;
  clearQueue: () => Promise<void>;
  pauseQueue: () => Promise<void>;
  resumeQueue: () => Promise<void>;
  
  // System Management
  acknowledgeError: (errorId: string) => Promise<void>;
  toggleMaintenance: (enabled: boolean) => Promise<void>;
  generateAnalyticsReport: (dateRange: DateRange) => Promise<void>;
}

// Utility Types
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed' | 'processing' | 'retry';
export type PostFrequency = 'daily' | 'weekly' | 'monthly' | 'custom';
export type MediaType = 'image' | 'video' | 'gif' | 'link' | 'story' | 'reel' | 'carousel';
export type PlatformFeature = 'hashtags' | 'mentions' | 'polls' | 'scheduling' | 'analytics' | 'stories' | 'reels';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'needs_review';

export interface DateRange {
  startDate: Date;
  endDate: Date;
}


export interface Platform {
  id: string;
  name: string;
  iconUrl: string;
  connected: boolean;
  status?: 'active' | 'expired' | 'pending';
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