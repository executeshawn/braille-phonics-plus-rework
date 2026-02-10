"use client"

import React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Learner } from "@/lib/auth-context"

interface LearnerFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (learner: Omit<Learner, "id">) => void
  initialData?: Learner | null
}

const grades = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"]

export function LearnerFormDialog({ open, onOpenChange, onSubmit, initialData }: LearnerFormDialogProps) {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [grade, setGrade] = useState("")
  const [email, setEmail] = useState("")
  const [startDate, setStartDate] = useState("")

  const isEdit = !!initialData

  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
      setAge(String(initialData.age))
      setGrade(initialData.grade)
      setEmail(initialData.email)
      setStartDate(initialData.startDate)
    } else {
      setName("")
      setAge("")
      setGrade("")
      setEmail("")
      setStartDate("")
    }
  }, [initialData, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name,
      age: Number.parseInt(age, 10),
      grade,
      email,
      startDate: startDate || new Date().toLocaleDateString(),
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-[hsl(214,20%,90%)] bg-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[hsl(215,25%,17%)]">
            {isEdit ? "Edit Learner" : "Create New Learner"}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? "Update the learner details" : "Add a new learner to the system"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="learner-name" className="mb-1.5 text-sm font-medium text-[hsl(215,25%,17%)]">
              Full Name
            </Label>
            <Input
              id="learner-name"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-[hsl(214,20%,90%)] bg-white focus-visible:ring-[hsl(213,94%,55%)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="learner-age" className="mb-1.5 text-sm font-medium text-[hsl(215,25%,17%)]">
                Age
              </Label>
              <Input
                id="learner-age"
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                min={3}
                max={18}
                className="border-[hsl(214,20%,90%)] bg-white"
              />
            </div>
            <div>
              <Label htmlFor="learner-grade" className="mb-1.5 text-sm font-medium text-[hsl(215,25%,17%)]">
                Grade
              </Label>
              <Select value={grade} onValueChange={setGrade} required>
                <SelectTrigger className="border-[hsl(214,20%,90%)] bg-white">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="learner-email" className="mb-1.5 text-sm font-medium text-[hsl(215,25%,17%)]">
              Email
            </Label>
            <Input
              id="learner-email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-[hsl(214,20%,90%)] bg-white"
            />
          </div>

          <div>
            <Label htmlFor="learner-start-date" className="mb-1.5 text-sm font-medium text-[hsl(215,25%,17%)]">
              Start Date
            </Label>
            <Input
              id="learner-start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border-[hsl(214,20%,90%)] bg-white"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-[hsl(214,20%,90%)]">
              Cancel
            </Button>
            <Button type="submit" className="bg-[hsl(213,94%,55%)] text-white hover:bg-[hsl(213,94%,45%)]">
              {isEdit ? "Update Learner" : "Create Learner"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
