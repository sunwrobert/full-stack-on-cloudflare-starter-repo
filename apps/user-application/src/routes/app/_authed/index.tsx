import { createFileRoute } from "@tanstack/react-router";
import {
  ActiveAreasMap,
  ActiveLinksTable,
  ActiveRegionMap,
  MetricsCards,
  ProblematicLinksTable,
  TopCountriesTable,
} from "@/components/dashboard";
import { useClickSocket } from "@/hooks/clicks-socket";

export const Route = createFileRoute("/app/_authed/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.prefetchQuery(
        context.trpc.links.activeLinks.queryOptions()
      ),
      context.queryClient.prefetchQuery(
        context.trpc.links.totalLinkClickLastHour.queryOptions()
      ),
      context.queryClient.prefetchQuery(
        context.trpc.links.last24HourClicks.queryOptions()
      ),
      context.queryClient.prefetchQuery(
        context.trpc.links.last30DaysClicks.queryOptions()
      ),
      context.queryClient.prefetchQuery(
        context.trpc.evaluations.problematicDestinations.queryOptions()
      ),
      context.queryClient.prefetchQuery(
        context.trpc.links.clicksByCountry.queryOptions()
      ),
    ]);
  },
});

function RouteComponent() {
  const { isConnected } = useClickSocket();

  return (
    <div className="flex w-full min-w-0">
      <main className="min-w-0 flex-1">
        <div className="container mx-auto max-w-full space-y-6 p-6">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-3xl tracking-tight">Dashboard</h1>
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
              />
              <span className="text-muted-foreground text-sm">
                {isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>

          {/* Metrics Cards */}
          <MetricsCards />

          {/* Map and Geography Section */}
          <div className="grid gap-6 lg:grid-cols-2">
            <ActiveRegionMap />
            <ActiveAreasMap />
          </div>

          {/* Cities and Issues Section */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="min-w-0">
              <TopCountriesTable />
            </div>
            <div className="min-w-0">
              <ProblematicLinksTable />
            </div>
          </div>

          {/* Active Links Table */}
          <ActiveLinksTable />
        </div>
      </main>
    </div>
  );
}
