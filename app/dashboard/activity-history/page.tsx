"use client"

import { useState, useMemo } from "react"
import { Calendar, Clock, TrendingUp, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { sessionHistory } from "@/lib/mock-data"

function getScoreBadge(score: number) {
  if (score >= 90) return "bg-[hsl(174,62%,47%)] text-white hover:bg-[hsl(174,62%,40%)]"
  if (score >= 80) return "bg-[hsl(213,94%,55%)] text-white hover:bg-[hsl(213,94%,45%)]"
  return "bg-[hsl(43,74%,55%)] text-white hover:bg-[hsl(43,74%,48%)]"
}

const summaryStats = [
  { label: "Total Sessions", value: "47", icon: <Calendar className="h-5 w-5 text-muted-foreground" /> },
  { label: "Total Time", value: "12.5 hrs", icon: <Clock className="h-5 w-5 text-[hsl(var(--accent))]" /> },
  { label: "Avg. Score", value: "86%", icon: <TrendingUp className="h-5 w-5 text-[hsl(var(--accent))]" /> },
]

const learningModes = [
  "All Modes",
  "Letter Recognition",
  "Phonics Practice",
  "Word Formation",
  "Braille Matching",
  "Guided Reading",
  "Free Exploration",
]

export default function ActivityHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [modeFilter, setModeFilter] = useState("All Modes")

  const filtered = useMemo(() => {
    return sessionHistory.filter((session) => {
      const matchesSearch =
        searchQuery === "" ||
        session.learningMode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.date.includes(searchQuery)
      const matchesMode = modeFilter === "All Modes" || session.learningMode === modeFilter
      return matchesSearch && matchesMode
    })
  }, [searchQuery, modeFilter])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Activity History</h1>
        <p className="text-sm text-muted-foreground">Detailed log of all learning sessions</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {summaryStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <p className="mb-2 text-sm text-muted-foreground">{stat.label}</p>
              <div className="flex items-center gap-2">
                {stat.icon}
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg text-foreground">Session Details</CardTitle>
              <CardDescription>Complete history of all practice sessions</CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by mode or date..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:w-56"
                />
              </div>
              <Select value={modeFilter} onValueChange={setModeFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by mode" />
                </SelectTrigger>
                <SelectContent>
                  {learningModes.map((mode) => (
                    <SelectItem key={mode} value={mode}>
                      {mode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">Learning Mode</TableHead>
                <TableHead className="text-muted-foreground">Duration</TableHead>
                <TableHead className="text-muted-foreground">Attempts</TableHead>
                <TableHead className="text-muted-foreground">Correct</TableHead>
                <TableHead className="text-muted-foreground">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="text-foreground">{session.date}</TableCell>
                  <TableCell className="text-primary">{session.learningMode}</TableCell>
                  <TableCell className="text-foreground">{session.duration}</TableCell>
                  <TableCell className="text-primary">{session.attempts}</TableCell>
                  <TableCell className="text-primary">{session.correct}</TableCell>
                  <TableCell>
                    <Badge className={getScoreBadge(session.score)}>{session.score}%</Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                    No sessions found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
