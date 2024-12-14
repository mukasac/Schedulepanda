"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Platform } from "@/types/types"
import React, { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { ExternalLink, Link, LogOut, Settings, Shield, UserPlus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { gql, useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";




const GET_ALL_PLATFORMS = gql`
  query GetAllSurpportedPlatforms {
    getAllSurpportedPlatforms {
      name
      id
      iconUrl
    }
  }
`

const CONNECT_PLATFORM = gql`
mutation Mutation($platformId: ID!, $clerkId: ID!) {
  connectUserToAplatform(platformId: $platformId, clerkId: $clerkId) {
    id
  }
}
`


const GET_USER_PLATFROMS = gql`
query GetUserPlatforms($clerkId:ID!) {
  getUserPlatforms(clerkId: $clerkId) {
    name
    id
  }
}
`
// Connected Platforms Sidebar Component
const ConnectedPlatformsSidebar = ({user}:{user:any}) => {
     const {data} = useQuery(GET_ALL_PLATFORMS)

     const userPlatformsResponse = useQuery(GET_USER_PLATFROMS,{
      variables:{
        clerkId:user?.id
      }
     })

     const [connectUserToPlatform,connectionResponse] = useMutation(CONNECT_PLATFORM,{
      refetchQueries:[
        "GetUserPlatforms",
        GET_USER_PLATFROMS
      ]
     })


    // const [platformsx, setPlatformsx] = React.useState<Platform[]>([
    //   { id: 'twitter', name: 'Twitter', iconUrl: '𝕏', connected: false, status: 'expired' },
    //   { id: 'instagram', name: 'Instagram', iconUrl: '📸', connected: false, status: 'expired' },
    //   { id: 'facebook', name: 'Facebook', iconUrl: '👤', connected: false, status: 'expired' },
    //   { id: 'linkedin', name: 'LinkedIn', iconUrl: '💼', connected: false, status: 'expired' },
    //   { id: 'tiktok', name: 'TikTok', iconUrl: '🎵', connected: false, status: 'expired' },
    //   { id: 'pinterest', name: 'Pinterest', iconUrl: '📌', connected: false, status: 'expired' }
    // ]);

    const [platforms, setPlatforms] = React.useState<Platform[]>([])
    const [userPlatforms,setUserPlatforms] = useState<Platform[]>([])
  
    const [showPlatformSettings, setShowPlatformSettings] = React.useState(false);
    const { toast } = useToast();


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
  
    const handleConnectPlatform =(platformId: string) => {
       //
       if(user){
        connectUserToPlatform({
          variables:{
            platformId:platformId,
            clerkId:user.id
          }
         })
       }
      toast({
        title: "Platform Connected",
        description: "You can now start posting to this platform.",
      });
    };
  
    const handleDisconnectPlatform = (platformId: string) => {
      setPlatforms(current =>
        current.map(p => 
          p.id === platformId 
            ? { ...p, connected: false, status: 'expired' as const }
            : p
        )
      );
      toast({
        title: "Platform Disconnected",
        description: "You can reconnect the platform at any time.",
      });
    };
  
    return (
      <div className="w-72 shrink-0">
        <div className="sticky top-6 space-y-4">
          {/* Connected Platforms Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Connect Platforms</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowPlatformSettings(true)}
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription>
                Connect your social media accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {platforms.map(platform =>{

                  const isConnected = userPlatforms.some((item)=> item.id === platform.id)
                  console.log(isConnected,'-------->conn')
                 
                   return (
                    <div 
                      key={platform.id}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">

                        <Image src={platform.iconUrl}  width={30} height={30} style={{width:"100%",height:"100%",objectFit:"contain"}} alt="Logo"/>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{platform.name}</span>
                          <span className={`text-xs text-muted-foreground ${isConnected ? "text-green-400": undefined}`}>
                            {isConnected ? 'Connected' : 'Not connected'}
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant={isConnected ? "outline" : "secondary"}
                        size="sm"
                        onClick={() => isConnected 
                          ? handleDisconnectPlatform(platform.id)
                          : handleConnectPlatform(platform.id)
                        }
                      >
                        {isConnected ? (
                          <LogOut className="w-4 h-4" />
                        ) : (
                          <div>
                            {
                              connectionResponse.loading ? <div>Loading..</div> :
                              <Link className="w-4 h-4" />
                            }
                          </div>
                         
                        
                        )}
                      </Button>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
  
          {/* Team Management Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Team</CardTitle>
              <CardDescription>
                Manage your team and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <UserPlus className="w-4 h-4" />
                  Invite Team Member
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Shield className="w-4 h-4" />
                  Manage Permissions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
  
        {/* Platform Settings Dialog */}
        <Dialog open={showPlatformSettings} onOpenChange={setShowPlatformSettings}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Platform Settings</DialogTitle>
              <DialogDescription>
                Manage your connected platforms
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {platforms
                .filter(p => p.connected)
                .map(platform => (
                  <div 
                    key={platform.id} 
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <Image src={platform.iconUrl}  width={50} height={50} alt="Logo"/>
                      </div>
                      <div>
                        <h4 className="font-medium">{platform.name}</h4>
                        <p className="text-sm text-muted-foreground">Connected</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(`https://${platform.id}.com/settings`, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDisconnectPlatform(platform.id)}
                      >
                        <LogOut className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };


  export default ConnectedPlatformsSidebar