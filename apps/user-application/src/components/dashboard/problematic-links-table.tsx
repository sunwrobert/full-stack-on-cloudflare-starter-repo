import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { AlertTriangle, Copy, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/router";

export function ProblematicLinksTable() {
  const navigate = useNavigate();

  const { data: problematicDestinations } = useSuspenseQuery(
    trpc.evaluations.problematicDestinations.queryOptions()
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleRowClick = (linkId: string) => {
    navigate({
      to: "/app/link/$id",
      params: {
        id: linkId,
      },
    });
  };

  return (
    <Card className="flex h-64 flex-col transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          Problematic Links
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Info</TableHead>
                <TableHead className="text-right">Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {problematicDestinations.map((destination) => (
                <TableRow
                  className="cursor-pointer hover:bg-muted/50"
                  key={destination.id}
                  onClick={() => handleRowClick(destination.linkId)}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="max-w-xs truncate">
                        {destination.destinationUrl}
                      </div>
                      <Button
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(destination.destinationUrl);
                        }}
                        size="sm"
                        variant="ghost"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center rounded-full border border-destructive/20 bg-destructive/10 px-2 py-1 font-medium text-destructive text-xs">
                      Product not available
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted/70"
                      title={destination.reason}
                    >
                      <Info className="h-3 w-3" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {new Date(
                      destination.createdAt.replace(" ", "T") + "Z"
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
