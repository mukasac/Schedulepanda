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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useToast } from "./ui/use-toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Platform {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  status?: 'active' | 'expired' | 'pending';
}

interface TabConfig {
  id: string;
  label: string;
  icon: React.ElementType;
  component: React.ComponentType;
  badge?: string;
  description?: string;
}

// Platform Selector Component for choosing where to post
const PlatformSelector = () => {
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);

  const connectedPlatforms: Platform[] = [
    { id: 'twitter', name: 'Twitter', icon: '𝕏', connected: true },
    { id: 'instagram', name: 'Instagram', icon: '📸', connected: true },
    { id: 'facebook', name: 'Facebook', icon: '👤', connected: true },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', connected: true }
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(current =>
      current.includes(platformId)
        ? current.filter(id => id !== platformId)
        : [...current, platformId]
    );
  };

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
                <span className="mr-1">{platform.icon}</span>
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
                      <span className="mr-2">{platform.icon}</span>
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

// Connected Platforms Sidebar Component (for managing platform connections)
const ConnectedPlatformsSidebar = () => {
  const [platforms, setPlatforms] = React.useState<Platform[]>([
    { id: 'twitter', name: 'Twitter', icon: '𝕏', connected: false, status: 'expired' },
    { id: 'instagram', name: 'Instagram', icon: '📸', connected: false, status: 'expired' },
    { id: 'facebook', name: 'Facebook', icon: '👤', connected: false, status: 'expired' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', connected: false, status: 'expired' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', connected: false, status: 'expired' },
    { id: 'pinterest', name: 'Pinterest', icon: '📌', connected: false, status: 'expired' }
  ]);

  const [showPlatformSettings, setShowPlatformSettings] = React.useState(false);
  const { toast } = useToast();

  const handleConnectPlatform = (platformId: string) => {
    // In a real app, this would trigger the OAuth flow
    setPlatforms(current =>
      current.map(p =>
        p.id === platformId
          ? { ...p, connected: true, status: 'active' as const }
          : p
      )
    );
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
              {platforms.map(platform => (
                <div 
                  key={platform.id}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
                      {platform.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{platform.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {platform.connected ? 'Connected' : 'Not connected'}
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant={platform.connected ? "outline" : "secondary"}
                    size="sm"
                    onClick={() => platform.connected 
                      ? handleDisconnectPlatform(platform.id)
                      : handleConnectPlatform(platform.id)
                    }
                  >
                    {platform.connected ? (
                      <LogOut className="w-4 h-4" />
                    ) : (
                      <Link className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              ))}
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
                      {platform.icon}
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
                <DropdownMenuItem>
                  Account Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main Layout with Sidebar */}
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <ConnectedPlatformsSidebar />

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