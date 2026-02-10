"use client"

import { User, Calendar, Trophy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function LearnerProfile() {
  return (
    <Card className="border-[hsl(214,20%,90%)] bg-gradient-to-r from-[hsl(213,94%,97%)] to-white">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-2 text-[hsl(215,14%,46%)]">
          <User className="h-5 w-5" />
          <h2 className="text-lg font-semibold text-[hsl(215,25%,17%)]">Learner Profile</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(213,94%,55%)] text-xl font-bold text-white">
            JD
          </div>
          <div>
            <h3 className="text-xl font-bold text-[hsl(215,25%,17%)]">Jane Doe</h3>
            <p className="text-sm text-[hsl(215,14%,46%)]">{"Age 8 \u2022 Grade 3"}</p>
            <div className="mt-2 flex gap-2">
              <Badge className="bg-[hsl(174,62%,47%)] text-white hover:bg-[hsl(174,62%,40%)]">
                <Calendar className="mr-1 h-3 w-3" />
                Started: Jan 2024
              </Badge>
              <Badge className="bg-[hsl(213,94%,55%)] text-white hover:bg-[hsl(213,94%,45%)]">
                <Trophy className="mr-1 h-3 w-3" />
                Level 2
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-[hsl(215,14%,46%)]">Overall Progress</span>
            <span className="font-semibold text-[hsl(213,94%,55%)]">68%</span>
          </div>
          <Progress value={68} className="h-2.5 bg-[hsl(214,20%,90%)] [&>div]:bg-gradient-to-r [&>div]:from-[hsl(213,94%,55%)] [&>div]:to-[hsl(174,62%,47%)]" />
        </div>
      </CardContent>
    </Card>
  )
}
