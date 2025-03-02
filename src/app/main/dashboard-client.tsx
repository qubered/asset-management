"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart } from "@/components/ui/bar-chart"

interface Stats {
  totalAssets: number
  totalLocations: number
  totalModels: number
}

interface ChartData {
  name: string
  value: number
}

interface DashboardClientProps {
  stats: Stats
  assetsPerModel: ChartData[]
  assetsPerLocation: ChartData[]
}

export function DashboardClient({ stats, assetsPerModel, assetsPerLocation }: DashboardClientProps) {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAssets}</div>
            <p className="text-xs text-muted-foreground">Assets in inventory</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLocations}</div>
            <p className="text-xs text-muted-foreground">Active locations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Models</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalModels}</div>
            <p className="text-xs text-muted-foreground">Unique models</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Assets per Model</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={assetsPerModel}
              index="name"
              categories={["value"]}
              colors={["hsl(217.2, 91.2%, 59.8%)"]}
              valueFormatter={(value: number) => `${value} assets`}
              className="aspect-[1.5]"
            />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Assets per Location</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={assetsPerLocation}
              index="name"
              categories={["value"]}
              colors={["hsl(142.1, 76.2%, 36.3%)"]}
              valueFormatter={(value: number) => `${value} assets`}
              className="aspect-[1.5]"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 