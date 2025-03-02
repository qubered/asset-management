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
        return []
    }
    const returnedModels = await db.query.models.findMany({
        where: eq(models.orgId, orgId)
    })
    return returnedModels
}

export { getAssets, getModels }