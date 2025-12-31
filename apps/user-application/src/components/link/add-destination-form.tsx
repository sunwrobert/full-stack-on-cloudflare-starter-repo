import type { DestinationsSchemaType } from "@repo/data-ops/zod-schema/links";
import { useMutation } from "@tanstack/react-query";
import iso31661 from "iso-3166-1";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { queryClient, trpc } from "@/router";

interface AddDestinationFormProps {
  usedCountryCodes: string[];
  linkId: string;
  destinations: DestinationsSchemaType;
}

export function AddDestinationForm({
  usedCountryCodes,
  linkId,
  destinations,
}: AddDestinationFormProps) {
  const [newCountry, setNewCountry] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [open, setOpen] = useState(false);

  const countries = iso31661.all();
  const availableCountries = countries.filter(
    (country) => !usedCountryCodes.includes(country.alpha2)
  );

  const selectedCountry = availableCountries.find(
    (country) => country.alpha2 === newCountry
  );

  const updateDestinationMutation = useMutation(
    trpc.links.updateLinkDestinations.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.links.getLink.queryKey({
            linkId,
          }),
        });
        toast.success("Destination added successfully");
      },
      onError: () => {
        toast.error("Failed to add destination");
      },
    })
  );

  const addGeoDestination = () => {
    if (newCountry && newUrl) {
      const newDest = {
        ...destinations,
        [newCountry]: newUrl,
      };
      updateDestinationMutation.mutate({
        linkId,
        destinations: newDest,
      });
      setNewCountry("");
      setNewUrl("");
    }
  };

  if (availableCountries.length === 0) {
    return (
      <div className="py-4 text-center text-muted-foreground text-sm">
        All available countries have been assigned destinations
      </div>
    );
  }

  return (
    <Card className="border-2 border-dashed bg-muted/30">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="font-medium text-sm">Country</Label>
              <Popover onOpenChange={setOpen} open={open}>
                <PopoverTrigger asChild>
                  <Button
                    aria-expanded={open}
                    className="h-10 w-full justify-between"
                    role="combobox"
                    variant="outline"
                  >
                    {selectedCountry
                      ? selectedCountry.country
                      : "Select country..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search countries..." />
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {availableCountries.map((country) => (
                        <CommandItem
                          key={country.alpha2}
                          onSelect={() => {
                            setNewCountry(
                              country.alpha2 === newCountry
                                ? ""
                                : country.alpha2
                            );
                            setOpen(false);
                          }}
                          value={country.country}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              newCountry === country.alpha2
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {country.country}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label className="font-medium text-sm">Destination URL</Label>
              <Input
                className="h-10"
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://example.com"
                type="url"
                value={newUrl}
              />
            </div>
          </div>
          <Button
            className="h-10 w-full"
            disabled={
              !(newCountry && newUrl) || updateDestinationMutation.isPending
            }
            onClick={addGeoDestination}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Destination
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
