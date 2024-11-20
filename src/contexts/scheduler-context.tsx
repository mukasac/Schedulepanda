// src/contexts/scheduler-context.tsx
'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { Post, BulkSchedule, SystemStatus, PlatformStatus, Analytics } from "@/types/types";

// Enhanced types
interface Platform {
  id: string;
  name: string;
  connected: boolean;
  status: 'active' | 'warning' | 'error';
  rateLimitRemaining: number;
  lastSync?: string;
}

interface QueueStatus {
  pending: number;
  processing: number;
  failed: number;
  completed: number;
}

interface SystemHealth {
  api: { status: string; latency: string };
  database: { status: string; latency: string };
  queue: QueueStatus;
  maintenance: boolean;
}

const defaultPost: Post = {
  platform: '',
  category: '',
  content: '',
  scheduledDate: null,
  media: [],
  isDraft: false,
  tags: [],
  analytics: {
    views: 0,
    engagement: 0,
    shares: 0
  }
};

const defaultBulkSchedule: BulkSchedule = {
  startDate: '',
  endDate: '',
  times: [],
  platforms: []
};

const defaultSystemStatus: SystemStatus = {
  platforms: {
    facebook: { connected: false, rateLimitRemaining: 5000 },
    twitter: { connected: false, rateLimitRemaining: 1000 },
    instagram: { connected: false, rateLimitRemaining: 5000 },
    linkedin: { connected: false, rateLimitRemaining: 1000 }
  },
  queue: {
    pending: 0,
    processing: 0,
    failed: 0,
    completed: 0
  },
  maintenance: false
};

interface SchedulerContextType {
  // Post Management
  newPost: Post;
  posts: Post[];
  drafts: Post[];
  error: string | null;
  selectedTimeZone: string;
  bulkSchedule: BulkSchedule;
  
  // System Status
  systemStatus: SystemStatus;
  platformStatus: Record<string, PlatformStatus>;
  analytics: Analytics;
  
  // Actions
  setNewPost: (post: Post) => void;
  handleSubmit: (e: React.FormEvent) => void;
  saveDraft: () => void;
  loadDraft: (draft: Post) => void;
  deleteDraft: (id: number) => void;
  setBulkSchedule: (schedule: BulkSchedule) => void;
  handleBulkSchedule: () => void;
  setSelectedTimeZone: (timezone: string) => void;
  
  // Platform Management
  connectPlatform: (platformId: string) => Promise<void>;
  disconnectPlatform: (platformId: string) => Promise<void>;
  refreshPlatformStatus: () => Promise<void>;
  
  // Queue Management
  retryFailedPosts: () => Promise<void>;
  clearQueue: () => Promise<void>;
}

const SchedulerContext = createContext<SchedulerContextType | undefined>(undefined);

