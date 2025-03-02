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
                      {valueFormatter(value)}
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