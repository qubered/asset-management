"use client";

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { GetAssets, GetID, GetLastAsset } from "@/server/convex/dbHelper";
import { AssetForm } from "./new-asset-form";
export default function Home() {
  const assets = GetAssets();
  const lastAsset = GetLastAsset();
  const orgID = GetID();
  return (
    <div>
      <h1>Assets: {orgID}</h1>
      <p>Latest: {lastAsset?.assetTag}</p>
      <DataTable columns={columns} data={assets ?? []} />
      <div>
        <AssetForm />
      </div>
    </div>
  );
}