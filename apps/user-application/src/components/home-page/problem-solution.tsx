import {
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Shield,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ProblemSolution() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Problem Side */}
          <div>
            <Badge className="mb-4 px-3 py-1" variant="destructive">
              The Problem
            </Badge>
            <h2 className="mb-6 font-bold text-3xl tracking-tight sm:text-4xl">
              Broken Links = Lost Revenue
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Every day, businesses lose thousands of dollars because their
              links stop working. Product pages go offline, domains expire, and
              redirect chains break—leaving customers frustrated and revenue
              flowing to competitors.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                <div>
                  <h3 className="mb-1 font-semibold">27% Revenue Loss</h3>
                  <p className="text-muted-foreground text-sm">
                    Average revenue lost due to broken affiliate and marketing
                    links
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingDown className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                <div>
                  <h3 className="mb-1 font-semibold">Poor User Experience</h3>
                  <p className="text-muted-foreground text-sm">
                    Dead links damage trust and drive customers to competitors
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                <div>
                  <h3 className="mb-1 font-semibold">Hidden Costs</h3>
                  <p className="text-muted-foreground text-sm">
                    Manual link checking wastes time and still misses critical
                    failures
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Side */}
          <div>
            <Badge className="mb-4 px-3 py-1">The Solution</Badge>
            <h2 className="mb-6 font-bold text-3xl tracking-tight sm:text-4xl">
              AI-Powered Link Protection
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Our intelligent platform continuously monitors your links,
              automatically detects failures, and keeps your revenue flowing
              with smart backup routing and instant alerts.
            </p>

            <div className="mb-8 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="mb-1 font-semibold">24/7 AI Monitoring</h3>
                  <p className="text-muted-foreground text-sm">
                    Continuous monitoring catches broken links within minutes,
                    not days
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="mb-1 font-semibold">Smart Backup Routing</h3>
                  <p className="text-muted-foreground text-sm">
                    Automatically route traffic to backup destinations when
                    primary links fail
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="mb-1 font-semibold">Revenue Recovery</h3>
                  <p className="text-muted-foreground text-sm">
                    Convert failed clicks into sales with intelligent fallback
                    strategies
                  </p>
                </div>
              </div>
            </div>

            <Button className="w-full sm:w-auto" size="lg">
              Start Protecting Your Revenue
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
