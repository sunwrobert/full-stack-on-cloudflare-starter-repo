import { useState } from "react";
import { siGoogle } from "simple-icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

// Mock authClient with dummy data
const authClient = {
  signIn: {
    social: async ({
      provider,
      callbackURL,
    }: {
      provider: string;
      callbackURL: string;
    }) => {
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Fake Action", provider, callbackURL);
    },
  },
};

interface LoginPopupProps {
  children: React.ReactNode;
}

export function LoginPopup({ children }: LoginPopupProps) {
  const [loading, setLoading] = useState(false);
  const signInWithGoogle = async () => {
    setLoading(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/app",
    });
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-4 text-center">
          <DialogTitle className="font-bold text-2xl">
            Continue with Google
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Login or signup by continuing with Google
          </p>
        </DialogHeader>

        <div className="mt-6">
          <Button
            className="group relative h-12 w-full overflow-hidden font-medium text-base transition-colors hover:bg-accent/50"
            disabled={loading}
            onClick={signInWithGoogle}
            variant="outline"
          >
            {loading ? (
              <>
                <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Signing in...
              </>
            ) : (
              <>
                <svg
                  className="mr-3 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={siGoogle.path} />
                </svg>
                Continue with Google
              </>
            )}
          </Button>
        </div>

        <Separator className="my-6" />

        <div className="text-center">
          <p className="text-muted-foreground text-xs leading-relaxed">
            By continuing, you agree to our{" "}
            <a
              className="underline transition-colors hover:text-foreground"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              className="underline transition-colors hover:text-foreground"
              href="#"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
