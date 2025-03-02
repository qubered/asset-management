import OrgTools from "@/server/clerk/org-tools"
import { db } from "@/server/db"
import { eq } from "drizzle-orm"
import { assets, models } from "@/server/db/schema"

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

export { getAssets, getModels, deleteAsset }