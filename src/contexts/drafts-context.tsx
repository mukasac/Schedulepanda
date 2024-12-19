'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Post } from '@/types/types';
import { gql, useQuery } from '@apollo/client';
import { useUser } from '@clerk/nextjs';

interface Draft extends Post {
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

const GET_DRAFT_POSTS = gql`
   query GetDraftPosts($clerkId: ID!) {
  getDraftPosts(clerkID: $clerkId) {
    text
    id
    createdAt
    platforms {
      id
      name
      iconUrl
     } 
  }
}
`




const DraftsContext = createContext<DraftsContextType | undefined>(undefined);



export const DraftsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  //get clerk user
  console.log('provider run -----> dddd')
  const {user} = useUser()
  const [drafts, setDrafts] = useState<Draft[]>([]);

  const {data,error} = useQuery(GET_DRAFT_POSTS,{
    variables:{clerkId:user?.id}
   })
   

   useEffect(()=>{
      console.log(data,'----->data')
     if(data && data.getDraftPosts){
       setDrafts(data.getDraftPosts)
     }

     if(error){
       console.log(error,'-----> err')
     }
   },[data,error])
  
   const addDraft =()=>{}
   const deleteDraft=()=>{}
   const editDraft=()=>{}
   const getDraft=(id:string)=>{
    return undefined
   }
   const updateDraft=()=>{}
 

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