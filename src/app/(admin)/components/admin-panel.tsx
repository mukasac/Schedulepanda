// src/app/(admin)/components/admin-panel.tsx
'use client'

import { useState, useEffect } from 'react'
import { DashboardView } from './dashboard/dashboard-view'
import { AnalyticsTab } from '@/components/tabs/analytics-tab'
import { UsersView } from './users/users-view'
import { ModerationView } from './moderation/moderation-view'
import { SettingsView } from './settings/settings-view'
import { useScheduler } from "@/contexts/scheduler-context"
import { useModal } from "@/contexts/modal-context"
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { 
  Users, 
  BarChart3, 
  Shield, 
  Settings, 
  Bell, 
  Search,
  MenuIcon,
  Sun,
  Moon,
  Laptop,
  LogOut,
  UserCog,
  FileText,
  HelpCircle,
  LayoutDashboard,
  CreditCard,
  MessageSquare,
  Settings2,
  UserPlus,
  AlertCircle,
  Globe,
  X  // Add this import
} from 'lucide-react'

interface MenuItem {
  value: string
  label: string
  icon: any
  description?: string
  badge?: string
}

interface Notification {
  id: number
  title: string
  message: string
  type: 'info' | 'warning' | 'error'
  time: string
  read: boolean
}

export default function AdminPanel() {
  const { systemStatus } = useScheduler()
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "System Update",
      message: "New features have been deployed",
      type: "info",
      time: "5 mins ago",
      read: false
    },
    {
      id: 2,
      title: "Rate Limit Warning",
      message: "Twitter API rate limit at 85%",
      type: "warning",
      time: "10 mins ago",
      read: false
    }
  ])

  const menuItems: MenuItem[] = [
    {
      value: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      description: "Overview and real-time metrics"
    },
    {
      value: "analytics",
      label: "Analytics",
      icon: BarChart3,
      description: "Detailed platform analytics",
      badge: "Pro"
    },
    {
      value: "users",
      label: "User Management",
      icon: Users,
      description: "Manage user accounts and roles"
    },
    {
      value: "moderation",
      label: "Content Moderation",
      icon: Shield,
      description: "Review and moderate content"
    },
    {
      value: "messages",
      label: "Messages",
      icon: MessageSquare,
      description: "Platform communications",
      badge: "3"
    },
    {
      value: "subscriptions",
      label: "Subscriptions",
      icon: CreditCard,
      description: "Manage subscription plans"
    },
    {
      value: "settings",
      label: "Settings",
      icon: Settings2,
      description: "Platform configuration"
    }
  ]

  const handleLogout = async () => {
    try {
      // Implement logout logic
      console.log('Logging out...');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  const markAllNotificationsAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notif => ({ ...notif, read: true }))
    )
  }

  const removeNotification = (id: number) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notif => notif.id !== id)
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
            
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">Admin Dashboard</span>
              {systemStatus?.maintenance && (
                <Badge variant="warning" className="text-xs">
                  Maintenance Mode
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex flex-1 items-center justify-end gap-4">
            <div className="w-full max-w-lg">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full md:w-[300px] lg:w-[400px]"
                prefix={<Search className="h-4 w-4 text-muted-foreground" />}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[380px]">
                <DropdownMenuLabel className="flex items-center justify-between">
                  Notifications
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllNotificationsAsRead}
                  >
                    Mark all as read
                  </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea className="h-[300px]">
                  {notifications.map((notif) => (
                    <DropdownMenuItem
                      key={notif.id}
                      className="flex items-start gap-3 p-4"
                    >
                      {notif.type === 'warning' ? (
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      ) : notif.type === 'error' ? (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      ) : (
                        <Globe className="h-5 w-5 text-blue-500" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{notif.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {notif.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notif.time}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeNotification(notif.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </DropdownMenuItem>
                  ))}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuItem>
                  <UserCog className="mr-2 h-4 w-4" />
                  Account settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  Documentation
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Laptop className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-muted-foreground">
                      admin@example.com
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-40 mt-16 w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform lg:translate-x-0 lg:static lg:mt-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            orientation="vertical" 
            className="h-full space-y-8 py-6"
          >
            <TabsList className="grid w-full gap-2 px-4">
              {menuItems.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className="relative w-full justify-start gap-3 px-3 py-2 text-sm font-medium"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge 
                      variant="secondary" 
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Tabs value={activeTab} className="space-y-6">
            <TabsContent value="dashboard" className="space-y-6">
              <DashboardView />
            </TabsContent>
            <TabsContent value="analytics" className="space-y-6">
              <AnalyticsTab />
            </TabsContent>
            <TabsContent value="users" className="space-y-6">
              <UsersView />
            </TabsContent>
            <TabsContent value="moderation" className="space-y-6">
              <ModerationView />
            </TabsContent>
            <TabsContent value="settings" className="space-y-6">
              <SettingsView />
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}