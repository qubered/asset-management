import OrgTools from "@/server/clerk/org-tools"
import { db } from "@/server/db"
import { eq } from "drizzle-orm"
import { assets, models, locations } from "@/server/db/schema"

const currentOrgId = async () => {
    const { orgId } = await OrgTools()
    return orgId
}


const getAssets = async () => {
    const orgId = await currentOrgId()
    if (!orgId) {
        return []
    }
    const returnedAssets = await db.query.assets.findMany({
        where: eq(assets.orgId, orgId)
    })
    return returnedAssets
}

const getModels = async () => {
    const orgId = await currentOrgId()
    if (!orgId) {
        return db.query.models.findMany({
            where: eq(models.id, -1) // Return empty result if no orgId
        })
    }
    return db.query.models.findMany({
        where: (fields, { and, eq }) => and(
            eq(fields.orgId, orgId)
        )
    })
}

const deleteAsset = async (id: number) => {
    const orgId = await currentOrgId()
    if (!orgId) {
        return
    }
    await db.delete(assets).where(eq(assets.id, id))
}

const deleteModel = async (id: number) => {
    const orgId = await currentOrgId()
    if (!orgId) {
        return
    }
    await db.delete(models).where(eq(models.id, id))
}
const createAsset = async (assetInfo: typeof assets.$inferInsert) => {
    const orgId = await currentOrgId()
    if (!orgId) {
        return
    }
    await db.insert(assets).values({
        orgId,
        name: assetInfo.name,
        location: assetInfo.location,
        category: assetInfo.category,
        modelId: assetInfo.modelId,
    })
}

const createModel = async (modelInfo: typeof models.$inferInsert) => {
    const orgId = await currentOrgId()
    if (!orgId) {
        return
    }
    await db.insert(models).values({
        orgId,
        name: modelInfo.name,
    })
}

const getAssetById = async (id: number) => {
    const orgId = await currentOrgId()
    if (!orgId) {
        return
    }
    return await db.query.assets.findFirst({
        where: eq(assets.id, id)
    })
}

const getModelById = async (id: number) => {
    const orgId = await currentOrgId()
    if (!orgId) {
        return
    }
    return await db.query.models.findFirst({
        where: eq(models.id, id)
    })
}

const getAssetsByModelId = async (modelId: number) => {
    const orgId = await currentOrgId()
    if (!orgId) {
        return []
    }
    return await db.query.assets.findMany({
        where: eq(assets.modelId, modelId)
    })
}

const getLocations = async () => {
    const orgId = await currentOrgId()
    if (!orgId) {
        return []
    }
    return await db.query.locations.findMany({
        where: eq(locations.orgId, orgId)
    })
}

const createLocation = async (locationInfo: typeof locations.$inferInsert) => {
    const orgId = await currentOrgId()
    if (!orgId) {
        return
    }
    await db.insert(locations).values({
        orgId,
        name: locationInfo.name,
        parentId: locationInfo.parentId,
    })
}
const deleteLocation = async (id: number) => {
    const orgId = await currentOrgId()
    if (!orgId) {
        return
    }
    await db.delete(locations).where(eq(locations.id, id))
}

export { getAssets, getModels, deleteAsset, createAsset, getAssetById, getModelById, deleteModel, createModel, getAssetsByModelId, getLocations, createLocation, deleteLocation }
