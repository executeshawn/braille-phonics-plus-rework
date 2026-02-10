"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { performanceData } from "@/lib/mock-data"

export function PerformanceChart() {
  return (
    <Card className="border-[hsl(214,20%,90%)]">
      <CardHeader>
        <CardTitle className="text-lg text-[hsl(215,25%,17%)]">Performance by Learning Mode</CardTitle>
        <CardDescription>Average scores and session counts across different learning activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} margin={{ bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(214,20%,90%)" />
              <XAxis
                dataKey="mode"
                tick={{ fontSize: 11, fill: "hsl(215,14%,46%)" }}
                angle={-35}
                textAnchor="end"
                interval={0}
              />
              <YAxis tick={{ fontSize: 12, fill: "hsl(215,14%,46%)" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid hsl(214,20%,90%)",
                  borderRadius: "8px",
                }}
              />
              <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 8 }} />
              <Bar dataKey="avgScore" name="Avg Score" fill="hsl(213,94%,55%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="sessions" name="Sessions" fill="hsl(174,62%,47%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
