// src/components/team-management/invite-dialog.t


import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { defaultPlatformPermissions } from "@/contexts/team-context";

interface InviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInvite: (member: any) => void;
  roles: {
    [key: string]: {
      label: string;
      description: string;
      badge: string;
    };
  };
}

export function InviteDialog({ open, onOpenChange, onInvite, roles }: InviteDialogProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleInvite = () => {
    const newMember = {
      name: email.split('@')[0], // Temporary name from email
      email,
      role,
      avatar: "/api/placeholder/32/32",
      permissions: {
        create: role === 'admin',
        edit: role === 'admin' || role === 'editor',
        delete: role === 'admin',
        schedule: role === 'admin' || role === 'editor',
      },
      platformPermissions: defaultPlatformPermissions.map(p => ({
        ...p,
        access: role === 'admin',
        canPost: role === 'admin' || role === 'editor',
        canSchedule: role === 'admin' || role === 'editor',
        canAnalyze: role === 'admin',
      })),
      notifications: {
        postPublished: true,
        comments: true,
        likes: true,
        mentions: true,
      }
    };

    onInvite(newMember);
    setEmail("");
    setRole("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>
            Send an invitation to join your team
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input 
              placeholder="Email address" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(roles).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleInvite}
            disabled={!email || !role}
          >
            Send Invitation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}