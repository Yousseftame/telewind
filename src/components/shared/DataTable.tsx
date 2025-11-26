import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ChevronDown, ChevronUp, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowBigRightDash } from 'lucide-react';


export type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => any;
};

export type Action<T> = {
  label: string;
  onClick: (row: T) => void;
  hidden?: (row: T) => boolean;
  color?: string;
  icon?: React.ReactNode;
};

export function editAction<T>(handler: (row: T) => void): Action<T> {
  return {
    label: "Edit",
    onClick: handler,
    color: "text-blue-600",
  };
}

export function deleteAction<T>(
  handler: (row: T) => void,
  show?: (row: T) => boolean
): Action<T> {
  return {
    label: "Delete",
    onClick: handler,
    hidden: show ? (row) => !show(row) : undefined,
    color: "text-red-600",
  };
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  actions?: Action<T>[];
  loading?: boolean;

  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;

  showActionsColumn?: boolean;

  pagination?: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
  };

  emptyMessage?: string;
}

export function DataTable<T>({
  columns,
  data,
  actions = [],
  loading = false,

  searchable = false,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search...",

  showActionsColumn = true,

  pagination,

  emptyMessage = "No data found.",
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const sortedData = useMemo(() => {
    if (!sortKey) return data;

    return [...data].sort((a: any, b: any) => {
      if (sortDir === "asc") return a[sortKey] > b[sortKey] ? 1 : -1;
      return a[sortKey] < b[sortKey] ? 1 : -1;
    });
  }, [data, sortKey, sortDir]);

  const toggleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      {searchable && (
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="max-w-sm  searchBtn"
        />
      )}

      {/* Table */}
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              {columns.map((col) => (
                <TableHead
                  key={String(col.key)}
                  className="cursor-pointer select-none"
                  onClick={() => col.sortable && toggleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable &&
                      (sortKey === col.key ? (
                        sortDir === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      ) : (
                        <ChevronDown className="h-4 w-4 opacity-40" />
                      ))}
                  </div>
                </TableHead>
              ))}

              {showActionsColumn && actions.length > 0 && (
                <TableHead className="text-right">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center py-10 text-muted-foreground"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : sortedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center py-10 text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((row, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell key={String(col.key)}>
                      {col.render
                        ? col.render((row as any)[col.key], row)
                        : String((row as any)[col.key])}
                    </TableCell>
                  ))}

                  {showActionsColumn && actions.length > 0 && (
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {actions.map((action, idx) => {
                            if (action.hidden?.(row)) return null;
                            return (
                              <DropdownMenuItem
                                key={idx}
                                onClick={() => action.onClick(row)}
                                className={action.color}
                              >
                                {action.label}
                              </DropdownMenuItem>
                            );
                          })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-muted-foreground">
            Showing page {pagination.pageNumber} of {pagination.totalPages}
          </div>

          <div className="flex gap-2">
  {/* Previous page */}
  <Button
    variant="outline"
    // disabled={pagination.pageNumber === 1}
    className=" rounded-full"
    onClick={() => pagination.onPageChange(pagination.pageNumber - 1)}
  >
    <ArrowBigRightDash className="rotate-180 w-5 h-5" />
  </Button>

  {/* Next page */}
  <Button
    variant="outline"
     className=" rounded-full"
    // disabled={pagination.pageNumber === pagination.totalPages}
    onClick={() => pagination.onPageChange(pagination.pageNumber + 1)}
  >
    <ArrowBigRightDash className="w-5 h-5" />
  </Button>
</div>
        </div>
      )}
    </div>
  );
}
