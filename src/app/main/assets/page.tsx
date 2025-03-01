import { db } from "@/server/db"

export default async function MainPage() {
    const assets = await db.query.assets.findMany()
    const models = await db.query.models.findMany()
    return (
        <div>
            <h1 className="text-2xl font-bold">Assets</h1>
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
                    {assets.map((asset) => (
                        <tr key={asset.id}>
                            <td className="border px-4 py-2 font-bold">{asset.id}</td>
                            <td className="border px-4 py-2">{asset.name}</td>
                            <td className="border px-4 py-2">{asset.location}</td>
                            <td className="border px-4 py-2">{asset.category}</td>
                            <td className="border px-4 py-2">{models.find((model) => model.id === asset.modelId)?.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}