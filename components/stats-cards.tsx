"use client"

import { Clock, CheckCircle, Zap, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    label: "Total Sessions",
    value: "47",
    change: "+12%",
    icon: <Clock className="h-5 w-5 text-[hsl(213,94%,55%)]" />,
    changeColor: "text-[hsl(174,62%,47%)]",
  },
  {
    label: "Success Rate",
    value: "84%",
    change: "+5%",
    icon: <CheckCircle className="h-5 w-5 text-[hsl(174,62%,47%)]" />,
    changeColor: "text-[hsl(174,62%,47%)]",
  },
  {
    label: "Current Streak",
    value: "7 days",
    change: "Active",
    icon: <Zap className="h-5 w-5 text-[hsl(43,74%,55%)]" />,
    changeColor: "text-[hsl(43,74%,55%)]",
  },
  {
    label: "Improvement",
    value: "+23%",
    change: "This month",
    icon: <TrendingUp className="h-5 w-5 text-[hsl(174,62%,47%)]" />,
    changeColor: "text-[hsl(174,62%,47%)]",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-[hsl(214,20%,90%)]">
          <CardContent className="p-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-[hsl(215,14%,46%)]">{stat.label}</span>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-[hsl(215,25%,17%)]">{stat.value}</p>
            <p className={`mt-1 text-xs ${stat.changeColor}`}>{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
