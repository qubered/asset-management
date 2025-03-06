"use client"

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api"
import { GetID } from "@/server/convex/dbHelper";
import { useMutation } from "convex/react"
import { toast } from "sonner";
export default function NewAssetPage() {
    const createAsset = useMutation(api.assets.create);
    const currentID = GetID();
    return <div>
        <Button onClick={() => {
            createAsset({
                assetTag: prompt("Enter asset tag") || "",
                name: prompt("Enter asset name") || "",
                serielNumber: prompt("Enter serial number") || "",
                model: prompt("Enter model") || "",
                category: prompt("Enter category") || "",
                currentLocation: prompt("Enter current location") || "",
                defaultLocation: prompt("Enter default location") || "",
                ownerID: currentID,
            })
            toast.success("Asset created successfully");
        }
        }>Create Asset</Button>
    </div >;
}