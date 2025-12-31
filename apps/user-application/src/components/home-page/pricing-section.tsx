import { Check, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const plans = [
  {
    name: "Starter",
    price: "$9",
    period: "/month",
    description: "Perfect for small businesses and content creators",
    features: [
      "1,000 tracked links/month",
      "Basic analytics dashboard",
      "Email notifications",
      "Custom domains (1)",
      "24/7 link monitoring",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$29",
    period: "/month",
    description: "For growing businesses that need advanced features",
    features: [
      "10,000 tracked links/month",
      "Advanced analytics & insights",
      "Geo-based routing",
      "Custom domains (5)",
      "AI-powered monitoring",
      "Backup routing",
      "Slack/Teams integration",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with custom requirements",
    features: [
      "Unlimited tracked links",
      "White-label solution",
      "Advanced security features",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantees",
      "Custom reporting",
      "On-premise deployment",
    ],
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Badge className="mb-4 px-3 py-1" variant="outline">
            Pricing
          </Badge>
          <h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your needs. All plans include our core
            link protection features.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 lg:gap-8">
          {plans.map((plan, index) => (
            <Card
              className={`relative ${plan.popular ? "scale-105 border-primary shadow-lg" : "border-border"} bg-card/50 backdrop-blur`}
              key={index}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                  <Badge className="px-3 py-1">
                    <Star className="mr-1 h-3 w-3" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-8 text-center">
                <CardTitle className="font-bold text-xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="font-bold text-3xl">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription className="mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li className="flex items-start gap-2" key={featureIndex}>
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  size="lg"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.name === "Enterprise"
                    ? "Contact Sales"
                    : "Start Free Trial"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
