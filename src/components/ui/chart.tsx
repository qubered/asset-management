"use client"

import * as React from "react"
import { 
  Bar, 
  BarChart as RechartsBarChart, 
  CartesianGrid, 
  Cell, 
  Legend, 
  Line, 
  LineChart as RechartsLineChart,
  Pie, 
  PieChart as RechartsPieChart,
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts"

import { cn } from "@/lib/utils"

type ChartConfig = Record<string, {
  color?: string
  formatter?: (value: number) => string
}>

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  config?: ChartConfig
}

export function Chart({ config = {}, className, children, ...props }: ChartProps) {
  return (
    <div className={cn("w-full h-full", className)} {...props}>
      {children}
    </div>
  )
}

interface ChartTooltipProps {
  className?: string
  payload?: Array<{
    name?: string
    value?: number
    dataKey?: string
    payload?: {
      name?: string
      value?: number
    }
  }>
  active?: boolean
  label?: string
  config?: ChartConfig
  labelKey?: string
  labelFormatter?: (label: string) => string
}

export function ChartTooltip({
  className,
  payload,
  active,
  label,
  config = {},
  labelKey,
  labelFormatter,
}: ChartTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  const firstItem = payload[0]
  if (!firstItem) return null

  const dataKey = labelKey ?? firstItem.dataKey ?? firstItem.name ?? "value"
  const itemConfig = config[dataKey] ?? {}
  
  const formattedValue = firstItem.value !== undefined 
    ? (itemConfig.formatter?.(firstItem.value) ?? firstItem.value) 
    : "N/A"

  const formattedLabel = labelFormatter 
    ? labelFormatter(label ?? "") 
    : label

  return (
    <div className={cn("rounded-lg border bg-background p-2 shadow-sm", className)}>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">
            {formattedLabel}
          </span>
          <span className="font-bold text-muted-foreground">
            {formattedValue}
          </span>
        </div>
      </div>
    </div>
  )
}

export function BarChart({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  className,
}: {
  data: Array<Record<string, string | number>>
  index: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
  className?: string
}) {
  return (
    <ResponsiveContainer width="100%" height={350} className={className}>
      <RechartsBarChart data={data}>
        <XAxis
          dataKey={index}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={valueFormatter}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null
            
            const value = payload[0]?.value
            if (typeof value !== 'number') return null
            
            return (
              <div className="rounded-lg border bg-background p-2 shadow-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                      {label}
                    </span>
                    <span className="font-bold text-muted-foreground">
                      {valueFormatter ? valueFormatter(value) : value}
                    </span>
                  </div>
                </div>
              </div>
            )
          }}
        />
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[i % colors.length]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
