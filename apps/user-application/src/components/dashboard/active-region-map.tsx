import { ChevronDown, Globe } from "lucide-react";
import { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import countries from "world-countries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGeoClickStore } from "@/hooks/geo-clicks-store";
import { groupClicksByMile } from "@/lib/utils";

type Region = {
  id: string;
  name: string;
  projection: {
    scale: number;
    center: [number, number];
  };
};

export function ActiveRegionMap() {
  const { clicks } = useGeoClickStore();

  // Create a map of country codes to regions
  const countryToRegion = useMemo(() => {
    const map = new Map<string, string>();
    countries.forEach((country) => {
      map.set(country.cca2, country.region);
    });
    return map;
  }, []);

  const regions: Region[] = [
    {
      id: "Americas",
      name: "Americas",
      projection: { scale: 250, center: [-80, 0] },
    },
    {
      id: "Europe",
      name: "Europe",
      projection: { scale: 350, center: [30, 54] },
    },
    {
      id: "Africa",
      name: "Africa",
      projection: { scale: 400, center: [20, 0] },
    },
    {
      id: "Asia",
      name: "Asia",
      projection: { scale: 300, center: [100, 30] },
    },
    {
      id: "Oceania",
      name: "Oceania",
      projection: { scale: 500, center: [140, -25] },
    },
  ];

  const [selectedRegion, setSelectedRegion] = useState<string>("Americas");

  const currentRegion =
    regions.find((r) => r.id === selectedRegion) || regions[0];

  // Filter clicks by selected region and group them
  const regionClicks = useMemo(() => {
    const filtered = clicks.filter((click) => {
      const region = countryToRegion.get(click.country);
      return region === selectedRegion;
    });
    return groupClicksByMile(filtered);
  }, [clicks, selectedRegion, countryToRegion]);

  return (
    <Card className="transition-all duration-200 hover:shadow-md lg:col-span-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {currentRegion.name}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                {currentRegion.name}
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {regions.map((region) => (
                <DropdownMenuItem
                  key={region.id}
                  onClick={() => setSelectedRegion(region.id)}
                >
                  {region.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-96 overflow-hidden rounded-lg border border-border bg-muted/30">
          <ComposableMap
            className="h-full w-full"
            height={400}
            projection="geoMercator"
            projectionConfig={{
              scale: currentRegion.projection.scale,
              center: currentRegion.projection.center,
            }}
            width={800}
          >
            <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    fill="#d1d5db"
                    geography={geo}
                    key={geo.rsmKey}
                    stroke="#9ca3af"
                    strokeWidth={0.2}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
            {regionClicks.map((group, index) => {
              const baseRadius = Math.min(2 + group.count * 0.5, 8);
              const maxRadius = Math.min(5 + group.count * 2, 50);
              const secondMaxRadius = Math.min(4 + group.count * 1.5, 25);

              return (
                <Marker
                  coordinates={[group.longitude, group.latitude]}
                  key={index}
                >
                  <g>
                    <circle
                      fill="none"
                      opacity="0"
                      r={maxRadius}
                      stroke="#ef4444"
                      strokeWidth="1"
                    >
                      <animate
                        attributeName="r"
                        dur="1.5s"
                        from={baseRadius}
                        repeatCount="indefinite"
                        to={maxRadius}
                      />
                      <animate
                        attributeName="opacity"
                        dur="1.5s"
                        from="0.8"
                        repeatCount="indefinite"
                        to="0"
                      />
                    </circle>
                    <circle
                      fill="none"
                      opacity="0"
                      r={secondMaxRadius}
                      stroke="#ef4444"
                      strokeWidth="0.5"
                    >
                      <animate
                        attributeName="r"
                        begin="0.5s"
                        dur="1.5s"
                        from={baseRadius}
                        repeatCount="indefinite"
                        to={secondMaxRadius}
                      />
                      <animate
                        attributeName="opacity"
                        begin="0.5s"
                        dur="1.5s"
                        from="0.6"
                        repeatCount="indefinite"
                        to="0"
                      />
                    </circle>
                    <circle fill="#ef4444" r={baseRadius} />
                  </g>
                </Marker>
              );
            })}
          </ComposableMap>

          {/* Legend */}
          <div className="absolute bottom-2 left-2 text-muted-foreground text-xs">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span>Active Users</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
