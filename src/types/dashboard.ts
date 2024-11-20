// types/dashboard.ts
export interface Post {
    id: string;
    content: string;
    platform: string;
    status: 'published' | 'failed' | 'scheduled';
    scheduledDate: string;
    analytics?: {
      views: number;
      engagement: number;
      shares: number;
    };
  }