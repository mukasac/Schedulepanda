"use client"

import React,{useEffect, useState} from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
  } from "@/components/ui/command"
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Check, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Platform } from "@/types/types";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";


const GET_ALL_PLATFORMS = gql`
  query GetAllSurpportedPlatforms {
    getAllSurpportedPlatforms {
      name
      id
      iconUrl
    }
  }
`




const PlatformSelector = () => {


   const {data,error,loading} = useQuery(GET_ALL_PLATFORMS)

    const [selectedPlatforms, setSelectedPlatforms] = React.useState<string[]>([]);
    const [open, setOpen] = React.useState(false);


    useEffect(()=>{
       if(data && data.getAllSurpportedPlatforms){
          setSelectedPlatforms(data.getAllSurpportedPlatforms)
       }
    },[data])
  
    // const connectedPlatforms: Platform[] = [
    //   { id: 'twitter', name: 'Twitter', iconUrl: '𝕏', connected: true },
    //   { id: 'instagram', name: 'Instagram', iconUrl: '📸', connected: true },
    //   { id: 'facebook', name: 'Facebook', iconUrl: '👤', connected: true },
    //   { id: 'linkedin', name: 'LinkedIn', iconUrl: '💼', connected: true }
    // ];

    const [connectedPlatforms,setConnectedPlatforms] = useState<Platform[]>([])

    useEffect(()=>{

    },[])
  
    const togglePlatform = (platformId: string) => {
      setSelectedPlatforms(current =>
        current.includes(platformId)
          ? current.filter(id => id !== platformId)
          : [...current, platformId]
      );
    };


    if(loading){
       return (
        <div className="w-full space-y-4 mb-6">
        <div className="flex flex-col gap-2">
           Loading.....
        </div>
        </div>
       ) 
    }
  
    return (
      <div className="w-full space-y-4 mb-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Post to platforms</label>
          <div className="flex flex-wrap gap-2">
            {selectedPlatforms.map(platformId => {
              const platform = connectedPlatforms.find(p => p.id === platformId);
              if (!platform) return null;
              
              return (
                <Badge
                  key={platform.id}
                  variant="secondary"
                  className="px-3 py-1 cursor-pointer hover:bg-secondary/80"
                  onClick={() => togglePlatform(platform.id)}
                >
                  <span className="mr-1">
                   <Image src={platform.iconUrl}  width={50} height={50} alt="Logo"/>
                    </span>
                  {platform.name}
                  <span className="ml-1 opacity-60">×</span>
                </Badge>
              );
            })}
            
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Platform
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search platforms..." />
                  <CommandEmpty>No platforms found.</CommandEmpty>
                  <CommandGroup>
                    {connectedPlatforms.map(platform => (
                      <CommandItem
                        key={platform.id}
                        value={platform.id}
                        onSelect={() => {
                          togglePlatform(platform.id);
                          setOpen(false);
                        }}
                      >
                        <span className="mr-2">
                        <Image src={platform.iconUrl}  width={50} height={50} alt="Logo"/>
                            </span>
                        {platform.name}
                        {selectedPlatforms.includes(platform.id) && (
                          <Check className="ml-auto h-4 w-4" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {selectedPlatforms.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Select at least one platform to post to
          </p>
        )}
      </div>
    );
  };


  export default PlatformSelector