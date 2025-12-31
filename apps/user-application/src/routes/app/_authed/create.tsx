import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Link, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/router";

export const Route = createFileRoute("/app/_authed/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const nav = useNavigate();

  const createMutation = useMutation(
    trpc.links.createLink.mutationOptions({
      onSuccess: (linkId) => {
        nav({
          to: "/app/link/$id",
          params: {
            id: linkId,
          },
        });
      },
      onError: () => {
        toast.error("Failed to create link");
      },
    })
  );

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-muted/50 p-6">
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Main Form */}
        <Card className="shadow-xl">
          <CardHeader className="pb-8">
            <CardTitle className="font-semibold text-2xl">
              Create Link
            </CardTitle>
            <CardDescription className="text-base">
              Create a new short link with a name and destination URL
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Link Name */}
            <div className="space-y-3">
              <Label
                className="flex items-center gap-2 font-medium text-sm"
                htmlFor="name"
              >
                <Link className="h-4 w-4" />
                Link Name
              </Label>
              <Input
                className="h-12 text-base"
                id="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter a memorable name for your link"
                value={name}
              />
            </div>

            {/* URL Input */}
            <div className="space-y-3">
              <Label className="font-medium text-sm" htmlFor="url">
                Destination URL
              </Label>
              <Input
                className="h-12 text-base"
                id="url"
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                type="url"
                value={url}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                className="h-12 w-full text-base shadow-lg transition-all duration-200 hover:shadow-xl"
                disabled={!(name && url && isValidUrl(url))}
                onClick={() => {
                  createMutation.mutate({
                    name,
                    destinations: {
                      default: url,
                    },
                  });
                }}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Create Link
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
