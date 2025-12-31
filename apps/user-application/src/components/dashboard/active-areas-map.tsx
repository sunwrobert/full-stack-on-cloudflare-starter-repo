import { Globe } from "lucide-react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGeoClickStore } from "@/hooks/geo-clicks-store";
import { groupClicksByMile } from "@/lib/utils";

export function ActiveAreasMap() {
  const { clicks } = useGeoClickStore();

  const groupedClicks = groupClicksByMile(clicks);

  return (
    <Card className="transition-all duration-200 hover:shadow-md lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Active Areas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-96 overflow-hidden rounded-lg border border-border bg-muted/30">
          <ComposableMap
            className="h-full w-full"
            height={400}
            projection="geoMercator"
            projectionConfig={{
              scale: 100,
              center: [0, 20],
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
            {groupedClicks.map((group, index) => {
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
