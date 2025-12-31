import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/common/app-sidebar";
import { SiteHeader } from "@/components/common/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/app/_authed")({
  component: RouteComponent,
});
function RouteComponent() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset className="flex w-full flex-col">
          <SiteHeader />
          <div className="@container/main flex-1 overflow-auto">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <Outlet />
              <Toaster />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
