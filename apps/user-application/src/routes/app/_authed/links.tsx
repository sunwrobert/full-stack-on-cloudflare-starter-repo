import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/router";

export const Route = createFileRoute("/app/_authed/links")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(
      context.trpc.links.linkList.queryOptions({})
    );
  },
});

function RouteComponent() {
  const { data: links } = useSuspenseQuery(
    trpc.links.linkList.queryOptions({})
  );
  const nav = useNavigate();

  const columnHelper = createColumnHelper<(typeof links)[0]>();
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Link copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => <div className="pl-4">{info.getValue()}</div>,
    }),
    columnHelper.accessor("linkId", {
      header: "Link",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <span className="max-w-[200px] truncate">{`https://${import.meta.env.VITE_BACKEND_HOST}/${info.getValue()}`}</span>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard(
                `https://${import.meta.env.VITE_BACKEND_HOST}/${info.getValue()}`
              );
            }}
            size="sm"
            variant="ghost"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      ),
    }),

    columnHelper.accessor("destinations", {
      header: "Destination Links",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: links,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 13,
      },
    },
  });

  return (
    <div className="container mx-auto p-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="pl-4" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  data-state={row.getIsSelected() && "selected"}
                  key={row.id}
                  onClick={() => {
                    nav({
                      to: "/app/link/$id",
                      params: {
                        id: row.original.linkId,
                      },
                    });
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-2 py-4">
        <div className="flex-1 text-muted-foreground text-sm">
          Showing{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => {
              console.log("First page clicked");
              table.setPageIndex(0);
            }}
            size="sm"
            variant="outline"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => {
              console.log("Previous page clicked");
              table.previousPage();
            }}
            size="sm"
            variant="outline"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => {
              console.log("Next page clicked");
              table.nextPage();
            }}
            size="sm"
            variant="outline"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => {
              console.log("Last page clicked");
              table.setPageIndex(table.getPageCount() - 1);
            }}
            size="sm"
            variant="outline"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
