import { LearnerProfile } from "@/components/learner-profile"
import { StatsCards } from "@/components/stats-cards"
import { PerformanceChart } from "@/components/performance-chart"
import { RecentActivity } from "@/components/recent-activity"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[hsl(215,25%,17%)]">Dashboard</h1>
        <p className="text-sm text-[hsl(215,14%,46%)]">Monitor learner progress and activity</p>
      </div>

      <LearnerProfile />
      <StatsCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <PerformanceChart />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
