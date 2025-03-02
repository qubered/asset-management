"use client"
 
import { type ColumnDef } from "@tanstack/react-table"
import type { models } from "@/server/db/schema"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { DeleteAlertBox } from "./deleteModelAlertBox"

// Enhanced asset type with modelName field


// Define columns directly in this client component
export const columns: ColumnDef<typeof models.$inferSelect>[] = [
    {
        accessorKey: "id",
        enableResizing: false,
        size: 60,
        minSize: 60,
        maxSize: 60,
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Model ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        accessorKey: "name",
        header: "Name",
        enableResizing: true,
    },
    {
        id: "actions",
        header: "Actions",
        enableResizing: false,
        size: 40,
        minSize: 50,
        maxSize: 50,
        cell: ({ row }) => {
          const model = row.original
     
          return (
            <div className="flex justify-center items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(model.id.toString())}
                >
                  Copy Model ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <DeleteAlertBox id={model.id} />
                </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>
          )
        },
    },
  ]