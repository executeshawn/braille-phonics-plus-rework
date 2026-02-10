"use client"

import React from "react"

import { useState, useEffect, useCallback } from "react"
import { Type, Volume2, FileText, Shuffle, BookOpen, Sparkles, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { learningModes } from "@/lib/mock-data"

const iconMap: Record<string, React.ReactNode> = {
  letter: <Type className="h-6 w-6 text-[hsl(213,94%,55%)]" />,
  sound: <Volume2 className="h-6 w-6 text-[hsl(215,14%,46%)]" />,
  word: <FileText className="h-6 w-6 text-[hsl(215,14%,46%)]" />,
  matching: <Shuffle className="h-6 w-6 text-[hsl(215,14%,46%)]" />,
  reading: <BookOpen className="h-6 w-6 text-[hsl(215,14%,46%)]" />,
  explore: <Sparkles className="h-6 w-6 text-[hsl(215,14%,46%)]" />,
}

function getLevelColor(level: string) {
  switch (level) {
    case "Beginner":
      return "bg-[hsl(174,62%,47%)] text-white"
    case "Intermediate":
      return "bg-[hsl(213,94%,55%)] text-white"
    case "Advanced":
      return "bg-[hsl(43,74%,55%)] text-white"
    default:
      return "bg-[hsl(215,14%,46%)] text-white"
  }
}

export default function LearningModesPage() {
  const [activeMode, setActiveMode] = useState<string | null>("letter-recognition")
  const [timer, setTimer] = useState(9)

  const tick = useCallback(() => {
    if (activeMode) {
      setTimer((prev) => prev + 1)
    }
  }, [activeMode])

  useEffect(() => {
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [tick])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[hsl(215,25%,17%)]">Learning Modes</h1>
        <p className="text-sm text-[hsl(215,14%,46%)]">Current mode status from the Braille board</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {learningModes.map((mode) => {
          const isActive = activeMode === mode.id
          return (
            <Card
              key={mode.id}
              className={`border-2 transition-all ${
                isActive
                  ? "border-[hsl(213,94%,55%)] bg-[hsl(213,94%,97%)] shadow-md"
                  : "border-[hsl(214,20%,90%)] opacity-70"
              }`}
            >
              <CardContent className="flex flex-col gap-3 p-5">
                <div className="flex items-start justify-between">
                  {iconMap[mode.icon]}
                  <Badge className={getLevelColor(mode.level)}>{mode.level}</Badge>
                </div>
                <div>
                  <h3
                    className={`text-lg font-semibold ${
                      isActive ? "text-[hsl(215,25%,17%)]" : "text-[hsl(215,14%,46%)]"
                    }`}
                  >
                    {mode.name}
                  </h3>
                  <p className="mt-1 text-sm text-[hsl(215,14%,46%)]">{mode.description}</p>
                </div>

                {isActive && (
                  <div className="flex items-center gap-2 text-sm text-[hsl(215,14%,46%)]">
                    <Clock className="h-4 w-4" />
                    <span>Running: {timer}s</span>
                  </div>
                )}

                <Button
                  variant={isActive ? "default" : "outline"}
                  className={
                    isActive
                      ? "w-full bg-[hsl(213,94%,55%)] text-white hover:bg-[hsl(213,94%,45%)]"
                      : "w-full border-[hsl(214,20%,90%)] text-[hsl(215,14%,46%)]"
                  }
                  onClick={() => {
                    if (isActive) {
                      setActiveMode(null)
                    } else {
                      setActiveMode(mode.id)
                      setTimer(0)
                    }
                  }}
                >
                  {isActive ? "Currently Active" : "Inactive"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
