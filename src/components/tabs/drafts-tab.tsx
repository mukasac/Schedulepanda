// src/components/tabs/drafts-tab.tsx
import React from 'react'
import { Card as UICard, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from 'date-fns'
import { Pencil, Trash2 } from 'lucide-react'
import { PLATFORM_INFO } from '@/constants/platforms'
import { useDrafts } from '@/contexts/drafts-context'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"

export const DraftsTab: React.FC = () => {
  const { drafts, deleteDraft, editDraft } = useDrafts();
  const { toast } = useToast();
  const [draftToDelete, setDraftToDelete] = React.useState<string | null>(null);

  const handleDelete = (draftId: string) => {
    setDraftToDelete(draftId);
  };

  const confirmDelete = () => {
    if (draftToDelete) {
      deleteDraft(draftToDelete);
      toast({
        title: "Draft deleted",
        description: "Your draft has been deleted.",
      });
      setDraftToDelete(null);
    }
  };

  if (!drafts.length) {
    return (
      <div className="flex items-center justify-center h-[200px] text-muted-foreground">
        No drafts found
      </div>
    );
  }

  return (
    <>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-4">
          {drafts.map(draft => {
            const platform = PLATFORM_INFO[draft.platforms?.[0]] || {
              name: draft.platforms?.[0] || 'Unknown',
              icon: "📝",
              Component: Pencil
            };
            
            return (
              <UICard key={draft.id} className="bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{platform.icon}</span>
                      <span className="font-medium">{platform.name}</span>
                      {draft.platforms.length > 1 && (
                        <span className="text-sm text-muted-foreground">
                          +{draft.platforms.length - 1} more
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editDraft(draft.id)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(draft.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="mt-2 text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(draft.createdAt), { addSuffix: true })}
                  </p>
                  
                  <p className="mt-4 text-sm line-clamp-3">{draft.content}</p>
                  
                  {draft.media && draft.media.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {draft.media.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Draft media ${index + 1}`}
                          className="w-full h-20 object-cover rounded-md"
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </UICard>
            );
          })}
        </div>
      </ScrollArea>

      <AlertDialog open={!!draftToDelete} onOpenChange={() => setDraftToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this draft. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DraftsTab;