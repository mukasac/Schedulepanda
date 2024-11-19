// src/components/team-management/edit-dialog.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Video,  // Using Video icon instead of BrandTiktok
} from "lucide-react";
import { type TeamMember, type PlatformPermission } from "@/contexts/team-context";

interface EditDialogProps {
  member: TeamMember | null;
  onOpenChange: (open: boolean) => void;
  onSave: (member: TeamMember) => void;
}

const platformIcons: { [key: string]: any } = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  tiktok: Video,  // Changed to Video icon
};

export function EditDialog({ member, onOpenChange, onSave }: EditDialogProps) {
  if (!member) return null;

  const handlePlatformPermissionChange = (
    platform: string,
    field: keyof PlatformPermission,
    value: boolean
  ) => {
    const updatedMember = { ...member };
    const platformIndex = updatedMember.platformPermissions.findIndex(
      p => p.platform === platform
    );
    
    if (platformIndex !== -1) {
      updatedMember.platformPermissions[platformIndex] = {
        ...updatedMember.platformPermissions[platformIndex],
        [field]: value,
        // If access is turned off, disable all other permissions
        ...(field === 'access' && !value && {
          canPost: false,
          canSchedule: false,
          canAnalyze: false,
        }),
      };
      onSave(updatedMember);
    }
  };

  return (
    <Dialog open={!!member} onOpenChange={() => onOpenChange(false)}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Team Member - {member.name}</DialogTitle>
          <DialogDescription>
            Modify permissions and notification preferences
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="space-y-4">
              <h4 className="text-sm font-medium">General Permissions</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm">Create Posts</label>
                  <Switch 
                    checked={member.permissions.create}
                    onCheckedChange={(checked) => 
                      onSave({
                        ...member,
                        permissions: { ...member.permissions, create: checked }
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Edit Posts</label>
                  <Switch 
                    checked={member.permissions.edit}
                    onCheckedChange={(checked) => 
                      onSave({
                        ...member,
                        permissions: { ...member.permissions, edit: checked }
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Delete Posts</label>
                  <Switch 
                    checked={member.permissions.delete}
                    onCheckedChange={(checked) => 
                      onSave({
                        ...member,
                        permissions: { ...member.permissions, delete: checked }
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Schedule Posts</label>
                  <Switch 
                    checked={member.permissions.schedule}
                    onCheckedChange={(checked) => 
                      onSave({
                        ...member,
                        permissions: { ...member.permissions, schedule: checked }
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="platforms">
            <div className="space-y-6">
              <h4 className="text-sm font-medium">Platform Access</h4>
              <div className="space-y-6">
                {member.platformPermissions.map((platform) => {
                  const Icon = platformIcons[platform.platform];
                  return (
                    <div key={platform.platform} className="space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium capitalize">
                          {platform.platform}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pl-7">
                        <div className="flex items-center justify-between">
                          <label className="text-sm">Access Platform</label>
                          <Switch 
                            checked={platform.access}
                            onCheckedChange={(checked) => 
                              handlePlatformPermissionChange(platform.platform, 'access', checked)
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm">Can Post</label>
                          <Switch 
                            checked={platform.canPost}
                            disabled={!platform.access}
                            onCheckedChange={(checked) => 
                              handlePlatformPermissionChange(platform.platform, 'canPost', checked)
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm">Can Schedule</label>
                          <Switch 
                            checked={platform.canSchedule}
                            disabled={!platform.access}
                            onCheckedChange={(checked) => 
                              handlePlatformPermissionChange(platform.platform, 'canSchedule', checked)
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm">Can View Analytics</label>
                          <Switch 
                            checked={platform.canAnalyze}
                            disabled={!platform.access}
                            onCheckedChange={(checked) => 
                              handlePlatformPermissionChange(platform.platform, 'canAnalyze', checked)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Notification Preferences</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm">Post Published</label>
                  <Switch 
                    checked={member.notifications.postPublished}
                    onCheckedChange={(checked) => 
                      onSave({
                        ...member,
                        notifications: { ...member.notifications, postPublished: checked }
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">New Comments</label>
                  <Switch 
                    checked={member.notifications.comments}
                    onCheckedChange={(checked) => 
                      onSave({
                        ...member,
                        notifications: { ...member.notifications, comments: checked }
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Likes & Reactions</label>
                  <Switch 
                    checked={member.notifications.likes}
                    onCheckedChange={(checked) => 
                      onSave({
                        ...member,
                        notifications: { ...member.notifications, likes: checked }
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Mentions</label>
                  <Switch 
                    checked={member.notifications.mentions}
                    onCheckedChange={(checked) => 
                      onSave({
                        ...member,
                        notifications: { ...member.notifications, mentions: checked }
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}