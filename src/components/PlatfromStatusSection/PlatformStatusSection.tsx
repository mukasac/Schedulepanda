import { Check, Plus, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useEffect, useState } from "react";
import { Platform } from "@/types/types";
import Image from "next/image";
import { GET_USER_PLATFROMS, usePlartformContext } from "@/contexts/platfroms-context";
import { cn } from "@/lib/utils";
import { useToast } from "../ui/use-toast";
import { DISCONNECT_PLATFORM } from "../ConnectedPlatfromsSidebar/ConnectedPlatfromsSidebar";
import { useMutation } from "@apollo/client";
import { useUser } from "@clerk/nextjs";


interface Props {
    setShowPlatformSettings:()=> void
    showPlatformConnect:()=> void
}


const PlatformStatusSection = ({showPlatformConnect,setShowPlatformSettings}:Props) =>{
    const {user} = useUser()
    const {toast} = useToast()
    const platformState = usePlartformContext()

    
    const [disconnectUserFromPlatform,disconnectionResponse] = useMutation(DISCONNECT_PLATFORM,{
        refetchQueries:[
          "GetUserPlatforms",
           GET_USER_PLATFROMS
        ]
       })


    const [connectedPlatforms,setConnectedPlatforms] = useState<Platform[]>([])

    useEffect(()=>{
        if(platformState){
           setConnectedPlatforms(platformState.userPlatforms)
        }
     },[platformState])

     const handleDisconnectPlatform = (platformId: string) => {
        if(user){
          disconnectUserFromPlatform({
            variables:{
              platformId:platformId,
              clerkId:user.id
            }
           })
         }
        toast({
          title: "Platform Disconnected",
          description: "You can reconnect the platform at any time.",
        });
      };


     const getStatusColor = (status: Platform['status']) => {
        switch (status) {
          case 'active': return 'text-green-500';
          case 'expired': return 'text-yellow-500';
          case 'pending': return 'text-red-500';
          default: return '';
        }
      };
      

    return (
        <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium">Connected Platforms</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setShowPlatformSettings()}
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={()=>showPlatformConnect()}
              >
                <Plus className="w-4 h-4" />
                Add Platform
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            {connectedPlatforms.map((platform) =>{
             
                return (
                    <div
                    key={platform.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                    <div className="w-5 h-5" >
                        <Image src={platform.iconUrl} width={50} height={50} style={{width:"100%",height:"100%",objectFit:"contain"}} alt="logo" />
                    </div>
                      <div>
                        <div className="font-medium">{platform.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {platform.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-right">
                        <div className={cn("flex items-center gap-1", getStatusColor(platform.status))}>
                          <Check className="w-4 h-4" />
                          <span>Active</span>
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {/* {platform.lastSync && `Last sync: ${platform.lastSync}`} */}
                          Last sync
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-100"
                        onClick={() => handleDisconnectPlatform(platform.id)}
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>
                )
            })}
            {connectedPlatforms.length === 0 && (
              <div className="text-center p-4 text-muted-foreground">
                No platforms connected. Click "Add Platform" to get started.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
}


  export default PlatformStatusSection