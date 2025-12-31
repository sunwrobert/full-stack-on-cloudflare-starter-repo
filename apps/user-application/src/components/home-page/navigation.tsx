import { LoginPopup } from "@/components/auth/login-popup";
import { UserCircle } from "@/components/auth/user-icon";
import { Button } from "@/components/ui/button";
// import { authClient } from "@/components/auth/client";

export function Navigation() {
  // const { data: user, isPending } = authClient.useSession();

  // Dummy data for auth client
  const user = { id: "1", name: "John Doe", email: "john@example.com" };
  const isPending = false;

  return (
    <nav className="fixed top-4 left-1/2 z-50 mx-auto w-full max-w-4xl -translate-x-1/2 transform px-4">
      <div className="rounded-full border border-border/50 bg-background/80 px-6 py-3 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between">
          {/* Company Logo/Name */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="font-bold text-primary-foreground text-sm">
                SL
              </span>
            </div>
            <span className="font-semibold text-foreground">SmrtLnks</span>
          </div>
          {isPending ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
          ) : user ? (
            <UserCircle />
          ) : (
            <LoginPopup>
              {/* Login Button */}
              <Button
                className="bg-primary hover:bg-primary/80"
                size="sm"
                variant="default"
              >
                Login
              </Button>
            </LoginPopup>
          )}
        </div>
      </div>
    </nav>
  );
}
