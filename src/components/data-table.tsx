import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { useState } from "react";
import { ArrowUpDown, Grid3x3, SquareKanban } from "lucide-react";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface SortableColumnHeaderProps<TData> {
  column: Column<TData, unknown>;
  label: string;
}

interface PaginationProps {
  table: ReturnType<typeof useReactTable<any>>;
}

interface FilterTableProps {
  table: ReturnType<typeof useReactTable<any>>;
  className?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      {/* {data.length > 0 && <Filter table={table} />} */}

      <div className="rounded-md border">
        <TableCaption className="flex items-baseline justify-between px-4">
          <div className="flex items-center justify-center gap-2">
            <Grid3x3 size={16} />
            Table View
          </div>

          <Tabs defaultValue="tableView" className="w-max-[200px]">
            <TabsList>
              <TabsTrigger value="tableView" title="Table View">
                <Grid3x3 size={16} />
              </TabsTrigger>
              <TabsTrigger value="kanbanView" title="Kanban View">
                <SquareKanban size={16} />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div className="flex items-center justify-center gap-2">
                <Grid3x3 size={16} />
                Table View
              </div>
            </TabsContent>
            <TabsContent value="account">
              <div className="flex items-center justify-center gap-2">
                <Grid3x3 size={16} />
                Table View
              </div>
            </TabsContent>
          </Tabs>
        </TableCaption>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {data.length > 0 && <Pagination table={table} />}
    </>
  );
}

export const Pagination: React.FC<PaginationProps> = ({ table }) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  );
};

export const SortableColumnHeader = <TData,>({
  column,
  label,
}: SortableColumnHeaderProps<TData>) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export const Filter: React.FC<FilterTableProps> = ({ className, table }) => {
  return (
    <div className={`flex items-center py-4 ${className}`}>
      <Input
        placeholder="Filter emails..."
        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("email")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
    </div>
  );
};
