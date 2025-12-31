import { BarChart3, Brain, Globe, Link, Shield, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Link,
    title: "Smart Link Creation",
    description:
      "Create beautiful, trackable short links in seconds with custom domains and branded URLs.",
    badge: "Core Feature",
  },
  {
    icon: Globe,
    title: "Geo-based Routing",
    description:
      "One link, multiple destinations. Route users to different pages based on their location automatically.",
    badge: "Advanced",
  },
  {
    icon: Brain,
    title: "AI Link Monitoring",
    description:
      "Our AI continuously monitors your link destinations to detect broken pages and inactive products.",
    badge: "AI Powered",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Deep insights into click performance, conversion rates, and user behavior across all your links.",
    badge: "Analytics",
  },
  {
    icon: Shield,
    title: "Revenue Protection",
    description:
      "Get instant alerts when links break so you can fix them before losing customers and revenue.",
    badge: "Protection",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Sub-100ms redirect times with our global CDN ensures your users never wait.",
    badge: "Performance",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-muted/30 py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Badge className="mb-4 px-3 py-1" variant="outline">
            Features
          </Badge>
          <h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl">
            Everything you need to protect your revenue
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed to keep your links working and your
            revenue flowing
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                className="group relative border-0 bg-card/50 backdrop-blur transition-all duration-300 hover:shadow-lg"
                key={index}
              >
                <CardHeader className="pb-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="w-fit rounded-lg bg-primary/10 p-2">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge className="text-xs" variant="secondary">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
