"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, Shield } from "lucide-react"
import type { UserRole } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AuthFormProps {
  type: "user" | "admin"
}

export function AuthForm({ type }: AuthFormProps) {
  const [tab, setTab] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState<UserRole>("student")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()

  const isAdmin = type === "admin"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    if (tab === "register" && !name) {
      setError("Please enter your name")
      return
    }

    router.push(isAdmin ? "/admin/dashboard" : "/dashboard")
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src="/images/auth-bg.jpg"
        alt="Colorful braille learning materials background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

      <div className="relative z-10 mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {isAdmin && (
          <div className="mb-2 flex justify-center">
            <Shield className="h-10 w-10 text-[hsl(174,62%,47%)]" strokeWidth={1.5} />
          </div>
        )}

        <h1 className="text-center text-2xl font-bold text-[hsl(215,25%,17%)]">
          {isAdmin ? "Admin Portal" : "BraillePhonics+"}
        </h1>
        <p className="mb-6 text-center text-sm text-[hsl(215,14%,46%)]">
          {isAdmin ? "BraillePhonics+ Administration" : "Sign in to access your learning dashboard"}
        </p>

        <div className="mb-6 flex rounded-lg border border-[hsl(214,20%,90%)] bg-[hsl(210,16%,96%)]">
          <button
            type="button"
            onClick={() => setTab("login")}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              tab === "login"
                ? "bg-white text-[hsl(215,25%,17%)] shadow-sm"
                : "text-[hsl(215,14%,46%)]"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setTab("register")}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              tab === "register"
                ? "bg-white text-[hsl(215,25%,17%)] shadow-sm"
                : "text-[hsl(215,14%,46%)]"
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {tab === "register" && (
            <div>
              <Label htmlFor="name" className="mb-1.5 text-sm font-medium text-[hsl(215,25%,17%)]">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-[hsl(214,20%,90%)] bg-white"
              />
            </div>
          )}

          <div>
            <Label htmlFor="email" className="mb-1.5 text-sm font-medium text-[hsl(215,25%,17%)]">
              {isAdmin ? "Admin Email" : "Email"}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={isAdmin ? "admin@example.com" : "user@example.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-[hsl(214,20%,90%)] bg-white"
            />
          </div>

          <div>
            <Label htmlFor="password" className="mb-1.5 text-sm font-medium text-[hsl(215,25%,17%)]">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-[hsl(214,20%,90%)] bg-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(215,14%,46%)]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {!isAdmin && (
            <div>
              <Label htmlFor="role" className="mb-1.5 text-sm font-medium text-[hsl(215,25%,17%)]">
                Role
              </Label>
              <Select value={role} onValueChange={(val) => setRole(val as UserRole)}>
                <SelectTrigger className="border-[hsl(214,20%,90%)] bg-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {error && <p className="text-sm text-[hsl(0,84%,60%)]">{error}</p>}

          <Button
            type="submit"
            className={`w-full py-5 text-base font-semibold text-white ${
              isAdmin
                ? "bg-[hsl(174,62%,47%)] hover:bg-[hsl(174,62%,40%)]"
                : "bg-[hsl(213,94%,55%)] hover:bg-[hsl(213,94%,45%)]"
            }`}
          >
            {tab === "login"
              ? isAdmin
                ? "Admin Sign In"
                : "Sign In"
              : isAdmin
                ? "Register Admin"
                : "Create Account"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Link
            href={isAdmin ? "/login" : "/admin/login"}
            className={`text-sm ${
              isAdmin ? "text-[hsl(174,62%,47%)]" : "text-[hsl(213,94%,55%)]"
            } hover:underline`}
          >
            {isAdmin ? "User Login" : "Admin Login"}
          </Link>
        </div>
      </div>
    </div>
  )
}
