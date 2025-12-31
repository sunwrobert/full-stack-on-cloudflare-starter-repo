import { ArrowRight, Globe, Shield, Sparkles, Zap } from "lucide-react";
import { authClient } from "@/components/auth/client";
import { LoginPopup } from "@/components/auth/login-popup";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  const { data } = authClient.useSession();

  const handleStartFree = () => {
    if (data) {
      window.location.href = "/app";
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 sm:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-grid-white/[0.02]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <Badge
            className="mb-6 border-primary/20 bg-primary/5 px-4 py-2 font-medium text-primary text-sm"
            variant="outline"
          >
            <Sparkles className="mr-2 h-3 w-3" />
            Trusted by 10,000+ businesses worldwide
          </Badge>

          {/* Main headline */}
          <h1 className="mb-6 font-bold text-4xl tracking-tight sm:text-5xl lg:text-6xl">
            Stop Losing Revenue to{" "}
            <span className="bg-gradient-to-r from-primary via-primary to-purple-600 bg-clip-text text-transparent">
              Broken Links
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground leading-relaxed sm:text-xl">
            Smart link management with AI monitoring and geo-routing that keeps
            your traffic flowing and revenue growing.
          </p>

          {/* CTA Section */}
          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="flex w-full max-w-md gap-2 sm:w-auto">
              <Input
                className="h-11 text-base"
                placeholder="Enter your URL to shorten"
              />
              {data ? (
                <Button
                  className="h-11 px-6"
                  onClick={handleStartFree}
                  size="lg"
                >
                  Start Free
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <LoginPopup>
                  <Button className="h-11 px-6" size="lg">
                    Start Free
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </LoginPopup>
              )}
            </div>
          </div>

          {/* Features preview */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>Instant Link Creation</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <span>Geo-based Routing</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>AI Link Monitoring</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
