import { ArrowRight, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CtaSection() {
  return (
    <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-bold text-3xl tracking-tight sm:text-4xl lg:text-5xl">
            Ready to stop losing revenue to broken links?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Join thousands of businesses protecting their revenue with smart
            link management. Start your free trial today—no credit card
            required.
          </p>

          {/* CTA Form */}
          <div className="mx-auto mb-8 flex max-w-lg flex-col items-center justify-center gap-4 sm:flex-row">
            <Input
              className="h-12 flex-1 text-base"
              placeholder="Enter your email address"
              type="email"
            />
            <Button className="h-12 px-8 sm:px-6" size="lg">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>Setup in 2 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💳</span>
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
