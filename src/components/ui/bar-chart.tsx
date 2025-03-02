"use client"

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface BarChartProps {
  data: Array<{
    name: string
    value: number
  }>
  index: string
  categories: string[]
  colors: string[]
  valueFormatter: (value: number) => string
  className?: string
}

export function BarChart({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  className,
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350} className={className}>
      <RechartsBarChart data={data}>
        <XAxis
          dataKey="name"
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
          formatter={valueFormatter}
          labelFormatter={(label) => `${label}`}
          cursor={{ fill: "transparent" }}
        />
        <Bar
          dataKey="value"
          fill={colors[0]}
          radius={[4, 4, 0, 0]}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
} 