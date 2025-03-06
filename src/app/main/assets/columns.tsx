"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import type { FunctionReturnType } from "convex/server"
import { GetModelByID } from "@/server/convex/dbHelper";

export type Asset = NonNullable<FunctionReturnType<typeof api.assets.getAll>>[number]

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: "assetTag",
    header: "Asset Tag",
  },
  {
    accessorKey: "name",
    header: "Friendly Name",
  },
  {
    accessorKey: "serielNumber",
    header: "Serial Number",
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => {
      const model = row.original.model;
      const modelData = GetModelByID(model);
      return modelData?.name;
    },
  },

  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;
      const categoryData = useQuery(api.categories.getByID, { id: category });
      return categoryData?.name;
    },
  },
  {
    accessorKey: "currentLocation",
    header: "Current Location",
    cell: ({ row }) => {
      const location = row.original.currentLocation;
      const locationData = useQuery(api.locations.getByID, { id: location });
      return locationData?.name;
    },
  },
  {
    accessorKey: "defaultLocation",
    header: "Default Location",
    cell: ({ row }) => {
      const location = row.original.defaultLocation;
      const locationData = useQuery(api.locations.getByID, { id: location });
      return locationData?.name;
    },
  },
]
