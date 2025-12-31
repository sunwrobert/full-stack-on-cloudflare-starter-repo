import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    number: "99.9%",
    label: "Uptime Guarantee",
    description: "Rock-solid reliability for your links",
  },
  {
    number: "< 100ms",
    label: "Average Response Time",
    description: "Lightning-fast redirects worldwide",
  },
  {
    number: "10,000+",
    label: "Businesses Protected",
    description: "Trusted by companies worldwide",
  },
  {
    number: "$2.3M",
    label: "Revenue Saved",
    description: "Protected from broken links this month",
  },
];

export function StatsSection() {
  return (
    <section className="bg-primary/5 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-bold text-2xl tracking-tight sm:text-3xl">
            Trusted by businesses worldwide
          </h2>
          <p className="text-muted-foreground">
            Join thousands of companies protecting their revenue with our
            platform
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card
              className="border-0 bg-card/50 text-center backdrop-blur"
              key={index}
            >
              <CardContent className="pt-6">
                <div className="mb-1 font-bold text-2xl text-primary sm:text-3xl">
                  {stat.number}
                </div>
                <div className="mb-2 font-semibold text-sm">{stat.label}</div>
                <div className="text-muted-foreground text-xs">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
