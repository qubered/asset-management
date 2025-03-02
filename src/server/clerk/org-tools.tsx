import { auth } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/nextjs/server'
export default async function OrgTools() {
    const { orgId, userId } = await auth()
    const clerk = await clerkClient()

    if (!orgId) {
        const userDetails = await clerk.users.getUser(userId!) 
        return { orgId: userId, fullName: userDetails.fullName ?? "Personal Org", orgDetails: null }
    }
    else {
        const orgDetails = await clerk.organizations.getOrganization({
            organizationId: orgId
        })
        return { orgId, fullName: orgDetails.name, orgDetails: orgDetails }
    }
}