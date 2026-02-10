"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Gamepad2, History, Users, LogOut, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

export function DashboardSidebar({ type }: { type: "user" | "admin" }) {
  const pathname = usePathname()
  const router = useRouter()

  const userNav: NavItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: "Learning Modes", href: "/dashboard/learning-modes", icon: <Gamepad2 className="h-4 w-4" /> },
    { label: "Activity History", href: "/dashboard/activity-history", icon: <History className="h-4 w-4" /> },
  ]

  const adminNav: NavItem[] = [
    { label: "Manage Learners", href: "/admin/dashboard", icon: <Users className="h-4 w-4" /> },
  ]

  const navItems = type === "admin" ? adminNav : userNav

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <aside className="flex h-screen w-56 flex-col bg-[hsl(215,28%,17%)] text-[hsl(210,20%,90%)]">
      <div className="px-5 py-6">
        <h2 className="text-lg font-bold text-white">BraillePhonics+</h2>
      </div>

      <nav className="flex-1 px-3">
        <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-[hsl(210,20%,60%)]">
          Navigation
        </p>
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[hsl(213,94%,55%)] text-white"
                      : "text-[hsl(210,20%,80%)] hover:bg-[hsl(215,28%,22%)] hover:text-white"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-[hsl(215,20%,25%)] px-3 py-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[hsl(210,20%,80%)] transition-colors hover:bg-[hsl(215,28%,22%)] hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}

export function DashboardHeader() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <LayoutDashboard className="h-4 w-4" />
        <span>BraillePhonics+ Dashboard</span>
      </div>
      <button
        type="button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    </header>
  )
}
