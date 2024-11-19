import React from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PLATFORMS, PLATFORM_INFO } from '@/constants/platforms'

interface PlatformSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  isMulti?: boolean;
}

const PlatformSelect: React.FC<PlatformSelectProps> = ({
  value = [],
  onChange,
  isMulti = false
}) => {
  const selectedPlatforms = value.map(v => 
    PLATFORM_INFO[v] || PLATFORM_INFO[v.toLowerCase()] || {
      id: v.toLowerCase(),
      name: v,
      icon: "📝",
    }
  );

  const handleSelect = (platformId: string) => {
    if (isMulti) {
      const isSelected = value.includes(platformId);
      const newValue = isSelected
        ? value.filter(v => v !== platformId)
        : [...value, platformId];
      onChange(newValue);
    } else {
      onChange([platformId]);
    }
  };

  const removePlatform = (platformToRemove: string) => {
    onChange(value.filter(v => v !== platformToRemove));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {selectedPlatforms.length > 0 ? (
            <div className="flex flex-wrap gap-2 max-w-[90%]">
              {selectedPlatforms.map(platform => (
                <Badge
                  key={platform.id}
                  variant="secondary"
                  className="flex items-center gap-1 mr-1"
                >
                  <span>{platform.icon}</span>
                  {platform.name}
                  {isMulti && (
                    <button
                      className="ml-1 hover:bg-muted rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        removePlatform(platform.id);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground">Select platforms...</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search platforms..." className="h-9" />
          <CommandEmpty>No platform found.</CommandEmpty>
          <ScrollArea className="h-[300px]">
            <CommandGroup>
              {PLATFORMS.map((platform) => {
                const isSelected = value.includes(platform.id);
                return (
                  <CommandItem
                    key={platform.id}
                    value={platform.id}
                    onSelect={() => handleSelect(platform.id)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <span className="flex-shrink-0">{platform.icon}</span>
                      <span>{platform.name}</span>
                    </div>
                    {isSelected && (
                      <svg
                        className="h-4 w-4 text-primary flex-shrink-0"
                        fill="none"
                        strokeWidth="2"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PlatformSelect;