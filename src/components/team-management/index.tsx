// src/components/team-management/index.tsx
import React from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InviteDialog } from "./invite-dialog";
import { EditDialog } from "./edit-dialog";
import { useTeam } from "@/contexts/team-context";
import { useToast } from "@/components/ui/use-toast";

const roles = {
  admin: {
    label: "Admin",
    description: "Full access to all features",
    badge: "bg-red-100 text-red-800",
  },
  editor: {
    label: "Editor",
    description: "Can create and edit posts",
    badge: "bg-blue-100 text-blue-800",
  },
  viewer: {
    label: "Viewer",
    description: "Can view posts and analytics",
    badge: "bg-gray-100 text-gray-800",
  }
};

export function TeamManagement() {
  const [showInviteDialog, setShowInviteDialog] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState(null);
  const { members, addMember, updateMember, removeMember } = useTeam();
  const { toast } = useToast();

  const handleInvite = (newMember) => {
    addMember(newMember);
    toast({
      title: "Invitation Sent",
      description: `An invitation has been sent to ${newMember.email}`,
    });
  };

  const handleRemoveMember = (id: number) => {
    removeMember(id);
    toast({
      title: "Member Removed",
      description: "The team member has been removed successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Team Management</h2>
          <p className="text-muted-foreground">
            Manage team members and their permissions
          </p>
        </div>
        <Button className="gap-2" onClick={() => setShowInviteDialog(true)}>
          <Plus className="w-4 h-4" />
          Invite Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Manage team members and their roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Platforms</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {roles[member.role].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {member.permissions.create && (
                        <Badge variant="outline" className="text-xs">Create</Badge>
                      )}
                      {member.permissions.edit && (
                        <Badge variant="outline" className="text-xs">Edit</Badge>
                      )}
                      {member.permissions.delete && (
                        <Badge variant="outline" className="text-xs">Delete</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {member.platformPermissions
                        .filter(p => p.access)
                        .map(p => (
                          <Badge key={p.platform} variant="outline" className="text-xs capitalize">
                            {p.platform}
                          </Badge>
                        ))
                      }
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedMember(member)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <InviteDialog
        open={showInviteDialog}
        onOpenChange={setShowInviteDialog}
        onInvite={handleInvite}
        roles={roles}
      />
      
      <EditDialog
        member={selectedMember}
        onOpenChange={() => setSelectedMember(null)}
        onSave={updateMember}
      />
    </div>
  );
}