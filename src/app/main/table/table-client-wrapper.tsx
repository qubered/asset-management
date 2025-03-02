"use client"

import { DataTable } from "../../../components/data-table"
import { getColumns } from "./columns"
import type { assets } from "@/server/db/schema"
import type { ModelMapping } from "./column-config"

interface TableClientWrapperProps {
  data: typeof assets.$inferSelect[]
  columnConfig: {
    modelMapping: ModelMapping
  }
}

export function TableClientWrapper({ data, columnConfig }: TableClientWrapperProps) {
  const columns = getColumns(columnConfig.modelMapping)
  
  return <DataTable columns={columns} data={data} />
} 