// src/components/create-post/platform-selector.tsx
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Video,
  Plus,
  ExternalLink,
  Check,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Platform {
  id: string;
  name: string;
  icon: any;
  connected: boolean;
  status: 'active' | 'expired' | 'disconnected';
  accountName?: string;
  lastSync?: string;
}

export function PlatformSelector() {
  const [platforms, setPlatforms] = React.useState<Platform[]>([
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      connected: true,
      status: 'active',
      accountName: 'Your Page Name',
      lastSync: '2 hours ago'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      connected: true,
      status: 'active',
      accountName: '@youraccount',
      lastSync: '1 hour ago'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      connected: false,
      status: 'disconnected'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      connected: true,
      status: 'expired',
      accountName: 'Your Company Page',
      lastSync: '30 days ago'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: Video,
      connected: false,
      status: 'disconnected'
    }
  ]);

  const [showAddPlatform, setShowAddPlatform] = React.useState(false);

  const handleConnect = (platformId: string) => {
    // In a real app, this would trigger the OAuth flow
    setPlatforms(platforms.map(p => 
      p.id === platformId
        ? { ...p, connected: true, status: 'active', lastSync: 'just now' }
        : p
    ));
  };

  const handleDisconnect = (platformId: string) => {
    setPlatforms(platforms.map(p => 
      p.id === platformId
        ? { ...p, connected: false, status: 'disconnected', accountName: undefined, lastSync: undefined }
        : p
    ));
  };

  const getStatusColor = (status: Platform['status']) => {
    switch (status) {
      case 'active':
        return 'text-green-500';
      case 'expired':
        return 'text-yellow-500';
      case 'disconnected':
        return 'text-red-500';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Connected Platforms</CardTitle>
              <CardDescription>
                Manage your social media connections
              </CardDescription>
            </div>
            <Dialog open={showAddPlatform} onOpenChange={setShowAddPlatform}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Platform
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Platform</DialogTitle>
                  <DialogDescription>
                    Connect your social media accounts to start posting
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {platforms.filter(p => !p.connected).map((platform) => (
                    <div
                      key={platform.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <platform.icon className="w-5 h-5" />
                        <span className="font-medium">{platform.name}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => {
                          handleConnect(platform.id);
                          setShowAddPlatform(false);
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {platforms.filter(p => p.connected).map((platform) => (
              <div
                key={platform.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <platform.icon className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{platform.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {platform.accountName}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-right">
                    <div className={cn("flex items-center gap-1", getStatusColor(platform.status))}>
                      {platform.status === 'active' && <Check className="w-4 h-4" />}
                      {platform.status === 'expired' && <AlertCircle className="w-4 h-4" />}
                      <span className="capitalize">{platform.status}</span>
                    </div>
                    <div className="text-muted-foreground">
                      {platform.lastSync && `Last sync: ${platform.lastSync}`}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-100"
                    onClick={() => handleDisconnect(platform.id)}
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            ))}
            
            {platforms.filter(p => p.connected).length === 0 && (
              <div className="text-center p-4 text-muted-foreground">
                No platforms connected. Click "Add Platform" to get started.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}