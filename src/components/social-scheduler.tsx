"use client"

import * as React from "react"
import { 
  Plus, 
  Repeat, 
  CalendarIcon, 
  Save, 
  Clock, 
  CheckSquare, 
  BarChart3,
  ClipboardList,
  Settings,
  HelpCircle,
  Users,
  Check,
  LogOut,
  Shield,
  UserPlus,
  Link,
  ExternalLink
} from "lucide-react"
import { UserProfile, UserButton, useUser, SignOutButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreatePostTab } from "./tabs/create-post-tab"
import { BulkScheduleTab } from "./tabs/bulk-schedule-tab"
import { ScheduleQueueTab } from "./tabs/schedule-queue-tab"
import { ScheduledPostsTab } from "./tabs/scheduled-posts-tab"
import { DraftsTab } from "./tabs/drafts-tab"
import { PostedTab } from "./tabs/posted-tab"
import { AnalyticsTab } from "./tabs/analytics-tab"
import { TeamManagementTab } from "./tabs/team-management-tab"
import { ModeToggle } from "./mode-toggle"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

import { useToast } from "./ui/use-toast"

import PlatformSelector from "./PlatformSelector/PlatformSelector"
import ConnectedPlatformsSidebar from "./ConnectedPlatfromsSidebar/ConnectedPlatfromsSidebar"
import { API_URL } from "network/api"



interface TabConfig {
  id: string;
  label: string;
  icon: React.ElementType;
  component: React.ComponentType;
  badge?: string;
  description?: string;
}

interface AccountSettingsProps {
  open: boolean;
  onClose: () => void;
}

// Account Settings Component
const AccountSettings = ({ open, onClose }: AccountSettingsProps) => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Account Settings</DialogTitle>
          <DialogDescription>
            Manage your account settings and preferences
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* User Profile Quick View */}
          <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
            <UserButton />
            <div>
              <p className="font-medium">{user?.fullName || 'User'}</p>
              <p className="text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>

          {/* Account Management Options */}
          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => router.push('/user-profile')}
            >
              <Users className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => router.push('/user-profile/security')}
            >
              <Shield className="mr-2 h-4 w-4" />
              Security Settings
            </Button>

            <SignOutButton>
              <Button variant="destructive" className="w-full justify-start">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </SignOutButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};




export function SocialScheduler() {
 

  const [activeTab, setActiveTab] = React.useState("create")
  const { toast } = useToast()
  const [showTutorial, setShowTutorial] = React.useState(false)
  const [showAccountSettings, setShowAccountSettings] = React.useState(false)
  const { user } = useUser()


   //check user registration status
   React.useEffect(()=>{
     
     (async()=>{
      //check if user is registered in the backend
     //If they are not registered register
     if(user){
      const data = await fetch(`${API_URL}/api/check/user/status/${user.id}`)
      let response =   await data.json()
     }
     //TODO handle registration errors
     })()
    
   },[user])

  const tabs: TabConfig[] = [
    {
      id: "create",
      label: "Create Post",
      icon: Plus,
      component: CreatePostTab,
      description: "Create and schedule posts with platform-specific settings"},
      {
        id: "bulk",
        label: "Bulk Schedule",
        icon: Repeat,
        component: BulkScheduleTab,
        description: "Schedule multiple posts across different platforms at once"
      },
      {
        id: "queue",
        label: "Queue",
        icon: Clock,
        component: ScheduleQueueTab,
        description: "View and manage your upcoming scheduled posts"
      },
      {
        id: "scheduled",
        label: "Scheduled",
        icon: CalendarIcon,
        component: ScheduledPostsTab,
        description: "See all your scheduled posts in a calendar view"
      },
      {
        id: "posted",
        label: "Posted",
        icon: CheckSquare,
        component: PostedTab,
        description: "Review your published posts and their performance"
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: BarChart3,
        component: AnalyticsTab,
        badge: "Pro",
        description: "Get detailed insights and analytics for your social media presence"
      },
      {
        id: "drafts",
        label: "Drafts",
        icon: Save,
        component: DraftsTab,
        description: "Save and manage post drafts for later use"
      }
    ]
  
    // Wrap component with PlatformSelector for create and bulk schedule tabs
    const wrapWithPlatformSelector = (Component: React.ComponentType) => {
      return () => (
        <div className="space-y-6">
          {(activeTab === "create" || activeTab === "bulk") && <PlatformSelector />}
          <Component />
        </div>
      );
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                Soso
              </h1>
              <Badge variant="outline" className="text-sm">
                Social Media Scheduler
              </Badge>
            </div>
  
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <HelpCircle className="w-4 h-4" />
                    <span className="hidden md:inline">Help & Guides</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Welcome to Soso</DialogTitle>
                    <DialogDescription>
                      Get started with our comprehensive guides and tutorials.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      {tabs.map(({ label, icon: Icon, id, description }) => (
                        <div key={id} className="flex items-center gap-3 p-4 border rounded-lg">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{label}</h3>
                            <p className="text-sm text-muted-foreground">
                              {description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
  
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <ModeToggle />
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Notification Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setShowAccountSettings(true)}>
                    Account Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
  
              {/* User Button */}
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  }
                }}
              />
            </div>
          </div>
  
          {/* Main Layout with Sidebar */}
          <div className="flex gap-6">
            {/* Left Sidebar */}
           { user && <ConnectedPlatformsSidebar user={user} />}
  
            {/* Main Content */}
            <div className="flex-1">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
                  <TabsList className="grid grid-cols-4 md:grid-cols-7 bg-muted shadow-lg rounded-lg h-auto p-1">
                    {tabs.map(({ id, label, icon: Icon, badge }) => (
                      <TabsTrigger 
                        key={id} 
                        value={id}
                        className="relative data-[state=active]:bg-background data-[state=active]:shadow flex items-center justify-center gap-2 py-2.5"
                      >
                        <Icon className="w-4 h-4" />
                        <span className="hidden md:inline">{label}</span>
                        {badge && (
                          <Badge 
                            variant="secondary" 
                            className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs"
                          >
                            {badge}
                          </Badge>
                        )}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
  
                {tabs.map(({ id, component: Component }) => (
                  <TabsContent key={id} value={id} className="m-0">
                    {wrapWithPlatformSelector(Component)()}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
  
        {/* Mobile Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
          <div className="grid grid-cols-4 gap-1 p-2">
            {tabs.slice(0, 4).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex flex-col items-center justify-center p-2 text-xs ${
                  activeTab === id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                {label}
              </button>
            ))}
          </div>
        </div>
  
        {/* Account Settings Dialog */}
        <AccountSettings 
          open={showAccountSettings} 
          onClose={() => setShowAccountSettings(false)} 
        />
  
        {/* Tutorial Dialog */}
        <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Welcome to Soso</DialogTitle>
              <DialogDescription>
                Let's take a quick tour of all the features available to you.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4">
                {tabs.map(({ label, icon: Icon, id, description }) => (
                  <div key={id} className="flex items-center gap-3 p-4 border rounded-lg">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{label}</h3>
                      <p className="text-sm text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }