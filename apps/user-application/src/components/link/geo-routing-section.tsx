import type { DestinationsSchemaType } from "@repo/data-ops/zod-schema/links";
import { MapPin } from "lucide-react";
import { AddDestinationForm } from "./add-destination-form";
import { GeographicDestinationsList } from "./geographic-destinations-list";

interface GeoRoutingSectionProps {
  destinations: DestinationsSchemaType;
  linkId: string;
  geoToggle: boolean;
}

export function GeoRoutingSection({
  destinations,
  linkId,
  geoToggle,
}: GeoRoutingSectionProps) {
  const usedCountryCodes = Object.keys(destinations);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 font-medium text-foreground text-sm">
        <MapPin className="h-4 w-4" />
        Geographic Destinations
      </div>

      {geoToggle && (
        <>
          <AddDestinationForm
            destinations={destinations}
            linkId={linkId}
            usedCountryCodes={usedCountryCodes}
          />
          <GeographicDestinationsList
            destinations={destinations}
            linkId={linkId}
          />
        </>
      )}
    </div>
  );
}
