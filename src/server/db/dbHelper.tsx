"use server"

import { createAsset, deleteAsset, getAssetById, getModelById, deleteModel, createModel, getAssetsByModelId, getLocations, deleteLocation, createLocation } from "@/server/db/queries"
import type { assets, locations, models } from "@/server/db/schema"

export async function deleteAssetHelper(id: number) {
    await deleteAsset(id)
}

export async function createAssetHelper(assetInfo: typeof assets.$inferInsert) {
    await createAsset(assetInfo)
}

export async function getAssetByIdHelper(id: number) {
    return await getAssetById(id)
}

export async function getModelByIdHelper(id: number) {
    return await getModelById(id)
}

export async function deleteModelHelper(id: number) {
    await deleteModel(id)
}

export async function createModelHelper(modelInfo: typeof models.$inferInsert) {
    await createModel(modelInfo)
}

export async function deleteAssetFromModelHelper(modelId: number) {
    const assets = await getAssetsByModelId(modelId)
    if (!assets) return
    
    for (const asset of assets) {
        if (asset?.id) {
            await deleteAsset(asset.id)
        }
    }
}

export async function getLocationsHelper() {
    return await getLocations()
}

export async function createLocationHelper(locationInfo: typeof locations.$inferInsert) {
    await createLocation(locationInfo)
}

export async function deleteLocationHelper(id: number) {
    await deleteLocation(id)
}