import { db } from "@/server/db"
import { auth } from '@clerk/nextjs/server'
import { eq } from "drizzle-orm"
import { assets, models } from "@/server/db/schema"

export default async function MainPage() {
    const { orgId } = await auth()
    if (!orgId) {
        return <div>No organization selected</div>
    }

    const assetsRes = await db.query.assets.findMany({
        where: eq(assets.orgId, orgId)
    })
    const modelsResult = await db.query.models.findMany({
        where: eq(models.orgId, orgId)
    })
    return (
        <div>
            <h1 className="text-2xl font-bold">Assets</h1>
            {orgId}
            <table>
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Location</th>
                        <th className="border px-4 py-2">Category</th>
                        <th className="border px-4 py-2">Model</th>
                    </tr>
                </thead>
                <tbody>
                    {assetsRes.map((asset) => (
                        <tr key={asset.id}>
                            <td className="border px-4 py-2 font-bold">{asset.id}</td>
                            <td className="border px-4 py-2">{asset.name}</td>
                            <td className="border px-4 py-2">{asset.location}</td>
                            <td className="border px-4 py-2">{asset.category}</td>
                            <td className="border px-4 py-2">{modelsResult.find((model) => model.id === asset.modelId)?.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}