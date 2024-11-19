// src/types/index.ts
export interface Post {
    platform: string;
    category: string;
    content: string;
    scheduledDate: Date | null;
    media: string[];
    isDraft: boolean;
  }