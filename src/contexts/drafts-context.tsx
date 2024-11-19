'use client'

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Post } from '@/types/types';

interface Draft extends Post {
  id: string;
  createdAt: Date;
}

interface DraftsContextType {
  drafts: Draft[];
  addDraft: (post: Omit<Draft, 'id' | 'createdAt'>) => void;
  deleteDraft: (id: string) => void;
  editDraft: (id: string) => void;
  getDraft: (id: string) => Draft | undefined;
  updateDraft: (draft: Draft) => void;
}

const DraftsContext = createContext<DraftsContextType | undefined>(undefined);

export const DraftsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [drafts, setDrafts] = useState<Draft[]>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const savedDrafts = localStorage.getItem('postDrafts');
      return savedDrafts ? JSON.parse(savedDrafts) : [];
    }
    return [];
  });

  // Save drafts to localStorage whenever they change
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('postDrafts', JSON.stringify(drafts));
    }
  }, [drafts]);

  const addDraft = useCallback((post: Omit<Draft, 'id' | 'createdAt'>) => {
    const newDraft: Draft = {
      ...post,
      id: `draft-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };

    setDrafts(prev => [newDraft, ...prev]);
  }, []);

  const deleteDraft = useCallback((id: string) => {
    setDrafts(prev => prev.filter(draft => draft.id !== id));
  }, []);

  const getDraft = useCallback((id: string) => {
    return drafts.find(draft => draft.id === id);
  }, [drafts]);

  const editDraft = useCallback((id: string) => {
    // This will be implemented in the UI layer
    console.log('Editing draft:', id);
  }, []);

  const updateDraft = useCallback((updatedDraft: Draft) => {
    setDrafts(prev => prev.map(draft => 
      draft.id === updatedDraft.id ? updatedDraft : draft
    ));
  }, []);

  return (
    <DraftsContext.Provider 
      value={{ 
        drafts, 
        addDraft, 
        deleteDraft, 
        editDraft, 
        getDraft,
        updateDraft
      }}
    >
      {children}
    </DraftsContext.Provider>
  );
};

export const useDrafts = () => {
  const context = useContext(DraftsContext);
  if (context === undefined) {
    throw new Error('useDrafts must be used within a DraftsProvider');
  }
  return context;
};