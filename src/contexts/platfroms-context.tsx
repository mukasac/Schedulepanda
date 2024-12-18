import { Platform } from "@/types/types";
import { gql, useQuery } from "@apollo/client";
import { useUser } from "@clerk/nextjs";
import React, { createContext, useContext, useEffect, useState } from "react";




export const GET_ALL_PLATFORMS = gql`
  query GetAllSurpportedPlatforms {
    getAllSurpportedPlatforms {
      name
      id
      iconUrl
    }
  }
`

export const GET_USER_PLATFROMS = gql`
query GetUserPlatforms($clerkId:ID!) {
  getUserPlatforms(clerkId: $clerkId) {
    name
    id
    iconUrl
  }
}
`


interface InitialState {
    supportedPlatforms:Platform[]
    userPlatforms:Platform[]
}
const initialState:InitialState = {
    supportedPlatforms:[],
    userPlatforms:[]
}
export const PlatformContext = createContext<InitialState | undefined>(undefined)

export const PlatformContextProvider=({children}:{children:React.ReactNode})=>{
    const {user} = useUser()
    const {data} = useQuery(GET_ALL_PLATFORMS)

    const userPlatformsResponse = useQuery(GET_USER_PLATFROMS,{
        variables:{
          clerkId:user?.id
        }
       })
    
    const [platforms, setPlatforms] = React.useState<Platform[]>([])
    const [userPlatforms,setUserPlatforms] = useState<Platform[]>([])

   
    useEffect(()=>{
        if(data && data.getAllSurpportedPlatforms){
            setPlatforms(data.getAllSurpportedPlatforms)
        }
     },[data]) 


        
   useEffect(()=>{
    if(userPlatformsResponse && userPlatformsResponse.data && userPlatformsResponse.data.getUserPlatforms){
        setUserPlatforms(userPlatformsResponse.data.getUserPlatforms)
    }
   },[userPlatformsResponse])



    return (
        <PlatformContext.Provider value={{
            supportedPlatforms:platforms,
            userPlatforms:userPlatforms
        }}>
            {children}
        </PlatformContext.Provider>
    )
}


export const usePlartformContext=()=>{
    const platformState = useContext(PlatformContext)

    if(platformState === undefined){
        throw new Error("Platform Context Error")
    }

    return platformState
}