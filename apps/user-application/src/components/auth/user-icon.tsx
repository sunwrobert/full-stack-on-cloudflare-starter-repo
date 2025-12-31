import { LogOut, User } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock authClient with dummy data
const authClient = {
  useSession: () => ({
    data: {
      user: {
        name: "John Doe",
        email: "john.doe@example.com",
        image: "https://github.com/shadcn.png",
      },
    },
    isPending: false,
  }),
  signOut: async ({
    fetchOptions,
  }: {
    fetchOptions: { onSuccess: () => void };
  }) => {
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    fetchOptions.onSuccess();
  },
};

type UserProfilePopupProps = {
  data: Awaited<ReturnType<typeof authClient.useSession>>["data"];
  children: React.ReactNode;
};

function UserProfilePopup({ data, children }: UserProfilePopupProps) {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.reload();
        },
      },
    });
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-4 text-center">
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="h-16 w-16">
              {data?.user.image && (
                <AvatarImage
                  alt={data.user.name || "User"}
                  src={data.user.image}
                />
              )}
              <AvatarFallback>
                {data?.user.name ? (
                  data.user.name.charAt(0).toUpperCase()
                ) : (
                  <User className="h-8 w-8" />
                )}
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="font-semibold text-xl">
                {data?.user.name || "User"}
              </DialogTitle>
              {data?.user.email && (
                <p className="text-muted-foreground text-sm">
                  {data.user.email}
                </p>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6">
          <Button
            className="h-12 w-full font-medium text-base transition-colors hover:border-destructive/20 hover:bg-destructive/10 hover:text-destructive"
            disabled={loading}
            onClick={handleLogout}
            variant="outline"
          >
            {loading ? (
              <>
                <div className="mr-3 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Signing out...
              </>
            ) : (
              <>
                <LogOut className="mr-3 h-4 w-4" />
                Sign out
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function UserCircle() {
  const { data: user, isPending: loading } = authClient.useSession();

  if (loading) {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />;
  }

  if (!user) {
    return null;
  }

  return (
    <UserProfilePopup data={user}>
      <Button className="relative h-8 w-8 rounded-full" variant="ghost">
        <Avatar className="h-8 w-8">
          {user.user.image && (
            <AvatarImage alt={user.user.name || "User"} src={user.user.image} />
          )}
          <AvatarFallback>
            {user.user.name ? (
              user.user.name.charAt(0).toUpperCase()
            ) : (
              <User className="h-4 w-4" />
            )}
          </AvatarFallback>
        </Avatar>
      </Button>
    </UserProfilePopup>
  );
}

export function UserTab() {
  const { data, isPending: loading } = authClient.useSession();

  if (loading) {
    return (
      <div className="flex items-center gap-3 p-3">
        <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
        <div className="flex flex-col gap-1">
          <div className="h-3 w-16 animate-pulse rounded bg-muted" />
          <div className="h-2 w-24 animate-pulse rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <UserProfilePopup data={data}>
      <Button
        className="flex w-full items-center justify-start gap-3 p-2"
        variant="ghost"
      >
        <Avatar className="h-8 w-8">
          {data.user.image && (
            <AvatarImage alt={data.user.name || "User"} src={data.user.image} />
          )}
          <AvatarFallback>
            {data.user.name ? (
              data.user.name.charAt(0).toUpperCase()
            ) : (
              <User className="h-4 w-4" />
            )}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-left">
          <span className="font-medium text-sm">
            {data.user.name || "User"}
          </span>
          {data.user.email && (
            <span className="text-muted-foreground text-xs">
              {data.user.email}
            </span>
          )}
        </div>
      </Button>
    </UserProfilePopup>
  );
}
