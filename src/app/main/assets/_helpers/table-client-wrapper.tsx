"use client"

import { DataTable } from "../../../../components/data-table"
import { columns } from "../columns"
import type { assets, models, locations } from "@/server/db/schema"
import type { ModelMapping } from "./column-config"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { NewDialog } from "@/components/newDialog"
import { NewAssetForm } from "../new-asset-form"

// Enhanced asset type with modelName
type EnhancedAsset = typeof assets.$inferSelect & { modelName: string };

interface TableClientWrapperProps {
  data: EnhancedAsset[]
  columnConfig: {
    modelMapping: ModelMapping
  }
  models: typeof models.$inferSelect[]
  locations: typeof locations.$inferSelect[]
}

export function TableClientWrapper({ data, columnConfig, models, locations }: TableClientWrapperProps) {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  
  // Handle form submission success
  const handleFormSuccess = () => {
    setIsDialogOpen(false)
    
    // Use startTransition to prevent excessive refreshes
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Assets</h1>
        <NewDialog 
          title="Add Asset" 
          trigger={<Button>Add Asset</Button>}
          description="Use this form to add a new asset to your inventory."
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        >
          <NewAssetForm onSuccess={handleFormSuccess} models={models} locations={locations} />
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