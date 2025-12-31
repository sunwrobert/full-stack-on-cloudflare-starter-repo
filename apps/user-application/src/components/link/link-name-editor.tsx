import { useMutation } from "@tanstack/react-query";
import { Check, Edit3, Eye, Link } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { queryClient, trpc } from "@/router";

interface LinkNameEditorProps {
  linkId: string;
  initialName: string;
}

export function LinkNameEditor({ linkId, initialName }: LinkNameEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);

  const nameMutation = useMutation(
    trpc.links.updateLinkName.mutationOptions({
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.links.linkList.queryKey(),
        });
      },
    })
  );

  const handleSave = () => {
    setIsEditing(false);
    nameMutation.mutate({
      linkId,
      name,
    });
  };

  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 font-medium text-sm">
        <Link className="h-4 w-4" />
        Link Name
      </Label>
      {isEditing ? (
        <div className="flex items-center gap-2">
          <Input
            className="h-12 flex-1 text-base"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a memorable name for your link"
            value={name}
          />
          <Button className="h-12 px-3" onClick={handleSave} size="sm">
            <Check className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-4">
          <div className="flex-1 font-medium text-base">{name}</div>
          <Badge className="flex items-center gap-1" variant="secondary">
            <Eye className="h-3 w-3" />
            Active
          </Badge>
          <Button
            className="h-8 w-8 p-0"
            onClick={() => setIsEditing(true)}
            size="sm"
            variant="ghost"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
