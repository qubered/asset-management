import { db } from "@/server/db"

export default async function ModelsPage() {
    const assets = await db.query.assets.findMany()
    const models = await db.query.models.findMany()
    return (
        <div>
            <h1 className="text-2xl font-bold">Models</h1>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Model Name</th>
                        <th className="border px-4 py-2">Assets Using Model</th>
                        <th className="border px-4 py-2">Created</th>
                        <th className="border px-4 py-2">Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map((model) => {
                        const modelAssets = assets.filter(asset => asset.modelId === model.id)
                        return (
                            <tr key={model.id}>
                                <td className="border px-4 py-2 font-bold">{model.id}</td>
                                <td className="border px-4 py-2">{model.name}</td>
                                <td className="border px-4 py-2">
                                    <ul>
                                        {modelAssets.map(asset => (
                                            <li key={asset.id}>{asset.id}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="border px-4 py-2">{model.createdAt.toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{model.updatedAt?.toLocaleDateString()}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}