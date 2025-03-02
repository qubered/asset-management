import { DataTable } from "../../../components/data-table"
import { getAssets, getModels } from "@/server/db/queries"
import { prepareColumnConfig } from "./column-config"
import { TableClientWrapper } from "./table-client-wrapper"
import { Button } from "@/components/ui/button"

async function getData() {
  const assets = await getAssets()
  const models = await getModels()
  
  // Create model mapping
  const modelMapping: Record<number, string> = {}
  models.forEach(model => {
    if (model.id !== null) {
      modelMapping[model.id] = model.name || `Model ${model.id}`
    }
  })
  
  return {
    assets,
    columnConfig: prepareColumnConfig(modelMapping)
  }
}

export default async function TablePage() {
  const { assets, columnConfig } = await getData()

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Assets</h1>
        <Button>Add Asset</Button>
      </div>
      <TableClientWrapper data={assets} columnConfig={columnConfig} />
    </div>
  )
}
