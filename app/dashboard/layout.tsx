"use client"

import React from "react"
import { DashboardSidebar, DashboardHeader } from "@/components/dashboard-sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar type="user" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto bg-background p-6">{children}</main>
      </div>
    </div>
  )
}
