"use client"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts"

const COLORS = ["#2563eb", "#10b981", "#facc15", "#ef4444"]

interface PieData {
  name: string
  value: number
}

export function PieChartComponent({ data }: { data: PieData[] }) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "white",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
