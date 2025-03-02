"use client"

import { DataTable } from "@/components/data-table"
import { columns } from "../columns"
import type { models } from "@/server/db/schema"
import type { ModelMapping } from "./column-config"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { NewDialog } from "@/components/newDialog"
import { NewModelForm } from "../new-model-form"

interface TableClientWrapperProps {
  data: typeof models.$inferSelect[];
  columnConfig: {
    modelMapping: ModelMapping;
  };
  models: typeof models.$inferSelect[];
}

export function TableClientWrapper({ data }: TableClientWrapperProps) {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  
  const handleFormSuccess = () => {
    setIsDialogOpen(false)
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Models</h1>
        <NewDialog 
          title="Add Model" 
          trigger={<Button>Add Model</Button>}
          description="Use this form to add a new model to your inventory."
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        >
          <NewModelForm onSuccess={handleFormSuccess} />
        </NewDialog>
      </div>
      {isPending ? (
        <div className="flex items-center justify-center p-8">
          <p>Loading...</p>
        </div>
      ) : (
        <DataTable 
          columns={columns} 
          data={data} 
        />
      )}
    </div>
  )
} 