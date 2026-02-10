"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type UserRole = "student" | "teacher" | "parent"

export interface Learner {
  id: string
  name: string
  age: number
  grade: string
  email: string
  startDate: string
}

export interface SessionRecord {
  id: string
  date: string
  learningMode: string
  duration: string
  attempts: number
  correct: number
  score: number
}

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  type: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, type: "user" | "admin", role?: UserRole) => boolean
  register: (email: string, password: string, name: string, type: "user" | "admin", role?: UserRole) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(
    (email: string, _password: string, type: "user" | "admin", role?: UserRole): boolean => {
      if (email && _password) {
        setUser({
          id: crypto.randomUUID(),
          email,
          name: type === "admin" ? "Admin User" : "Jane Doe",
          role: role || "student",
          type,
        })
        return true
      }
      return false
    },
    [],
  )

  const register = useCallback(
    (email: string, _password: string, name: string, type: "user" | "admin", role?: UserRole): boolean => {
      if (email && _password && name) {
        setUser({
          id: crypto.randomUUID(),
          email,
          name,
          role: role || "student",
          type,
        })
        return true
      }
      return false
    },
    [],
  )

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
