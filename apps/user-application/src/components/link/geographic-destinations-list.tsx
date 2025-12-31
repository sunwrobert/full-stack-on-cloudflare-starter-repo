import type { DestinationsSchemaType } from "@repo/data-ops/zod-schema/links";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import iso31661 from "iso-3166-1";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { queryClient, trpc } from "@/router";

interface GeographicDestinationsListProps {
  linkId: string;
  destinations: DestinationsSchemaType;
}

export function GeographicDestinationsList({
  linkId,
  destinations,
}: GeographicDestinationsListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const updateDestinationMutation = useMutation(
    trpc.links.updateLinkDestinations.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.links.getLink.queryKey({
            linkId,
          }),
        });
        toast.success("Removed destination successfully");
      },
      onError: () => {
        toast.error("Failed to remove destination");
      },
    })
  );

  const removeDestination = (countryCode: string) => {
    const updatedDestinations = { ...destinations };
    delete updatedDestinations[countryCode];

    updateDestinationMutation.mutate({
      linkId,
      destinations: updatedDestinations,
    });
  };

  const countries = iso31661.all();

  const getCountryNameByCode = (code: string) => {
    const country = countries.find((c) => c.alpha2 === code);
    return country?.country || code;
  };

  // Get all country codes except 'default' and sort by country name
  const sortedCountryEntries = useMemo(() => {
    const countryEntries = Object.entries(destinations).filter(
      ([key]) => key !== "default"
    );

    return countryEntries.sort(([codeA], [codeB]) => {
      const nameA = getCountryNameByCode(codeA);
      const nameB = getCountryNameByCode(codeB);
      return nameA.localeCompare(nameB);
    });
  }, [destinations]);

  // Filter by search query
  const filteredCountryEntries = useMemo(() => {
    if (!searchQuery) return sortedCountryEntries;

    return sortedCountryEntries.filter(([countryCode]) => {
      const countryName = getCountryNameByCode(countryCode);
      return countryName.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [sortedCountryEntries, searchQuery]);

  const showSearch = sortedCountryEntries.length > 5;

  return (
    <div className="space-y-3">
      <Label className="font-medium text-sm">Country-Specific Routes</Label>
      {showSearch && (
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            className="pl-10"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search countries..."
            value={searchQuery}
          />
        </div>
      )}
      <AnimatePresence mode="popLayout">
        {filteredCountryEntries.map(([countryCode, url]) => (
          <motion.div
            animate={{ opacity: 1, height: "auto", marginBottom: 12 }}
            className="flex items-center gap-3 overflow-hidden rounded-lg border bg-muted/50 p-4"
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            key={countryCode}
            layout
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              layout: { duration: 0.2 },
            }}
          >
            <Badge variant="secondary">
              {getCountryNameByCode(countryCode)}
            </Badge>
            <div className="flex-1 rounded border px-3 py-2 font-mono text-muted-foreground text-sm">
              {url}
            </div>
            <Button
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              disabled={updateDestinationMutation.isPending}
              onClick={() => removeDestination(countryCode)}
              size="sm"
              variant="ghost"
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
