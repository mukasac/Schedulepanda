import { 
    Twitter, 
    Facebook, 
    Instagram, 
    Linkedin, 
    Youtube,
    PenSquare,
    Hash
  } from 'lucide-react'
  
  export const PLATFORMS = [
    { id: "twitter", name: "Twitter", icon: "🐦", Component: Twitter },
    { id: "facebook", name: "Facebook", icon: "📘", Component: Facebook },
    { id: "instagram", name: "Instagram", icon: "📸", Component: Instagram },
    { id: "linkedin", name: "LinkedIn", icon: "💼", Component: Linkedin },
    { id: "tiktok", name: "TikTok", icon: "🎵", Component: Hash },
    { id: "pinterest", name: "Pinterest", icon: "📌", Component: Hash },
    { id: "youtube", name: "YouTube", icon: "📺", Component: Youtube },
    { id: "medium", name: "Medium", icon: "✍️", Component: PenSquare },
    { id: "threads", name: "Threads", icon: "🧵", Component: Hash }
  ] as const;
  
  export const PLATFORM_INFO = PLATFORMS.reduce((acc, platform) => ({
    ...acc,
    [platform.id]: platform,
    [platform.name]: platform, // Allow lookup by both id and name
  }), {} as Record<string, typeof PLATFORMS[number]>);
  
  export type PlatformType = typeof PLATFORMS[number]["id"];