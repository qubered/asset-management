import { getAssets, getLocations, getModels } from "@/server/db/queries"
import { DashboardClient } from "./dashboard-client"

export default async function DashboardPage() {
  const [assets, locations, models] = await Promise.all([
    getAssets(),
    getLocations(),
    getModels()
  ])

  // Calculate stats
  const stats = {
    totalAssets: assets.length,
    totalLocations: locations.length,
    totalModels: models.length
  }

  // Calculate assets per model
  const assetsPerModel = models.map(model => ({
    name: model.name ?? `Model ${model.id}`,
    value: assets.filter(asset => asset.modelId === model.id).length
  }))

  // Calculate assets per location
  const assetsPerLocation = locations.map(location => ({
    name: location.name ?? `Location ${location.id}`,
    value: assets.filter(asset => asset.location === location.name).length
  }))

  return (
    <DashboardClient 
      stats={stats}
      assetsPerModel={assetsPerModel}
      assetsPerLocation={assetsPerLocation}
    />
  )
} 