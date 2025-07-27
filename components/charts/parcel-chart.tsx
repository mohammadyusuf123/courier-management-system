"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mon", parcels: 45, delivered: 42 },
  { name: "Tue", parcels: 52, delivered: 48 },
  { name: "Wed", parcels: 38, delivered: 35 },
  { name: "Thu", parcels: 61, delivered: 58 },
  { name: "Fri", parcels: 73, delivered: 69 },
  { name: "Sat", parcels: 89, delivered: 84 },
  { name: "Sun", parcels: 67, delivered: 63 },
]

const chartConfig = {
  parcels: {
    label: "Total Parcels",
    color: "hsl(var(--chart-1))",
  },
  delivered: {
    label: "Delivered",
    color: "hsl(var(--chart-2))",
  },
}

export function ParcelChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Parcel Overview</CardTitle>
        <CardDescription>Total parcels vs delivered parcels this week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="parcels" fill="var(--color-parcels)" />
              <Bar dataKey="delivered" fill="var(--color-delivered)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
