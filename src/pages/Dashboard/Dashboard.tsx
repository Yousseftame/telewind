import React from 'react'
import { PieChartComponent } from "@/components/ui/pie-chart"


export default function Dashboard() {
   const data = [
    { name: "Users", value: 400 },
    { name: "Rooms", value: 300 },
    { name: "Bookings", value: 200 },
    { name: "Ads", value: 100 },
  ]



  return (
    <div>
      <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Statistics</h2>
      <PieChartComponent data={data} />
    </div>
    </div>
  )
}
