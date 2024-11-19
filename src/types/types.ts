import { LucideIcon } from 'lucide-react';

export interface Post {
  id?: number;
  content: string;
  date?: string;
  time?: string;
  platform: string;
  hashtags?: string;
  category: string;
  tags?: string[];
  status?: 'draft' | 'scheduled' | 'published' | 'failed';
  timeZone?: string;
  customTime?: string;
  scheduledDate: Date | null;
  media: string[];
  isDraft: boolean;
  mentions?: string[];
  link?: string;
  settings?: {
    autoHashtags: boolean;
    firstComment: boolean;
    crossPost: boolean;
  };
  analytics?: {
    views: number;
    engagement: number;
    clicks?: number;
    shares?: number;
  };
}

export interface PlatformInfo {
  icon: LucideIcon;
  charLimit: number;
  color: string;
  gradient: string;
  bestTimes: string[];
  maxHashtags: number;
  mediaTypes: string[];
  features: string[];
  baseReach: number;
  supportedContentTypes: {
    text: boolean;
    images: boolean;
    videos: boolean;
    links: boolean;
    polls: boolean;
  };
  postRequirements: {
    minLength?: number;
    maxLength: number;
    allowedMediaTypes: string[];
    maxMediaCount: number;
    maxHashtagLength?: number;
  };
}

export interface BulkSchedule {
  id?: number;
  startDate: string;
  endDate: string;
  times: string[];
  platforms: string[];
  content?: string[];
  frequency?: 'daily' | 'weekly' | 'custom';
  interval?: number;
  excludeDates?: string[];
  categories?: string[];
  hashtags?: string[];
  mediaRotation?: string[];
}

export interface UploadedFile extends File {
  preview: string;
  uploadProgress?: number;
  status?: 'uploading' | 'done' | 'error';
  errorMessage?: string;
}

export interface ImageUploadProps {
  onUpload: (files: UploadedFile[]) => void;
  maxFiles?: number;
  accept?: string;
  maxSize?: number;
  onError?: (error: string) => void;
  showProgress?: boolean;
  allowedTypes?: string[];
}

export interface SchedulerContextType {
  posts: Post[];
  drafts: Post[];
  schedules: BulkSchedule[];
  platforms: Record<string, PlatformInfo>;
  selectedTimeZone: string;
  currentPost: Post | null;
  setCurrentPost: (post: Post | null) => void;
  addPost: (post: Post) => Promise<void>;
  updatePost: (id: number, post: Post) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  saveDraft: (post: Post) => Promise<void>;
  scheduleBulk: (schedule: BulkSchedule) => Promise<void>;
}

export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';
export type PostFrequency = 'daily' | 'weekly' | 'custom';
export type MediaType = 'image' | 'video' | 'gif' | 'link';
export type PlatformFeature = 'hashtags' | 'mentions' | 'polls' | 'scheduling' | 'analytics';