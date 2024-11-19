// src/contexts/team-context.tsx
"use client"

import React, { createContext, useContext, useState } from 'react';

interface PlatformPermission {
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'tiktok';
  access: boolean;
  canPost: boolean;
  canSchedule: boolean;
  canAnalyze: boolean;
}

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  permissions: {
    create: boolean;
    edit: boolean;
    delete: boolean;
    schedule: boolean;
  };
  platformPermissions: PlatformPermission[];
  notifications: {
    postPublished: boolean;
    comments: boolean;
    likes: boolean;
    mentions: boolean;
  };
}

interface TeamContextType {
  members: TeamMember[];
  addMember: (member: Omit<TeamMember, 'id'>) => void;
  updateMember: (id: number, updates: Partial<TeamMember>) => void;
  removeMember: (id: number) => void;
  currentUser: TeamMember | null;
}

const defaultPlatformPermissions: PlatformPermission[] = [
  {
    platform: 'facebook',
    access: false,
    canPost: false,
    canSchedule: false,
    canAnalyze: false
  },
  {
    platform: 'twitter',
    access: false,
    canPost: false,
    canSchedule: false,
    canAnalyze: false
  },
  {
    platform: 'instagram',
    access: false,
    canPost: false,
    canSchedule: false,
    canAnalyze: false
  },
  {
    platform: 'linkedin',
    access: false,
    canPost: false,
    canSchedule: false,
    canAnalyze: false
  },
  {
    platform: 'tiktok',
    access: false,
    canPost: false,
    canSchedule: false,
    canAnalyze: false
  }
];

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: React.ReactNode }) {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah@example.com",
      role: "admin",
      avatar: "/api/placeholder/32/32",
      permissions: {
        create: true,
        edit: true,
        delete: true,
        schedule: true,
      },
      platformPermissions: defaultPlatformPermissions.map(p => ({...p, access: true, canPost: true, canSchedule: true, canAnalyze: true})),
      notifications: {
        postPublished: true,
        comments: true,
        likes: true,
        mentions: true,
      }
    }
  ]);

  const addMember = (member: Omit<TeamMember, 'id'>) => {
    setMembers(prev => [...prev, { ...member, id: Date.now() }]);
  };

  const updateMember = (id: number, updates: Partial<TeamMember>) => {
    setMembers(prev => 
      prev.map(member => 
        member.id === id ? { ...member, ...updates } : member
      )
    );
  };

  const removeMember = (id: number) => {
    setMembers(prev => prev.filter(member => member.id !== id));
  };

  return (
    <TeamContext.Provider 
      value={{ 
        members, 
        addMember, 
        updateMember, 
        removeMember,
        currentUser: members[0]
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};

export { type TeamMember, type PlatformPermission, defaultPlatformPermissions };