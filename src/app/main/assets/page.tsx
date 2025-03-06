"use client";

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { GetAssets, GetID } from "@/server/convex/dbHelper";

export default function Home() {
  const assets = GetAssets();
  const orgID = GetID();
  return (
    <div>
      <h1>Assets: {orgID}</h1>
      <DataTable columns={columns} data={assets ?? []} />
    </div>
  );
}