import { getAssets, getModels, getLocations } from "@/server/db/queries"
import { prepareColumnConfig } from "./_helpers/column-config"
import { TableClientWrapper } from "./_helpers/table-client-wrapper"

// Server component to fetch data
export default async function TablePage() {
  const assets = await getAssets()
  const models = await getModels()
  
  // Create model mapping
  const modelMapping: Record<number, string> = {}
  models.forEach(model => {
    if (model.id !== null) {
      modelMapping[model.id] = model.name ?? `Model ${model.id}`
    }
  })
  const locations = await getLocations()
  // Create enhanced assets with model names
  const enhancedAssets = assets.map(asset => ({
    ...asset,
    // Add derived model name field
    modelName: asset.modelId ? (modelMapping[asset.modelId] ?? `Model ${asset.modelId}`) : "None"
  }))
  
  const columnConfig = prepareColumnConfig(modelMapping)

  return (
    <TableClientWrapper 
      data={enhancedAssets}
      columnConfig={columnConfig} 
      models={models}
      locations={locations}
    />
  )
} 