export function SchedulerProvider({ children }: { children: React.ReactNode }) {
  // State Management
  const [newPost, setNewPost] = useState<Post>(defaultPost);
  const [posts, setPosts] = useState<Post[]>([]);
  const [drafts, setDrafts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeZone, setSelectedTimeZone] = useState('UTC');
  const [bulkSchedule, setBulkSchedule] = useState<BulkSchedule>(defaultBulkSchedule);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>(defaultSystemStatus);
  const [platformStatus, setPlatformStatus] = useState<Record<string, PlatformStatus>>({});
  const [analytics, setAnalytics] = useState<Analytics>({
    views: 0,
    engagement: 0,
    shares: 0
  });

  // WebSocket Connection
  useEffect(() => {
    let ws: WebSocket;

    const connectWebSocket = () => {
      ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001');

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case 'systemUpdate':
            setSystemStatus(prev => ({ ...prev, ...data.payload }));
            break;
          case 'platformUpdate':
            setPlatformStatus(prev => ({ ...prev, ...data.payload }));
            break;
          case 'analyticsUpdate':
            setAnalytics(prev => ({ ...prev, ...data.payload }));
            break;
          case 'queueUpdate':
            setSystemStatus(prev => ({
              ...prev,
              queue: { ...prev.queue, ...data.payload }
            }));
            break;
        }
      };

      ws.onclose = () => {
        setTimeout(connectWebSocket, 3000); // Reconnect after 3 seconds
      };
    };

    connectWebSocket();

    return () => {
      if (ws) ws.close();
    };
  }, []);

  // Post Management
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!newPost.platform) {
      setError('Please select a platform');
      return;
    }

    if (!newPost.content) {
      setError('Please enter content');
      return;
    }

    try {
      await schedulePost(newPost);
      setPosts([...posts, { ...newPost, id: Date.now() }]);
      setNewPost(defaultPost);
      
      // Update queue status
      setSystemStatus(prev => ({
        ...prev,
        queue: {
          ...prev.queue,
          pending: prev.queue.pending + 1
        }
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to schedule post');
    }
  };

  // Draft Management
  const saveDraft = async () => {
    try {
      const draft = { ...newPost, id: Date.now(), isDraft: true };
      setDrafts([...drafts, draft]);
      setNewPost(defaultPost);
    } catch (err) {
      setError('Failed to save draft');
    }
  };

  const loadDraft = (draft: Post) => {
    setNewPost(draft);
  };

  const deleteDraft = (id: number) => {
    setDrafts(drafts.filter(draft => draft.id !== id));
  };

  // Platform Management
  const connectPlatform = async (platformId: string) => {
    try {
      // Simulated API call to connect platform
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSystemStatus(prev => ({
        ...prev,
        platforms: {
          ...prev.platforms,
          [platformId]: {
            connected: true,
            rateLimitRemaining: 5000
          }
        }
      }));
    } catch (err) {
      setError(`Failed to connect ${platformId}`);
    }
  };

  const disconnectPlatform = async (platformId: string) => {
    try {
      // Simulated API call to disconnect platform
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSystemStatus(prev => ({
        ...prev,
        platforms: {
          ...prev.platforms,
          [platformId]: {
            connected: false,
            rateLimitRemaining: 0
          }
        }
      }));
    } catch (err) {
      setError(`Failed to disconnect ${platformId}`);
    }
  };

  const refreshPlatformStatus = async () => {
    try {
      // Simulated API call to refresh platform status
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Update platform status...
    } catch (err) {
      setError('Failed to refresh platform status');
    }
  };

  // Queue Management
  const retryFailedPosts = async () => {
    try {
      const failedPosts = posts.filter(post => post.status === 'failed');
      // Implement retry logic...
      
      setSystemStatus(prev => ({
        ...prev,
        queue: {
          ...prev.queue,
          failed: 0,
          pending: prev.queue.pending + failedPosts.length
        }
      }));
    } catch (err) {
      setError('Failed to retry posts');
    }
  };

  const clearQueue = async () => {
    try {
      // Implement queue clearing logic...
      setSystemStatus(prev => ({
        ...prev,
        queue: {
          pending: 0,
          processing: 0,
          failed: 0,
          completed: prev.queue.completed
        }
      }));
    } catch (err) {
      setError('Failed to clear queue');
    }
  };

  const handleBulkSchedule = async () => {
    // Implement bulk scheduling logic
    try {
      // Process bulk schedule...
      setBulkSchedule(defaultBulkSchedule);
    } catch (err) {
      setError('Failed to process bulk schedule');
    }
  };

  const value = {
    // Post Management
    newPost,
    posts,
    drafts,
    error,
    selectedTimeZone,
    bulkSchedule,
    
    // System Status
    systemStatus,
    platformStatus,
    analytics,
    
    // Actions
    setNewPost,
    handleSubmit,
    saveDraft,
    loadDraft,
    deleteDraft,
    setBulkSchedule,
    handleBulkSchedule,
    setSelectedTimeZone,
    
    // Platform Management
    connectPlatform,
    disconnectPlatform,
    refreshPlatformStatus,
    
    // Queue Management
    retryFailedPosts,
    clearQueue
  };

  return (
    <SchedulerContext.Provider value={value}>
      {children}
    </SchedulerContext.Provider>
  );
}

export function useScheduler() {
  const context = useContext(SchedulerContext);
  if (context === undefined) {
    throw new Error('useScheduler must be used within a SchedulerProvider');
  }
  return context;
}

async function schedulePost(post: Post) {
  // Implement actual post scheduling logic
  console.log('Scheduling post:', post);
}