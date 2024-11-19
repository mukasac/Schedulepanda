// src/components/social-scheduler.tsx
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
  Users 
} from "lucide-react"
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
} from "@/components/ui/dialog"
import { useToast } from "./ui/use-toast"

interface TabConfig {
  id: string;
  label: string;
  icon: React.ElementType;
  component: React.ComponentType;
  badge?: string;
  description?: string;
}

export function SocialScheduler() {
  const [activeTab, setActiveTab] = React.useState("create")
  const { toast } = useToast()
  const [showTutorial, setShowTutorial] = React.useState(false)

  const tabs: TabConfig[] = [
    {
      id: "create",
      label: "Create Post",
      icon: Plus,
      component: CreatePostTab,
      description: "Create and schedule posts with platform-specific settings"
    },
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
    },
    {
      id: "team",
      label: "Team",
      icon: Users,
      component: TeamManagementTab,
      description: "Manage team members and platform permissions"
    }
  ]

  const handleHelpClick = () => {
    setShowTutorial(true)
    toast({
      title: "Tutorial Mode Activated",
      description: "Follow the guided tour to learn about all features.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
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
                <DropdownMenuItem>
                  Account Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
            <TabsList className="grid grid-cols-4 md:grid-cols-8 bg-muted shadow-lg rounded-lg h-auto p-1">
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
              <Component />
            </TabsContent>
          ))}
        </Tabs>
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