import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  DefaultUrlEditor,
  GeoRoutingSection,
  GeoRoutingToggle,
  LinkNameEditor,
} from "@/components/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/router";

export const Route = createFileRoute("/app/_authed/link/$id")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    await context.queryClient.prefetchQuery(
      context.trpc.links.getLink.queryOptions({
        linkId: params.id,
      })
    );
  },
});

function RouteComponent() {
  const { id } = Route.useParams();

  const { data: linkInfo } = useSuspenseQuery(
    trpc.links.getLink.queryOptions({
      linkId: id,
    })
  );

  const [geoToggle, setGeoToggle] = useState(
    linkInfo ? Object.keys(linkInfo.destinations).length > 1 : false
  );

  if (!linkInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted to-muted/50 p-6">
        <div className="w-full space-y-8">
          <div>
            <h1 className="font-bold text-3xl tracking-tight">
              Link Dashboard
            </h1>
            <p className="mt-2 text-muted-foreground">
              Loading link information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen via-muted to-muted/50 p-6">
      <div className="w-full space-y-8">
        {/* Header Section */}
        <div>
          <h1 className="font-bold text-3xl tracking-tight">Link Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor and manage your smart link performance
          </p>
        </div>

        {/* Link Configuration */}
        <Card className="shadow-xl">
          <CardHeader className="pb-8">
            <CardTitle className="font-semibold text-2xl">
              Link Configuration
            </CardTitle>
            <CardDescription className="text-base">
              Manage your link settings and routing preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <LinkNameEditor initialName={linkInfo.name} linkId={id} />

            <Separator />
            <DefaultUrlEditor
              destinations={linkInfo.destinations}
              linkId={linkInfo.linkId}
            />
            <GeoRoutingToggle
              destinations={linkInfo.destinations}
              geoToggle={geoToggle}
              linkId={linkInfo.linkId}
              setGeoToggle={setGeoToggle}
            />

            <GeoRoutingSection
              destinations={linkInfo.destinations}
              geoToggle={geoToggle}
              linkId={linkInfo.linkId}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
