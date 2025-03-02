"use server"

import { deleteAsset } from "@/server/db/queries"

export async function deleteAssetHelper(id: number) {
    await deleteAsset(id)
}