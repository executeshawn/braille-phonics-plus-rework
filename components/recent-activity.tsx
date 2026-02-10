"use client"

import { CheckCircle, AlertCircle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { recentActivity } from "@/lib/mock-data"

function getScoreColor(score: number) {
  if (score >= 90) return "bg-[hsl(174,62%,47%)] text-white"
  if (score >= 80) return "bg-[hsl(213,94%,55%)] text-white"
  return "bg-[hsl(43,74%,55%)] text-white"
}

function getScoreIcon(score: number) {
  if (score >= 80) return <CheckCircle className="h-4 w-4 text-[hsl(174,62%,47%)]" />
  return <AlertCircle className="h-4 w-4 text-[hsl(43,74%,55%)]" />
}

export function RecentActivity() {
  return (
    <Card className="border-[hsl(214,20%,90%)]">
      <CardHeader>
        <CardTitle className="text-lg text-[hsl(215,25%,17%)]">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {recentActivity.map((activity, idx) => (
          <div
            key={`${activity.mode}-${activity.date}`}
            className={`flex items-center justify-between ${
              idx < recentActivity.length - 1 ? "border-b border-[hsl(214,20%,90%)] pb-4" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              {getScoreIcon(activity.score)}
              <div>
                <p className="text-sm font-semibold text-[hsl(215,25%,17%)]">{activity.mode}</p>
                <div className="flex items-center gap-2 text-xs text-[hsl(215,14%,46%)]">
                  <Clock className="h-3 w-3" />
                  <span>{activity.duration}</span>
                  <span>{activity.date}</span>
                </div>
              </div>
            </div>
            <Badge className={getScoreColor(activity.score)}>{activity.score}%</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
