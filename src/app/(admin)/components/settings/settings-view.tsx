// src/app/(admin)/components/settings/settings-view.tsx
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { 
  Shield, 
  Database, 
  Bell, 
  Mail,
  Save,
  Globe,
  Key,
  Clock
} from 'lucide-react'

export function SettingsView() {
  const [autoModeration, setAutoModeration] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [backupFrequency, setBackupFrequency] = useState("daily")

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">System Settings</h2>
        <p className="text-muted-foreground">
          Manage your system preferences and configurations
        </p>
      </div>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle>Security Settings</CardTitle>
          </div>
          <CardDescription>
            Configure security and authentication settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Require 2FA for all admin accounts
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Session Timeout</Label>
              <p className="text-sm text-muted-foreground">
                Automatically logout after inactivity
              </p>
            </div>
            <Select defaultValue="30">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Content Moderation Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <CardTitle>Content Moderation</CardTitle>
          </div>
          <CardDescription>
            Configure automated content moderation settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Automatic Content Moderation</Label>
              <p className="text-sm text-muted-foreground">
                Enable AI-powered content screening
              </p>
            </div>
            <Switch 
              checked={autoModeration}
              onCheckedChange={setAutoModeration}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Sensitivity Level</Label>
              <p className="text-sm text-muted-foreground">
                Set content filtering sensitivity
              </p>
            </div>
            <Select defaultValue="medium">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>
            Configure system and email notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive important updates via email
              </p>
            </div>
            <Switch 
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          {emailNotifications && (
            <div className="space-y-2">
              <Label>Notification Email</Label>
              <Input 
                type="email" 
                placeholder="admin@example.com" 
                defaultValue="admin@example.com"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Backup Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            <CardTitle>Backup & Data</CardTitle>
          </div>
          <CardDescription>
            Configure system backup and data retention settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Automatic Backups</Label>
              <p className="text-sm text-muted-foreground">
                Schedule automated system backups
              </p>
            </div>
            <Select 
              value={backupFrequency}
              onValueChange={setBackupFrequency}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Data Retention</Label>
              <p className="text-sm text-muted-foreground">
                Set how long to keep historical data
              </p>
            </div>
            <Select defaultValue="90">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="180">180 days</SelectItem>
                <SelectItem value="365">1 year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full mt-4">
            <Database className="mr-2 h-4 w-4" />
            Backup Now
          </Button>
        </CardContent>
      </Card>

      {/* API Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            <CardTitle>API Configuration</CardTitle>
          </div>
          <CardDescription>
            Manage API keys and access settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>API Key</Label>
            <div className="flex gap-2">
              <Input 
                type="password" 
                value="sk_live_example_key_123456789"
                readOnly
                className="font-mono"
              />
              <Button variant="outline">
                Regenerate
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>API Rate Limiting</Label>
              <p className="text-sm text-muted-foreground">
                Limit API requests per minute
              </p>
            </div>
            <Select defaultValue="100">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select limit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50">50 req/min</SelectItem>
                <SelectItem value="100">100 req/min</SelectItem>
                <SelectItem value="200">200 req/min</SelectItem>
                <SelectItem value="500">500 req/min</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* System Maintenance */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <CardTitle>System Maintenance</CardTitle>
          </div>
          <CardDescription>
            Configure system maintenance and cleanup settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">
                Enable maintenance mode for system updates
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto Cleanup</Label>
              <p className="text-sm text-muted-foreground">
                Automatically remove old logs and temporary files
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Maintenance Window</Label>
              <p className="text-sm text-muted-foreground">
                Set preferred maintenance time
              </p>
            </div>
            <Select defaultValue="night">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="night">Night (00:00-04:00)</SelectItem>
                <SelectItem value="morning">Morning (04:00-08:00)</SelectItem>
                <SelectItem value="custom">Custom Schedule</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <Button className="min-w-[200px]">
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>
    </div>
  )
}