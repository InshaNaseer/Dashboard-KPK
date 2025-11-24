"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-context"
import { TRAINING_MODULES } from "@/lib/data"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, Medal, Sparkles, Star } from "lucide-react"

export default function AchievementsPage() {
  const { user } = useAuth()

  const completedModules = TRAINING_MODULES.filter((module) => module.completedBy?.includes(user?.id ?? ""))
  const badges = [
    { label: "Consistency Champion", description: "Logged in 5 days straight", color: "bg-[#fef3c7] text-[#b45309]" },
    { label: "Phase 1 Pathfinder", description: "Completed 4 foundation modules", color: "bg-[#e0e7ff] text-[#4338ca]" },
    { label: "Digital Advocate", description: "Finished 2 digital pedagogy tracks", color: "bg-[#ccfbf1] text-[#0f766e]" },
  ]

  return (
    <MainLayout>
      <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
        <header className="rounded-3xl bg-linear-to-r from-[#1f2abb] via-[#5f3df7] to-[#a855f7] px-6 py-5 text-white shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-white/70">Celebrating wins</p>
              <h1 className="text-3xl font-semibold tracking-tight">Achievement history</h1>
              <p className="text-sm opacity-90">Every milestone from your teacher training journey in one place.</p>
            </div>
            <div className="rounded-2xl bg-white/20 px-4 py-3 text-center">
              <p className="text-xs uppercase text-white/80">Modules completed</p>
              <p className="text-2xl font-semibold">{completedModules.length}</p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-slate-900">Milestone timeline</CardTitle>
                <p className="text-sm text-slate-500">Keep track of every module you’ve conquered.</p>
              </div>
              <Badge className="rounded-full bg-[#f3e8ff] text-[#7c3aed]">Latest</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {completedModules.length === 0 && (
                <div className="rounded-3xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                  Start your journey to see milestones appear here.
                </div>
              )}
              {completedModules.map((module) => (
                <div
                  key={module.id}
                  className="flex flex-col gap-3 rounded-3xl border border-slate-100 bg-slate-50/70 p-4 shadow-sm shadow-indigo-50 md:flex-row md:items-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                      <Star className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-slate-900">{module.title}</p>
                      <p className="text-xs uppercase tracking-wide text-slate-400">{module.phase.replace("-", " ")}</p>
                    </div>
                  </div>
                  <div className="ml-auto flex flex-col text-right text-sm text-slate-500">
                    <span>{module.duration}</span>
                    <span className="text-xs text-slate-400">{module.type}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">Badges earned</CardTitle>
                <p className="text-sm text-slate-500">Collectible highlights from your activity.</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {badges.map((badge) => (
                  <div
                    key={badge.label}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold ${badge.color} shadow-sm shadow-indigo-50`}
                  >
                    <p>{badge.label}</p>
                    <p className="text-xs font-normal opacity-80">{badge.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 bg-[#1e2337] text-white shadow-xl shadow-indigo-700/20">
              <CardHeader className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-indigo-200">Upcoming rewards</p>
                <CardTitle className="text-2xl">Next unlock</CardTitle>
                <p className="text-sm text-indigo-100">Complete 2 more modules to unlock your silver mentor badge.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl bg-white/10 p-3 text-sm text-indigo-100">
                  <div className="flex items-center gap-3">
                    <Medal className="h-5 w-5 text-amber-300" />
                    <div>
                      <p className="text-white">Silver Mentor</p>
                      <p className="text-xs text-indigo-200">Earned after 8 total completions.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-indigo-100">
                  <div className="flex items-center justify-between">
                    <span>Completion progress</span>
                    <span>{completedModules.length} / 12 modules</span>
                  </div>
                  <Progress value={(completedModules.length / TRAINING_MODULES.length) * 100} className="h-2 bg-white/20" />
                </div>
                <div className="rounded-2xl bg-white/10 p-3 text-sm text-indigo-100">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-5 w-5 text-indigo-200" />
                    <div>
                      <p className="text-white">Upcoming events</p>
                      <p className="text-xs text-indigo-200">Mentor circle on Dec 05 • Online</p>
                    </div>
                  </div>
                </div>
                <button className="w-full rounded-2xl bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white">
                  Explore recommended modules
                </button>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">Top highlights</CardTitle>
                <p className="text-sm text-slate-500">Your standout stats</p>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="rounded-2xl border border-slate-100 p-3 text-sm text-slate-600">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Streak</p>
                  <p className="text-base font-semibold text-slate-900">5 days active</p>
                </div>
                <div className="rounded-2xl border border-slate-100 p-3 text-sm text-slate-600">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Top skill impact</p>
                  <p className="text-base font-semibold text-slate-900">Active Learning • +45 points</p>
                </div>
                <div className="rounded-2xl border border-slate-100 p-3 text-sm text-slate-600">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Peer shout-out</p>
                  <p className="text-base font-semibold text-slate-900">Nominated by Mentor Rahim</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}

