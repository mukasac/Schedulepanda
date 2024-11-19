// src/contexts/scheduler-context.tsx
'use client'

import { createContext, useContext, useState } from 'react';
import { Post, BulkSchedule } from "@/types/types";

const defaultPost: Post = {
  platform: '',
  category: '',
  content: '',
  scheduledDate: null,
  media: [],
  isDraft: false,
  tags: []
};

const defaultBulkSchedule: BulkSchedule = {
  startDate: '',
  endDate: '',
  times: [],
  platforms: []
};

interface SchedulerContextType {
  newPost: Post;
  posts: Post[];
  drafts: Post[];
  error: string | null;
  selectedTimeZone: string;
  bulkSchedule: BulkSchedule;
  setNewPost: (post: Post) => void;
  handleSubmit: (e: React.FormEvent) => void;
  saveDraft: () => void;
  loadDraft: (draft: Post) => void;
  deleteDraft: (id: number) => void;
  setBulkSchedule: (schedule: BulkSchedule) => void;
  handleBulkSchedule: () => void;
  setSelectedTimeZone: (timezone: string) => void;
}

const SchedulerContext = createContext<SchedulerContextType | undefined>(undefined);

export function SchedulerProvider({ children }: { children: React.ReactNode }) {
  const [newPost, setNewPost] = useState<Post>(defaultPost);
  const [posts, setPosts] = useState<Post[]>([]);
  const [drafts, setDrafts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeZone, setSelectedTimeZone] = useState('UTC');
  const [bulkSchedule, setBulkSchedule] = useState<BulkSchedule>(defaultBulkSchedule);

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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to schedule post');
    }
  };

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

  const handleBulkSchedule = async () => {
    // Implement bulk scheduling logic
  };

  const value = {
    newPost,
    posts,
    drafts,
    error,
    selectedTimeZone,
    bulkSchedule,
    setNewPost,
    handleSubmit,
    saveDraft,
    loadDraft,
    deleteDraft,
    setBulkSchedule,
    handleBulkSchedule,
    setSelectedTimeZone
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
  console.log('Scheduling post:', post);
}