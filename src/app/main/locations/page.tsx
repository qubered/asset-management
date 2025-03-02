import { getModels, getLocations } from "@/server/db/queries"
import { prepareColumnConfig } from "./_helpers/column-config"
import { TableClientWrapper } from "./_helpers/table-client-wrapper"
import { ModelMapping } from "./_helpers/column-config"

// Server component to fetch data
export default async function TablePage() {
  const models = await getModels()
  const locations = await getLocations()
  const modelMapping: ModelMapping = {}
  models.forEach(model => {
    modelMapping[model.id] = model.name ?? `Model ${model.id}`
  })
  const columnConfig = prepareColumnConfig(modelMapping)

  return (
    <TableClientWrapper 
      data={locations}
      columnConfig={columnConfig} 
      models={models}
    />
  )
} 