"use client"

import { useState, useMemo } from "react"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LearnerFormDialog } from "@/components/learner-form-dialog"
import { initialLearners } from "@/lib/mock-data"
import type { Learner } from "@/lib/auth-context"

const gradeOptions = ["All Grades", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"]

export default function AdminDashboardPage() {
  const [learners, setLearners] = useState<Learner[]>(initialLearners)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingLearner, setEditingLearner] = useState<Learner | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [gradeFilter, setGradeFilter] = useState("All Grades")

  const filtered = useMemo(() => {
    return learners.filter((learner) => {
      const matchesSearch =
        searchQuery === "" ||
        learner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        learner.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesGrade = gradeFilter === "All Grades" || learner.grade === gradeFilter
      return matchesSearch && matchesGrade
    })
  }, [learners, searchQuery, gradeFilter])

  const handleCreate = (data: Omit<Learner, "id">) => {
    setLearners((prev) => [...prev, { ...data, id: crypto.randomUUID() }])
  }

  const handleEdit = (data: Omit<Learner, "id">) => {
    if (!editingLearner) return
    setLearners((prev) => prev.map((l) => (l.id === editingLearner.id ? { ...data, id: l.id } : l)))
    setEditingLearner(null)
  }

  const handleDelete = (id: string) => {
    setLearners((prev) => prev.filter((l) => l.id !== id))
  }

  const openCreate = () => {
    setEditingLearner(null)
    setDialogOpen(true)
  }

  const openEdit = (learner: Learner) => {
    setEditingLearner(learner)
    setDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manage Learners</h1>
          <p className="text-sm text-muted-foreground">Create, read, update, and delete learner profiles</p>
        </div>
        <Button onClick={openCreate} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Learner
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg text-foreground">Learners Database</CardTitle>
              <CardDescription>View and manage all registered learners</CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:w-56"
                />
              </div>
              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by grade" />
                </SelectTrigger>
                <SelectContent>
                  {gradeOptions.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
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
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">Age</TableHead>
                <TableHead className="text-muted-foreground">Grade</TableHead>
                <TableHead className="text-muted-foreground">Email</TableHead>
                <TableHead className="text-muted-foreground">Start Date</TableHead>
                <TableHead className="text-right text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((learner) => (
                <TableRow key={learner.id}>
                  <TableCell className="font-medium text-primary">{learner.name}</TableCell>
                  <TableCell className="text-foreground">{learner.age}</TableCell>
                  <TableCell className="text-foreground">{learner.grade}</TableCell>
                  <TableCell className="text-foreground">{learner.email}</TableCell>
                  <TableCell className="text-primary">{learner.startDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openEdit(learner)}
                        className="h-9 w-9"
                        aria-label={`Edit ${learner.name}`}
                      >
                        <Pencil className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(learner.id)}
                        className="h-9 w-9"
                        aria-label={`Delete ${learner.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                    No learners found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <LearnerFormDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) setEditingLearner(null)
        }}
        onSubmit={editingLearner ? handleEdit : handleCreate}
        initialData={editingLearner}
      />
    </div>
  )
}
