import { ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { GET_USER_PLATFROMS, usePlartformContext } from "@/contexts/platfroms-context";
import { useEffect, useState } from "react";
import { Platform } from "@/types/types";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { CONNECT_PLATFORM, DISCONNECT_PLATFORM } from "../ConnectedPlatfromsSidebar/ConnectedPlatfromsSidebar";
import { useUser } from "@clerk/nextjs";
import { useToast } from "../ui/use-toast";


interface Props {
    open:boolean
    close:()=> void
}

const PlatformConnectionDialog = ({open,close}:Props) => {
    
    const {user} = useUser()
    const platformState = usePlartformContext()
    const { toast } = useToast();

    const [connectUserToPlatform,connectionResponse] = useMutation(CONNECT_PLATFORM,{
        refetchQueries:[
          "GetUserPlatforms",
          GET_USER_PLATFROMS
        ]
       })


    const [platforms,setPlatforms] = useState<Platform[]>([])

    useEffect(()=>{
       if(platformState){
        
          const _notConnectedPlatforms = platformState.supportedPlatforms.filter((p)=>{
             const userPlatformIds = platformState.userPlatforms.map((item)=> item.id)

             if(!userPlatformIds.includes(p.id)){
                   return p
             }
          })
          setPlatforms(_notConnectedPlatforms)
       }
    },[platformState])


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
   

   
    return(
        <Dialog open={open} onOpenChange={close}  >
         <DialogContent className="sm:max-w-xl bg-white">
        <DialogHeader >
          <DialogTitle>Connect Platform</DialogTitle>
          <DialogDescription>
            Connect your social media accounts to start posting
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5" >
                    <Image src={platform.iconUrl} width={50} height={50} alt="logo" />
                </div>
                <div>
                  <span className="font-medium">{platform.name}</span>
                  {/* <p className="text-sm text-muted-foreground">
                    {platform.settings?.characterLimit && 
                      `Up to ${platform.settings.characterLimit} characters`}
                  </p> */}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => {
                  handleConnectPlatform(platform.id);
                  close();
                }}
              >
                <ExternalLink className="w-4 h-4" />
                Connect
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
    )
}

export default PlatformConnectionDialog