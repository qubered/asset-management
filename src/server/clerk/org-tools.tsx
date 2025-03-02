import { auth } from '@clerk/nextjs/server'

export default async function OrgTools() {
    const { orgId, userId } = await auth()
    if (!orgId) {
        return { orgId: userId, isOrg: false }
    }
    else {
        return { orgId, isOrg: true }
    }
}