"use client"

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, TooltipProps } from "recharts"

interface BarChartProps {
  data: Array<{
    name: string
    value: number
  }>
  colors: string[]
  valueFormatter: (value: number) => string
  className?: string
}

export function BarChart({
  data,
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
          content={({ active, payload, label }: TooltipProps<number, string>) => {
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
        <Bar
          dataKey="value"
          fill={colors[0]}
          radius={[4, 4, 0, 0]}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
} 