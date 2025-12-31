import type { DestinationsSchemaType } from "@repo/data-ops/zod-schema/links";
import { useMutation } from "@tanstack/react-query";
import { Check, Edit3 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/router";

interface DefaultUrlEditorProps {
  destinations: DestinationsSchemaType;
  linkId: string;
  label?: string;
  description?: string;
  onSave?: (url: string) => void;
}

export function DefaultUrlEditor({
  destinations,
  linkId,
  label = "Default URL",
  description = "This URL will be used for visitors from countries not listed below",
  onSave,
}: DefaultUrlEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [url, setUrl] = useState(destinations.default);

  const updateDestinationMutation = useMutation(
    trpc.links.updateLinkDestinations.mutationOptions({
      onSettled: () => {},
    })
  );

  const handleSave = () => {
    setIsEditing(false);
    updateDestinationMutation.mutate({
      linkId,
      destinations: {
        ...destinations,
        default: url,
      },
    });
    onSave?.(url);
    console.log("Saving default URL...");
  };

  return (
    <div className="space-y-3">
      <Label className="font-medium text-sm" htmlFor="defaultUrl">
        {label}
      </Label>
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}
      {isEditing ? (
        <div className="flex items-center gap-2">
          <Input
            className="h-12 flex-1 text-base"
            id="defaultUrl"
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            type="url"
            value={url}
          />
          <Button className="h-12 px-3" onClick={handleSave} size="sm">
            <Check className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-4">
          <code className="flex-1 text-muted-foreground text-sm">{url}</code>
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
